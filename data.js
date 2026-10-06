/* Party + question data for the BC 2026 provincial election matcher.
 *
 * Stance scale: -2 (strongly opposes) .. +2 (strongly supports).
 * A party is only scored on a question when a published platform item,
 * campaign statement or government record addresses it. `inferred: true`
 * marks stances that are a reasonable reading of a related item rather than
 * a direct statement. Research snapshot: 6 Oct 2026 (week 3 of the campaign).
 * Election day: 24 Oct 2026 (advance voting 16-21 Oct).
 */

const META = {
  intro: "Answer short statements about provincial issues. At the end you'll see how closely each party's published platform and record line up with your views, with reasons and sources.",
  caveat: "This is a snap election called on September 22, 2026, so platforms are still being released. Many commitments come from BC Ballot, an independent platform tracker, and the Conservatives are under an interim leader after a caucus collapse. Check each party's own platform before you vote."
};

const SOURCES = {
  bcPlat: { label: "BC Ballot – compare the party platforms (verified Oct 1)", url: "https://bcballot.ca/platforms/" },
  bcCentre: { label: "BC Ballot – CentreBC platform", url: "https://bcballot.ca/platforms/centrebc/" },
  bcOne: { label: "BC Ballot – OneBC platform", url: "https://bcballot.ca/platforms/onebc/" },
  bcCon: { label: "BC Ballot – Conservative platform", url: "https://bcballot.ca/platforms/conservative-party/" },
  fuel: { label: "Northeast News – Eby's gas relief plan", url: "https://northeastnow.com/2026/10/01/b-c-s-large-parties-on-track-to-field-candidates-in-all-ridings-as-deadline-looms/" },
  cpTax: { label: "Global News – Conservatives promise no new taxes", url: "https://globalnews.ca/news/12075070/bc-election-september-27-conservative-platform/" },
  cpLng: { label: "Today in BC – Conservatives pledge to triple LNG", url: "https://todayinbc.com/2026/09/28/b-c-conservative-leader-pledges-to-triple-lng-production/" },
  wk2: { label: "Global News – economic and budget promises (week 2)", url: "https://globalnews.ca/news/12076424/bc-election-eby-cut-deficit-wasteful-spending/" },
  buzz: { label: "Victoria Buzz – Greens, NDP and Conservatives economic plans", url: "https://victoriabuzz.com/2026/09/bc-greens-focus-on-renters-and-childcare-as-ndp-and-conservatives-roll-out-economic-plans/" },
  day1: { label: "Global News – first full day of campaigning", url: "https://globalnews.ca/news/12070168/bc-election-2026-first-full-day-campaign/" },
  greensVac: { label: "Daily Hive – BC Greens vacancy control", url: "https://dailyhive.com/vancouver/bc-greens-vacancy-control-rentals" },
  greensChild: { label: "Nelson Star – BC Greens childcare plans", url: "https://nelsonstar.com/2026/09/28/bc-greens-announce-new-candidate-for-victoria-swan-lake-childcare-plans/" },
  greensPlan: { label: "BC Greens – Emily Lowan announces election plans", url: "https://bcgreens.ca/emily-lowan-announces-election-plans/" },
  day4: { label: "Western Standard – Day 4 of the BC election (as reported by that outlet)", url: "https://www.westernstandard.news/bc/bc-election-day-4-ebys-wildfire-rhetoric-backfires-as-conservatives-surge/77317" },
  budget: { label: "CBC – 2026 B.C. budget (tax increases, job cuts, deficit)", url: "https://www.cbc.ca/news/canada/british-columbia/b-c-budget-2026-9.7094451" },
  yahooTax: { label: "Yahoo News/CP – Eby defends plan to tax the rich; party health plans", url: "https://ca.news.yahoo.com/eby-defends-plan-tax-rich-195417224.html" },
  bcNdpCon: { label: "BC Ballot – NDP vs Conservative commitments (Oct 1+)", url: "https://bcballot.ca/platforms/bc-ndp-vs-conservative/" },
  day9: { label: "Western Standard – Day 9 of the BC election (as reported by that outlet)", url: "https://www.westernstandard.news/bc/day-9-of-the-2026-bc-election-national-day-of-truth-and-reconciliation/77440" },
  oneBC: { label: "Wikipedia – OneBC", url: "https://en.wikipedia.org/wiki/OneBC_(political_party)" }
};

