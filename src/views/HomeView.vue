<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header height="80px">
        <el-row :gutter="20">
          <!-- 标题 -->
          <el-col :span="22">
            <h1 class="title">后台管理系统</h1>
          </el-col>
          <!-- 退出按钮 -->
          <el-col :span="2">
            <el-button
              class="clo-btn"
              link
              type="primary"
              @click="removeToken"
              
            >
              退出登录
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  setup(){
    const router = useRouter()
    const route = useRoute()
    //查看路由信息中meta是否要展示
    const list = router.getRoutes().filter(v=>v.meta.isShow)

    //退出登录按钮
    const removeToken=()=>{
      localStorage.removeItem('token')
      router.push('/login')
    }
    
    return {
      list,
      active:route.path,
      removeToken
    }
  }
});
</script>

<style lang="scss" scoped>
.el-header{
  background-color: #545c64;
  color: white;

  .title{
    height: 80px;
    line-height: 80px;
    letter-spacing: 10px;
  }
}

.el-menu{
  height: calc(100vh - 80px);
}

.clo-btn{
  color: white;
  height: 80px;
  line-height: 80px;
}

</style>
