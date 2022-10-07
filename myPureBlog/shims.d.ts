// ts没有定义.vue文件
declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
  readonly VITE_APP_NODE_ENV: string
  // 更多环境变量...
}

