import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ block: 'start' });
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.key]);

  return null; // Ele não renderiza nada visualmente, só executa a função
}

export default ScrollToTop;
