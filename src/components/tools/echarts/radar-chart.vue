<template>
  <div id="radar" class="container"> </div>
</template>

<script>
  // 引入基本模板
  import echarts from 'echarts/lib/echarts'
  // 引入雷达图组件
  import 'echarts/lib/chart/radar'
  // 引入提示框和图例组件
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  export default {
    name: "radar-chart",
    data(){
      return{
        items:{},
      }
    },
    methods:{
      drawRadar(items){
        this.items = items;
        let values = []; //提炼接收到的数据
        this.items.forEach(el => {
          values.push(el.value)
        });
        const option = { //覆盖配置数据option
          tooltip: {},
          radar: {
            indicator: this.items,
            center: ['50%', '51%']
          },
          series: [{
            type: 'radar',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: [
              {
                value: values,
                name: '各项指标对应年龄/岁',
                itemStyle: {normal: {color: '#f0ad4e'}}
              }
            ]
          }]
        };
        //初始化图表
        const chartObj = echarts.init(document.getElementById('radar'));
        chartObj.setOption(option);
      },
    },
  }
</script>
<style scoped>
  .container{width: 500px;height: 400px;}
</style>
