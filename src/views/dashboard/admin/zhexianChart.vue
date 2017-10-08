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
        color: ['#38b4ee'],
        title: {
          text: '现金储备',
          subtext: '币种：人民币，单位：（万元）',
          textStyle: {
            color: 'white'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          splitLine: {// 网格线
            show: true,
            lineStyle: {
              color: ['#23303f'],
              type: 'solid'
            }
          },
          data: ['2017-1', '2017-2', '2017-3', '2017-4', '2017-5', '2017-6', '2017-7', '2017-8', '现在']
        },
        yAxis: {
          min: 0,
          max: 100,
          interval: 20,
          axisTick: { show: false },
          axisLine: {
            show: false
 //    onZero:false
          },
          axisLabel: {
            textStyle: {
              color: '#dededf'
            }
          },
          splitLine: {// 网格线
            show: true,
            lineStyle: {
              color: ['#23303f'],
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '剩余额度',
            type: 'line',
            smooth: true,
            symbolSize: 12,
            data: ['48', '43', '41', '40', '24', '53', '47', '50', '49'],
            label: {
              normal: {
                show: false,
                position: 'top'// 值显示
              }
            }
          }
        ]
      })
    }
  }
}
</script>
