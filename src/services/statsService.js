import { getAllPets } from './petService';

const stats = () => {
  const pets = getAllPets();
  return {
    petsDisponiveis: pets.filter((pet) => !pet.status || pet.status === 'disponivel').length,
    petsAdotados: pets.filter((pet) => pet.status === 'adotado').length,
    totalPetsHistorico: pets.length,
  };
};

export const getDashboardDataAdmin = async () => stats();
