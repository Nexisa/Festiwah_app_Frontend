import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';

interface IGTVProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const IGTV: React.FC<IGTVProps> = ({ imageUrl, title, subtitle }) => {
  const theme = useColorScheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'lightgray',
  },
});

export default IGTV;
