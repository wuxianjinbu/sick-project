<template>
  <div class="main">
    <div class="logo" @click="indexjump">
      <img src="@/assets/reading.png" alt="" style="width: 10%;">
      <n-gradient-text :size="25" :gradient="{
        deg: 180,
        from: '#18A058FF',
        to: '#5898a6'
      }">
        READING
      </n-gradient-text>
    </div>

    <div class="tabs">
      <n-tabs default-value="ebookindex" @update:value="handleswitch" :value="tabvalue" >
        <n-tab name="ebookindex" tab="首页" display-directive="show">
        </n-tab>
        <n-tab name="stack" tab="书库" display-directive="show">
        </n-tab>
        <n-tab name="rank" tab="排行榜" display-directive="show">
        </n-tab>
        <n-tab name="actions" tab="动态" display-directive="show">
        </n-tab>
      </n-tabs>
    </div>

    <div>
      <n-input round placeholder="输入作者名或者书名" style="border:1px solid #18A058FF;" v-model:value="searchvalue">
        <template #suffix>
          <n-icon :component="Search" class="searchicon" @click="searchbook" />
        </template>
      </n-input>
    </div>

    <n-dropdown :options="options" @select="handlepersonal" :show-arrow="true" v-if="islogin">
      <div class="avatar">
        <n-avatar round size="large" :src="avatarurl"/>
        <span style="font-size: larger;">{{ username }}</span>
      </div>
    </n-dropdown>
    <div v-else>
      <n-space>
        <n-button text @click="showModal('signin')">登录</n-button>
        <span>|</span>
        <n-button text @click="showModal('signup')">注册</n-button>
      </n-space>
    </div>
  </div>
  <n-modal v-model:show="ishowmoadl" style="width: 50%;">
    <n-card>
      <loginregist :modaldefault="modaldefault" @handleclose="handleclose"></loginregist>
    </n-card>
  </n-modal>
</template>

<script setup>
import loginregist from '../loginregist.vue'
import { ref, watch, h, inject, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
// 引入图标
import { NIcon } from 'naive-ui'
import {
  Search,
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

// 注入组件刷新的方法
const reload = inject('reload')

// proxy使用axios
const { proxy } = getCurrentInstance()
// 本地头像
// import avatarurl from '@/assets/avatar.png'

// 头像下拉菜单图标
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
// 创建路由对象
const router = useRouter()
// 头像下拉菜单 选项
const options = [
  {
    label: '个人中心',
    key: 'personal',
    icon: renderIcon(UserIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }

]
// 头像下拉菜单回调函数
const handlepersonal = (arg) => {
  console.log(arg)
  if (arg === 'logout') {
    islogin.value = false
    localStorage.removeItem('user')
    // 退出后 给路由值赋为 首页
    sessionStorage.setItem('ebookRouter', 'ebookindex')
    reload()
  } else if (arg === 'personal') {
    tabvalue.value = 'setpersonal'
  }
}
// 监听头部标签切换
const tabvalue = ref('ebookindex')
// 首次进入页面 sessionstorage中不存在缓存的值 让路由初始值指向首页
if (sessionStorage.getItem('ebookRouter')) tabvalue.value = sessionStorage.getItem('ebookRouter')
watch(tabvalue, (ov) => {
  // console.log(ov, nv)
  sessionStorage.setItem('ebookRouter', ov)
  router.push({ path: '/' + ov })
}, {
  immediate: true
})
// 切换标签回调函数
const handleswitch = (tabname) => {
  tabvalue.value = tabname
}

// 登录状态
const islogin = ref(false)
// 头像图片地址
const avatarurl = ref('')
// 用户名
const username = ref('')
const usermsg = localStorage.getExpire('user')
// console.log(usermsg)
if (usermsg) {
  islogin.value = true
  proxy.$axios.post('/setpersonal/keeplogin', { data: usermsg.userphone }).then(res => {
    // console.log(res.data)
    localStorage.setExpire('user', res.data.data, 1000 * 60 * 60 * 24)
    avatarurl.value = proxy.$url + res.data.data.useravator
    username.value = res.data.data.username
  })
} else {
  islogin.value = false
}

// 子组件传回布尔值关闭模态框
const handleclose = (payload) => {
  islogin.value = payload.islogin
  ishowmoadl.value = payload.ishowmoadl
}
// 登录注册模态框
const ishowmoadl = ref(false)
// 模态框中标签页初始值
const modaldefault = ref('')
// 显示模态框、赋值
const showModal = (arg) => {
  ishowmoadl.value = true
  modaldefault.value = arg
}

// 搜索框
const searchvalue = ref('')

// 搜素事件
const searchbook = () => {
  if (searchvalue.value === '') {
    return false
  } else {
    const { href } = router.resolve({
      name: 'searchres',
      query: {
        search: searchvalue.value
      }
    })
    window.open(href, '_blank')
  }
}

// 图标跳转首页
const indexjump = () => {
  tabvalue.value = 'ebookindex'
}
</script>

<style scoped lang='scss'>
.main {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 2% 0;
}

.tabs {
  // background-color: aqua;
  width: 30%;
}

.searchicon {
  cursor: pointer;

  :hover {
    color: #5898a6;
  }
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  // background-color: aqua;
  width: 12%;
}

.logo {
  display: flex;
  align-items: center;
  width: 30%;
  cursor: pointer;
}
</style>
