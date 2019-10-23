<template>
  <el-row >
    <el-col :span="5" v-for="(o, index) in 8" :key="o" :offset="(index+1)%4 == 1 ? 0 : 1" style="margin-top: 8px">
      <el-card :body-style="{ padding: '0px' }">
        <el-button type="text" @click="usemuban()">
          <div style="height: 220px;background-color: #eee">

          <img :src="imgsrc" class="image">

        </div>
        </el-button>
        <div style="padding: 2px;background-color: #0576b7">
          <span style="color: white">民主测评评分表</span>

          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "MyMuban",
        props:["imgsrc","cktext"],
        data() {
            return {
                currentDate: new Date().toLocaleString()
            };
        },
        methods:{
            usemuban(){
                alert(this.cktext)

            },

        }
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
</style>

