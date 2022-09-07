//角色接口
export interface RoleInt{
  authority:number[],  //具体权限
  roleId:number,  //角色id
  roleName:string  //角色名
}
//编辑权限接口
export interface EditAuthorityInt{
  isShow:boolean,  //显示隐藏编辑框
  authority:number[],  //当前角色已经有的权限
  roleId:number,  //编辑的角色id
}
//所有权限接口
interface AuthorityInt{
  name:string,  //权限名
  roleId:number,  //用户id
  roleList:number[],  //角色列表
  viewRole:string  //查看角色
}

//实例化
export class InitData{
  roleList:RoleInt[]=[]
  editAuthority:EditAuthorityInt={
    isShow:false,
    authority:[],
    roleId:0,
  }
  addRoleOfName=''
  showReviseAuthority=false
  authorityList:AuthorityInt[]=[]
  treeRef:any //勾选页面修改好的权限
}