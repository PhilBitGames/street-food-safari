import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Vendor, MenuItem } from '../types/vendor';
import { styles } from '../styles/styles';
import { API_BASE_URL } from '../config/api';

type VendorsStackParamList = {
  VendorsList: undefined;
  VendorDetails: { vendorId: string };
};

type VendorDetailsScreenProps = NativeStackScreenProps<VendorsStackParamList, 'VendorDetails'>;

const VendorDetailsScreen: React.FC<VendorDetailsScreenProps> = ({ route }) => {
  const { vendorId } = route.params;
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriting, setFavoriting] = useState(false);

  const API_URL = `${API_BASE_URL}/vendors`;

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${vendorId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        const vendorData = rawData;

        setVendor(vendorData as Vendor);
        setIsFavorite(vendorData.isFavorite || false);
        setError(null);
      } catch (err) {
        setError('Failed to load vendor details.');
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  const toggleFavorite = async () => {
    if (favoriting) return;
    setFavoriting(true);

    try {
      const response = await fetch(`${API_URL}/${vendorId}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setFavoriting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error || !vendor) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={{ fontSize: 16, color: '#B91C1C' }}>{error || 'Vendor not found'}</Text>
      </View>
    );
  }

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.badgeContainer}>
        {item.spicy && (
          <View style={[styles.badge, styles.spicyBadge]}>
            <Text style={styles.badgeText}>🌶️ Spicy</Text>
          </View>
        )}
        {item.vegan && (
          <View style={[styles.badge, styles.veganBadge]}>
            <Text style={styles.badgeText}>🌱 Vegan</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Image 
        source={{ uri: vendor.thumbnail }} 
        style={styles.detailThumbnail} 
        resizeMode="cover"
      />
      <View style={styles.detailContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.detailTitle}>{vendor.name}</Text>
          <TouchableOpacity 
            onPress={toggleFavorite}
            disabled={favoriting}
          >
            <MaterialCommunityIcons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              color={isFavorite ? '#EF4444' : '#6B7280'}
              size={28} 
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.vendorCardDetails}>{vendor.cuisine} • {vendor.city} • {vendor.priceLevel}</Text>
        <Text style={styles.description}>{vendor.description}</Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Menu</Text>
        {vendor.menu && vendor.menu.length > 0 ? (
          <FlatList
            data={vendor.menu}
            keyExtractor={(item) => item.id}
            renderItem={renderMenuItem}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noMenu}>No menu items available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default VendorDetailsScreen;