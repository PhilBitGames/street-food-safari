import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useVendorFetch } from '../hooks/useVendorFetch';
import { useSearch } from '../hooks/useSearch';
import VendorCard from '../components/VendorCard';
import { styles } from '../styles/styles';
import LoadingIndicator from '../components/LoadingIndicator';

type VendorsStackParamList = {
  VendorsList: undefined;
  VendorDetails: { vendorId: string };
};

type VendorsListScreenProps = NativeStackScreenProps<VendorsStackParamList, 'VendorsList'>;

const VendorsScreen: React.FC<VendorsListScreenProps> = ({ navigation }) => {
  const { vendors, page, loading, loadingMore, error, hasMore, fetchVendors } = useVendorFetch();
  const { results, searching, debouncedSearch, performSearch, cleanup } = useSearch();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchVendors(1, false);
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      debouncedSearch('');
      fetchVendors(1, false);
    } else {
      debouncedSearch(query);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    if (searchQuery.trim()) {
      await performSearch(searchQuery);
    } else {
      await fetchVendors(1, false);
    }
    setRefreshing(false);
  };

  const handleEndReached = () => {
    if (!loadingMore && !loading && hasMore && !searchQuery.trim()) {
      fetchVendors(page + 1, true);
    }
  };

  const handleVendorPress = (vendorId: string) => {
    navigation.navigate('VendorDetails', { vendorId });
  };

  const displayVendors = searchQuery.trim() ? results : vendors;

  if (loading && !searchQuery) {
    return <LoadingIndicator message="Loading Vendors..."/>;
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search vendors..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searching && (
            <ActivityIndicator 
              size="small" 
              color="#007AFF" 
              style={{ marginRight: 12 }}
            />
          )}
        </View>
      </View>

      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorTextBold}>{error}</Text>
        </View>
      )}

      <FlatList
        data={displayVendors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VendorCard item={item} onPress={handleVendorPress} />}
        contentContainerStyle={{ padding: 10 }}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (
          <View style={styles.centeredContainer}>
            <Text style={{ fontSize: 16, color: '#6B7280' }}>
              {searchQuery ? 'No results found.' : 'No vendors loaded.'}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            colors={['#007AFF']}
          />
        }
        scrollEnabled={true}
      />
    </View>
  );
};

export default VendorsScreen;