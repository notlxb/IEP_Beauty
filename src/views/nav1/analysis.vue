<template>
  <section>
    <template>
            <div class="custom-tree-container">
              <div class="block">
                <el-tree :data="list5" :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>



                <!--这是查看-->
                <el-dialog title="用户信息" :visible.sync="dialogFormVisible_LookOver">
                  <el-form v-model="newChild">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-input v-model="newChild.name" placeholder="">{{newChild.name}}</el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth">
                      <el-input v-model="newChild.age" placeholder="">{{newChild.age}}</el-input>
                    </el-form-item>
                  </el-form>
                  <el-form v-model="newChild">
                    <el-form-item label="出生日期" :label-width="formLabelWidth">
                      <el-input v-model="newChild.birthdate" placeholder="">{{newChild.birthdate}}</el-input>
                    </el-form-item>
                  </el-form>
                  <el-form v-model="newChild">
                    <el-form-item label="监护人姓名" :label-width="formLabelWidth">
                      <el-input v-model="newChild.guardian" placeholder="">{{newChild.guardian}}</el-input>
                    </el-form-item>
                    <el-form-item label="辅助填表人" :label-width="formLabelWidth">
                      <el-input v-model="newChild.helper" placeholder="">{{newChild.helper}}</el-input>
                    </el-form-item>
                    <el-form-item label="填表时间" :label-width="formLabelWidth">
                      <el-input v-model="newChild.nowtime" placeholder="">{{newChild.nowtime}}</el-input>
                    </el-form-item>
                    <el-form-item label="分数" :label-width="formLabelWidth">
                      <el-input v-model="newChild.grade" placeholder="">{{newChild.grade}}</el-input>
                    </el-form-item>
                  </el-form>


                  <!--<div id="main" style="width: 600px;height: 600px;"></div>-->


                </el-dialog>


                <!--查看人数-->
                <el-dialog title="用户信息" :visible.sync="dialogFormVisible_LookOver2">



                  <div id="main" style="width: 600px;height: 600px;"></div>


                </el-dialog>

                <!--这是删除-->
                <el-dialog title="是否确定删除用户！" :visible.sync="dialogFormVisible_delete">
                  <el-form v-model="newChild">
                    <el-form-item label="删除的用户为："  :label-width="formLabelWidth">
                      <el-input v-model="newChild.name" placeholder="请用分号间隔" >{{newChild.name}}</el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible_delete = false">取 消</el-button>
                    <el-button type="danger" @click="toDelete(),dialogFormVisible_delete=false">确 定</el-button>
                  </div>
                </el-dialog>

              </div>
              <div class="paginationClass">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="this.currentPage1"
                    :page-size="this.pageSize"
                    :total="this.total"
                    layout="total,prev,pager,next,jumper">
                </el-pagination>
              </div>
              <el-button type="danger" style="margin-top: 1%" @click="LookOver2()">查看人数</el-button>
            </div>
          </template>
  </section>

</template>

<script>/* eslint-disable */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import axios from 'axios'

let id = 61//这里的id改成表里最大id

