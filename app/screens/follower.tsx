import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import UserCard from '@/components/Card/UserInfo';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface Follower {
  id: string;
  name: string;
  profileImage: string;
  isFollowing: boolean;
}

const FollowersScreen: React.FC = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation(); 
  const backgroundColor = useThemeColor({}, 'background'); 
  const textColor = useThemeColor({}, 'text'); 

  // Simulate fetching data
  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = () => {
    // Simulate a delay for loading
    setTimeout(() => {
      setFollowers([
        { id: '1', name: 'Reny Lewis', profileImage: 'https://via.placeholder.com/150', isFollowing: false },
        { id: '2', name: 'John Doe', profileImage: 'https://via.placeholder.com/150', isFollowing: true },
        // Add more followers dynamically
      ]);
      setLoading(false);
    }, 2000);
  };

  const handleFollowToggle = (id: string) => {
    setFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower.id === id ? { ...follower, isFollowing: !follower.isFollowing } : follower
      )
    );
  };

  const handleDelete = (id: string) => {
    setFollowers((prevFollowers) => prevFollowers.filter((follower) => follower.id !== id));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Refresh followers (could refetch data from API)
      fetchFollowers();
      setRefreshing(false);
    }, 1000);
  };

  if (loading) {
    return (
      <ThemedView className="flex-1 flex justify-center items-center" style={{ backgroundColor }}>
        <ActivityIndicator size="large" color={textColor} />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1" style={{ backgroundColor }}>
      {/* Header */}
      <View className="p-4 flex-row items-center">
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>

        <ThemedText className="text-xl font-bold" style={{ color: textColor }}>
          Followers
        </ThemedText>
      </View>

      {/* Followers List or No Followers */}
      {followers.length > 0 ? (
        <FlatList
          data={followers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserCard
              name={item.name}
              profileImage={item.profileImage}
              isFollowing={item.isFollowing}
              onFollowToggle={() => handleFollowToggle(item.id)}
              onDelete={() => handleDelete(item.id)} 
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <ThemedText className="text-lg" style={{ color: textColor }}>
            Nothing to show here
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
};

export default FollowersScreen;
