"use strict";

(() => {
  const categories = Object.freeze({
    "breaking-news": "Breaking news",
    markets: "Markets",
    "natural-disasters": "Natural disasters",
    other: "Other"
  });

  const channelFormatters = Object.freeze({
    email(event) {
      return {
        channel: "Email",
        status: "Simulated - not sent",
        subject: `[World Alert] ${event.title}`,
        message: `Category: ${categories[event.category]}\n\n${event.text}`
      };
    },
    slack(event) {
      return {
        channel: "Slack",
        status: "Simulated - not sent",
        message: `*${event.title}*\nCategory: ${categories[event.category]}\n${event.text}`
      };
    }
  });

  function matchesRule(rule, event) {
    if (rule.category !== event.category) return false;

    const keyword = String(rule.keyword || "").trim().toLowerCase();
    if (!keyword) return true;

    const searchableText = `${event.title || ""}\n${event.text || ""}`.toLowerCase();
    return searchableText.includes(keyword);
  }

  function processEvent(rules, event) {
    return rules
      .filter((rule) => matchesRule(rule, event))
      .flatMap((rule) => (Array.isArray(rule.channels) ? rule.channels : [])
        .filter((channel) => Object.prototype.hasOwnProperty.call(channelFormatters, channel))
        .map((channel) => ({ ruleId: rule.id, ...channelFormatters[channel](event) })));
  }

  window.WorldAlert = Object.freeze({ matchesRule, processEvent });

  const app = document.querySelector("[data-world-alert-app]");
  if (!app) return;

  const rules = [];
  const events = [];
  let nextRuleId = 1;
  let nextEventId = 1;

  const ruleForm = document.getElementById("rule-form");
  const eventForm = document.getElementById("event-form");
  const ruleList = document.getElementById("rule-list");
  const adminEvents = document.getElementById("admin-events");
  const ruleFeedback = document.getElementById("rule-feedback");
  const eventFeedback = document.getElementById("event-feedback");

  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function categoryName(category) {
    return categories[category] || "Unknown";
  }

  function renderRules() {
    ruleList.replaceChildren();
    if (rules.length === 0) {
      ruleList.append(makeElement("p", "muted", "No alert rules yet."));
      return;
    }

    for (const rule of rules) {
      const card = makeElement("article", "rule-card");
      card.append(makeElement("h3", "", `${categoryName(rule.category)}${rule.keyword ? ` - ${rule.keyword}` : ""}`));
      card.append(makeElement("p", "muted", `Notifications: ${rule.channels.join(", ")}`));
      ruleList.append(card);
    }
  }

  function renderEvents() {
    adminEvents.replaceChildren();
    if (events.length === 0) {
      adminEvents.append(makeElement("p", "muted", "No events have been submitted yet."));
      return;
    }

    for (const event of events) {
      const card = makeElement("article", "event-card");
      card.append(makeElement("h3", "", event.title));
      card.append(makeElement("p", "muted", `${categoryName(event.category)} - ${event.submittedAt}`));
      card.append(makeElement("p", "", event.text));

      if (event.notifications.length === 0) {
        card.append(makeElement("p", "", "No matching alerts; no notifications were generated."));
      } else {
        const deliveries = makeElement("ul", "delivery-list");
        for (const notification of event.notifications) {
          const item = makeElement("li");
          const heading = makeElement("strong", "", notification.channel);
          heading.append(makeElement("span", "status", notification.status));
          item.append(heading);
          if (notification.subject) item.append(makeElement("p", "", `Subject: ${notification.subject}`));
          item.append(makeElement("p", "", notification.message));
          deliveries.append(item);
        }
        card.append(deliveries);
      }

      adminEvents.append(card);
    }
  }

  ruleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(ruleForm);
    const channels = formData.getAll("channel");
    if (channels.length === 0) {
      ruleFeedback.textContent = "Select at least one notification channel.";
      return;
    }

    rules.push({
      id: nextRuleId++,
      category: formData.get("category"),
      keyword: formData.get("keyword").trim(),
      channels
    });
    ruleFeedback.textContent = "Alert rule added.";
    renderRules();
  });

  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const title = formData.get("title").trim();
    const text = formData.get("text").trim();
    if (!title || !text) {
      eventFeedback.textContent = "Enter both a title and event details.";
      return;
    }

    const submittedEvent = {
      id: nextEventId++,
      category: formData.get("category"),
      title,
      text,
      submittedAt: new Date().toLocaleString()
    };
    submittedEvent.notifications = processEvent(rules, submittedEvent);
    events.unshift(submittedEvent);
    renderEvents();

    eventFeedback.textContent = submittedEvent.notifications.length
      ? `${submittedEvent.notifications.length} simulated notification preview(s) created.`
      : "No matching alerts; no notifications were generated.";
  });
})();
