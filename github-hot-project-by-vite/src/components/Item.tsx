import React from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";

// Item组件的属性类型定义
interface ItemProps {
  data: {
    id: number;
    owner: {
      avatar_url: string;
      login: string;
    };
    html_url: string;
    name: string;
    stargazers_count: number;
    forks_count: number;
    open_issues: number;
  };
  indexKey: number;
}

/**
 * Item 组件
 * 
 * @param {ItemProps} props - 组件属性
 * @returns {JSX.Element} Item 的 JSX 元素
 */
export function Item(props: ItemProps): JSX.Element {
  const item = props.data;

  return (
    <div
      className="flex-1 lg:w-[25%] lg:max-w-[25%] lg:min-w-[25%] md:w-[33.3%] md:max-w-[33.3%] md:min-w-[33.3%] w-[50%] max-w-[50%] min-w-[50%] p-2"
      key={item.id}
    >
      <div className="bg-green-100 py-4 rounded-lg hover:bg-green-200">
        <div className="px-4 mb-2 text-center text-green-800 font-semibold">
          #{props.indexKey}
        </div>
        <div className="mb-4">
          <div className="transition-transform transform hover:scale-110">
            <Avatar url={item.owner.avatar_url} />
          </div>
        </div>

        <div className="px-4">
          <div className="mb-4 flex items-center justify-center">
            <a
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-green-600 text-center text-sm truncate hover:text-green-800"
              title={item.name}
            >
              {item.name}
            </a>
          </div>
          <div className="flex items-center mb-2">
            <Icon className="fa-solid fa-user text-green-400"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              {item.owner.login}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Icon className="fa-solid fa-star text-green-400"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              <span className="font-bold mr-1">{item.stargazers_count}</span>
              stars
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Icon className="fa-solid fa-code-fork text-green-400"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              <span className="font-bold mr-1">{item.forks_count}</span>
              forks
            </div>
          </div>
          <div className="flex items-center">
            <Icon className="fa-solid fa-triangle-exclamation text-green-400"></Icon>
            <div className="ml-2 flex-auto text-xs truncate text-green-700">
              <span className="font-bold mr-1">{item.open_issues}</span>
              open issues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
