import { useState, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { default as Cropper } from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropImage";
import { savePet, updatePet } from "../../services/petService";
import { saveImageLocally } from "../../services/localImageService";
import { showSuccess, showError, showWarning } from "../../utils/swalHelper";

// Limites de caracteres do formulário.
// Bloqueio acontece via maxLength no input + verificação em handleInputChange.
const LIMITES = {
  nome: 12,
  descricao: 400,
};

// Estilo padronizado do aviso "limite atingido"
const limiteAvisoStyle = { color: "var(--accent-color)", fontSize: "0.75rem", fontWeight: 500 };

// Foto nova do recorte; fotos já salvas podem ser reutilizadas.
const isNewPhoto = (foto) =>
  typeof foto === "string" && (foto.startsWith("blob:") || foto.startsWith("data:"));

const blobUrlToFile = async (blobUrl) => {
  const blob = await (await fetch(blobUrl)).blob();
  return new File([blob], "pet-image.jpg", { type: "image/jpeg" });
};

const PetForm = ({ data, onDataChange, onSuccess }) => {
  const [isSaving, setIsSaving] = useState(false);
  const isEditMode = Boolean(data?.id);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropConfirmed, setIsCropConfirmed] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Bloqueia atualização se o campo tem limite e o novo valor o excede.
    // Como redundância ao maxLength nativo (defesa em profundidade).
    const limite = LIMITES[name];
    if (limite !== undefined && value.length > limite) return;
    onDataChange(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onDataChange(prev => ({ ...prev, [name]: checked }));
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showWarning("Foto muito grande", "Escolha uma imagem PNG ou JPG de até 5 MB.");
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsCropConfirmed(false);
        // Não envia a imagem original para o preview ainda, 
        // espera o onCropComplete gerar a imagem cortada inicial.
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoomChange = (e) => {
    setZoom(Number(e.target.value));
    setIsCropConfirmed(false);
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
    setIsCropConfirmed(false);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onDataChange(prev => ({ ...prev, foto: croppedImage }));
      }
      setIsCropConfirmed(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const placeholders = ["Espécie", "Gênero", "Idade", "Porte"];
    const camposFaltando =
      !data.nome?.trim() ||
      !data.descricao?.trim() ||
      !data.especie || placeholders.includes(data.especie) ||
      !data.sexo || placeholders.includes(data.sexo) ||
      !data.idade || placeholders.includes(data.idade) ||
      !data.porte || placeholders.includes(data.porte);

    if (camposFaltando) {
      showWarning("Preencha todos os campos", "Confira nome, espécie, gênero, idade, porte e descrição.");
      return;
    }
    if (!data.foto) {
      showWarning("Adicione uma foto", "Selecione e confirme o recorte da foto do cão.");
      return;
    }

    setIsSaving(true);
    try {
      // A foto recortada é comprimida e salva apenas neste navegador.
      let urlFoto = data.foto;
      if (isNewPhoto(urlFoto)) {
        const file = await blobUrlToFile(urlFoto);
        urlFoto = await saveImageLocally(file);
      }

      const payload = {
        nome: data.nome.trim(),
        especie: data.especie,
        idade: data.idade,
        porte: data.porte,
        genero: data.sexo,
        descricao: data.descricao.trim(),
        urlFoto,
        vacinado: Boolean(data.vacinado),
        castrado: Boolean(data.castrado),
        vermifugado: Boolean(data.vermifugado),
      };

      if (isEditMode) {
        await updatePet(data.id, payload);
        await showSuccess("Cão atualizado!");
      } else {
        await savePet(payload);
        await showSuccess("Cão cadastrado!");
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Erro ao salvar cão:", err);
      showError(
        isEditMode ? "Erro ao atualizar o cão" : "Erro ao salvar o cão",
        err.message
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePhoto = () => {
    setImage(null);
    setIsCropConfirmed(false);
    onDataChange(prev => ({ ...prev, foto: null }));
    // Reseta o input file para permitir selecionar o mesmo arquivo novamente se quiser
    const fileInput = document.getElementById('pet-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
      <h1 className="h3 fw-bold mb-4 text-dark">{data?.id ? 'Editar dados do cão' : 'Adicionar novo cão'}</h1>

      <Form>
        {/* Área de Upload / Cropper */}
        <div className="mb-4">
          {!image && !data.foto ? (
            <div
              className="d-flex flex-column align-items-center justify-content-center p-5 bg-light border rounded-4"
              style={{ borderStyle: 'dashed !important', borderWidth: '2px', borderColor: '#dee2e6', cursor: 'pointer' }}
              onClick={() => document.getElementById('pet-upload').click()}
            >
              <input id="pet-upload" type="file" onChange={onFileChange} className="d-none" accept="image/png, image/jpeg" />
              <i className="fas fa-upload fa-2x text-muted mb-3"></i>
              <span className="text-muted fw-medium text-center">Clique para fazer upload da foto</span>
              <span className="text-muted small">PNG, JPG até 5MB</span>
            </div>
          ) : image && !isCropConfirmed ? (
            <div className="cropper-container bg-dark rounded-4 overflow-hidden position-relative" style={{ height: "350px", touchAction: 'none' }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={handleCropChange}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{ containerStyle: { borderRadius: '1rem', touchAction: 'none' } }}
              />

              {/* Controle de Zoom para Mobile */}
              <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', zIndex: 10 }}>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <i className="fas fa-search-minus text-white"></i>
                  </Col>
                  <Col>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={handleZoomChange}
                      className="form-range w-100"
                    />
                  </Col>
                  <Col xs="auto">
                    <i className="fas fa-search-plus text-white"></i>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="light" size="sm" onClick={handleRemovePhoto} className="fw-bold rounded-pill px-3">
                    <i className="fas fa-trash-alt me-2"></i> Trocar Foto
                  </Button>

                  <Button variant="warning" size="sm" onClick={handleConfirmCrop} className="fw-bold rounded-pill px-3 text-white">
                    <i className="fas fa-check me-2"></i> Confirmar Recorte
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="position-relative overflow-hidden rounded-4 border shadow-sm"
              style={{ height: '350px', cursor: image ? 'pointer' : 'default', background: '#f8f9fa' }}
              onClick={() => { if (image) setIsCropConfirmed(false); }}
            >
              <img src={data.foto} alt="Crop Result" className="w-100 h-100 object-fit-contain" />
              <div
                className="position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center"
                style={{ background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}
              >
                <span className="text-white fw-bold"><i className="fas fa-crop-alt me-2"></i>Clique para reajustar recorte</span>
              </div>
              <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 15 }}>
                <Button variant="danger" size="sm" onClick={(e) => { e.stopPropagation(); handleRemovePhoto(); }} className="rounded-circle shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', padding: 0 }} title="Trocar Foto">
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </div>
            </div>
          )}
        </div>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-bold text-muted">Nome do cão *</Form.Label>
              <Form.Control name="nome" placeholder="Ex: Thor" value={data.nome || ''} onChange={handleInputChange} maxLength={LIMITES.nome} className="py-2" />
              {data.nome?.length === LIMITES.nome && (
                <Form.Text className="d-block mt-1" style={limiteAvisoStyle}>
                  <i className="fa-solid fa-triangle-exclamation me-1"></i>
                  Limite de {LIMITES.nome} caracteres atingido.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-bold text-muted">Espécie *</Form.Label>
              <Form.Select name="especie" value={data.especie || 'Cachorro'} onChange={handleInputChange} className="py-2">
                <option>Cachorro</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-bold text-muted">Gênero *</Form.Label>
              <Form.Select name="sexo" value={data.sexo || 'Macho'} onChange={handleInputChange} className="py-2">
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-bold text-muted">Idade *</Form.Label>
              <Form.Select name="idade" value={data.idade || 'Adulto'} onChange={handleInputChange} className="py-2">
                <option value="Adulto">Adulto</option>
                <option value="Filhote">Filhote</option>
                <option value="Idoso">Idoso</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small fw-bold text-muted">Porte *</Form.Label>
              <Form.Select name="porte" value={data.porte || 'Médio'} onChange={handleInputChange} className="py-2">
                <option value="Pequeno">Pequeno</option>
                <option value="Médio">Médio</option>
                <option value="Grande">Grande</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-muted">Descrição *</Form.Label>
          <Form.Control as="textarea" rows={4} name="descricao" placeholder="Conte sobre a personalidade, comportamento e história do cão..." value={data.descricao || ''} onChange={handleInputChange} maxLength={LIMITES.descricao} className="py-2" />
          {data.descricao?.length === LIMITES.descricao && (
            <Form.Text className="d-block mt-1" style={limiteAvisoStyle}>
              <i className="fa-solid fa-triangle-exclamation me-1"></i>
              Limite de {LIMITES.descricao} caracteres atingido.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-muted">Cuidados Veterinários</Form.Label>
          <div className="d-flex flex-column gap-2">
            <Form.Check type="checkbox" id="chk-vacinado" name="vacinado" label="Vacinado" checked={!!data.vacinado} onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" id="chk-castrado" name="castrado" label="Castrado" checked={!!data.castrado} onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" id="chk-vermifugado" name="vermifugado" label="Vermifugado" checked={!!data.vermifugado} onChange={handleCheckboxChange} />
          </div>
        </Form.Group>

        <Button
          variant="warning"
          className="w-100 mt-2 fw-bold text-white py-3 rounded shadow-sm"
          onClick={handleSubmit}
          disabled={isSaving}
        >
          {isSaving ? (
            <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> {isEditMode ? "Atualizando..." : "Salvando..."}</>
          ) : (
            <><i className="fas fa-save me-2"></i> {isEditMode ? "ATUALIZAR CÃO" : "SALVAR CÃO"}</>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default PetForm;
