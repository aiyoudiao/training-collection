/**
 * 加载组件
 * @returns {JSX.Element} 加载动画的 JSX 元素
 */
export function Loading() {
  return (
    <div className="flex items-center justify-center h-16">
      <i className="fa-solid fa-spinner text-green-600 text-5xl animate-spin"></i>
    </div>
  );
}
