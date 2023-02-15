import service from "..";
// 获取歌单详情页数据
export function getMusicItemList(data){
    return service({
        method:"GET",
        url:`/playlist/detail?id=${data}`
    })
}
// 获取歌单所有歌曲
export function getMusicList(data){
    return service({
        method:"GET",
        url:`/playlist/track/all?id=${data}&offset=0`
    })
}
// 获取歌曲歌词
export function getMusicLyric(data){
    return service({
        method:"GET",
        url:`/lyric?id=${data}`
    })
}