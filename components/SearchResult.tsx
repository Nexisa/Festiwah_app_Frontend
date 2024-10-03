import React from 'react';
import { Image, TouchableOpacity, ImageSourcePropType, ActivityIndicator } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SearchResultProps {
  image: ImageSourcePropType;
  username: string;
  onFollow: () => void;
  isFollowing: boolean;
  loading?: boolean; 
}

export const SearchResult: React.FC<SearchResultProps> = ({
  image,
  username,
  onFollow,
  isFollowing,
  loading = false, 
}) => {
  const buttonBackgroundColor = useThemeColor(
    { light: '#0a7ea4', dark: '#333' }, 
    isFollowing ? 'text' : 'tint' 
  );
  const buttonTextColor = useThemeColor({ light: '#fff', dark: '#fff' }, 'text');

  const buttonText = isFollowing ? 'Following' : 'Follow';

  return (
    <ThemedView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      }}
    >
      <Image
        source={image}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 16 }}
      />
      <ThemedText style={{ flex: 1, fontWeight: 'bold' }}>{username}</ThemedText>
      <TouchableOpacity
        style={{
          backgroundColor: buttonBackgroundColor,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
        onPress={onFollow}
        disabled={loading} 
      >
        {loading ? (
          <ActivityIndicator color={buttonTextColor} size="small" /> 
        ) : (
          <ThemedText style={{ color: buttonTextColor }}>{buttonText}</ThemedText>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};
