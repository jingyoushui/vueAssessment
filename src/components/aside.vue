<template>
  <el-aside width="200px" style="background-color:#545c64 ">
    <el-menu
      default-active="0"
      :default-openeds="['1', '3']"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="width: 200px;"
      @select="handleSelect">
      <el-submenu index="0">
        <template slot="title"><i class="el-icon-message" style="color:whitesmoke;"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item index="0">首页</el-menu-item>
        </el-menu-item-group>

      </el-submenu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu" style="color:whitesmoke;"></i>投票管理</template>
        <el-menu-item-group>
          <el-menu-item index="1">已投票</el-menu-item>
          <el-menu-item index="2">未投票</el-menu-item>
          <el-menu-item index="3">我的发布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message" style="color:whitesmoke;"></i>模板管理</template>
        <el-menu-item-group>
<!--          <template slot="title">分组一</template>-->
          <el-menu-item index="4">新建模板</el-menu-item>
          <el-menu-item index="5">已有模板</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting" style="color:whitesmoke;"></i>投票汇总</template>
        <el-menu-item-group>
          <el-menu-item index="6">选项1</el-menu-item>
          <el-menu-item index="7">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>


    export default {
        name: "Aside",
        data(){

            return{

            }

        },



        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
               this.changeIndex(keyPath[1])
            },
            changeIndex:function(key) {
                this.$emit("IndexChanged",key)
            }
        }
    }
</script>

<style scoped>

</style>
