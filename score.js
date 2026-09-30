/* Scoring logic (shared by browser and Node tests).
 *
 * answers: { [questionId]: -2..2 | null }   (null / missing = skipped)
 * important: { [questionId]: true }          (double weight)
 */
const PRIOR_WEIGHT = 1.5; // pulls sparsely-documented parties toward 50%

function computeResults(answers, important, parties, questions) {
  const results = parties.map((p) => {
    let num = 0, den = 0, n = 0;
    const items = [];
    for (const q of questions) {
      const a = answers[q.id];
      const st = q.stances[p.id];
      if (a === undefined || a === null || !st) continue;
      const w = important[q.id] ? 2 : 1;
      const diff = Math.abs(a - st[0]);
      num += w * (1 - diff / 4);
      den += w;
      n += 1;
      items.push({ q, answer: a, stance: st[0], note: st[1], source: st[2], inferred: !!st[3], diff, weight: w });
    }
    const raw = den ? num / den : null;
    const score = (num + PRIOR_WEIGHT * 0.5) / (den + PRIOR_WEIGHT);
    return { party: p, raw, score, n, items, coverageTotal: questions.filter((q) => q.stances[p.id]).length };
  });
  results.sort((a, b) => b.score - a.score);
  return results;
}

function splitReasons(result) {
  // Strongest agreements first (weighted by how strongly the user feels).
  const agree = result.items
    .filter((i) => i.diff <= 1 && i.answer !== 0)
    .sort((a, b) => (b.weight * (2 - b.diff) * Math.abs(b.answer)) - (a.weight * (2 - a.diff) * Math.abs(a.answer)));
  const differ = result.items
    .filter((i) => i.diff >= 2)
    .sort((a, b) => (b.weight * b.diff) - (a.weight * a.diff));
  return { agree, differ };
}

if (typeof module !== "undefined") module.exports = { computeResults, splitReasons, PRIOR_WEIGHT };
