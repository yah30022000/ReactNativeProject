

import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    {/* <Image style={styles.image} source={require('../assets/arrow_back.png')} /> */}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);