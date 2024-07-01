import { useEffect, RefObject } from "react";

interface UseIntersectionObserverProps {
  target: RefObject<Element>;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * 自定义钩子函数，用于观察目标元素的交叉点变化。
 *
 * @param {UseIntersectionObserverProps} props - 交叉观察器的属性。
 * @param {RefObject<Element>} props.target - 要观察的目标元素。
 * @param {() => void} props.onIntersect - 当目标元素交叉时要执行的回调函数。
 * @param {string} [props.rootMargin="0px"] - 根元素周围的外边距。
 * @param {number | number[]} [props.threshold=0] - 交叉阈值。
 */
export const useIntersectionObserver = ({
  target,
  onIntersect,
  rootMargin = "0px",
  threshold = 0,
}: UseIntersectionObserverProps): void => {
  useEffect(() => {
    const config: IntersectionObserverInit = {
      rootMargin,
      threshold,
    };

    // 创建一个 Intersection Observer 实例，并配置参数
    const observer = new IntersectionObserver((entries) => {
      // 遍历每一个 entry
      entries.forEach((entry) => {
        // 检查 entry 是否与根元素交叉
        if (entry.isIntersecting) {
          onIntersect(); // 调用 onIntersect 回调函数
        }
      });
    }, config);

    // 获取当前的目标元素
    const el = target?.current;

    // 如果目标元素不存在，则提前返回
    if (!el) {
      return;
    }

    // 观察目标元素
    observer.observe(el);

    // 清理函数，以停止观察目标元素
    return () => {
      observer.unobserve(el);
    };
  }, [target, onIntersect, rootMargin, threshold]);
};
