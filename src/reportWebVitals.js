/**
 * LCP（最大内容渲染时间）：从用户请求网址到在视口中渲染最大可见内容元素所需的时间。
 * 最大的元素通常是图片或视频，也可能是大型块级文本元素。此指标很重要，因为它可以告诉浏览者网址会真正加载。
 * * 报告中显示的汇总 LCP 是指网址群组中某个网址在其 75% 的访问事件中达到 LCP 状态所用的时间。
 * FID（首次输入延迟）：从用户首次与您的网页互动（点击链接、点按按钮，等等）到浏览器响应此次互动之间的用时。
 * 这种衡量方案的对象是被用户首次点击的任何互动式元素。此指标在用户需要执行操作的网页上非常重要，因为可据此判断网页进入互动状态的时间。
 * * 报告中显示的汇总 FID 是指网址群组中某个网址在其 75% 的访问事件中获得此值或更高值。
 * CLS (Cumulative Layout Shift)：CLS 会衡量在网页的整个生命周期内发生的所有意外布局偏移的得分总和。
 * 得分是零到任意正数，其中 0 表示无偏移，且数字越大，网页的布局偏移越大。
 * 此指标很重要，因为当用户尝试与网页元素互动时，如果网页元素出现偏移，这会导致糟糕的用户体验。
 * 如果您似乎找不出得分很高的原因，请尝试与该网页互动，看看这对得分有何影响。
 * * 报告中显示的汇总 CLS 是指网址群组中某个网址的 75% 访问事件的最低相同 CLS。
 * FCP（全称“First Contentful Paint”，翻译为“首次内容绘制”），它代表浏览器第一次向屏幕绘制 “内容”的时间。
 * TTFB（全称“Time to First Byte”） 表示浏览器接收第一个字节的时间
 * @param {Function} onPerfEntry
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
