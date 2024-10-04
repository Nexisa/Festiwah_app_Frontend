import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PasswordProps {
  iconName: string;
  placeholder: string;
}

const Password: React.FC<PasswordProps> = ({ iconName, placeholder }) => {
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const theme = useColorScheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <View style={styles.inputContainer}>
      <MaterialIcons name="lock-outline" size={24} color={theme === 'dark' ? 'white' : 'black'} />
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={theme === 'dark' ? 'lightgray' : 'gray'}
        value={password}
        secureTextEntry={isHidden}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
        <MaterialIcons
          name={isHidden ? 'visibility-off' : 'visibility'}
          size={24}
          color={theme === 'dark' ? 'lightgray' : 'gray'}
        />
      </TouchableOpacity>
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

export default Password;
