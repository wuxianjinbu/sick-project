<template>
    <div class="main">
        <div v-title data-title="全部公告">
            <n-space vertical :size="20">
                <n-card size="huge">
                    <n-breadcrumb separator=">">
                        <n-breadcrumb-item href="/index">首页</n-breadcrumb-item>
                        <n-breadcrumb-item>公告</n-breadcrumb-item>
                    </n-breadcrumb>
                </n-card>

                <n-card size="huge" class="notice">
                        <n-divider class="divider" title-placement="left">公告</n-divider>
                        <div class="noticebox">
                            <n-list hoverable clickable>
                                <n-list-item v-for="i, index in msg.allnotice" :key="i.id" @click="noticedetail(i)" class="listitem">
                                    <template #prefix>
                                        {{ index + 1 }}
                                    </template>
                                    <template #suffix>
                                        <n-gradient-text type="info">
                                            {{ i.pubtime }}
                                        </n-gradient-text>
                                    </template>
                                    <n-thing>
                                        <n-ellipsis style="max-width: 700px" :tooltip="false">
                                            {{ i.title }}
                                        </n-ellipsis>
                                    </n-thing>
                                </n-list-item>
                            </n-list>
                        </div>
                        <div class="pagination">
                            <n-pagination v-model:page="msg.page" :page-count="msg.allpage" @update:page="changepage" />
                        </div>
                </n-card>
            </n-space>
        </div>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// 创建路由对象
const router = useRouter()
// 注入组件刷新的方法
// const reload = inject('reload')
// proxy使用axios
const { proxy } = getCurrentInstance()
// 定义本页数据
const msg = reactive({
  allnotice: [],
  page: 1,
  allpage: 0
})
function getnotice (page) {
  proxy.$axios.get('/notice/allnotice/' + page).then(res => {
    msg.allnotice = res.data.data
    msg.allpage = res.data.allpage
  })
}
getnotice(msg.page)

// 列表点击事件
const noticedetail = (i) => {
  const { href } = router.resolve({
    name: 'noticedetail',
    query: {
      id: i.id,
      title: i.title
    }
  })
  window.open(href, '_blank')
}

const changepage = () => {
  getnotice(msg.page)
}
</script>
<style scoped lang='scss'>
.main{
    background: rgba(226,228,232,0.8);
    height: 100vh;
}
.notice {
    width: 80%;
    margin: 0 auto;

    .noticebox {
        width: 90%;
        margin: 0 auto;
    }
}

.divider {
    font-size: 2rem;
}

.pagination{
    // width: 70%;
    margin: 0 auto;
    // background-color: aqua;
    margin-top: 1%;
    display: flex;
    justify-content: center;
}

.listitem{

    .n-ellipsis{
        background:linear-gradient(to right,black,#58a) no-repeat right bottom;
        background-size:0 2px;
        transition: background-size 1000ms;
    }
    .n-ellipsis:hover{
        background-position-x:left ;
        background-size:100% 2px;
    }
}
</style>
