<template>
  <div style="width: 90%;padding-left: 5%">
    <div style="font-size: 18px ;padding-bottom: 10px">
      我的投票
    </div>
    <span style="color: grey">还未投票</span>
    <el-main style="height: 650px;margin-top: 20px;">
      <el-table
        :data="tableData"
        height="600"
        style="width: 100%"
        :default-sort = "{prop: 'FBdate', order: 'descending'}">
        <el-table-column prop="id" label="id"   sortable width="100">
        </el-table-column>
        <el-table-column prop="name" label="标题" >
        </el-table-column>
        <el-table-column prop="from" label="来自" width="100">
        </el-table-column>
        <el-table-column prop="FBdate" label="发布时间"   sortable width="100">
        </el-table-column>
        <el-table-column prop="level" label="级别"   sortable width="80" >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
    export default {
        name: "WeiTou",
        data() {
            const item = {
                id:2,
                FBdate: '2019-10-22',
                from: '李白',
                name: '民主测评评分表',
                level:3,

            };
            return {
                tableData: Array(20).fill(item)
            }
        },
        methods:{
            handleClick(msg){
                alert(msg.id)
            }
        }
    }
</script>

<style scoped>

</style>
