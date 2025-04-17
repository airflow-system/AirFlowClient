import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Button
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../styles/styles';

interface Task {
    id: number;
    type: 'Pickup' | 'Dropoff';
    location: string;
    destination: string;
    pickupTime: string;
    completionTime: string;
    cargo: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    dispatcher: string;
    dispatcherContact: string;
    parkingLot: string;
    dockingSpot: string;
    recommendedSpeed: string;
  }

  const tasks: Task[] = [
    {
      id: 1,
      type: 'Pickup',
      location: 'Amazon Warehouse - Dallas',
      destination: 'DFW Airport - Terminal C',
      pickupTime: '10:30 AM',
      completionTime: '11:45 AM',
      cargo: 'Electronics',
      priority: 'High',
      dispatcher: 'John Smith',
      dispatcherContact: '(214) 555-7890',
      parkingLot: 'B4',
      dockingSpot: 'C12',
      recommendedSpeed: '45 mph'
    },
    {
      id: 2,
      type: 'Dropoff',
      location: 'DFW Airport - Terminal B',
      destination: 'Amazon Fulfillment Center',
      pickupTime: '1:15 PM',
      completionTime: '2:30 PM',
      cargo: 'Perishables',
      priority: 'Medium',
      dispatcher: 'Sarah Johnson',
      dispatcherContact: '(214) 555-1234',
      parkingLot: 'A2',
      dockingSpot: 'B8',
      recommendedSpeed: '40 mph'
    }
  ];

const taskListScreen = ({ navigation }: any) => {

    function handleTaskSelect(task: Task): void {
      navigation.navigate('TaskDetailScreen',{
        id: task.id,
        type: task.type,
        location: task.location,
        destination: task.location,
        pickupTime: task.pickupTime,
        completionTime: task.completionTime,
        cargo: task.cargo,
        priority: task.priority,
        dispatcher: task.dispatcher,
        dispatcherContact: task.dispatcherContact,
        parkingLot: task.parkingLot,
        dockingSpot: task.dockingSpot,
        recommendedSpeed: task.recommendedSpeed
      });
    }

    function handleBackToList(): void {
        throw new Error('Function not implemented.');
    }

    function setCurrentScreen(): void {
        throw new Error('Function not implemented.');
    }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}><Text style={styles.headerTitle}>My Delivery Blocks</Text></View>
      <ScrollView style={styles.scrollContent}>
        {tasks.map(task => (
          <TouchableOpacity key={task.id} style={styles.card} onPress={() => handleTaskSelect(task)}>
            <View style={styles.rowBetween}>
              <View style={[styles.iconCircle, task.type === 'Pickup' ? styles.green : styles.blue]}>
                <Feather name={task.type === 'Pickup' ? 'package' : 'truck'} size={20} color={task.type === 'Pickup' ? '#059669' : '#2563EB'} />
              </View>
              <Text style={styles.taskType}>{task.type}</Text>
              <Feather name="arrow-right" size={20} color="#9CA3AF" />
            </View>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{task.location}</Text>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{task.destination}</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeItem}><Feather name="clock" size={16} color="#6B7280" /><Text style={styles.timeText}>Pickup: {task.pickupTime}</Text></View>
              <View style={styles.timeItem}><Feather name="clock" size={16} color="#6B7280" /><Text style={styles.timeText}>Complete: {task.completionTime}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Tasks" onPress={handleBackToList} />
        <Button title="History" onPress={() => setCurrentScreen()} />
        <Button title="Profile" onPress={() => {}} />
      </View>
    </SafeAreaView>
  )
}

export default taskListScreen;