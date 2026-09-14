import { useState } from 'react';
import PhoneFrame, { Button, IconButton } from '../components/PhoneFrame';

export default function Home({ go }) {
  const [text, setText] = useState('');
  const quick = ['🌿 户外', '☕ 咖啡', '🎨 看展', '🎵 音乐'];
  return <PhoneFrame index={1}><div className="content">
    <div className="topbar"><div className="logo">Funday ✦</div><IconButton>♧</IconButton></div>
    <div className="hero"><div className="eyebrow">今天想去哪儿？</div><h2>去玩点<br/><span className="highlight">真的。</span></h2>
      <div className="chips">{quick.map(x => <button className="chip" key={x} onClick={() => setText(x.slice(2))}>{x}</button>)}</div>
      <div className="prompt"><b>一句话告诉我</b><input value={text} onChange={e => setText(e.target.value)} placeholder="比如：今晚想和朋友轻松玩 3 小时"/><Button className="primary" onClick={() => go(2)}>开始定制 →</Button></div>
      <div className="entry-grid"><button className="entry" onClick={() => go(2)}>✨ 定制方案</button><button className="entry mint" onClick={() => go(4)}>📍 附近</button><button className="entry pink" onClick={() => go(7)}>＋ 发起活动</button></div>
      <div className="hot-row"><div className="hot">☕ 咖啡节</div><div className="hot purple">🎭 喜剧夜</div></div><div className="topic">本周话题 · 一个人也要好好玩 →</div>
    </div></div></PhoneFrame>;
}
