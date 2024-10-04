import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  size?: { width: number; height: number }; // Size prop
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search',
  isLoading = false,
  size = { width: 300, height: 50 }, 
}) => {
  const [query, setQuery] = useState('');
  const backgroundColor = useThemeColor({ light: '#1f2937', dark: '#3b3b3b' }, 'background'); // Background color
  const borderColor = useThemeColor({ light: '#3b82f6', dark: '#60a5fa' }, 'tint'); // Border color
  const textColor = useThemeColor({ light: '#fff', dark: '#fff' }, 'text'); // Text color
  const placeholderColor = useThemeColor({ light: '#6B7280', dark: '#9ca3af' }, 'text'); // Placeholder color
  const iconColor = useThemeColor({ light: '#3b82f6', dark: '#60a5fa' }, 'tint'); // Icon color

  const handleSearch = () => {
    if (!isLoading && query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <ThemedView className="m-4" style={{ width: size.width }}>
      <ThemedView
        className="flex-row items-center border rounded-md px-4 py-2"
        style={{
          backgroundColor,
          borderColor,
          height: size.height,
        }}
      >
        <TextInput
          className="flex-1"
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          editable={!isLoading}
          style={{ color: textColor }} 
        />
        {isLoading ? (
          <ActivityIndicator size="small" color={iconColor} />
        ) : (
          <TouchableOpacity onPress={handleSearch} disabled={isLoading}>
            <ThemedText className="text-xl" style={{ color: iconColor }}>🔍</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ThemedView>
  );
};