export default {

    data () {

        return {
            //设置别名
            /*
            * data中的return里可以定义多个临时变量，申明式变量
            * 临时变量的格式有{}，[],""
            * 例如：Map（变量名）:{}===>它是一个对象
            * 例如：List（变量名）:[]===>它是一个数组
            * 例如：var（变量名）：""===>它是一个字符串
            * 注意：尽量一对一（不一定），一个变量一赋值
            * */
            defaultProps: {//它是一个临时变量，格式是对象{}
                children: 'children',
                userName:'userName',
            },
            checkAll: false,

            items:{},

            isIndeterminate: true,
            userId:localStorage.getItem('userId'),
            userRank:localStorage.getItem('rank'),
            list:[],
            list2:[],
            list3:[],
            list4:[
                {
                    "id":3,
                    "label":"老师"
                }
            ],
            list5:[],
            pageSize:10,
            currentPage1:1,
            total:"",
            currentPage:"",
            idk:"",
            idk2:"",
            str:"aaa",//这是字符串 ""这是为空尚未初始化，" "这是一个空字符串，已经被初始化，和"ddd"一个意思 str=字符串变量 bbb 将会替换aaa  str=bbb
            map:{"key1":"value1","key2":"value2"},
            dataList:{
                id: '',
                region: '',
                label: '',
            },
            dialogFormVisible: false,
            dialogFormVisible_LookOver: false,
            dialogFormVisible_LookOver2: false,
            dialogFormVisible_update: false,
            dialogFormVisible_delete: false,
            newChild: {
                id: '',
                name:'',
                age:'',
                birthdate:'',
                guardian:'',
                helper:'',
                nowtime:'',
                grade:'',

            },
            formLabelWidth: '120px',
            /*data1: JSON.parse(JSON.stringify(data2)),
            data1: JSON.parse(JSON.stringify(data2))*/
        };
    },

    components: {},

    methods: {
        drawPie() {
            var charts = echarts.init(document.getElementById("main"));

            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/agenum").then((res) =>{
                console.log(res.data.data[0].a);//返回的参数 res.data才是后端返回的
                this.list3=res.data.data;
            }).catch((err)=>{
                console.log(err)
            });
            var option = {
                title: {
                    text: "这个是测试",
                    link: 'https://www.baidu.com',
                    target: "blank",
                    textAlign: 'left',

                },
                tooltip: {},//提示层
                legend: {
                    data: ['name1']
                },
                radar: {
                    name: {
                        textStyle: {
                            color: '#ff4a5f', //字体颜色
                            backgroundColor: '#392b99', //背景色
                            borderRadius: 3, //圆角
                            padding: [3, 5] //padding
                        }
                    },
                    center: ['50%', '50%'],
                    radius: '60%',
                    startAngle: 270,
                    indicator: [{
                        name: '0岁6个月到1岁11个月',
                        max: 300
                    },
                        {
                            name: '2岁0个月到3岁5个月',
                            max: 300
                        },
                        {
                            name: '3岁6个月到4岁11个月',
                            max: 300
                        },
                        {
                            name: '5岁0个月到6岁5个月',
                            max: 300
                        },
                        {
                            name: '6岁6个月到8岁5个月',
                            max: 300
                        },
                        {
                            name: '8岁6个月到10岁5个月',
                            max: 300
                        },
                        {
                            name: '10岁6个月以上',
                            max: 300
                        }
                    ],
                },
                series: [{
                    name: '测试标题名字',
                    type: 'radar',
                    data: [{
                        value: [this.list3[0].a, this.list3[0].b, this.list3[0].c,this.list3[0].d,this.list3[0].e,this.list3[0].f,this.list3[0].g],
                        name: "123"
                    }]
                }]
            }
            charts.setOption(option);
        },

        handleSizeChange1:function(pageSize){
            this.pageSize=pageSize;
            this.handleCurrentChange1(this.currentPage1);
        },
        handleCurrentChange1:function(currentPage){
            this.currentPage1=currentPage;
            this.currentChangePage(currentPage);

        },
        //分页方法（重点）
        currentChangePage(currentPage){
            this.getData();
        },

        append1 (data){//实现一个添加功能 append1它是一个方法名  叫什么无所谓
            console.log("start");
            console.log(data);
            console.log(1);
            this.dialogFormVisible = true;
            console.log(2);
            if (!data.children) {
                console.log(3);
                this.$set(data, 'children', []);
                console.log(4);
            }
            console.log(5);
            data.children.push(this.getData());
            console.log(6);
        },
        append (data) {
            console.log(data);
            if (!data.children) {
                this.$set(data, 'children', [])
            }
            data.children.push(this.getData())
        },
        LookOver (data) {
            this.dialogFormVisible_LookOver = true;
            this.$nextTick(function() {
                this.drawPie('main')
            })

        },

        LookOver2 (data) {
            this.dialogFormVisible_LookOver2 = true;
            this.$nextTick(function() {
                this.drawPie('main')
            })

        },
        update (data) {
            this.dialogFormVisible_update = true;
        },
        delete (data) {
            this.dialogFormVisible_delete = true;
        },
        remove (node, data) {
            /*console.log(node.parent)
            console.log(node.parent.data)
            console.log(node.parent.data.children)*/
            this.$set(data, 'disabled', true)
            /*const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)*/
        },

        recover (data) {
            this.getData()
        },

        getCheckedNodes() {
            console.log("chosenList is:");
            console.log(this.$refs.tree.getCheckedNodes());

        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                id: 5,
                /*label: '二级 2-1'*/
            }, {
                id: 9,
                /*label: '三级 1-1-1'*/
            }]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3,7,14,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
        saveList(){
            //console.log(this.$refs.tree.getCheckedKeys());
            //点击确定打印输入框数据
            console.log("sssss")
        },
        renderContent(h, { node, data, store }) {


            return (
                <span class="custom-tree-node">
                <span>{data.name}</span>
                <span>
                <el-button size="mini" type="text"  style="color: #F56C6C" on-click={ () => this.LookOver(data,this.getData()) }>查看</el-button>
            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
            <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.recover(data) }>刷新</el-button>
            </span>
            </span>);


        },
        getData: function() {///methods中的一个方法 获取后端数据  实现前端渲染
            //这是一个ajax的post请求  res是response的简化参数名 叫什么无所谓  代表的是response
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/rebabytest").then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                this.list=res.data.data;
                this.total=this.list.size;
                for(var i=0;i<this.pageSize;i++){
                    this.list5.pop();
                }
                for(var j=0;j<this.pageSize;j++){
                    if(this.list[this.pageSize*(this.currentPage1-1)+j]==null)
                        break;
                    this.list5.push(this.list[this.pageSize*(this.currentPage1-1)+j])
                }
            }).catch((err)=>{
                console.log(err)
            })

        },


        toDelete(){//实现删除
            var params = new URLSearchParams();
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/deletebabytest",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.getData()
        },


        handleNodeClick(data) {
            console.log(data);
            this.newChild.id=data.id;
            this.newChild.name=data.name;
            this.newChild.age=data.age;
            this.newChild.birthdate=data.birthdate;
            this.newChild.guardian=data.guardian;
            this.newChild.helper=data.helper;
            this.newChild.nowtime=data.nowtime;
            this.newChild.grade=data.grade;
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },

    },


    mounted() {//钩子函数（vue生命周期，它会在项目启动时，执行其中的方法，进行全局初始化）
        this.$nextTick(function() {
            this.drawPie('main')
        });
        this.getData();
        this.atSelect();
    }
}
</script>

<style>

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px; /*字号*/
    padding-right: 8px; /*右侧宽度*/
  }

  .paginationClass{
    margin-top: 1%;
  }
</style>
