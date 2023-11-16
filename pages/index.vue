<!--
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 10:11:58
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-16 10:57:36
-->
<template>
    <div>
        
        <NButton type="primary" @click="btnClick"> page index primary button </NButton>
    </div>
</template>

<script lang="ts" setup>
const getList =async()=>{
    const a = await post('/task/getUserScore')
}



const btnClick=()=>{
getList()
setTimeout(() => {
getList()
}, 100);
setTimeout(() => {
getList()
}, 500);
setTimeout(() => {
getList()
}, 1000);
}
btnClick()
</script>