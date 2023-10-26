<template>
  <div v-title data-title="动态"></div>
  <div style="width: 85%;margin: 0 auto;margin-bottom: 2%;">
    <n-card>
      <div>
        <n-input maxlength="300" show-count type="textarea" rows="2" v-model:value="pubContent"></n-input>
      </div>
      <div>
        <div class="optionBox">
          <n-popover placement="bottom-start" trigger="click">
            <template #trigger>
              <div class="emoji" >
                <n-icon size="30">
                  <MoodSmile />
                </n-icon>
              </div>
            </template>
            <div>
              <EmojiPicker :native="true" :hide-search="false"
               :disable-skin-tones="true" :disable-sticky-group-names="true"
                @select="onSelectEmoji"></EmojiPicker>
            </div>
          </n-popover>
          <div >
            <div class="images">
              <n-icon size="30">
                <ImageOutline />
              </n-icon>
              <input multiple title="上传图片"  type="file" @change="previewImg" ref="img" class="upload">
            </div>
          </div>
        </div>
        <n-image-group show-toolbar-tooltip>
                <n-space>
                  <div  v-for="i, idx in imgSrc" :key="idx" class="uploadImgPre" @click="removePre(idx)">
                    <n-image  object-fit="cover"  @click.stop="removePre1" width="120" height="120"
                    :src="i" fallback-src="../../../assets/loadingFail.jpg"/>
                  </div>

                </n-space>
        </n-image-group>
        <div class="pubButton"><n-a @click="submitAction">发表</n-a></div>
      </div>
    </n-card>
  </div>
  <div class="main">
    <div class="right">
      <n-card title="近期活跃">
        <div class="cardinfo" v-for="i in 5" :key="i">
          <div class="header">
            <!-- <n-avatar round :size="30" src="http://localhost:5050/images/useravator/f61029d65c4692ff1958ba811.png"></n-avatar> -->
            <n-avatar round :size="30" src="http://8.130.112.239:8889/images/useravator/f61029d65c4692ff1958ba811.png"></n-avatar>
            <!-- <n-avatar round :size="30" src="http://47.108.116.100/:8889/images/useravator/f61029d65c4692ff1958ba811.png"></n-avatar> -->
            <div class="name">Oker</div>
          </div>
          <n-gradient-text class="time" type="info">
            {{ time }}
          </n-gradient-text>时活跃
          <n-divider></n-divider>
        </div>
      </n-card>
    </div>
    <div class="left">
      <n-card class="actionbox" v-for="i, idx in 5" :key="idx">
        <!-- 加载骨架 -->
        <div v-if="false" class="hearder-skeleton">
          <n-skeleton round width="40px" height="40px" />
          <n-skeleton text width="40px" class="name" />
        </div>

        <template v-else>
          <div class="cardHeader">
            <!-- <n-avatar round :size="40" src="http://localhost:5050/images/useravator/ec09cf4df4a3ffc27652f5900.jpg" /> -->
            <n-avatar round :size="40" src="http://8.130.112.239:8889/images/useravator/ec09cf4df4a3ffc27652f5900.jpg" />
            <!-- <n-avatar round :size="40" src="http://47.108.116.100/:8889/images/useravator/ec09cf4df4a3ffc27652f5900.jpg" /> -->
            <div class="name">Sea.</div>
            <div class="time">
              <div>{{ time }}</div>
            </div>
          </div>

        </template>

        <!-- 加载骨架 -->
        <n-skeleton v-if="false" text height="90px" style="margin-top: 2%;" />

        <template v-else>
          <div class="content">
            <div class="text">this is content test any word could works</div>
            <div>
              <n-image-group show-toolbar-tooltip>
                <n-space style="justify-content: center !important;">
                  <n-image class="image" object-fit="cover" v-for="i, idx in imgs" :key="idx" width="200" height="200"
                    :src="i.img" fallback-src="../../../assets/loadingFail.jpg" />
                </n-space>
              </n-image-group>
            </div>

          </div>
          <n-divider />
          <div class="review">
            <div v-for="i in 3" :key="i">
              <div class="hader">
                <!-- <n-avatar round :size="30" src="http://localhost:5050/images/useravator/f61029d65c4692ff1958ba811.png"></n-avatar> -->
                <n-avatar round :size="30" src="http://8.130.112.239:8889/images/useravator/f61029d65c4692ff1958ba811.png"></n-avatar>
                <!-- <n-avatar round :size="30" src="http://47.108.116.100/:8889/images/useravator/f61029d65c4692ff1958ba811.png"></n-avatar> -->
                <div class="name">Oker</div>
                <div class="time">{{ time }}</div>
              </div>
              <div class="content">
                1241414
              </div>
              <n-divider style="margin: 0;"></n-divider>
            </div>
          </div>
        </template>
      </n-card>
    </div>

  </div>
