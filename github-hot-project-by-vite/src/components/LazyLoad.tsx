import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// 定义 LazyLoad 组件的属性类型
interface LazyLoadProps {
  url: string;
  srcset: string;
}

/**
 * 延迟加载带有 srcset 属性的图片组件
 *
 * @param {LazyLoadProps} props - 组件属性
 * @param {string} props.url - 图片的 URL
 * @param {string} props.srcset - 图片的 srcset 属性
 * @returns {JSX.Element} 图片的 JSX 元素
 */
export function LazyLoad({
  url,
  srcset,
}: LazyLoadProps): JSX.Element {
  const imgRef = useRef<HTMLImageElement>(null);

  useIntersectionObserver({
    target: imgRef,
    onIntersect: () => {
      if (imgRef.current) {
        imgRef.current.src = url;
        imgRef.current.srcset = srcset;
      }
    },
  });

  return (
    <img
      ref={imgRef}
      width="100"
      height="100"
      alt="Lazy loaded content"
      className="w-64 md:w-80 mx-auto rounded shadow-lg transition-opacity duration-500 ease-in-out opacity-0"
      onLoad={() => {
        if (imgRef.current) {
          imgRef.current.classList.add('opacity-100');
        }
      }}
    />
  );
}
