# SuperToken 设计系统 · 墨绿账本

站点唯一的视觉与交互规范。所有 token 以 `site.css` 顶部的 `:root` 为准，本文解释"为什么"和"怎么用"；两者冲突时改代码，再改本文。

---

## 0. 四条原则

1. **数据先行。** 用户进来先看到价格、模型、接口，不是口号。任何新区块先问：它给出了什么可核对的数字？
2. **一个强调色。** 品牌绿只出现在可点击 / 激活 / 品牌处；节省用节省绿；红只给故障。页面上没有第三种彩色。
3. **细线分隔，不堆卡片。** 同类信息用 1px 线和背景微差分组；卡片（`.sect` / `.board` / `.panel`）一屏最多两三个，卡片里面不再套卡片。
4. **文案可换，结构不变。** 每段文字都带 `data-copy-zh` / `data-copy-en`；改文案不需要动布局，动布局不需要改文案。

---

## 1. 色彩

### 1.1 Token

| Token | 值 | 用途 |
|---|---|---|
| `--paper` | `#f6f5f1` | 页面底色（暖纸色） |
| `--surface` | `#ffffff` | 卡片、表格、输入框 |
| `--surface-2` | `#faf9f6` | 表头、卡片头 / 尾、分组行 |
| `--surface-3` | `#f1f0eb` | 复制小按钮底、中性徽标底 |
| `--ink` | `#14171c` | 标题、模型名、价格数字、主文字 |
| `--body` | `#3d434c` | 正文 |
| `--muted` | `#767d88` | 说明、表头、ID、单位 |
| `--faint` | `#9aa0aa` | 占位符、未连接状态 |
| `--line` | `#e2e0da` | 所有 1px 分隔线与描边 |
| `--line-strong` | `#c9c6bd` | 竖分隔符、序号框描边、hover 描边 |
| `--field-line` | `#d6d3cb` | 输入框 / 端点框描边 |
| `--brand` | `#1f6f5a` | 品牌绿：链接、主按钮、eyebrow、激活下划线、Logo |
| `--brand-deep` | `#185a49` | 品牌绿 hover |
| `--brand-tint` | `#e6f1ec` | 品牌绿底：激活 chip、能力标签、文档目录激活 |
| `--brand-soft` | `#4fb894` | 状态格"正常"、代码高亮行左边线 |
| `--brand-light` | `#5fcf9f` | Logo 切片浅色、深底上的品牌绿 |
| `--save` | `#0e8a5f` | 节省百分比、节省徽标文字、状态"正常" |
| `--save-tint` | `#e3f2ea` | 节省徽标底、微信标签底 |
| `--warn` / `--warn-ink` | `#d97706` / `#8a5a12` | 降级、监控中、提示条文字 |
| `--warn-tint` / `--warn-line` | `#fbf3e4` / `#ecd9b0` | 提示条底与描边 |
| `--danger` | `#b4233a` | 故障 |
| `--code-bg` / `--code-line` | `#14171c` / `#262b33` | 代码卡底与分隔线 |
| `--code-text` / `--code-muted` / `--code-label` | `#d7dbe2` / `#6f7784` / `#8b93a1` | 代码正文 / 注释 / 卡片头 |
| `--code-string` | `#9fd8c2` | 代码字符串 |
| `--code-hl` / `--code-hl-bar` | `rgba(31,111,90,.34)` / `#4fb894` | 高亮行底与左边线 |

### 1.2 使用规则

- 品牌绿 **只** 用在：`a`、`.btn-primary`、`.st-console`、`.eyebrow`、`.chip.active`、`.tab.active` 下划线、`.route-n.primary`、Logo。标题、正文、数字永远是 `--ink`。
- 节省绿（`--save`）**只** 用在和"省了多少"直接相关的数字与徽标，以及状态"正常"。不要拿它做装饰。
- 状态四色固定映射：`ok` → `--save` / `--brand-soft`，`warn` → `--warn`，`down` → `--danger`，`none` → `--faint` / `--line`。
- 深色只出现在代码卡、端点卡、Logo 深底版本；没有全站深色主题。
- 禁止：渐变背景、颗粒纹理、彩色阴影、左边框强调条（`.notice` 与代码高亮行除外）。

