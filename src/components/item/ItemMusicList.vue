<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <span>播放全部<span>(共{{itemList.length}}首)</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao1"></use>
                </svg>
                <span>收藏({{subscribedCount}})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item,i) in itemList" :key="i">
                <div class="itemLeft" @click="palyMusic(i)">
                    <span class="leftSpan">{{i+1}}</span>
                    <div>
                        <p>{{item.name}}</p>
                        <span v-for="(singer,index) in item.ar" :key="index">
                            {{singer.name}}
                        </span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
    export default {
        setup(props) {
            console.log(props);
        },
        props: ['itemList', 'subscribedCount'],
        methods: {
            palyMusic(i){
                this.updatePlayList(this.itemList)
                this.updatePlayListIndex(i)
            },
            ...mapMutations(['updatePlayList','updatePlayListIndex'])
        },
    }
</script>
<style lang="less" scoped>
    .itemMusicList {
        width: 100%;
        height: 10rem;
        background-color: #fff;
        padding: 0 .2rem;
        margin-top: .2rem;
        border-top-left-radius: .4rem;
        border-top-right-radius: .4rem;

        .itemListTop {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .listLeft {
                width: 3rem;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .icon {
                    // stroke定义轮廓颜色;stroke-width轮廓厚度（适用于svg）
                    stroke: #333333;
                    stroke-width: 20;
                }

                span {
                    font-weight: 700;

                    span {
                        font-weight: 400;
                        font-size: .24rem;
                        color: #999;
                    }
                }
            }

            .listRight {
                display: flex;
                align-items: center;
                background-color: red;
                padding: 0.2rem;
                border-radius: .4rem;
                color: #fff;

                .icon {
                    width: 0.3rem;
                    height: 0.3rem;
                    fill: #fff; //设置svg形状颜色
                    margin-right: .1rem;
                    stroke: #fff;
                    stroke-width: 50;
                }
            }
        }

        .itemList {
            width: 100%;

            .item {
                width: 100%;
                height: 1.4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .itemLeft{
                    width: 85%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    .leftSpan{
                        display: inline-block;
                        width: 0.2rem;
                        text-align: center;
                    }
                    div{
                        p{
                            width: 5.54rem;
                            height: 0.4rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            font-weight: 700;
                        }
                        span{
                            font-weight: 400;
                            font-size: .24rem;
                            color: #999;
                        }
                        margin-left: .3rem;
                    }
                }
            }

        }
        .itemRight{
            width: 20%;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
            .icon{
                fill: #999;
            }
            .bofang{
                position: absolute;
                left: 0;
            }
            .liebiao{
                position: absolute;
                right: 0;
            }
        }
    }
</style>