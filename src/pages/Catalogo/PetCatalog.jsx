import { Container, Row, Pagination } from 'react-bootstrap';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PetFilters from '../../components/Filters/PetFilters';
import PetCard from '../../components/Pets/PetCard';
import { getAllPets } from '../../services/petService';

const same = (a, b) => String(a || '').toLowerCase() === String(b || '').toLowerCase();
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
const ageMatches = (age, filter) => {
  if (filter === 'todos' || same(age, filter)) return true;
  return getAgePhase(age) === filter.toLowerCase();
};

const PetCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedAge = searchParams.get('idade');
  const initialAge = ['filhote', 'adulto', 'idoso'].includes(requestedAge) ? requestedAge : 'todos';
  const [filters, setFilters] = useState({ especie: 'Cachorro', genero: 'todos', idade: initialAge });
  const [applied, setApplied] = useState(filters);
  const [page, setPage] = useState(0);
  const dogs = getAllPets().filter((pet) =>
    (!pet.status || pet.status === 'disponivel') && same(pet.especie, 'Cachorro') &&
    (applied.genero === 'todos' || same(pet.genero, applied.genero)) && ageMatches(pet.idade, applied.idade)
  );
  const totalPages = Math.ceil(dogs.length / 12);
  const pets = dogs.slice(page * 12, (page + 1) * 12);
  const apply = () => { setApplied({ ...filters }); setSearchParams(filters.idade === 'todos' ? {} : { idade: filters.idade }); setPage(0); };
  const clear = () => {
    const reset = { especie: 'Cachorro', genero: 'todos', idade: 'todos' };
    setFilters(reset);
    setApplied(reset);
    setSearchParams({});
    setPage(0);
  };
  const filtersActive = applied.genero !== 'todos' || applied.idade !== 'todos';

  return <Container className="py-2">
    <PetFilters filters={filters} setFilters={setFilters} onApply={apply} onClear={clear} showClear={filtersActive} />
    <p className="catalog-result-count text-muted mb-3" aria-live="polite">
      <strong className="text-body">{dogs.length}</strong> {dogs.length === 1 ? 'cão disponível' : 'cães disponíveis'}
    </p>
    {pets.length === 0 ? <div className="text-center py-5 bg-light rounded-4 border my-4"><i className="fas fa-paw fa-3x text-muted opacity-50 mb-3" /><h2 className="h5 fw-bold text-muted">Nenhum cão encontrado</h2><p className="text-muted small">Tente alterar ou limpar os filtros.</p></div> : <>
      <Row className="g-3 g-md-4">{pets.map((pet) => <PetCard key={pet.id} pet={pet} />)}</Row>
      {totalPages > 1 && <div className="catalog-pagination d-flex justify-content-center mt-4"><Pagination><Pagination.Prev disabled={page === 0} onClick={() => setPage(page - 1)}>Anterior</Pagination.Prev>{Array.from({ length: totalPages }, (_, index) => <Pagination.Item key={index} active={index === page} onClick={() => setPage(index)}>{index + 1}</Pagination.Item>)}<Pagination.Next disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>Próximo</Pagination.Next></Pagination></div>}
    </>}
  </Container>;
};
export default PetCatalog;
