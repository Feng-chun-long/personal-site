/**
 * 个人网站渲染逻辑
 * 从后端 API 获取数据，动态渲染页面
 *
 * 前后端分离架构：
 *   前端（本文件）  →  fetch("http://localhost:3000/api/data")
 *   后端（Express） →  读取 data.json，返回 JSON
 */
(function () {
  // 后端 API 地址（Express 同时托管前端和 API，用相对路径即可）
  const API_BASE = "";

  // ===== 工具函数 =====
  function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") el.className = v;
      else if (k === "style") el.style.cssText = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v !== null && v !== undefined) el.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null || c === false) return;
      if (typeof c === "string") el.innerHTML += c;
      else el.appendChild(c);
    });
    return el;
  }

  function $(id) { return document.getElementById(id); }

  // 从后端 API 拉取数据
  async function fetchData() {
    try {
      const res = await fetch(`${API_BASE}/api/data`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("❌ 后端 API 请求失败：", err.message);
      console.error("   请确认后端已启动：cd backend && npm start");
      // 降级：如果后端挂了，尝试从 data.js 读取（开发期兜底）
      if (window.SITE_DATA) {
        console.warn("⚠️  使用 data.js 中的本地数据作为兜底");
        return window.SITE_DATA;
      }
      throw err;
    }
  }

  // ===== 渲染函数们 =====
  function renderNav(nav) {
    const ul = $("navLinks");
    ul.innerHTML = "";
    nav.forEach(item => {
      const li = h("li", {}, h("a", { href: "#" + item.id }, item.label));
      ul.appendChild(li);
    });
  }

  function renderHero(profile) {
    $("heroAvatar").textContent = profile.avatar;
    $("heroStatus").textContent = profile.status;
    $("heroName").textContent = profile.name;
    $("heroTagline").textContent = profile.tagline;
    $("heroDesc").textContent = profile.bio;
    $("brand").innerHTML = profile.name + '<span class="dot">.</span>';
  }

  function renderNumbers(numbers) {
    const grid = $("numbersGrid");
    grid.innerHTML = "";
    numbers.forEach(n => {
      grid.appendChild(
        h("div", { class: "number-card" }, [
          h("div", { class: "number-icon" }, n.icon),
          h("div", { class: "number-value" }, n.value),
          h("div", { class: "number-label" }, n.label)
        ])
      );
    });
  }

  function renderAbout(profile) {
    const aboutText = $("aboutText");
    profile.about.forEach(p => {
      aboutText.appendChild(h("p", {}, p));
    });
    const tags = $("aboutTags");
    profile.tags.forEach(t => {
      tags.appendChild(h("span", {}, t));
    });
    const infoList = $("infoList");
    profile.info.forEach(item => {
      infoList.appendChild(
        h("li", {}, [
          h("span", {}, item.icon + " "),
          item.label + "：" + item.value
        ])
      );
    });
  }

  function renderSkills(skills) {
    const grid = $("skillsGrid");
    grid.innerHTML = "";
    skills.forEach(s => {
      grid.appendChild(
        h("div", { class: "skill-card" }, [
          h("div", { class: "skill-header" }, [
            h("span", { class: "skill-icon" }, s.icon),
            h("h3", {}, s.name)
          ]),
          h("p", {}, s.desc),
          h("div", { class: "skill-bar" }, h("span", { style: `width: ${s.level}%` }))
        ])
      );
    });
  }

  function renderProjects(projects) {
    const list = $("projectsList");
    list.innerHTML = "";
    projects.forEach(p => {
      const card = h("article", { class: "project-card" }, [
        h("div", { class: "project-visual" }, p.icon),
        h("div", { class: "project-body" }, [
          h("h3", {}, p.title),
          h("p", {}, p.desc),
          h("div", { class: "tags" }, p.tags.map(t => h("span", {}, t))),
          h("div", { class: "links" },
            h("a", { href: p.link, target: "_blank", rel: "noopener" }, p.linkText)
          )
        ])
      ]);
      list.appendChild(card);
    });
  }

  function renderAwards(awards) {
    const wrap = $("awardsByYear");
    wrap.innerHTML = "";
    awards.forEach(yearGroup => {
      const items = yearGroup.items.map(a =>
        h("div", { class: "award-row" }, [
          h("span", { class: "award-medal " + (a.isGold ? "medal-second" : "medal-third") }, a.medal),
          h("div", { class: "award-info" }, [
            h("h4", {}, a.title),
            h("span", { class: "award-tag " + (a.isGold ? "tag-gold" : "") }, a.level)
          ])
        ])
      );
      wrap.appendChild(
        h("div", { class: "year-group" }, [
          h("div", { class: "year-badge" }, String(yearGroup.year)),
          h("div", { class: "year-list" }, items)
        ])
      );
    });
  }

  function renderContact(contact) {
    $("contactDesc").textContent = contact.desc;
    $("contactQuote").textContent = contact.quote;
    const list = $("contactList");
    list.innerHTML = "";
    contact.items.forEach(c => {
      const a = h("a", {
        class: "contact-item",
        href: c.link,
        target: c.link.startsWith("http") ? "_blank" : null,
        rel: c.link.startsWith("http") ? "noopener" : null
      }, [
        h("span", { class: "contact-icon" }, c.icon),
        h("div", {}, [
          h("span", { class: "contact-label" }, c.label),
          h("span", { class: "contact-value" }, c.value)
        ])
      ]);
      list.appendChild(a);
    });
  }

  function renderFooter(footer) {
    $("footerText").textContent = footer.text;
  }

  function setupNavbarScroll() {
    const nav = $("navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    });
  }

  // ===== 初始化（异步） =====
  async function init() {
    try {
      const data = await fetchData();

      // 按顺序渲染
      renderNav(data.nav);
      renderHero(data.profile);
      renderNumbers(data.numbers);
      renderAbout(data.profile);
      renderSkills(data.skills);
      renderProjects(data.projects);
      renderAwards(data.awards);
      renderContact(data.contact);
      renderFooter(data.footer);
      setupNavbarScroll();

      console.log("✅ 网站渲染完成（前端 → 后端 API 架构）");
    } catch (err) {
      document.body.innerHTML =
        '<div style="text-align:center;padding:80px 20px;font-family:sans-serif;">' +
        '<h2 style="color:#c0392b;">❌ 加载失败</h2>' +
        '<p>请启动后端服务：<code>cd backend && npm install && npm start</code></p>' +
        '</div>';
    }
  }

  // DOM ready 后启动
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
