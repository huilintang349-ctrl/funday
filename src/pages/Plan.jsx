import PhoneFrame, { IconButton } from '../components/PhoneFrame';
import { planStops } from '../data';

export default function Plan({ go, appState }) {
  const plan = appState?.currentPlan;
  const stops = plan?.stops?.length ? plan.stops : planStops;
  const preferenceText = plan?.preferences?.length ? plan.preferences.slice(0, 3).join(' · ') : '轻松一点';
  return <PhoneFrame index={3}><div className="content"><div className="row-between"><IconButton onClick={() => go(2)}>←</IconButton><IconButton>↗</IconButton></div><h2 className="page-title">你的今日计划</h2><p className="muted">{preferenceText} · {plan?.duration || '2h'}</p><div className="timeline">{stops.map(s => <button key={s.time} className={`stop ${s.tone}`} onClick={() => go(4)}><b>{s.time} · {s.title}</b><span>{s.desc}</span></button>)}</div></div></PhoneFrame>;
}
