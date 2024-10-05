import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface BlueButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export const BlueButton: React.FC<BlueButtonProps> = ({ title, onPress, loading = false }) => {
  const backgroundColor = useThemeColor({ light: '#0a7ea4', dark: '#fff' }, 'tint');
  const spinnerColor = useThemeColor({ light: '#fff', dark: '#0a7ea4' }, 'text');

  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <ThemedView
        style={{
          backgroundColor,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 16,
        }}
      >
        {loading ? (
          <ActivityIndicator color={spinnerColor} size="small" />
        ) : (
          <ThemedText
            type="defaultSemiBold"
            lightColor="#fff" 
            darkColor="#0a7ea4"  
            style={{ textAlign: 'center' }}
          >
            {title}
          </ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};
