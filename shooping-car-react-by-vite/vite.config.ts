/// <reference types='vitest' />
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { terser } from '@rollup/plugin-terser';
import { eslint } from '@rollup/plugin-eslint';

// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';

  return {
    base: './',
    root: __dirname,
    cacheDir: './node_modules/.vite',
    publicDir: 'public', // 静态资源服务的文件夹
    server: {
      port: 4200,
      host: 'localhost',
    },

    preview: {
      port: 4300,
      host: 'localhost',
    },

    plugins: [
      react(),
      nxViteTsPaths(),
      viteCompression({ algorithm: 'gzip' }),
      visualizer({
        // 构建结果分析插件
        filename: './dist/report.html',
        open: true, // 构建完成后自动打开分析报告
      }) as PluginOption,
    ],
    json: {
      namedExports: true, // 是否支持从.json文件中进行按名导入
      stringify: false, //  开启此项，导入的 JSON 会被转换为 export default JSON.parse("...") 会禁用按名导入
    },
    esbuild: {
      // 最常见的用例是自定义 JSX
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    clearScreen: true, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/'), // 路径别名
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // 解析这些扩展名
    },

    build: {
      sourcemap: isProduction ? false : isDevelopment && 'inline', // source map配置
      outDir: 'dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      // https://cn.rollupjs.org/configuration-options/#output-manualchunks
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            let folder = 'assets';
            const name = assetInfo?.name || '';
            if (/\.css$/.test(name)) {
              folder = 'assets/css';
            } else if (/\.png$/.test(name) || /\.jpg$/.test(name)) {
              folder = 'assets/images';
            }
            return `${folder}/[name]-[hash].[ext]`;
          },
          manualChunks(id) {
            if (id?.includes('node_modules')) {
              return 'vendor'; // 分割vendor代码
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
      minify: 'esbuild', // 指定使用哪种混淆器
      terserOptions: {}, // 传递给 Terser 的更多 minify 选项
      write: true, // 启用将构建后的文件写入磁盘
      brotliSize: true, // 启用 brotli 压缩大小报告
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制
      assetsDir: 'assets', // 指定生成静态文件目录
      assetsInlineLimit: '4096', // 小于此阈值的导入或引用资源将内联为 base64 编码
      cssCodeSplit: true, // 启用 CSS 代码拆分
      target: ['modules'], // 设置最终构建的浏览器兼容目标
      polyfillModulePreload: true, // 是否自动注入 module preload 的 polyfill
    },

    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      reporters: ['default'],
      coverage: {
        reportsDirectory: './coverage/shooping-car-react-by-vite',
        provider: 'v8',
      },
    },

    optimizeDeps: [],
  };
});
