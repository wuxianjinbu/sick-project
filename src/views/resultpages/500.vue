<template>
    <div class="main">
        <n-result status="500" title="500 服务器错误" description="服务器出错可能说明我困了" class="tip">
            <template #footer>
                <n-button>散财消灾</n-button>
            </template>
        </n-result>
    </div>
</template>
<style lang="scss">
.main {
    height: 100vh;
    width: 100%;
    // background-color: #5898a6;
    display: table;

    .tip {
        display: table-cell;
        vertical-align: middle;
    }
}
</style>
