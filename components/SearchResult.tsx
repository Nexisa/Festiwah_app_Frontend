import React from 'react';
import { Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface SearchResultProps {
  image: ImageSourcePropType;
  username: string;
  onFollow: () => void;
  isFollowing: boolean;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  image,
  username,
  onFollow,
  isFollowing,
}) => {
  const buttonClass = isFollowing ? 'bg-gray-300' : 'bg-blue-500';
  const buttonText = isFollowing ? 'Following' : 'Follow';

  return (
    <ThemedView className="flex-row items-center p-4 border-b border-gray-200">
      <Image
        source={image}
        className="w-10 h-10 rounded-full mr-4"
      />
      <ThemedText className="flex-1 font-bold">{username}</ThemedText>
      <TouchableOpacity
        className={`${buttonClass} py-1 px-3 rounded-md`}
        onPress={onFollow}
      >
        <ThemedText className="text-white">{buttonText}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};