<!--
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-16 09:32:27
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-16 10:49:14
-->
<template>
     <div></div>
</template>

<script lang="ts" setup>
  import { useNotification,useMessage,useLoadingBar  } from 'naive-ui'
  globalVar.$notification = useNotification()
  globalVar.$message = useMessage()
  globalVar.$loadingBar = useLoadingBar()
</script>