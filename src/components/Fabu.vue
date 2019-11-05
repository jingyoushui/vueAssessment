<template>
  <div>
    <div style="font-size: 18px;padding-bottom: 10px;">选择要分享的人员</div>
    <tree-transfer
      :title=title
      :from_data='fromData'
      :to_data='toData'
      :defaultProps="{label:'label'}"
      @addBtn='add'
      @removeBtn='remove'
      :mode='mode'
      height='640px'

      filter openAll>
    </tree-transfer>

  </div>

</template>

<script>
    import treeTransfer from 'el-tree-transfer' // 引入

    export default {
        name:"Fabu",
        // props:["people"],
        data(){
            return{
                //用于保存所选的用户名称
                people1:[],
                //用于保存所选的用户id
                peopleid:[],
                title:["未选人员","已选人员"],
                mode: "transfer",
                list2:[],
                fromData:[

                ],
                toData:[]
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.getbm()
            })

        },
        methods:{

            // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
            changeMode() {
                if (this.mode == "transfer") {
                    this.mode = "addressList";
                } else {
                    this.mode = "transfer";
                }
            },
            // 监听穿梭框组件添加
            add(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                // console.log("fromData:", fromData);
                // console.log("toData:", toData);
                this.toData = toData;
                this.fromData = fromData;
                this.people1 = [];
                this.peopleid = [];
                for( let item of toData){
                    for( let item2 of item.children){
                        this.people1.push(item2.label);
                        this.peopleid.push(item2.yhhm)


                    }


                }
                var people = [];
                people.push({people:this.people1,peopleid:this.peopleid})
                 // console.log(people)
                this.$emit('changepeople', people)
            },
            // 监听穿梭框组件移除
            remove(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                // console.log("fromData:", fromData);
                // console.log("toData:", toData);
                // console.log("obj:", obj);
                this.people1 = [];
                this.peopleid = [];
                this.toData = toData;
                this.fromData = fromData;
                for( let item of toData){
                    for( let item2 of item.children){
                        this.people1.push(item2.label)
                        this.peopleid.push(item2.yhhm)

                    }

                }
                var people = [];
                people.push(this.people1)
                people.push(this.peopleid)
                // console.log(this.people1)
                this.$emit('changepeople', people)

            },

            //获取部门信息
            getbm(){
                var _this = this;
                _this.$axios.get("/local/getdmb").then(resp=>{
                    var list = resp.data.list;
                    // console.log(list)
                    list.map(function (l,index) {
                        let children = []
                        //根据部门获取员工信息
                         _this.$axios.get("/local/getYh?yhbm="+l.dmbh).then(res=>{
                            var list2 = res.data.list;
                            // console.log(list2)

                            list2.map(function (l2,i) {
                                children.push({
                                    id:index+"-"+l2.yhbh,
                                    pid:index+1,
                                    label:l2.yhmc,
                                    yhhm:l2.yhbh,
                                },)
                            })
                            _this.fromData.push({
                                id: index+1,
                                pid: 0,
                                label: l.dmms,
                                children: children,
                            },)
                              // console.log(JSON.stringify(_this.fromData))
                        })


                    })


                })

            },


        },
        components:{ treeTransfer } // 注册
    }
</script>

<style>
</style>
