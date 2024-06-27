// 观察者：观察进入视线且带有动画的元素
export class AnimationObserver {
  /**
   * 创建 AnimationObserver 实例
   */
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: 0.25,
    });
  }

  /**
   * 处理元素的交叉观察事件
   * @param {IntersectionObserverEntry[]} entries
   */
  handleIntersect(entries) {
    for (const entry of entries) {
      if (entry.intersectionRatio === 0) return;

      const { animation } = entry.target.dataset;
      if (!animation) return;

      entry.target.classList.remove("invisible");
      entry.target.classList.add(animation);
      this.observer.unobserve(entry.target);
    }
  }

  /**
   * 观察元素
   * @param {HTMLElement[]} items
   */
  observe(items) {
    for (const item of items) {
      item.classList.add("invisible");
      this.observer.observe(item);
    }
  }
}
