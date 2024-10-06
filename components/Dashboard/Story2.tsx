import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type User = {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  storyContent?: string;
};

type StoryProps = {
  user: User;
  onPress: () => void;
};

const Story2: React.FC<StoryProps> = ({ user, onPress }) => (
  <TouchableOpacity onPress={onPress} className="items-center mx-2">
    <View className={`w-16 h-16 rounded-full overflow-hidden ${user.hasStory ? 'border-2 border-blue-500' : ''}`}>
      <Image source={{ uri: user.avatar }} className="w-full h-full" />
      {user.username === 'Your Story' && (
        <View className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-5 h-5 items-center justify-center">
          <MaterialIcons name="add" size={18} color="white" />
        </View>
      )}
    </View>
    <Text className="text-white text-xs mt-1">{user.username}</Text>
  </TouchableOpacity>
);

export default Story2;