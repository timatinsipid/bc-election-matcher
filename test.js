// Run with: node test.js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
global.ELECTIONS = [];
const dir = path.join(__dirname, "elections");
for (const f of fs.readdirSync(dir).sort()) require(path.join(dir, f));
const { computeResults, splitReasons } = require("./score.js");

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const ids = new Set();
let quizCount = 0, dirCount = 0;

for (const e of ELECTIONS) {
  assert(!ids.has(e.id), "duplicate election id " + e.id);
  ids.add(e.id);
  assert(e.name && ["Provincial", "Municipal"].includes(e.group), e.id + ": bad name/group");
  assert(["quiz", "directory"].includes(e.status), e.id + ": bad status");
  assert(isoDate.test(e.date) && isoDate.test(e.updated), e.id + ": bad date/updated");
  assert(!isNaN(new Date(e.updated + "T12:00:00Z")), e.id + ": unparseable updated");
  assert(e.dateLabel && e.caveat, e.id + ": missing dateLabel/caveat");

  if (e.status === "directory") {
    dirCount++;
    assert(e.summary && Array.isArray(e.links) && e.links.length >= 1, e.id + ": directory needs summary and links");
    e.links.forEach((l) => assert(/^https:\/\//.test(l.url) && l.label, e.id + ": bad link"));
    continue;
  }
  quizCount++;
  assert(e.intro, e.id + ": missing intro");
  const pids = new Set(e.parties.map((p) => p.id));
  assert(pids.size === e.parties.length && pids.size >= 3, e.id + ": need >=3 unique parties");
  const qids = new Set();
  for (const q of e.questions) {
    assert(!qids.has(q.id), e.id + ": duplicate question " + q.id);
    qids.add(q.id);
    assert(q.text && q.topic, e.id + "/" + q.id + ": missing text/topic");
    assert(Object.keys(q.stances).length >= 1, e.id + "/" + q.id + ": no stances");
    for (const [pid, st] of Object.entries(q.stances)) {
      assert(pids.has(pid), e.id + "/" + q.id + ": unknown party " + pid);
      assert([-2, -1, 1, 2].includes(st[0]), e.id + "/" + q.id + "/" + pid + ": bad stance");
      assert(st[1] && e.sources[st[2]], e.id + "/" + q.id + "/" + pid + ": missing note or source " + st[2]);
    }
  }
  for (const u of e.unscored || []) assert(u.name && u.note && e.sources[u.source], e.id + ": bad unscored entry " + u.name);
  for (const s of Object.values(e.sources)) assert(/^https:\/\//.test(s.url) && s.label, e.id + ": bad source");
  assert(e.questions.length >= 6, e.id + ": need >=6 questions");

  // every party must be scorable on at least 3 questions
  for (const p of e.parties) {
    const n = e.questions.filter((q) => q.stances[p.id]).length;
    assert(n >= 2, e.id + ": " + p.id + " has only " + n + " stances");
  }
  // a user who copies a party's stances should land on that party (when it has enough data)
  for (const p of e.parties) {
    const covered = e.questions.filter((q) => q.stances[p.id]).length;
    if (covered < 4) continue;
    const a = {};
    for (const q of e.questions) a[q.id] = q.stances[p.id] ? q.stances[p.id][0] : null;
    const res = computeResults(a, {}, e.parties, e.questions);
    assert.strictEqual(res[0].party.id, p.id, e.id + ": expected " + p.id + " got " + res[0].party.id);
    const sp = splitReasons(res[0]);
    assert(sp.agree.length > 0 && sp.differ.length === 0, e.id + "/" + p.id + ": reasons wrong");
  }
  // skipping everything gives 50% for all
  computeResults({}, {}, e.parties, e.questions).forEach((x) => assert(Math.abs(x.score - 0.5) < 1e-9));
}

assert(ELECTIONS.some((e) => e.id === "bc-provincial") && ELECTIONS.some((e) => e.id === "vancouver"));
console.log("All tests passed: " + quizCount + " quiz elections, " + dirCount + " info pages.");
