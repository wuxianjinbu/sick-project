<template>
  <n-tabs class="card-tabs" :default-value="defaultvalue" size="large" animated style="margin: 0 -4px"
    pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
    <!-- 登录 -->
    <n-tab-pane name="signin" tab="登录">
      <n-form ref="signinformRef" :model="signinform" :rules="signinrules">
        <n-form-item-row label="手机号" path="phone">
          <n-input v-model:value="signinform.phone" />
        </n-form-item-row>
        <n-form-item-row  label="密码" path="password">
          <n-input v-model:value="signinform.password" type="password"/>
        </n-form-item-row>
        <n-button type="primary" block secondary strong @click="handlesignin">
        登录
      </n-button>
      </n-form>

    </n-tab-pane>

    <!-- 注册 -->
    <n-tab-pane name="signup"  tab="注册">
      <n-form ref="signupformRef" :model="signupform" :rules="signuprules">
        <n-form-item-row label="电话" path="phone">
          <n-input v-model:value="signupform.phone" />
        </n-form-item-row>
        <n-form-item-row label="昵称" path="username">
          <n-input v-model:value="signupform.username"/>
        </n-form-item-row>
        <n-form-item-row label="密码" path="password">
          <n-input v-model:value="signupform.password" type="password" @input="handlePasswordInput"/>
        </n-form-item-row>
        <n-form-item-row label="重复密码" path="repassword" ref="rPasswordFormItemRef" first>
          <n-input v-model:value="signupform.repassword" type="password"/>
        </n-form-item-row>
      </n-form>
      <n-button type="primary" block secondary strong  @click="handlesignup">
        注册
      </n-button>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { ref, toRefs, getCurrentInstance } from 'vue'
import md5 from 'js-md5'

// proxy使用axios
const { proxy } = getCurrentInstance()
const message = useMessage()
// 取参数
const props = defineProps(
  { modaldefault: String }
)
const msg = toRefs(props)
// 置于不同的标签页
const defaultvalue = ref('signin')
defaultvalue.value = msg.modaldefault.value

// 登录函数
const signinformRef = ref(null)
const emits = defineEmits(['handleclose'])
const handlesignin = () => {
  signinformRef.value?.validate((errors) => {
    if (!errors) {
      const data = JSON.parse(JSON.stringify(signinform.value))
      data.password = md5(data.password)
      proxy.$axios.post('/login', { data: data }).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          message.success(res.data.msg)
          // localStorage.setItem('user' + res.data.userphone, res.data)
          localStorage.setExpire('user', res.data, 1000 * 60 * 60 * 24)
          emits('handleclose', { islogin: true, ishowmoadl: false, usermsg: res.data })
          location.reload()
        } else {
          message.error(res.data.msg)
        }
      })
    } else {
      console.log(errors)
      message.error('请输入！')
    }
  })
}

// 登录表单
const signinform = ref({
  phone: '',
  password: ''
})
// 登录表单验证规则
const signinrules = {
  phone: [
    {
      required: true,
      message: '请输入电话',
      trigger: ['input', 'blur']
    }
    // {
    //   pattern: /^[1][3456789]\d{9}$/,
    //   message: '请输入正确格式的手机号',
    //   trigger: ['input', 'blur']
    // }
  ],
  password: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  }
}

// 注册验证函数
function validatePasswordStartWith (rule, value) {
  return !!signupform.value.password && signupform.value.password.startsWith(value) && signupform.value.password.length >= value.length
}
function validatePasswordSame (rule, value) {
  return value === signupform.value.password
}
// 注册验证规则
const signuprules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: ['input', 'blur']
    }
    // {
    //   pattern: /^[1][3456789]\d{9}$/,
    //   message: '请输入正确格式的手机号',
    //   trigger: ['input', 'blur']
    // }
  ],
  username: [
    {
      required: true,
      message: '请输入昵称',
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}
// 注册表单
const signupform = ref({
  phone: '',
  username: '',
  password: '',
  repassword: ''
})
// 注册函数
const signupformRef = ref(null)
const rPasswordFormItemRef = ref(null)
const handlePasswordInput = () => {
  if (signupform.value.repassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}
const handlesignup = () => {
  signupformRef.value?.validate((errors) => {
    if (!errors) {
      const data = JSON.parse(JSON.stringify(signupform.value))
      data.password = md5(data.password)
      data.repassword = md5(data.repassword)
      proxy.$axios.post('/register', { data: data }).then(res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          message.success(res.data.msg)
          emits('handleclose', { ishowmoadl: false })
        } else {
          message.success(res.data.msg)
        }
      })
    } else {
      // console.log(errors)
      message.error('请输入正确的信息')
    }
  })
}
</script>
<style scoped lang='scss'></style>
