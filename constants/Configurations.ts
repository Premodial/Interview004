// Constants.ts
import { Dimensions } from 'react-native';

export const SCREEN_DIMENSIONS = Dimensions.get('window');
export const BALL_INITIAL_SIZE = SCREEN_DIMENSIONS.width * 0.3;
export const ACCELEROMETER_UPDATE_INTERVAL = 16;
export const  DEFAULT_DAMPING = 16;
export const DEFAULT_STIFFNESS = 150;