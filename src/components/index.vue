<template>
  <div id="app">
    <el-container id="container">
      <Aside  v-on:IndexChanged="change($event)"> </Aside>

      <el-container>
        <el-header style="background-color:#545c64">
            <Header></Header>
        </el-header>

        <!--自定义模板-->
        <el-main v-if="index==0">
          <Recently></Recently>

        </el-main>
        <el-main v-if="index==1">
          <Yitou></Yitou>

        </el-main>
        <el-main v-if="index==2">
          <WeiTou></WeiTou>
        </el-main>
        <el-main v-if="index==3">
          <div style="font-size: 18px ;padding-bottom: 20px">
            我的发布
            <el-button type="primary" style="float: right" @click="change(4)">新建发布</el-button>
          </div>
          <MyFabu v-on:change="change($event)"></MyFabu>
        </el-main>
        <el-main v-if="index==4">
          <ckeditor4 v-bind:cktext="cktext" v-on:ckinput="cksave($event)" ></ckeditor4>
          <div style="text-align: center; font-size: 14px ;padding-top:20px;background-color: white">
            <el-button type="primary"  style="margin-right: 200px;background-color: #545c64" @click="change(12)">保存模板</el-button>
            <el-button type="primary"  style="background-color: #545c64" @click="change(10)">立即发布</el-button>
          </div>
        </el-main>
<!--v-bind用于绑定传值，由MyMuban模板接收并使用-->
        <el-main v-if="index==5">
          <MyMuban v-bind:imgsrc="dataURL" v-bind:cktext="cktext"></MyMuban>
        </el-main>

        <el-main v-if="index==6">
          <NewForm></NewForm>

        </el-main>
        <el-main v-if="index==7">
          <form-create v-model="zidingyi" :rule="rule" @on-submit="onSubmit"></form-create>
        </el-main>

        <el-main v-if="index==12">
<!--          <slot>中是ckeditor中的html,需要把它转换成图片显示出来比较直观-->

          <div class="imageWrapper" ref="imageWrapper">
            <slot>
              <div v-html="cktext"></div>
            </slot>
          </div>
          <div style="text-align: center;">
            <el-button type="primary" @click="change(40)">返回修改</el-button>
            <el-button type="primary" @click="toImage(5)">确定保存</el-button>
          </div>
        </el-main>

        <el-main v-if="index==13">
          <div style="font-size: 20px;text-align: center">预览</div>

          <div v-html="cktext"></div>
          <div style="font-size: 15px;">投票标题：{{TPname}}</div>
          <div style="font-size: 15px;">接收者： {{people}}</div>
          <div style="font-size: 15px;" >级别：{{JBtext[parseInt(jibie)-1]}}</div>
          <div style="font-size: 15px"> 前置条件：{{value2}}%</div>
          <div style="text-align: center;padding-top: 10px">
            <el-button type="primary" @click="change(11)">返回修改</el-button>
            <el-button type="primary" @click="change()">确定发布</el-button>
          </div>


        </el-main>

        <el-main v-if="index==10">
          <Fabu v-bind:people="people" v-on:changepeople="changepeople($event)"></Fabu>
          <div style="text-align: center;">
            <el-button type="primary" @click="change(4)">上一步</el-button>
            <el-button type="primary" @click="change(11)">下一步</el-button>
          </div>
        </el-main>

        <el-main v-if="index==11">
          <div style="width: 80%;padding-top: 20px;padding-left: 10%">
            <span style="font-size: 20px;">为该投票命名</span>
            <el-input
              placeholder="请输入内容"
              v-model="TPname"
              clearable
                    >
            </el-input>

          </div>
          <div style="width: 80%;padding-top: 20px;padding-left: 10%">
            <span style="font-size: 20px;">设置该投票级别</span>
            <div style="font-size: 14px;padding-top: 5px;color: gray;padding-bottom: 20px;">数值越大级别越高，</div>
            <el-rate
              v-model="jibie"
              show-text
              :texts=JBtext
            @change="jibiechange()">
            </el-rate>


          </div>
          <div style="width: 80%;padding-top: 20px;padding-left: 10%">
            <span style="font-size: 20px;">设置前置条件</span>
            <div style="font-size: 14px;padding-top: 5px;color: gray;padding-bottom: 20px;">设定启动“汇总测评情况”的前置条件，明确X%用户完成投票任务方可汇总情况。</div>
            <el-slider v-model="value2" :format-tooltip="formatTooltip"></el-slider>
          </div>
          <div style="text-align: center;width: 80%;padding-top: 50px;padding-left: 10%">
            <el-button type="primary" @click="change(10)">上一步</el-button>
            <el-button type="primary" @click="change(13)">下一步</el-button>
          </div>
        </el-main>

      </el-container>
    </el-container>

  </div>
