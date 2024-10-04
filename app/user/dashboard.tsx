import { PostCard } from '@/components/Card/Options';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
const Dashboard: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
           <PostCard

            image={require("../../assets/images/profile.png")}
            username="John Doe"
            timeAgo="2 hours ago"
            onSavePost={() => {}}
            onTurnOnAlerts={() => {}}
            onHidePost={() => {}}
            onUnfollow={() => {}}
            size={{ width: 300, height: 250 }}
            />
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