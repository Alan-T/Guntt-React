// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), visualizer() as any],
  build: {
    outDir: "dist",
    lib: {
      entry: resolve("packages/index.tsx"), // 组件库的入口文件
      name: "GanttReact", // 组件库的全局变量名
      fileName: (format) => `gantt-react.${format}.js`, // 构建输出的文件名
      // 打包格式
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"], // 外部依赖
    },
  },
});
