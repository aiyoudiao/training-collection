import { defineConfig, type PluginOption } from "vite";
import { terser } from "@rollup/plugin-terser";
import { eslint } from "@rollup/plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import { fileURLToPath } from "url";
// import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
// https://www.npmjs.com/package/vite-plugin-windicss
// import windiCSS from "vite-plugin-windicss";
// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";

  return {
    base: "./",
    plugins: [
      react(), // React插件
      // windiCSS(), // tailwind css 插件
      // legacy({ targets: ["defaults", "not IE 11"] }), // 兼容老版本浏览器
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
        // https://vite-pwa-org.netlify.app/workbox/generate-sw.html
        // https://developer.chrome.com/docs/workbox/using-plugins?hl=zh-cn
        // workbox: {
        //   // 配置 Workbox 插件，包括缓存策略等
        //   cleanupOutdatedCaches: true, // 自动清理过期缓存
        //   clientsClaim: true, // 立即接管页面
        //   skipWaiting: true, // 立即激活新的 Service Worker
        //   offlineGoogleAnalytics: false, // 离线时是否发送 Google Analytics 数据
        //   runtimeCaching: [
        //     {
        //       urlPattern: new RegExp(".*"),
        //       handler: "StaleWhileRevalidate",
        //       options: {
        //         cacheName: "github-api-cache",
        //         expiration: {
        //           maxEntries: 30,
        //           maxAgeSeconds: 24 * 60 * 60, // 缓存存活时间为 1 天
        //         },
        //       },
        //     },
        //     // 添加更多的 runtimeCaching 配置项...
        //   ],
        // },
      }),
      visualizer({
        // 构建结果分析插件
        filename: "./dist/report.html",
        open: true, // 构建完成后自动打开分析报告
      }) as PluginOption,
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/"), // 路径别名
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"], // 解析这些扩展名
    },
    build: {
      sourcemap: isProduction ? false : isDevelopment && "inline", // source map配置
      outDir: "dist", // 输出目录
      // https://cn.rollupjs.org/configuration-options/#output-manualchunks
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            let folder = "assets";
            const name = assetInfo?.name || "";
            if (/\.css$/.test(name)) {
              folder = "assets/css";
            } else if (/\.png$/.test(name) || /\.jpg$/.test(name)) {
              folder = "assets/images";
            }
            return `${folder}/[name]-[hash].[ext]`;
          },
          manualChunks(id) {
            if (id?.includes("node_modules")) {
              return "vendor"; // 分割vendor代码
            }
          },
        },
        plugins: [
          eslint(),
          terser({
            compress: {
              drop_console: true, // 这会删除 console.* 函数的调用
            },
          }),
        ],
      },
    },
    // optimizeDeps: {
    //   include: ["@fortawesome/fontawesome-free"],
    // },
  };
});
