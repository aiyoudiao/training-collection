import React from 'react';
import { Icon } from '@/components/Icon';

/**
 * 指引组件
 * 
 * @returns {JSX.Element} 指引的 JSX 元素
 */
export function Guide(): JSX.Element {
    return (
        <div className="w-full">
            <h2 className="text-2xl text-center text-green-800">使用说明</h2>
            <div className="mt-8 flex items-center justify-around">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h4 className="mb-2 text-green-700">输入两个 GitHub 用户</h4>
                    <div className="mt-4 bg-green-100 w-32 h-32 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300">
                        <Icon className="fa-solid fa-user-group text-green-500 text-5xl"></Icon>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <h4 className="mb-2 text-green-700">比较</h4>
                    <div className="mt-4 bg-green-100 w-32 h-32 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300">
                        <Icon className="fa-solid fa-jet-fighter text-green-500 text-5xl"></Icon>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <h4 className="mb-2 text-green-700">查看胜者</h4>
                    <div className="mt-4 bg-green-100 w-32 h-32 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300">
                        <Icon className="fa-solid fa-trophy text-green-500 text-5xl"></Icon>
                    </div>
                </div>
            </div>
        </div>
    );
}
