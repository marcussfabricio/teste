import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/Layout/AdminLayout';
import { addHomeMedia, deleteHomeMedia, getHomeMedia } from '../../services/homeMediaService';
import { confirmAction, showError, showSuccess } from '../../utils/swalHelper';
import './AdminHomeMedia.css';

const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const AdminHomeMedia = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [type, setType] = useState('photo');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadMedia = useCallback(async () => {
    try {
      const records = await getHomeMedia();
      setItems(records.map((item) => ({ ...item, previewUrl: URL.createObjectURL(item.file) })));
    } catch (error) {
      showError('Não foi possível carregar as mídias', error.message);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(loadMedia, 0);
    return () => window.clearTimeout(timer);
  }, [loadMedia]);

  useEffect(() => () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
  }, [items]);

  const handleNav = (key) => navigate(key === 'overview' || key === 'pets' ? '/admin' : `/admin/${key}`);

  const handleTypeChange = (nextType) => {
    setType(nextType);
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!file) {
      showError('Selecione um arquivo', 'Escolha uma foto ou um vídeo para publicar na página inicial.');
      return;
    }

    const maxSize = type === 'photo' ? MAX_PHOTO_SIZE : MAX_VIDEO_SIZE;
    if (file.size > maxSize) {
      showError('Arquivo muito grande', type === 'photo' ? 'A foto pode ter até 10 MB.' : 'O vídeo pode ter até 100 MB.');
      return;
    }

    setSaving(true);
    try {
      await addHomeMedia({ type, title, file });
      setTitle('');
      setFile(null);
      form.reset();
      await loadMedia();
      showSuccess(type === 'photo' ? 'Foto adicionada à página inicial' : 'Vídeo adicionado à página inicial');
    } catch (error) {
      showError('Não foi possível salvar a mídia', error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = await confirmAction({
      title: `Excluir ${item.type === 'photo' ? 'foto' : 'vídeo'}?`,
      text: 'A mídia deixará de aparecer na página inicial deste navegador.',
      confirmText: 'Sim, excluir',
    });
    if (!confirmed) return;

    try {
      await deleteHomeMedia(item.id);
      await loadMedia();
      showSuccess('Mídia removida');
    } catch (error) {
      showError('Não foi possível excluir a mídia', error.message);
    }
  };

  const photos = items.filter((item) => item.type === 'photo');
  const videos = items.filter((item) => item.type === 'video');

  return (
    <AdminLayout active="midias" onSelect={handleNav}>
      <div className="mb-4">
        <span className="text-uppercase fw-bold small admin-media-eyebrow">Conteúdo da página inicial</span>
        <h1 className="h2 fw-bold mt-2 mb-2">Fotos e vídeos</h1>
        <p className="text-muted mb-0">Adicione o conteúdo que será exibido nos carrosséis da página inicial.</p>
      </div>

      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="p-3 p-md-4">
          <Form onSubmit={handleSubmit}>
            <Row className="g-3 align-items-end">
              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold">Tipo de mídia</Form.Label>
                <Form.Select value={type} onChange={(event) => handleTypeChange(event.target.value)}>
                  <option value="photo">Foto</option>
                  <option value="video">Vídeo</option>
                </Form.Select>
              </Col>
              <Col xs={12} md={4}>
                <Form.Label className="fw-semibold">Título</Form.Label>
                <Form.Control value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Ex.: Rotina no abrigo" maxLength={80} required />
              </Col>
              <Col xs={12} md={5}>
                <Form.Label className="fw-semibold">Arquivo</Form.Label>
                <Form.Control
                  key={type}
                  type="file"
                  accept={type === 'photo' ? 'image/*' : 'video/*'}
                  onChange={(event) => setFile(event.target.files?.[0] || null)}
                />
              </Col>
              <Col xs={12}>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                  <small className="text-muted">Fotos: até 10 MB. Vídeos: até 100 MB. Os arquivos ficam salvos neste navegador.</small>
                  <Button type="submit" disabled={saving} className="px-4 fw-bold">
                    {saving ? 'Salvando...' : 'Adicionar à página inicial'}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <MediaSection title="Fotos do carrossel" empty="Nenhuma foto personalizada. O carrossel usa as fotos padrão do projeto." items={photos} onDelete={handleDelete} />
      <MediaSection title="Vídeos do mural" empty="Nenhum vídeo personalizado. O mural usa os cards padrão do projeto." items={videos} onDelete={handleDelete} />
    </AdminLayout>
  );
};

const MediaSection = ({ title, empty, items, onDelete }) => (
  <section className="mb-5" aria-labelledby={`section-${title}`}>
    <div className="d-flex align-items-center justify-content-between mb-3">
      <h2 id={`section-${title}`} className="h5 fw-bold mb-0">{title}</h2>
      <span className="badge rounded-pill text-bg-light border">{items.length}</span>
    </div>
    {items.length === 0 ? (
      <Card className="border-0 shadow-sm rounded-4"><Card.Body className="text-muted py-4">{empty}</Card.Body></Card>
    ) : (
      <div className="admin-media-grid">
        {items.map((item) => (
          <Card className="admin-media-card border-0 shadow-sm rounded-4 overflow-hidden" key={item.id}>
            {item.type === 'photo'
              ? <img src={item.previewUrl} alt={item.title} />
              : <video src={item.previewUrl} controls preload="metadata" aria-label={item.title} />}
            <Card.Body className="d-flex align-items-center justify-content-between gap-3">
              <div className="min-w-0">
                <strong className="d-block text-truncate">{item.title}</strong>
                <small className="text-muted">{item.type === 'photo' ? 'Foto' : 'Vídeo'}</small>
              </div>
              <Button type="button" variant="outline-danger" className="flex-shrink-0" onClick={() => onDelete(item)} aria-label={`Excluir ${item.title}`}>
                <i className="fas fa-trash" aria-hidden="true"></i>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    )}
  </section>
);

export default AdminHomeMedia;
