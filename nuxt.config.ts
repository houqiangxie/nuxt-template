/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 09:59:42
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-16 11:16:26
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@unocss/nuxt',],
  imports: {
    dirs: [
      'composables/**',
      'stores/**',
    ]
  },
  server: true ,//开启服务端渲染或者预渲染
  nitro: {
    devProxy: {
      "/gateway": {
        target: "http://172.17.30.13:28999", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
        rewrite: (p:string) => p.replace(/^\/gateway/, ''),
      },
    },
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/formatInTimeZone']
          : []
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [NaiveUiResolver()], // Automatically register all components in the `components` directory
      }),
    ],
  }
})
