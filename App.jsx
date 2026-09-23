import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { screens } from './data';
import { createAppStore, loadAppState, persistAppState } from './store/appStore';
import Home from './pages/Home';
import Customize from './pages/Customize';
import Plan from './pages/Plan';
import Detail from './pages/Detail';
import Me from './pages/Me';
import Activities from './pages/Activities';
import Host from './pages/Host';
import Success from './pages/Success';

const pages = [Home, Customize, Plan, Detail, Me, Activities, Host, Success];

export default function App() {
  const getPageFromHash = () => {
    const value = Number(location.hash.replace('#', ''));
    return Number.isInteger(value) && value >= 1 && value <= 8 ? value : 1;
  };
  const [page, setPage] = useState(getPageFromHash);
  const [state, setState] = useState(loadAppState);
  const store = useMemo(() => createAppStore(setState), []);

  useEffect(() => {
    persistAppState(state);
  }, [state]);

  const go = next => {
    const safePage = Math.min(8, Math.max(1, next));
    if (safePage !== page) setPage(safePage);
    if (location.hash !== '#' + safePage) location.hash = String(safePage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onHash = () => setPage(getPageFromHash());
    const onKey = event => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === 'ArrowRight') go(page + 1);
      if (event.key === 'ArrowLeft') go(page - 1);
      if (event.key === 'Escape') go(1);
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    document.title = '方得 Funday · React';
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('keydown', onKey);
    };
  }, [page]);

  const Page = pages[page - 1] || Home;
  return <main className="app">
    <header className="head"><div><h1>方得 Funday</h1><p>今天，去玩点真的。</p></div><div className="version">React + Vite · v0.4.3</div></header>
    <nav className="toolbar" aria-label="页面导航">{screens.map(s => <button key={s.id} className={page === s.id ? 'active' : ''} onClick={() => go(s.id)}>{String(s.id).padStart(2, '0')} {s.name}</button>)}<span className="hint">← → 切页 · Esc 回首页</span></nav>
    <Page go={go} appState={state} store={store} />
  </main>;
}
