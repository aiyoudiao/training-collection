import React from 'react';
import { LazyLoad } from "./LazyLoad";

// 定义 Avatar 组件的属性类型
interface AvatarProps {
  url: string;
}

/**
 * Avatar 组件，用于显示带有延迟加载和 srcset 的头像
 *
 * @param {AvatarProps} props - 组件属性
 * @returns {JSX.Element} - 头像组件
 */
export function Avatar({ url }: AvatarProps): JSX.Element {
  // 生成 srcset 属性值
  const srcset = getSrcset(url);

  // 返回带有 LazyLoad 组件的 JSX 元素
  return <LazyLoad url={url} srcset={srcset} />;
}

/**
 * 生成用于 img 标签的 srcset 属性值
 *
 * @param {string} url - 原始图片 URL
 * @returns {string} - 生成的 srcset 属性值
 */
function getSrcset(url: string): string {
  const sm = `${url}&s=100 640w`;
  const md = `${url}&s=120 768w`;
  const lg = `${url}&s=160 1024w`;
  const xl = `${url}&s=200 1280w`;
  const xl2 = `${url}&s=400 1536w`;
  return `${sm}, ${md}, ${lg}, ${xl}, ${xl2}`;
}
