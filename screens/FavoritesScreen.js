import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.centerScreen}>
      <Text style={styles.screenTitle}>Meus Favoritos</Text>
      <Text style={styles.screenSubtitle}>Nenhum imóvel salvo ainda.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  screenTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  screenSubtitle: { fontSize: 14, color: '#666', marginTop: 8 },
});