import React from 'react';
import { View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import { navigate } from '../utils/NavigationUtils';

const SplashScreen = () => {
    setTimeout(() => {
        navigate("TabNavigator")
    }, 2000);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/SplashJSON.json')}
        autoPlay
        loop
        resizeMode="contain"
        style={{width : '100%', height : '100%'}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
