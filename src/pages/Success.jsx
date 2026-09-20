import PhoneFrame, { Button } from '../components/PhoneFrame';

const successCopy = {
  hosted: {
    title: '活动发布成功！',
    desc: '你的 Funday 已经发布。\n接下来，等有趣的人加入。',
  },
  registered: {
    title: '报名成功！',
    desc: '你已经加入活动。\n接下来，去发生一点真的。',
  },
  plan: {
    title: '方案生成成功！',
    desc: '你的 Funday 已经准备好出发。\n接下来，去发生一点真的。',
  },
};

export default function Success({ go, appState }) {
  const copy = successCopy[appState?.lastAction] || successCopy.plan;
  return <PhoneFrame index={8}><div className="success"><div><div className="success-mark">✓</div><h2>{copy.title}</h2><p className="muted" style={{ whiteSpace: 'pre-line' }}>{copy.desc}</p><Button className="primary" onClick={() => go(1)}>回到首页</Button></div></div></PhoneFrame>;
}
