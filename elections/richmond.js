(function () {
  const SOURCES = {
    yahoo: { label: "Yahoo News/CP – Richmond mayoral race: a tight three-way battle", url: "https://ca.news.yahoo.com/richmond-mayoral-race-tight-three-130024545.html" },
    slates: { label: "Smart Richmond – Richmond election slates 2026", url: "https://smartrichmond.ca/richmond-election-slates-2026" }
  };

  const PARTIES = [
    { id: "heed", name: "Kash Heed (independent)", leader: "Richmond councillor, former BC solicitor general", color: "#1b6ec2",
      blurb: "Law and order, a budget accountability office, secure care for complex addiction and mental-health needs, and overturning the Cowichan decision." },
    { id: "loo", name: "Richmond Strong", leader: "Alexa Loo", color: "#2e8b3d",
      blurb: "Community safety with more police foot patrols, streamlined permitting, less business-licence red tape and tax increases tied to demonstrable costs." },
    { id: "howard", name: "Richmond Forward", leader: "Rob Howard", color: "#d9480f",
      blurb: "Pro-business: faster housing permitting, safer streets, an independent audit of spending and a waterfront park and arts district." },
    { id: "cheung", name: "We Are Richmond", leader: "Dickens Cheung", color: "#c92a2a",
      blurb: "Private property rights, safe streets and \"the strongest possible restrictions\" on public drug use." },
    { id: "kang", name: "Action Richmond", leader: "Mei Kang", color: "#7048e8",
      blurb: "\"Safety first\": more police visibility, a spending review to fund front-line mental-health services and lower developer fees." }
  ];

  const UNSCORED = [
    { name: "Council slates: Advance Richmond, Richmond Citizens (RCA), RITE Richmond, Common Sense, Conservative, Richmond United and ONE Richmond", leader: "",
      note: "Richmond has 13 elector organizations. This page scores only the five mayoral candidates whose platforms were reported. Council slates are not scored because no platform summaries were found; 31 council candidates also run with no organization.", source: "slates" },
    { name: "Goldentiger King and Dennet Lee (mayoral candidates)", leader: "",
      note: "King backs subsidized small-business space, lower developer fees and AI data centres; Lee has said little about specific policies. Neither is scored.", source: "yahoo" }
  ];

  const QUESTIONS = [
    { id: "cowichan", topic: "Property & legal",
      text: "Richmond should support the effort to have the Cowichan Tribes land title decision overturned or appealed.",
      stances: {
        heed: [2, "Hopes the courts overturn the Cowichan land title decision.", "yahoo"],
        loo: [2, "Wants to protect fee simple properties after the Cowichan decision.", "yahoo"],
        howard: [2, "Supports appealing the Cowichan decision.", "yahoo"],
        cheung: [1, "Defends private property rights.", "yahoo", true]
      } },
    { id: "supportive", topic: "Housing",
      text: "Richmond should extend its modular supportive housing lease at Aster Place.",
      stances: {
        heed: [-2, "Voted against extending the Aster Place modular housing lease.", "yahoo"],
        loo: [-2, "Voted against the Aster Place extension.", "yahoo"]
      } },
    { id: "permits", topic: "Housing",
      text: "Richmond should speed up housing permits.",
      stances: {
        howard: [2, "Backs faster housing permitting.", "yahoo"],
        loo: [2, "Proposes streamlining permitting.", "yahoo"]
      } },
    { id: "devfees", topic: "Housing",
      text: "Richmond should lower developer fees.",
      stances: {
        kang: [2, "Wants lower developer fees.", "yahoo"]
      } },
    { id: "policing", topic: "Public safety",
      text: "Richmond should increase police visibility, with more foot patrols and early intervention at problem spots.",
      stances: {
        loo: [2, "Proposes more police foot patrols and early intervention at problem spots and homeless camps.", "yahoo"],
        kang: [2, "Her \"safety first\" platform calls for more police visibility.", "yahoo"],
        heed: [2, "Runs on law and order.", "yahoo"],
        howard: [1, "Backs safer streets.", "yahoo"],
        cheung: [1, "Defends safe streets.", "yahoo"]
      } },
    { id: "druguse", topic: "Public safety",
      text: "Richmond should impose the strongest possible restrictions on public drug use and oppose supervised consumption sites.",
      stances: {
        cheung: [2, "Promises \"the strongest possible restrictions\" on public drug use and joined protests against a supervised consumption site in 2024.", "yahoo"]
      } },
    { id: "securecare", topic: "Public safety",
      text: "Richmond should push for secure care for people with complex addiction and mental-health needs.",
      stances: {
        heed: [2, "Wants more support for people with complex addiction and mental-health needs, including secure care.", "yahoo"]
      } },
    { id: "audit", topic: "Governance",
      text: "Richmond should create an independent audit or accountability office for city spending.",
      stances: {
        howard: [2, "Backs an independent audit of spending.", "yahoo"],
        heed: [2, "Proposes a budget accountability office.", "yahoo"],
        kang: [1, "Wants a spending review.", "yahoo"],
        loo: [1, "Would tie property tax increases to demonstrable costs.", "yahoo", true]
      } }
  ];

  ELECTIONS.push({
    id: "richmond", name: "Richmond", group: "Municipal", status: "quiz",
    date: "2026-10-17", dateLabel: "October 17, 2026", advance: "Advance voting dates: see the City of Richmond",
    updated: "2026-10-15",
    intro: "Agree or disagree with short statements about Richmond issues. At the end you'll see which mayoral candidate's published positions line up best with your views, with reasons and sources.",
    caveat: "This page scores only mayoral candidates, based on a single news summary of their platforms, so coverage is thin. It does not score council slates or independents running for council.",
    sources: SOURCES, parties: PARTIES, unscored: UNSCORED, questions: QUESTIONS
  });
})();
