/**
 * 个人网站后端服务
 * ==============
 * 提供 REST API 给前端调用，数据存在 data.json 文件里。
 *
 * 启动：
 *   npm install
 *   npm start
 *
 * 接口：
 *   GET /api/data          获取全部数据
 *   GET /api/profile       获取基本信息
 *   GET /api/skills        获取技能列表
 *   GET /api/projects     获取项目列表
 *   GET /api/awards        获取获奖记录
 *   GET /api/contact       获取联系方式
 *   GET /health            健康检查
 */
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "data.json");

// 中间件
app.use(cors());
app.use(express.json());

// 读取数据（带简单缓存）
let dataCache = null;
let cacheTime = 0;
const CACHE_TTL = 10000; // 10 秒

function getData() {
  const now = Date.now();
  if (dataCache && now - cacheTime < CACHE_TTL) {
    return dataCache;
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  dataCache = JSON.parse(raw);
  cacheTime = now;
  return dataCache;
}

// 强制刷新缓存（修改 data.json 后自动生效）
fs.watch(DATA_FILE, () => {
  console.log("[backend] data.json 已更新，刷新缓存");
  dataCache = null;
});

// ===== 接口 =====

// 健康检查
app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// 获取全部数据
app.get("/api/data", (req, res) => {
  res.json(getData());
});

// 各个子区块
app.get("/api/profile", (req, res) => {
  res.json(getData().profile);
});

app.get("/api/nav", (req, res) => {
  res.json(getData().nav);
});

app.get("/api/numbers", (req, res) => {
  res.json(getData().numbers);
});

app.get("/api/skills", (req, res) => {
  res.json(getData().skills);
});

app.get("/api/projects", (req, res) => {
  res.json(getData().projects);
});

app.get("/api/awards", (req, res) => {
  res.json(getData().awards);
});

app.get("/api/contact", (req, res) => {
  res.json(getData().contact);
});

app.get("/api/footer", (req, res) => {
  res.json(getData().footer);
});

// ===== 同时托管前端静态文件 =====
// 把 docs/ 目录作为静态文件托管，这样前端和后端只启一个服务
const FRONTEND_DIR = path.join(__dirname, "..", "docs");
app.use(express.static(FRONTEND_DIR));

// 所有非 API 的 GET 请求返回 index.html（支持直接访问根路径）
app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

// ===== 启动 =====
app.listen(PORT, () => {
  console.log(`\n🚀 个人网站后端已启动`);
  console.log(`   接口地址: http://localhost:${PORT}`);
  console.log(`   健康检查: http://localhost:${PORT}/health`);
  console.log(`   全部数据: http://localhost:${PORT}/api/data`);
  console.log(`\n   前端 HTML: cd docs && python3 -m http.server 3001`);
  console.log(`   浏览器打开: http://localhost:3001\n`);
});
