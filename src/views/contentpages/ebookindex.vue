<template>
  <div class="main">
    <div v-title data-title="首页"></div>
    <div class="carousel">
      <n-carousel show-arrow autoplay :interval=3000>
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
        <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg">
      </n-carousel>
    </div>

    <div class="rightcard">
      <n-card title="公告" size="huge" embedded>
        <template #header-extra>
          <n-gradient-text type="success" style="cursor: pointer;" @click="noticemore">
            更多
          </n-gradient-text>
        </template>
        <n-list hoverable clickable>
          <n-list-item v-for="i, index in msg.notice" :key="i.id" @click="noticedetail(i)">
            <n-ellipsis style="max-width: 450px" :tooltip="false">
              {{ i.title }}
            </n-ellipsis>
            <template #prefix>
              {{ index + 1 }}
            </template>
            <template #suffix>
              <n-gradient-text type="info">
                {{ i.pubtime }}
              </n-gradient-text>
            </template>
          </n-list-item>
        </n-list>
      </n-card>
    </div>

    <div class="midcard">
      <n-card title="推荐" size="huge" embedded>
        <n-grid :x-gap="60" :y-gap="20" :cols="4">
          <n-grid-item v-for="m in msg.midarr" :key="m.id" @click="showdetail(m.id, m.bookname)">
            <div class="bookbox">
              <div class="imgbox">
                <img :src='m.coverurl' alt="" style="width: 100%;display: block;">
              </div>
              <h2 class="bookname" :title="m.bookname">{{ m.bookname }}</h2>
              <span :title="m.author">{{ m.author }}</span>
            </div>
          </n-grid-item>
        </n-grid>
      </n-card>
    </div>

    <div class="downcard">
      <n-card title="分类总览" size="huge" embedded>
        <n-grid :cols="4" :y-gap="5">
          <n-gi v-for="val, key, index in msg.classify" :key="index">
            <div class="classify">
              <n-a>{{ key }}-{{ val }}本</n-a>
            </div>
          </n-gi>

        </n-grid>
      </n-card>
    </div>
  </div>
</template>

<script setup>
// import { useMessage } from 'naive-ui'
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// proxy使用axios
const { proxy } = getCurrentInstance()
// 创建路由对象
const router = useRouter()
// 定义主页数据数组对象
const msg = reactive({
  midarr: [],
  classify: {},
  notice: []
})
// 首页中间数据请求
proxy.$axios.get('/home/recommend').then(res => {
  msg.midarr = res.data.data
  msg.classify = res.data.classify
})
// 点击中间图书的事件
const showdetail = (bookid, bookname) => {
  const { href } = router.resolve({
    name: 'bookdetail',
    query: {
      bookid: bookid,
      bookname: bookname
    }
  })
  window.open(href, '_blank')
}

// 首页右侧数据请求
proxy.$axios.get('/notice/indexnotice').then(res => {
  // console.log(res)
  msg.notice = res.data.data
})

// 更多列表事件
const noticemore = () => {
  const { href } = router.resolve({
    name: 'allnotice'
  })
  window.open(href, '_blank')
}
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
</script>
<style scoped lang='scss'>
.bookbox {
  cursor: pointer;
  height: 250px;
  // background-color: rgba(0, 128, 0, 0.12);
  padding: 10% 0;
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
  align-items: center;

  .imgbox {
    width: 70%;
    // height:200px;

  }

  .bookname {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.bookbox:hover {
  background-color: rgba(0, 128, 0, 0.12);
  // background: rgba(128, 128, 128, 0.2);
}

.carousel {
  width: 40%;
}

.carousel-img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.main {
  // background-color: aqua;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.rightcard {
  width: 50%;
}

.midcard,
.downcard {
  width: 90%;
}

.carousel,
.rightcard,
.midcard,
.downcard {
  margin-top: 3%;
}

.ncard {
  // background-color: aqua;
  display: flex;
}

.downcontent {
  // background-color: antiquewhite;
  width: 25%;
  text-align: center;
}

.classify {
  // height: 108px;
  // background-color: rgba(0, 128, 0, 0.12);
  border: 1px solid #5898a6;
  padding: 5% 0;
  text-align: center;
  color: #5898a6;
  overflow: hidden;
  position: relative;
  background: transparent;

  // background: #1c2541;
  a {
    z-index: 20;
  }
}

.classify:after {
  content: '';
  display: block;
  position: absolute;
  top: -36px;
  left: -100px;
  // background: white;
  background: #5898a6;
  width: 50px;
  height: 125px;
  opacity: 20%;
  transform: rotate(-45deg);
}

.classify:hover:after {
  left: 120%;
  transition: all 1000ms cubic-bezier(0.3, 1, 0.2, 1);
  -webkit-transition: all 1000ms cubic-bezier(0.3, 1, 0.2, 1);
}
</style>
