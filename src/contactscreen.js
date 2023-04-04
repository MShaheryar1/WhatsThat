import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ContactScreen;