---

## 2. 字体

| 变量 | 字体栈 | 用途 |
|---|---|---|
| `--font-disp` | Bricolage Grotesque → `--font-sans` | 标题（`.disp`）、所有价格与统计数字（`.num`）、品牌字 |
| `--font-sans` | Noto Sans SC → PingFang SC → Microsoft YaHei → system-ui | 正文、按钮、标签 |
| `--font-mono` | IBM Plex Mono → Menlo → Consolas | 模型 ID、接口路径、表头、eyebrow、元信息、代码 |

Google Fonts 只加载 Bricolage Grotesque（500–800）、Noto Sans SC（400/500/700）、IBM Plex Mono（400/500）；`<link rel="preconnect">` 两个字体域名；系统字体做兜底。

### 2.1 字号阶梯（px）

| 级别 | 桌面 | 手机 | 用在 |
|---|---|---|---|
| 首页大标题 | 44 / 1.16 | 30 / 1.22 | `.hero h1` |
| 页面标题 | 36 / 1.15 | 28 | `.page-head h1` |
| 面板 / 区块标题 | 24–26 / 1.25 | 18 | `.panel-head h2` `.routes-copy h2` `.endpoints-copy h2` |
| 文档标题 | 22 / 1.3 | — | `.doc-block h2` |
| 卡片标题 | 15 / 700 | — | `.sect-title h2` `.board-head strong` |
| 正文 | 14 / 1.6 | — | `body` |
| 引导文 | 16 / 1.8 | 14 | `.hero-lead` |
| 说明 | 13 / 1.6–1.7 | — | `.cell-text` `.lead` `.link` |
| 小说明 | 12 / 1.6 | — | `.cell-desc` `.hints` |
| 元信息 / ID | 11 mono | 10 | `.meta` `.model-id small` `.cell-mono` `.eyebrow` |
| 表头 | 10 mono，`letter-spacing .1em`，大写 | — | `.th` |
| 大数字 | 32 / 30 / 24 / 22 / 20 | 26 / 20 | `.strip-cell .num` `.summary .num` `.board .price` `.trow .price b` |

规则：
- 数字一律 `.num`（Bricolage + `tabular-nums` + `letter-spacing -.035em`），单位用 10–11px mono 灰字跟在后面（`$0.571` <small>/ 1M</small>）。
- 标题 `letter-spacing: -.02em`；正文不调字距。
- 中英文之间加半角空格（"每 1M 输入 Token"），中文用全角标点，英文用半角。
- `<i>` `<em>` 已全局去斜体（用于图标容器 / 装饰），需要强调用 `<strong>` 或颜色。

---

## 3. 间距 · 圆角 · 阴影

| 项 | 值 |
|---|---|
| 内容宽度 | `--wrap: 1200px`，两侧最小留白 16px（`min(1200px, calc(100% - 32px))`） |
| 导航高度 | `--nav-h: 64px`，固定顶栏，`.page` 用 `padding-top` 让位 |
| 页面头 | `padding: 44px 0 24px`（手机 `28px 0 18px`） |
| 首屏 | `padding: 52px 0 40px`，左右两栏 `gap: 40px` |
| 区块之间 | `.section { padding-bottom: 22px }`，最后一个 `.section.last` 48px |
| 卡片内边距 | 头 / 尾 `14px 22px`，行 `0 22px`，面板 `28px`（手机 `16px 14px`） |
| 行高 | 表格行 `min-height 62px`（文本比价 68px），状态行 66px，比价板文本行 `10px 22px`、单位行 `8px 22px` |
| 列间距 | 表格 `gap: 14px`，比价板 `12px`，状态行 `22px` |
| 圆角 | 面板 / 比价板 16px；卡片 `--radius: 14px`；按钮 / 输入框 10px；chip / 小按钮 `--radius-sm: 8px`；徽标 4–6px；序号框 8px |
| 阴影 | 只有一个：`--shadow-board`（比价板）。其他一律用 1px 线 |

