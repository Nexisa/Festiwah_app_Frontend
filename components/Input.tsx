import React from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface InputProps {
  iconName: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ iconName, placeholder, value, onChangeText }) => {
  const theme = useColorScheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <View style={styles.inputContainer}>
      <MaterialIcons name="person-outline" size={24} color={theme === 'dark' ? 'white' : 'black'} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={theme === 'dark' ? 'lightgray' : 'gray'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const lightStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});

const darkStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    backgroundColor: 'black',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default Input;
