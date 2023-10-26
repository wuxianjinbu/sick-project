<template>
    <div class="main">
        <div v-title :data-title="title+'详情'">
            <n-space vertical :size="20">
                <n-card size="huge">
                    <n-breadcrumb separator=">">
                        <n-breadcrumb-item href="/index">首页</n-breadcrumb-item>
                        <n-breadcrumb-item href="/allnotice">公告</n-breadcrumb-item>
                        <n-breadcrumb-item>
                            <n-ellipsis style="max-width: 300px" :tooltip="false">
                                {{ title }}
                            </n-ellipsis>
                        </n-breadcrumb-item>
                    </n-breadcrumb>
                </n-card>

                <n-card size="huge" class="notice">

                    <n-divider class="divider" title-placement="left">公告</n-divider>
                    <div class="noticebox">
                        <n-h2>{{ msg.notice.title }}</n-h2>
                        <n-p class="pubtime">{{ msg.notice.pubtime }}</n-p>
                        <div class="container centered ck-content" v-html="msg.notice.content"></div>
                    </div>

                </n-card>

            </n-space>
        </div>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
// 创建路由对象
const route = useRoute()

// proxy使用axios
const { proxy } = getCurrentInstance()
// 定义本页数据
const msg = reactive({
  notice: {}
})
const noticeid = route.query.id
const title = route.query.title
proxy.$axios.get('/notice/noticedetail/' + noticeid).then(res => {
  msg.notice = res.data.data
})

</script>
<style scoped lang='scss'>
@import url('@/assets/editorstyles.css');
.notice {
    width: 80%;
    margin: 0 auto;

    .noticebox {
        width: 90%;
        // background-color: aqua;
        margin: 0 auto;

        .pubtime{
            color: #B7B6B7;
        }
        .container{
            width: 100%;
        }
    }
}

.divider {
    font-size: 2rem;
}
</style>
