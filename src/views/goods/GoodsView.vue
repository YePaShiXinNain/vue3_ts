<template>
  <div>
    <!-- 搜索部分 -->
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="名称查询">
          <el-input v-model="selectData.title" placeholder="请输入商品名称的关键字" />
        </el-form-item>
        <el-form-item label="详情查询">
          <el-input v-model="selectData.introduce" placeholder="请输入商品详情的关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格展示部分 -->
    <div class="form-box">
      <el-table :data="splitData.listData" border style="width: 100%">
        <el-table-column prop="id" label="商品编号" width="180" />
        <el-table-column prop="title" label="商品名称" width="180" />
        <el-table-column prop="introduce" label="商品详情" />
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="currentChang"
        @size-change="sizeChang"
        :page-size="selectData.pagesize"
        layout="prev, pager, next"
        :total="selectData.count"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { getGoodsList } from '@/request/api'
import { computed, defineComponent, onMounted, reactive, toRefs, } from 'vue'
import { InitData, GoodsListInt } from '@/type/goods'

export default defineComponent({
  name: 'GoodsView',
  setup () {

    //实例化表格数据
    const data=reactive(new InitData())

    //获取表格数据
    const getGoods=(()=>{
        getGoodsList().then(res=>{
        data.goodsList=res.data
        data.selectData.count=res.data.length
        data.selectData.pagesize=5
      },err=>Promise.reject(err)
      )
    })
    onMounted(()=>{getGoods()})

    //修改data中的页码和第几页
    const currentChang=(page:number)=>{
      data.selectData.page=page
    }
    const sizeChang=(pagesize:number)=>{
      data.selectData.pagesize=pagesize
    }

    //切割后的表格
    const splitData=reactive({
      listData:computed(()=>{
        return data.goodsList.slice(
          (data.selectData.page-1)*data.selectData.pagesize,
          data.selectData.page*data.selectData.pagesize
        )
      })
    })

    //查询按钮
    const onSubmit= async ()=>{
      let arr:GoodsListInt[]=[]
      data.goodsList = await getGoodsList().then(res=>res.data,err=>Promise.reject(err))
      //名称和详情都有
      if (data.selectData.title && data.selectData.introduce) {
        let title=data.goodsList.filter((value)=>value.title.indexOf(data.selectData.title)!==-1)
        let introduce =data.goodsList.filter((value)=>value.introduce.indexOf(data.selectData.introduce)!==-1)
        arr=[...title].filter(value1=>[...introduce].some(value2=>value1.title===value2.title))
      }
      //名称和详情有一个
      else if (data.selectData.title || data.selectData.introduce) {
        if(data.selectData.title){
          arr=data.goodsList.filter((value)=>value.title.indexOf(data.selectData.title)!==-1)
        }else{
          arr=data.goodsList.filter((value)=>value.introduce.indexOf(data.selectData.introduce)!==-1)
        }
      }
      //名称和详情都没有
      else{
        arr=data.goodsList
      }
      data.selectData.introduce=''
      data.selectData.title=''
      data.selectData.count=arr.length
      data.goodsList=arr
    }

    return {
      ...toRefs(data),
      currentChang,
      sizeChang,
      splitData,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>

</style>