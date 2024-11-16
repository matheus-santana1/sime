import { View, Dimensions } from 'react-native';
import Graph, { ChartHandle } from '../../components/Graph';
import ViewGradient from 'app/application/components/ViewGradient';
import { useRef } from 'react';
import GraphOptions from 'app/application/components/GraphOptions';

let xLabel = 'Horas';
let yLabel = 'Metros';
let initialDataY = [26, 14, 7, 11, 28, 5, 22];
let initialDataX = ['15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

export default function Data() {
  const chartRef = useRef<ChartHandle>(null);
  return (
    <ViewGradient>
      <View className="flex-1 justify-between">
        <Graph
          ref={chartRef}
          padding={10}
          xLabel={xLabel}
          yLabel={yLabel}
          initialDataX={initialDataX}
          initialDataY={initialDataY}
          height={Dimensions.get('window').height * 0.6}
        />
        <GraphOptions graphRef={chartRef} />
      </View>
    </ViewGradient>
  );
}
