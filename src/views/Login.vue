<template>
    <div class="login">
        <div class="loginTop">欢迎登录</div>
        <div class="loginContent">
            <!-- <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号码" /> -->
            <!-- <input type="text" name="passworld" class="passworld" v-model="password" placeholder="请输入密码" /> -->
            <!-- <button @click="send">发送验证码</button>
            <input type="text" name="captcha" class="captcha" v-model="captcha" placeholder="请输入验证码" />
            <button class="btn" @click="login">登录</button> -->

        </div>
    </div>
</template>
<script>
    import {
        getLoginUser,sendCaptcha,verifyCaptcha
    } from '@/request/api/home.js'
    export default {
        data() {
            return {
                phone: '',
                // password:'',
                captcha:''
            }
        },
        methods: {
            // 手机号密码登录（网易接口限制暂不可用）
        //   async login() {
        //         let res = await this.$store.dispatch('getLogin', {
        //             phone: this.phone,
        //             password:this.password,
        //         })
        //         console.log(res);
        //         if(res.data.code === 200){
        //             this.$store.commit('updateIsLogin',true)
        //             this.$store.commit('updateToken',res.data.token)
        //             let result = await getLoginUser(res.data.account.id)
        //             console.log(result);
        //             this.$store.commit('updateUser',result)
        //             this.$router.push('/infoUser')
        //         }else{
        //             alert('手机号或密码错误')
        //             this.captcha = ''
        //         }
        //     },

        // 验证码登录（网易接口限制暂不可用**无数据**）
            // async send(){
            //      let res = await this.$store.dispatch('sendCode', {
            //         phone: this.phone,
            //     })
            //     console.log(res,'验证码');
            // },
            // async login(){
            //     let res =await this.$store.dispatch('checkCode', {
            //         phone: this.phone,
            //         captcha:this.captcha,
            //     })
            //     if(res.data.code === 200){
                    
            //         this.$store.commit('updateIsLogin',true)
            //         // this.$store.commit('updateUser',result)
            //         this.$router.push('/infoUser')
            //     }else{
            //         alert(res.response.data.message)
            //         this.captcha = ''
            //     }
                
            // }
        // 扫描二维码的登录

        }

    }
</script>
<style lang="less" scoped>
   
</style>