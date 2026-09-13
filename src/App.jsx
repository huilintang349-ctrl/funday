import { useEffect, useState } from 'react';
import './styles.css';
import { activities, planStops, preferenceOptions, screens } from './data';

const Button = ({ children, onClick, className = '', type = 'button' }) => <button type={type} className={`btn ${className}`} onClick={onClick}>{children}</button>;
const Icon = ({ children, onClick }) => <button className="icon" onClick={onClick}>{children}</button>;
const Phone = ({ index, children }) => <div className="phone-wrap"><div className="phone-label">{String(index).padStart(2, '0')} · {screens[index - 1].name}</div><div className="phone"><div className="screen">{children}</div></div></div>;

function Home({ go }) {
  const [text, setText] = useState('');
  return <Phone index={1}><div className="content"><div className="topbar"><div className="logo">Funday ✦</div><Icon>♧</Icon></div><div className="hero"><div className="eyebrow">今天想去哪儿？</div><h2>去玩点<br/><span className="highlight">真的。</span></h2><div className="chips">{['🌿 户外','☕ 咖啡','🎨 看展','🎵 音乐'].map(x => <button className="chip" key={x} onClick={() => setText(x.slice(2))}>{x}</button>)}</div><div className="prompt"><b>一句话告诉我</b><input value={text} onChange={e => setText(e.target.value)} placeholder="比如：今晚想和朋友轻松玩 3 小时"/><Button className="primary" onClick={() => go(2)}>开始定制 →</Button></div><div className="entry-grid"><button className="entry" onClick={() => go(2)}>✨ 定制方案</button><button className="entry mint" onClick={() => go(4)}>📍 附近</button><button className="entry pink" onClick={() => go(7)}>＋ 发起活动</button></div><div className="hot-row"><div className="hot">☕ 咖啡节</div><div className="hot purple">🎭 喜剧夜</div></div><div className="topic">本周话题 · 一个人也要好好玩 →</div></div></div></Phone>;
}

function Customize({ go }) {
  const [selected, setSelected] = useState(['户外','咖啡','看展','音乐']);
  const [duration, setDuration] = useState('2h');
  const toggle = name => setSelected(s => s.includes(name) ? s.filter(x => x !== name) : [...s, name]);
  return <Phone index={2}><div className="content"><Icon onClick={() => go(1)}>←</Icon><h2 className="page-title">定制你的今天</h2><p className="muted">选几个你现在真正想做的。</p><div className="tags" style={{marginTop:20}}>{preferenceOptions.map(([emoji,name]) => <button key={name} className={`tag ${selected.includes(name) ? 'active' : ''}`} onClick={() => toggle(name)}>{emoji} {name}</button>)}</div><div style={{marginTop:20}}><b>你有多久？</b><div className="chips" style={{marginTop:10}}>{['2h','4h','半天'].map(x => <button key={x} className={`duration ${duration === x ? 'active' : ''}`} onClick={() => setDuration(x)}>{x}</button>)}</div></div><div style={{marginTop:20,fontWeight:900}}>已选 <b>{selected.length}</b> 个偏好</div><div className="bottom-action"><Button className="primary" onClick={() => go(3)}>生成方案 →</Button></div></div></Phone>;
}

function Plan({ go }) { return <Phone index={3}><div className="content"><div className="row-between"><Icon onClick={() => go(2)}>←</Icon><Icon>↗</Icon></div><h2 className="page-title">你的今日计划</h2><p className="muted">轻松一点，刚刚好。</p><div className="timeline">{planStops.map(s => <button key={s.time} className={`stop ${s.tone}`} onClick={() => go(4)}><b>{s.time} · {s.title}</b><span>{s.desc}</span></button>)}</div></div></Phone> }

function Detail({ go }) { const [liked,setLiked] = useState(false); return <Phone index={4}><div className="content" style={{padding:0}}><div className="topbar" style={{padding:18}}><Icon onClick={() => go(3)}>←</Icon><div style={{display:'flex',gap:8}}><Icon onClick={() => setLiked(!liked)}>{liked?'♥':'♡'}</Icon><Icon>↗</Icon></div></div><div className="detail-art">☕</div><div className="detail-body"><div style={{fontWeight:900}}>咖啡 · 独立空间</div><h2 className="page-title" style={{marginBottom:7}}>树下咖啡室</h2><p style={{fontWeight:800,lineHeight:1.5}}>适合一个人慢慢坐，也适合两三个人聊天。今天 10:00–20:00。</p><div className="distance">📍 距离你 1.2km</div><div style={{marginTop:15}}><Button className="primary" onClick={() => go(3)}>去这里 / 加入计划 →</Button></div></div></div></Phone> }

