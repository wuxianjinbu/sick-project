<template>
  <div class="main" v-title data-title="书库">
    <div class="classifybar">
      <n-card  size="huge" embedded>
      <n-space>
        <n-tag v-for="i,index in msg.tags" :key="index" :checked='index===msg.currentIndex' checkable @click="chooseclassify(i,index)">
          {{i}}
        </n-tag>
      </n-space>
    </n-card>
    </div>

    <div class="classifybody">
      <n-card  size="huge" embedded>
      <n-grid :x-gap="60" :y-gap="20" :cols="4">
          <n-grid-item v-for="m in msg.result" :key="m.id" @click="showdetail(m.id, m.bookname)">
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
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// 创建路由对象
const router = useRouter()
// proxy使用axios
const { proxy } = getCurrentInstance()
const msg = reactive({
  tags: [],
  currentIndex: 0,
  result: []
})

const chooseclassify = (i, index) => {
  msg.currentIndex = index
  getclassifyres(i)
}
// 进入页面获取分类的名称
proxy.$axios.get('/stack/classifyname').then(res => {
  msg.tags = res.data.data
  msg.tags.unshift('全部')
})
// 通过分类名称查询结果方法
function getclassifyres (name) {
  proxy.$axios.get('/stack/classifyname/' + name).then(res => {
    msg.result = res.data.data
  })
}
// 进入页面查询全部数据
getclassifyres('全部')

// 点击图书的事件
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
</script>
<style scoped lang='scss'>

.classifybar {
  // background-color: aqua;
  padding: 1%;
  width: 80%;
  margin: 0 auto;
}
.classifybody{
  background-color: blanchedalmond;
  width: 80%;
  margin:0 auto;
}

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
    width: 80%;
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
</style>
