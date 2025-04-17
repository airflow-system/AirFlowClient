import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RouteScreen from '../screens/RouteScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import MapScreen from '../screens/MapScreen';
import ConfirmArrivalScreen from '../screens/ConfirmArrivalScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Route: {
    tripId: string;
    currentLocation: { latitude: number; longitude: number };
    relevantLocation: { latitude: number; longitude: number };
    encodedPolyline: string;
    estimatedArrivalTime: string;
    reservedParkingSlot: any;
    latestDaliAdvice: any;
  };
  TaskList:undefined;
  TaskDetailScreen:{
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
  MapScreen: {
    action: 'parking' | 'docking';
    title: string;
    description: string;
    infoLabel: string;
    infoValue: string;
  };
  ConfirmArrivalScreen:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name='TaskList' component={TaskListScreen}/>
        <Stack.Screen name='TaskDetailScreen' component={TaskDetailScreen}/>
        <Stack.Screen name='MapScreen' component={MapScreen}/>
        <Stack.Screen name='ConfirmArrivalScreen' component={ConfirmArrivalScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Route" component={RouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
