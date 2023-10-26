<template>
  <div class="main" v-title :data-title="bookname">
    <div class="background" :style="msg.backstyle">
      <div class="menu" @click="openmenu">
        <n-icon size="40">
          <Menu />
        </n-icon>
      </div>

      <div class="readbox" :style="msg.mystyle">
        <div class="title">
          <n-h1 :style="msg.colorstyle">{{bookname}}</n-h1>
        </div>
        <n-scrollbar style="max-height: 85vh" trigger="hover">
          <div class="content" v-for="i,index in showdata" :key="index">
            <n-back-top :right="150" id="backtop"/>
            <n-h2 :style="msg.colorstyle">{{i.chapter}}--{{ i.title }}</n-h2>
            <n-p v-for="c, index in i.content" :key="index" :style="msg.fontstyle">{{ c }}</n-p>
          </div>
        </n-scrollbar>
      </div>

    </div>

    <!-- 自定义设置 -->
    <n-popconfirm positive-text="保存修改" :negative-text="null" :show-icon="false" @positive-click="savechange">
      <template #trigger>
        <n-button strong circle class="settingbutton">
          <n-icon size="40">
            <Settings />
          </n-icon>
        </n-button>
      </template>
      <div class="settingbox">
        <span>字体大小:</span>
        <!-- <n-slider v-model:value="fontsize" @update:value="changefontsize"  max="100" step="1"></n-slider> -->
        <input type="range" style="width: 100%;" v-model="fontsize" @change="changefontsize" min="16" max="100" step="1">
        <p>字体颜色:</p>
        <input type="color" v-model="fontcolor" @change="changefontcolor"><br>
        <span>背景透明度:</span>
        <n-slider v-model:value="backopacity" @update:value="changebackopacity" max="1" step="0.01"></n-slider>
        <!-- <input type="range" style="width: 100%;" v-model="backopacity" @input="changebackopacity" max="1" step="0.01"> -->
        <span>背景模糊:</span>
        <n-slider v-model:value="backfilter" @update:value="changebackfilter" max="10" step="1"></n-slider>
        <!-- <input type="range" style="width: 100%;" v-model="backfilter" @input="changebackfilter" max="10" step="1"> -->
        <n-tabs type="line" animated>
          <n-tab-pane name="纯色" tab="纯色">
            使用纯色背景：
            <input type="color" v-model="backcolor" @input="changebackcolor">
          </n-tab-pane>
          <n-tab-pane name="背景图" tab="背景图">
            <n-space>
              <n-image style="cursor: pointer;" v-for="i, index in prebacktemp" :key="index" width="100" :src="i"
                preview-disabled @click="changebackurl(i)" />
            </n-space>
          </n-tab-pane>
        </n-tabs>
      </div>
    </n-popconfirm>

    <n-drawer v-model:show="menuactive" :width="502" placement="left">
      <n-drawer-content :title="bookname+'--目录'">
        <n-menu  :options="menuOptions" @update:value="handleUpdateValue" :value="menuvalue" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { ref, reactive, getCurrentInstance } from 'vue'
import { Settings, Menu } from '@vicons/ionicons5'
import { useRoute } from 'vue-router'

// 创建路由对象
const route = useRoute()
// 拿到路由传值bookid
const bookid = route.query.bookid
const bookname = route.query.bookname
const clickindex = route.query.chapter
// 抽屉中菜单所在的位置
const menuvalue = ref()
menuvalue.value = Number(clickindex)
const message = useMessage()
// proxy使用axios
const { proxy } = getCurrentInstance()
const url = ref(proxy.$url)
// 获取用户信息
const usermsg = localStorage.getExpire('user')
let userphone = ''
if (usermsg) {
  userphone = usermsg.userphone
}
// 定义本页数据
const msg = reactive({
  fontstyle: {
    fontSize: '16px',
    color: '#000000'
  },
  colorstyle: {
    color: '#000000'
  },
  mystyle: {
    background: 'rgba(255, 255, 255, 0)'
  },
  backstyle: {
    background: ''
  },
  content: []
})

const showdata = reactive([])
// 获取图书章节内容信息
proxy.$axios.get('/book/bookdetail/' + bookid).then(res => {
  // console.log(res)
  msg.content = res.data.content
  showdata.push(msg.content[clickindex])
  res.data.content.forEach((e, idx) => {
    menuOptions.push({ label: e.chapter + '　' + e.title, key: idx })
  })
})