---

## 4. 版式与响应式

三个断点，行为固定：

| 断点 | 变化 |
|---|---|
| ≤ 1240px | 比价板 560 → 520px；模型表列宽收窄 |
| ≤ 980px | 顶栏折叠为汉堡菜单（`.st-mobile-nav`），隐藏"线路状态"链接；首屏上下堆叠；代码卡单列；模型网格 2 列；FAQ 单列；模型 / 定价表在 `.table-scroll` 内横向滚动（表最小宽 1000px）；状态汇总 2×2，状态行改两行布局 |
| ≤ 720px | 隐藏"控制台"按钮；标题 30 / 28px；首屏按钮竖排；比价板改两列（隐藏官方价与节省徽标，改在价格下方一行小字 `.m-only`）；数字带 2×2；tab 面板紧凑；搜索框全宽 |

栅格用 CSS grid 明确列宽（不用 12 栏系统）：

```
模型表   300px 110px 130px 260px 150px 1fr
定价表   280px 170px 190px 120px 1fr
比价板   文本行 1fr 96px 112px 76px ｜ 单位行 1fr 80px 170px
状态行   260px 1fr 110px 100px
```

---

## 5. 组件

类名即规范。新组件先看能否由下面的组合出来。

### 5.1 操作

| 类 | 说明 | 状态 |
|---|---|---|
| `.btn.btn-primary` | 主按钮，46px 高，品牌绿底白字，右侧箭头 SVG | hover 变 `--brand-deep` |
| `.btn.btn-ghost` | 次按钮，白底 1px 线 | hover 线变深 |
| `.st-console` | 顶栏"控制台"，36px 高的小主按钮 | |
| `.link` | 文字链接 + 14px 箭头（站内 `→`，外链 `↗`） | |
| `.chip` / `.chip.active` | 筛选 / 锚点，34px 高 | 激活：绿线绿底绿字 |
| `.copy-btn` / `.copy-btn.done` | 复制小按钮，28px 高，图标 + 文字 | 点击后 1.6s 内变绿显示"已复制"，图标换对勾 |
| `.endpoint` | 首屏 Base URL 复制框，46px 高 mono，右侧 `.copy-chip` | `.done` 同上 |
| `.tab` / `.tab.active` | 面板 tab，56px 高（手机 44） | 激活：墨字加粗 + 2px 绿下划线 |

### 5.2 标识

| 类 | 说明 |
|---|---|
| `.tag` / `.tag.neutral` | 22px 能力 / 线路标签；绿底绿字，中性为 `--surface-3` |
| `.save` | 26px 节省徽标，`省 89%` |
| `.unit` | 22px 计价单位徽标（按次 / 按生成秒） |
| `.pill` | 30px 客户端名 |
| `.logo-box` / `.logo-box.sm` | 32 / 28px 白底描边方框，内放厂商 SVG（`assets/logos/`） |
| `.model-id` | logo-box + 模型名（14px 700 ink）+ ID（11px mono muted，超长省略） |
| `.strike` | 划线原价，灰 `#8a9099`，线色 `#b8b4aa` |
| `.eyebrow` | 区块上方的 11px mono 大写绿字（英文写法：`Text · Image · Video · 81 models`） |
| `.th` | 表头 10px mono 大写灰字 |

### 5.3 容器

