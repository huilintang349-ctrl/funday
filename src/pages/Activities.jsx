import { useState } from 'react';
import PhoneFrame, { Button, IconButton } from '../components/PhoneFrame';
import { activities } from '../data';

export default function Activities({ go }) {
  const [filter, setFilter] = useState('全部');
  const [picked, setPicked] = useState(null);
  const list = filter === '全部' ? activities : activities.filter(a => a.type === filter);
  return <PhoneFrame index={6}><div className="content"><div className="row-between"><IconButton onClick={() => go(1)}>←</IconButton><b>活动报名</b><span /></div><h2 className="page-title">和有趣的人，<br/>一起去发生。</h2><div className="activity-filter">{['全部', '户外', '咖啡', '看展'].map(x => <button key={x} className={`duration ${filter === x ? 'active' : ''}`} onClick={() => setFilter(x)}>{x}</button>)}</div>{list.map(a => <div key={a.id} className={`activity-card ${a.tone}`} onClick={() => setPicked(a)}><h3>{a.title}</h3><div>{a.time} · {a.people}</div></div>)}</div>{picked && <div className="modal-backdrop" onClick={() => setPicked(null)}><div className="modal" onClick={e => e.stopPropagation()}><h3>{picked.title}</h3><p>{picked.time}，{picked.people}。加入后你会看到活动集合地点和参与者信息。</p><div className="modal-actions"><Button onClick={() => setPicked(null)}>取消</Button><Button className="primary" onClick={() => { setPicked(null); go(8); }}>报名参加</Button></div></div></div>}</PhoneFrame>;
}
