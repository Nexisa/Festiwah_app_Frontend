import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Modal, ImageSourcePropType, StyleSheet } from 'react-native';
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
  size?: { width: number; height: number }; // Size prop
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
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const toggleOptions = () => setOptionsVisible(!isOptionsVisible);

  const OptionItem = ({ icon, text, onPress }: { icon: string; text: string; onPress: () => void }) => {
    const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
    
    return (
      <TouchableOpacity className="flex-row items-center p-3" onPress={() => { onPress(); toggleOptions(); }}>
        <ThemedText className="mr-2">{icon}</ThemedText>
        <ThemedText style={{ color: textColor }}>{text}</ThemedText>
      </TouchableOpacity>
    );
  };

  const handleThreeDotsLayout = (event: any) => {
    const { x, y, height } = event.nativeEvent.layout;
    setModalPosition({ top: y + height, left: x });
  };

  const modalBackgroundColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');

  return (
    <ThemedView className="rounded-lg overflow-hidden m-2" style={{ width: size.width }}>
      <Image source={image} className="w-full h-64" resizeMode="cover" />
      <View className="absolute top-0 left-0 right-0 flex-row justify-between items-center p-2">
        <View className="flex-row items-center">
          <Image source={require('./assets/default-avatar.png')} className="w-8 h-8 rounded-full mr-2" />
          <ThemedText className="font-bold">{username}</ThemedText>
          <ThemedText className="ml-2 text-gray-300">{timeAgo}</ThemedText>
        </View>
        <TouchableOpacity onPress={toggleOptions} onLayout={handleThreeDotsLayout}>
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
          <ThemedView 
            className="rounded-t-lg"
            style={{
              backgroundColor: modalBackgroundColor,
              position: 'absolute',
              top: modalPosition.top,
              left: modalPosition.left,
              width: size.width - 40, // Adjust modal width
            }}
          >
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
