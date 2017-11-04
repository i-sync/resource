<template>
  <div class="app-container">
    <el-button style='margin-bottom:20px' type="primary" icon="document" @click="handleCreate">录入员工信息</el-button>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row @selection-change="handleSelectionChange"
      ref="multipleTable">
      <el-table-column label='ID' width="115">
        <template scope="scope">
          {{scope.row.eid}}
        </template>
      </el-table-column>
      <el-table-column label="员工" width="80">
        <template scope="scope">
          {{scope.row.author}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="125">
        <template scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="80">
        <template scope="scope">
          {{scope.row.sex}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="180">
        <template scope="scope">
          {{scope.row.identity}}
        </template>
      </el-table-column>
      <el-table-column label="部门" width="125">
        <template scope="scope">
          {{scope.row.department}}
        </template>
      </el-table-column>
      <el-table-column label="籍贯">
        <template scope="scope">
          {{scope.row.address}}
        </template>
      </el-table-column>
      <el-table-column label="邮编" width="85">
        <template scope="scope">
          {{scope.row.zip}}
        </template>
      </el-table-column>
      <el-table-column label="出生时间" width="120">
        <template scope="scope">
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="100">
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
        

        <el-form-item label="姓名">
          <el-input v-model="temp.author"></el-input>
        </el-form-item>
        

        <el-form-item label="手机号">
          <el-input v-model="temp.phone"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select class="filter-item" v-model="temp.sex" placeholder="请选择">
            <el-option v-for="item in  sexTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身份证号">
          <el-input v-model="temp.identity"></el-input>
        </el-form-item>


        <el-form-item label="选择部门">
          <el-select class="filter-item" v-model="temp.department" placeholder="请选择">
            <el-option v-for="item in  departmentOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="籍贯">
          <el-input v-model="temp.address"></el-input>
        </el-form-item>

        <el-form-item label="邮编">
          <el-input v-model="temp.zip"></el-input>
        </el-form-item>
        
        <el-form-item label="出生时间">
          <el-date-picker v-model="temp.display_time" type="date" placeholder="选择日期时间">
          </el-date-picker>
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
import { fetchList } from '@/api/article'

const sexTypeOptions = [
      { key: '男', display_name: '男' },
      { key: '女', display_name: '女' }
]
const departmentOptions = [
      { key: '行政部门', display_name: '行政部门' },
      { key: '财务部门', display_name: '财务部门' },
      { key: '技术部门', display_name: '技术部门' },
      { key: '人力资源', display_name: '人力资源' }
]

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      downloadLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      sexTypeOptions,
      departmentOptions,
      temp: {
        eid: undefined,
        author: '刘国强',
        phone: 18672837263,
        sex: '男',
        identity: '426875198509205784',
        department: '技术部',
        address: '北京 北京市',
        zip: '100045',
        display_time: '1985-09-20'
      },
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel')
          const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: '请至少选择一条记录',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
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
      }
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    create() {
      this.temp.eid = 'E0002' + Math.random().toString().substr(2, 4)
      this.temp.timestamp = +new Date()
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
        if (v.eid === this.temp.eid) {
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
