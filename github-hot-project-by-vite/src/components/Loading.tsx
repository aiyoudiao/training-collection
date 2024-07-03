import { Icon } from "./Icon";

/**
 * 加载组件
 * 
 * @returns {JSX.Element} 加载动画的 JSX 元素
 */
export function Loading(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-16">
      <Icon iconName="fa-spinner" className=" text-green-600 text-5xl animate-spin"></Icon>
    </div>
  );
}
