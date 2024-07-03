import React from "react";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";

// 用户卡片组件属性类型定义
interface UserCardProps {
  title: string; // 标题
  data: {
    avatar_url: string; // 头像 URL
    html_url: string; // GitHub 链接
    login: string; // 用户名
    location: string; // 地址
    followers: number; // 粉丝数
    following: number; // 关注数
    public_repos: number; // 公共仓库数
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * 用户卡片组件
 *
 * @param {UserCardProps} props - 组件属性
 * @returns {JSX.Element} 用户卡片的 JSX 元素
 */
export const UserCard: React.FC<UserCardProps> = ({ title, data }) => {
  return (
    <div className="flex-1 p-2 transition-transform transform hover:scale-105 ">
      <div className="bg-green-100 py-4 max-w-80 mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="px-4 mb-2 text-center text-green-800 font-bold">
          {title}
        </div>
        <div className="mb-4">
          <Avatar url={data.avatar_url} />
        </div>

        <div className="px-4">
          <div className="mb-2 flex items-center justify-center font-bold text-center text-sm text-green-800">
            Scores: {data.public_repos}
          </div>
          <div className="mb-4 flex items-center justify-center">
            <a
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-green-600 text-center text-sm truncate hover:text-purple-600"
              title={data.login}
            >
              {data.login}
            </a>
          </div>
          <div className="flex items-center mb-2">
            <Icon iconName="fa-location-arrow" className=" text-blue-500"></Icon>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              {data.location}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Icon iconName="fa-users" className=" text-green-500"></Icon>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              {data.followers}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Icon iconName="fa-user-plus" className=" text-orange-600"></Icon>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              {data.following}
            </div>
          </div>
          <div className="flex items-center">
            <Icon iconName="fa-code" className=" text-black"></Icon>
            <div className="ml-2 flex-auto text-xs text-green-700 truncate">
              {data.public_repos}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
