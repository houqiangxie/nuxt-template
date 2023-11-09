<template>
    <div>
        {{a}}
    </div>
</template>

<script setup>
const a = ref('33333')
onMounted(() => {
    a.value='5'
}),
a.value='444'
</script>