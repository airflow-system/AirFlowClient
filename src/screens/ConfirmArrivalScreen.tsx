import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Button,
  Task
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../styles/styles';

const ConfirmArrivalScreen = ({navigation}:any) => {

    const handleBackToList = () => {
        navigation.navigate('TaskList')
    }
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E7EB' }]}>
        <Feather name="map-pin" size={48} color="#2563EB" />
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Arrived</Text>
        <Text style={{ color: '#6B7280', marginBottom: 20 }}>Arrived at destination</Text>
      </View>
      <View style={styles.card}>
        <Button title="Confirm Arrival" onPress={handleBackToList} color="#10B981" />
      </View>
    </SafeAreaView>
  )
}

export default ConfirmArrivalScreen
