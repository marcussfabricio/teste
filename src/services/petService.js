import { MOCK_PETS } from '../data/mockPets';

const KEY = 'abrigo-local-pets-v1';
const same = (a, b) => String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase();
const getAgePhase = (value) => {
  const age = String(value || '').trim().toLowerCase();
  if (age.includes('filhote') || age.includes('mês') || age.includes('mes')) return 'filhote';
  if (age.includes('idoso') || age.includes('sênior') || age.includes('senior')) return 'idoso';
  const number = Number.parseFloat(age.replace(',', '.'));
  if (age.includes('ano') && Number.isFinite(number)) {
    if (number <= 1) return 'filhote';
    if (number >= 7) return 'idoso';
  }
  return 'adulto';
};
const ageMatches = (value, selected) => {
  if (selected === 'todos' || same(value, selected)) return true;
  return getAgePhase(value) === selected.toLowerCase();
};

const migrateDemoPets = (pets) => {
  const defaultFred = MOCK_PETS.find((pet) => pet.id === 'demo-fred');
  return pets.map((pet) => (
    pet.id === 'demo-fred' && String(pet.urlFoto || '').includes('banner-pets')
      ? { ...pet, urlFoto: defaultFred?.urlFoto }
      : pet
  ));
};

const read = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(saved)) return migrateDemoPets(saved);
  } catch { /* Recomeça com o catálogo de exemplo. */ }
  return MOCK_PETS.map((pet, index) => ({ ...pet, status: 'disponivel', criadoEm: new Date(2026, 0, index + 1).toISOString() }));
};

const write = (pets) => {
  try { localStorage.setItem(KEY, JSON.stringify(pets)); }
  catch { throw new Error('Espaço local insuficiente. Escolha uma foto menor.'); }
  window.dispatchEvent(new Event('abrigo:pets-updated'));
};

export const getAllPets = () => read().filter((pet) => pet.status !== 'excluido');

export const getPets = async ({ page = 0, size = 12, especie = 'todos', genero = 'todos', idade = 'todos', status = 'disponivel', paginado = true } = {}) => {
  const pets = read().filter((pet) =>
    pet.status !== 'excluido' &&
    (status === 'todos' || same(pet.status || 'disponivel', status)) &&
    (especie === 'todos' || same(pet.especie, especie)) &&
    (genero === 'todos' || same(pet.genero, genero)) &&
    ageMatches(pet.idade, idade)
  );
  if (!paginado) return pets;
  return { content: pets.slice(page * size, (page + 1) * size), totalPages: Math.ceil(pets.length / size), totalElements: pets.length, number: page };
};

export const getPetsPaginados = (page = 0, size = 12, filtros = {}) => getPets({ page, size, ...filtros });

export const getPetById = async (id) => {
  const pet = read().find((item) => String(item.id) === String(id) && item.status !== 'excluido');
  if (!pet) throw new Error('Cão não encontrado');
  return pet;
};

export const savePet = async (data) => {
  const pet = { ...data, id: crypto.randomUUID(), genero: data.genero || data.sexo, urlFoto: data.urlFoto || data.foto, status: 'disponivel', criadoEm: new Date().toISOString() };
  write([pet, ...read()]);
  return pet;
};

export const updatePet = async (id, data) => {
  const pets = read();
  const index = pets.findIndex((pet) => String(pet.id) === String(id));
  if (index < 0) throw new Error('Cão não encontrado');
  const updated = { ...pets[index], ...data, genero: data.genero || data.sexo || pets[index].genero, urlFoto: data.urlFoto || data.foto || pets[index].urlFoto };
  pets[index] = updated;
  write(pets);
  return updated;
};

export const deletePet = async (id) => write(read().map((pet) => String(pet.id) === String(id) ? { ...pet, status: 'excluido' } : pet));
export const adotarPet = async (id) => write(read().map((pet) => String(pet.id) === String(id) ? { ...pet, status: 'adotado' } : pet));
