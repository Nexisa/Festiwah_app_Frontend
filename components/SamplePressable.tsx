import React from 'react';
import { Pressable,  StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

interface SamplePressableProps {
    iconName: string;
    text: string;
    press: () => void;
}
const SamplePressable: React.FC<SamplePressableProps> = ({ iconName, text, press }) => {
  const click = () => {
    press();
  }
    

    return (
        <Pressable style={styles.container} onPress={click}>
            <MaterialIcons name={iconName as never} size={30} color="blue" style={styles.icon} />
            <ThemedText style={styles.text}>{text}</ThemedText>
            <MaterialIcons name="arrow-forward" size={24} color="gray" style={styles.arrow} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
        
    },
    icon: {
        marginRight: 30,
    },
    text: {
        flex: 1,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    arrow: {
        marginLeft: 10,
    },
});

export default SamplePressable;