const PARTIES = [
  { id: "ndp", name: "BC NDP", leader: "David Eby (Premier)", color: "#e8590c",
    blurb: "Governing party running on \"Build BC Strong\": resource and critical-minerals development, a 10-cent fuel tax cut with a gas \"price guard\", grocery margin caps, a new tax bracket on income above $1 million and higher speculation taxes." },
  { id: "con", name: "Conservative Party of BC", leader: "Lorne Doerkson (interim leader)", color: "#1c7ed6",
    blurb: "Official Opposition running on \"no new taxes\", a 120-day permitting act, doubling LNG production by 2032 and tripling it by 2035, and repealing SOGI and DRIPA. Leadership is interim after Kerry-Lynne Findlay resigned on September 20." },
  { id: "green", name: "BC Greens", leader: "Emily Lowan", color: "#2f9e44",
    blurb: "Running on \"Believe in Better\": vacancy control and renter protections, universal free childcare by 2031, a wealth tax on fortunes above $50 million, free transit and ending new fossil fuel development." },
  { id: "onebc", name: "OneBC", leader: "Dallas Brodie (interim leader)", color: "#6741d9",
    blurb: "Right-wing populist, socially conservative party formed by former Conservative MLAs: 25% tax cuts across all brackets, private health care alongside public, rolling back decriminalization and repealing DRIPA." },
  { id: "centre", name: "CentreBC", leader: "Elenore Sturko", color: "#0ca678",
    blurb: "Centrist party formed in 2025 from B.C. United remnants, now with a small caucus: anti-extortion measures, $60 million more for skilled trades, faster approvals for manufacturers and $10-a-day childcare." }
];

/* Parties that can't be scored because no platform positions were found. */
const UNSCORED = [];

