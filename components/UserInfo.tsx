import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CustomBlueButton } from '@/components/CustomBlueButton'; // Import the custom button
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons'; // Import icon library

interface UserCardProps {
  name: string;
  profileImage: string;
  isFollowing: boolean;
  onFollowToggle: () => void;
  onDelete: () => void; // Callback to remove the card
}

const UserCard: React.FC<UserCardProps> = ({ name, profileImage, isFollowing, onFollowToggle, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const borderColor = useThemeColor({}, 'border'); // Get the themed border color
  const followButtonTitle = isFollowing ? 'Following' : 'Follow';

  const handleDelete = async () => {
    setLoading(true);
    // Add a 2-second delay to simulate a loading effect
    setTimeout(() => {
      setLoading(false);
      onDelete(); // Trigger the delete callback
    }, 2000); // 2-second delay
  };

  return (
    <ThemedView style={styles.cardContainer}>
      {/* Profile Image */}
      <Image
        source={{ uri: profileImage }}
        style={[styles.profileImage, { borderColor }]} // Apply themed border color
      />

      {/* User Info */}
      <ThemedText type="defaultSemiBold" style={styles.userName}>
        {name}
      </ThemedText>

      {/* Custom Follow Button */}
      <CustomBlueButton
        title={followButtonTitle}
        onPress={onFollowToggle}
        size="medium"
        loading={false} // Set to true if needed to show loading state
      />

      {/* Delete Button (Cross Icon) */}
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="close" size={24} color="#fff" />
        )}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2c2c2e', // Dark background
    borderRadius: 10,
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 12,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  deleteButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default UserCard;