</template>

<script>
    //import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    import Ckeditor4 from "./ckeditor4";
    import Aside from "./aside";
    import Header from "./header";
    import MyMuban from "./myMuban";
    import Fabu from "./Fabu";
    import Recently from "./Recently";
    import html2canvas from "html2canvas";
    import Yitou from "./Yitou";
    import WeiTou from "./WeiTou";
    import MyFabu from "./MyFabu";
    import NewForm from "./NewForm";

    // import { maker } from '@form-create/element-ui'
    export default {
        name: 'app',
        data() {
            const item = {
                date: '2019-10-22',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };

            return {
                // screenHeight: document.body.clientHeight,
                index :0,
                //前置条件百分数初始值
                value2: 50,
                //ckeditor的内容
                cktext:"",
                // issave:false,
                //表格生成的图片地址
                dataURL: '',
                //选择接收的人员
                people:[],
                //投票的命名
                TPname:'',
                //设置投票级别
                jibie:0,
                JBtext:["一级(所有人都能看到其他人投票结果)","二级(除发布者可以看到所有人投票结果和汇总结果，其他人只能看到自己投票结果和汇总结果)",
                    "三级(除发布者可以看到所有人投票结果和汇总结果，其他人只能看到自己投票结果)","四级(发布者只能看到汇总结果，其他人只能看到自己投票结果)",
                    "五级(发布者只能看汇总结果，其他人阅后即焚)"],
                isshare:1,



                //表单实例对象
                zidingyi:{},
                //表单生成规则
                rule:[
                    {
                        type:'input',
                        field:'goods_name',
                        title:'商品名称'
                    },
                    {
                        type:'datePicker',
                        field:'created_at',
                        title:'创建时间'
                    },
                    {
                        type:"rate",
                        field:"rate",
                        title:"推荐级别",
                        value:3.5,
                        props:{
                            max: 5,
                            showText:true,
                            texts:["一级(所有人都能看到其他人投票结果)","二级(除发布者可以看到所有人投票结果和汇总结果，其他人只能看到自己投票结果和汇总结果)",
                                "三级(除发布者可以看到所有人投票结果和汇总结果，其他人只能看到自己投票结果)","四级(发布者只能看到汇总结果，其他人只能看到自己投票结果)",
                                "五级(发布者只能看汇总结果，其他人阅后即焚)"],
                        },

                        validate:[
                            {required:true,type:'number',min:2, message: '请大于2颗星',trigger:'change'}
                        ]
                    },
                    {
                        type:"checkbox",
                        title:"标签",
                        field:"label",
                        value:["1","2","3"],
                        options:[
                            {value:"1",label:"好用"},
                            {value:"2",label:"方便",disabled:false},
                            {value:"3",label:"实用",disabled:false},
                            {value:"4",label:"有效"},
                        ]
                    }
                ]

            };
        },
        components: {NewForm, MyFabu, WeiTou, Yitou, Recently, Fabu, MyMuban, Header, Aside, Ckeditor4},
        mounted() {

        },


        methods:{

            onSubmit(formData){
                alert(JSON.stringify(formData));
            },
            //改变index的值，就可以切换el-main的页面了
            change(msg){
                //新建模板时要把cktext内容清空，然后再跳转
                if(msg==4){
                    this.cktext=""
                }
                //但是当返回修改的时候不能清空
                if(msg==40){
                    msg=4
                }
                this.index = msg;


            },
            //推动条的值
            formatTooltip(val) {
                // alert(this.value2)
                console.log(this.value2)
                return val / 100+"%";

            },
            jibiechange(){
                console.log(this.jibie)

            },

            //当文本变化时，将ckeditor模板中获取的文本传过来，赋值给cktext
            cksave(msg){
                this.cktext = msg;
            },

            //转换图片
            toImage(msg) {

                html2canvas(this.$refs.imageWrapper,{
                    backgroundColor: "#eee"
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL = dataURL;
                    console.log(this.dataURL)

                });
                this.index = msg;

            },
            //改变成员
            changepeople(msg){
                this.people = msg
                console.log(this.people)
            }

        }

    }
</script>
<style>
  .el-header {
    background-color:#0576b7;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  #container{
    /*max-height: 800px;*/
    min-height: 600px;
    border: 1px solid #eee;
  }

</style>
