import service from "..";
// 获取首页轮播图数据
export function getBanner(){
    return service({
        method:"GET",
        url:"/banner?type=2",
    })
}
// 获取发现好歌单
export function getMusicList(){
    return service({
        method:"GET",
        url:"/personalized?limit=20"
    })
}
// 搜索
export function getSearchMusic(data){
    return service({
        method:"GET",
        url:`/search?keywords=${data}`
    })
}
// 手机登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
// 发送验证码
export function sendCaptcha(data){
    return service({
        method:"GET",
        url:`/captcha/sent?phone=${data.phone}`
    })
}
// 验证验证码
export function verifyCaptcha(data){
    return service({
        method:"GET",
        url:`/captcha/verify?phone=${data.phone}&captcha=${data.captcha}&timestamp=${Date.now()}`
    })
}
// 用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/user/detail?uid=${data}`
    })
}