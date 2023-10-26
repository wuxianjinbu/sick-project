<template>

  <n-back-top :right="50" />
  <n-message-provider>
    <!-- <n-config-provider :theme-overrides="themeOverrides"> -->
    <!-- <n-scrollbar style="max-height: 100vh" trigger="hover"> -->
    <loading v-if="$store.state.loadingShow"></loading>
    <router-view v-if="isRouterAlive" />

    <!-- </n-scrollbar> -->
    <!-- </n-config-provider> -->
  </n-message-provider>

</template>
<script setup>
import loading from './components/loading.vue'
import { useStore } from 'vuex'
import { nextTick, ref, provide } from 'vue'
// import { useRoute } from 'vue-router'
// 组件刷新
// 创建路由对象
// const route = useRoute()

// const store = useStore()
// console.log(store.state.loadingShow)
// const loadingShow = store.state.loadingShow

const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)

Storage.prototype.setExpire = (key, value, expire) => {
  const obj = {
    data: value,
    time: Date.now(),
    expire: expire
  }
  // localStorage 设置的值不能为对象,转为json字符串
  localStorage.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getExpire = key => {
  let val = localStorage.getItem(key)
  if (!val) {
    return val
  }
  val = JSON.parse(val)
  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key)
    return null
  }
  return val.data
}
// import { NConfigProvider } from 'naive-ui'
// 修改主题配色
// const themeOverrides = {
//   common: {
//     primaryColor: '#5898a6'
//   },
//   Button: {
//     textColor: '#5898a6'
//   },
//   Select: {
//     peers: {
//       InternalSelection: {
//         textColor: '#5898a6'
//       }
//     }
//   }
// }
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
