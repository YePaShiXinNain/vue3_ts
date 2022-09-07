//用户列表接口
interface RoleInt{
  role:number,  //角色权限
  roleName:string  //权限名
}
export interface UserInt{
  id:number,  //用户id
  nickName:string,  //用户别名
  role:RoleInt[],  //用户权限
  userName:string  //用户名
}
//角色列表接口
interface RoleListInt{
  authority:number[],  //具体权限
  roleId:number,  //权限id
  roleName:string  //权限名称
}
//筛选角色接口
interface SelectDataInt{
  role:number,  //用户权限搜索
}
//编辑框接口
interface EditUserInt{
  isShow:boolean,  //是否显示
  id:number,  //用户id
  nickName:string,  //用户别名
  role:number[],  //用户权限
  userName:string  //用户名
}

//实例化
export class InitData{
  userList:UserInt[]=[]
  selectData:SelectDataInt={
    role:0,
  }
  roleList:RoleListInt[]=[]
  editUser:EditUserInt={
    isShow:false,
    id:0,
    nickName:'',
    role:[],
    userName:''
  }
}