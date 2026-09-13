import { useEffect, useRef } from 'react';
import legacyHtml from './legacy.html?raw';
import legacyScript from './legacy-script.js?raw';

export default function App() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const doc = new DOMParser().parseFromString(legacyHtml, 'text/html');
    document.title = '方得 Funday · 交互原型';

    const style = document.createElement('style');
    style.dataset.fundayLegacy = 'true';
    style.textContent = doc.head.querySelector('style')?.textContent || '';
    document.head.appendChild(style);

    const root = document.getElementById('funday-root');
    root.innerHTML = doc.body.innerHTML;
    new Function(legacyScript)();

    return () => {
      style.remove();
      root.innerHTML = '';
      mounted.current = false;
    };
  }, []);

  return <main id="funday-root" aria-label="Funday prototype" />;
}
