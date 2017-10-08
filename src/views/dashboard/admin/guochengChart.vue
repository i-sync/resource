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
// 每次移动的数据数组
      var dataArray = []
// 每次移动的数据x轴
      var arrayIndex = []
// 每次移动的数据索引
      var arrayMovePoint = []
// 原始数组
      var subDataArray = []
// 存储每次排序数组的寄存器
      var arrayTemp = []
// 存储每次排序索引的寄存器
      var arrayIndexTemp = []
// 图例
      var legendData = []
// 时间轴数组，记录移动的次数
      var timelineData = []
// 每次移动的数据数组放到时间轴
      var optionsData = []

// 数据生成
      for (var j = 0; j < 10; j++) {
        subDataArray.push(Math.floor(Math.random() * 10 + 1))
      }
// 将生成的数组存储到寄存器当中
      for (let i = 0; i < subDataArray.length; i++) {
        arrayTemp.push(subDataArray[i])
        arrayIndexTemp.push(i)
      }
// 寄存器的数据添加到最终的数组中
      dataArray.push(arrayTemp)
      arrayIndex.push(arrayIndexTemp)
// 快速排序
      sort(subDataArray)
// 标记每次数据移动的索引
      for (var i = 1; i < arrayIndex.length; i++) {
        arrayIndex[i][arrayMovePoint[i - 1].left] = {
          'value': '-->' + arrayIndex[i][arrayMovePoint[i - 1].left] + '<--'
        }
        if (arrayMovePoint[i - 1].left !== arrayMovePoint[i - 1].right) {
          arrayIndex[i][arrayMovePoint[i - 1].right] = {
            'value': '-->' + arrayIndex[i][arrayMovePoint[i - 1].right] + '<--'
          }
        }
      }
// 将记录排序过程数组
      for (var ii = 0; ii < dataArray.length; ii++) {
        legendData = ['数据']
        timelineData.push('第' + (ii + 1) + '次调岗')
        optionsData.push(
          {
            'series': {
              'data': dataArray[ii]
            },
            'xAxis': {
              'data': arrayIndex[ii]
            }
          }
    )
      }

      function sort(array) {
        quickSort(array, 0, array.length - 1)
      }

      function quickSort(array, start, end) {
    // 当前指针和后指针相遇或者前在后之后时不作结束当前排序
        if (start >= end) { return }
        var left = start
        var right = end
        var pivotIndex = parseInt((left + right) / 2)
        var pivot = array[pivotIndex]
    // 当前指针没与右指针相遇时继续对比
        if (left <= right) {
          while (left <= right && array[left] < pivot) {
            left++
          }
          while (left <= right && array[right] > pivot) {
            right--
          }
          if (left <= right) {
            var arrayTemp = []
            var temp = array[left]
            array[left] = array[right]
            array[right] = temp
            if (array[left] !== array[right]) {
              var arrayIndexTemp = []
              for (var i = 0; i < arrayIndex[arrayIndex.length - 1].length; i++) {
                arrayIndexTemp.push(arrayIndex[arrayIndex.length - 1][i])
              }
              var arrayIndexTempRight = arrayIndexTemp[right]
              var arrayIndexTempLeft = arrayIndexTemp[left]
              for (var i2 = 0; i2 < array.length; i2++) {
                arrayTemp.push(array[i2])
                if (i2 === left) {
                  arrayIndexTemp[i2] = arrayIndexTempRight
                } else if (i2 === right) {
                  arrayIndexTemp[i2] = arrayIndexTempLeft
                }
              }
              arrayMovePoint.push({
                'left': left,
                'right': right
              })
              arrayIndex.push(arrayIndexTemp)
              dataArray.push(arrayTemp)
            }
            left++
            right--
          }
        }
        quickSort(array, start, right)
        quickSort(array, left, end)
      }

      this.chart.setOption({
        baseOption: {
          timeline: {
            // y: 0,
            axisType: 'category',
            autoPlay: true,
            playInterval: 1000,
            data: timelineData,
            width: '90%',
            bottom: 10,
            left: 30,
            symbolSize: 16,
            label: {
              normal: {
                textStyle: {
                  color: '#999',
                  fontSize: 15
                }
              },
              emphasis: {
                textStyle: {
                  color: '#999',
                  fontSize: 20
                }
              }
            }
          },
          title: {
            text: '调岗'
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            }
          },
          legend: {
            orient: 'vetical',
            x: 'right',
            y: 'top',
            data: legendData
          },
          grid: {
            top: 80,
            bottom: 100,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.value.replace('\n', '')
                  }
                }
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            data: []
          },
          yAxis: [{
            type: 'value'
          }],
          series: [{
            type: 'bar',
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: '#ffffff'
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              data: []
            }
          }]
        },
        options: optionsData

      })
    }
  }
}
</script>
