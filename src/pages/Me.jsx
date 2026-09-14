import PhoneFrame, { IconButton } from '../components/PhoneFrame';

export default function Me({ go }) {
  return <PhoneFrame index={5}><div className="content"><div className="row-between"><IconButton onClick={() => go(1)}>←</IconButton><IconButton>⚙</IconButton></div><div className="profile"><div className="avatar">✦</div><div><h2>我的 Funday</h2><div className="muted">今天也去发生一点。</div></div><button className="icon" style={{ marginLeft: 'auto' }}>编辑</button></div><div className="stats"><div className="stat pink">♡ 收藏<br/><small>12 个点位</small></div><div className="stat mint">✦ 我的方案<br/><small>8 份记录</small></div></div><div className="menu">{['我的活动', '发起记录', '我的收藏'].map(x => <div className="menu-item" key={x} onClick={() => go(6)}><span>{x}</span><span>→</span></div>)}</div></div></PhoneFrame>;
}
