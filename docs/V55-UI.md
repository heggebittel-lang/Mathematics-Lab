# V5.5 · 用户反馈界面优化

- 顶栏皮肤选择：经典深色、Catppuccin Latte、Frappé、Macchiato、Mocha。采用本地 CSS 变量适配，Catppuccin 调色板遵循 MIT 许可，见 `vendor/Catppuccin-LICENSE`。
- 顶栏「收起公式 / 展开公式」与原「专注推导 / 恢复导航」相互独立；隐藏栏位后中间工作台扩大。
- 右下角「视图缩放」下拉菜单：75%、90%、100%、110%、125%、150%，100% 为默认。
- 三项均为界面偏好，独立保存在可用的 localStorage 中；不改变题目、数学对象或现有学习记录，不新增备份功能。
- 本地验证：46/46 数学内核脚本通过；Chromium 本地资源适配测试验证五个主题、独立侧栏、两种视窗下六档缩放、题目和草稿保持、未提交文本保持、偏好写入，以及公开版资源提示与无未捕获页面异常。测试脚本为 `tests/v55-ui.py`（需要 Python Playwright 和 Chromium；`CHROMIUM_PATH` 可指定浏览器）。
- 未进行所有题目的逐条浏览器回归，未验证 Windows 原生 file:// 或 Firefox / Safari 的实际缩放效果。在较小窗口或较大缩放下，工作区可横向滚动。
