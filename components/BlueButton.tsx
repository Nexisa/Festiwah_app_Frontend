import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

interface BlueButtonProps {
  title: string;
  onPress: () => void;
}

export const BlueButton: React.FC<BlueButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity
    className="bg-blue-500 py-2 px-4 rounded-md"
    onPress={onPress}
  >
    <ThemedText className="text-white font-bold text-center">
      {title}
    </ThemedText>
  </TouchableOpacity>
);