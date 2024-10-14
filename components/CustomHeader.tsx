import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, useColorScheme, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CustomHeaderProps {
  title: string;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const router = useRouter();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? 'black' : 'white';
  const textColor = isDarkMode ? 'white' : 'black';

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme,
      padding: 10,
      paddingTop: 40,
    },
    headerLeft: {
      marginLeft: 10,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: textColor,
    },
    title: {
      color: textColor,
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingLeft: 50,
    

    },
  });

  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerLeft} onPress={() => router.back()}>
        <View style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
};