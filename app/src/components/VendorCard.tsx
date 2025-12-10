import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Vendor } from '../types/vendor';
import { styles } from '../styles/styles';

type VendorCardProps = {
  item: Vendor;
  onPress: (vendorId: string) => void;
};

const VendorCard: React.FC<VendorCardProps> = ({ item, onPress }) => (
  <TouchableOpacity 
    onPress={() => onPress(item.id)}
    activeOpacity={0.7}
  >
    <View style={styles.card}>
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.thumbnail} 
        resizeMode="cover" 
      />
      <View style={styles.infoContainer}>
        <Text style={styles.vendorName}>{item.name}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.vendorCardDetails}>{item.cuisine} • {item.city} • {item.priceLevel}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default VendorCard;