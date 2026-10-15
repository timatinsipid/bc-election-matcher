/* Lower Mainland municipalities without a scored quiz.
 *
 * These pages show what was found (candidates, slates, highlights) plus links
 * to the official and independent candidate lists. No alignment score is shown
 * because no usable party/candidate platform data was found for them.
 */
(function () {
  const EBC = { label: "Elections BC – registered candidates for the 2026 general local elections (PDF)", url: "https://elections.bc.ca/docs/lecfa/Registered-Candidates-LEGE-2026-10-17.pdf" };
  const vm = (id, variant) => ({
    label: "VoteMate – candidates and platforms",
    url: "https://votemate.org/bc2026/" + (variant ? "candidates" : "") + "?riding=" + id
  });
  const UPDATED = "2026-10-15";
  const BASE = {
    group: "Municipal", status: "directory",
    date: "2026-10-17", dateLabel: "October 17, 2026", advance: "Advance voting dates: see your municipality's website",
    updated: UPDATED
  };
  const NO_QUIZ = "No alignment quiz for this municipality: I did not find published party or candidate platforms detailed enough to score. ";

  const entries = [
    { id: "coquitlam", name: "Coquitlam",
      summary: NO_QUIZ + "Coquitlam's three mayoral candidates are summarized below from a Sept 13 report; no slates or parties were mentioned.",
      candidates: [
        "Craig Hodge (sitting councillor): continuity and public safety, with more RCMP foot patrols, community safety officers and gang resources.",
        "Madhavee Inamdar (public sector strategist): the change candidate, with growth matched by infrastructure, a property tax support package for low-income seniors and a citywide value-for-money review.",
        "Trish Mandewo (sitting councillor, former UBCM president): growth should pay for itself, with housing choice, a bigger commercial tax base and development contributing fairly to services."
      ],
      links: [
        { label: "Tri-Cities Dispatch – three candidates vying to be Coquitlam's next mayor", url: "https://tricitiesdispatch.com/three-candidates-vying-to-be-coquitlams-next-mayor/" },
        { label: "City of Coquitlam – elections", url: "https://www.coquitlam.ca/729/Elections" },
        vm(799), EBC ] },
    { id: "new-westminster", name: "New Westminster",
      summary: NO_QUIZ + "New Westminster has two slates. Only the New West Progressives have published a detailed platform, so there is nothing to compare it against; its highlights are listed below.",
      candidates: [
        "Patrick Johnstone (Community First New West): incumbent mayor. The slate has 11 candidates (six council, five school board) and no published platform was found.",
        "Daniel Fontaine (New West Progressives): councillor and mayoral candidate, with full slates of six council and six school board candidates."
      ],
      highlights: [
        "New West Progressives platform: keep property tax increases at or below inflation, launch a core services review within six months and cut consultant spending by at least 20%.",
        "Housing: cut permit approval times by at least 40%, focus growth near SkyTrain hubs and support the 10% inclusionary housing requirement and renter protections.",
        "Public safety: add at least 12 community enforcement and safety officers, triple the I's On the Street program and explore a mental-health response program with police and Fraser Health.",
        "Other: free transit for under-18s (with the Province), eliminate the 3.5% electricity surcharge within 30 days, and a third arena as a priority."
      ],
      links: [
        { label: "New West Progressives – 2026 platform (PDF)", url: "https://nwprogress.ca/wp-content/uploads/2026/09/NPW-platform-2026.pdf" },
        { label: "City of New Westminster – 2026 candidates", url: "https://www.newwestcity.ca/city_hall/election_information/2026-candidates" },
        { label: "Freshet News – candidates vying for mayor, council and trustee seats", url: "https://www.freshetnews.ca/26-candidates-vying-for-mayor-councillor-and-trustee-seats-in-new-westminster/" },
        vm(807), EBC ] },
    { id: "port-coquitlam", name: "Port Coquitlam",
      summary: NO_QUIZ + "Use the official candidate list below.",
      links: [
        { label: "City of Port Coquitlam – candidates", url: "https://www.portcoquitlam.ca/our-government/elections/candidates" },
        vm(808), EBC ] },
    { id: "port-moody", name: "Port Moody",
      summary: NO_QUIZ + "Use the official candidate list and local coverage below.",
      links: [
        { label: "City of Port Moody – declared candidates", url: "https://www.portmoody.ca/city-government/elections/declared-candidates/" },
        { label: "The Inlet – Port Moody election 2026 coverage", url: "https://inletcurrent.ca/pomo-election-2026/" },
        vm(813), EBC ] },
    { id: "north-vancouver-city", name: "North Vancouver (City)",
      summary: NO_QUIZ + "Use the City's candidate announcement and the candidate Q&As below.",
      links: [
        { label: "City of North Vancouver – candidates announced", url: "https://www.cnv.org/City-Hall/News-Room/Whats-New/2026/9/15/Candidates-announced-for-the-2026-General-Local-Election" },
        { label: "North Shore News – City of North Vancouver candidate Q&As", url: "https://www.nsnews.com/local-news/civic-election-2026-qa-with-city-of-north-vancouver-candidates-12845369" },
        { label: "North Van Votes – all candidates", url: "https://northvanvotes.ca/candidates/" },
        vm(809), EBC ] },
    { id: "north-vancouver-district", name: "North Vancouver (District)",
      summary: NO_QUIZ + "Use the District's candidate list and business Q&As below.",
      links: [
        { label: "District of North Vancouver – see who is running", url: "https://www.dnv.org/government-administration/see-who-is-running" },
        { label: "North Vancouver Chamber – candidates respond to key business issues", url: "https://www.nvchamber.ca/blog/municipal-election-qas/" },
        { label: "North Van Votes – all candidates", url: "https://northvanvotes.ca/candidates/" },
        vm(806), EBC ] },
    { id: "west-vancouver", name: "West Vancouver",
      summary: NO_QUIZ + "Use the candidate lists below.",
      links: [ { label: "North Van Votes – all candidates", url: "https://northvanvotes.ca/candidates/" }, vm(810), EBC ] },
    { id: "langley-city", name: "Langley (City)",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(814), EBC ] },
    { id: "langley-township", name: "Langley (Township)",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(800), EBC ] },
    { id: "maple-ridge", name: "Maple Ridge",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(805, true), EBC ] },
    { id: "pitt-meadows", name: "Pitt Meadows",
      summary: NO_QUIZ + "VoteMate does not cover Pitt Meadows; use the Elections BC list.", links: [ EBC ] },
    { id: "white-rock", name: "White Rock",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(826, true), EBC ] },
    { id: "abbotsford", name: "Abbotsford",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(798), EBC ] },
    { id: "mission", name: "Mission",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(811), EBC ] },
    { id: "chilliwack", name: "Chilliwack",
      summary: NO_QUIZ + "Use the candidate lists below.", links: [ vm(816), EBC ] },
    { id: "anmore", name: "Anmore",
      summary: NO_QUIZ + "VoteMate does not cover Anmore; use the Elections BC list.", links: [ EBC ] },
    { id: "belcarra", name: "Belcarra",
      summary: NO_QUIZ + "VoteMate does not cover Belcarra; use the Elections BC list.", links: [ EBC ] },
    { id: "lions-bay", name: "Lions Bay",
      summary: NO_QUIZ + "VoteMate does not cover Lions Bay; use the Elections BC list.", links: [ EBC ] },
    { id: "bowen-island", name: "Bowen Island",
      summary: NO_QUIZ + "VoteMate does not cover Bowen Island; use the Elections BC list.", links: [ EBC ] }
  ];

  entries.forEach((e) => {
    ELECTIONS.push(Object.assign({}, BASE, e, {
      caveat: "Not researched in depth. Check the candidate lists below before you vote.",
      sources: {}, parties: [], unscored: [], questions: []
    }));
  });
})();
