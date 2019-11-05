<template>
  <div >
  <div v-if="index3==0">
    <!--    右键菜单的内容-->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu" style="width: 200px;">
      <li class="el-icon-share" style="font-size: 17px;" @click="setshare()"><span
        style="font-size: 14px;padding-left: 10px;">设为共享</span></li>
      <li class="el-icon-view" style="font-size: 17px;" @click="setme()"><span
        style="font-size: 14px;padding-left: 10px;">设为私有</span></li>
      <li class="el-icon-delete" style="font-size: 17px;" @click="setdelect()"><span
        style="font-size: 14px;padding-left: 10px;">删除模板</span></li>
    </ul>
    <div style="font-size: 18px ;padding-bottom: 20px" v-if="mubanlist!=[]">
      私有模板
    </div>
    <el-row>
      <el-col :span="5" v-for="(o, index) in mubanlist" :key="o.id" :offset="(index+1)%4 == 1 ? 0 : 1" style="margin-top: 8px">
        <el-card :body-style="{ padding: '0px' }">
          <!--        @contextmenu.prevent.native="openMenu($event)"用来设置右键菜单-->
          <el-button type="text" @click="usemuban(o.id,o.type)"   @contextmenu.prevent.native="openMenu($event,o.id)">
            <div style="height: 220px;background-color: #eee">

              <img :src="o.imageurl" class="image">

            </div>
          </el-button>
          <div style="padding: 2px;background-color: #0576b7">
            <span style="color: white" >{{o.title ? o.title:"无标题"}}</span>

            <div class="bottom clearfix">
              <time class="time">{{ o.createtime }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="font-size: 18px ;padding-bottom: 20px;padding-top: 20px;" v-if="mubanlist_share!=[]">
      共享模板
    </div>
    <el-row>
      <el-col :span="5" v-for="(o, index) in mubanlist_share" :key="o.id" :offset="(index+1)%4 == 1 ? 0 : 1" style="margin-top: 8px">
        <el-card :body-style="{ padding: '0px' }">
          <!--        @contextmenu.prevent.native="openMenu($event)"用来设置右键菜单-->
          <el-button type="text" @click="usemuban(o.id)" @contextmenu.prevent.native="openMenu($event,o.id)">
            <div style="height: 220px;background-color: #eee">

              <img :src="o.imageurl" class="image">

            </div>
          </el-button>
          <div style="padding: 2px;background-color: #0576b7">
            <span style="color: white" >{{o.title ? o.title:"无标题"}}</span>

            <div class="bottom clearfix">
              <time class="time">{{ o.createtime }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
    <div v-if="index3==1">
      <el-button type="text" @click="back()"><i class="el-icon-back" style="font-size: 28px;color: grey"></i></el-button>
      <AlterForm v-bind:form1="list" v-on:changeIndex="changeindex($event)" ></AlterForm>
    </div>
  </div>
</template>

<script>
    import qs from 'qs';
    import AlterForm from "./AlterForm";
    export default {

        name: "MyMuban",
        data() {
            return {
                index3:0,
                list:{},
                //是否开启右键菜单
                visible: false,
                top: 0,
                left: -10,
                //私有模板
                mubanlist:[],
                //共享模板
                mubanlist_share:[],
                //右键的id
                right_id:0,
                menuData:{
                    menuName:'name1',
                    axios:{x:null, y:null},
                    menulists:[
                        {fnHandler:'refresh',icoName:'el-icon-setting',btnName:'刷新'},
                        {fnHandler:'add',icoName:'el-icon-more',btnName:'添加'},
                        {fnHandler:'del',icoName:'el-icon-delete',btnName:'删除'},
                    ],
                },
            };
        },
        mounted(){
            this.getMuBanByUserAndIsshare();
            this.getMuBanByUserAndNotshare();
        },
        components: {AlterForm},
        methods: {
            usemuban(id,type) {
                if(type==0){
                    this.findform(id);
                }


            },
            //根据id查找出表单的内容
            findform(id){
                var parm = qs.stringify({
                    id:id,

                });
                this.$axios.post("/local/findform",parm).then(res=>{
                     this.list = res.data.list;


                })
                this.index3=1;
            },
            openMenu(e,id) {
                const menuMinWidth = 105
                const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                const offsetWidth = this.$el.offsetWidth // container width
                const maxLeft = offsetWidth - menuMinWidth // left boundary
                const left = e.clientX - offsetLeft // 15: margin right

                if (left > maxLeft) {
                    this.left = maxLeft+200
                } else {
                    this.left = left+200
                }

                this.top = e.clientY + 10  // fix 位置bug
                this.visible = true
                this.right_id = id;
            },

            closeMenu() {
                this.visible = false
            },
            setshare() {
                this.updateIsshare(1,this.right_id)
                this.$message('共享成功')
                this.getMuBanByUserAndIsshare();
                this.getMuBanByUserAndNotshare();
            },
            setme() {
                this.updateIsshare(0,this.right_id)
                this.$message('私有成功')
                this.getMuBanByUserAndIsshare();
                this.getMuBanByUserAndNotshare();
            },
            setdelect() {
                this.deleteMuban(this.right_id)
                this.$message('删除成功')
                this.getMuBanByUserAndIsshare();
                this.getMuBanByUserAndNotshare();

            },
            updateIsshare(isshare,id){
                var parm = qs.stringify({
                    isshare : isshare,
                    id:id,

                });
                this.$axios.post("/local/updateIsshare",parm).then(res=>{

                })
            },
            deleteMuban(id){
                var parm = qs.stringify({
                    id:id,

                });
                this.$axios.post("/local/deleteMuban",parm).then(res=>{

                })
                this.$axios.post("/local/deleteform",parm).then(res=>{

                })
            },
            getMuBanByUserAndNotshare(){
                var url="/local/getmuban?user=1&isshare=0"

                this.$axios.get(url).then(resp => {
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        var size = data.count;
                        this.mubanlist = data.list;
                        // console.log(this.mubanlist)
                    }

                })
            },
            getMuBanByUserAndIsshare(){
                var url="/local/getmuban?user=1&isshare=1"

                this.$axios.get(url).then(resp => {
                    if (resp && resp.status == 200) {
                        var data = resp.data;
                        var size = data.count;
                        this.mubanlist_share = data.list;

                    }

                })
            },
            back(){
                this.index3 = 0;
            },
            changeindex(msg){
                this.$emit("NewIndex",msg)

            },



        },
        watch: {
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }
        },
    }
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 3px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    /*display: block;*/

  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 10;
    position: fixed;
    list-style-type: none;

    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  }

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
  }

</style>



