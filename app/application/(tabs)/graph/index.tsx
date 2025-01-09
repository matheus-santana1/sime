import { View, Dimensions } from 'react-native';
import React, { Suspense } from 'react';
import ViewGradient from 'app/application/components/ViewGradient';
import GraphOptions from 'app/application/components/GraphOptions';
import Box from 'app/application/components/Box';
import { ActivityIndicator } from 'react-native';
import { useSystem } from 'WebSocket';

const Graph = React.lazy(() => import('../../components/Graph'));
const height = Dimensions.get('window').height * 0.6;

export default function Grafico() {
  const { chartRef } = useSystem();

  return (
    <ViewGradient>
      <View className="flex-1 justify-between w-full">
        <View className="w-full justify-center items-center" style={{ height: height }}>
          <Suspense fallback={<ActivityIndicator size={'large'} />}>
            <Graph ref={chartRef} padding={10} height={height} />
          </Suspense>
        </View>
        <Box />
        <GraphOptions graphRef={chartRef} />
      </View>
    </ViewGradient>
  );
}
