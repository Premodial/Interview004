// Ball.tsx
import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { SCREEN_DIMENSIONS } from '../constants/Configurations';
import ColorScheme from '../constants/Colors';

interface BallProps {
  posX: Animated.SharedValue<number>;
  posY: Animated.SharedValue<number>;
  ballSize: number;
  isMinSize: boolean;
}

/**
 * Renders an animated ball component that responds to position changes.
 * Uses reanimated shared values for position and animates based on these values.
 *
 * @param {Animated.SharedValue<number>} posX - The reactive horizontal position of the ball.
 * @param {Animated.SharedValue<number>} posY - The reactive vertical position of the ball.
 * @param {number} ballSize - Diameter of the ball.
 * @param {boolean} isMinSize - Flag to determine if the ball is at its minimum size.
 * @returns {React.ReactElement} A component representing a ball with animation.
 */
const Ball: React.FC<BallProps> = ({ posX, posY, ballSize, isMinSize }) => {
  // Define the animated style based on the ball's position and size
  const animatedStyle = useAnimatedStyle(() => {
    const horizontalOffset = isMinSize ? SCREEN_DIMENSIONS.width / 2.36 : SCREEN_DIMENSIONS.width / 3;
    const verticalOffset = isMinSize ? SCREEN_DIMENSIONS.height / 2.1 : SCREEN_DIMENSIONS.height / 2.3;

    return {
      transform: [
        { translateX: posX.value - horizontalOffset },
        { translateY: posY.value - verticalOffset }
      ],
      width: ballSize,
      height: ballSize,
      borderRadius: ballSize / 2,  // Ensures the ball remains circular
      backgroundColor: ColorScheme.light.tint,  // Uses a constant from a color scheme for consistency
      position: 'absolute',
    };
  });

  return <Animated.View style={animatedStyle} />;
};

export default Ball;