const QUESTIONS = [
  { id: "lng", topic: "Energy & climate",
    text: "BC should expand liquefied natural gas (LNG) production, including the LNG Canada expansion.",
    stances: {
      con: [2, "Would double LNG production by 2032 and triple it by 2035 with very fast project approvals.", "cpLng"],
      ndp: [2, "Supports LNG Canada phase two as one of the largest private-sector investments in Canadian history and approved Tilbury LNG Phase 2.", "buzz"],
      green: [-2, "Would redirect LNG subsidies to renewable energy and opposes the LNG Canada phase-two expansion, backing Indigenous nations that oppose it.", "day9"]
    } },
  { id: "pipeline", topic: "Energy & climate",
    text: "BC should support a new oil pipeline to the northwest coast (Prince Rupert or Kitimat).",
    stances: {
      con: [2, "Doerkson praised the federal designation of the Pacific Link pipeline as a national priority and wants a trilateral working group with Alberta and Ottawa.", "fuel"],
      onebc: [2, "Would approve a pipeline to Prince Rupert or Kitimat.", "bcOne"],
      green: [-2, "Would stop new fossil fuel development.", "bcPlat"]
    } },
  { id: "permits", topic: "Economy",
    text: "Major resource and infrastructure projects should be approved much faster, even if that means loosening some regulatory processes.",
    stances: {
      con: [2, "Promises a 120-Day Permitting Act and harmonizing with federal Bill C-39 for one-year project approvals.", "bcCon"],
      ndp: [2, "Promises concurrent environmental assessments and faster permitting to double critical mineral exports in five years.", "buzz"],
      onebc: [2, "Would audit the province's 176,000+ regulations and speed forestry permits and consultations.", "bcOne"],
      centre: [1, "Would speed approvals for manufacturers and set transparent project timelines with clear criteria.", "bcCentre"],
      green: [-1, "Prioritizes renewables over new fossil fuel projects and opposes the LNG expansion.", "bcPlat", true]
    } },
  { id: "forestry", topic: "Economy",
    text: "BC should raise the allowable timber cut and cut stumpage fees to boost the forestry industry.",
    stances: {
      onebc: [2, "Would increase the allowable annual cut and reduce stumpage fees.", "bcOne"],
      green: [-1, "Would institute selective logging and value-added industries and fully fund old-growth deferrals.", "bcPlat", true]
    } },
  { id: "trades", topic: "Economy",
    text: "BC should invest more in skilled trades training.",
    stances: {
      centre: [2, "Would provide $60 million in additional skilled trades training investment.", "bcCentre"],
      ndp: [1, "Promises a skilled, union-led workforce for future mines.", "bcPlat"]
    } },
  { id: "notax", topic: "Taxes & budget",
    text: "The province should not raise any taxes or introduce new ones, even with a large deficit.",
    stances: {
      con: [2, "Pledges no new taxes throughout a Conservative government.", "cpTax"],
      onebc: [2, "Promises 25% tax cuts for every bracket, including corporate.", "bcOne"],
      ndp: [-2, "Would raise the top two income tax brackets by 2 points, add a new bracket above $1 million and add an unsold-condo tax, though it would also cut the fuel tax by 10 cents.", "bcNdpCon"],
      green: [-2, "Wants a windfall tax on mega-corporations and the ultra-wealthy to pay their \"fair share\".", "bcPlat"]
    } },
  { id: "pst", topic: "Taxes & budget",
    text: "The provincial sales tax (PST) should be cut or removed on more goods.",
    stances: {
      onebc: [2, "Would cut the PST by 2 percentage points.", "bcOne"],
      con: [1, "Would remove PST on Canadian beer, wine and spirits during the trade war.", "bcCon"],
      centre: [1, "Would scrap PST on food production and farm equipment.", "bcCentre"]
    } },
  { id: "fuel", topic: "Taxes & budget",
    text: "BC should temporarily cut the provincial fuel tax and cap gas station margins through a \"price guard\".",
    stances: {
      ndp: [2, "Pledges a temporary 10-cent-per-litre fuel tax cut and a permanent BC Utilities Commission price guard, at an estimated $250 million.", "fuel"]
    } },
  { id: "wealthytax", topic: "Taxes & budget",
    text: "Large corporations and the wealthiest British Columbians should pay significantly more in tax.",
    stances: {
      green: [2, "Proposes a wealth tax on net assets over $50 million (the Fair Share Act) plus a windfall tax on mega-corporations.", "yahooTax"],
      ndp: [2, "Would add a 24.5% bracket on income above $1 million from 2027 and raise the top two brackets by 2 points, raising about $1 billion a year for health care and cost relief.", "yahooTax"],
      con: [-2, "Rules out any new taxes and calls the NDP's millionaire bracket a \"doctor's tax\".", "yahooTax"],
      onebc: [-1, "Favours big tax cuts rather than new taxes.", "bcOne", true]
    } },
  { id: "deficit", topic: "Taxes & budget",
    text: "The deficit should be reduced mainly by growing the economy and cutting wasteful spending, not by raising revenue.",
    stances: {
      ndp: [2, "Pledges to bring the deficit down year over year by growing the economy and cutting wasteful spending.", "wk2"],
      con: [2, "Says economic growth will reduce the $13.8-billion deficit, though it gave no timeline for a balanced budget.", "wk2"],
      onebc: [1, "Promises balanced budgets within four years and shifting administrative spending toward frontline staff.", "bcOne"],
      green: [-1, "Would raise revenue from corporations and the ultra-wealthy to pay for services.", "bcPlat", true]
    } },
  { id: "childcare", topic: "Families",
    text: "BC should restart the $10-a-day childcare expansion and work toward universal free childcare.",
    stances: {
      green: [2, "Would lift the childcare freeze, pursue universal free childcare by 2031 and raise educator wages to $35–$45 an hour by 2028.", "greensChild"],
      centre: [1, "Treats childcare as essential economic infrastructure reaching $10-a-day for every family.", "bcCentre"],
      ndp: [-1, "Paused the $10-a-day expansion in February, according to the Greens.", "greensChild", true]
    } },
  { id: "renters", topic: "Housing",
    text: "Stronger renter protections are needed, such as reinstating vacancy control and ending blanket no-pet clauses.",
    stances: {
      green: [2, "Would reinstate vacancy control, amend the Residential Tenancy Act on pets and protect 2,000 deeply affordable rentals each year.", "greensVac"],
      onebc: [-2, "Would block municipal rent control programs it says discourage development.", "bcOne"]
    } },
  { id: "emptyhomes", topic: "Housing",
    text: "The province should raise speculation and vacancy taxes and add a tax on unsold new condos.",
    stances: {
      ndp: [2, "Would raise the speculation tax from 1% to 2% (domestic) and 4% to 5% (foreign) and add an unsold-condo tax starting at 2% and rising 1% a year.", "bcPlat"],
      con: [-2, "Rules out any new taxes.", "cpTax", true],
      onebc: [-1, "Favours broad tax cuts rather than new taxes.", "bcOne", true]
    } },
  { id: "nonmarket", topic: "Housing",
    text: "The province should fund non-profit, community and Indigenous housing and build tens of thousands of units a year.",
    stances: {
      green: [2, "Would restart $1.4 billion in housing funds, including the Community Housing Fund and Indigenous Housing Fund, and build 26,000 affordable homes a year.", "day9"],
      ndp: [1, "Would direct additional tax revenue toward building affordable housing.", "bcPlat"]
    } },
  { id: "healthrecruit", topic: "Health care",
    text: "BC should actively recruit doctors and nurses from the United States and lure Canadian health workers home.",
    stances: {
      ndp: [2, "Pledges to triple U.S. health care recruitment, with loan forgiveness and relocation support through Health Match BC.", "day1"]
    } },
  { id: "privatehealth", topic: "Health care",
    text: "Private health care operations should be allowed alongside the public system.",
    stances: {
      onebc: [2, "Proposes private health care alongside fully funded public health care.", "bcOne"],
      green: [-2, "Pledges to \"keep every public health dollar in public care\".", "bcPlat"],
      ndp: [-1, "Frames its health plan around a public system that \"puts patients first\".", "day1", true]
    } },
  { id: "harmreduction", topic: "Public safety",
    text: "Safe supply, drug consumption sites and decriminalization should be eliminated or rolled back.",
    stances: {
      onebc: [2, "Would eliminate safe supply and consumption programs, convert existing sites to recovery centres and roll back decriminalization.", "bcOne"],
      green: [-2, "Would fight the toxic drug crisis through harm reduction, supervised sites, pharmaceutical alternatives and decriminalization.", "bcPlat"]
    } },
  { id: "extortion", topic: "Public safety",
    text: "BC should create dedicated tools against extortion of businesses, such as a specialized prosecution docket and a joint RCMP, CBSA and FINTRAC cell.",
    stances: {
      centre: [2, "Proposes a three-step extortion plan, a FINTRAC–RCMP–CBSA cell in Surrey, security micro-grants and a dedicated extortion docket.", "bcCentre"]
    } },
  { id: "wealthtax", topic: "Taxes & budget",
    text: "BC should introduce an annual wealth tax on net assets above $50 million.",
    stances: {
      green: [2, "The Fair Share Act would impose annual wealth taxes of 2% above $50M, 3% above $100M and 5% above $1B, to fund childcare, transit and housing.", "yahooTax"],
      con: [-2, "Rules out any new taxes.", "cpTax", true],
      onebc: [-2, "Promises 25% tax cuts rather than new taxes.", "bcOne", true]
    } },
  { id: "freetransit", topic: "Transportation",
    text: "Public transit should be free across BC.",
    stances: {
      green: [2, "Would use wealth tax revenue to fund free public transit.", "yahooTax"]
    } },
  { id: "grocery", topic: "Cost of living",
    text: "The province should cap retail margins on essential groceries and require per-unit shelf pricing.",
    stances: {
      ndp: [2, "Would cap corporate retailers' margins on essentials, mandate per-unit pricing and ban restrictions that block grocery competition.", "bcNdpCon"]
    } },
  { id: "seniorscare", topic: "Health care",
    text: "BC should expand seniors' care, including home care and long-term care staffing and beds.",
    stances: {
      ndp: [2, "Would add 500 health care workers for seniors and resume seven paused long-term care projects.", "yahooTax"],
      green: [2, "Commits to long-term and dementia care and community health centres.", "bcPlat"],
      centre: [2, "Would expand home care so seniors can age with dignity.", "bcCentre"]
    } },
  { id: "involuntary", topic: "Public safety",
    text: "BC should expand involuntary care for people with severe addiction and mental illness.",
    stances: {
      onebc: [2, "Would provide involuntary drug rehabilitation and housing for severely addicted people.", "bcOne"],
      ndp: [1, "Promised involuntary care at an immediately available site in the Kelowna region.", "bcNdpCon"],
      green: [-2, "Would fight the toxic drug crisis through harm reduction and voluntary care.", "bcPlat"]
    } },
  { id: "sogi", topic: "Schools",
    text: "SOGI 123 teaching resources should be removed from BC schools.",
    stances: {
      con: [2, "Platform pledges to repeal SOGI, and Doerkson said the resource \"has to be removed\".", "bcCon"],
      onebc: [2, "Would remove SOGI-123 and politicized content from classrooms and bring in a Parental Bill of Rights.", "bcOne"],
      ndp: [-1, "Reaffirms anti-bullying work in schools while ending an ARC Foundation grant.", "day4"],
      centre: [-1, "Promises not to repeal legislation protecting the right to be free from discrimination.", "bcCentre", true]
    } },
  { id: "minorscare", topic: "Schools",
    text: "Puberty blockers and hormone therapy for minors should be prohibited.",
    stances: {
      onebc: [2, "Proposed legislation to prohibit these treatments for minors; the bill was defeated 48–40.", "oneBC"]
    } },
  { id: "dripa", topic: "Indigenous relations",
    text: "BC should stay committed to the Declaration on the Rights of Indigenous Peoples Act (DRIPA) and ongoing reconciliation.",
    stances: {
      ndp: [2, "Says its commitment to DRIPA negotiations \"is not up for debate\", though it earlier proposed amendments and delayed changes after First Nations opposition.", "day4"],
      green: [2, "Would fund public education on DRIPA and teach Indigenous history to MLAs and staff.", "bcPlat"],
      centre: [1, "Would create a single provincial framework coordinating treaty and reconciliation mandates, funding and timelines.", "bcCentre"],
      con: [-2, "Platform pledges to repeal DRIPA.", "bcCon"],
      onebc: [-2, "Would repeal DRIPA and declare UNDRIP to have no force and effect in BC.", "bcOne"]
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
