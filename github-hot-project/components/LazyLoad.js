const { useRef, useEffect } = React;

export const useIntersectionObserver = ({
  target,
  onIntersect,
  rootMargin = "0px",
  threshold = 0,
}) => {
  useEffect(() => {
    const config = {
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    }, config);

    const el = target?.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target, onIntersect, rootMargin, threshold]);
};

/**
 * 延迟加载带有 srcset 属性的图片组件
 * @param {Object} props - 组件属性
 * @param {string} props.url - 图片的 URL
 * @param {string} props.srcset - 图片的 srcset 属性
 * @returns {JSX.Element} 图片的 JSX 元素
 */
export function LazyLoadWithSrcSet({ url, srcset }) {
  const imgRef = useRef();

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
      onLoad={() => imgRef.current.classList.add("opacity-100")}
    />
  );
}
