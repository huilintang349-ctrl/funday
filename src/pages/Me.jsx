import PhoneFrame, { IconButton } from '../components/PhoneFrame';
import { activities } from '../data';

export default function Me({ go, appState }) {
  const favorites = appState?.favorites ?? [];
  const registered = appState?.registeredActivities ?? [];
  const hosted = appState?.hostedActivities ?? [];
  return <PhoneFrame index={5}><div className="content"><div className="row-between"><IconButton onClick={() => go(1)}>←</IconButton><IconButton>⚙</IconButton></div><div className="profile"><div className="avatar">✦</div><div><h2>我的 Funday</h2><div className="muted">今天也去发生一点。</div></div><button className="icon" style={{ marginLeft: 'auto' }}>编辑</button></div><div className="stats"><div className="stat pink">♡ 收藏<br/><small>{favorites.length} 个点位</small></div><div className="stat mint">✦ 我的方案<br/><small>{appState?.currentPlan ? '1 份当前方案' : '暂无方案'}</small></div></div><div className="menu"><div className="menu-item" onClick={() => go(6)}><span>我的活动</span><span>{registered.length} →</span></div><div className="menu-item" onClick={() => go(7)}><span>发起记录</span><span>{hosted.length} →</span></div><div className="menu-item" onClick={() => go(4)}><span>我的收藏</span><span>{favorites.length} →</span></div></div>{registered.length > 0 && <div style={{ marginTop: 18, fontWeight: 900 }}>已报名：{registered.map(id => activities.find(a => a.id === id)?.title).filter(Boolean).join('、')}</div>}</div></PhoneFrame>;
}
