import React from 'react';
import { Avatar } from './Avatar';
import { Icon } from './Icon';

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
    };
}

/**
 * 用户卡片组件
 * 
 * @param {UserCardProps} props - 组件属性
 * @returns {JSX.Element} 用户卡片的 JSX 元素
 */
export function UserCard(props: UserCardProps): JSX.Element {
    return (
        <div className="flex-1 p-2">
            <div className="bg-green-100 py-4 max-w-[200px] mx-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="px-4 mb-2 text-center text-green-800 font-bold">{props.title}</div>
                <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
                    <Avatar url={props.data.avatar_url} />
                </div>

                <div className="px-4">
                    <div className="mb-2 flex items-center justify-center font-bold text-center text-sm text-green-800">
                        Scores: {props.data.public_repos}
                    </div>
                    <div className="mb-4 flex items-center justify-center">
                        <a
                            href={props.data.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-green-600 text-center text-sm truncate hover:text-purple-600"
                            title={props.data.login}
                        >
                            {props.data.login}
                        </a>
                    </div>
                    <div className="flex items-center mb-2">
                        <Icon className="fa-solid fa-location-arrow text-green-800"></Icon>
                        <div className="ml-2 flex-auto text-xs text-green-700 truncate">
                            {props.data.location}
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <Icon className="fa-solid fa-users text-green-800"></Icon>
                        <div className="ml-2 flex-auto text-xs text-green-700 truncate">
                            {props.data.followers}
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        <Icon className="fa-solid fa-user-plus text-green-800"></Icon>
                        <div className="ml-2 flex-auto text-xs text-green-700 truncate">
                            {props.data.following}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Icon className="fa-solid fa-code text-green-800"></Icon>
                        <div className="ml-2 flex-auto text-xs text-green-700 truncate">
                            {props.data.public_repos}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
