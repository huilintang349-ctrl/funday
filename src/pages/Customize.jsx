import { useState } from 'react';
import PhoneFrame, { Button, IconButton } from '../components/PhoneFrame';
import { preferenceOptions } from '../data';

export default function Customize({ go }) {
  const [selected, setSelected] = useState(['户外', '咖啡', '看展', '音乐']);
  const [duration, setDuration] = useState('2h');
  const toggle = name => setSelected(s => s.includes(name) ? s.filter(x => x !== name) : [...s, name]);
  return <PhoneFrame index={2}><div className="content">
    <IconButton onClick={() => go(1)}>←</IconButton><h2 className="page-title">定制你的今天</h2><p className="muted">选几个你现在真正想做的。</p>
    <div className="tags" style={{ marginTop: 20 }}>{preferenceOptions.map(([emoji, name]) => <button key={name} className={`tag ${selected.includes(name) ? 'active' : ''}`} onClick={() => toggle(name)}>{emoji} {name}</button>)}</div>
    <div style={{ marginTop: 20 }}><b>你有多久？</b><div className="chips" style={{ marginTop: 10 }}>{['2h', '4h', '半天'].map(x => <button key={x} className={`duration ${duration === x ? 'active' : ''}`} onClick={() => setDuration(x)}>{x}</button>)}</div></div>
    <div style={{ marginTop: 20, fontWeight: 900 }}>已选 <b>{selected.length}</b> 个偏好</div><div className="bottom-action"><Button className="primary" onClick={() => go(3)}>生成方案 →</Button></div>
  </div></PhoneFrame>;
}
