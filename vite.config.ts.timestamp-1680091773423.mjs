// vite.config.ts
import react from "file:///D:/web/reactjs/goods-traceability-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///D:/web/reactjs/goods-traceability-app/node_modules/vite/dist/node/index.js";
import TypeCheck from "file:///D:/web/reactjs/goods-traceability-app/node_modules/vite-plugin-checker/dist/esm/main.js";
var __vite_injected_original_dirname = "D:\\web\\reactjs\\goods-traceability-app";
var vite_config_default = ({ mode }) => {
  return defineConfig({
    build: {
      target: "esnext",
      outDir: "dist",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes(""))
                return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          }
        }
      }
    },
    css: {
      modules: {
        generateScopedName: "[folder]__[local]__[hash:base64:5]"
      }
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: { host: true, open: true, port: 3e3 },
    plugins: [
      react(),
      TypeCheck({
        typescript: true,
        enableBuild: false,
        overlay: {
          initialIsOpen: false,
          position: "tr"
        },
        terminal: true,
        eslint: {
          lintCommand: 'eslint "./**/*.{ts,tsx}"',
          dev: {
            logLevel: ["error"]
          }
        }
      })
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`
    },
    preview: {
      port: 3e3
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3ZWJcXFxccmVhY3Rqc1xcXFxnb29kcy10cmFjZWFiaWxpdHktYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3ZWJcXFxccmVhY3Rqc1xcXFxnb29kcy10cmFjZWFiaWxpdHktYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93ZWIvcmVhY3Rqcy9nb29kcy10cmFjZWFiaWxpdHktYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IFR5cGVDaGVjayBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcclxuICAgICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCcnKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBpZFxyXG4gICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXVxyXG4gICAgICAgICAgICAgICAgICAuc3BsaXQoJy8nKVswXVxyXG4gICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBtb2R1bGVzOiB7XHJcbiAgICAgICAgZ2VuZXJhdGVTY29wZWROYW1lOiAnW2ZvbGRlcl1fX1tsb2NhbF1fX1toYXNoOmJhc2U2NDo1XScsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHsgaG9zdDogdHJ1ZSwgb3BlbjogdHJ1ZSwgcG9ydDogMzAwMCB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICBUeXBlQ2hlY2soe1xyXG4gICAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlQnVpbGQ6IGZhbHNlLFxyXG4gICAgICAgIG92ZXJsYXk6IHtcclxuICAgICAgICAgIGluaXRpYWxJc09wZW46IGZhbHNlLFxyXG4gICAgICAgICAgcG9zaXRpb246ICd0cicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXJtaW5hbDogdHJ1ZSxcclxuICAgICAgICBlc2xpbnQ6IHtcclxuICAgICAgICAgIGxpbnRDb21tYW5kOiAnZXNsaW50IFwiLi8qKi8qLnt0cyx0c3h9XCInLFxyXG4gICAgICAgICAgZGV2OiB7XHJcbiAgICAgICAgICAgIGxvZ0xldmVsOiBbJ2Vycm9yJ10sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBgXCIke21vZGV9XCJgLFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgcG9ydDogMzAwMCxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVMsT0FBTyxXQUFXO0FBQzNULFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGVBQWU7QUFIdEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzNCLFNBQU8sYUFBYTtBQUFBLElBQ2xCLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGFBQWEsSUFBSTtBQUNmLGdCQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0Isa0JBQUksR0FBRyxTQUFTLEVBQUU7QUFDaEIsdUJBQU8sR0FDSixTQUFTLEVBQ1QsTUFBTSxlQUFlLEVBQUUsR0FDdkIsTUFBTSxHQUFHLEVBQUUsR0FDWCxTQUFTO0FBQUEsWUFDaEI7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRLEVBQUUsTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLElBQUs7QUFBQSxJQUM3QyxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsUUFDUixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixTQUFTO0FBQUEsVUFDUCxlQUFlO0FBQUEsVUFDZixVQUFVO0FBQUEsUUFDWjtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFVBQ04sYUFBYTtBQUFBLFVBQ2IsS0FBSztBQUFBLFlBQ0gsVUFBVSxDQUFDLE9BQU87QUFBQSxVQUNwQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTix3QkFBd0IsSUFBSTtBQUFBLElBQzlCO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
