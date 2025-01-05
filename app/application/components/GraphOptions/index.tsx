import { View } from 'react-native';
import { ChartHandle } from '../Graph';
import { RefObject } from 'react';
import Button from './Button';

export default function GraphOptions({ graphRef }: { graphRef: RefObject<ChartHandle> | null }) {
  function zoom() {
    if (graphRef?.current) {
      graphRef.current.zoom();
    }
  }

  function restore() {
    if (graphRef?.current) {
      graphRef.current.resetZoom();
    }
  }

  function download() {
    if (graphRef?.current) {
      graphRef.current.takeScreenshot();
    }
  }

  return (
    <View className="flex flex-row justify-between">
      <Button onClick={zoom} type="switch" icon="loupe" size={35} />
      <Button onClick={restore} type="button" icon="restore" size={35} />
      <Button onClick={download} type="button" icon="download" size={35} />
      <Button usePlayPauseState={true} type="switch" icon="play-pause" size={35} />
    </View>
  );
}
