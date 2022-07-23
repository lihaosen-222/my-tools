import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      // 按需导入 antd 样式
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 导入 less，得安装 less 包
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      // 测试时用 3000， 运行时用相对
      "/api": {
        target: "http://localhost:8007/",
      },
      "/socket.io": { // socket.io 默认走这个地址，要代理这个
        target: "http://localhost:8007/",
      },
    },
  },
});
