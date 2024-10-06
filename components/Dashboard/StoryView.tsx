import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { User } from './Story2';

type StoryViewProps = {
  users: User[];
  initialIndex: number;
  onClose: () => void;
};

const STORY_DURATION = 5000; // 5 seconds per story
function storycomplete()  {
    console.log('Story Complete');
    }
const StoryView: React.FC<StoryViewProps> = ({ users, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const progress = useSharedValue(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const playStory = () => {
    setIsPlaying(true);
    progress.value = withTiming(1, {
      duration: STORY_DURATION * (1 - progress.value),
      easing: Easing.linear,
    }, (finished) => {
      if (finished) {
        //TODO auto story complete is creating bugs( is not a function is object)
      }
    });
  };
  
  
  const handleStoryComplete = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(prev => prev + 1);
      progress.value = 0;
    } else {
      onClose();
    }
  };
  const pauseStory = () => {
    setIsPlaying(false);
    progress.value = progress.value; // This stops the animation
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const nextStory = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
      progress.value = 0;
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      progress.value = 0;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playStory();
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [currentIndex, isPlaying]);
  useEffect(() => {
    if (isPlaying) {
      playStory();
    } else {
      pauseStory();
    }
  }, [isPlaying, currentIndex]);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const currentUser = users[currentIndex];

  return (
    <View className="flex-1 bg-black">
      <View className="h-1 bg-gray-500 absolute top-10 left-4 right-4 z-10">
        <Animated.View className="h-full bg-white" style={animatedStyle} />
      </View>
      <View className="absolute top-14 left-4 right-4 z-20 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Image source={{ uri: currentUser.avatar }} className="w-8 h-8 rounded-full mr-2" />
          <Text className="text-white font-bold">{currentUser.username}</Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)} className="mr-4">
            <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: currentUser.storyContent }} className="w-full h-full" resizeMode="cover" />
      <TouchableOpacity className="absolute left-0 top-0 bottom-0 w-1/3" onPress={prevStory} />
      <TouchableOpacity className="absolute right-0 top-0 bottom-0 w-1/3" onPress={nextStory} />
    </View>
  );
};

export default StoryView;