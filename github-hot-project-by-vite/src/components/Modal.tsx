import { useState, useEffect } from 'react';

// 弹窗组件属性类型定义
interface ModalProps {
  error: string; // 错误信息
  onReload: (forceReload: boolean) => void; // 重新加载的函数
}

/**
 * 弹窗组件
 * 
 * @param {ModalProps} props - 组件属性
 * @returns {JSX.Element} 弹窗的 JSX 元素
 */
export function Modal({ error, onReload }: ModalProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(!!error); // 根据 error 属性更新弹窗状态
  }, [error]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-100 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4 text-green-800">接口异常</h2>
            <p className="text-green-700">{error}</p>
            <div className="flex flex-1 gap-2 justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                关闭
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  onReload(true); // 执行重新加载函数，传入 true 参数
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                重新加载
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
