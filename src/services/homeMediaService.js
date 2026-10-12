const DB_NAME = 'abrigo-home-media';
const STORE_NAME = 'media';
const DB_VERSION = 1;

export const HOME_MEDIA_UPDATED_EVENT = 'abrigo:home-media-updated';

const openDatabase = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onupgradeneeded = () => {
    const database = request.result;
    if (!database.objectStoreNames.contains(STORE_NAME)) {
      const store = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('type', 'type', { unique: false });
      store.createIndex('createdAt', 'createdAt', { unique: false });
    }
  };

  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error || new Error('Não foi possível abrir o armazenamento de mídias.'));
});

const runRequest = async (mode, operation) => {
  const database = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, mode);
      const store = transaction.objectStore(STORE_NAME);
      const request = operation(store);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Não foi possível concluir a operação.'));
    });
  } finally {
    database.close();
  }
};

export const getHomeMedia = async () => {
  const items = await runRequest('readonly', (store) => store.getAll());
  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const addHomeMedia = async ({ type, title, file }) => {
  const item = {
    id: crypto.randomUUID(),
    type,
    title: title.trim() || (type === 'photo' ? 'Foto do abrigo' : 'Vídeo do abrigo'),
    file,
    createdAt: new Date().toISOString(),
  };

  await runRequest('readwrite', (store) => store.add(item));
  window.dispatchEvent(new Event(HOME_MEDIA_UPDATED_EVENT));
  return item;
};

export const deleteHomeMedia = async (id) => {
  await runRequest('readwrite', (store) => store.delete(id));
  window.dispatchEvent(new Event(HOME_MEDIA_UPDATED_EVENT));
};
