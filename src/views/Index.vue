<template>
  <div class="main">
    <n-layout>
      <n-layout-header>
        <layoutheader></layoutheader>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view ></router-view>
      </n-layout-content>
      <n-layout-footer>
        <n-gradient-text @click="egg" :gradient="{
          deg: 180,
          from: '#18A058FF',
          to: '#5898a6'
        }">
          MapleleafReading 1.0 ·Made by Sick
        </n-gradient-text>
      </n-layout-footer>
    </n-layout>
  </div>

  <n-modal v-model:show="showModal">
    <n-card style="width: 600px" title="如果想隐藏一棵树" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-empty description="你什么也找不到" @click="egg1" v-if="showdetail"></n-empty>
      <n-collapse v-else>
        <n-collapse-item title="好奇怪喔" name="1">
          <div>{{ eggmsg.msg }}</div>
        </n-collapse-item>
      </n-collapse>
      <template #footer>
        森林就是绝佳的地点
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref } from 'vue'
import layoutheader from '@/components/layout/layoutheader.vue'
import eggmsg from '../assets/egg.json'
const showModal = ref(false)
const showdetail = ref(true)
// egg
let timer = null
const waitTime = 200 // 该时间间隔内点击才算连续点击（单位：ms）
let lastTime = new Date().getTime() // 上次点击时间
let count = 0 // 连续点击次数
function myeaster (e) {
  const currentTime = new Date().getTime()
  // 计算两次相连的点击时间间隔
  count = (currentTime - lastTime) < waitTime ? count + 1 : 1
  lastTime = new Date().getTime()
  clearTimeout(timer)
  timer = setTimeout(function () {
    clearTimeout(timer)
    // 处理点击事件
    // console.log(count)
    if (count > 4) {
      // 连续点击五次或者五次以上的点击事件
      // console.log('点击超过4次了')
      // showModal.value = true
      e.value = !e.value
    }
  }, waitTime + 10)
}
const egg = () => {
  myeaster(showModal)
}
const egg1 = () => {
  myeaster(showdetail)
}
</script>
<style scoped lang="scss">

.n-layout-header {
  // background: rgba(128, 128, 128, 0.2);
   background-color: rgba(241,241,242,0.5)
}

.n-layout-content {
  // background: rgba(128, 128, 128, 0.4);
  background: rgba(226,228,232,0.8);
}

.n-layout-footer {
  margin: 2% 0;
  text-align: center;
  background-color: white;
}
</style>
