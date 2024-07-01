import React from 'react';


/**
 * 图标组件
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.className - 图标的类名
 * @returns {JSX.Element} 图标的 JSX 元素
 */
export function Icon({ className }: { className: string }): JSX.Element {
    return (
        <>
            <i className={className}></i>
        </>
    );
}
