<template>
  <div>
    <sticky className="sub-navbar">
      <el-dropdown trigger="click">
        <el-button>
          总公司<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="no-border" slot="dropdown">
          <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
            <el-checkbox v-for="item in platformsOptions" :label="item.key" :key="item.key">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" type="datetime" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="时间">
        </el-date-picker>
      </div>

      <el-button style="margin-left: 10px;" type="success">筛选
      </el-button>
    </sticky>
    <div class="app-container calendar-list-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="80">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="时间">
        <template scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="应聘人">
        <template scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="职级">
        <template scope="scope">
          <icon-svg v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></icon-svg>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="录用评价" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="备注">
        <template scope="scope">
          <el-input v-show="scope.row.edit" size="small" v-model="scope.row.title"></el-input>
          <span v-show="!scope.row.edit">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="编辑" width="120">
        <template scope="scope">
          <el-button :type="scope.row.edit?'success':'primary'" @click='scope.row.edit=!scope.row.edit' size="small" icon="edit">{{scope.row.edit?'完成':'编辑'}}</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
  </div>
</template>


<script>
import Sticky from '@/components/Sticky'
import { fetchList } from '@/api/article'

export default {
  components: { Sticky, fetchList },
  name: 'inline_edit-table_demo',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      time: '',
      url: '',
      platforms: ['a-platform'],
      platformsOptions: [
            { key: 'a-platform', name: '总公司' },
            { key: 'b-platform', name: '华东区分公司' },
            { key: 'c-platform', name: '新区分公司' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false)
          return v
        })
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .time-container {
    display: inline-block;
  }
</style>
