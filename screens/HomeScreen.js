import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  // 1. Estado para guardar o que for digitado na barra de pesquisa
  const [termoBusca, setTermoBusca] = useState('');

  // 2. Lista de imóveis baseada no seu código
  const imoveis = [
    {
      id: '1',
      title: 'Casa Linhares',
      price: 'R$ 245',
      period: '/por noite',
      location: 'Rio de Janeiro - RJ',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    },
    {
      id: '2',
      title: 'Casa Lacerda',
      price: 'R$ 245',
      period: '/por noite',
      location: 'Rio de Janeiro - RJ',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    },
  ];

  // 3. Filtra os imóveis de acordo com o texto digitado (busca por título ou localização)
  const imoveisFiltrados = imoveis.filter(imovel => 
    imovel.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
    imovel.location.toLowerCase().includes(termoBusca.toLowerCase())
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá Mariana,</Text>
          <Text style={styles.subGreeting}>Pesquise por imóveis para alugar</Text>
        </View>

        {/* 4. Input conectado ao estado */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput 
            placeholder="Pesquisar por imóveis" 
            placeholderTextColor="#A0A0A0" 
            style={styles.searchInput}
            value={termoBusca}
            onChangeText={setTermoBusca}
          />
        </View>

        {/* 5. Renderização dinâmica dos imóveis filtrados */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
          {imoveisFiltrados.map((imovel) => (
            <View key={imovel.id} style={styles.card}>
              <Image source={{ uri: imovel.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{imovel.title}</Text>
              <Text style={styles.cardPrice}>{imovel.price}<Text style={styles.cardPeriod}>{imovel.period}</Text></Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color="#0066FF" />
                <Text style={styles.locationText}>{imovel.location}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 20 },
  header: { marginTop: 10, marginBottom: 20 },
  greeting: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  subGreeting: { fontSize: 16, color: '#666', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 15, height: 50, marginBottom: 24, elevation: 2 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  cardsContainer: { flexDirection: 'row' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, width: 220, marginRight: 16, elevation: 3 },
  cardImage: { width: '100%', height: 140, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginBottom: 4 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 8 },
  cardPeriod: { fontSize: 12, fontWeight: 'normal', color: '#666' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 12, color: '#666', marginLeft: 4 },
});