/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 10:53:08
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-08 10:56:03
 */
import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup,} from 'unocss'

export default defineConfig({
    presets: [
        // 由 Iconify 提供支持的纯 CSS 图标解决方案
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetUno(),
        presetAttributify(),
    ],
    /**
     * 自定义快捷语句
     * @see https://github.com/unocss/unocss#shortcuts
     */
    shortcuts: [
        ['center', 'flex justify-center items-center'],
        ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ],
    transformers: [
        transformerDirectives(), // 启用 @apply 功能
        transformerVariantGroup(), // 启用 () 分组功能
    ],
})
