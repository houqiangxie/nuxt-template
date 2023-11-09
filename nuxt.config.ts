/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 09:59:42
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-08 14:39:26
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
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
})
