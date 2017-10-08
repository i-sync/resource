<template>
	<div class="dashboard-editor-container">
		<el-row>
			<el-col v-show="false" :span="6">
				<el-card class="box-card">
					<div slot="header" class="box-card-header">
						<pan-thumb class="panThumb" :image="avatar"> 你的权限:
							<span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
						</pan-thumb>
					</div>
					<span class="display_name">{{name}}</span>
					<div class="info-item">
						<count-to class="info-item-num" :startVal='0' :endVal='statisticsData.article_count' :duration='3400'></count-to>
						<span class="info-item-text">文章</span>
						<icon-svg icon-class="trendChart1" class="dashboard-editor-icon"></icon-svg>
					</div>
					<div class="info-item">
						<count-to class="info-item-num" :startVal='0' :endVal='statisticsData.pageviews_count' :duration='3600'></count-to>
						<span class="info-item-text">浏览量</span>
						<icon-svg icon-class="trendChart2" class="dashboard-editor-icon"></icon-svg>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<el-row v-for="cp in cps" :key="cp" :gutter="24">
			<el-col :span="24">
				<component :is="cp" height="600px"></component>
			</el-col>
		</el-row>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import countTo from 'vue-count-to'
import panThumb from '@/components/PanThumb'
import todoList from '@/components/TodoList'

import qiantaobingChart from './qiantaobingChart'
import xiaoliangjizengzhanglvChart from './xiaoliangjizengzhanglvChart'
import fenbuChart from './fenbuChart'
import ditudianzhengChart from './ditudianzhengChart'
import guochengChart from './guochengChart'
import fencengzhuzhuangChart from './fencengzhuzhuangChart'

import fenxingqifendianzhongChart from './fenxingqifendianzhongChart'
import zhexianChart from './zhexianChart'

export default {
  name: 'dashboard-admin',
  components: {
    countTo, panThumb, todoList,
    qiantaobingChart, xiaoliangjizengzhanglvChart, fenbuChart, ditudianzhengChart, guochengChart, fencengzhuzhuangChart,
    fenxingqifendianzhongChart, zhexianChart
  },
  data() {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      },
      cps: [
        'qiantaobingChart', 'xiaoliangjizengzhanglvChart', 'guochengChart', 'fencengzhuzhuangChart',
        'fenxingqifendianzhongChart', 'zhexianChart'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
    margin: 30px;
    .btn-group {
        margin-bottom: 60px;
    }
    .box-card-header {
        position: relative;
        height: 160px;
    }
    .panThumb {
        z-index: 100;
        height: 150px;
        width: 150px;
        position: absolute;
        left: 0px;
        right: 0px;
        margin: auto;
    }
    .display_name{
        font-size: 30px;
        display: block;
    }
    .info-item{
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        &:last-of-type{
            margin-left: 15px;
        }
    }
}
</style>
