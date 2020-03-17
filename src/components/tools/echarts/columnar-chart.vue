<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 100%;height: 400px;"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'columnar-chart',
    data() {
      return {
        charts: '',
        /*  opinion: ["1", "3", "3", "4", "5"],*/
        // opinionData: [3, 2, 4, 4, 5],
        // opinionData2: [4, 9, 8, 6, 5],
        // tdata: [],
        //     {
        //     barGap: 0,
        //     name: '刘一',
        //     type: 'bar',
        //     barWidth:16,
        //     data: [3, 2, 4, 4, 5,10],
        // },
        //     {
        //         barGap: 0,
        //         name: '张三',
        //         type: 'bar',
        //         barWidth:16,
        //         data: [4, 9, 8, 6, 5,17],
        //     }
        //     ],
        xdata:[]//"语文","数学","英语","物理","化学","生物"]
      }
    },
    methods: {

      drawLine(tdata) {
        this.charts='';
        // this.tdata = tdata[0];
        // this.xdata = tdata[1];
        var mycharts = echarts.init(document.getElementById('main'));
        var option={
          title:{
            text:tdata[2],
            x:'center',
            y:'top',
            textAlign:'center'

          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['评量比较']
            // show:false
          },
          grid: {
            left: '2%',
            right: '15%',
            bottom: '3%',
            containLabel: true
          },

          // toolbox: {
          //
          //     feature: {
          //         saveAsImage: {}
          //     }
          // },
          // color:this.color,
          calculable:true,
          xAxis:[ {
            // name:"长期目标",
            type: 'category',
            axisTick:{
              show:false
            },
            nameTextStyle:{
              color:'rgba(0,0,0,1)'
            },
            axisLabel:{
              textStyle:{
                color:'black'
              }
            },
            //boundaryGap: false,
            data:tdata[1],
          }],
          yAxis: [{
            axisLine:{
              show:false
            },
            nameLocation:'end',
            nameGap:20,
            nameRotate:0,
            axisTick:{
              show:false
            },
            splitLine:{
              lineStyle:{
                color:['rgba(255,0,0,0.2)']
              }
            },
            axisLabel:{
              textStyle: {
                color:'black',
                fontSize:14
              }
            },
            name:'分数',
            type: 'value',
            nameTextStyle: {
              color:'rgba(0,0,0,1)'
            }
          }],
          series:tdata[0]
        };
        mycharts.clear();  //擦除之前画的图
        mycharts.setOption(option);

      }
    },
    //调用
    mounted() {
      this.$nextTick(function() {
        this.drawLine(tdata)
      })
    },
    watch:{
      tdata:{
        handler(newVal,oldVal){
          if(this.charts){
            if(newVal){
              this.charts.setOption(newVal);
            }else{
              this.charts.setOption(oldVal);
            }
          }
        },
        deep:true
      }
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
