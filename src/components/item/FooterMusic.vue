<template>
    <div class="footerMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{playList[playListIndex].name}}</p>
                <span>横滑切换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-24gl-playCircle"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%',width:'100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow"
                :addDuration="addDuration" />
        </van-popup>
    </div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import MusicDetail from '@/components/item/MusicDetail.vue'
    export default {
        data() {
            return {
                interVal: 0
            }
        },
        computed: {
            ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
        },
        mounted() {
            this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
            // console.log(this.$refs);
            this.addDuration()
        },
        updated() {
            // 将id传给store的‘getLyric’方法
            this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        },
        methods: {
            play() {
                // 判断音乐是否播放
                if (this.$refs.audio.paused) {
                    this.$refs.audio.play()
                    this.updateIsbtnShow(false)
                    this.updateTime() //播放调用函数进行传值

                } else {
                    this.$refs.audio.pause()
                    this.updateIsbtnShow(true)
                    clearInterval(this.interVal) //暂停清楚定时器
                }

            },
            // 总时长
            addDuration() {
                this.updateDuration(this.$refs.audio.duration)
            },
            // ***待优化***
            updateTime() {
                this.interVal = setInterval(() => {
                    this.updateCurrentTime(this.$refs.audio.currentTime)
                }, 10)
            },
            ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
        },
        watch: {
            playListIndex() { //监听如果下标发生改变自动播放
                this.$refs.audio.autoplay = true
                if (this.$refs.audio.paused) { //如果是暂停播放改变图标
                    this.updateIsbtnShow(false)
                }
            },
            playList() {
                if (this.isbtnShow) {
                    this.$refs.audio.autoplay = true;
                    this.updateIsbtnShow(false)
                }
            }
        },
        components: {
            MusicDetail,
        }
    }
</script>
<style lang="less" scoped>
    .footerMusic {
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        padding: .2rem;
        justify-content: space-between;

        .footerLeft {
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;

            img {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
        }

        .footerRight {
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon {
                width: 0.6rem;
                height: 0.6rem;
            }
        }
    }
</style>