import axios from 'axios';

const api = axios.create({
  // Replace with your actual backend IP
  baseURL: 'http://192.168.10.228:8080/api/airFlow'
});

export const scheduleToAirport = (
  truckId: string,
  driverId: string,
  latitude: number,
  longitude: number
) => {
  return api.post(`/scheduletowards?truckId=${truckId}&driverId=${driverId}`, {
    latitude,
    longitude,
  });
};

export const updateTripLocation = (
  tripId: string,
  latitude: number,
  longitude: number
) => {
  return api.put(`/updateLocation/${tripId}`, { latitude, longitude });
};

export const completeTrip = (tripId: string) => {
  return api.put(`/completeTrip/${tripId}`);
};

export const getTrip = (tripId: string) => {
  return api.get(`/trip/${tripId}`);
};

export default api;
