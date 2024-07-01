// 观察者：观察进入视线且带有懒加载图像的元素
export class LazyLoadObserver {
  /**
   * 创建 LazyLoadObserver 实例
   */
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: 0,
      rootMargin: "0px 0px 100px 0px",
    });
  }

  /**
   * 处理元素的交叉观察事件
   * @param {IntersectionObserverEntry[]} entries
   */
  handleIntersect(entries) {
    for (const entry of entries) {
      if (entry.intersectionRatio === 0) return;

      LazyLoadObserver.setImageAttr(entry.target);
      this.observer.unobserve(entry.target);
    }
  }

  /**
   * 设置图像属性
   * @param {HTMLImageElement} img
   */
  static setImageAttr(img) {
    const { lazy, placeholder, srcset } = img.dataset;
    img.src = lazy;

    if (srcset) {
      img.srcset = srcset;
    }

    if (placeholder) {
      img.classList.add(`bg-[url('${placeholder}')]`);
    }
  }

  /**
   * 观察元素
   * @param {HTMLImageElement[]} items
   */
  observe(items) {
    for (const item of items) {
      const bounding = item.getBoundingClientRect();

      if (bounding.top < window.innerHeight) {
        LazyLoadObserver.setImageAttr(item);
        continue;
      }

      this.observer.observe(item);
    }
  }
}
