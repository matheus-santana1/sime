import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import saveImageToFile from './saveImageToFile';
import { Dimensions } from 'react-native';
import RNEChartsPro from 'react-native-echarts-pro';
import { useSystem } from 'WebSocket';
import { produce } from 'immer';

interface ChartProps {
  padding?: number;
  height?: number;
}

export interface ChartHandle {
  resetZoom: () => void;
  takeScreenshot: () => void;
  updateChart: (values: { x: string; y: number }) => void;
  zoom: () => void;
  updateOptions: (options: object) => void;
}

const Chart = forwardRef(function Chart({ padding = 0, height }: ChartProps, ref) {
  const [zoomState, setZoomState] = useState<boolean>(true);
  const [clonedChartOptions, setClonedChartOptions] = useState<any>(null);
  const echartsRef = useRef<any>(null);
  const { chartOptions, setSystem } = useSystem();

  useEffect(() => {
    const clonedOptions = { ...chartOptions };
    setClonedChartOptions(clonedOptions);
  }, []);

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
      const updated = produce(chartOptions, (draft: any) => {
        draft.series[0].data.shift();
        draft.series[0].data.push(values.y);
        draft.xAxis[0].data.shift();
        draft.xAxis[0].data.push(values.x);
      });
      setSystem({ chartOptions: updated });
      echartsRef.current.setNewOption(updated);
      echartsRef.current.getInstance('dispatchAction', {
        type: 'hideTip',
      });
    }
  }

  function updateOptions(options: object) {
    if (options && echartsRef.current) {
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
    updateOptions: updateOptions,
  }));

  return (
    <RNEChartsPro
      ref={echartsRef}
      height={height}
      width={Dimensions.get('window').width - padding}
      option={clonedChartOptions}
      webViewSettings={{
        overScrollMode: 'never',
      }}
    />
  );
});

export default Chart;
