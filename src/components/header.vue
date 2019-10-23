<template>
  <el-container>
  <el-header style="font-size: 14px ;color: whitesmoke;background-color:#545c64">


    <div style="float: right">
      <el-dropdown>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-top: 10px;float:right;"></el-avatar>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown></div>
    <div style="float: right;padding-right: 10px;">
      <el-dropdown>
        <el-badge :value="200" :max="99" class="item">
          <i class="el-icon-message-solid" style="color: white;font-size: 25px;"></i>
        </el-badge>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
    <div style="float: right;padding-right: 10px;">王小虎</div>
  </el-header>
  </el-container>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .item {
    margin-top: 15px;
    margin-right: 20px;
  }
</style>
