import * as SQLite from 'expo-sqlite';

export const IMOVEIS_INICIAIS = [
  {
    title: 'Casa Linhares',
    price: 'R$ 245',
    period: '/por noite',
    location: 'Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
  {
    title: 'Casa Lacerda',
    price: 'R$ 245',
    period: '/por noite',
    location: 'Rio de Janeiro - RJ',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
  {
    title: 'Apartamento Vista Mar',
    price: 'R$ 380',
    period: '/por noite',
    location: 'Florianópolis - SC',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
  {
    title: 'Chalé da Montanha',
    price: 'R$ 420',
    period: '/por noite',
    location: 'Campos do Jordão - SP',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
  {
    title: 'Mansão dos Lagos',
    price: 'R$ 850',
    period: '/por noite',
    location: 'Gramado - RS',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
  {
    title: 'Studio Moderno Jardins',
    price: 'R$ 190',
    period: '/por noite',
    location: 'São Paulo - SP',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
  {
    title: 'Bangalô Beira-Mar',
    price: 'R$ 510',
    period: '/por noite',
    location: 'Porto de Galinhas - PE',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&auto=format&fit=crop&q=80',
    favorito: 0,
  },
];

let dbInstance = null;

export async function getDatabase() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('imoveis.db');
  }
  return dbInstance;
}

export async function initDatabase() {
  const db = await getDatabase();

  // Criação da tabela com coluna 'favorito' (0 = não, 1 = sim)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS imoveis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      price TEXT NOT NULL,
      period TEXT NOT NULL,
      location TEXT NOT NULL,
      image TEXT NOT NULL,
      favorito INTEGER DEFAULT 0
    );
  `);

  const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM imoveis');
  const count = result?.count ?? 0;

  if (count === 0) {
    for (const item of IMOVEIS_INICIAIS) {
      await db.runAsync(
        `INSERT INTO imoveis (title, price, period, location, image, favorito) VALUES (?, ?, ?, ?, ?, ?)`,
        [item.title, item.price, item.period, item.location, item.image, item.favorito]
      );
    }
  } else if (count < IMOVEIS_INICIAIS.length) {
    // Caso existam menos imóveis cadastrados, insere os faltantes
    for (let i = count; i < IMOVEIS_INICIAIS.length; i++) {
      const item = IMOVEIS_INICIAIS[i];
      await db.runAsync(
        `INSERT INTO imoveis (title, price, period, location, image, favorito) VALUES (?, ?, ?, ?, ?, ?)`,
        [item.title, item.price, item.period, item.location, item.image, item.favorito]
      );
    }
  }
}

// Função para alternar o status de favorito no banco (exportada com const para evitar ReferenceError)
export const toggleFavoritoDB = async (id, novoStatus) => {
  const db = await getDatabase();
  await db.runAsync('UPDATE imoveis SET favorito = ? WHERE id = ?', [novoStatus ? 1 : 0, id]);
};

// Alterna o favorito baseado no estado atual
export const toggleFavorite = async (imovel) => {
  const db = await getDatabase();
  const row = await db.getFirstAsync('SELECT favorito FROM imoveis WHERE id = ?', [imovel.id]);
  const novoStatus = row && row.favorito === 1 ? 0 : 1;
  await toggleFavoritoDB(imovel.id, novoStatus);
  return novoStatus === 1;
};

// Retorna todos os imóveis
export const getImoveis = async () => {
  await initDatabase();
  const db = await getDatabase();
  return await db.getAllAsync('SELECT * FROM imoveis');
};

// Retorna apenas os imóveis favoritados
export const getFavorites = async () => {
  await initDatabase();
  const db = await getDatabase();
  return await db.getAllAsync('SELECT * FROM imoveis WHERE favorito = 1');
};

// Remove dos favoritos
export const removeFavorite = async (id) => {
  await toggleFavoritoDB(id, 0);
};

// Verifica se é favorito
export const isFavorite = async (id) => {
  const db = await getDatabase();
  const row = await db.getFirstAsync('SELECT favorito FROM imoveis WHERE id = ? AND favorito = 1', [id]);
  return !!row;
};
