<template>
  <section>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree :data="list5" :props="defaultProps" @node-click="handleNodeClick"
                 :render-content="renderContent"></el-tree>

        <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
          <el-form v-model="newChild">
            <el-form-item label="用户名称" :label-width="formLabelWidth">
              <el-input v-model="newChild.label1" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="工号（学号）" :label-width="formLabelWidth">
              <el-input v-model="newChild.label5" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="newChild.label2" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="newChild.label3" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth">
              <el-input v-model="newChild.label4" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
              <el-select v-model="idk" placeholder="请选择" @click="atSelect()">
                <el-option
                    v-for="item in list2"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="用户类型" :label-width="formLabelWidth" v-if="userRank==1">
              <el-select v-model="idk2" placeholder="请选择"><!-- id="test"-->
                <el-option
                    v-for="item in list3"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="用户类型" :label-width="formLabelWidth" v-if="userRank==2">
              <el-select v-model="idk2" placeholder="请选择"><!-- id="test"-->
                <el-option
                    v-for="item in list4"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="权限" :label-width="formLabelWidth">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>


          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <!--<el-button @click=getId()>！！！</el-button>-->
            <el-button type="primary" @click="toSave(),dialogFormVisible=false">确 定</el-button>
          </div>
        </el-dialog>

        <!--这是查看-->
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible_LookOver">
          <el-form v-model="newChild">
            <el-form-item label="用户名称" :label-width="formLabelWidth">
              <el-input v-model="newChild.userName" placeholder="">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
              <el-input v-model="newChild.jobnumb" placeholder="">{{newChild.jobnumb}}</el-input>
            </el-form-item>
          </el-form>
          <el-form v-model="newChild">
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="newChild.email" placeholder="">{{newChild.label}}</el-input>
            </el-form-item>
          </el-form>
          <el-form v-model="newChild">
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="newChild.telephone" placeholder="">{{newChild.label}}</el-input>
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
              <el-input v-model="newChild.schools" placeholder="">{{newChild.schools}}</el-input>
            </el-form-item>

            <el-form-item label="用户类型" v-model="newChild.rank" :label-width="formLabelWidth">
              <el-input v-for="item in list3" v-if="newChild.rank==item.id"
                        :key="item.id"
                        :label="item.label"
                        :value="item.label"></el-input>
            </el-form-item>

            <el-form-item label="权限" :label-width="formLabelWidth">

              <el-checkbox-group v-model="newChild.permission2" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city" disabled>{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">

            <el-button @click=getId()>！！！</el-button>

          </div>
        </el-dialog>


        <!--这是修改-->
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible_update">
          <el-form v-model="newChild">
            <el-form-item label="用户名称" :label-width="formLabelWidth">
              <el-input v-model="newChild.userName" placeholder="">{{newChild.userName}}</el-input>
            </el-form-item>
            <el-form-item label="工号" :label-width="formLabelWidth">
              <el-input v-model="newChild.jobnumb" placeholder="">{{newChild.jobnumb}}</el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="newChild.email" placeholder="">{{newChild.email}}</el-input>
            </el-form-item>
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="newChild.telephone" placeholder="">{{newChild.telephone}}</el-input>
            </el-form-item>

            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="newChild.label4" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="学校" :label-width="formLabelWidth">
              <el-select v-model="newChild.schools" placeholder="请选择" @click="atSelect()"><!-- id="test"-->
                <el-option
                    v-for="item in list2"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="权限" :label-width="formLabelWidth">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="newChild.permission2" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_update = false">取 消</el-button>
            <el-button type="primary" @click="toUpdate(),dialogFormVisible_update=false">确 定</el-button>
          </div>
        </el-dialog>
        <!--这是删除-->
        <el-dialog title="是否确定删除用户！" :visible.sync="dialogFormVisible_delete">
          <el-form v-model="newChild">
            <el-form-item label="删除的用户为：" :label-width="formLabelWidth">
              <el-input v-model="newChild.userName" placeholder="请用分号间隔">{{newChild.userName}}</el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible_delete = false">取 消</el-button>
            <el-button type="primary" @click="toDelete(),dialogFormVisible_delete=false">确 定</el-button>
          </div>
        </el-dialog>


      </div>
      <el-row>
        <el-col :span="20">
          <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="this.currentPage1"
              :page-size="this.pageSize"
              :total="this.total"
              style="margin-left: 1%"
              layout="total,prev,pager,next,jumper">
          </el-pagination>
        </el-col>
        <el-col :span="4" style="text-align: center">
          <el-button type="danger" style="margin-left: 10%" @click="append1()" v-if="userRank!=3">新建</el-button>
        </el-col>


      </el-row>




    </div>
  </section>
</template>

<script>/* eslint-disable */
const cityOptions = ['添加课程', '修改课程', '删除课程','添加指标','修改指标','删除指标','生态评量查看','生态评量（学生信息）修改','生态评量（医学诊断）修改',
    '生态评量（家庭基础信息）修改','生态评量（专项评估）修改','IEP会议查看','IEP会议修改','课程评量查看','课程评量修改','集体教学计划查看','集体教学计划修改',
    '个训教学计划查看','个训教学计划修改','长短期目标查看','长短期目标修改','集体学科教学查看','集体学科教学修改','个训学科教学查看','个训学科教学修改',
    '学习报表查看','学习报表修改'];

