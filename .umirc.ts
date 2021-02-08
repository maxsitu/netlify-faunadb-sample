import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login' },
    { path: '/signup', component: '@/pages/signup' },
    { path: '/providers', component: '@/pages/providers' },
    { path: '/identity', component: '@/pages/identity' },
  ],
  fastRefresh: {},
  alias: {
    component: resolve(__dirname, 'src/component'),
    helper: resolve(__dirname, 'src/helper'),
    hook: resolve(__dirname, 'src/hook'),
    icon: resolve(__dirname, 'src/icon'),
  },
});
