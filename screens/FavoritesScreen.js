import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getFavorites, removeFavorite } from '../database/db';

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Recarrega do banco SQLite toda vez que a tela ganha foco
  const carregarFavoritos = async () => {
    try {
      setCarregando(true);
      const dados = await getFavorites();
      setFavoritos(dados);
    } catch (error) {
      console.log('Erro ao buscar favoritos:', error);
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  // Remove o imóvel do banco SQLite
  const handleRemoverFavorito = async (id) => {
    try {
      await removeFavorite(id);
      setFavoritos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log('Erro ao remover favorito:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Favoritos</Text>
        <Text style={styles.headerSubtitle}>
          {favoritos.length} {favoritos.length === 1 ? 'imóvel salvo no celular' : 'imóveis salvos no celular'}
        </Text>
      </View>

      {carregando ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0066FF" />
          <Text style={styles.loadingText}>Carregando favoritos...</Text>
        </View>
      ) : favoritos.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="heart-dislike-outline" size={64} color="#C4C4C4" />
          <Text style={styles.emptyTitle}>Nenhum imóvel salvo ainda</Text>
          <Text style={styles.emptySubtitle}>
            Toque no ícone de coração nos imóveis da página inicial para salvá-los no banco de dados do seu celular.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {favoritos.map((imovel) => (
            <View key={imovel.id} style={styles.card}>
              <Image
                source={{ uri: imovel.image }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              
              <View style={styles.cardContent}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitle}>{imovel.title}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoverFavorito(imovel.id)}
                    style={styles.removeButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="heart" size={24} color="#FF3B30" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.cardPrice}>
                  {imovel.price}
                  <Text style={styles.cardPeriod}>{imovel.period}</Text>
                </Text>

                <View style={styles.locationRow}>
                  <Ionicons name="location-sharp" size={14} color="#0066FF" />
                  <Text style={styles.locationText}>{imovel.location}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardImage: {
    width: 120,
    height: 120,
    backgroundColor: '#E5E7EB',
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginVertical: 4,
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
