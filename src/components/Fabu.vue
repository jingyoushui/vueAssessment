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
      height='540px'

      filter openAll>
    </tree-transfer>

  </div>

</template>

<script>
    import treeTransfer from 'el-tree-transfer' // 引入

    export default {
        name:"Fabu",
        props:["people"],
        data(){
            return{
                people1:[],
                title:["未选人员","已选人员"],
                mode: "transfer",
                fromData:[
                    {
                        id: "1",
                        pid: 0,
                        label: "民一庭",
                        children: [
                            {
                                id: "1-1",
                                pid: "1",
                                label: "李白",
                                children: []
                            },
                            {
                                id: "1-2",
                                pid: "1",
                                label: "杜甫",
                                children: []
                            },
                            {
                                id: "1-3",
                                pid: "1",
                                label: "苏轼",
                                children: []
                            },

                        ]
                    },
                    {
                        id: "2",
                        pid: 0,
                        label: "民二庭",
                        children: [
                            {
                                id: "2-1",
                                pid: "2",
                                label: "张三",
                                children: []
                            },
                            {
                                id: "2-2",
                                pid: "2",
                                label: "李四",
                                children: []
                            },
                            {
                                id: "2-3",
                                pid: "2",
                                label: "王五",
                                children: []
                            },

                        ]
                    },



                ],
                toData:[]
            }
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
                for( let item of toData){
                    for( let item2 of item.children){
                        this.people1.push(item2.label);


                    }


                }
                // console.log(this.people1)
                this.$emit('changepeople', this.people1)
                // self.$emit('changepeople', this.people)
                // console.log("obj:", obj);
            },
            // 监听穿梭框组件移除
            remove(fromData,toData,obj){
                // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
                // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
                // console.log("fromData:", fromData);
                // console.log("toData:", toData);
                // console.log("obj:", obj);
                this.people1 = [];
                this.toData = toData;
                this.fromData = fromData;
                for( let item of toData){
                    for( let item2 of item.children){
                        this.people1.push(item2.label)

                    }

                }
                // console.log(this.people1)
                this.$emit('changepeople', this.people1)
            }
        },
        components:{ treeTransfer } // 注册
    }
</script>

<style>
</style>
