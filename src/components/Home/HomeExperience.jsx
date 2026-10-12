import { useEffect, useRef, useState } from 'react';
import { getHomeMedia, HOME_MEDIA_UPDATED_EVENT } from '../../services/homeMediaService';
import walkImage from '../../assets/images/role.png';
import muralPhoto1 from '../../assets/images/mural foto 1.jpeg';
import muralPhoto2 from '../../assets/images/mural foto 2.jpeg';
import muralPhoto3 from '../../assets/images/mural foto 3.jpeg';
import muralPhoto4 from '../../assets/images/mural foto 4.jpeg';
import shelterVideo1 from '../../assets/videos/videoplayback (1).mp4';
import shelterVideo2 from '../../assets/videos/videoplayback (2).mp4';
import shelterVideo3 from '../../assets/videos/videoplayback (3).mp4';
import shelterVideo4 from '../../assets/videos/videoplayback (4).mp4';
import './HomeExperience.css';

const INSTAGRAM_URL = 'https://www.instagram.com/abrigoanimaldejoinville/';

const muralPhotos = [muralPhoto1, muralPhoto2, muralPhoto3, muralPhoto4].map((src, index) => ({
  src,
  title: `Foto do abrigo ${index + 1}`,
}));

const videoStories = [
  { id: 'shelter-video-1', title: 'Momentos no abrigo', src: shelterVideo1 },
  { id: 'shelter-video-2', title: 'Carinho que transforma', src: shelterVideo2 },
  { id: 'shelter-video-3', title: 'A rotina dos nossos cães', src: shelterVideo3 },
  { id: 'shelter-video-4', title: 'Histórias dos nossos amiguinhos', src: shelterVideo4 },
];

const useHomeMedia = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    let objectUrls = [];

    const load = async () => {
      try {
        const records = await getHomeMedia();
        const nextItems = records.map((item) => ({ ...item, src: URL.createObjectURL(item.file) }));
        if (!active) {
          nextItems.forEach((item) => URL.revokeObjectURL(item.src));
          return;
        }
        objectUrls.forEach((url) => URL.revokeObjectURL(url));
        objectUrls = nextItems.map((item) => item.src);
        setItems(nextItems);
      } catch {
        if (active) setItems([]);
      }
    };

    load();
    window.addEventListener(HOME_MEDIA_UPDATED_EVENT, load);
    return () => {
      active = false;
      window.removeEventListener(HOME_MEDIA_UPDATED_EVENT, load);
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return items;
};

const MonthlyWalk = () => {
  return (
    <section id="role-dos-patudos" className="home-experience-section monthly-walk" aria-labelledby="monthly-walk-title" style={{ scrollMarginTop: '100px' }}>
      <div className="monthly-walk-copy">
        <span className="section-eyebrow"><i className="fas fa-dog" aria-hidden="true"></i> Rolê semanal</span>
        <h2 id="monthly-walk-title">Rolê dos Patudos</h2>
        <p>
          Todos os sábados, nossos cães saem para passear, socializar e receber carinho.
          Não precisa agendar: é só ir até o abrigo e participar.
        </p>
        <div className="walk-date" aria-label="Rolê todos os sábados, sem agendamento">
          <span className="walk-date-icon"><i className="far fa-calendar" aria-hidden="true"></i></span>
          <span><small>Sem agendamento</small><strong>Todos os sábados</strong></span>
        </div>
      </div>
      <div className="monthly-walk-media">
        <img src={walkImage} alt="Voluntários passeando com cães do abrigo" loading="lazy" />
      </div>
    </section>
  );
};

const ShelterGallery = ({ photos }) => {
  const railRef = useRef(null);

  const move = (direction) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.82, behavior: 'smooth' });
  };

  return (
    <section className="home-experience-section" aria-labelledby="shelter-gallery-title">
      <div className="section-heading video-heading">
        <div>
          <span className="section-eyebrow">Por dentro do abrigo</span>
          <h2 id="shelter-gallery-title">Conheça nossos amiguinhos</h2>
        </div>
        <div className="video-controls" aria-label="Controles do carrossel de fotos">
          <button type="button" onClick={() => move(-1)} aria-label="Fotos anteriores"><i className="fas fa-arrow-left"></i></button>
          <button type="button" onClick={() => move(1)} aria-label="Próximas fotos"><i className="fas fa-arrow-right"></i></button>
        </div>
      </div>

      <div className="shelter-photo-rail" ref={railRef}>
        {photos.map((item, index) => item.id ? (
          <article className="shelter-photo-card" key={item.id}>
            <img src={item.src} alt={item.title} loading="lazy" />
          </article>
        ) : (
          <a className="shelter-photo-card" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" key={item.title || index} aria-label="Ver foto do abrigo no Instagram">
            <img src={item.src} alt={item.title} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
};

const VideoWall = ({ videos }) => {
  const railRef = useRef(null);
  const move = (direction) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.82, behavior: 'smooth' });
  };

  return (
    <section className="home-experience-section" aria-labelledby="video-wall-title">
      <div className="section-heading video-heading">
        <div>
          <span className="section-eyebrow">Vídeos do abrigo</span>
          <h2 id="video-wall-title">Momentos dos nossos amiguinhos</h2>
        </div>
        <div className="video-controls" aria-label="Controles do carrossel">
          <button type="button" onClick={() => move(-1)} aria-label="Vídeos anteriores"><i className="fas fa-arrow-left"></i></button>
          <button type="button" onClick={() => move(1)} aria-label="Próximos vídeos"><i className="fas fa-arrow-right"></i></button>
        </div>
      </div>

      <div className="video-rail" ref={railRef}>
        {videos.map((video) => (
          <article className="video-story video-story-uploaded" key={video.id}>
            <video src={video.src} autoPlay loop muted playsInline preload="metadata" aria-label={video.title} />
            <strong className="uploaded-video-title">{video.title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
};

const HomeExperience = () => {
  const homeMedia = useHomeMedia();
  const customPhotos = homeMedia.filter((item) => item.type === 'photo');
  const customVideos = homeMedia.filter((item) => item.type === 'video');

  return (
    <div className="home-experience-stack">
      <MonthlyWalk />
      <ShelterGallery photos={customPhotos.length ? customPhotos : muralPhotos} />
      <VideoWall videos={customVideos.length ? customVideos : videoStories} />
    </div>
  );
};

export default HomeExperience;
