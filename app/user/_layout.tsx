import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused?"#0976E9": color} />
          ),
        }}
      />
        <Tabs.Screen
            name="comment"
            options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
                <Feather style={{ marginBottom: -18 }} name={focused ? 'edit' : 'edit'} color={focused?"#0976E9": color} size={18} />
            ),
            }}
        />
        <Tabs.Screen
            name="plus"
            options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon style={{ marginBottom: -15 }}  name={focused ? 'add-circle' : 'add-circle'} color={"#0976E9"} size={51} />
            ),
            }}  
        />
        <Tabs.Screen
            name="notify"
            options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={focused?"#0976E9": color} />
            ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'person' : 'person-outline'} color={focused?"#0976E9": color} />
            ),
            }}
        />

      
    </Tabs>
  );
}