let id = 61;//这里的id改成表里最大id
import axios from 'axios'
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
            checkedCities: [],
            cities: cityOptions,
            isIndeterminate: true,
            userId:localStorage.getItem('userId'),
            userRank:localStorage.getItem('rank'),
            list:[],
            list2:[],
            list3:[
                {
                    "id":1,
                    "label":"超级管理员"
                },
                {
                    "id":2,
                    "label":"校长"
                },
                {
                    "id":3,
                    "label":"老师"
                }
            ],
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
            dialogFormVisible_update: false,
            dialogFormVisible_delete: false,
            newChild: {
                id: '',
                userName:'',
                email:'',
                telephone:'',
                permission:'',
                permission2:[],
                label1:'',
                label2:'',
                label3:'',
                label4:'',
                label5:'',
                schools:'',
                rank:'',
                jobnumb:'',
            },
            formLabelWidth: '120px',
            /*data1: JSON.parse(JSON.stringify(data2)),
            data1: JSON.parse(JSON.stringify(data2))*/
        };
    },

    components: {},

    methods: {//方法home，所有方法在这里 未来读写分离，好处便于维护和方法公用
//分页
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

            if(localStorage.getItem('rank')!=3){
                return (
                    <span class="custom-tree-node">
                    <span>{data.userName}</span>
                    <span>
                    <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.LookOver(data,this.getData()) }>查看</el-button>
                <el-button size="mini" type="text" style="color: #F56C6C" on-click={ () => this.update(data,this.getData()) }>修改</el-button>
                <el-button size="mini" type="text" style="color: #F56C6C"on-click={ () => this.delete(data,this.getData()) }>删除</el-button>
                <el-button size="mini" type="text" style="color: #F56C6C"on-click={ () => this.recover(data) }>刷新</el-button>
                </span>
                </span>);
            }
            else{
                return (
                    <span class="custom-tree-node">
                    <span>{data.userName}</span>
                    </span>);
            }

        },
        getData: function() {///methods中的一个方法 获取后端数据  实现前端渲染
            //这是一个ajax的post请求  res是response的简化参数名 叫什么无所谓  代表的是response
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/UserData").then((res) =>{
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
        toSave(){//它是一个添加方法——whl，它叫什么并不重要

            var params = [];
            params.push({key:'userName',value:[this.newChild.label1]});
            params.push({key:'email',value:[this.newChild.label2]});
            params.push({key:'telephone',value:[this.newChild.label3]});
            params.push({key:'password',value:[this.newChild.label4]});
            params.push({key:'schools',value:[this.idk]});
            params.push({key:'rank',value:[this.idk2]});
            params.push({key:'list',value:this.checkedCities});
            params.push({key:'jobnumb',value:[this.newChild.label5]});
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/insertUserData",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                alert(res.data.message);
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label1='';
            this.newChild.label2='';
            this.newChild.label3='';
            this.newChild.label4='';
            this.newChild.label5='';
            this.idk='';
            this.idk2='';
            this.checkedCities=[];
            this.getData()
        },
        toUpdate(){//实现修改
            var params = [];
            params.push({key:'id',value:[String(this.newChild.id)]});
            params.push({key:'userName',value:[this.newChild.userName]});
            params.push({key:'email',value:[this.newChild.email]});
            params.push({key:'telephone',value:[this.newChild.telephone]});
            params.push({key:'password',value:[this.newChild.label4]});
            params.push({key:'schools',value:[this.newChild.schools]});
            params.push({key:'list',value:this.newChild.permission2});
            params.push({key:'jobnumb',value:[this.newChild.jobnumb]});
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/updateUserData",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.newChild.label4='';
            this.checkedCities=[];
            this.getData()
        },
        toDelete(){//实现删除
            var params = new URLSearchParams();
            params.append('id', this.newChild.id);
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/deleteUserData",params).then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
            }).catch((err)=>{
                console.log(err)
            })
            this.getData()
        },
        atSelect(){
            axios.post("http://47.110.134.247/group1_b/sysAdmin/resource/DataForm3").then((res) =>{
                console.log(res.data);//返回的参数 res.data才是后端返回的
                this.list2=res.data.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        getId(value){
            // var  myselect=document.getElementById("test");
            // var index=myselect.selectedIndex ;
            // alert(myselect.options[index].value);
            // alert(myselect.options[index].text);

            alert(this.currentPage1);
        },
        handleNodeClick(data) {
            console.log(data);
            this.newChild.id=data.id;
            this.newChild.label=data.label;
            this.newChild.userName=data.userName;
            this.newChild.email=data.email;
            this.newChild.telephone=data.telephone;
            this.newChild.schools=data.schools;
            this.newChild.permission=data.permission;
            this.newChild.rank=data.rank;
            this.newChild.permission2=data.permission2;
            this.newChild.jobnumb=data.jobnumb;
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
        this.getData();
        this.atSelect();
    }
}
</script>

<style scoped>

</style>
