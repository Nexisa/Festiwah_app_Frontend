import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType, StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface PostCardProps {
  image: ImageSourcePropType;
  username: string;
  timeAgo: string;
  onSavePost: () => void;
  onTurnOnAlerts: () => void;
  onHidePost: () => void;
  onUnfollow: () => void;
  size?: { width: number; height: number };
}

export const PostCard: React.FC<PostCardProps> = ({
  image,
  username,
  timeAgo,
  onSavePost,
  onTurnOnAlerts,
  onHidePost,
  onUnfollow,
  size = { width: 300, height: 250 }, // Default size
}) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const toggleOptions = () => setOptionsVisible((prev) => !prev);

  const OptionItem = ({
    icon,
    text,
    onPress,
  }: {
    icon: string;
    text: string;
    onPress: () => void;
  }) => {
    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

    return (
      <TouchableOpacity
        className="flex-row items-center p-3"
        onPress={onPress}
        accessibilityLabel={text}
        accessibilityRole="button"
      >
        <ThemedText className="mr-2">{icon}</ThemedText>
        <ThemedText style={{ color: textColor }}>{text}</ThemedText>
      </TouchableOpacity>
    );
  };

  const modalBackgroundColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');

  return (
    <ThemedView className="rounded-lg overflow-hidden m-2" style={{ width: size.width }}>
      {/* Post Image */}
      <Image
        source={image}
        className="w-full h-64"
        resizeMode="cover"
        onError={() => console.log('Error loading image')} // Image error handling
      />

      {/* Post Header with Username and Time */}
      <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-2">
        <View className="flex-row items-center">
          <Image
            source={require('../../assets/images/profile.png')}
            className="w-8 h-8 rounded-full mr-2"
          />
          <ThemedText className="font-bold">{username}</ThemedText>
          <ThemedText className="ml-2 text-gray-300">{timeAgo}</ThemedText>
        </View>

        {/* Three dots for options */}
        <TouchableOpacity onPress={toggleOptions} accessibilityLabel="Options" accessibilityRole="button">
          <ThemedText className="text-2xl">⋮</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Options Card - Displayed below the three dots */}
      {isOptionsVisible && (
        <ThemedView
          className="rounded-lg absolute"
          style={{
            backgroundColor: modalBackgroundColor,
            top: 40, // Positioned just below the header
            right: 10, // Adjust to align with the three dots
            width: 200, // Set card width
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
          }}
        >
          <OptionItem
            icon="📌"
            text="Save Post"
            onPress={onSavePost}
          />
          <OptionItem
            icon="🔔"
            text="Turn On Alerts"
            onPress={onTurnOnAlerts}
          />
          <OptionItem
            icon="🚫"
            text="Hide Post"
            onPress={onHidePost}
          />
          <OptionItem
            icon="👤"
            text="Unfollow"
            onPress={onUnfollow}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
};
