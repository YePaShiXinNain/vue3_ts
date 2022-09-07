<template>
  <!-- 添加角色部分 -->
  <el-form :inline="true" class="add-role-form">
    <el-form-item>
      <el-button type="primary" plain @click="addRole">添加角色</el-button>
    </el-form-item>
    <el-form-item>
      <el-input v-model="addRoleOfName" placeholder="请输入要添加的角色名" style="width:400px;"></el-input>
    </el-form-item>
</el-form>
  <!-- 表格展示部分 -->
  <div class="form-box">
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="changeRole(scope.row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 修改权限部分 -->
  <el-dialog v-model="editAuthority.isShow" title="编辑权限">
    <el-tree
      ref="treeRef"
      :data="authorityList"
      accordion
      show-checkbox
      node-key="roleId"
      :check-strictly="true"
      :default-checked-keys="editAuthority.authority"
      :props="{
        children: 'roleList',
        label: 'name'
      }"
    />
    <br><br>
    <el-button type="primary" @click="changeAuthority">确定修改</el-button>
    <el-button @click="editAuthority.isShow=false">取消修改</el-button>
  </el-dialog>
</template>

<script lang="ts">
import { getRoleList, getAuthorityList } from '@/request/api'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { InitData, RoleInt } from '@/type/role';

export default defineComponent({
  name:'RoleView',
  setup () {

    //实例化数据
    const data=reactive(new InitData())

    //获取数据
    const getRole=()=>{
      getRoleList().then(res=>data.roleList=res.data)
    }
    const getAuthority=()=>{
      getAuthorityList().then(res=>{data.authorityList=res.data})
    }
    onMounted(()=>{
      getRole()
      getAuthority()
    })

    //添加角色按钮
    const addRole=()=>{
      if(data.addRoleOfName){
        data.roleList.push({
          roleId:data.roleList.length+1,
          roleName:data.addRoleOfName,
          authority:[]
        })
      }
      data.addRoleOfName=''
    }

    //修改权限按钮
    const changeRole=(row:RoleInt)=>{
      data.editAuthority.isShow=true
      data.editAuthority.authority=row.authority
      data.editAuthority.roleId=row.roleId
    }

    //确认修改权限按钮
    const changeAuthority=()=>{
      //!这个地方总感觉有问题，最好还是把选好的数据发给后台，然后调用接口
      data.roleList.forEach(value=>{
        if(value.roleId===data.editAuthority.roleId){
          value.authority=data.treeRef.getCheckedKeys().sort((a:number,b:number)=>a-b)
        }
      })
      console.log(data.treeRef.getCheckedKeys().sort((a:number,b:number)=>a-b));
      
      //data.editAuthority.isShow=false
    }



    return {
      ...toRefs(data),
      addRole,
      changeRole,
      changeAuthority
    }
  }
})
</script>

<style lang="scss" scoped>

</style>