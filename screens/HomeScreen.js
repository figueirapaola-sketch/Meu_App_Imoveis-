import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getImoveis, toggleFavoritoDB, IMOVEIS_INICIAIS } from '../database/db';

export default function HomeScreen() {
  const [termoBusca, setTermoBusca] = useState('');
  const [imoveis, setImoveis] = useState(
    IMOVEIS_INICIAIS.map((item, index) => ({ id: index + 1, ...item }))
  );
  const [favoritosIds, setFavoritosIds] = useState([]);

  // Carrega os imóveis e os favoritos do banco SQLite sempre que a tela ganha foco
  const carregarDados = async () => {
    try {
      const lista = await getImoveis();
      if (lista && lista.length > 0) {
        setImoveis(lista);
        const favs = lista.filter((item) => item.favorito === 1).map((item) => item.id);
        setFavoritosIds(favs);
      }
    } catch (error) {
      console.log('Erro ao carregar dados do banco:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  // Alterna o status de favorito no banco SQLite
  const handleToggleFavorite = async (imovel) => {
    try {
      const jaEhFavorito = favoritosIds.includes(imovel.id);
      const novoStatus = !jaEhFavorito;

      await toggleFavoritoDB(imovel.id, novoStatus);

      if (novoStatus) {
        setFavoritosIds((prev) => [...prev, imovel.id]);
      } else {
        setFavoritosIds((prev) => prev.filter((id) => id !== imovel.id));
      }
    } catch (error) {
      console.log('Erro ao favoritar imóvel:', error);
    }
  };

  // Filtra os imóveis de acordo com o texto digitado (busca por título ou localização)
  const imoveisFiltrados = imoveis.filter((imovel) =>
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

        {/* Input conectado ao estado de busca */}
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

        {/* Lista de Imóveis */}
        <Text style={styles.sectionTitle}>Imóveis em Destaque ({imoveisFiltrados.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
          {imoveisFiltrados.map((imovel) => {
            const ehFavorito = favoritosIds.includes(imovel.id);

            return (
              <View key={imovel.id} style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: imovel.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.favoriteBadge}
                    onPress={() => handleToggleFavorite(imovel)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={ehFavorito ? 'heart' : 'heart-outline'}
                      size={20}
                      color={ehFavorito ? '#FF3B30' : '#FFFFFF'}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardTitle}>{imovel.title}</Text>
                <Text style={styles.cardPrice}>
                  {imovel.price}
                  <Text style={styles.cardPeriod}>{imovel.period}</Text>
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-sharp" size={14} color="#0066FF" />
                  <Text style={styles.locationText}>{imovel.location}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scroll: {
    padding: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 14,
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    width: 220,
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 20,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  cardPeriod: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#666',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});
