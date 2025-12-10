import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorBanner: {
    padding: 10,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
  },
  errorTextBold: {
    color: '#B91C1C',
    fontWeight: 'bold',
  },
  errorTextSmall: {
    color: '#B91C1C',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 12,
  },
  vendorName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorCardDetails: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#FDF6E3',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#F59E0B',
  },
  detailThumbnail: {
    width: '100%',
    height: 250,
  },
  detailContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  menuSection: {
    padding: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  spicyBadge: {
    backgroundColor: '#FEE2E2',
  },
  veganBadge: {
    backgroundColor: '#DCFCE7',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noMenu: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1F2937',
  },
    container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'center' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginBottom: 20,
    color: '#1F2937',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  errorBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center' as const,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#B91C1C',
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  errorMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center' as const,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center' as const,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600' as const,
  },
});