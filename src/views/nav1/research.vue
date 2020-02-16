<template>
  <section>
    <h2>请前往新页面填写问卷</h2>
    <el-button type="danger" style="margin-top: 1%" @click="jmp2research()">前往填写</el-button>
  </section>
</template>

<script>
  export default {
    name: "research",
    data() {
      return {

      }
    },

    mounted(){
      //this.jmp2research();
    },
    methods:{
        jmp2research(){
          window.open("http://47.110.134.247/group1/babytable.html",'_blank');
        },



    }


  }
</script>

<style scoped>

</style>
