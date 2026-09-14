import { useState } from 'react';
import PhoneFrame, { Button, IconButton } from '../components/PhoneFrame';

export default function Detail({ go }) {
  const [liked, setLiked] = useState(false);
  return <PhoneFrame index={4}><div className="content" style={{ padding: 0 }}>
    <div className="topbar" style={{ padding: 18 }}><IconButton onClick={() => go(3)}>←</IconButton><div style={{ display: 'flex', gap: 8 }}><IconButton onClick={() => setLiked(!liked)}>{liked ? '♥' : '♡'}</IconButton><IconButton>↗</IconButton></div></div>
    <div className="detail-art">☕</div><div className="detail-body"><div style={{ fontWeight: 900 }}>咖啡 · 独立空间</div><h2 className="page-title" style={{ marginBottom: 7 }}>树下咖啡室</h2><p style={{ fontWeight: 800, lineHeight: 1.5 }}>适合一个人慢慢坐，也适合两三个人聊天。今天 10:00–20:00。</p><div className="distance">📍 距离你 1.2km</div><div style={{ marginTop: 15 }}><Button className="primary" onClick={() => go(3)}>去这里 / 加入计划 →</Button></div></div>
  </div></PhoneFrame>;
}
