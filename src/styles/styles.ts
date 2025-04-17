import { StyleSheet } from "react-native";

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


  export default styles;