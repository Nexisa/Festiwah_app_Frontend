import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search',
  isLoading = false
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!isLoading && query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <ThemedView className="m-4">
      <View className="flex-row items-center bg-gray-900 border border-blue-500 rounded-md px-4 py-2">
        <TextInput
          className="flex-1 text-white"
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          editable={!isLoading}
        />
        {isLoading ? (
          <ActivityIndicator size="small" color="#3B82F6" />
        ) : (
          <TouchableOpacity onPress={handleSearch} disabled={isLoading}>
            <ThemedText className="text-blue-500 text-xl">🔍</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
};