function Me({ go }) { return <Phone index={5}><div className="content"><div className="row-between"><Icon onClick={() => go(1)}>←</Icon><Icon>⚙</Icon></div><div className="profile"><div className="avatar">✦</div><div><h2>我的 Funday</h2><div className="muted">今天也去发生一点。</div></div><button className="icon" style={{marginLeft:'auto'}}>编辑</button></div><div className="stats"><div className="stat pink">♡ 收藏<br/><small>12 个点位</small></div><div className="stat mint">✦ 我的方案<br/><small>8 份记录</small></div></div><div className="menu">{['我的活动','发起记录','我的收藏'].map(x => <div className="menu-item" key={x} onClick={() => go(6)}><span>{x}</span><span>→</span></div>)}</div></div></Phone> }

function Activities({ go }) { const [filter,setFilter]=useState('全部'); const [picked,setPicked]=useState(null); const list=filter==='全部'?activities:activities.filter(a=>a.type===filter); return <Phone index={6}><div className="content"><div className="row-between"><Icon onClick={() => go(1)}>←</Icon><b>活动报名</b><span/></div><h2 className="page-title">和有趣的人，<br/>一起去发生。</h2><div className="activity-filter">{['全部','户外','咖啡','看展'].map(x=><button key={x} className={`duration ${filter===x?'active':''}`} onClick={()=>setFilter(x)}>{x}</button>)}</div>{list.map(a=><div key={a.id} className={`activity-card ${a.tone}`} onClick={()=>setPicked(a)}><h3>{a.title}</h3><div>{a.time} · {a.people}</div></div>)}</div>{picked&&<div className="modal-backdrop" onClick={()=>setPicked(null)}><div className="modal" onClick={e=>e.stopPropagation()}><h3>{picked.title}</h3><p>{picked.time}，{picked.people}。加入后你会看到活动集合地点和参与者信息。</p><div className="modal-actions"><Button onClick={()=>setPicked(null)}>取消</Button><Button className="primary" onClick={()=>{setPicked(null);go(8)}}>报名参加</Button></div></div></div>}</Phone> }

function Host({ go }) { const [pledge,setPledge]=useState(false); return <Phone index={7}><div className="content"><Icon onClick={() => go(1)}>←</Icon><h2 className="page-title">发起一个 Funday</h2><p className="muted">把你想玩的事，变成一次真实见面。</p><input placeholder="活动名称，例如：周六公园野餐"/><input placeholder="时间，例如：周六 14:00"/><textarea rows="4" placeholder="简单说说你想怎么玩"/><label style={{display:'flex',gap:8,marginTop:16,fontWeight:800}}><input style={{width:'auto',margin:0}} type="checkbox" checked={pledge} onChange={e=>setPledge(e.target.checked)}/>我会按约定组织活动</label><div className="bottom-action"><Button className="primary" onClick={()=>pledge&&go(8)}>提交活动 →</Button></div></div></Phone> }

function Success({ go }) { return <Phone index={8}><div className="success"><div><div className="success-mark">✓</div><h2>提交成功！</h2><p className="muted">你的 Funday 已经准备好出发。<br/>接下来，去发生一点真的。</p><Button className="primary" onClick={()=>go(1)}>回到首页</Button></div></div></Phone> }

const pages = [Home, Customize, Plan, Detail, Me, Activities, Host, Success];

export default function App() {
  const [page, setPage] = useState(() => Number(location.hash.replace('#','')) || 1);
  const go = next => { setPage(next); location.hash = String(next); window.scrollTo({top:0,behavior:'smooth'}); };
  useEffect(() => { const onHash=()=>setPage(Number(location.hash.replace('#',''))||1); window.addEventListener('hashchange',onHash); const onKey=e=>{if(e.key==='ArrowRight')go(Math.min(8,page+1)); if(e.key==='ArrowLeft')go(Math.max(1,page-1));}; window.addEventListener('keydown',onKey); document.title='方得 Funday · React'; return()=>{window.removeEventListener('hashchange',onHash);window.removeEventListener('keydown',onKey)} }, [page]);
  const Page = pages[page-1] || Home;
  return <main className="app"><header className="head"><div><h1>方得 Funday</h1><p>今天，去玩点真的。</p></div><div className="version">React + Vite · v0.3</div></header><nav className="toolbar" aria-label="页面导航">{screens.map(s=><button key={s.id} className={page===s.id?'active':''} onClick={()=>go(s.id)}>{String(s.id).padStart(2,'0')} {s.name}</button>)}<span className="hint">← → 切页 · 点击按钮体验完整流程</span></nav><Page go={go}/></main>;
}
