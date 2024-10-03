import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

interface CustomBlueButtonProps {
  title: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
}

export const CustomBlueButton: React.FC<CustomBlueButtonProps> = ({
  title,
  onPress,
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'py-1 px-2 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  };

  return (
    <TouchableOpacity
      className={`bg-blue-500 rounded-md ${sizeClasses[size]}`}
      onPress={onPress}
    >
      <ThemedText className="text-white font-bold text-center">
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};