</template>

<script setup>
import { MoodSmile } from '@vicons/tabler'
import { ImageOutline } from '@vicons/ionicons5'
import { ref, reactive, getCurrentInstance } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
// proxy使用axios
const { proxy } = getCurrentInstance()
const url = ref(proxy.$url)

const imgs = reactive([
  { img: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
  { img: url.value + '/images/ebook/大脑修复术.jpg' },
  { img: url.value + '/images/ebook/上帝的骰子.jpg' },
  { img: url.value + '/images/reader/back1.jpg' },
  { img: url.value + '/images/reader/back5.jpg' },
  { img: url.value + '/images/reader/back2.jpg' },
  { img: url.value + '/images/reader/wallpaper1.png' },
  { img: url.value + '/images/reader/wallpaper2.png' },
  { img: url.value + '/images/reader/wallpaper3.png' }
])

// 年月日时间方法
const getDateString = (date) => {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  // const second = date.getSeconds().toString().padStart(2, '0')
  // return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return `${year}-${month}-${day} ${hour}:${minute}`
}
const time = getDateString(new Date())

const imgSrc = ref([])
const img = ref(null)
const previewImg = () => {
  const imgNum = img.value.files.length
  for (let i = 0; i < imgNum; i++) {
    const f = new FileReader()
    f.readAsDataURL(img.value.files[i])
    f.onload = function () {
      imgSrc.value.push(f.result)
    }
  }
}
const pubContent = ref('')
const onSelectEmoji = (emoji) => {
  pubContent.value = pubContent.value + emoji.i
}
const submitAction = () => {
  console.log(pubContent.value)
  console.log(img.value.files)
}

const removePre1 = () => {
  return false
}

const removePre = (idx) => {
  imgSrc.value.splice(idx, 1)
  const dt = new DataTransfer()
  for (let i = 0; i < img.value.files.length; i++) {
    const file = img.value.files[i]
    if (idx !== i) {
      dt.items.add(file)
    }
  }
  img.value.files = dt.files
}
</script>
<style scoped lang='scss'>
.optionBox {
  display: flex;
  margin-top: 1%;
  .emoji {
    margin-right: 1%;
  }
}

.uploadImgPre{
  position: relative;
}
.uploadImgPre:hover::after{
  content: 'x';
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  background-color: gray;
  cursor: pointer;
}
.pubButton {
  text-align: right;
}
.images{
  width: 30px;
  height: 30px;
}
.upload{
  width: inherit;
  height: inherit;
  position: relative;
  top: -35px;
  opacity: 0;
}
.main {
  // background-color: aqua;
  // overflow: auto; //触发BFC，解决外边距塌陷
  display: flex;
  justify-content: center;

  .left {
    width: 60%;
  }

  .right {
    width: 20%;
    margin-right: 5%;

    .cardinfo {
      text-align: center;

      .header {
        display: flex;
        align-items: center;

        .name {
          margin-left: 2%;
        }
      }

      .time {
        margin-top: 10%;
        display: inline-block;
        color: #B4D9FB;
      }
    }
  }

  .actionbox {
    // margin-left: 5%;
    margin-bottom: 5%;
    // width: 60%;
    // background-color: antiquewhite;
  }
}

.n-card {
  border-radius: 12px;
}

.hearder-skeleton {
  display: flex;
  align-items: center;

  .name {
    margin-left: 2%;
  }
}

.cardHeader {
  display: flex;
  align-items: center;

  .name {
    margin-left: 2%;
    font-size: 1.5rem;
  }

  .time {
    margin-left: auto;
  }
}

.content {
  margin-top: 2%;
  font-size: 1.2rem;

  .text {
    white-space: pre-wrap;
  }

  .time {
    text-align: right;
    font-size: 1rem;
    color: grey;
  }
}

.review {
  // background-color: aqua;
  padding: 0 4%;

  .content {
    margin-top: 1%;
  }

  .hader {
    display: flex;
    align-items: center;
    margin-top: 1%;

    .name {
      margin-left: 1%;
      font-size: 1rem;
    }

    .time {
      margin-left: auto;
      color: rgb(169, 169, 169);
    }
  }
}
</style>