const handleUpdateValue = (value) => {
  if (document.getElementById('backtop')) {
    document.getElementById('backtop').click()
  }
  menuvalue.value = value
  showdata.length = 0
  showdata.push(msg.content[value])
  menuactive.value = false
}

// 进入页面获取用户设置
function getusersetting (userphone) {
  proxy.$axios.get('/reader/personsetting/' + userphone).then(res => {
    const setting = res.data.data
    msg.fontstyle.fontSize = setting.fontsize + 'px'
    msg.fontstyle.color = setting.color
    msg.colorstyle.color = setting.color
    msg.mystyle.background = 'rgba(255, 255, 255, ' + setting.backopacity + ')'
    msg.mystyle.backdropFilter = 'blur(' + setting.backfilter + 'px)'
    msg.backstyle.background = setting.background

    fontsize.value = setting.fontsize
    fontcolor.value = setting.color
    backopacity.value = setting.backopacity
    backfilter.value = setting.backfilter
  })
}
if (usermsg) {
  getusersetting(userphone)
}
// 定义字体大小
const fontsize = ref(16)
// 修改字体大小
const changefontsize = () => {
  msg.fontstyle.fontSize = fontsize.value + 'px'
}
// 定义字体颜色
const fontcolor = ref('#000000')
// 修改字体颜色
const changefontcolor = () => {
  msg.fontstyle.color = fontcolor.value
  msg.colorstyle.color = fontcolor.value
}
// 预设背景 静态资源
const prebackurl = reactive([
  'images/reader/wallpaper1.png',
  'images/reader/wallpaper2.png',
  'images/reader/wallpaper3.png',
  'images/reader/wallpaper4.png'
])
const prebacktemp = reactive([])
prebackurl.forEach(e => {
  // prebacktemp.push('http://localhost:5050/' + e)
  // prebacktemp.push('http://47.108.116.100:8889/' + e)
  prebacktemp.push(url.value + '/' + e)
})

// 定义背景透明度
const backopacity = ref(0)
// 滑动更改透明度
const changebackopacity = () => {
  msg.mystyle.background = 'rgba(255, 255, 255, ' + backopacity.value + ')'
}
// 定义背景模糊单选
const backfilter = ref(0)
// 背景模糊
const changebackfilter = () => {
  msg.mystyle.backdropFilter = 'blur(' + backfilter.value + 'px)'
}

// 定义背景颜色
const backcolor = ref('#000000')
// 颜色选择器
const changebackcolor = () => {
  console.log(backcolor.value)
  msg.backstyle.background = backcolor.value
}
// 修改背景图
const changebackurl = (i) => {
  msg.backstyle.background = 'url(' + i + ')'
}
// 保存修改的样式
const savechange = () => {
  if (usermsg) {
    const submitdata = {
      userphone: userphone,
      fontsize: fontsize.value,
      color: fontcolor.value,
      backopacity: backopacity.value,
      backfilter: backfilter.value,
      background: msg.backstyle.background
    }
    proxy.$axios.post('/reader/savesetting', { data: submitdata }).then(res => {
      console.log(res)
      message.success(res.data.msg)
    })
  } else {
    message.warning('请先登录！')
  }
}
// 抽屉
const menuactive = ref(false)
const openmenu = () => {
  menuactive.value = true
}
const menuOptions = reactive([
])
</script>
<style scoped lang='scss'>
.main {
  height: 100vh;
  width: 100%;
  background-color: antiquewhite;
  display: flex;
  align-items: center;

  .background {
    width: 85%;
    height: 95vh;
    margin: 0 auto;
    // background: url('../assets/wallpaper1.png');
    background: #FFFFFF;
    background-size: cover !important;
    background-position: center !important;
    // background-size: cover;
    position: relative;

    .readbox {
      width: 100%;
      max-height: 95vh;
      position: absolute;
      // background: rgba(255, 255, 255, 0.3);

      .title {
        height: 10vh;
        margin-left: 5%;
        line-height: 10vh;

        .n-h1 {
          font-weight: bolder;
        }
      }

      .content {
        width: 80%;
        margin: 0 auto;
        padding-bottom: 2%;
        // height: 85vh;
        // overflow: auto;
        .n-p{
          text-indent: 2em;
        }
      }
    }

  }
}

.settingbutton {
  width: 50px;
  height: 50px;
  // background-color: white;
  position: absolute;
  right: 3%;
  bottom: 5%;
}

.settingbox {
  width: 350px;
  height: 60vh;
  // background-color: aqua;
}

.menu {
  width: 40px;
  // height: 40px;
  // background-color: aqua;
  position: absolute;
  left: -50px;
  cursor: pointer;
}
</style>
