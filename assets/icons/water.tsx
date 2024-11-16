import Svg, { Path } from 'react-native-svg';
import SvgProps from './props';

const Water = (props: SvgProps) => (
  <Svg width={(props.size as number) * (17 / 18)} height={props.size} fill="none" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.333}
      d="M17.933 8.133a18.281 18.281 0 0 0 2.4-5.966C21.167 6.333 23.667 10.333 27 13c3.333 2.667 5 5.833 5 9.167a11.633 11.633 0 0 1-19.85 8.283M8.667 24.3c3.666 0 6.666-3.05 6.666-6.75 0-1.933-.95-3.767-2.85-5.317-1.9-1.55-3.333-3.85-3.816-6.266-.484 2.416-1.9 4.733-3.817 6.266C2.933 13.767 2 15.633 2 17.55c0 3.7 3 6.75 6.667 6.75Z"
    />
  </Svg>
);

export default Water;
