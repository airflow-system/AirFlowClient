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

const LogisticsApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setCurrentScreen(2);
  };

  const handleMapView = (type: 'parking' | 'docking') => {
    setCurrentScreen(type === 'parking' ? 3 : 4);
  };

  const handleConfirmArrival = () => {
    setCurrentScreen(5);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
    setCurrentScreen(1);
  };

  const TaskListScreen: React.FC<{ tasks: Task[] }> = ({ tasks }) => (
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
        <Button title="History" onPress={() => setCurrentScreen(6)} />
        <Button title="Profile" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
  
  type PriorityLevel = 'high' | 'medium' | 'low' | 'critical';

  const TaskDetailScreen: React.FC<{ task: Task }> = ({ task }) => {
    // const priorityKey = task.priority.toLowerCase() as PriorityLevel;
    return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}><Button title="← Back" onPress={handleBackToList} /><Text style={styles.headerTitle}>Task Details</Text></View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={[styles.iconCircle, task.type === 'Pickup' ? styles.green : styles.blue]}>
              <Feather name={task.type === 'Pickup' ? 'package' : 'truck'} size={24} color={task.type === 'Pickup' ? '#059669' : '#2563EB'} />
            </View>
            <Text style={styles.taskType}>{task.type}</Text>
            <View style={[styles.priority]}><Text>{task.priority}</Text></View>
          </View>
          <Text style={styles.label}>From</Text><Text style={styles.value}>{task.location}</Text>
          <Text style={styles.label}>To</Text><Text style={styles.value}>{task.destination}</Text>
          <Text style={styles.label}>Pickup</Text><Text style={styles.value}>{task.pickupTime}</Text>
          <Text style={styles.label}>Complete By</Text><Text style={styles.value}>{task.completionTime}</Text>
          <Text style={styles.label}>Cargo</Text><Text style={styles.value}>{task.cargo}</Text>
          <Text style={styles.label}>Dispatcher</Text><Text style={styles.value}>{task.dispatcher} ({task.dispatcherContact})</Text>
          <View style={styles.rowBetween}>
            <Button title="Navigate to Pickup" onPress={() => handleMapView('parking')} />
            <Button title="Navigate to Dropoff" onPress={() => handleMapView('docking')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

  const MapScreen: React.FC<{ title: string; description: string; infoLabel: string; infoValue: string; onNext: () => void }> = ({ title, description, infoLabel, infoValue, onNext }) => (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E7EB' }]}>
        <Feather name="map-pin" size={48} color="#2563EB" />
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: '#6B7280', marginBottom: 20 }}>{description}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>{infoLabel}</Text>
        <Text style={styles.value}>{infoValue}</Text>
        <Button title="Continue" onPress={onNext} />
      </View>
    </SafeAreaView>
  );

  const ConfirmArrivalScreen: React.FC = () => (
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
  );

  const EmptyStateScreen: React.FC = () => (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <Feather name="package" size={48} color="#9CA3AF" />
        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 10 }}>No Tasks Assigned</Text>
        <Text style={{ color: '#6B7280', textAlign: 'center', padding: 10 }}>You don't have any delivery blocks assigned at the moment.</Text>
        <Button title="Refresh" onPress={handleBackToList} />
      </View>
    </SafeAreaView>
  );

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 1 && <TaskListScreen tasks={tasks} />}
      {currentScreen === 2 && selectedTask && <TaskDetailScreen task={selectedTask} />}
      {currentScreen === 3 && selectedTask && (
        <MapScreen
          title="Map View"
          description={`Navigating to ${selectedTask.location}`}
          infoLabel="Recommended Speed"
          infoValue={selectedTask.recommendedSpeed}
          onNext={handleConfirmArrival}
        />
      )}
      {currentScreen === 4 && selectedTask && (
        <MapScreen
          title="Map View"
          description={`Navigating to ${selectedTask.destination}`}
          infoLabel="Docking Spot"
          infoValue={selectedTask.dockingSpot}
          onNext={handleConfirmArrival}
        />
      )}
      {currentScreen === 5 && <ConfirmArrivalScreen />}
      {currentScreen === 6 && <EmptyStateScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { backgroundColor: '#2563EB', padding: 16 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  scrollContent: { padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16 },
  iconCircle: { padding: 8, borderRadius: 50 },
  green: { backgroundColor: '#D1FAE5' },
  blue: { backgroundColor: '#DBEAFE' },
  taskType: { fontWeight: '600', fontSize: 16 },
  label: { fontSize: 12, color: '#6B7280', marginTop: 8 },
  value: { fontSize: 14, fontWeight: '500', color: '#111827' },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  timeItem: { flexDirection: 'row', alignItems: 'center' },
  timeText: { marginLeft: 4, fontSize: 12, color: '#4B5563' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, borderTopWidth: 1, borderColor: '#E5E7EB', backgroundColor: 'white' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  priority: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  high: { backgroundColor: '#FEF3C7' },
  critical: { backgroundColor: '#FECACA' },
  medium: { backgroundColor: '#BFDBFE' }
});

export default LogisticsApp;
