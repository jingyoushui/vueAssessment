<template>
  <div>
    <!--    右键菜单的内容-->
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu" style="width: 200px;">
      <li class="el-icon-share" style="font-size: 17px;" @click="setshare"><span
        style="font-size: 14px;padding-left: 10px;">设为共享</span></li>
      <li class="el-icon-view" style="font-size: 17px;" @click="setme"><span
        style="font-size: 14px;padding-left: 10px;">设为私有</span></li>
      <li class="el-icon-delete" style="font-size: 17px;" @click="setdelect"><span
        style="font-size: 14px;padding-left: 10px;">删除模板</span></li>
    </ul>
    <div style="font-size: 18px ;padding-bottom: 20px">
      私有模板
    </div>
    <el-row>
      <el-col :span="5" v-for="(o, index) in 8" :key="o" :offset="(index+1)%4 == 1 ? 0 : 1" style="margin-top: 8px">
        <el-card :body-style="{ padding: '0px' }">
          <!--        @contextmenu.prevent.native="openMenu($event)"用来设置右键菜单-->
          <el-button type="text" @click="usemuban()" @contextmenu.prevent.native="openMenu($event)">
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

    <div style="font-size: 18px ;padding-bottom: 20px">
      共享模板
    </div>
    <el-row>
      <el-col :span="5" v-for="(o, index) in 8" :key="o" :offset="(index+1)%4 == 1 ? 0 : 1" style="margin-top: 8px">
        <el-card :body-style="{ padding: '0px' }">
          <!--        @contextmenu.prevent.native="openMenu($event)"用来设置右键菜单-->
          <el-button type="text" @click="usemuban()" @contextmenu.prevent.native="openMenu($event)">
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
  </div>
</template>

<script>
    export default {
        name: "MyMuban",
        props: ["imgsrc", "cktext"],
        data() {
            return {
                currentDate: new Date().toLocaleString(),
                //是否开启右键菜单
                visible: false,
                top: 0,
                left: -10
            };
        },
        methods: {
            usemuban() {
                alert(this.cktext)

            },
            openMenu(e) {
                const menuMinWidth = 105
                const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                console.log("1:" + offsetLeft)
                const offsetWidth = this.$el.offsetWidth // container width
                console.log("2:" + offsetWidth)
                const maxLeft = offsetWidth - menuMinWidth // left boundary
                const left = e.clientX - offsetLeft // 15: margin right

                if (left > maxLeft) {
                    this.left = maxLeft + 100
                } else {
                    this.left = left + 100
                }

                this.top = e.clientY + 10  // fix 位置bug
                this.visible = true
            },
            closeMenu() {
                this.visible = false
            },
            setshare() {
                alert("共享成功")
            },
            setme() {
                alert("私有成功")
            },
            setdelect() {
                alert("删除成功")
            }


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
    z-index: 3000;
    position: absolute;
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



