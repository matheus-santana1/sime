import DEFAULT_OPTION, { defaultOptionProps } from './options';
import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import saveImageToFile from './saveImageToFile';
import { Dimensions } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';

interface ChartProps extends defaultOptionProps {
  padding?: number;
  height?: number;
}

export interface ChartHandle {
  resetZoom: () => void;
  takeScreenshot: () => void;
  updateChart: (values: { x: string; y: number }) => void;
  zoom: () => void;
}

const Chart = forwardRef(function Chart(
  { padding = 0, xLabel, yLabel, initialDataY, initialDataX, height }: ChartProps,
  ref
) {
  const options = DEFAULT_OPTION({ xLabel, yLabel, initialDataY, initialDataX });
  const [zoomState, setZoomState] = useState<boolean>(true);
  const echartsRef = useRef<any>(null);

  function zoom() {
    if (echartsRef.current) {
      echartsRef.current.getInstance('dispatchAction', {
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: zoomState,
      });
      setZoomState(!zoomState);
    }
  }

  function resetZoom() {
    echartsRef.current.getInstance('dispatchAction', {
      type: 'dataZoom',
      start: 0,
      end: 100,
    });
  }

  function takeScreenshot() {
    echartsRef.current
      .getInstance('getDataURL', {
        type: 'svg',
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })
      .then((res: any) => {
        saveImageToFile(res);
      });
  }

  function updateChart(values: { x: string; y: number }) {
    if (values && echartsRef.current) {
      options.series[0].data.shift();
      options.series[0].data.push(values.y);
      options.xAxis[0].data.shift();
      options.xAxis[0].data.push(values.x);
      echartsRef.current.setNewOption(options);
      echartsRef.current.getInstance('dispatchAction', {
        type: 'hideTip',
      });
    }
  }

  useImperativeHandle(ref, () => ({
    resetZoom: resetZoom,
    takeScreenshot: takeScreenshot,
    updateChart: updateChart,
    zoom: zoom,
  }));

  return (
    <RNEChartsPro
      ref={echartsRef}
      height={height}
      width={Dimensions.get('window').width - padding}
      option={options}
      webViewSettings={{
        overScrollMode: 'never',
      }}
    />
  );
});

export default Chart;
