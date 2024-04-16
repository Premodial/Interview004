// useBallAnimation.ts
import { useEffect } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { Accelerometer } from 'expo-sensors';
import {
  BALL_INITIAL_SIZE,
  SCREEN_DIMENSIONS,
  ACCELEROMETER_UPDATE_INTERVAL,
  DEFAULT_DAMPING,
  DEFAULT_STIFFNESS
} from '../constants/Configurations';

interface BallAnimationProps {
  speed: number;
  ballSize: number;
}

/**
 * Custom hook to handle ball movement and animation based on accelerometer data.
 * 
 * @param {number} speed - The speed factor of the ball's movement.
 * @param {number} ballSize - The current size of the ball.
 * @returns {object} Animated shared values for X and Y positions of the ball.
 */
export const useBallAnimation = ({ speed, ballSize }: BallAnimationProps) => {
  // Initial positions are set so that the ball starts centered in the screen
  const posX = useSharedValue(SCREEN_DIMENSIONS.width / 2 - ballSize / 2);
  const posY = useSharedValue(SCREEN_DIMENSIONS.height / 2 - ballSize / 2);

  useEffect(() => {
    // Set the interval for accelerometer updates
    Accelerometer.setUpdateInterval(ACCELEROMETER_UPDATE_INTERVAL);

    // Subscribe to accelerometer updates
    const subscription = Accelerometer.addListener(({ x, y }) => {
      // Calculate new positions based on current positions, speed factor, and accelerometer data
      let newX = posX.value + x * speed;
      let newY = posY.value - y * speed;

      // Apply physics-based animation to ensure the ball moves smoothly and stays within screen bounds
      posX.value = withSpring(
        Math.max(0, Math.min(newX, SCREEN_DIMENSIONS.width - ballSize)), 
        { damping: DEFAULT_DAMPING, stiffness: DEFAULT_STIFFNESS }
      );
      posY.value = withSpring(
        Math.max(0, Math.min(newY, SCREEN_DIMENSIONS.height - ballSize)), 
        { damping: DEFAULT_DAMPING, stiffness: DEFAULT_STIFFNESS }
      );
    });

    // Clean up the subscription on component unmount
    return () => subscription.remove();
  }, [speed, ballSize]);

  return { posX, posY };
};
