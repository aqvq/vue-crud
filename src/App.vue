<template>

  <div class="table-box">
<!--    标题-->
<div class="title">
  <h2>最简单的CRUD的开始</h2>
</div>
<!--    query-->
    <div class="query-box">
      <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名搜索" />
      <div class="button-list">
        <el-button type="primary" @click="handleAdd">增加</el-button>
        <el-button type="danger" @click="handleDeleteList" v-show="multipleSelection.length>0">删除</el-button>

      </div>

    </div>

<!--    table-->
    <el-table     ref="multipleTableRef"
                  :data="tableData"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                  border>
      <el-table-column fixed type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" width="150" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleRowEdit(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" style="color:#F56C6C;" @click="handleRowDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

<!--  dialog-->
  <el-dialog v-model="dialogFormVisible" :title="dialogType == 'add' ? '新增' : '编辑'">
    <el-form :model="tableForm">
      <el-form-item label="姓名" :label-width="'80'">
        <el-input v-model="tableForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="'80'">
        <el-input v-model="tableForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" :label-width="'80'">
        <el-input v-model="tableForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" :label-width="'80'">
        <el-input v-model="tableForm.state" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="'80'">
      <el-input v-model="tableForm.address" autocomplete="off" />
    </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// 数据
let queryInput = $ref("");
let multipleSelection = $ref([]);
let dialogFormVisible = $ref(false);
let tableData = $ref([
  {
    id:'1',
    name: '小明',
    email: '555@qq.com',
    phone: '1268541501',
    state: '学生',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'2',
    name:'张三',
    email:'888@qq.com',
    phone:'1381834833',
    state:'在职',
    address:'北京'
  },
  {
    id:'3',
    name:'李四',
    email:'111@qq.com',
    phone:'18561812101',
    state:'在职',
    address:'上海'
  }]);
let tableForm = $ref({
  name:'张三',
  email:'888@qq.com',
  phone:'1381834833',
  state:'在职',
  address:'北京'
});
let dialogType = $ref('add');
// 方法
// 删除
const handleRowDelete= ({id})=>{
  // console.log(id)
  // 1. 通过id获取到条目对应的索引值
  let index = tableData.findIndex(item=>item.id==id)
  // console.log(index);
  // 2. 通过索引值进行删除条目
  tableData.splice(index, 1);
}
// 选中
const handleSelectionChange = (val) => {

  // multipleSelection = val
  // console.log(val);
  multipleSelection = []
  val.forEach(item=>{
    multipleSelection.push(item.id);
  })
}
// 新增
const handleAdd = ()=>{
  dialogFormVisible = true;
  tableForm={}
}
// 确认添加
const dialogConfirm = ()=>{
  dialogFormVisible = false;
  // 判断是新增还是编辑
  if(dialogType==='add'){
    // 1. 拿到数据
    // 2. 添加到Table中
    tableData.push({id:`${tableData.length+1}`, ...tableForm})

  }else{
    // 1. 获取到当前索引
    // 2. 替换当前数据
    const index = tableData.findIndex(item=>item.id==tableForm.id);
    tableData.splice(index, 1, tableForm);
  }

}
// 删除多选
function handleDeleteList(){
  // console.log(multipleSelection);
  multipleSelection.forEach(id=>{
    handleRowDelete({id});
  })
  multipleSelection=[]
}
// 编辑
function handleRowEdit(row){
  dialogType = 'edit';
  tableForm = {...row};
  dialogFormVisible = true;
}


</script>

<style scoped>
.table-box{
  width:800px;
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}

.title{
  text-align: center;
}

.query-box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.query-input{
  width: 200px;
}


</style>