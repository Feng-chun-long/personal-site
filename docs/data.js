/**
 * 个人网站数据配置
 * 修改这里就能更新网站内容，不用动 HTML
 */
window.SITE_DATA = {
  // ===== 基本信息 =====
  profile: {
    name: "冯春龙",
    avatar: "🧑‍💻",
    tagline: "AI 工具爱好者 · 编程初学者 · 终身学习中",
    status: "✅ 正在学习 AI 编程",
    bio: "喜欢用大模型和 AI 编辑器把想法变成能用的产品，从 LLM 微调到浏览器插件都在尝试。",
    about: [
      "你好，我是冯春龙，一名正在学习 AI 编程和大模型应用开发的学生。过去几个月里，我从零搭建了 SFT + LoRA 微调实验、发布了自己的第一个浏览器插件，也在尝试让 AI 成为日常学习和开发中的伙伴。",
      "对我来说，AI 编程不是用 AI 代替自己，而是学会更好地和 AI 协作——把模糊的想法变成清晰的需求文档，把报错信息读懂定位问题，把每次改动都做好版本管理。",
      "除了编程，平时也喜欢读技术博客。课余时间还参加机器人竞赛，拿过多次国家级奖项。"
    ],
    tags: ["LLM 微调", "浏览器插件", "静态网站", "Git 版本控制", "AI 协作", "机器人竞赛"],
    info: [
      { icon: "📍", label: "所在地", value: "中国" },
      { icon: "🎓", label: "身份", value: "在校学生" },
      { icon: "🔭", label: "方向", value: "AI 应用开发" },
      { icon: "🛠️", label: "主力工具", value: "Cursor / Python" },
      { icon: "📬", label: "邮箱", value: "2136892861@qq.com" }
    ]
  },

  // ===== 导航 =====
  nav: [
    { id: "about", label: "关于" },
    { id: "skills", label: "技能" },
    { id: "projects", label: "项目" },
    { id: "awards", label: "获奖" },
    { id: "contact", label: "联系" }
  ],

  // ===== 数据概览 =====
  numbers: [
    { icon: "🏆", value: "7", label: "国家级竞赛获奖" },
    { icon: "🤖", value: "3", label: "RoboMaster / RAICOM 参赛经历" },
    { icon: "💻", value: "3", label: "AI 编程实战项目" },
    { icon: "⚡", value: "100%", label: "热情投入学习与创作" }
  ],

  // ===== 技能 =====
  skills: [
    { icon: "🐍", name: "Python", desc: "数据处理、机器学习基础、大模型微调管线", level: 78 },
    { icon: "🌐", name: "前端基础", desc: "HTML / CSS / 原生 JS，能独立做静态页面和浏览器插件", level: 72 },
    { icon: "🤖", name: "LLM 微调", desc: "SFT / LoRA / QLoRA，在小模型上实践监督微调流程", level: 65 },
    { icon: "🔧", name: "AI 协作", desc: "Cursor、Copilot、Claude，会写 PRD 和技术文档让 AI 更准确地理解需求", level: 85 },
    { icon: "☁️", name: "工程化", desc: "Git 版本管理、GitHub Pages / Cloudflare Pages 部署、SSH 配置", level: 70 },
    { icon: "📝", name: "写作", desc: "Markdown、Obsidian 笔记管理，喜欢把学习过程整理成可复用的文档", level: 80 }
  ],

  // ===== 项目 =====
  projects: [
    {
      icon: "🧩",
      title: "快捷笔记浏览器插件",
      desc: "一个 Manifest V3 浏览器插件，点图标就能写笔记，自动带上当前网页标题和网址，数据存本地不用登录。支持查看历史笔记和单条删除。",
      tags: ["Chrome Extension", "Manifest V3", "原生 JS", "Storage API"],
      link: "https://github.com/Feng-chun-long/quick-note",
      linkText: "GitHub →"
    },
    {
      icon: "🐒",
      title: "LoRA 孙悟空对话模型",
      desc: "在 64M 小模型上做 Full SFT，让模型学会孙悟空的说话风格。对比了不同微调方式的显存效率和角色对齐效果。",
      tags: ["LLM", "SFT", "LoRA"],
      link: "#",
      linkText: "查看详情 →"
    },
    {
      icon: "💬",
      title: "AI 聊天对话系统",
      desc: "Vue 3 + Spring Boot + MySQL 的全栈 AI 聊天应用，接入本地微调模型、远端大模型和 Ollama。支持流式对话、多模型切换、LoRA 微调。",
      tags: ["Vue 3", "Spring Boot", "MySQL", "全栈"],
      link: "https://github.com/Feng-chun-long",
      linkText: "GitHub →"
    },
    {
      icon: "🌐",
      title: "这个个人主页",
      desc: "按课堂要求从零搭建，先写 PRD 和技术设计文档，用原生 JS 数据驱动渲染，部署到 Cloudflare Pages。",
      tags: ["静态网站", "数据驱动", "Cloudflare Pages"],
      link: "https://github.com/Feng-chun-long/personal-site",
      linkText: "GitHub →"
    }
  ],

  // ===== 获奖记录 =====
  awards: [
    {
      year: 2026,
      items: [
        { medal: "🥉", title: "RoboMaster 机甲大师赛高校联盟赛（华北站）步兵对抗赛", level: "国家三等奖", isGold: false },
        { medal: "🥉", title: "睿抗机器人开发者大赛（RAICOM）", level: "国家三等奖", isGold: false }
      ]
    },
    {
      year: 2025,
      items: [
        { medal: "🥉", title: "RoboMaster 机甲大师赛高校联盟赛（辽宁站）3V3 对抗赛", level: "国家三等奖", isGold: false },
        { medal: "🥉", title: "RoboMaster 机甲大师赛高校联盟赛（辽宁站）步兵对抗赛", level: "国家三等奖", isGold: false },
        { medal: "🥈", title: "睿抗机器人开发者大赛（RAICOM）", level: "国家二等奖", isGold: true },
        { medal: "🥈", title: "中国工程机器人大赛暨国际公开赛", level: "国家二等奖", isGold: true }
      ]
    },
    {
      year: 2024,
      items: [
        { medal: "🥈", title: "全国大学生信息安全与对抗技术竞赛", level: "国家二等奖", isGold: true }
      ]
    }
  ],

  // ===== 联系方式 =====
  contact: {
    desc: "欢迎交流学习、项目合作或竞赛经验，看到消息会尽快回复。",
    quote: "用 AI 把想法变成产品，把报错变成经验，把每次提交都变成可回退的底气。",
    items: [
      { icon: "✉️", label: "邮箱", value: "2136892861@qq.com", link: "mailto:2136892861@qq.com" },
      { icon: "🐙", label: "GitHub", value: "Feng-chun-long", link: "https://github.com/Feng-chun-long" },
      { icon: "🐾", label: "Gitee", value: "Coatline", link: "https://gitee.com/Coatline" }
    ]
  },

  // ===== 底部 =====
  footer: {
    text: "© 2026 冯春龙 · 用 AI 从 0 到 1 搭建"
  }
};
