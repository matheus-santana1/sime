import Svg, { SvgProps, Path } from 'react-native-svg';

const Graph = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.333}
      d="M35 35H7.667c-.934 0-1.4 0-1.757-.182a1.666 1.666 0 0 1-.728-.728C5 33.733 5 33.267 5 32.333V5m28.333 8.333-6.531 6.971c-.248.265-.371.397-.52.465a.833.833 0 0 1-.422.072c-.164-.015-.324-.098-.645-.265l-5.43-2.819c-.32-.167-.481-.25-.645-.265a.834.834 0 0 0-.421.072c-.15.069-.273.2-.52.465L11.666 25"
    />
  </Svg>
);

export default Graph;
