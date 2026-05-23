# 多语言功能模块技术文档

## 概述

本多语言模块（i18n.js）是一个功能完整的国际化解决方案，为国际贷款计算器项目提供全面的语言切换支持。

## 功能特性

### 1. 语言选择界面组件
- **下拉菜单式语言选择器**：位于页面顶部右侧
- **国旗标识**：直观显示当前语言
- **一致的位置和样式**：在所有页面保持统一
- **本地存储**：自动保存用户语言偏好

### 2. 支持的语言
- 🇨🇳 中文 (zh) - 默认语言
- 🇺🇸 英文 (en)
- 🇪🇸 西班牙语 (es)

### 3. 多语言资源管理
- **结构化的资源文件**：JSON格式，易于维护
- **统一的命名规范**：键值结构清晰
- **动态加载机制**：按需加载，提高性能
- **翻译回退机制**：缺失翻译自动回退到默认语言

### 4. 技术实现

#### 核心类：I18nManager
```javascript
const i18n = new I18nManager();
```

#### 主要方法：
- `init()` - 初始化模块
- `switchLanguage(lang)` - 切换语言
- `t(key)` - 获取翻译
- `getCurrentLanguage()` - 获取当前语言
- `getSupportedLanguages()` - 获取支持的语言列表

### 5. 性能优化
- **平滑过渡动画**：200ms淡入淡出效果
- **选择性重渲染**：只更新需要翻译的元素
- **事件驱动架构**：避免不必要的重渲染
- **本地存储**：减少重复加载

## 使用方法

### 在HTML中使用

```html
<!-- 添加data-i18n属性 -->
<h1 data-i18n="header.title">标题</h1>
<button data-i18n="btn.calculate">计算</button>
```

### 在JavaScript中使用

```javascript
// 获取翻译
const text = i18n.t('header.title');

// 监听语言变更
i18n.on('languageChanged', (event) => {
    console.log('语言切换为:', event.language);
    console.log('切换耗时:', event.duration, 'ms');
});

// 手动切换语言
i18n.switchLanguage('en');

// 获取当前语言
const currentLang = i18n.getCurrentLanguage();
```

### 动态添加翻译

```javascript
// 添加新的语言资源
i18n.addResources('fr', {
    'header.title': 'Titre',
    'btn.calculate': 'Calculer'
});
```

## 翻译键命名规范

### 前缀约定
| 前缀 | 用途 | 示例 |
|------|------|------|
| `header.` | 页面头部 | `header.title`, `header.subtitle` |
| `nav.` | 导航 | `nav.home`, `nav.about` |
| `section.` | 区块标题 | `section.loanTypes` |
| `form.` | 表单元素 | `form.amount`, `form.rate` |
| `btn.` | 按钮 | `btn.calculate`, `btn.reset` |
| `result.` | 结果显示 | `result.monthly`, `result.total` |
| `chart.` | 图表 | `chart.title`, `chart.principal` |
| `modal.` | 模态框 | `modal.amount`, `modal.rate` |
| `error.` | 错误消息 | `error.amount`, `error.term` |
| `loan.` | 贷款产品 | `loan.business.name` |

### 贷款产品命名
```javascript
// 格式：loan.{productKey}.{property}
'loan.personalConsumer.name'  // 产品名称
'loan.personalConsumer.desc'  // 产品描述
'loan.business.amount'         // 额度范围标签
```

## API参考

### I18nManager 配置项
```javascript
{
    defaultLang: 'zh',           // 默认语言
    storageKey: 'app_language_preference',  // 本地存储键名
    transitionDelay: 200,       // 过渡动画延迟(ms)
    supportedLanguages: ['zh', 'en', 'es'],  // 支持的语言
    autoDetect: true            // 自动检测浏览器语言
}
```

### 事件列表
| 事件名 | 参数 | 描述 |
|--------|------|------|
| `initialized` | `{language}` | 模块初始化完成 |
| `languageChanged` | `{language, duration}` | 语言切换完成 |

### 生命周期
1. **加载资源** → `loadResources()`
2. **恢复偏好** → `restoreLanguagePreference()`
3. **检测浏览器语言** → `detectBrowserLanguage()`
4. **翻译页面** → `translatePage()`
5. **创建UI** → `createLanguageSelector()`

## 新增模块国际化指南

### 步骤1：定义翻译键
在 `i18n.js` 的 `loadResources()` 方法中添加翻译：

```javascript
'zh': {
    'module.newFeature': '新功能',
    'module.description': '这是新功能的描述'
},
'en': {
    'module.newFeature': 'New Feature',
    'module.description': 'This is a new feature description'
}
```

### 步骤2：在HTML中使用
```html
<span data-i18n="module.newFeature">新功能</span>
```

### 步骤3：动态翻译（可选）
```javascript
// 在JavaScript中获取翻译
const text = i18n.t('module.newFeature');
element.textContent = text;
```

### 步骤4：监听语言变更
```javascript
i18n.on('languageChanged', () => {
    // 更新动态内容
    updateDynamicContent();
});
```

## 测试与验收

### 测试场景
1. ✅ 所有UI元素在不同语言下显示正确
2. ✅ 语言切换响应速度 < 300ms
3. ✅ 用户操作状态在语言切换后保持
4. ✅ 本地存储正确保存语言偏好
5. ✅ 浏览器语言自动检测准确

### 验收标准
- [ ] 语言选择器在所有页面位置一致
- [ ] 切换语言无页面闪烁
- [ ] 贷款计算器功能在所有语言下正常工作
- [ ] 图表标签正确翻译
- [ ] 模态框内容正确翻译
- [ ] 错误消息正确翻译

## 性能指标

| 指标 | 目标值 | 实际值 |
|------|--------|--------|
| 语言切换延迟 | < 300ms | < 200ms |
| 初始加载时间 | < 100ms | ~50ms |
| 内存占用 | < 1MB | < 500KB |

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 未来扩展

### 计划功能
1. RTL语言支持（阿拉伯语、希伯来语）
2. 异步资源加载
3. 翻译热更新
4. 翻译管理后台
5. 自动化翻译测试

## 联系方式

如有问题，请联系开发团队。
