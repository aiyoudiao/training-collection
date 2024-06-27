// 观察者：对静态动态的元素进行干涉
export class DOMObserver {
  /**
   * 创建 DOMObserver 实例
   * @param {AnimationObserver} animationObserver
   * @param {LazyLoadObserver} lazyLoadObserver
   */
  constructor(animationObserver, lazyLoadObserver) {
    this.animationObserver = animationObserver;
    this.lazyLoadObserver = lazyLoadObserver;
    this.observer = new MutationObserver(this.handleMutations.bind(this));
    this.observe();
  }

  /**
   * 处理 DOM 变动
   * @param {MutationRecord[]} mutations
   */
  handleMutations(mutations) {
    console.log("Mutations", mutations);
    for (const mutation of mutations) {
      if (mutation.addedNodes.length === 0) continue;

      for (const node of mutation.addedNodes) {
        if (node instanceof HTMLElement) {
          console.log("node instance", node);
          const animationItems = node.querySelectorAll("[data-animation]");
          this.animationObserver.observe(animationItems);

          const lazyLoadItems = node.querySelectorAll("[data-lazy]");
          this.lazyLoadObserver.observe(lazyLoadItems);
        }
      }
    }
  }

  /**
   * 开始观察 DOM
   */
  observe() {
    // 先触发一次 非DOM变化 的动画 和 图片懒加载，触发结束后移除订阅者
    const animationItems = document.querySelectorAll("[data-animation]");
    const lazyItems = document.querySelectorAll("img[data-lazy]");
    this.animationObserver.observe(animationItems);
    this.lazyLoadObserver.observe(lazyItems);

    // 再观察DOM的变化，有变化再触发动画 和 图片懒加载，触发结束后移除订阅者
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
