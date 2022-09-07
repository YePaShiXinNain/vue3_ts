<template>
  <!-- 筛选部分 -->
  <div class="select-box">
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="角色筛选">
        <el-select v-model="selectData.role" class="m-2" placeholder="Select">
          <el-option label="全部" :value="0"/>
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <!-- 表格展示部分 -->
  <div class="form-box">
    <el-table :data="userList" border style="width: 100%">
      <!-- id栏 -->
      <el-table-column prop="id" label="ID" width="180" />
      <!-- 姓名栏 -->
      <el-table-column prop="nickName" label="姓名" width="180" />
      <!-- 角色栏 -->
      <el-table-column prop="introduce" label="角色">
        <!-- 这里有个插槽,可以获取这一行（id-姓名-角色）的值，v-for需要循环这里的值 -->
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            :key="item.role"
            plain
            size="small"
          >
            {{item.roleName}}
          </el-button>
        </template>
      </el-table-column>
      <!-- 编辑栏 -->
      <el-table-column prop="introduce" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="editUserInfo(scope.row)"
          >
          编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 编辑弹出框 -->
  <el-dialog v-model="editUser.isShow" title="编辑信息">
    <el-form :model="editUser">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="editUser.nickName" autocomplete="off" style="width: 500px" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="editUser.role" placeholder="请选择角色" style="width: 500px">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateEditInfo">确定</el-button>
        <el-button type="primary" plain @click="editUser.isShow=false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getUserList, getRoleList } from "@/request/api";
import { InitData, UserInt } from '@/type/user';

export default defineComponent({
  name: 'UserView',
  setup () {

    //实例化数据
    const data=reactive(new InitData())

    //获取数据
    const getRole=()=>{
      getRoleList().then(res=>data.roleList=res.data).catch(err=>Promise.reject(err))
    }
    const getUser=()=>{
      getUserList().then(res=>data.userList=res.data).catch(err=>Promise.reject(err))
    }
    onMounted(()=>{
      getRole()
      getUser()
    })

    //权限筛选监视
    watch(()=>data.selectData.role,async(newValue:number)=>{
      data.userList=await getUserList().then(res=>res.data).catch(err=>Promise.reject(err))
      if(newValue!==0){
        data.userList=data.userList.filter(value=>{
          return value.role.find(item=>item.role===newValue)
        })
      }
    })

    //展示编辑弹出框
    const editUserInfo=(row:UserInt)=>{
      data.editUser={
        isShow:true,
        id:row.id,
        nickName:row.nickName,
        userName:row.userName,
        role:row.role.map((value:any)=>value.role||value.roleId)
      }
    }

    //弹出框确定按钮
    const updateEditInfo=()=>{
      let obj:any=data.userList.find(value=>value.id===data.editUser.id)
      obj.nickName=data.editUser.nickName
      obj.role=data.roleList.filter(value=>data.editUser.role.indexOf(value.roleId)!==-1)
      data.userList.forEach((item,index)=>{
        if(item.id===obj.id){
          data.userList[index]=obj
        }
      })
    }


    return {
      ...toRefs(data),
      editUserInfo,
      updateEditInfo,
    }
  }
})
</script>

<style lang="scss" scoped>

</style>