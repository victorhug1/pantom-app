import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Cargar scripts después de que la página esté lista
    const loadScripts = () => {
      // Google Tag Manager - diferido
      if (!window.gtag) {
        const gtmScript = document.createElement('script');
        gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MN7GS3TZ';
        gtmScript.async = true;
        gtmScript.defer = true;
        document.head.appendChild(gtmScript);
      }

      // ContentSquare - diferido (solo si es necesario)
      if (window.location.hostname === 'pantom.net' && !window._uxa) {
        const csScript = document.createElement('script');
        csScript.src = 'https://t.contentsquare.net/uxa/270796.js';
        csScript.async = true;
        csScript.defer = true;
        document.head.appendChild(csScript);
      }

      // Hotjar - diferido
      if (!window.hj) {
        const hjScript = document.createElement('script');
        hjScript.src = 'https://static.hotjar.com/c/hotjar-6405051.js?sv=6';
        hjScript.async = true;
        hjScript.defer = true;
        document.head.appendChild(hjScript);
      }
    };

    // Cargar después de 2 segundos o cuando el usuario interactúe
    const timer = setTimeout(loadScripts, 2000);
    
    const loadOnInteraction = () => {
      clearTimeout(timer);
      loadScripts();
    };

    // Cargar en la primera interacción del usuario
    ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
      document.addEventListener(event, loadOnInteraction, { once: true });
    });

    return () => {
      clearTimeout(timer);
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.removeEventListener(event, loadOnInteraction);
      });
    };
  }, []);

  return null;
}
