import { useState } from 'react';
import PhoneFrame, { Button, IconButton } from '../components/PhoneFrame';

export default function Host({ go }) {
  const [pledge, setPledge] = useState(false);
  return <PhoneFrame index={7}><div className="content"><IconButton onClick={() => go(1)}>←</IconButton><h2 className="page-title">发起一个 Funday</h2><p className="muted">把你想玩的事，变成一次真实见面。</p><input placeholder="活动名称，例如：周六公园野餐"/><input placeholder="时间，例如：周六 14:00"/><textarea rows="4" placeholder="简单说说你想怎么玩"/><label style={{ display: 'flex', gap: 8, marginTop: 16, fontWeight: 800 }}><input style={{ width: 'auto', margin: 0 }} type="checkbox" checked={pledge} onChange={e => setPledge(e.target.checked)}/>我会按约定组织活动</label><div className="bottom-action"><Button className="primary" onClick={() => pledge && go(8)}>提交活动 →</Button></div></div></PhoneFrame>;
}
