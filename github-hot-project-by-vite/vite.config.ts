import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
// https://www.npmjs.com/package/vite-plugin-windicss
import windiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";

  return {
    base: "./",
    plugins: [
      react(), // React插件
      // windiCSS(), // tailwind css 插件
      // eslintPlugin(), // ESLint插件
      legacy({ targets: ["defaults", "not IE 11"] }), // 兼容老版本浏览器
      viteCompression({ algorithm: "gzip" }), // 启用gzip压缩
      VitePWA({
        // PWA插件
        manifest: {
          name: "Github 热门对战",
          short_name: "App",
          description: "群贤毕至，巅峰对决，谁与争锋？",
          theme_color: "#ffffff",
          icons: [
            {
              src: "./public/vite.svg",
              sizes: "192x192",
              type: "image/svg",
            },
          ],
        },
      }),
      visualizer({
        // 构建结果分析插件
        filename: "./dist/report.html",
        open: true, // 构建完成后自动打开分析报告
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"), // 路径别名
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 解析这些扩展名
    },
    build: {
      sourcemap: isProduction
        ? "source-map"
        : isDevelopment && "inline-source-map", // source map配置
      outDir: "dist", // 输出目录
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id?.includes("node_modules")) {
              return "vendor"; // 分割vendor代码
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: ["@fortawesome/fontawesome-free"],
    },
  };
});
