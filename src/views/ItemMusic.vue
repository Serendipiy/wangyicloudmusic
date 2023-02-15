<template>
        <ItemMusicTop :playlist="state.playlist" />
        <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"/>
</template>
<script>
    // useRoute获取路由参数和一些数据
    import {
        useRoute
    } from 'vue-router'
    import {
        onMounted,
        reactive
    } from 'vue'
    import {
        getMusicItemList,
        getMusicList
    } from '@/request/api/item'
    import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
    import ItemMusicList from '@/components/item/ItemMusicList.vue'
    export default {
        setup() {
            const state = reactive({
                playlist: {},//歌单详情页数据
                itemList:[],//歌单歌曲
            })
            onMounted(async () => {
                let id = useRoute().query.id
                console.log(id);
            // 获取歌单详情
                let res = await getMusicItemList(id);
                console.log(res);
                state.playlist = res.data.playlist
                // 获取歌单歌曲
                let result = await getMusicList(id)
                state.itemList = result.data.songs
                console.log(result,">>");
                // 防止页面刷新，数据丢失，将数据保存在sessionStorage中
                sessionStorage.setItem('itemDetail', JSON.stringify(state))
            });
            return {
                state
            }
        },
        components: {
            ItemMusicTop,
            ItemMusicList,
        }
    }
</script>