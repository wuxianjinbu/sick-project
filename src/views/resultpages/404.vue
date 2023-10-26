<template>
    <div class="main">
        <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬" class="tip">
            <template #footer>
                <n-button><a href="https://www.4399.com" style="text-decoration: none;color: black;">找点乐子吧</a></n-button>
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
