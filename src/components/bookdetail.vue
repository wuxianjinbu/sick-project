<template>
    <div class="main">
        <div v-title :data-title="bookname + '_详情'">
            <n-space vertical :size="20">
                <n-card size="huge">
                    <n-breadcrumb separator=">">
                        <n-breadcrumb-item href="/index">首页</n-breadcrumb-item>
                        <n-breadcrumb-item>{{ msg.bookinfo.bookname }}</n-breadcrumb-item>
                    </n-breadcrumb>
                </n-card>

                <n-card size="huge" class="bookinfo">
                    <div class="bookinfolay">
                        <div class="imgbox">
                            <img :src="msg.bookinfo.coverurl" alt="" style="width: 100%;">
                        </div>
                        <div class="rightmsg">
                            <n-h1 style="font-weight: bold;">{{ msg.bookinfo.bookname }}</n-h1>
                            <n-h3 style="color:#1b88ee ;">{{ msg.bookinfo.author }}</n-h3>
                            <p><n-tag class="type" :bordered="false" type="success" v-for="i, index in msg.bookinfo.type"
                                    :key="index">{{ i }}</n-tag></p>
                            <p><span class="bookmsg">{{msg.content.length  }}</span>章<span class="ver">|</span><span class="bookmsg">{{
                                msg.totalnum }}</span>字
                            </p>
                            <div class="buttons">
                                <n-button size="large" round type="info" @click="reader(0)">开始阅读</n-button>
                                <n-button size="large" round type="tertiary" v-if="msg.isshelf"
                                    @click="removefromshelf">已在书架</n-button>
                                <n-button size="large" round type="primary" v-else @click="addshelf">加入书架</n-button>

                            </div>
                        </div>
                    </div>
                </n-card>

                <n-card size="huge" class="bookintroduction">
                    <n-divider class="divider">内容简介</n-divider>
                    <n-p v-for="i, index in msg.bookinfo.introduction" :key="index">{{ i }}</n-p>
                </n-card>

                <n-card size="huge" class="bookchapter">
                    <n-divider class="divider">章节-{{ msg.content.length }}章</n-divider>
                    <n-grid :x-gap="20" :y-gap="8" :cols="3">
                        <n-grid-item v-for="i, index in msg.content" :key="index" @click="reader(index)">
                            <div class="chapterbox">
                                <n-p>
                                    {{ i.chapter }}--{{ i.title }}
                                </n-p>
                            </div>
                        </n-grid-item>
                    </n-grid>
                </n-card>
            </n-space>
        </div>
    </div>
</template>

<script setup>
import { reactive, getCurrentInstance, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
const message = useMessage()
// 注入组件刷新的方法
const reload = inject('reload')
// 创建路由对象
const route = useRoute()
const router = useRouter()
// 拿到路由传值bookid
const bookid = route.query.bookid
const bookname = route.query.bookname
// proxy使用axios
const { proxy } = getCurrentInstance()
// 定义本页数据
const msg = reactive({
  bookinfo: {},
  isshelf: false,
  totalnum: 0,
  content: []
})

// 从浏览器拿到用户数据
const usermsg = localStorage.getExpire('user')
// 请求图书的详细信息
proxy.$axios.get('/book/bookdetail/' + bookid).then(res => {
  //   console.log(res.data)
  msg.bookinfo = res.data.data
  msg.totalnum = res.data.totalnum
  msg.content = res.data.content
})
// 查询图书是否在书架,前提是用户已登录
if (usermsg) {
  proxy.$axios.post('/book/isshelf', { uid: usermsg.id, bid: bookid }).then(res => {
    //   console.log(res.data)
    msg.isshelf = res.data.isshelf
  })
}
// 加入书架请求
const addshelf = () => {
  // 获取用户信息，判断是否登录
  if (usermsg) {
    // 已登录状态
    const addshelfmsg = {
      uid: usermsg.id,
      bid: msg.bookinfo.id,
      bookname: msg.bookinfo.bookname,
      origincoverurl: msg.bookinfo.origincoverurl
    }
    // console.log(addshelfmsg)
    proxy.$axios.post('/shelf/addshelf', { addshelfmsg }).then(res => {
      message.success(res.data.msg)
      reload()
    })
  } else {
    // 提示未登录
    message.error('请先登录')
  }
}
// 从书架中移除
const removefromshelf = () => {
  proxy.$axios.post('/shelf/removefroshelf', { uid: usermsg.id, bid: bookid }).then(res => {
    message.success(res.data.msg)
    reload()
  })
}

// 开始阅读按钮事件
const reader = (index) => {
//   console.log(index)
  const { href } = router.resolve({
    name: 'reader',
    query: {
      bookid: bookid,
      bookname: bookname,
      chapter: index
    }
  })
  window.open(href, '_blank')
}
</script>
<style scoped lang='scss'>
.main {
    background-color: #f6f6f6;
}

.bookinfo {
    // background-color: antiquewhite;
    // height: 200px;
    width: 80%;
    margin: 0 auto;
    display: flex;

    .bookinfolay {
        display: flex;

        .imgbox {
            width: 30%;
            // background-color: aqua;
        }
    }

    .rightmsg {
        width: 22%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .ver {
            margin: 0 10%;
            font-size: 2rem;
        }

        .type {
            margin-right: 10%;
        }

        .bookmsg {
            font-weight: bolder;
            font-size: 1.5rem;
        }

        .buttons {
            display: flex;
            justify-content: space-between;

        }
    }
}

.bookintroduction {
    width: 80%;
    margin: 0 auto;

    p {
        text-indent: 2em;
    }

    .divider {
        font-size: 2rem;
    }
}

.bookchapter {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10%;

    .divider {
        font-size: 2rem;
    }
}

.chapterbox {
    // height: 108px;
    padding:5% 0;
    // display: flex;
    // justify-content: center;
    // text-align: center;
    cursor: pointer;
}
.chapterbox:hover{
background-color: rgba(0, 128, 0, 0.12);
    }
</style>
