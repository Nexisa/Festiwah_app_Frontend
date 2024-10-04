import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView'; // Import ThemedView for consistent styling
import { useThemeColor } from '@/hooks/useThemeColor';

interface CustomBlueButtonProps {
  title: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean; // Add loading prop
}

export const CustomBlueButton: React.FC<CustomBlueButtonProps> = ({
  title,
  onPress,
  size = 'medium',
  loading = false, 
}) => {
  const backgroundColor = useThemeColor({ light: '#0a7ea4', dark: '#fff' }, 'tint'); // Themed background color
  const textColor = useThemeColor({ light: '#fff', dark: '#0a7ea4' }, 'text'); // Themed text color


  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading} 
    >
      <ThemedView
        style={[
          styles.button,
          { backgroundColor },
          sizeStyles[size],
        ]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <ThemedText
            style={{ color: textColor, textAlign: 'center', fontWeight: 'bold' }}
          >
            {title}
          </ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

// Define styles with StyleSheet
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  large: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 20,
  },
});
