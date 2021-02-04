import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  alias: { 
    '@Component': resolve(__dirname, 'src/component'),
    '@Helper': resolve(__dirname, 'src/helper'),
    '@Hook': resolve(__dirname, 'src/hook'),
   },
});
