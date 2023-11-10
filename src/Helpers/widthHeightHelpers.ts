import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const getWidth = (size: number) => {
  const percentage = (size * 100) / BASE_WIDTH;
  return wp(percentage);
};

export const getHeight = (size: number) => {
  const percentage = (size * 100) / BASE_HEIGHT;
  return hp(percentage);
};

export const rotate = (angle = 180) => {
  return {
    transform: [{rotate: `${angle}deg`}],
  };
};

export const getWidthStr = (size: number) => `${getWidth(size)}%`;
export const getHeightStr = (size: number) => `${getHeight(size)}%`;
