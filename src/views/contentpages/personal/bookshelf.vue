<template>
  <div v-title :data-title="usermsg.username + '的书架'">
    <n-empty size="large" description="你的书架空空如也" style="margin:10% 0;" v-if="msg.isempty" ></n-empty>

    <n-grid :x-gap="40" :y-gap="30" :cols="4" v-else>
      <n-grid-item v-for="i in msg.usershelf" :key="i.id">
      <div class="bookbox" >
        <div class="imgbox">
          <n-tooltip trigger="hover"  placement="right" >
            <template #trigger>
          <img :src="url+i.coverurl" alt="加载失败"  @click="showdetail(i)">
        </template>
          <n-button type="warning" @click="removefromshelf(i)">移除</n-button>
        </n-tooltip>
        </div>
        <n-p :title="i.bookname">{{ i.bookname }}</n-p>
      </div>
    </n-grid-item>
    </n-grid>

  </div>

</template>

<script setup>
import { useMessage } from 'naive-ui'
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// 创建路由对象
const router = useRouter()
// proxy使用axios
const { proxy } = getCurrentInstance()
const url = ref(proxy.$url)
const message = useMessage()
// 定义本页数据
const msg = reactive({
  usershelf: [],
  isempty: true
})
// 获取用户信息
const usermsg = localStorage.getExpire('user')
const uid = usermsg.id
// 查询书架数据方法
selectshelf()
function selectshelf () {
  proxy.$axios.get('/shelf/getshelflist/' + uid).then(res => {
    msg.usershelf = res.data.data
    msg.isempty = res.data.isempty
  })
}
// 点击进入详情页面
const showdetail = (i) => {
  const { href } = router.resolve({
    name: 'bookdetail',
    query: {
      bookid: i.bid,
      bookname: i.bookname
    }
  })
  window.open(href, '_blank')
}
// 从书架移除
const removefromshelf = (i) => {
  console.log(i)
  proxy.$axios.post('/shelf/removefroshelf', { uid: i.uid, bid: i.bid }).then(res => {
    message.success(res.data.msg)
    selectshelf()
  })
}

</script>
<style scoped lang='scss'>
.bookbox{
  // background-color: rgba(0, 128, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .imgbox{
    cursor: pointer;
    width: 70%;
    img{
      width: 100%;
    }
  }
  .n-p{
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>
