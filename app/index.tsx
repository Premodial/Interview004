// Index.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import { BALL_INITIAL_SIZE, SCREEN_DIMENSIONS } from '../constants/Configurations';
import { useBallAnimation } from '../hooks/useBallAnimation';
import Ball from '../components/Ball';
import ColorScheme from '../constants/Colors';

/**
 * Index provides a UI to interact with an animated ball.
 * Allows users to toggle the size of the ball and observes the effect on animation.
 */
const Index: React.FC = () => {
  const [ballSize, setBallSize] = useState(BALL_INITIAL_SIZE);
  const [isMinSize, setIsMinSize] = useState(false);

  // Use a fixed speed value initialized to 60.
  const speed = 60;

  // Custom hook to manage ball position based on accelerometer data.
  const { posX, posY } = useBallAnimation({ speed, ballSize });

  /**
   * Toggle the size of the ball between initial size and a smaller size.
   */
  const toggleBallSize = () => {
    const newSize = ballSize === BALL_INITIAL_SIZE ? SCREEN_DIMENSIONS.width * 0.1 : BALL_INITIAL_SIZE;
    setBallSize(newSize);
    setIsMinSize(newSize === SCREEN_DIMENSIONS.width * 0.1);
  };

  return (
    <View style={styles.container}>
      <Ball posX={posX} posY={posY} ballSize={ballSize} isMinSize={isMinSize} />
      <View style={styles.buttonContainer}>
        <Button title="Toggle Size" onPress={toggleBallSize} />
      </View>
    </View>
  );
};

// Styling constants and StyleSheet definition.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorScheme.light.backgroundColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: Platform.OS === 'ios' ? ColorScheme.light.backgroundColor : ColorScheme.light.backgroundColor,
    padding: 10,
    borderRadius: 10,
    shadowColor: ColorScheme.dark.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3, // for Android elevation of the button panel
  },
});

export default Index;
