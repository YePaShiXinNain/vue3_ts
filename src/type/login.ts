//表单数据接口
export interface LoginInt{
    username: string  //用户名
    password: string  //密码
}

export class InitData{
    ruleForm: LoginInt = {
        username: "",
        password: ""
    }
}