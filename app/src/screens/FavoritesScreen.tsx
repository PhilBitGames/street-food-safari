import React, { useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useVendorFetch } from '../hooks/useVendorFetch';
import VendorCard from '../components/VendorCard';
import { styles } from '../styles/styles';
import LoadingIndicator from '../components/LoadingIndicator';

type FavoritesStackParamList = {
  FavoritesList: undefined;
  VendorDetails: { vendorId: string };
};

type FavoritesScreenProps = NativeStackScreenProps<FavoritesStackParamList, 'FavoritesList'>;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { vendors, loading, error, fetchVendors } = useVendorFetch();
  const favorites = vendors.filter(v => v.isFavorite);

  useEffect(() => {
    fetchVendors(1, false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchVendors(1, false);
    }, [])
  );

  const handleVendorPress = (vendorId: string) => {
    navigation.navigate('VendorDetails', { vendorId });
  };

  if (loading) {
    return <LoadingIndicator message="Loading Favorites..." />;
  } 

  return (
    <View style={{ flex: 1 }}>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorTextBold}>{error}</Text>
        </View>
      )}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VendorCard item={item} onPress={handleVendorPress} />}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={() => (
          <View style={styles.centeredContainer}>
            <Text style={{ fontSize: 16, color: '#6B7280' }}>No favorites yet.</Text>
            <Text style={{ fontSize: 14, color: '#9CA3AF', marginTop: 8 }}>
              Add vendors to your favorites to see them here.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;