| 类 | 说明 |
|---|---|
| `.sect` + `.sect-head` + `.trow` + `.sect-foot` | 标准数据表：圆角卡 → 表头带（surface-2）→ grid 行 → 尾注 |
| `.board` | 首屏比价板：头 / 文本段 / 图片段 / 视频段 / 尾；带唯一阴影 |
| `.strip` + `.strip-cell` | 数字带：4 格，大数字 + 标签 + 11px 说明 |
| `.panel` + `.tabbar` + `.tabpanel` | 首页第二屏 tab 面板；`.tabpanel.flush` 去内边距（FAQ） |
| `.code` + `.code-head` + `pre > .l` | 代码卡：`.l` 每行、`.c` 注释、`.s` 字符串、`.hl` 高亮行 |
| `.route-card` + `.route` + `.route-link` | 分组回退图：序号框（`.route-n.primary` 主线路为绿底）+ 名称 + 标签，行间用 `.route-link` 画连接线与触发条件 |
| `.mgrid` + `.mcell` | 3×3 模型网格（细线分格） |
| `.faq` | 两列问答 |
| `.summary` | 状态汇总 4 格 |
| `.srow` + `.bars` + `.uptime` + `.state` | 状态行：24 格 24h 条 + 可用率 + 状态 |
| `.incident` + `.badge` | 事件记录行 |
| `.notice` | 琥珀色提示条（PENDING / SAMPLE），左侧 `<b>` 标签 |
| `.empty` | 空状态文案 |
| `.search` | 搜索框，内含 16px 放大镜 SVG + `input` |
| `.endpoint-card` | 定价页底部深色端点卡 |
| `.doc-layout` / `.doc-nav` / `.doc-block` / `.spec` | 文档页左目录右内容；`.spec` 规格表 |

### 5.4 图标

- 全部 inline SVG，24 网格，`fill="none"`，`stroke="currentColor"`，`stroke-width` 1.8（界面）/ 2–2.4（勾、箭头），`stroke-linecap/linejoin: round`。
- 尺寸：按钮内 16px，链接 14px，复制按钮 12px，导航汉堡 18px。
- 常用路径：箭头 `M5 12h14 M13 6l6 6-6 6`；外链 `M7 17L17 7 M8 7h9v9`；复制 `rect 9 9 11 11 r2 + M5 15V6a2 2 0 0 1 2-2h9`；对勾 `M5 12.5l4.5 4.5L19 7.5`。
- 不用 emoji、不用图标字体、不用外部图标 CDN。

---

## 6. Logo

**方案 G · 切片**：一枚圆角方形 token 被斜切一刀——"折"。

- 几何：24 网格内 `x=2 y=2 w=20 h=20 rx=6` 的圆角方；对角线 `M2 22 L22 2 v20 z` 的右下三角用 clipPath 裁进圆角。渲染时 `viewBox="2 2 20 20"` 让方块填满。
- 颜色：主块 `--brand #1f6f5a`，切片 `--brand-light #5fcf9f`。深底上不变（本身够亮）。单色版：`--ink` 方块 + 纸色 2.2px 斜线。
- 尺寸：导航 20px，页脚 18px，favicon 32px（`favicon.svg`）。最小 16px。
- 锁定：图标右侧 10px 间距接 `SuperToken`（Bricolage 700，`letter-spacing -.02em`，导航 18px / 页脚 16px）。
- 留白：四周至少 1/4 边长。
- 不要：旋转、描边、加投影、改比例、改绿色、和其他图形叠放。
- 源：`site.js` 里的 `logo(id, size)`；`id` 必须唯一（clipPath）。其余 7 个备选在设计画布 "Logo 方案" 页。

---

## 7. 文案与双语

- 机制：可翻译元素同时带 `data-copy-zh` 与 `data-copy-en`，默认内容写中文；占位符用 `data-placeholder-zh/en`；导航 / 页脚文案在 `site.js` 的 `copy` 字典里用 `data-site-copy="key"`；页面标题英文放在 `<html data-title-en>`。
- 切换写 `localStorage.st-lang`，并同步 `<html lang>`；页面 `<head>` 里的内联脚本在首屏前恢复语言，避免闪烁。
- 数字、模型 ID、接口路径、价格不翻译，也不放进 `data-copy-*`。
- 中文语气：短句、动词开头、不用形容词堆砌（"账单按请求逐笔可查"，不是"高质量稳定服务"）。英文同理，句号收尾。
- **诚实原则**：没有的数据显示 `--` / "未接入"，不写死任何"正常"或绿点；示例数据必须带 PENDING / SAMPLE 提示条；价格标注核对日期与来源链接。

