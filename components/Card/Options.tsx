import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, ImageSourcePropType } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

interface PostCardProps {
  image: ImageSourcePropType;
  username: string;
  timeAgo: string;
  onSavePost: () => void;
  onTurnOnAlerts: () => void;
  onHidePost: () => void;
  onUnfollow: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  image,
  username,
  timeAgo,
  onSavePost,
  onTurnOnAlerts,
  onHidePost,
  onUnfollow,
}) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => setOptionsVisible(!isOptionsVisible);

  const OptionItem = ({ icon, text, onPress }: { icon: string; text: string; onPress: () => void }) => (
    <TouchableOpacity className="flex-row items-center p-3" onPress={() => { onPress(); toggleOptions(); }}>
      <ThemedText className="mr-2">{icon}</ThemedText>
      <ThemedText>{text}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView className="rounded-lg overflow-hidden m-2">
      <Image source={image} className="w-full h-64" resizeMode="cover" />
      <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-2">
        <View className="flex-row items-center">
          <Image source={require('./assets/default-avatar.png')} className="w-8 h-8 rounded-full mr-2" />
          <ThemedText className="font-bold">{username}</ThemedText>
          <ThemedText className="ml-2 text-gray-300">{timeAgo}</ThemedText>
        </View>
        <TouchableOpacity onPress={toggleOptions}>
          <ThemedText className="text-2xl">⋮</ThemedText>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isOptionsVisible}
        onRequestClose={toggleOptions}
      >
        <TouchableOpacity
          className="flex-1 justify-end"
          activeOpacity={1}
          onPress={toggleOptions}
        >
          <ThemedView className="bg-white rounded-t-lg">
            <OptionItem icon="🔖" text="Save Post" onPress={onSavePost} />
            <OptionItem icon="🔔" text="Turn On Alerts" onPress={onTurnOnAlerts} />
            <OptionItem icon="🚫" text="Hide Post" onPress={onHidePost} />
            <OptionItem icon="👤" text="Unfollow" onPress={onUnfollow} />
          </ThemedView>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
};