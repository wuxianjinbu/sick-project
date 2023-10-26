<template>
    <!-- <div style="height: 5000px;"> -->
        <n-spin :show="true" class="main">
        </n-spin>
    <!-- </div> -->
</template>

<script setup>
</script>
<style scoped lang='scss'>
.main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color:rgba(178,178,178,0.4);
}
</style>
