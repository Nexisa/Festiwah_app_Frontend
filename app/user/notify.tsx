import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image, ActivityIndicator, RefreshControl, TextInput, View, Animated } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { BlueButton } from '../../components/BlueButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '../../hooks/useThemeColor';

interface Notification {
  id: number;
  username: string;
  time: string;
  description: string;
  imageUri?: string;
}

const NotificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Hardcoded multiple notifications with descriptions
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      username: 'Rahul Kumar',
      time: '2 hours ago',
      description: 'Rahul commented on your post.',
      imageUri: 'https://www.example.com/rahul.jpg',
    },
    {
      id: 2,
      username: 'Rohan Singh',
      time: '30 minutes ago',
      description: 'Rohan liked your post.',
      imageUri: 'https://www.example.com/rohan.jpg',
    },
    {
      id: 3,
      username: 'Soham Desai',
      time: '1 day ago',
      description: 'Soham started following you.',
      imageUri: 'https://www.example.com/soham.jpg',
    },
  ]);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSearchChange = (query: string) => {
    if (query.length < searchQuery.length) {

      fadeOut();
      setTimeout(() => {
        fadeIn();
      }, 200);
    } else {

      fadeOut();
      setTimeout(() => {
        fadeIn();
      }, 200);
    }
    setSearchQuery(query);
  };

  // Dynamically filter notifications based on search query
  const filteredNotifications = useMemo(() => {
    if (searchQuery.trim() === '') {
      return notifications;
    }

    // Delay the transition when removing unrelated notifications
    fadeOut();
    setTimeout(() => {
      fadeIn();
    }, 200);

    return notifications.filter(notification =>
      notification.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, notifications]);

  const handleRemoveNotification = (id: number) => {
    // Remove notification by id
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // Simulate refreshing (this can be replaced with actual data fetching)
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor }}>
      <ThemedView className="flex-row items-center p-8 mt-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="title" style={{ color: textColor, marginLeft: 16 }}>
          Notifications
        </ThemedText>
      </ThemedView>

      {/* Dynamic and responsive SearchBar */}
      <View style={{ alignItems: 'center', paddingHorizontal: '5%', marginBottom: 20 }}>
        <TextInput
          value={searchQuery}
          onChangeText={handleSearchChange}
          placeholder="Search notifications..."
          style={{
            width: '90%',
            height: 50,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            paddingHorizontal: 10,
            fontSize: 16,
          }}
        />
      </View>

      {/* Loading indicator */}
      {isLoading ? (
        <ThemedView className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={textColor} />
        </ThemedView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Animated.View
                key={notification.id}
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }}
              >
                <ThemedView
                  className="flex-row items-center border-b border-gray-700 p-4"
                  style={{ width: '90%', marginHorizontal: '5%' }}
                >
                  <Image
                    source={{ uri: notification.imageUri }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                  <View style={{ marginLeft: 16, flex: 1 }}>
                    <ThemedText style={{ color: textColor }}>
                      {notification.username}
                    </ThemedText>
                    <ThemedText style={{ color: 'gray', fontSize: 12 }}>
                      {notification.description}
                      {/* Notification description */}
                    </ThemedText>
                  </View>
                  <ThemedText style={{ color: 'gray', marginLeft: 'auto' }}>
                    {notification.time}
                  </ThemedText>
                  {/* Cross button to remove notification */}
                  <TouchableOpacity onPress={() => handleRemoveNotification(notification.id)}>
                    <Ionicons name="close-circle" size={24} color="red" style={{ marginLeft: 16 }} />
                  </TouchableOpacity>
                </ThemedView>
              </Animated.View>
            ))
          ) : (
            <ThemedView className="flex-1 items-center justify-center p-8 mb-8">
              <ThemedText style={{ color: 'gray' }}>No Recent Notifications</ThemedText>
              <BlueButton title="Go Home" onPress={() => console.log('Go Home')} />
            </ThemedView>
          )}
        </ScrollView>
      )}
    </ThemedView>
  );
};

export default NotificationScreen;
