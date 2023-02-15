<template>
  <div id="app">
    <router-view/>
    <FooterMusic/>
  </div>
</template>
<script>
import FooterMusic from '@/components/item/FooterMusic.vue'
export default {
  components:{
    FooterMusic
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .4rem;
  height: 0.5rem;
}
a{
  color: #000;
}

</style>
