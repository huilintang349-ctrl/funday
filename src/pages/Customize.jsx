import PhoneFrame, { Button, IconButton } from '../components/PhoneFrame';
import { preferenceOptions, planStops } from '../data';

export default function Customize({ go, appState, store }) {
  const selected = appState?.preferences ?? [];
  const duration = appState?.duration ?? '2h';
  const prompt = appState?.prompt?.trim();

  const toggle = name => store.setPreferences(
    selected.includes(name) ? selected.filter(x => x !== name) : [...selected, name]
  );

  const generatePlan = () => {
    store.setCurrentPlan({
      prompt: prompt || null,
      preferences: selected,
      duration,
      stops: planStops.slice(0, duration === '2h' ? 2 : 3),
      createdAt: new Date().toISOString(),
    });
    go(3);
  };

  return <PhoneFrame index={2}><div className="content">
    <IconButton onClick={() => go(1)}>←</IconButton><h2 className="page-title">定制你的今天</h2><p className="muted">{prompt ? '刚才说：“' + prompt + '”' : '选几个你现在真正想做的。'}</p>
    <div className="tags" style={{ marginTop: 20 }}>{preferenceOptions.map(([emoji, name]) => <button key={name} className={'tag ' + (selected.includes(name) ? 'active' : '')} onClick={() => toggle(name)}>{emoji} {name}</button>)}</div>
    <div style={{ marginTop: 20 }}><b>你有多久？</b><div className="chips" style={{ marginTop: 10 }}>{['2h', '4h', '半天'].map(x => <button key={x} className={'duration ' + (duration === x ? 'active' : '')} onClick={() => store.setDuration(x)}>{x}</button>)}</div></div>
    <div style={{ marginTop: 20, fontWeight: 900 }}>已选 <b>{selected.length}</b> 个偏好</div><div className="bottom-action"><Button className="primary" onClick={generatePlan}>生成方案 →</Button></div>
  </div></PhoneFrame>;
}
