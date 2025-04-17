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
import { RootStackParamList } from '../navigation/appNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';


type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetailScreen'>;

interface TaskScreenProps {
    task: {
      params: {
        id: number,
        type: 'Pickup' | 'Dropoff',
        location: string,
        destination: string,
        pickupTime: string,
        completionTime: string,
        cargo: string,
        priority: 'Low' | 'Medium' | 'High' | 'Critical',
        dispatcher: string,
        dispatcherContact: string,
        parkingLot: string,
        dockingSpot: string,
        recommendedSpeed: string
      };
    };
    navigation: any;
  }

type PriorityLevel = 'high' | 'medium' | 'low' | 'critical';

const TaskDetailScreen = ({navigation}:any) => {

  // console.log(task);
  const task = useRoute<TaskDetailRouteProp>();
  const {
    id,
    type,
    location,
    destination,
    pickupTime,
    completionTime,
    cargo,
    priority,
    dispatcher,
    dispatcherContact,
    parkingLot,
    dockingSpot,
    recommendedSpeed,
  } = task.params;
      
    // const priorityKey = task.priority.toLowerCase() as PriorityLevel;
    function handleBackToList(): void {
        throw new Error('Function not implemented.');
    }

    function handleMapView(action: 'parking' | 'docking'): void {
      const isPickup = action === 'parking';

        navigation.navigate('MapScreen',{
          action: action,
          location:task.params.location,
          destination:task.params.destination,
          parkingLot:task.params.parkingLot,
          dockingSpot:task.params.dockingSpot,
          recommendedSpeed:task.params.recommendedSpeed,
          title: 'Map View', 
          description: `Navigating to ${isPickup ? location : destination}`,
          infoLabel: isPickup ? 'Recommended Speed' : 'Docking Spot',
          infoValue: isPickup ? recommendedSpeed : dockingSpot
        })
    }

    return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}><Button title="← Back" onPress={handleBackToList} /><Text style={styles.headerTitle}>Task Details</Text></View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={[styles.iconCircle, type === 'Pickup' ? styles.green : styles.blue]}>
              <Feather name={type === 'Pickup' ? 'package' : 'truck'} size={24} color={type === 'Pickup' ? '#059669' : '#2563EB'} />
            </View>
            <Text style={styles.taskType}>{type}</Text>
            <View style={[styles.priority]}><Text>{priority}</Text></View>
          </View>
          <Text style={styles.label}>From</Text><Text style={styles.value}>{location}</Text>
          <Text style={styles.label}>To</Text><Text style={styles.value}>{destination}</Text>
          <Text style={styles.label}>Pickup</Text><Text style={styles.value}>{pickupTime}</Text>
          <Text style={styles.label}>Complete By</Text><Text style={styles.value}>{completionTime}</Text>
          <Text style={styles.label}>Cargo</Text><Text style={styles.value}>{cargo}</Text>
          <Text style={styles.label}>Dispatcher</Text><Text style={styles.value}>{dispatcher} ({dispatcherContact})</Text>
          <View style={styles.rowBetween}>
            <Button title="Navigate to Pickup" onPress={() => handleMapView('parking')} />
            <Button title="Navigate to Dropoff" onPress={() => handleMapView('docking')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TaskDetailScreen