---

## 8. 数据展示规则

| 项 | 规则 | 例 |
|---|---|---|
| 价格 | 美元符号 + 数值；< 1 保留三位小数，≥ 1 保留两位（定价页对照表统一三位） | `$0.571` `$5.00` / `$5.000` |
| 官方价 | `.strike` 划线，灰色，放在本站价旁或上方 | ~~$5.00~~ |
| 节省 | `.save` 徽标 `省 89%`；折数用 11px mono 说明 `约 1.1 折`；节省按输入价算 | |
| 单位 | 价格后 10–11px mono 灰字：`/ 1M`、`/ 次`、`/ 秒`；英文 `/ 1M` `/ request` `/ sec` | |
| 分段 | 文本 / 图片 / 视频三段固定顺序，每段表头标明计价单位与接口路径 | |
| 日期 | `2026-08-26`，前面写"核对" | `核对 2026-08-26` |
| 模型 ID | 11px mono，可复制，超长省略号 | `grok-imagine-video-1.5-preview-720p` |
| 状态 | 24 格 = 最近 24 小时，最旧在左；`ok / warn / down / none` | |

---

## 9. 页面结构速查

| 页 | 结构 |
|---|---|
| 首页 `index.html` | 顶栏 → 首屏（左：eyebrow + 两行标题 + Base URL + 主按钮；右：比价板）→ 数字带 → tab 面板（接入 / 线路机制 / 模型 / 常见问题）→ 页脚。约 1.8 屏 |
| 模型广场 `models.html` | 页面头（标题 + 81 + 单位说明）→ 搜索 + 类型 chip + 厂商 chip → 三个 `.sect`（文本 / 图片 / 视频）→ 页脚 |
| 定价 `pricing.html` | 页面头 → 锚点 chip → 三个 `.sect`（文本表带 IN/OUT、节省、依据；图片 / 视频带单位、说明）→ 端点区 → 页脚 |
| 状态 `status.html` | 提示条 → 页面头（标题 + 总体状态 pill + 最后更新）→ `.summary` → 组件 `.srow` 列表 → 事件记录 → 页脚；有 `status.json` 时由 `site.js` 渲染 |
| 文档 `docs.html` | 页面头 → 左目录右内容（快速开始 / 鉴权 / 协议 / 分组 / 错误）→ 页脚 |

---

## 10. 新增页面 / 区块 Checklist

- [ ] `<html data-page="…" data-title-en="…">`，`<head>` 含语言恢复脚本、preconnect、字体、`site.css`、`site.js`、`favicon.svg`
- [ ] 顶部 `<div id="site-nav-mount">`，底部 `<div id="site-footer-mount">`，内容包在 `<main class="page">`
- [ ] 区块用 `.page-head` / `.section` / `.sect` 组合，不新写卡片样式
- [ ] 每个可翻译节点都有 `data-copy-zh` / `data-copy-en`
- [ ] 数字用 `.num`，ID / 路径用 mono，价格带单位
- [ ] 只用品牌绿做可点击与激活；没有第二种彩色
- [ ] 在 980 / 720 两个断点看一遍：没有横向溢出，表格在 `.table-scroll` 里
- [ ] 没有写死的状态、没有编造的数字；缺的数据显示 `--`
- [ ] 图标是 inline SVG，无 emoji

---

## 11. 文件索引

| 文件 | 内容 |
|---|---|
| `site.css` | 全部 token、组件、页面块、响应式 |
| `site.js` | 顶栏 / 页脚模板、Logo、语言切换、tab、复制、模型筛选、状态渲染 |
| `assets/logos/*.svg` | 厂商 logo（Anthropic / OpenAI / Gemini / ByteDance / Grok） |
| `favicon.svg` | Logo G 32px |
| `status.example.json` | 状态页数据格式示例 |
| `supertoken-site-design-preview/`（gitignore） | 设计稿本地预览与 `src/` 源文件；线上画布见 Claude Design |
