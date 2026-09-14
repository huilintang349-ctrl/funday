import PhoneFrame, { Button } from '../components/PhoneFrame';

export default function Success({ go }) {
  return <PhoneFrame index={8}><div className="success"><div><div className="success-mark">✓</div><h2>提交成功！</h2><p className="muted">你的 Funday 已经准备好出发。<br/>接下来，去发生一点真的。</p><Button className="primary" onClick={() => go(1)}>回到首页</Button></div></div></PhoneFrame>;
}
