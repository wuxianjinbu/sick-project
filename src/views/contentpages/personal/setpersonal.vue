<template>
  <div v-title :data-title="usermsg.username+'的个人信息'">
    <n-layout embedded content-style="padding: 24px">
        <n-card content-style="display: flex;justify-content:space-evenly;align-items:flex-end;width:70%;margin:0 auto;">
            <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="auto">
                <n-form-item label="昵称" path="user.username">
                    <n-input placeholder="输入姓名" v-model:value="formValue.user.username"/>
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" attr-type="button" @click="handleValidateClick">
                        保存修改
                    </n-button>
                </n-form-item>
            </n-form>
            <div><n-avatar round :size="100" :src="previewImageUrl" />
                <n-upload :action="uploadurl" @finish="handleFinish" :max="1">
                    <n-button>上传头像</n-button>
                </n-upload>
            </div>
        </n-card>
    </n-layout>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, inject } from 'vue'
import { useMessage } from 'naive-ui'
// proxy使用axios
const { proxy } = getCurrentInstance()
const url = ref(proxy.$url)
const uploadurl = url.value + '/setpersonal'
// 注入组件刷新的方法
const reload = inject('reload')
const message = useMessage()
const usermsg = localStorage.getExpire('user')
console.log(usermsg)
// 个人信息数据
const formValue = ref({
  user: {
    userphone: '',
    username: '',
    useravator: '',
    useravatororigin: ''
  }

})
formValue.value.user.userphone = usermsg.userphone
formValue.value.user.username = usermsg.username
formValue.value.user.useravator = usermsg.useravator
formValue.value.user.useravatororigin = usermsg.useravator
// 验证
const formRef = ref(null)
const rules = {
  user: {
    username: {
      required: true,
      message: '请输入昵称',
      trigger: ['input', 'blur']
    }
  }
}

// 头像预览图
const previewImageUrl = ref('')
previewImageUrl.value = url.value + usermsg.useravator
// const message = useMessage()
const handleFinish = ({ file, event }) => {
  console.log(event)
  console.log(file)
  console.log(JSON.parse((event?.target).response))
  const msg = JSON.parse((event?.target).response)
  previewImageUrl.value = url.value + '/images/useravator/' + msg.imgName
  formValue.value.user.useravator = '/images/useravator/' + msg.imgName
}

// 保存修改提交
const handleValidateClick = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      proxy.$axios.post('/setpersonal/savechange', { data: formValue.value }).then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          message.success(res.data.msg)
          reload()
        } else {
          message.error('修改失败')
        }
      })
    } else {
      message.error('请按要求修改')
    }
  })
}
</script>
<style scoped lang='scss'></style>
