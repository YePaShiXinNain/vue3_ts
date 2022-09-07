<template>
  <div class="login">
    <div class="form-cls">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="70px"
      >
        <!-- 标题 -->
        <h2 class="loginTitle">后台管理系统</h2>
        <!-- 用户名输入框 -->
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码:" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button class="login-btn" @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { InitData } from "@/type/login";
import { FormInstance } from "element-plus";
import {defineComponent, reactive, ref, toRefs} from "vue";
import {login} from "@/request/api";
import {useRouter} from "vue-router";


export default defineComponent({
  name: 'LoginView',
  setup () {

    //定义router，跳转页面时使用,效果类似$router
    const router=useRouter()

    // 表单输入规则
    const rules = {
      username: [
        {
          required: true,  //是否必须字段
          message: "请输入用户名",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 8,   // 最大字符数
          message: "用户名长度需要在3-8个字符之间",  // 触发的提示信息
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,  //是否必须字段
          message: "请输入密码",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 8,   // 最大字符数
          message: "密码长度需要在3-8个字符之间",  // 触发的提示信息
          trigger: "blur"
        }
      ]
    }

    //实例化登陆数据
    const data = reactive(new InitData())

    //登录按钮传递参数的约束
    const ruleFormRef = ref<FormInstance>()

    //登录按钮
    //admin   123456
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) {
        return
      }
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            //登录成功回调
            localStorage.setItem("token", res.data.token)
            router.push('/')
          }).catch(err=>{
            Promise.reject(err)
          })
        } else {
          //登录失败回调
          console.log('error')
          return false
        }
      })
    }

    //重置登录信息
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) {
        return
      }
      formEl.resetFields()
    }


    return {
      ...toRefs(data),
      rules,
      ruleFormRef,
      resetForm,
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>
  .login{
    width: 100%;
    height: 100vh;
    background: url(@/assets/bg.jpg)
  }

  .form-cls{
    padding: 50px;
    width: 400px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.3);
    position: relative;
    top:25%;
    border-radius: 40px;

    .loginTitle{
      text-align: center;
      margin-bottom: 20px;
    }

      .login-btn{
        width: 48%;
    }
  }

</style>