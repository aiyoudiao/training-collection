// tailwind.config.js
module.exports = {
  // 指定 Tailwind CSS 应该应用样式的文件路径
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // 这里包括所有在 src 目录下的 JavaScript、TypeScript、JSX 和 TSX 文件

  theme: {
    extend: {
      // 自定义颜色
      colors: {
        primary: {
          light: "#a7f3d0", // 主颜色的浅色版本
          DEFAULT: "#10b981", // 主颜色的默认版本
          dark: "#047857", // 主颜色的深色版本
        },
        secondary: {
          light: "#d1fae5", // 次颜色的浅色版本
          DEFAULT: "#6ee7b7", // 次颜色的默认版本
          dark: "#34d399", // 次颜色的深色版本
        },
        accent: "#34d399", // 强调颜色
      },

      // 自定义字体系列
      fontFamily: {
        sans: ["Inter", "sans-serif"], // sans-serif 字体系列
        display: ["Poppins", "sans-serif"], // display 字体系列
      },

      // 自定义盒子阴影
      boxShadow: {
        "outline-green": "0 0 0 3px rgba(16, 185, 129, 0.5)", // 绿色轮廓阴影
      },

      // 自定义过渡属性
      transitionProperty: {
        width: "width", // 宽度过渡
        spacing: "margin, padding", // 间距（边距和内边距）过渡
        transform: "transform", // 变换过渡
      },

      // 自定义关键帧动画
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" }, // 在 0% 和 100% 时旋转 -3 度
          "50%": { transform: "rotate(3deg)" }, // 在 50% 时旋转 3 度
        },
        scaleUp: {
          "0%": { transform: "scale(1)" }, // 在 0% 时缩放比例为 1
          "100%": { transform: "scale(1.1)" }, // 在 100% 时缩放比例为 1.1
        },
      },

      // 自定义动画
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite", // wiggle 动画，1 秒持续时间，缓入缓出，无限循环
        scaleUp: "scaleUp 0.3s ease-in-out", // scaleUp 动画，0.3 秒持续时间，缓入缓出
      },
    },
  },
  plugins: [],
};
