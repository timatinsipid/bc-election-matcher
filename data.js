/* Party + question data for the BC 2026 provincial election matcher.
 *
 * Stance scale: -2 (strongly opposes) .. +2 (strongly supports).
 * A party is only scored on a question when a published platform item,
 * campaign statement or government record addresses it. `inferred: true`
 * marks stances that are a reasonable reading of a related item rather than
 * a direct statement. Research snapshot: 30 Sept 2026 (week 2 of the campaign).
 * Election day: 24 Oct 2026 (advance voting 16-21 Oct).
 */

const META = {
  intro: "Answer short statements about provincial issues. At the end you'll see how closely each party's published platform and record line up with your views, with reasons and sources.",
  caveat: "This is a snap election called on September 22, 2026, so platforms are still being released week by week. The Conservatives are under an interim leader after a caucus collapse, and OneBC's and CentreBC's platforms are thin. Check each party's own platform before you vote."
};

const SOURCES = {
  cpTax: { label: "Global News – Conservatives promise no new taxes", url: "https://globalnews.ca/news/12075070/bc-election-september-27-conservative-platform/" },
  cpLng: { label: "Today in BC – Conservatives pledge to triple LNG", url: "https://todayinbc.com/2026/09/28/b-c-conservative-leader-pledges-to-triple-lng-production/" },
  wk2: { label: "Global News – economic and budget promises (week 2)", url: "https://globalnews.ca/news/12076424/bc-election-eby-cut-deficit-wasteful-spending/" },
  buzz: { label: "Victoria Buzz – Greens, NDP and Conservatives economic plans", url: "https://victoriabuzz.com/2026/09/bc-greens-focus-on-renters-and-childcare-as-ndp-and-conservatives-roll-out-economic-plans/" },
  day1: { label: "Global News – first full day of campaigning", url: "https://globalnews.ca/news/12070168/bc-election-2026-first-full-day-campaign/" },
  greensVac: { label: "Daily Hive – BC Greens vacancy control", url: "https://dailyhive.com/vancouver/bc-greens-vacancy-control-rentals" },
  greensChild: { label: "Nelson Star – BC Greens childcare plans", url: "https://nelsonstar.com/2026/09/28/bc-greens-announce-new-candidate-for-victoria-swan-lake-childcare-plans/" },
  greensPlan: { label: "BC Greens – Emily Lowan announces election plans", url: "https://bcgreens.ca/emily-lowan-announces-election-plans/" },
  day4: { label: "Western Standard – Day 4 of the BC election (as reported by that outlet)", url: "https://www.westernstandard.news/bc/bc-election-day-4-ebys-wildfire-rhetoric-backfires-as-conservatives-surge/77317" },
  narwhal: { label: "The Narwhal – Eby calls a snap election", url: "https://thenarwhal.ca/bc-snap-election-david-eby/" },
  budget: { label: "CBC – 2026 B.C. budget (tax increases, job cuts, deficit)", url: "https://www.cbc.ca/news/canada/british-columbia/b-c-budget-2026-9.7094451" },
  oneBC: { label: "Wikipedia – OneBC", url: "https://en.wikipedia.org/wiki/OneBC_(political_party)" },
  centre: { label: "Global News – Sturko leads CentreBC", url: "https://globalnews.ca/news/12072863/elenore-sturkos-roller-coaster-political-ride-lands-her-as-leader-of-centrebc/" }
};

const PARTIES = [
  { id: "ndp", name: "BC NDP", leader: "David Eby (Premier)", color: "#e8590c",
    blurb: "Governing party running on \"Build BC Strong\": resource and critical-minerals development, deficit reduction through growth and cutting \"wasteful spending\", and a public health system." },
  { id: "con", name: "Conservative Party of BC", leader: "Lorne Doerkson (interim leader)", color: "#1c7ed6",
    blurb: "Official Opposition running on \"no new taxes\", doubling LNG production by 2032 and tripling it by 2035, and cutting red tape. Leadership is interim after Kerry-Lynne Findlay resigned on September 20." },
  { id: "green", name: "BC Greens", leader: "Emily Lowan", color: "#2f9e44",
    blurb: "Running on \"Believe in Better\": renter protections, universal free childcare by 2031, taxing mega-corporations and the ultra-wealthy, and opposing the LNG Canada expansion." },
  { id: "onebc", name: "OneBC", leader: "Dallas Brodie (interim leader)", color: "#6741d9",
    blurb: "Right-wing populist, socially conservative party formed by former Conservative MLAs: income tax cuts, private health care alongside public, and ending \"mass immigration\". Scored on a limited set of documented positions." }
];

