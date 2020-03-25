<template>
    <div>
        <el-container>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/periodicAnalysis'}">定期评估分析</el-breadcrumb-item>
                <el-breadcrumb-item>编辑评估分析</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </el-container>
        <el-divider></el-divider>
        <el-container>
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" align="left">
                    <el-form-item label="学年">
                        <el-select v-model="schoolYear" placeholder="请选择" :disabled="disabled">
                            <el-option
                                    v-for="item in schoolYear_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学期">
                        <el-select v-model="term" placeholder="请选择" :disabled="disabled">
                            <el-option
                                    v-for="item in term_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-select v-model="schoolYear" placeholder="请选择" :disabled="disabled" @change="queryClass()">
                            <el-option
                                    v-for="item in class_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学生">
                        <el-select v-model="stuName" placeholder="请选择学生" :disabled="disabled">
                            <el-option
                                    v-for="item in stuOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分析人">
                        <el-select v-model="teacher" placeholder="请选择" :disabled="disabled">
                            <el-option
                                    v-for="item in teacher_options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分析时间">
                        <el-date-picker :disabled="disabled" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" align="left" v-model="date" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-container>
        <el-divider></el-divider>
        <div>
            <span>目标评鉴结果</span>
            <vue-ckeditor type="classic"  v-model="target_assess" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>学科能力评量结果</span>
            <vue-ckeditor type="classic"  v-model="subject_ability" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>课程评量结果</span>
            <vue-ckeditor type="classic"  v-model="course_assess" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>治疗性评估结果</span>
            <vue-ckeditor type="classic"  v-model="remedial_assess" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>生活描述</span>
            <vue-ckeditor type="classic"  v-model="life_describe" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
        <span>主要问题</span>
        <vue-ckeditor type="classic"  v-model="main_problem" :editors="editors1"
                      :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>主要需求</span>
            <vue-ckeditor type="classic"  v-model="main_request" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>教育重点</span>
            <vue-ckeditor type="classic"  v-model="edu_emphasis" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>补充目标</span>
            <vue-ckeditor type="classic"  v-model="add_target" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>教学策略</span>
            <vue-ckeditor type="classic"  v-model="edu_tactice" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <div>
            <span>相关服务</span>
            <vue-ckeditor type="classic"  v-model="relate_service" :editors="editors1"
                          :config='config' :readonly="disabled"></vue-ckeditor>
        </div>
        <el-form :inline="true" align="center">

        </el-form>
    </div>
</template>

<script>
    import VueCkeditor from 'vue-ckeditor5'
    import ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block'
    import '@ckeditor/ckeditor5-build-balloon-block/build/translations/zh-cn'
    export default {
        components:{'vue-ckeditor': VueCkeditor.component},
        data(){
            return{
                term_options:[{value: '上学期', label: '上学期'},
                    {value: '下学期', label: '下学期'}],
                schoolYear_options:[{value: '2017-2018', label: '2017-2018'},
                    {value: '2018-2019', label: '2018-2019'},
                    {value: '2019-2020', label: '2019-2020'},
                    {value: '2020-2021', label: '2020-2021'}],
                class_options:[],
                stuOptions:[],
                teacher_options:[],

                schoolYear:'',
                term:'',
                tclass:'',
                stuName:'',
                teacher:'',
                date:'',

                disabled:true,
                editors1: {
                    classic: ClassicEditor,
                },
                config:{
                    language:'zh-cn',
                    // ckfinder: {
                    //     uploadUrl: '/api/stu/picture_IEP'
                    // },
                },

                target_assess:'',
                subject_ability:'',
                course_assess:'',
                remedial_assess:'',
                life_describe:'',
                main_problem:'',
                main_request:'',
                edu_emphasis:'',
                add_target:'',
                edu_tactice:'',
                relate_service:'',
            }
        },
        mounted() {
            if(this.$route.query.isEdit == 1){
                this.disabled = false;

            }else{
                this.disabled = true;


            }
        }
    }
</script>

<style scoped>

</style>
