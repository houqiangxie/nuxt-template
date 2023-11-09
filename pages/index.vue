<!--
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2023-11-08 10:11:58
 * @LastEditors: houqiangxie
 * @LastEditTime: 2023-11-08 19:07:30
-->
<template>
    <div>
        index
    </div>
</template>

<script lang="ts" setup>
const getList =async()=>{
    const {data}= await post('/workbench/getProblemList',{"pageNum":1,"pageSize":8})
}
useUser().userInfo.token='3c53f23008e441869dd9a0ff4d05240e'
setTimeout(() => {
getList()
    
}, 3000);
</script>