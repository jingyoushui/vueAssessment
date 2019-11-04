<template>
  <div>
<div v-if="index2==0">
    <el-card class="box-card"  style="width: 80%;margin-left: 10%;min-height: 150px;margin-top: 10px;">
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
    <el-card class="box-card" style="width: 80%;margin-left: 10%;min-height: 150px;margin-top: 10px;" v-for="i in num"
             :id="i" :key="i">
      <div>
        <el-tag >{{i}}</el-tag>
        <el-input
          placeholder="请输入内容"
          v-model="inputBT[i-1]"
          clearable
          style="width: 75%;">
        </el-input>

        <el-select v-model="optiontype[i-1]" placeholder="请选择" style="width: 18%;float:right;">
          <el-option
            v-for="item in options"
            :key="item.val"
            :label="item.label"
            :value="item.val">
          </el-option>
        </el-select>
      </div>
      <div style="width: 100%;height: 0;margin-top:5px;border: solid 0.5px lightgrey"></div>
      <div v-if="optiontype[i-1]=='input'" style="color: grey;margin-top: 20px;">
        待填写者写入文本
      </div>

      <div v-if="optiontype[i-1]=='InputNumber'" style="color: grey;margin-top: 20px;">
        待填写者写入数字
      </div>
      <div class="radio" v-if="optiontype[i-1]=='radio'" style="color: grey;margin-top: 20px;">

        <div v-for="j in radionum[i-1]" :id="j">
          ○
          <el-input
            placeholder="请输入选项名"
            v-model="radioname[i-1][j-1]"
            clearable
            style="width: 80%;">
          </el-input>

        </div>
        <div>
          <el-button type="text" @click="addradio(i-1)"><i class="el-icon-circle-plus-outline"
                                                         style="font-size: 20px;margin-top: 10px"></i></el-button>
          <el-button type="text" @click="deleteradio(i-1)"><i class="el-icon-remove-outline"
                                                            style="font-size: 20px;margin-top: 10px"></i></el-button>
        </div>

      </div>

      <div class="radio" v-if="optiontype[i-1]=='checkbox'" style="color: grey;margin-top: 20px;">

        <div v-for="j in checkboxnum[i-1]" :id="j">
          □
          <el-input
            placeholder="请输入选项名"
            v-model="checkboxname[i-1][j-1]"
            clearable
            style="width: 80%;">
          </el-input>

        </div>
        <div>
          <el-button type="text" @click="addcheckbox(i-1)"><i class="el-icon-circle-plus-outline"
                                                            style="font-size: 20px;margin-top: 10px"></i></el-button>
          <el-button type="text" @click="deletecheckbox(i-1)"><i class="el-icon-remove-outline"
                                                               style="font-size: 20px;margin-top: 10px"></i></el-button>
        </div>

      </div>
      <div class="radio" v-if="optiontype[i-1]=='select'" style="color: grey;margin-top: 20px;">

        <div v-for="j in selectnum[i-1]" :id="j">
          {{j}}、
          <el-input
            placeholder="请输入选项名"
            v-model="selectname[i-1][j-1]"
            clearable
            style="width: 80%;">
          </el-input>

        </div>
        <div>
          <el-button type="text" @click="addselect(i-1)"><i class="el-icon-circle-plus-outline"
                                                          style="font-size: 20px;margin-top: 10px"></i></el-button>
          <el-button type="text" @click="deleteselect(i-1)"><i class="el-icon-remove-outline"
                                                             style="font-size: 20px;margin-top: 10px"></i></el-button>
        </div>

      </div>


    </el-card>
    <div style="text-align: right;width:80%;margin-left: 10%;margin-top: 10px;">
      <el-tooltip class="item" effect="light" content="添加新组件" placement="top">
        <el-button type="text" @click="adddiv" style="font-size: 30px;"><i class="el-icon-circle-plus"></i></el-button>
      </el-tooltip>

      <el-tooltip class="item" effect="light" content="删除组件" placement="top">
        <el-button type="text" @click="delectdiv" style="font-size: 30px;"><i class="el-icon-remove"></i></el-button>
      </el-tooltip>


    </div>
    <div style="text-align: center;">
      <el-button type="primary" @click="tijiao()">预览发布</el-button>
    </div>
  </div>
  <div v-if="index2==1">
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
          <form-create v-model="yulanform" :rule="formrule" :option="option" @on-submit="onSubmit1" style="width: 80%;margin-top: 20px;"></form-create>
        </slot>
      </div>
    </el-card>


    <div style="text-align: center;padding-top: 5px;">
      <el-button type="primary" @click="changeindex2(0)">返回修改</el-button>
      <el-button type="primary" @click="changeindex(10)">立即发布</el-button>
      <el-button type="primary" @click="toImage()">保存模板</el-button>
    </div>
  </div>

