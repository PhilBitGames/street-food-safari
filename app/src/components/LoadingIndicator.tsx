import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles/styles';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Loading...' }) => (
  <View style={styles.centeredContainer}>
    <ActivityIndicator size="large" color="#007AFF" />
    {message && (
      <Text style={{ fontSize: 18, color: '#6B7280', marginTop: 12 }}>
        {message}
      </Text>
    )}
  </View>
);

export default LoadingIndicator;