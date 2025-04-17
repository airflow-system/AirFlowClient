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
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/appNavigator';


type MapProp = RouteProp<RootStackParamList, 'MapScreen'>;


const MapScreen = ({navigation}:any) => {
    const detail = useRoute<MapProp>();
    const {
        action,
        title,
        description,
        infoLabel,
        infoValue
      } = detail.params;
    function onNext(): void {
        navigation.navigate('ConfirmArrivalScreen');
    }

  return (
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
  )
}

export default MapScreen