</div>
</template>

<script>
    import html2canvas from "html2canvas";
    import qs from 'qs';


    export default {
        name: "AlterForm",
        props: ["form1"],
        data:function() {
            return {
                //新保存模板id
                mubanid:0,
                list:null,
                index2:0,
                title:'',
                miaoshu:'',
                //卡片的个数
                num: 1,
                //输入框
                inputBT: [],
                //下拉选择框
                options: [{
                    val: 'input',
                    label: '文本'
                }, {
                    val: 'InputNumber',
                    label: '数字'
                }, {
                    val: 'radio',
                    label: '单选按钮'
                }, {
                    val: 'checkbox',
                    label: '多选按钮'
                }, {
                    val: 'select',
                    label: '下拉选择'
                }, {
                    val: 'rate',
                    label: '评分'
                }],
                //组件的类型
                optiontype: [],

                //下面待优化
                //单选按钮的选项个数
                radionum: [2],
                //单选按钮名字
                radioname: [[]],

                //多选按钮的选项个数
                checkboxnum: [2],
                //多选按钮名字
                checkboxname: [[]],

                //下拉框的选项个数
                selectnum: [2],
                //下拉框名字
                selectname: [[]],

                //生成的表单规则
                formrule:[],
                //表单实例对象
                yulanform:{},

                option:{
                    submitBtn: {
                        show: false,
                    },

                },
                dataURL:"",
            }
        },
        watch:{
            form1:function() {
                this.list = this.form1;
                this.title = this.form1.title;
                this.miaoshu = this.form1.miaoshu;
                this.num = this.form1.num
                this.inputBT = this.form1.inputbt
                this.checkboxname = JSON.parse(this.form1.checkboxname)
                this.checkboxnum = this.form1.checkboxnum.map(Number)
                this.optiontype = this.form1.optiontype
                this.radioname = JSON.parse(this.form1.radioname)
                this.radionum = this.form1.radionum.map(Number)
                this.selectname = JSON.parse(this.form1.selectname)
                this.selectnum = this.form1.selectnum.map(Number)
                this.mubanid = this.form1.id
            }
        },
        mounted(){


        },
        methods: {
            //增加组件
            adddiv() {
                this.num += 1;
                this.inputBT.push()
                this.radionum.push(2);
                this.radioname.push([])
                this.checkboxnum.push(2);
                this.checkboxname.push([])
                this.selectnum.push(2);
                this.selectname.push([]);


            },
            //删除组件
            delectdiv() {
                this.num -= 1;
                this.inputBT.pop();
                this.radionum.pop();
                this.radioname.pop();
                this.checkboxnum.pop();
                this.checkboxname.pop()
                this.selectnum.pop();
                this.selectname.pop();
            },
            //增加单选按钮选项，实时更新数组用$set
            addradio(i) {
                this.$set(this.radionum, i, this.radionum[i] + 1)
                // this.radionum[i] +=1;

            },
            deleteradio(i) {
                this.$set(this.radionum, i, this.radionum[i] - 1)
            },

            //增加多选按钮选项
            addcheckbox(i) {
                this.$set(this.checkboxnum, i, this.checkboxnum[i] + 1)
                // this.radionum[i] +=1;

            },
            deletecheckbox(i) {
                this.$set(this.checkboxnum, i, this.checkboxnum[i] - 1)
            },

            //增加下拉框选项
            addselect(i) {
                this.$set(this.selectnum, i, this.selectnum[i] + 1)
                // this.radionum[i] +=1;

            },
            deleteselect(i) {
                this.$set(this.selectnum, i, this.selectnum[i] - 1)
            },

            tijiao() {
                this.formrule=[];
                for(let i=0;i<this.inputBT.length;i++){
                    console.log("optiontype:"+this.optiontype[i])

                    if(this.optiontype[i]=='radio'){

                        var h = (this.radioname[i].length)

                        console.log("this.radioname:"+this.radioname[i])

                        var options=[];
                        for(var j =0;j<h;j++){
                            options.push(
                                {value:this.radioname[i][j],label:this.radioname[i][j]},
                            )


                        }


                        this.formrule.push({
                            type:this.optiontype[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            options:options,

                        },)



                    }else if(this.optiontype[i]=='checkbox'){
                        var h = (this.checkboxname[i].length)

                        var options=[];
                        for(var j =0;j<h;j++){
                            options.push(
                                {value:this.checkboxname[i][j],label:this.checkboxname[i][j]},
                            )


                        }


                        this.formrule.push({
                            type:this.optiontype[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            options:options,
                            value:[],

                        },)

                    }else if(this.optiontype[i]=='select'){
                        let h = (this.selectname[i].length)//3

                        let options=[];
                        for(let j =0;j<h;j++){
                            options.push(
                                {value:this.selectname[i][j],label:this.selectname[i][j]},
                            )


                        }


                        this.formrule.push({
                            type:this.optiontype[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                            options:options,

                        },)

                    }else {
                        this.formrule.push({
                            type:this.optiontype[i],
                            field:this.inputBT[i],
                            title:this.inputBT[i],
                        },)
                        console.log(this.formrule)

                    }
                }
                 this.index2=1;


            },
            toImage() {

                html2canvas(this.$refs.imageWrapper,{
                    backgroundColor: "#eee"
                }).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    this.dataURL = dataURL;
                    this.alterform()

                });
                // this.index = msg;
                this.$message('模板保存成功,在已有模板中可以查看');



            },
            //保存表单信息
            alterform(){
                var parm = qs.stringify({
                    user:1,
                    title:this.title,
                    miaoshu: this.miaoshu,
                    content:JSON.stringify(this.formrule),
                    isshare:0,
                    imageurl:this.dataURL,
                    type:0,
                });
                // this.$axios.post("/local/addmuban",parm).then(resp=>{
                //     this.mubanid = resp.data.id
                //     console.log(this.mubanid)
                //     this.alterform();
                // })

            },
            //增加表单的内容
            alterform(){
                // console.log(this.inputBT)
                var parm = qs.stringify({
                    id :this.mubanid,
                    num:this.num,
                    inputbt: (this.inputBT),
                    optiontype: (this.optiontype),
                    radionum:(this.radionum),
                    radioname: JSON.stringify(this.radioname),
                    checkboxnum: (this.checkboxnum),
                    checkboxname: JSON.stringify(this.checkboxname),
                    selectnum: (this.selectnum),
                    selectname: JSON.stringify(this.selectname),

                }, { indices: false });
                console.log(this.radioname)
                // this.$axios.post("/local/addform",parm).then(res=>{
                //
                // })
            },
            onSubmit1(formData){
                alert(JSON.stringify(formData));
            },
            changeindex2(msg){
                this.index2=msg;
            },
            changeindex(msg){
                this.$emit("NewIndex",msg)
            },
            // myform(list){
            //     console.log("接到了")
            // }
        }
    }
</script>

<style>
  .radio .el-input__inner {
    width: 220px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
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
