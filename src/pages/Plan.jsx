import PhoneFrame, { IconButton } from '../components/PhoneFrame';
import { planStops } from '../data';

export default function Plan({ go }) {
  return <PhoneFrame index={3}><div className="content"><div className="row-between"><IconButton onClick={() => go(2)}>←</IconButton><IconButton>↗</IconButton></div><h2 className="page-title">你的今日计划</h2><p className="muted">轻松一点，刚刚好。</p><div className="timeline">{planStops.map(s => <button key={s.time} className={`stop ${s.tone}`} onClick={() => go(4)}><b>{s.time} · {s.title}</b><span>{s.desc}</span></button>)}</div></div></PhoneFrame>;
}
