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
          <div style="height: 30px;text-align: center;font-size: 24px;">选择一种模板格式</div>
          <el-row style=" margin-top:40px;">
            <el-col :span="8" v-for="(o, index) in createmuban"  :offset="(index+1)%4 == 1 ? 3 : 3" :key="index" style="margin-top: 8px">
              <el-card :body-style="{ padding: '0px' }">
                <!--        @contextmenu.prevent.native="openMenu($event)"用来设置右键菜单-->
                <el-button type="text" @click="change(o.i)">
                  <div style="background-color: #eee">

                    <img v-bind:src="o.imgurl" class="image" height="250px;" width="100%;" >

                 </div>
                </el-button>
                <div style="padding: 2px;background-color: #0576b7">
                  <span style="color: white">{{o.title}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>

        <el-main v-if="index=='4-1'">
          <el-button type="text" @click="back()"><i class="el-icon-back" style="font-size: 28px;color: grey"></i></el-button>
          <el-card class="box-card"  style="width: 100%;min-height: 150px;margin-top: 10px;">
            <div>

            </div>
            <el-input class="radio1"
                      placeholder="请输入表单主题"
                      v-model="title"
                      clearable
                      style="width: 100%;font-size: 28px;">
            </el-input>
            <el-input class="textarea"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入表单描述"
                      v-model="miaoshu"
                      style="width: 100%;font-size: 16px;margin-top: 10px;">
            </el-input>
          </el-card>
          <el-card class="box-card"  style="width: 100%;min-height: 150px;margin-top: 10px;">
            <ckeditor4 v-bind:cktext="cktext" v-on:ckinput="cksave($event)" ></ckeditor4>
          </el-card>

          <div style="text-align: center; font-size: 14px ;padding-top:20px;background-color: white">
            <el-button type="primary" @click="change(12)">预览发布</el-button>
<!--            <el-button type="primary"  style="margin-right: 200px;background-color: #545c64" @click="change(12)">保存模板</el-button>-->
<!--            <el-button type="primary"  style="background-color: #545c64" @click="change(10)">立即发布</el-button>-->
          </div>
        </el-main>
        <el-main v-if="index=='4-2'">
          <el-button type="text" @click="back()"><i class="el-icon-back" style="font-size: 28px;color: grey"></i></el-button>
          <NewForm v-on:NewIndex="change($event)" ref="newform"></NewForm>

        </el-main>
<!--v-bind用于绑定传值，由MyMuban模板接收并使用-->
        <el-main v-if="index==5">
          <MyMuban v-on:NewIndex="change($event)" ></MyMuban>
        </el-main>

        <el-main v-if="index==6">

        </el-main>
        <el-main v-if="index==7">
        </el-main>

        <el-main v-if="index==10">
          <Fabu  v-on:changepeople="changepeople($event)" ></Fabu>
          <div style="text-align: center;padding-top: 10px;">
            <el-button type="primary" @click="change(4)">上一步</el-button>
            <el-button type="primary" @click="change(11)">下一步</el-button>
          </div>
        </el-main>

        <el-main v-if="index==11">
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

        <el-main v-if="index==12">
<!--          <slot>中是ckeditor中的html,需要把它转换成图片显示出来比较直观-->

          <el-card class="box-card"  >
            <div style="font-size: 25px;text-align: center">
              {{title}}
            </div>

            <div style="color: grey;">
              {{miaoshu}}
            </div>
          </el-card>

          <el-card class="box-card" style="margin-top: 5px;"  >
          <div class="imageWrapper" ref="imageWrapper">
            <slot>
              <div v-html="cktext"></div>
            </slot>
          </div>
          </el-card>
          <div style="text-align: center;margin-top: 5px;">
            <el-button type="primary" @click="change('4-1')">返回修改</el-button>
            <el-button type="primary"  @click="change(10)">立即发布</el-button>
            <el-button type="primary" @click="toImage()">保存模板</el-button>
          </div>
        </el-main>

        <el-main v-if="index==13">
          <div style="font-size: 20px;text-align: center">预览</div>

          <div v-html="cktext"></div>
<!--          <div style="font-size: 15px;">投票标题：{{TPname}}</div>-->
          <div style="font-size: 15px;">接收者： {{people}}</div>
          <div style="font-size: 15px;">接收者id： {{peopleid}}</div>
          <div style="font-size: 15px;" >级别：{{JBtext[parseInt(jibie)-1]}},{{jibie}}</div>
          <div style="font-size: 15px"> 前置条件：{{value2}}%</div>
          <div style="text-align: center;padding-top: 10px">
            <el-button type="primary" @click="change(11)">返回修改</el-button>
            <el-button type="primary" @click="publish()">确定发布</el-button>
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
    import qs from 'qs';

    // import { maker } from '@form-create/element-ui'
    export default {

        data() {
            const item = {
                date: '2019-10-22',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };


            return {

                //新保存模板id
                mubanid:0,
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
                peopleid:[],
                //投票的命名
                // TPname:'',
                //设置投票级别
                jibie:0,
                JBtext:["一级(所有人都能看到其他人投票结果)","二级(除发布者可以看到所有人投票结果和汇总结果，其他人只能看到自己投票结果和汇总结果)",
                    "三级(除发布者可以看到所有人投票结果和汇总结果，其他人只能看到自己投票结果)","四级(发布者只能看到汇总结果，其他人只能看到自己投票结果)",
                    "五级(发布者只能看汇总结果，其他人阅后即焚)"],
                isshare:1,

                createmuban:[
                    {imgurl:"../../static/img/ckeditor.png",title:"富文本编译器",i:"4-1"},
                    {imgurl:"../../static/img/newform1.png",title: "自定义表单(推荐)",i:"4-2"}
                ],
                title:"",
                miaoshu:"",


            };
        },
        components: {NewForm, MyFabu, WeiTou, Yitou, Recently, Fabu, MyMuban, Header, Aside, Ckeditor4},
        mounted() {


        },


        methods:{




            onSubmit:function (formData,fApi) {
                alert(JSON.stringify(formData));
            },
            mounted: function($f){
                //TODO
                //TODO 表单创建成功,可在此操作表单
            },
            //改变index的值，就可以切换el-main的页面了
            change(msg){
                //新建模板时要把cktext内容清空，然后再跳转
                if(msg==4){
                    this.cktext=""
                    this.title=''
                    this.miaoshu=''
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
            toImage() {

                html2canvas(this.$refs.imageWrapper,{
                    scale:2,
                    logging: true, // 启用日志记录以进行调试 (发现加上对去白边有帮助)
                    allowTaint: true, // 否允许跨源图像污染画布
                    backgroundColor: null, // 解决生成的图片有白边
                    useCORS: true // 如果截图的内容里有图片,解决文件跨域问题
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL = dataURL;
                    this.saveform();

                });
                // this.index = msg;
                this.$message('模板保存成功,在已有模板中可以查看');

            },
            //保存数据到数据库
            saveform(){
                var parm = qs.stringify({
                    user:1,
                    title:this.title,
                    miaoshu: this.miaoshu,
                    content:JSON.stringify(this.cktext),
                    isshare:1,
                    imageurl:this.dataURL,
                    type:1,//富文本形式
                });
                this.$axios.post("/local/addmuban",parm).then(resp=>{
                    this.mubanid = resp.data.id
                    console.log(this.mubanid)
                })

            },
            //改变成员
            changepeople(msg){
                this.people = msg[0].people
                console.log(this.people)
                this.peopleid = msg[0].peopleid
                console.log(this.peopleid)
            },

            //
            back(){
                this.index=4;
            },
            //获取NewForm中的模板id
            MuBanId(msg){
                this.mubanid = msg;
                console.log(this.mubanid)
            },
            //发布
            publish(){
               // this.$refs.newform.toImage();
            },

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
    min-height: 1000px;
    border: 1px solid #eee;
  }
  .radio1 .el-input__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
  }
  .textarea .el-textarea__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
  }

</style>
