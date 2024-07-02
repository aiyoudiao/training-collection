import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Loading } from './Loading';

// 定义 InfinityLoad 组件的属性类型
interface InfinityLoadProps {
  loading: boolean;
  loadMore: () => void;
}

/**
 * 无限加载组件
 *
 * @param {InfinityLoadProps} props - 组件属性
 * @param {boolean} props.loading - 是否正在加载
 * @param {Function} props.loadMore - 加载更多的函数
 * @returns {JSX.Element} 无限加载组件的 JSX 元素
 */
export function InfinityLoad({ loading, loadMore }: InfinityLoadProps): JSX.Element {
  const loadingRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver({
    target: loadingRef,
    onIntersect: () => {
      if (loadingRef.current && loading) {
        loadMore();
      }
    },
  });

  return (
    <div ref={loadingRef} className={`${loading ? 'block' : 'hidden'}`}>
      <Loading />
    </div>
  );
}
