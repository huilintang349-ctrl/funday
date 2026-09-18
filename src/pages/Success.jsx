import PhoneFrame, { Button } from '../components/PhoneFrame';

export default function Success({ go, appState }) {
  const hasHosted = appState?.hostedActivities?.length > 0;
  const hasRegistered = appState?.registeredActivities?.length > 0;
  const title = hasHosted ? '活动发布成功！' : hasRegistered ? '报名成功！' : '提交成功！';
  const desc = hasHosted ? '你的 Funday 已经发布。\n接下来，等有趣的人加入。' : hasRegistered ? '你已经加入活动。\n接下来，去发生一点真的。' : '你的 Funday 已经准备好出发。\n接下来，去发生一点真的。';
  return <PhoneFrame index={8}><div className="success"><div><div className="success-mark">✓</div><h2>{title}</h2><p className="muted" style={{ whiteSpace: 'pre-line' }}>{desc}</p><Button className="primary" onClick={() => go(1)}>回到首页</Button></div></div></PhoneFrame>;
}
