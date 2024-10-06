import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Story2, { User } from '@/components/Dashboard/Story2';
import StoryView from '@/components/Dashboard/StoryView';
import { PostCard } from '@/components/Card/Options';
const USERS: User[] = [
  { id: '1', username: 'Your Story', avatar: 'https://picsum.photos/150', hasStory: false },
  { id: '2', username: 'john_doe', avatar: 'https://picsum.photos/160', hasStory: true, storyContent: 'https://picsum.photos/1080' },
  { id: '3', username: 'jane_smith', avatar: 'https://picsum.photos/170', hasStory: true, storyContent: 'https://picsum.photos/1070' },
  { id: '4', username: 'mike_johnson', avatar: 'https://picsum.photos/180', hasStory: true, storyContent: 'https://picsum.photos/1050' },
  { id: '5', username: 'emily_brown', avatar: 'https://picsum.photos/190', hasStory: true, storyContent: 'https://picsum.photos/1090' },
];
/*
const Home: React.FC = () => {
  const [viewingStoryIndex, setViewingStoryIndex] = useState<number | null>(null);

  const handleStoryPress = (index: number) => {
    if (index === 0) {
      // Handle "Your Story" press (e.g., open camera or story creation screen)
      console.log("Open story creation");
    } else if (USERS[index].hasStory) {
      setViewingStoryIndex(index);
    }
  };

  const renderStory = ({ item, index }: { item: User; index: number }) => (
    <Story2 user={item} onPress={() => handleStoryPress(index)} />
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      {viewingStoryIndex !== null ? (
        <StoryView 
          users={USERS.filter(user => user.hasStory)} 
          initialIndex={viewingStoryIndex - 1}
          onComplete={() => setViewingStoryIndex(null)} 
        />
      ) : (
        <>
          <View className="flex-row justify-between items-center px-4 py-2">
            <Text className="text-white text-2xl font-bold">Instagram</Text>
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={USERS}
            renderItem={renderStory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="py-2"
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
*/
const Home: React.FC = () => {
  const [viewingStoryIndex, setViewingStoryIndex] = useState<number | null>(null);

  const handleStoryPress = (index: number) => {
    if (index === 0) {
      // Handle "Your Story" press (e.g., open camera or story creation screen)
      console.log("Open story creation");
    } else if (USERS[index].hasStory) {
      setViewingStoryIndex(index);
    }
  };

  const renderStory = ({ item, index }: { item: User; index: number }) => (
    <Story2 user={item} onPress={() => handleStoryPress(index)} />
  );

  //screen width height
  const { width, height } = useWindowDimensions();
  const renderPost = ({ item, index }: { item: User; index: number }) => (
    <PostCard 
      image={{ uri: item.storyContent }} 
      username={item.username} 
      timeAgo="1h" 
      onSavePost={() => console.log('Save post')} 
      onTurnOnAlerts={() => console.log('Turn on alerts')} 
      onHidePost={() => console.log('Hide post')} 
      onUnfollow={() => console.log('Unfollow')} 
      size={{ width: width*0.95, height: height / 2 }} 
    />
  );
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      {viewingStoryIndex !== null ? (
        <StoryView 
          users={USERS.filter(user => user.hasStory)} 
          initialIndex={viewingStoryIndex - 1}
          onClose={() => setViewingStoryIndex(null)} 
        />
      ) : (
        <>
          <View className="flex-row justify-between items-center px-4 py-2 pt-7">
            <Text className="text-white text-2xl font-bold">Festiwah</Text>
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={USERS}
            renderItem={renderStory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            className=""
          />
         
          <FlatList
            data={USERS}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            className=" "  
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;