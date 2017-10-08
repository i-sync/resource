<template>
  <div class="app-container">

    <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox label="学历">学历</el-checkbox>
        <el-checkbox label="年龄">年龄</el-checkbox>
        <el-checkbox label="工作经历">工作经历</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column :key='fruit' v-for='(fruit,index) in formThead' :label="fruit">
        <template scope="scope">
          {{scope.row[fruit]}}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '小赵',
          '年龄': '25',
          '工作经历': '2015年毕业，在某地工作2年，开发公司的前端页面',
          '学历': '本科',
          orange: 'orange-10'
        },
        {
          name: '小李',
          '年龄': '26',
          '工作经历': '2014年皇家养鸡场毕业，在养殖场开发云养鸡系统3年，近期离职，随时能到岗',
          '学历': '本科',
          orange: 'orange-20'
        }
      ],
      formThead: ['年龄', '工作经历']
    }
  }
}
</script>
