import { screens } from '../data';

export function Button({ children, onClick, className = '', type = 'button' }) {
  return <button type={type} className={`btn ${className}`} onClick={onClick}>{children}</button>;
}

export function IconButton({ children, onClick, className = '' }) {
  return <button className={`icon ${className}`} onClick={onClick}>{children}</button>;
}

export default function PhoneFrame({ index, children }) {
  return (
    <div className="phone-wrap">
      <div className="phone-label">{String(index).padStart(2, '0')} · {screens[index - 1].name}</div>
      <div className="phone"><div className="screen">{children}</div></div>
    </div>
  );
}
