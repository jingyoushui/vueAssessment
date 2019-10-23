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
          <ckeditor4 v-bind:value="cktext" v-on:ckinput="cksave($event)" ></ckeditor4>
          <el-header style="text-align: center; font-size: 14px ;background-color: white">
            <el-button type="primary"  style="margin-right: 200px;background-color: #545c64" @click="changesave(3)">保存模板</el-button>
            <el-button type="primary"  style="background-color: #545c64" @click="change(10)">立即发布</el-button>
          </el-header>
        </el-main>
<!--v-bind用于绑定传值，由MyMuban模板接收并使用-->
        <el-main v-if="index==2">
          <MyMuban v-bind:imgsrc="dataURL" v-bind:cktext="cktext"></MyMuban>
        </el-main>

        <el-main v-if="index==3">
<!--          <slot>中是ckeditor中的html,需要把它转换成图片显示出来比较直观-->

          <div class="imageWrapper" ref="imageWrapper">
            <slot>
              <div v-html="cktext"></div>
            </slot>
          </div>
          <div style="text-align: center;">
            <el-button type="primary" @click="change(1)">返回修改</el-button>
            <el-button type="primary" @click="toImage()">确定保存</el-button>
          </div>
        </el-main>

        <el-main v-if="index==4">
          <div v-html="cktext"></div>
          <div> </div>
          <div>{{value2}}</div>
        </el-main>

        <el-main v-if="index==10">
          <Fabu v-bind:people="people" v-on:changepeople="changepeople($event)"></Fabu>
          <div style="text-align: center;">
            <el-button type="primary" @click="change(1)">上一步</el-button>
            <el-button type="primary" @click="change(11)">下一步</el-button>
          </div>
        </el-main>

        <el-main v-if="index==11">
          <div style="width: 80%;padding-top: 20px;padding-left: 10%">
            <span style="font-size: 20px;">设置前置条件</span>
            <div style="font-size: 14px;padding-top: 5px;color: gray;padding-bottom: 20px;">设定启动“汇总测评情况”的前置条件，明确X%用户完成投票任务方可汇总情况。</div>
            <el-slider v-model="value2" :format-tooltip="formatTooltip"></el-slider>
          </div>
          <div style="text-align: center;width: 80%;padding-top: 50px;padding-left: 10%">
            <el-button type="primary" @click="change(10)">上一步</el-button>
            <el-button type="primary" @click="change(11)">下一步</el-button>
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
                value2: 50,
                cktext:"",
                issave:false,
                dataURL: '',
                people:[],

            };
        },
        components: {Recently, Fabu, MyMuban, Header, Aside, Ckeditor4},
        mounted () {
            // const that = this
            // window.onresize = () => {
            //     return (() => {
            //         window.screenHeight = document.body.clientHeight
            //         that.screenHeight = window.screenHeight
            //     })()
            // }
        },
        // watch: {
        //     screenHeight (val) {
        //         // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        //         if (!this.timer) {
        //             // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        //             this.screenHeight = val
        //             this.timer = true
        //             let that = this
        //             setTimeout(function () {
        //                 // 打印screenWidth变化的值
        //                 console.log(that.screenHeight)
        //                 that.timer = false
        //             }, 400)
        //         }
        //     }
        // },

        methods:{
            //改变index的值，就可以切换el-main的页面了
            change(msg){
                this.index = msg;
            },
            //点击保存模板时，先判断有没有点击编辑框的保存按钮，点击之后才切换页面
            changesave(msg){
                if(!this.issave){
                    alert("请点击编辑区上方保存按钮")
                }else{
                    this.index = msg;
                    this.issave = false;
                }

            },
            //推动条的值
            formatTooltip(val) {
                // alert(this.value2)
                console.log(this.value2)
                return val / 100+"%";

            },
            //点击保存按钮时，将ckeditor模板中获取的文本传过来，赋值给cktext
            cksave(msg){
                this.cktext = msg;
                this.issave = true;
            },
            //转换图片
            toImage() {
                html2canvas(this.$refs.imageWrapper,{
                    backgroundColor: "#eee"
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL = dataURL;
                    console.log(this.dataURL)

                });
                this.index = 2;

            },
            //改变成员
            changepeople(msg){
                console.log("okk")
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
