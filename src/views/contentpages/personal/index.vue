<template>
  <div>
   <n-layout has-sider>
      <n-layout-sider content-style="padding: 24px;">
        <n-menu :options="menuOptions" default-value="personalmsg"/>
      </n-layout-sider>
      <n-layout>
        <n-layout-content content-style="padding: 24px;">
            <router-view  />
        </n-layout-content>
    </n-layout>
    </n-layout>
  </div>
</template>

<script setup>
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  PersonOutline as userIcon,
  BookOutline as shelfIcon
} from '@vicons/ionicons5'

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'setpersonal'
        }
      },
      { default: () => '个人信息' }
    ),
    key: 'personalmsg',
    icon: renderIcon(userIcon)
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'bookshelf'
        }
      },
      { default: () => '书架' }
    ),
    key: 'bookshelf',
    icon: renderIcon(shelfIcon)
  }
]
</script>
<style scoped lang='scss'>

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

// .n-layout-content {
//   background: rgba(128, 128, 128, 0.4);
// }
</style>
