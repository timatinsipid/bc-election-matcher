(function () {
  const SOURCES = {
    ubyssey: { label: "The Ubyssey – Delta's race for mayor", url: "https://ubyssey.ca/news/municipal-elections-delta-mayor-race/" }
  };

  const PARTIES = [
    { id: "a4d", name: "Achieving for Delta (A4D)", leader: "George Harvie (incumbent mayor)", color: "#1b6ec2",
      blurb: "Fiscal responsibility and low residential taxes, a bigger industrial and commercial tax base, protecting farmland and funding police and fire." },
    { id: "onedelta", name: "One Delta", leader: "Dylan Kruger", color: "#2e8b3d",
      blurb: "Formed by councillors who left A4D: no new taxes, levies or fees, an economic development office and more frequent bus service." },
    { id: "deltafirst", name: "DeltaFirst", leader: "Melissa Granum", color: "#d9480f",
      blurb: "First-time candidate and former police employee: densification, public safety, healthcare advocacy and restoring question period." }
  ];

  const QUESTIONS = [
    { id: "nonewtaxes", topic: "Taxes",
      text: "Delta should commit to no new taxes, levies or fees.",
      stances: {
        onedelta: [2, "Pledges no new taxes, levies or fees, without explaining how rising costs would be covered.", "ubyssey"],
        a4d: [1, "Campaigns on low residential taxes and says Delta's finances are in the best shape ever.", "ubyssey"]
      } },
    { id: "taxbase", topic: "Economy",
      text: "Delta should expand its industrial and commercial tax base and create a dedicated economic development office.",
      stances: {
        a4d: [2, "Would expand the industrial and commercial tax base.", "ubyssey"],
        onedelta: [2, "Proposes an economic development office and improved industrial areas.", "ubyssey"]
      } },
    { id: "metro", topic: "Governance",
      text: "Delta should withdraw from non-essential Metro Vancouver services.",
      stances: {
        a4d: [2, "Is campaigning to withdraw Delta from non-essential Metro Vancouver services.", "ubyssey"]
      } },
    { id: "farmland", topic: "Environment",
      text: "Delta should protect agricultural land from development.",
      stances: {
        a4d: [2, "Would protect agricultural land.", "ubyssey"]
      } },
    { id: "participation", topic: "Governance",
      text: "Delta should restore question period, citizen advisory committees and a youth council.",
      stances: {
        deltafirst: [2, "Her 90-day plan restores question period, re-establishes citizen advisory committees and publishes budget reports.", "ubyssey"],
        onedelta: [2, "Would return accountability committees and youth council meetings.", "ubyssey"],
        a4d: [1, "Campaigns on citizen participation.", "ubyssey"]
      } },
    { id: "policefire", topic: "Public safety",
      text: "Delta should prioritize funding for police and fire services.",
      stances: {
        a4d: [2, "Would fund police and fire services.", "ubyssey"],
        deltafirst: [1, "Makes public safety a core platform point.", "ubyssey", true]
      } },
    { id: "bus", topic: "Transportation",
      text: "Delta should push for more frequent and reliable bus service.",
      stances: {
        onedelta: [2, "Proposes more frequent and reliable bus service.", "ubyssey"]
      } },
    { id: "density", topic: "Housing",
      text: "Delta should allow more densification.",
      stances: {
        deltafirst: [2, "Her platform includes densification.", "ubyssey"]
      } }
  ];

  ELECTIONS.push({
    id: "delta", name: "Delta", group: "Municipal", status: "quiz",
    date: "2026-10-17", dateLabel: "October 17, 2026", advance: "Advance voting dates: see the Corporation of Delta",
    updated: "2026-10-15",
    intro: "Agree or disagree with short statements about Delta issues. At the end you'll see which mayoral slate's published platform lines up best with your views, with reasons and sources.",
    caveat: "Delta's platform coverage is thin and comes from one profile of the three mayoral candidates (Harvie did not respond to that outlet's interview request). Council slates are not scored.",
    sources: SOURCES, parties: PARTIES, unscored: [], questions: QUESTIONS
  });
})();
