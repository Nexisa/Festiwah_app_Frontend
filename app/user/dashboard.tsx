import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Dashboard: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>User Dashboard</Text>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Profile</Text>
                <Text style={styles.cardContent}>Name: John Doe</Text>
                <Text style={styles.cardContent}>Email: john.doe@example.com</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Recent Activities</Text>
                <Text style={styles.cardContent}>- Logged in</Text>
                <Text style={styles.cardContent}>- Updated profile</Text>
                <Text style={styles.cardContent}>- Posted a comment</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Statistics</Text>
                <Text style={styles.cardContent}>Posts: 10</Text>
                <Text style={styles.cardContent}>Comments: 25</Text>
                <Text style={styles.cardContent}>Likes: 50</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default Dashboard;