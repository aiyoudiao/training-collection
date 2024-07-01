import React from 'react';

// 导航栏组件属性类型定义
interface NavProps {
  language: string; // 当前选中的编程语言
  change: (lang: string) => void; // 处理语言切换的函数
}

/**
 * 导航栏组件
 * 
 * @param {NavProps} props - 组件属性
 * @returns {JSX.Element} 导航栏的 JSX 元素
 */
export function Nav(props: NavProps): JSX.Element {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    <div className="flex items-center justify-center my-4">
      {languages.map((lang) => {
        const isSelected = lang.toLowerCase() === props.language.toLowerCase();
        return (
          <button
            className={`mx-2 px-3 py-1 rounded-lg transition-all duration-300 ease-in-out transform ${
              isSelected
                ? "bg-green-500 text-white shadow-lg scale-105 hover:scale-110"
                : "bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105"
            }`}
            key={lang}
            onClick={() => props.change(lang)}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
