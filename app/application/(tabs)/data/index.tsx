import Box from 'app/application/components/InfoBox';
import { moderateScale } from 'react-native-size-matters';
import ViewGradient from 'app/application/components/ViewGradient';

export default function Data() {
  return (
    <ViewGradient style={{ padding: moderateScale(15) }}>
      <Box></Box>
    </ViewGradient>
  );
}
