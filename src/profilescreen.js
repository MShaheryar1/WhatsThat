import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getUserDetails } from './Main';

function ProfileScreen({ route }) {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const token = route.params.token;
        const user_id = route.params.user_id;
        getUserDetails(token, user_id)
            .then(data => {
                setUserDetails(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [route.params.token, route.params.user_id]);

    const handleLogout = route.params.handleLogout;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {userDetails ? (
                <>
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.value}>{userDetails.user_id}</Text>
                    <Text style={styles.label}>First Name:</Text>
                    <Text style={styles.value}>{userDetails.first_name}</Text>
                    <Text style={styles.label}>Last Name:</Text>
                    <Text style={styles.value}>{userDetails.last_name}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userDetails.email}</Text>
                </>
            ) : (
                <Text>Loading user details...</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    value: {
        fontSize: 16,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#1c1c1e',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileScreen;
