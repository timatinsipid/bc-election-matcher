/* Global registry. Each file in elections/ pushes one or more election objects:
 *
 * {
 *   id, name, group: "Provincial" | "Municipal",
 *   status: "quiz" | "directory",
 *   date: "YYYY-MM-DD", dateLabel, advance,
 *   updated: "YYYY-MM-DD",          // when this election's data was last researched
 *   intro, caveat, summary,
 *   sources: { key: {label, url} },
 *   parties: [{id, name, leader, color, blurb}],
 *   unscored: [{name, leader, note, source}],
 *   questions: [{id, topic, text, stances: {partyId: [-2..2, note, sourceKey, inferred?]}}],
 *   // directory pages only:
 *   candidates: [string], highlights: [string], links: [{label, url}]
 * }
 */
var ELECTIONS = [];
if (typeof module !== "undefined") module.exports = { ELECTIONS: ELECTIONS };
