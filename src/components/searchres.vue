<template>
  <div class="main">
    <div v-title :data-title="'搜索结果'"></div>
    <n-space vertical :size="20">

      <n-card size="huge">
        <n-breadcrumb separator=">">
          <n-breadcrumb-item href="/index">首页</n-breadcrumb-item>
          <n-breadcrumb-item><n-gradient-text type="info">{{ msg.keyword }}</n-gradient-text>—搜索结果</n-breadcrumb-item>
        </n-breadcrumb>
      </n-card>

      <n-card size="huge" class="searchres">
        <div class="inputbox">
          <n-input round placeholder="输入作者名或者书名" class="searchinput" v-model:value="msg.searchvalue">
            <template #suffix>
              <n-icon :component="Search" class="searchicon" @click="cilcisearch" />
            </template>
          </n-input>
        </div>
        <n-empty style="height: 40vh;margin-top: 20%;" size="huge" description="没有搜索到相关结果" v-if="msg.isempty">
        </n-empty>

        <n-grid x-gap="12" :cols="4" v-else>
          <n-gi v-for="i in msg.searchres" :key="i.id">
            <div class="bookbox">
              <div class="imgbox">
                <img :src="url + i.coverurl" alt="加载失败" @click="showdetail(i)">
              </div>
              <n-p :title="i.bookname">{{ i.bookname }}</n-p>
              <span :title="i.author">{{ i.author }}</span>
            </div>
          </n-gi>
        </n-grid>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 引入图标
import { NIcon } from 'naive-ui'
import { Search } from '@vicons/ionicons5'
// proxy使用axios
const { proxy } = getCurrentInstance()
const url = ref(proxy.$url)
const route = useRoute()
const router = useRouter()
// 接收路由传递的参数
const searchinput = route.query.search
// 定义本页数据
const msg = reactive({
  searchres: [],
  isempty: Boolean,
  keyword: '',
  searchvalue: searchinput
})
search()
function search () {
  proxy.$axios.get('/search/search/' + msg.searchvalue).then(res => {
    console.log(res.data)
    msg.searchres = res.data.data
    msg.isempty = res.data.isempty
    msg.keyword = res.data.keyword
  })
}
// 点击搜索
const cilcisearch = () => {
  if (msg.searchvalue === '') {
    return false
  } else {
    search()
  }
}
// 查看详情
const showdetail = (i) => {
  const { href } = router.resolve({
    name: 'bookdetail',
    query: {
      bookid: i.id,
      bookname: i.bookname
    }
  })
  window.open(href, '_blank')
}
</script>
<style scoped lang='scss'>
.main {
  background-color: #f6f6f6;
}

.searchres {
  // background-color: antiquewhite;
  width: 80%;
  margin: 0 auto;

  .inputbox {
    text-align: center;
    margin-bottom: 5%;

    .searchinput {
      border: 1px solid #18A058FF;
      width: 50%;

      .searchicon {
        cursor: pointer;

        :hover {
          color: #5898a6;
        }
      }

    }
  }

}

.bookbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: rgba(0, 128, 0, 0.12);
  .imgbox{
    cursor: pointer;
    width: 70%;
    img{
      width: 100%;
    }
  }
}
</style>
