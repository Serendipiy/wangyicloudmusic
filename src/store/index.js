import {
  createStore
} from 'vuex'
import {
  getMusicLyric
} from '@/request/api/item.js'
export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 3177160,
        name: "111",
        pic: 109951167557295220,
        picUrl: "https://p2.music.126.net/ROu52DfZhbUtYQTt_X8vpg==/109951167557295220.jpg",
        pic_str: "109951167557295220",
      },
      id: 33051313,
      name: 'Wake (Live)',
      ar:[{name:'Joel Davies'}]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮显示
    detailShow: false, //歌曲详情页显示
    lyricList: {}, //歌词
    currentTime:0,//歌曲播放当前时间
    duration:0,//歌曲总时长
  },
  getters: {},
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    updatePlayList(state, value) {
      state.playList = value
      console.log(state.playList, "playList");
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state,value){
      // console.log(state.currentTime);
      state.currentTime = value
    },
    updateDuration(state,value){
      state.duration = value
    }
  },
  // 获取数据（异步请求）在actions
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      // console.log(res);
      // 更新数据
      context.commit('updateLyricList', res.data.lrc)
    }
  },
  modules: {}
})