/* Parties that can't be scored yet because no platform positions were found. */
const UNSCORED = [
  { name: "CentreBC", leader: "Elenore Sturko",
    note: "Formed in 2025 from B.C. United remnants. Members say they are focused on \"economic issues, health care and public safety\", but no specific platform positions had been published when this was researched, so it is not scored.",
    source: "centre" }
];

const QUESTIONS = [
  { id: "lng", topic: "Energy & climate",
    text: "BC should expand liquefied natural gas (LNG) production, including the LNG Canada expansion.",
    stances: {
      con: [2, "Would double LNG production by 2032 and triple it by 2035 with very fast project approvals.", "cpLng"],
      ndp: [2, "Supports LNG Canada phase two as one of the largest private-sector investments in Canadian history and approved Tilbury LNG Phase 2.", "buzz"],
      green: [-2, "Opposes the LNG Canada phase-two expansion in favour of renewable energy and community-owned infrastructure.", "buzz"]
    } },
  { id: "permits", topic: "Economy",
    text: "Major resource and infrastructure projects should be approved much faster, even if that means loosening some regulatory processes.",
    stances: {
      con: [2, "Says the NDP created \"an absolute nightmare of red tape\" and promises a \"very quick yes\" for good projects.", "cpLng"],
      ndp: [2, "Promises concurrent environmental assessments and faster permitting to double critical mineral exports in five years.", "buzz"],
      green: [-1, "Prioritizes renewables over new fossil fuel projects and opposes the LNG expansion.", "buzz", true]
    } },
  { id: "notax", topic: "Taxes & budget",
    text: "The province should not raise any taxes or introduce new ones, even with a large deficit.",
    stances: {
      con: [2, "Pledges no increases to existing taxes and no new taxes.", "cpTax"],
      onebc: [2, "Proposes cutting income taxes.", "oneBC"],
      ndp: [-1, "The 2026 budget raised the lowest income tax rate to 5.6% and froze tax brackets, which the Conservatives call a tax hike.", "budget", true],
      green: [-2, "Wants mega-corporations and the ultra-wealthy to pay more to fund affordability and health care.", "greensPlan", true]
    } },
  { id: "wealthytax", topic: "Taxes & budget",
    text: "Large corporations and the wealthiest British Columbians should pay significantly more in tax.",
    stances: {
      green: [2, "\"Economic Fairness for All\" requires mega-corporations and the ultra-wealthy to pay their fair share.", "greensPlan"],
      con: [-2, "Rules out any new taxes.", "cpTax", true],
      onebc: [-1, "Favours big tax cuts rather than new taxes.", "oneBC", true]
    } },
  { id: "deficit", topic: "Taxes & budget",
    text: "The deficit should be reduced mainly by growing the economy and cutting wasteful spending, not by raising revenue.",
    stances: {
      ndp: [2, "Pledges to bring the deficit down year over year by growing the economy and cutting wasteful spending.", "wk2"],
      con: [2, "Says economic growth will reduce the $13.8-billion deficit, though it gave no timeline for a balanced budget.", "wk2"],
      green: [-1, "Would raise revenue from corporations and the ultra-wealthy to pay for services.", "greensPlan", true]
    } },
  { id: "childcare", topic: "Families",
    text: "BC should restart the $10-a-day childcare expansion and work toward universal free childcare.",
    stances: {
      green: [2, "Would lift the childcare freeze, pursue universal free childcare by 2031 and raise educator wages to $35–$45 an hour by 2028.", "greensChild"],
      ndp: [-1, "Paused the $10-a-day expansion in February, according to the Greens.", "greensChild", true]
    } },
  { id: "renters", topic: "Housing",
    text: "Stronger renter protections are needed, such as reinstating vacancy control and ending blanket no-pet clauses.",
    stances: {
      green: [2, "Would reinstate vacancy control, amend the Residential Tenancy Act on pets and protect 2,000 deeply affordable rentals each year.", "greensVac"]
    } },
  { id: "emptyhomes", topic: "Housing",
    text: "Vacant investment properties should be hit with a 2% empty-homes tax.",
    stances: {
      ndp: [2, "Proposes a 2% \"empty condo tax\" on vacant investment properties.", "day4"]
    } },
  { id: "nonmarket", topic: "Housing",
    text: "The province should fund non-profit, community and Indigenous housing and build tens of thousands of units a year.",
    stances: {
      green: [2, "Would restart the Community Housing Fund and Indigenous Housing Fund and build and protect 26,000 homes a year.", "greensVac"]
    } },
  { id: "healthrecruit", topic: "Health care",
    text: "BC should actively recruit doctors and nurses from the United States and lure Canadian health workers home.",
    stances: {
      ndp: [2, "Pledges to \"triple down\" on U.S. health care recruitment and offer incentives for Canadians working in the U.S. to return.", "day1"]
    } },
  { id: "privatehealth", topic: "Health care",
    text: "Private health care operations should be allowed alongside the public system.",
    stances: {
      onebc: [2, "Proposes permitting private health care alongside public.", "oneBC"],
      ndp: [-1, "Frames its health plan around a public system that \"puts patients first\".", "day1", true]
    } },
  { id: "sogi", topic: "Schools",
    text: "SOGI 123 teaching resources should be removed from BC schools.",
    stances: {
      con: [2, "Doerkson said the resource \"has to be removed\" and schools should focus on \"arithmetic and reading\".", "day4"],
      onebc: [2, "Has backed legislation limiting gender-related policies in schools and health care.", "oneBC", true],
      ndp: [-1, "Reaffirms anti-bullying work in schools while ending an ARC Foundation grant.", "day4"]
    } },
  { id: "minorscare", topic: "Schools",
    text: "Puberty blockers and hormone therapy for minors should be prohibited.",
    stances: {
      onebc: [2, "Proposed legislation to prohibit these treatments for minors; the bill was defeated 48–40.", "oneBC"]
    } },
  { id: "dripa", topic: "Indigenous relations",
    text: "BC should stay committed to the Declaration on the Rights of Indigenous Peoples Act (DRIPA) and ongoing reconciliation funding.",
    stances: {
      ndp: [2, "Says its commitment to DRIPA negotiations \"is not up for debate\", though it earlier proposed amendments and delayed changes after First Nations opposition.", "day4"],
      onebc: [-2, "Supports defunding \"the reconciliation industry\".", "oneBC"]
    } },
  { id: "immigration", topic: "Society",
    text: "BC should push for lower immigration levels.",
    stances: {
      onebc: [2, "Advocates ending what it calls \"mass immigration\".", "oneBC"]
    } },
  { id: "transit", topic: "Transportation",
    text: "BC should invest more in regional transit, passenger rail and ferry service.",
    stances: {
      green: [2, "Candidates emphasize regional transit, passenger rail and underfunded ferry routes.", "greensPlan"]
    } },
  { id: "teacherstrikes", topic: "Labour",
    text: "Teacher strikes should be banned.",
    stances: {
      onebc: [2, "Calls for banning teacher strikes.", "oneBC"]
    } },
  { id: "voting", topic: "Democracy",
    text: "Elections should use hand-counted paper ballots and end mail-in and early voting.",
    stances: {
      onebc: [2, "Opposes mail-in and early voting and advocates hand-counted ballots.", "oneBC"]
    } }
];

if (typeof module !== "undefined") module.exports = { META, SOURCES, PARTIES, UNSCORED, QUESTIONS };
