<template>

  <div>

      <el-row v-for="(i, index) in 8" :key="i" :gutter="20" style="padding-top: 10px;">
        <el-col :span="24" >
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span>民主测评表</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
    export default {
        name: "MyFabu",
        data() {
            return {
                currentDate: new Date().toLocaleString()
            };
        },
    }
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
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
