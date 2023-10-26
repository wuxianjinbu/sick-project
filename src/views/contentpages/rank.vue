<template>
  <div class="main" v-title data-title="排行榜">
    <!-- 点击排行 -->
    <div class="left">
      <n-h2>点击排行
        <n-icon size="25">
          <HandClick />
        </n-icon>
      </n-h2>
      <n-list hoverable clickable>
        <n-list-item v-for="i, index in msg.clickrank" :key="i.id" class="listitem" @click="showdetail(i)">
          <template #prefix>
            <n-gradient-text v-if="index + 1 === 1" type="error" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
            <n-gradient-text v-if="index + 1 === 2" type="warning" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
            <n-gradient-text v-if="index + 1 === 3" type="info" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
            <n-gradient-text v-if="index + 1 > 3" type="primary" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
          </template>
          <n-thing :title="i.bookname + '——' + i.author" content-style="margin-top: 10px;">

            <template #description>
              <n-space size="small" style="margin-top: 4px">
                <n-tag v-for="t, index in i.type" :key="index" :bordered="false" type="info" size="small">
                  {{ t }}
                </n-tag>
              </n-space>
            </template>
            <n-ellipsis style="max-width: 400px" :tooltip="false">{{ i.introduction }}</n-ellipsis>
          </n-thing>
          <template #suffix>
            <n-gradient-text type="success">
              {{ i.clicknum }}
            </n-gradient-text>
          </template>
        </n-list-item>
      </n-list>
    </div>

    <n-divider vertical class="divider"></n-divider>

    <!-- 收藏量排行榜 -->
    <div class="right">
      <n-h2>收藏排行
        <n-icon size="25">
          <Books />
        </n-icon>
      </n-h2>
      <n-list hoverable clickable>
        <n-list-item v-for="i, index in msg.collectrank" :key="i.id" class="listitem" @click="showdetail(i)">
          <template #prefix>
            <n-gradient-text v-if="index + 1 === 1" type="error" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
            <n-gradient-text v-if="index + 1 === 2" type="warning" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
            <n-gradient-text v-if="index + 1 === 3" type="info" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
            <n-gradient-text v-if="index + 1 > 3" type="primary" :size="30">
              {{ index + 1 }}
            </n-gradient-text>
          </template>
          <n-thing :title="i.bookname + '——' + i.author" content-style="margin-top: 10px;">

            <template #description>
              <n-space size="small" style="margin-top: 4px">
                <n-tag v-for="t,index in i.type" :key="index"  :bordered="false" type="info" size="small">
                  {{t}}
                </n-tag>
              </n-space>

            </template>
            <n-ellipsis style="max-width: 400px" :tooltip="false">{{ i.introduction }}</n-ellipsis>
          </n-thing>
          <template #suffix>
            <n-gradient-text type="success">
              {{ i.collectnum }}
            </n-gradient-text>
          </template>
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<script setup>
import { HandClick, Books } from '@vicons/tabler'
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// 创建路由对象
const router = useRouter()
// proxy使用axios
const { proxy } = getCurrentInstance()
// 定义本页数据
const msg = reactive({
  clickrank: [],
  collectrank: []
})

proxy.$axios.get('/rank/clicknum').then(res => {
  console.log(res.data.data)
  msg.clickrank = res.data.data
})
proxy.$axios.get('/rank/collectnum').then(res => {
  console.log(res.data.data)
  msg.collectrank = res.data.data
})

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
  // height: 400px;
  // background-color: black;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  position: relative;

  .divider {
    position: absolute;
    top: 0;
    height: 100%;
  }
}

.left {
  width: 40%;
  background-color: white;

  .n-h2 {
    display: flex;
    align-items: center;
    margin-left: 5%;
  }

}

.right {
  width: 40%;
  // height: 200px;
  background-color: white;

  .n-h2 {
    display: flex;
    align-items: center;
    margin-left: 5%;
  }
}
</style>
