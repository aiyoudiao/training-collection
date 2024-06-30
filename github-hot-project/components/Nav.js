/**
 * 导航栏组件
 * @param {Object} props - 组件属性
 * @param {string} props.language - 当前选中的编程语言
 * @param {Function} props.change - 处理语言切换的函数
 */
export function Nav(props) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <div className="flex items-center justify-center my-4">
      {languages.map((lang) => {
        const isSelected = lang.toLowerCase() === props.language.toLowerCase();
        return (
          <button
            className={`mx-2 px-3 py-1 rounded-lg transition-colors duration-300 ${
              isSelected
                ? "bg-teal-500 text-white"
                : "bg-teal-100 text-teal-700 hover:bg-teal-200"
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
