(function () {
  const SOURCES = {
    ubyssey: { label: "The Ubyssey – Surrey's race for mayor", url: "https://ubyssey.ca/news/municipal-elections-surrey-mayor-race/" },
    runner: { label: "The Runner – Surrey votes: a breakdown of the 2026 party platforms", url: "https://runnermag.ca/2026/10/surrey-votes-a-breakdown-of-the-2026-municipal-party-platforms/" },
    wiki: { label: "Wikipedia – 2026 Surrey municipal election (carries a conflict-of-interest notice)", url: "https://en.wikipedia.org/wiki/2026_Surrey_municipal_election" }
  };

  const PARTIES = [
    { id: "connect", name: "Surrey Connect", leader: "Brenda Locke (incumbent mayor)", color: "#1b6ec2",
      blurb: "Governing slate: keep tax increases at or below inflation, continue the Surrey Police Service and invest $1.496B in facilities, parks and streets." },
    { id: "ssc", name: "Safe Surrey Coalition", leader: "Doug McCallum (former mayor)", color: "#c92a2a",
      blurb: "Four-year property tax freeze, SkyTrain to Newton, zero tolerance on crime and extortion, and withdrawal from Metro Vancouver except utilities." },
    { id: "first", name: "Surrey First", leader: "Linda Annis (councillor)", color: "#e8590c",
      blurb: "No property tax increase in 2027, finish the policing transition, an independent auditor general and a new recreation centre every 16 months." },
    { id: "imagine", name: "Imagine Surrey", leader: "Mike Starchuk (former MLA)", color: "#7048e8",
      blurb: "Extortion as the top priority, bus rapid transit, a $70 monthly TransLink pass, 50 km of new sidewalks and an empty homes tax." },
    { id: "cea", name: "Conservative Party of Surrey", leader: "Honveer Singh Randhawa", color: "#1c7ed6",
      blurb: "Fully fund policing, halve water bills by funding water meters, a new hospital on city land and an entertainment district." },
    { id: "now", name: "Surrey Now", leader: "Troy Van Vliet", color: "#0c8599",
      blurb: "Rent-to-own for first-time buyers, family-sized homes over investor condos, an extortion report and removing school portables." }
  ];

  const QUESTIONS = [
    { id: "propertytax", topic: "Taxes",
      text: "Surrey should freeze property taxes, even if it limits new spending.",
      stances: {
        ssc: [2, "Pledges no property tax increase over the next four years.", "runner"],
        first: [2, "Pledges no property tax increase in 2027.", "runner"],
        connect: [1, "Would keep increases at or below inflation but won't commit to a four-year freeze.", "runner"]
      } },
    { id: "policetransition", topic: "Public safety",
      text: "Surrey should complete the transition from the RCMP to the Surrey Police Service.",
      stances: {
        first: [2, "Promises to complete the policing transition.", "runner"],
        connect: [1, "Criticized the transition but agreed in 2024 to continue with the Surrey Police Service.", "runner"],
        ssc: [2, "Promises to complete the Surrey Police Service transition and give it a helicopter and drone fleet within 90 days.", "ubyssey"]
      } },
    { id: "policingfund", topic: "Public safety",
      text: "Surrey should fully fund policing and add more public safety staff.",
      stances: {
        cea: [2, "Promises to fully fund policing.", "wiki"],
        connect: [1, "Plans more public-safety staff.", "wiki"],
        first: [2, "Linda Annis pledges to hire 300 more police officers.", "ubyssey"]
      } },
    { id: "extortion", topic: "Public safety",
      text: "Surrey should treat extortion as a top priority, with regular public reporting.",
      stances: {
        imagine: [2, "Makes extortion his top priority, with regular public briefings.", "wiki"],
        now: [2, "Would request a joint public report on rising extortion within 100 days.", "runner"],
        ssc: [2, "Proposes a \"zero tolerance\" approach to crime and extortion.", "wiki"],
        first: [1, "Would focus council on gangs and extortion.", "wiki"],
        connect: [1, "Plans more public-safety staff.", "wiki", true]
      } },
    { id: "skytrain", topic: "Transportation",
      text: "Surrey should push to extend SkyTrain to Newton.",
      stances: {
        ssc: [2, "Pledges a SkyTrain extension to Newton.", "runner"],
        connect: [1, "Touts RapidBus and SkyTrain advocacy.", "wiki"],
        first: [-1, "Supports light rail rather than SkyTrain.", "wiki", true]
      } },
    { id: "transitfares", topic: "Transportation",
      text: "Surrey should push for cheaper, more integrated transit fares and better bus service.",
      stances: {
        imagine: [2, "Proposes a $70 monthly TransLink pass, bus rapid transit routes and washrooms at bus loops.", "runner"]
      } },
    { id: "recreation", topic: "Services & culture",
      text: "Surrey should spend heavily on new recreation centres, pools, rinks and arenas.",
      stances: {
        first: [2, "Promises $600M over four years for a new recreation centre every 16 months, plus a 20-year parks and rinks plan.", "runner"],
        connect: [2, "Plans $1.496B in facilities, parks and streets, including a South Surrey ice arena.", "runner"],
        ssc: [2, "Promises new pools for Clayton Heights and City Centre and a Newton community centre with a pool.", "runner"],
        imagine: [1, "Would cut senior recreation fees.", "wiki"]
      } },
    { id: "arena", topic: "Services & culture",
      text: "Surrey should cancel the proposed City Centre arena and redirect the money to parks, pools and recreation.",
      stances: {
        first: [2, "Would cancel the proposed City Centre arena and redirect money to recreation.", "wiki"],
        connect: [-2, "Touts the City Centre arena process as part of her record.", "wiki"]
      } },
    { id: "audit", topic: "Governance",
      text: "Surrey should commission an independent audit of City Hall's finances and land deals.",
      stances: {
        first: [2, "Would hire an independent auditor general to review city programs and finances.", "runner"],
        ssc: [2, "Proposes an independent forensic audit of City Hall land deals and an end to in-camera meetings.", "runner"]
      } },
    { id: "metro", topic: "Governance",
      text: "Surrey should withdraw from Metro Vancouver, keeping only water, sewer and waste services.",
      stances: {
        ssc: [2, "Would remove Surrey from the Metro Vancouver Regional District while keeping utility services.", "runner"],
        first: [-1, "Wants Metro Vancouver reform (a smaller board, no meeting fees and an audit) rather than withdrawal.", "wiki", true]
      } },
    { id: "emptyhomes", topic: "Housing",
      text: "Surrey should push for an empty homes tax.",
      stances: {
        imagine: [2, "Proposes an empty homes tax aimed at homes nobody lives in or rents.", "runner"]
      } },
    { id: "familyhomes", topic: "Housing",
      text: "Surrey should prioritize family-sized homes and rent-to-own programs over investor condos.",
      stances: {
        now: [2, "Proposes a rent-to-own program for first-time buyers and prioritizing family-sized units over investor condos.", "runner"]
      } },
    { id: "hospital", topic: "Health care",
      text: "Surrey should offer city-owned land at 6965 King George Boulevard for a new hospital.",
      stances: {
        ssc: [2, "Proposes a hospital on city-owned land at 6965 King George Boulevard.", "runner"],
        cea: [2, "Proposes a senior and children's hospital at 6965 King George Boulevard, dedicating the city land within 100 days.", "runner"]
      } },
    { id: "permits", topic: "Housing",
      text: "Surrey should commit to issuing all city permits within 60 days.",
      stances: {
        ssc: [2, "Would fast-track applications and issue all city permits within 60 days.", "runner"]
      } }
  ];

  const UNSCORED = [
    { name: "New Surrey+ (Igal Ammons II)", leader: "",
      note: "Proposes a single-fare transit network from West Vancouver to Abbotsford Airport, a clinic in each of six neighbourhoods and evenly split investment across six town centres. Its single-fare transit network maps to only one quiz question (transit fares); every scored slate has at least two stances, so it is not scored.", source: "runner" }
  ];

  ELECTIONS.push({
    id: "surrey", name: "Surrey", group: "Municipal", status: "quiz",
    date: "2026-10-17", dateLabel: "October 17, 2026", advance: "Advance voting dates: see the City of Surrey",
    updated: "2026-10-15",
    intro: "Agree or disagree with short statements about Surrey issues. At the end you'll see which slate's published platform lines up best with your views, with reasons and sources.",
    caveat: "Surrey has seven mayoral slates; six are scored and New Surrey+ is not, because its platform maps to only one quiz question, and a slate needs at least two to be scored. Independents are not included. Several platforms (Conservative, Surrey Now) are thin, and most are summarized from one press breakdown, so verify before you vote.",
    sources: SOURCES, parties: PARTIES, unscored: UNSCORED, questions: QUESTIONS
  });
})();
