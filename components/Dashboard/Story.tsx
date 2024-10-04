import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, cancelAnimation, Easing } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface StoryScreenProps {
  userImage: string;
  username: string;
  storyContent: string;
  isLoading: boolean;
}

const StoryScreen: React.FC<StoryScreenProps> = ({ userImage, username, storyContent, isLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      cancelAnimation(rotation);
    }
  }, [isLoading]);

  useEffect(() => {
    if (modalVisible) {
      progress.value = withTiming(1, { duration: 5000 });
    } else {
      progress.value = 0;
    }
  }, [modalVisible]);

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View className="w-20 h-20 rounded-full border-2 border-blue-500 justify-center items-center">
          <Image
            source={{ uri: userImage }}
            className="w-18 h-18 rounded-full"
          />
          {isLoading && (
            <Animated.View
              style={[rotationStyle, { position: 'absolute', width: 80, height: 80 }]}
            >
              <View className="w-full h-full rounded-full border-2 border-blue-500 border-t-transparent" />
            </Animated.View>
          )}
        </View>
        <Text className="text-center mt-2">{username}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black">
          <View className="h-1 w-full bg-gray-700 mt-10">
            <Animated.View className="h-full bg-blue-500" style={progressStyle} />
          </View>
          <View className="flex-row items-center p-4">
            <Image
              source={{ uri: userImage }}
              className="w-10 h-10 rounded-full mr-3"
            />
            <Text className="text-white font-bold">{username}</Text>
            <TouchableOpacity
              className="ml-auto"
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg">{storyContent}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StoryScreen;