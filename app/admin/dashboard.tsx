import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Dashboard: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Admin Dashboard</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Users</Text>
                {/* Add user management components here */}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reports</Text>
                {/* Add report components here */}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                {/* Add settings components here */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#6200ee',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Dashboard;