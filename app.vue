<!--
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 09:59:42
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-16 11:18:01
-->
<template>
  <div>
    <n-config-provider :theme="lightTheme" :theme-overrides="customTheme">
        <n-notification-provider>
        <n-message-provider>
          <n-loading-bar-provider>
          <RegisterComponent/>
          <n-spin size="small" :show="loading">
            <NuxtLayout><NuxtPage /></NuxtLayout>
          </n-spin>
        </n-loading-bar-provider>
        </n-message-provider>
        </n-notification-provider>
     </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { lightTheme } from 'naive-ui'
import customTheme from '@/assets/json/customTheme.json'
const loading = useLoading()
useUserInfo().value.token='cc8b443fcece4bc387a24b07ccf2b2fe'
</script>
