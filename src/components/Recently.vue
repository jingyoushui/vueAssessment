<template>

  <div style="width: 90%;padding-left: 5%">
    <div style="font-size: 18px ;padding-bottom: 10px">
      我的文档
    </div>
    <span style="color: grey">最近浏览</span>
    <el-row >
      <el-col :span="3" v-for="(o, index) in 6" :key="o" :offset="(index+1)%6 == 1 ? 0 : 1" style="margin-top: 8px">
        <el-card :body-style="{ padding: '0px' }">
          <img src="./../assets/1.png" class="image">
          <div style="padding: 2px;background-color: #0576b7">
            <span style="color: white">民主测评评分表</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-main style="height: 350px;margin-top: 20px;">
      <el-table :data="tableData"   height="300">

        <el-table-column prop="name" label="名称" width="420">
        </el-table-column>
        <el-table-column prop="from" label="来自" >
        </el-table-column>
        <el-table-column prop="date" label="最近打开" width="140">
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
    export default {
        name: "Recently",

        data() {
            const item = {
                date: '2019-10-22',
                from: '王小虎',
                name: '民主测评评分表'
            };
            return {
                tableData: Array(20).fill(item)
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
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
    display: block;

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

