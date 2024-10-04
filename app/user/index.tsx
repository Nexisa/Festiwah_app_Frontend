import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import StoryScreen from '@/components/Dashboard/Story';
import { PostCard } from '@/components/Card/Options';
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
        <Text className="text-xl font-bold">Festiwah</Text>
        <Feather name='search' className="text-black" size={24} />
      </View>

      {/* Stories Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-4">
        
        {stories.map((story, index) => (
          <StoryScreen key={index} username={story} userImage={'../../assets/test/back.jpeg'} storyContent={'this is a story'} isLoading={true} />
        ))}
        
      </ScrollView>

      {/* Rest of the feed would go here */}
      <View className="flex-1 justify-center items-center">
        <ScrollView>
          <PostCard

            image={require('../../assets/test/back.jpeg')}
            username="User1"
            timeAgo="2 hours ago"
            onSavePost={() => {}}
            onTurnOnAlerts={() => {}}
            onHidePost={() => {}}
            onUnfollow={() => {}}
            size={{ width: 300, height: 250 }}
          />
          </ScrollView> 
               </View>
    </View>
  );
};

export default InstaStoryDashboard;