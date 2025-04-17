/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert, Button } from 'react-native';
import MapView, { Marker, Polyline, LatLng } from 'react-native-maps';
import { updateTripLocation, completeTrip } from '../api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { Image } from 'react-native';


const { width, height } = Dimensions.get('window');

interface RouteScreenProps {
  route: {
    params: {
      tripId: string;
      currentLocation: { latitude: number; longitude: number };
      relevantLocation: { latitude: number; longitude: number } | null;
      encodedPolyline: string;
      estimatedArrivalTime: string;
      reservedParkingSlot: any;
      latestDaliAdvice: any;
    };
  };
  navigation: any;
}

export default function RouteScreen({ route, navigation }: RouteScreenProps) {
  const {
    tripId,
    currentLocation: initialLocation,
    relevantLocation,
    encodedPolyline,
    estimatedArrivalTime,
    reservedParkingSlot,
    latestDaliAdvice,
  } = route.params;

  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LatLng>(initialLocation);
  const [upcomingIntersections, setUpcomingIntersections] = useState<any[]>([]);
  const [simIndex, setSimIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  // Decode polyline to coordinates.
  const decodePolyline = (encoded: string): LatLng[] => {
    let points: LatLng[] = [];
    let index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : result >> 1;
      lng += dlng;
      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  // On mount, decode the polyline.
  useEffect(() => {
    if (encodedPolyline) {
      const points = decodePolyline(encodedPolyline);
      setRouteCoordinates(points);
      setCurrentLocation(points[0]);
      setSimIndex(0);
      setLoading(false);
    }
  }, [encodedPolyline]);

  // Simulate movement along the route.
  useEffect(() => {
    const interval = setInterval(() => {
      if (routeCoordinates.length === 0) return;
      setSimIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < routeCoordinates.length) {
          setCurrentLocation(routeCoordinates[nextIndex]);
          mapRef.current?.animateToRegion({
            ...routeCoordinates[nextIndex],
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }, 1000);
          // When marker passes a checkpoint, call update API (here simulated every 10 points)
          if (nextIndex % 10 === 0) {
            updateTrip();
          }
          return nextIndex;
        }
        return prevIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeCoordinates]);

  // Update trip by calling updateTripLocation API.
  const updateTrip = async () => {
    try {
      const response = await updateTripLocation(tripId, currentLocation.latitude, currentLocation.longitude);
      const updatedTrip = response.data;
      if (updatedTrip.upcomingIntersections) {
        setUpcomingIntersections(updatedTrip.upcomingIntersections);
        if (updatedTrip.currentRoute?.encodedPolyline) {
          const newPoints = decodePolyline(updatedTrip.currentRoute.encodedPolyline);
          setRouteCoordinates(newPoints);
        }
        if (updatedTrip.latestDaliAdvice?.message) {
          Alert.alert('DALI Advice', updatedTrip.latestDaliAdvice.message);
        }
      }
    } catch (error: any) {
      Alert.alert('Error updating route', error.message);
    }
  };

  // Complete the trip.
  const handleCompleteTrip = async () => {
    try {
      await completeTrip(tripId);
      Alert.alert('Trip Completed');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', 'Failed to complete trip');
    }
  };

  // Determine destination: if relevantLocation is null, fallback to the last coordinate of the route.
  const destination: LatLng = relevantLocation 
    ? relevantLocation 
    : (routeCoordinates.length > 0 ? routeCoordinates[routeCoordinates.length - 1] : initialLocation);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={currentLocation} title="Truck">
        <View style={styles.truckMarker}>
        <Image source={require('../assets/truck.png')} style={styles.truckIcon} />
        </View>
      </Marker>
        <Marker coordinate={destination} title="Airport" pinColor="green" />
        {upcomingIntersections.map((inter, index) => (
          <Marker
            key={index}
            coordinate={inter.location}
            title={`Intersection ${inter.sequenceNumber}`}
            description={inter.daliAdvice?.message}
            pinColor="orange"
          />
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>

      {/* <View style={styles.infoContainer}>
        <Text style={styles.infoText}>ETA: {new Date(estimatedArrivalTime).toLocaleTimeString()}</Text>
        <Text style={styles.infoText}>
          Reserved Parking: {reservedParkingSlot.slotId} at {reservedParkingSlot.gateId}
        </Text>
        {latestDaliAdvice?.message && (
          <Text style={[styles.infoText, { color: 'blue' }]}>DALI: {latestDaliAdvice.message}</Text>
        )}
        {upcomingIntersections.length > 0 && (
          <Text style={styles.infoText}>
            Next Intersections: {upcomingIntersections.map(inter => inter.sequenceNumber).join(', ')}
          </Text>
        )}
        <Button title="Complete Trip" onPress={handleCompleteTrip} color="#FF3B30" />
      </View> */}
      <View style={styles.notificationBox}>
        <Text style={styles.eta}>ETA: {new Date(estimatedArrivalTime).toLocaleTimeString()}</Text>
        <Text style={styles.parking}>
          Reserved Parking: <Text style={{ fontWeight: 'bold' }}>{reservedParkingSlot.slotId}</Text> at{' '}
          <Text style={{ fontWeight: 'bold' }}>{reservedParkingSlot.gateId}</Text>
        </Text>
        {latestDaliAdvice?.message && (
          <View style={styles.daliContainer}>
            <Text style={styles.daliTitle}>DALI:</Text>
            <Text style={styles.daliMessage}>{latestDaliAdvice.message}</Text>
          </View>
        )}
        <View style={{ marginTop: 10 }}>
          <Button title="Complete Trip" onPress={handleCompleteTrip} color="#FF3B30" />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width, height: height * 0.7 },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    elevation: 4,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
  truckMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  notificationBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  eta: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  parking: {
    fontSize: 16,
    marginBottom: 5,
    color: '#444',
  },
  daliContainer: {
    marginTop: 8,
  },
  daliTitle: {
    fontWeight: 'bold',
    color: '#007BFF',
    fontSize: 16,
  },
  daliMessage: {
    color: '#007BFF',
    fontSize: 14,
  },
  
  
});
