(function () {
  "use strict";

  var LABELS = [
    { v: -2, t: "Strongly disagree" },
    { v: -1, t: "Disagree" },
    { v: 0, t: "Neutral" },
    { v: 1, t: "Agree" },
    { v: 2, t: "Strongly agree" }
  ];
  var ANSWER_TEXT = { "-2": "strongly disagreed", "-1": "disagreed", "0": "were neutral", "1": "agreed", "2": "strongly agreed" };
  var STANCE_TEXT = { "-2": "strongly opposes", "-1": "leans against", "1": "leans toward", "2": "strongly supports" };

  var app = document.getElementById("app");
  var select = document.getElementById("election-select");
  var E = null; // current election
  var state = null;

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "text") el.textContent = attrs[k];
      else if (k.indexOf("on") === 0) el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return el;
  }
  function clear() { while (app.firstChild) app.removeChild(app.firstChild); }
  function pct(x) { return Math.round(x * 100) + "%"; }
  function focusHeading() { var hd = app.querySelector("h2"); if (hd) { hd.setAttribute("tabindex", "-1"); hd.focus({ preventScroll: true }); } window.scrollTo(0, 0); }
  function fmtDate(iso) {
    var d = new Date(iso + "T12:00:00Z");
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  }
  function resetState() { state = { i: -1, answers: {}, important: {} }; }

  function updatedPill() {
    return h("span", { class: "updated" }, ["Data last updated: ", h("strong", { text: fmtDate(E.updated) })]);
  }
  function metaRow() {
    return h("div", { class: "meta-row" }, [
      updatedPill(),
      h("span", { class: "updated", text: "Election day: " + E.dateLabel + (E.advance ? " · " + E.advance : "") })
    ]);
  }
  function sourceLink(key) {
    var s = E.sources[key];
    return s ? h("a", { href: s.url, target: "_blank", rel: "noopener noreferrer", text: s.label }) : null;
  }
  function extLink(l) {
    return h("a", { href: l.url, target: "_blank", rel: "noopener noreferrer", text: l.label });
  }

  /* ---------- election picker ---------- */
  function buildPicker() {
    var groups = [
      { label: "Provincial", match: function (e) { return e.group === "Provincial"; } },
      { label: "Municipal – alignment quiz", match: function (e) { return e.group === "Municipal" && e.status === "quiz"; } },
      { label: "Municipal – candidate info only", match: function (e) { return e.group === "Municipal" && e.status !== "quiz"; } }
    ];
    groups.forEach(function (g) {
      var og = document.createElement("optgroup");
      og.label = g.label;
      ELECTIONS.filter(g.match).forEach(function (e) {
        var o = document.createElement("option");
        o.value = e.id;
        o.textContent = e.name + " – " + fmtDate(e.date).replace(/, \d{4}$/, "");
        og.appendChild(o);
      });
      if (og.childNodes.length) select.appendChild(og);
    });
    select.addEventListener("change", function () { location.hash = select.value; });
    window.addEventListener("hashchange", route);
  }

  function route() {
    var id = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    var found = ELECTIONS.filter(function (e) { return e.id === id; })[0] || ELECTIONS[0];
    E = found;
    select.value = E.id;
    document.title = E.name + " – Lower Mainland & BC Election Matcher";
    resetState();
    if (E.status === "quiz") renderIntro(); else renderDirectory();
  }

  /* ---------- directory (info-only) pages ---------- */
  function renderDirectory() {
    clear();
    var card = h("section", { class: "card" }, [
      h("h2", { text: E.name + " election" }),
      metaRow(),
      h("p", { text: E.summary })
    ]);
    if (E.candidates && E.candidates.length) {
      card.appendChild(h("h3", { text: "Candidates and slates found" }));
      card.appendChild(h("ul", { class: "plain-list" }, E.candidates.map(function (c) { return h("li", { text: c }); })));
    }
    if (E.highlights && E.highlights.length) {
      card.appendChild(h("h3", { text: "Platform highlights" }));
      card.appendChild(h("ul", { class: "plain-list" }, E.highlights.map(function (c) { return h("li", { text: c }); })));
    }
    card.appendChild(h("h3", { text: "Where to look" }));
    card.appendChild(h("ul", { class: "link-list" }, (E.links || []).map(function (l) { return h("li", {}, [extLink(l)]); })));
    card.appendChild(h("p", { class: "disclaimer", text: E.caveat }));
    app.appendChild(card);
    focusHeading();
  }

  /* ---------- quiz ---------- */
  function renderIntro() {
    clear();
    app.appendChild(h("section", { class: "card" }, [
      h("h2", { text: E.name + (E.group === "Provincial" ? "" : " civic election") }),
      metaRow(),
      h("p", { text: "There are " + E.questions.length + " statements. " + E.intro }),
      h("p", { class: "muted", text: "Covered: " + E.parties.map(function (p) { return p.name; }).join(", ") + "." }),
      h("p", { class: "disclaimer", text: E.caveat }),
      h("div", { class: "row" }, [h("span"), h("button", { class: "btn primary", text: "Start", onclick: function () { state.i = 0; renderQuestion(); } })])
    ]));
    focusHeading();
  }

  function setAnswer(q, v) { state.answers[q.id] = v; next(); }
  function next() {
    if (state.i < E.questions.length - 1) { state.i++; renderQuestion(); } else { renderResults(); }
  }

  function renderQuestion() {
    clear();
    var Q = E.questions;
    var q = Q[state.i];
    var cur = state.answers[q.id];
    var prog = h("div", { class: "progress", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": String(Q.length), "aria-valuenow": String(state.i + 1) }, [h("span")]);
    prog.firstChild.style.width = (state.i / Q.length * 100) + "%";

    var choices = h("div", { class: "choices", role: "group", "aria-label": "Your answer" }, LABELS.map(function (l) {
      return h("button", { class: "choice", type: "button", "aria-pressed": String(cur === l.v), text: l.t, onclick: function () { setAnswer(q, l.v); } });
    }));
    var imp = h("input", { type: "checkbox", id: "imp" });
    imp.checked = !!state.important[q.id];
    imp.addEventListener("change", function () { state.important[q.id] = imp.checked; });

    app.appendChild(h("section", { class: "card" }, [
      prog,
      h("p", { class: "muted", text: E.name + " · Question " + (state.i + 1) + " of " + Q.length }),
      h("span", { class: "topic", text: q.topic }),
      h("h2", { class: "qtext", text: q.text }),
      choices,
      h("div", { class: "row" }, [
        h("label", { class: "imp", for: "imp" }, [imp, "This issue matters a lot to me"]),
        h("button", { class: "btn", type: "button", text: "Skip", onclick: function () { state.answers[q.id] = null; next(); } })
      ]),
      h("div", { class: "row" }, [
        h("button", { class: "btn", type: "button", text: "Back", disabled: state.i === 0, onclick: function () { state.i--; renderQuestion(); } }),
        h("button", { class: "btn", type: "button", text: "Finish now", onclick: renderResults })
      ])
    ]));
    focusHeading();
  }

  function reasonEl(it, good) {
    var stanceWord = STANCE_TEXT[String(it.stance)] || "";
    return h("div", { class: "reason" }, [
      h("div", { class: "tags" }, [
        h("span", { class: "tag " + (good ? "good" : "warn"), text: good ? "You and they align" : "You differ" }),
        h("span", { class: "tag", text: "You " + ANSWER_TEXT[String(it.answer)] }),
        h("span", { class: "tag", text: "Party " + stanceWord }),
        it.inferred ? h("span", { class: "tag", text: "inferred from related platform item" }) : null,
        it.weight > 1 ? h("span", { class: "tag", text: "important to you" }) : null
      ]),
      h("div", { class: "q", text: "“" + it.q.text + "”" }),
      h("div", { text: it.note }),
      h("div", { class: "muted" }, ["Source: ", sourceLink(it.source)])
    ]);
  }

  function renderResults() {
    clear();
    var answered = E.questions.filter(function (q) { return state.answers[q.id] !== undefined && state.answers[q.id] !== null; }).length;
    if (answered < 3) {
      app.appendChild(h("section", { class: "card" }, [
        h("h2", { text: "Answer a few more questions" }),
        h("p", { text: "Please answer at least 3 questions so the match means something." }),
        h("div", { class: "row" }, [h("button", { class: "btn primary", text: "Continue", onclick: function () { state.i = Math.max(0, Math.min(state.i, E.questions.length - 1)); renderQuestion(); } })])
      ]));
      focusHeading();
      return;
    }
    var results = computeResults(state.answers, state.important, E.parties, E.questions);
    var top = results[0];
    var split = splitReasons(top);

    app.appendChild(h("section", { class: "card winner" }, [
      h("p", { class: "muted", text: "Your closest match in " + E.name }),
      h("h2", { text: top.party.name }),
      h("div", { class: "pct", text: pct(top.score) }),
      h("p", { class: "muted", text: top.party.leader + ". Based on " + top.n + " of your " + answered + " answered questions where this party has a documented position." }),
      h("p", { text: top.party.blurb }),
      metaRow()
    ]));

    var why = h("section", { class: "card" }, [h("h2", { text: "Why " + top.party.name + "?" })]);
    if (split.agree.length) {
      why.appendChild(h("h3", { text: "Where your views line up with their platform" }));
      split.agree.slice(0, 6).forEach(function (it) { why.appendChild(reasonEl(it, true)); });
    } else {
      why.appendChild(h("p", { text: "You didn't take a strong position on issues this party has addressed, so its score mostly reflects the absence of disagreement." }));
    }
    if (split.differ.length) {
      why.appendChild(h("h3", { text: "Where you differ" }));
      split.differ.slice(0, 4).forEach(function (it) { why.appendChild(reasonEl(it, false)); });
    }
    app.appendChild(why);

    var list = h("ul", { class: "party-list" }, results.map(function (r) {
      var bar = h("div", { class: "bar", role: "img", "aria-label": r.party.name + " " + pct(r.score) }, [h("span")]);
      bar.firstChild.style.width = pct(r.score);
      bar.firstChild.style.background = r.party.color;
      return h("li", {}, [
        h("div", { class: "bar-head" }, [h("strong", { text: r.party.name }), h("span", { text: pct(r.score) + "  ·  " + r.n + " issues compared" })]),
        bar
      ]);
    }));
    var allCard = h("section", { class: "card" }, [h("h2", { text: "All parties and candidates scored" }), list]);
    (E.unscored || []).forEach(function (u) {
      allCard.appendChild(h("p", { class: "disclaimer unscored" }, [h("strong", { text: u.name + " (not scored): " }), u.note + " ", sourceLink(u.source)]));
    });
    app.appendChild(allCard);

    var more = h("section", { class: "card" }, [
      h("h2", { text: "Explore other parties" }),
      h("p", { class: "muted", text: "Expand a party to see the positions compared with your answers." })
    ]);
    results.slice(1).forEach(function (r) {
      var d = h("details", {}, [h("summary", { text: r.party.name + " — " + pct(r.score) })]);
      var s = splitReasons(r);
      if (!r.items.length) d.appendChild(h("p", { text: "No documented positions matched the questions you answered." }));
      s.agree.slice(0, 3).forEach(function (it) { d.appendChild(reasonEl(it, true)); });
      s.differ.slice(0, 3).forEach(function (it) { d.appendChild(reasonEl(it, false)); });
      more.appendChild(d);
    });
    app.appendChild(more);

    app.appendChild(h("section", { class: "card" }, [
      h("h2", { text: "How this works" }),
      h("p", { class: "disclaimer", text: "Each statement is scored from strongly disagree to strongly agree. For every party with a documented position on an issue, we measure how far your answer is from that position; issues you mark important count double. A party's percentage is the weighted average closeness, lightly pulled toward 50% when few of its positions could be compared, so parties with thin platforms don't win by default. Some parties haven't published full platforms, some questions compare only a few parties, and a few stances are inferred from related platform items (labelled above). Treat the result as a starting point, not a voting recommendation." }),
      h("div", { class: "row" }, [
        h("button", { class: "btn", type: "button", text: "Review answers", onclick: function () { state.i = 0; renderQuestion(); } }),
        h("button", { class: "btn primary", type: "button", text: "Start over", onclick: function () { resetState(); renderIntro(); } })
      ])
    ]));
    focusHeading();
  }

  buildPicker();
  route();
})();
