<template>
    <div class="main">
        <n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的" class="tip">
            <template #footer>
                <n-button>放轻松</n-button>
            </template>
        </n-result>
    </div>
</template>

<style lang="scss">
.main{
    height: 100vh;
    width: 100%;
    // background-color: #5898a6;
    display: table;
    .tip{
        display: table-cell;
        vertical-align: middle;
    }
}
</style>
