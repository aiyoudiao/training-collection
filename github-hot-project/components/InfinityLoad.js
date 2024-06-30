const { useRef } = React;
import { useIntersectionObserver } from "./LazyLoad";
import { Loading } from "./Loading";

/**
 * 无限加载组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.loading - 是否正在加载
 * @param {Function} props.loadMore - 加载更多的函数
 */
export function InfinityLoad({ loading, loadMore }) {
  const loadingRef = useRef();

  useIntersectionObserver({
    target: loadingRef,
    onIntersect: () => {
      if (loadingRef.current && loading) {
        loadMore();
      }
    },
  });

  return (
    <div ref={loadingRef} className={`${loading ? "block" : "hidden"}`}>
      <Loading />
    </div>
  );
}
