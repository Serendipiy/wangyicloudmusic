<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">

    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true"  @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color:#fff">{{musicList.name}}</Vue3Marquee>
        <span v-for="(singer,index) in musicList.ar" :key="index">
          {{singer.name}}
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopright">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang-"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="isbtnShow ?'img_needle':'img_needle_active'">
    <img src="@/assets/cd.png" alt="" class="img_cd">
    <img :src="musicList.al.picUrl" alt="" class="img_ar" @click="isLyricShow = true" :class="isbtnShow ?'img_ar_paused':'img_ar_active'">
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow">
    <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000 >= item.time && currentTime * 1000 < item.pre)}">
      {{item.lrc}}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xihuan-xianxing"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" style="fill:#fff" aria-hidden="true">
        <use xlink:href="#icon-changpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun-"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sandian"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime"
       step="0.05">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="bofang" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="bofang" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>
<script>
  import {
    Vue3Marquee
  } from 'vue3-marquee'
  import 'vue3-marquee/dist/style.css'
  import {
    mapMutations,
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        isLyricShow: false
      }

    },
    mounted() {
      // console.log(this.musicList);
      // console.log(this.lyricList.lyric);
      this.addDuration()
    },
    props: ['musicList', 'isbtnShow', 'play','addDuration'],
    methods: {
      backHome(){
        this.updateDetailShow()
        this.isLyricShow = false
      },
      goPlay(num){
        let index = this.playListIndex + num
        if(index < 0){
          index = this.playList.length - 1
        }else if(index = this.playList.length){
          index = 0
        }
        this.updatePlayListIndex(index)
      },
      ...mapMutations(['updateDetailShow','updatePlayListIndex'])
    },
    computed: {
      ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
      lyric() {
        let arr;
        if (this.lyricList.lyric) {
          // .map进行循环拿到item，返回新数组
          arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
            let min = item.slice(1, 3) //.slice包头不包尾
            let sec = item.slice(4, 6)
            let mill = item.slice(7, 10)
            let lrc = item.slice(11, item.length)
            let time =parseInt(min) * ( 60 * 1000) + parseInt(sec)* 1000 + parseInt(mill)
            if (isNaN(Number(mill))) {
              mill = item.slice(7, 9)
              lrc = item.slice(10, item.length)
              time =parseInt(min) * ( 60 * 1000) + parseInt(sec)* 1000 + parseInt(mill)
              // console.log(min,sec,Number(mill),lrc);
            }
            // 返回一个对象
            return {
              min,
              sec,
              mill,
              lrc,
              time
            }
            // console.log(arr);
          })
            arr.forEach((item,i) => {
              if(i === arr.length - 1 || isNaN(arr[i+1].time)){
                item.pre = 100000
              }else{
                item.pre = arr[i+1].time
              }
            });
        }
        // console.log(arr);
        return arr;
      }
    },
  watch:{
    currentTime(newVal){
      let p = document.querySelector('p.active')
      // 加中括号可看见标签引用信息
      // console.log([p]);
      if(p){
        if(p.offsetTop > 300){
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
       }
      //console.log([this.$refs.musicLyric])
      }
      // 自动切换下首歌
      // ***待优化***
      if(newVal === this.duration){
        if(this.playListIndex === this.playList.length - 1){
          this.updatePlayListIndex(0)
          this.play()
        }else{
          this.updatePlayListIndex(this.playListIndex + 1)
        }
      }
    }
  },
    components: {
      Vue3Marquee,
    }
  }
</script>
<style lang="less" scoped>
  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
  }

  .detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;

    .detailTopLeft {
      display: flex;
      align-items: center;

      .leftMarquee {
        width: 4rem;
        height: 100%;
        margin-left: 0.4rem;

        span {
          color: #999;
        }

        .icon {
          width: 0.3rem;
          height: 0.3rem;
          fill: #999;
        }
      }
    }
  }

  .detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .img_needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }

    .img_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }

    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }

    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 10s linear infinite; //匀速无限循环
    }

    .img_ar_active {
      animation-play-state: running; //控制动画启动
    }

    .img_ar_paused {
      animation-play-state: paused; //控制动画暂停
    }

    //   旋转动画效果
    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }

      100% {
        transform: rotateZ(360deg);
      }
    }
  }
.musicLyric{
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  overflow: scroll;
  scroll-behavior: smooth;
  p{
    color:#4b4a4a ;
    margin-bottom: .3rem;
    text-align: center;
  }
  .active{
    color:#fff;
    font-size: .5rem;
  }
}
  .detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        width: 0.36rem;
        height: 0.36rem;
        fill: rgb(245, 234, 234);
      }

      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }

    .range {
      width: 100%;
      height: 0.06rem;
    }

    .footer {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        fill: rgb(245, 234, 234);
      }

      .bofang {
        width: 1rem;
        height: 1rem;
      }
    }
  }
</style>