<template>
  <div class="app-container">
    <el-button style='margin-bottom:20px' type="primary" icon="document" @click="handleCreate" :loading="downloadLoading">新建部门</el-button>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange"
      ref="multipleTable">
      <el-table-column label='ID' width="150">
        <template scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="部门" width="150">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="部门经理" width="120">
        <template scope="scope">
          {{scope.row.manage}}
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="150">
        <template scope="scope">
          {{scope.row.date}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        

        <el-form-item label="部门名称">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        

        <el-form-item label="部门经理">
          <el-input v-model="temp.manage"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const departmentOptions = [
      { id: 'D00012392', name: '行政部门', manage: '史秀兰', date: '2012-09-02' },
      { id: 'D00012232', name: '财务部门', manage: '石平', date: '2012-09-02' },
      { id: 'D00011029', name: '技术部门', manage: '邱明', date: '2012-09-02' },
      { id: 'D00018302', name: '人力资源', manage: '乔洋', date: '2012-09-02' }
]

export default {
  data() {
    return {
      list: departmentOptions,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        id: undefined,
        name: '售后部门',
        manage: '魏涛',
        date: '2017-09-09'
      },
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  created() {
    this.listLoading = false
  },
  methods: {
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      var index = this.list.indexOf(row)
      if (index > -1) {
        this.list.splice(index, 1)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    create() {
      this.temp.id = 'D0001' + Math.random().toString().substr(2, 4)
      this.temp.timestamp = +new Date()
      this.temp.date = (new Date()).toISOString().split('T')[0]
      this.list.unshift(Object.assign({}, this.temp))
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success',
        duration: 2000
      })
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, this.temp)
          break
        }
      }
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
