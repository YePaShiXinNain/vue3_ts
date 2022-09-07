//商品接口
export interface GoodsListInt{
  userId:number,  //商品归属用户id
  id:number,  //商品id
  title:string,  //标题
  introduce:string  //详情
}
//商品查询接口
interface selectDataInt{
  title:string,  //标题
  introduce:string,  //详情
  page:number,  //页码
  count:number,  //总条数
  pagesize:number,  //一页显示几条
}

//实例化
export class InitData{
  goodsList:GoodsListInt[]=[]
  selectData:selectDataInt={
    title:'',
    introduce:'',
    page:1,
    count:0,
    pagesize:0,
  }

}