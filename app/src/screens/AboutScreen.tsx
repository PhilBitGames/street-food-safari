import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { styles } from '../styles/styles';
import { API_BASE_URL } from '../config/api';
import LoadingIndicator from '../components/LoadingIndicator';

type RootTabParamList = {
  VendorsStack: undefined;
  FavoritesStack: undefined;
  About: undefined;
};

type AboutScreenProps = BottomTabScreenProps<RootTabParamList, 'About'>;

interface SlowData {
  message?: string;
  data?: unknown;
}

const AboutScreen: React.FC<AboutScreenProps> = () => {
  const [data, setData] = useState<SlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = `${API_BASE_URL}/slow`;

  const fetchSlowData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(API_URL, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData = await response.json();
      setData(rawData);
    } catch (err) {
      console.error('Failed to fetch slow data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlowData();
  }, []);

  const handleRetry = () => {
    fetchSlowData();
  };

  if (loading) {
    return <LoadingIndicator message="Loading About..."/>;
  } 

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Text style={styles.title}>About Street Food Safari</Text>
        
        {data?.message && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Message</Text>
            <Text style={styles.sectionContent}>{data.message}</Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={handleRetry}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;