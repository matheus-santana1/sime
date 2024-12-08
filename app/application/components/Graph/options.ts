import Theme from 'theme';

export interface defaultOptionProps {
  xLabel: string;
  yLabel: string;
  initialDataY: number[];
  initialDataX: string[];
}

const DEFAULT_OPTION = (params: defaultOptionProps) => {
  return {
    backgroundColor: Theme.graph.backgroundColor,
    textStyle: {
      color: Theme.graph.textColor,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      formatter: '<b>Nível</b>: {c}m<br>Às {b}h',
    },
    grid: {
      top: 30,
      left: 20,
      right: 20,
      bottom: 20,
      containLabel: true,
    },
    toolbox: {
      feature: {
        dataZoom: {
          icon: {
            zoom: 'path://',
            back: 'path://',
          },
          brushStyle: {
            color: Theme.graph.brushZoomColor,
          },
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        name: params.xLabel,
        nameLocation: 'center',
        nameGap: 23,
        data: params.initialDataX,
        axisLine: {
          lineStyle: {
            color: Theme.graph.axisLineColor,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        min: 0,
        name: params.yLabel,
        nameLocation: 'center',
        nameGap: 25,
        splitLine: {
          lineStyle: {
            color: Theme.graph.splitLineColor,
          },
        },
      },
    ],
    series: [
      {
        name: 'Nível',
        type: 'line',
        data: params.initialDataY,
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: Theme.graph.lineColor,
        },
      },
    ],
  };
};

export default DEFAULT_OPTION;
