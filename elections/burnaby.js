(function () {
  const SOURCES = {
    multiliving: { label: "MultiLiving – Burnaby mayor candidates on multiplex homes", url: "https://multiliving.ca/pulse/burnaby-mayor-council-candidates-2026-multiplex-homes-buyers" },
    ubyssey: { label: "The Ubyssey – Burnaby's race for mayor", url: "https://ubyssey.ca/news/municipal-elections-burnaby-mayor/" },
    newburnaby: { label: "New Burnaby – 2026 platform", url: "https://newburnaby.ca/platform/" },
    freshet: { label: "Freshet News – Burnaby candidates and slates", url: "https://www.freshetnews.ca/burnaby-mayors-seat-challenged-42-vying-for-eight-council-spots/" }
  };

  const PARTIES = [
    { id: "hurley", name: "Mike Hurley (independent)", leader: "Incumbent mayor seeking a third term", color: "#1b6ec2",
      blurb: "Continuity candidate: Burnaby Housing Authority (goal of 1,000 homes), infrastructure before growth, and a call for the Province to repeal its multiplex bills." },
    { id: "wang", name: "Hanzhi Wang (independent)", leader: "Software engineer, 29", color: "#2e8b3d",
      blurb: "Housing-cost focus: more mid-sized and mixed-use homes, phasing out development cost charges, bus lanes and transit priority." },
    { id: "petrovas", name: "Bill Petrovas (independent)", leader: "Former teacher and principal", color: "#d9480f",
      blurb: "Renewal platform: transit first, roads before new development, published approval timelines, a restored public question period and tax increases below inflation." },
    { id: "first", name: "Burnaby First", leader: "Heymann Yip (mayoral candidate)", color: "#c2255c",
      blurb: "\"Stop Monster Homes\": tighter multiplex limits, more resident consultation, parks protection and lower city hall spending." },
    { id: "newburnaby", name: "New Burnaby", leader: "Council slate (no mayoral candidate)", color: "#7048e8",
      blurb: "Property tax freeze then inflation caps, a ban on illicit drug use in public spaces, small-business permitting, parks protection and Burnaby Hospital Phase 2." }
  ];

  const UNSCORED = [
    { name: "Burnaby Citizens Association (BCA)", leader: "8 council candidates; the only full slate",
      note: "The longtime governing slate and NDP affiliate. No published 2026 platform was found, so it is not scored. New Burnaby says the BCA financial plan projects 7% yearly tax increases through 2030.", source: "newburnaby" },
    { name: "Restore Burnaby Alliance", leader: "7 council candidates",
      note: "A new slate. No published platform was found, so it is not scored.", source: "freshet" },
    { name: "Burnaby Green Party", leader: "4 council candidates",
      note: "No published 2026 platform was found, so it is not scored.", source: "freshet" },
    { name: "Sabina Hsu and \"Michael Angelo ABCRobinhood\" (independent mayoral candidates)", leader: "",
      note: "Hsu lists proposals for a property tax committee, surveillance cameras and a \"zero tolerance\" approach to crime; Robinhood lists seniors' housing and opposition to safe injection sites. Both platforms are very thin, so neither is scored.", source: "ubyssey" }
  ];

  const QUESTIONS = [
    { id: "multiplex", topic: "Housing",
      text: "Multiplex housing (up to six homes on a single-family lot) should be limited or repealed.",
      stances: {
        hurley: [2, "Wants the Province to repeal Bills 25, 44 and 47, which he says have allowed up to six homes on a lot.", "multiliving"],
        first: [2, "Its \"Stop Monster Homes\" plan would tighten multiplex rules, require more parking and tree replacement.", "multiliving"],
        wang: [-2, "Wants more mid-sized homes between detached houses and towers, with simpler approvals for what Bill 44 allows.", "multiliving"]
      } },
    { id: "approvals", topic: "Housing",
      text: "The City should commit to firm, published timelines for permit and housing approvals.",
      stances: {
        petrovas: [2, "Promises published timelines and quarterly reporting on approval times by application type.", "multiliving"],
        wang: [2, "Wants simpler approvals for mid-sized homes.", "multiliving"],
        hurley: [1, "Promises shorter approval times for new homes.", "multiliving"],
        first: [1, "Promises to simplify approvals and reduce delays.", "multiliving"],
        newburnaby: [1, "Would speed permits for daycares, renovations and small businesses.", "newburnaby"]
      } },
    { id: "housingauthority", topic: "Housing",
      text: "The City should build affordable rental homes directly through its own housing authority.",
      stances: {
        hurley: [2, "Created the Burnaby Housing Authority, with about 380 homes underway toward 1,000 in three years.", "ubyssey"],
        first: [1, "Favours low-rise rentals, co-op and non-profit homes.", "multiliving", true],
        petrovas: [1, "Backs a mix of rentals, townhomes and a rent-to-own program.", "multiliving", true]
      } },
    { id: "dcc", topic: "Housing",
      text: "The City should phase out development cost charges and per-home fees on new housing.",
      stances: {
        wang: [2, "Would phase out per-home City charges on new housing and shift more property tax onto the most valuable homes.", "multiliving"],
        first: [1, "Would lower fees for owners who add a suite or laneway home.", "multiliving", true]
      } },
    { id: "propertytax", topic: "Taxes",
      text: "Property taxes should be frozen or capped at inflation.",
      stances: {
        newburnaby: [2, "Would freeze property tax in its first budget and limit annual increases to inflation for four years.", "newburnaby"],
        petrovas: [1, "Proposes keeping property tax increases below inflation.", "ubyssey"],
        first: [1, "Would reduce city hall spending to lower taxes, without specifying cuts.", "ubyssey"]
      } },
    { id: "growthfirst", topic: "Growth",
      text: "Transit, schools and roads should be in place before the City approves more growth.",
      stances: {
        hurley: [2, "Argues transit and schools must come before growth and wants other governments to fund infrastructure.", "ubyssey"],
        petrovas: [2, "Wants roads built before new development.", "ubyssey"],
        first: [1, "Wants development that fits existing neighbourhoods, with density along transit corridors.", "ubyssey"],
        wang: [-1, "Wants more medium-density and mixed-use housing.", "ubyssey", true]
      } },
    { id: "transit", topic: "Transportation",
      text: "Improving transit should be the City's top transportation priority.",
      stances: {
        petrovas: [2, "Calls transit his main focus.", "ubyssey"],
        wang: [2, "Wants all-day bus lanes, transit priority at intersections and traffic calming.", "ubyssey"],
        hurley: [1, "Says transit must come before growth.", "ubyssey", true]
      } },
    { id: "publicdrug", topic: "Public safety",
      text: "Illicit drug use should be banned in public spaces and in government-funded housing.",
      stances: {
        newburnaby: [2, "Would ban illicit drug use in public spaces and government-funded housing and back treatment in well-managed facilities.", "newburnaby"]
      } },
    { id: "parks", topic: "Environment",
      text: "The City should oppose any reduction in parkland or green space.",
      stances: {
        newburnaby: [2, "Opposes reducing any park or green space and wants a park within a five-minute walk of every resident.", "newburnaby"],
        first: [2, "Its mayoral candidate founded Save Burnaby Parks & Green Spaces.", "ubyssey"]
      } },
    { id: "consultation", topic: "Governance",
      text: "The City should expand public consultation, including a public question period after council meetings.",
      stances: {
        petrovas: [2, "Proposes restoring a public question period after council meetings.", "ubyssey"],
        first: [2, "Wants more resident consultation on housing and development.", "ubyssey"],
        newburnaby: [1, "Promises consultation on street parking and transit planning.", "newburnaby"]
      } },
    { id: "hospital", topic: "Health care",
      text: "The City should press the Province to start and fully fund Burnaby Hospital Phase 2.",
      stances: {
        newburnaby: [2, "Would press the province to commit to a start date, provide the funds and build it as designed.", "newburnaby"]
      } }
  ];

  ELECTIONS.push({
    id: "burnaby", name: "Burnaby", group: "Municipal", status: "quiz",
    date: "2026-10-17", dateLabel: "October 17, 2026", advance: "Advance voting dates: see the City of Burnaby",
    updated: "2026-10-15",
    intro: "Agree or disagree with short statements about Burnaby issues. At the end you'll see which mayoral candidate or slate's published platform lines up best with your views, with reasons and sources.",
    caveat: "Most Burnaby mayoral candidates are independents, so the list mixes mayoral candidates and slates. The Burnaby Citizens Association, the Restore Burnaby Alliance and the Greens have no published platform I could find, so they are not scored.",
    sources: SOURCES, parties: PARTIES, unscored: UNSCORED, questions: QUESTIONS
  });
})();
