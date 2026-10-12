import { MOCK_SPONSORSHIPS } from '../data/mockSponsorships';

const STORAGE_KEY = 'abrigo-demo-sponsorships';
const normalizeDemoAccount = (items) => items.map((item) => (
  item.id === 'sponsor-001' && item.email === 'marina@email.com'
    ? { ...item, email: 'adotante@abrigo.local' }
    : item
));

const read = () => {
  try { return normalizeDemoAccount(JSON.parse(localStorage.getItem(STORAGE_KEY)) || MOCK_SPONSORSHIPS); }
  catch { return MOCK_SPONSORSHIPS; }
};

const write = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items;
};

export const getSponsorships = () => read();

export const getSponsorshipsByEmail = (email) =>
  read().filter((item) => String(item.email || '').toLowerCase() === String(email || '').toLowerCase());

export const createSponsorshipInterest = (data) => {
  const item = { id: crypto.randomUUID(), status: 'pendente', since: new Date().toLocaleDateString('pt-BR'), lastContact: 'Ainda não contatado', ...data };
  write([item, ...read()]);
  return item;
};

export const updateSponsorshipStatus = (id, status) => {
  const updated = read().map((item) => item.id === id ? { ...item, status, lastContact: 'Atualizado agora' } : item);
  return write(updated);
};
