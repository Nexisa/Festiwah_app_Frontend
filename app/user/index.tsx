import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import StoryScreen from '@/components/Dashboard/Story';
interface StoryCircleProps {
  username: string;
  isAdd?: boolean;
}


const InstaStoryDashboard = () => {
  const stories = ['Your Story', 'User1', 'User2', 'User3', 'User4'];

  return (
    <View className="flex-1 bg-white">
      {/* Top Bar */}
      <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
        <Text className="text-xl font-bold">Instagram</Text>
        <Feather name='camera' className="text-black" size={24} />
      </View>

      {/* Stories Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-4">
        
        {stories.map((story, index) => (
          <StoryScreen key={index} username={story} userImage={''} storyContent={'../../assets/test/back.jpeg'} isLoading={true} />
        ))}
        
      </ScrollView>

      {/* Rest of the feed would go here */}
      <View className="flex-1 justify-center items-center">
        <Text>Feed content goes here</Text>
      </View>
    </View>
  );
};

export default InstaStoryDashboard;