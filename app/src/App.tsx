import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';

const App: React.FC = () => {
  if (Platform.OS === 'web') {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;