import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
interface ScreenNamewithBackButtonProps {
  screenName: string;
}

const ScreenNamewithBackButton: React.FC<ScreenNamewithBackButtonProps> = ({ screenName }) => {
  const navigation = useNavigation();
  const textColor = useThemeColor({}, 'text');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <ThemedText type="title" style={{ color: textColor, marginLeft: 16 }}>
          {screenName}
        </ThemedText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  screenName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScreenNamewithBackButton;