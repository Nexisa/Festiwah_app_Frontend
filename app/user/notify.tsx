import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { BlueButton } from '../../components/BlueButton';
import { SearchBar } from '../../components/Card/SearchComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface NotificationScreenProps {
  notifications?: Array<{ id: number; username: string; time: string }>;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ notifications = [] }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const hasNotifications = notifications.length > 0;


  const filteredNotifications = notifications.filter(notification =>
    notification.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate loading (if you have an async search, like fetching from an API)
    setTimeout(() => setIsLoading(false), 500); 
  };

  return (
    <ThemedView className="flex-1 bg-dark">
      <ThemedView className="flex-row items-center p-8 mt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <ThemedText type="title" className="text-white ml-4">
          Notification
        </ThemedText>
      </ThemedView>

      <ThemedView className="items-center">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search notifications..."
          isLoading={isLoading}
          size={{ width: 300, height: 50 }}
        />
      </ThemedView>

      {hasNotifications ? (
        <ScrollView>
          {filteredNotifications.map((notification) => (
            <ThemedView
              key={notification.id}
              className="flex-row items-center border-b border-gray-700 p-4"
            >
              <Ionicons name="person-circle-outline" size={40} color="white" />
              <ThemedText className="text-white ml-4">{notification.username}</ThemedText>
              <ThemedText className="text-gray-400 ml-auto">{notification.time}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      ) : (
        <ThemedView className="flex-1 items-center justify-center p-8 mb-8">
          <ThemedText className="text-gray-400">No Recent Notifications</ThemedText>
          <BlueButton title="Go Home" onPress={() => console.log('Go Home')} />
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default NotificationScreen;