<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'

        },
        title: {
          text: '简历-应聘岗位'
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {

          orient: 'vertical',
          x: 'right',
          itemWidth: 14,
          itemHeight: 14,
          align: 'left',

          data: ['销售', '总经理', '秘书', '会计', '出纳', '经理', '程序员'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          hoverAnimation: false,
          legendHoverLink: false,
          radius: ['40%', '42%'],
          color: ['#915872', '#3077b7', '#9a8169', '#3f8797', '#5b8144', '#307889', '#9c6a79'],
          label: {
            normal: {
              position: 'inner'
            }
          },
          labelLine: {
            normal: {
              show: false
            }

          },
          tooltip: {
            show: false

          },

          data: [{
            value: 435,
            name: ''
          }, {
            value: 679,
            name: ''
          }, {
            value: 848,
            name: ''
          }, {
            value: 348,
            name: ''
          }, {
            value: 679,
            name: ''
          }, {
            value: 848,
            name: ''
          }, {
            value: 348,
            name: ''
          }]
        }, {
          name: '访问来源',
          type: 'pie',
          radius: ['42%', '55%'],
          color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', ' #f17677'],
          label: {
            normal: {
              formatter: '{b}\n{d}%'
            }

          },
          data: [{
            value: 435,
            name: '销售'
          }, {
            value: 679,
            name: '总经理'
          }, {
            value: 848,
            name: '秘书'
          }, {
            value: 348,
            name: '会计'
          }, {
            value: 679,
            name: '出纳'
          }, {
            value: 848,
            name: '经理'
          }, {
            value: 348,
            name: '程序员'
          }

          ]
        }]
      })
    }
  }
}
</script>
