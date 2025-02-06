import React from 'react';
import {View} from 'react-native';

interface SpaceProps {
  height: number;
}

const Space: React.FC<SpaceProps> = ({height}) => {
  return <View style={{height}} />;
};

export {Space};
