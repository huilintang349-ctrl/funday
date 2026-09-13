(function(){
  const root=document.body, row=document.querySelector('.row');
  if(!row) return;
  root.classList.add('prototype-mode');
  const pages=[...row.children];
  const names=['首页','定制方案','方案结果','点位详情','我的','活动报名','发起活动','提交成功'];
  const state={page:0,selectedTags:4,liked:false,filter:'全部',formValid:true};
  const toolbar=document.createElement('div'); toolbar.className='prototype-toolbar'; toolbar.innerHTML='<div class="proto-title">🎮 交互原型预览</div>';
  names.forEach((n,i)=>{const b=document.createElement('button');b.textContent=(i+1).toString().padStart(2,'0')+' '+n;b.dataset.page=i;toolbar.appendChild(b)});
  const hint=document.createElement('span');hint.className='hint';hint.textContent='点击页面里的按钮 / 卡片试试看';toolbar.appendChild(hint);
  document.querySelector('.page-head').after(toolbar);
  const toast=document.createElement('div');toast.className='proto-toast';document.body.appendChild(toast);
  const modal=document.createElement('div');modal.className='proto-modal';modal.innerHTML='<div class="proto-modal-card"><h3 id="protoModalTitle">提示</h3><p id="protoModalText"></p><button class="close">知道了</button></div>';document.body.appendChild(modal);
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('close'))modal.classList.remove('show')});
  function toastMsg(t){toast.textContent=t;toast.classList.add('show');clearTimeout(toastMsg.t);toastMsg.t=setTimeout(()=>toast.classList.remove('show'),1300)}
  function showModal(title,text){modal.querySelector('#protoModalTitle').textContent=title;modal.querySelector('#protoModalText').textContent=text;modal.classList.add('show')}
  function go(i){i=Math.max(0,Math.min(7,i));state.page=i;pages.forEach((p,k)=>p.classList.toggle('proto-active',k===i));toolbar.querySelectorAll('button').forEach(b=>b.classList.toggle('active',+b.dataset.page===i));history.replaceState(null,'','#'+(i+1));window.scrollTo({top:0,behavior:'smooth'})}
  toolbar.addEventListener('click',e=>{const b=e.target.closest('button[data-page]');if(b)go(+b.dataset.page)});
  const q=(sel,i=state.page)=>pages[i]?.querySelector(sel);
  const qa=(sel,i=state.page)=>[...(pages[i]?.querySelectorAll(sel)||[])];
  function click(sel,fn,i){const el=q(sel,i);if(el){el.classList.add('proto-clickable');el.addEventListener('click',fn)}}
  function markAll(sel,i=state.page){qa(sel,i).forEach(el=>el.classList.add('proto-clickable'))}
  qa('.chip',0).forEach(ch=>ch.addEventListener('click',()=>{const input=q('input',0);input.value=ch.textContent.replace(/^\S+\s*/,'');toastMsg('已填入：'+input.value)}));
  click('.send',()=>go(1),0);click('.entry.custom',()=>go(1),0);click('.entry.host',()=>go(6),0);click('.entry.near',()=>go(5),0);click('.bell',()=>showModal('消息中心','这里可以接入活动审核、报名成功、方案更新等消息。'),0);
  markAll('.hot-row .hc',0);qa('.hot-row .hc',0).forEach(el=>el.addEventListener('click',()=>go(3)));click('.topic',()=>showModal('本周话题','咖啡节地图、活动预约和热门点位可以在这里继续展开。'),0);
  qa('.tab',0).forEach((el,idx)=>el.addEventListener('click',()=>{if(idx===0)go(0);if(idx===1)go(5);if(idx===3)go(4);if(idx===2)showModal('清单','这里可以接入收藏与待办清单。')}));
  qa('.dur .d',1).forEach(el=>el.addEventListener('click',()=>{qa('.dur .d',1).forEach(x=>x.classList.remove('proto-selected'));el.classList.add('proto-selected');toastMsg('已选择 '+el.textContent.trim())}));
  qa('.tags .tag',1).forEach(el=>el.addEventListener('click',()=>{el.classList.toggle('proto-selected');const n=qa('.tags .tag.proto-selected',1).length;q('.count b',1).textContent=n||1;state.selectedTags=n||1}));click('.crumb .ic',()=>go(0),1);click('.generate',()=>go(2),1);
  click('.back',()=>go(1),2);click('.share',()=>{navigator.clipboard?.writeText(location.href).catch(()=>{});toastMsg('方案链接已复制')},2);qa('.timeline .stop',2).forEach(el=>el.addEventListener('click',()=>go(3)));
  const detailBack=q('.topbar .b',3);if(detailBack)detailBack.classList.add('proto-clickable'),detailBack.addEventListener('click',()=>go(2));
  click('.like',function(e){e.stopPropagation();this.classList.toggle('proto-liked');this.textContent=this.classList.contains('proto-liked')?'♥':'♡';state.liked=this.classList.contains('proto-liked');toastMsg(state.liked?'已收藏':'已取消收藏')},3);
  const detailShare=q('.topbar .right .b:last-child',3);if(detailShare)detailShare.classList.add('proto-clickable'),detailShare.addEventListener('click',e=>{e.stopPropagation();navigator.clipboard?.writeText(location.href).catch(()=>{});toastMsg('链接已复制')});click('.go',()=>go(5),3);
  click('.me-bar .back',()=>go(0),4);click('.edit',()=>showModal('编辑资料','昵称、头像、所在区域和兴趣标签可以在这里编辑。'),4);click('.set',()=>showModal('设置','通知、隐私、账号和偏好设置入口。'),4);qa('.fav',4).forEach(el=>el.addEventListener('click',()=>go(3)));qa('.rec',4).forEach(el=>el.addEventListener('click',()=>go(2)));
  qa('.menu .it',4).forEach((el,idx)=>el.addEventListener('click',()=>idx===0?go(5):showModal(el.querySelector('.grow')?.textContent||'功能','这个入口已经预留，可以继续接入真实页面。')));
  qa('.tab',4).forEach((el,idx)=>el.addEventListener('click',()=>{if(idx===0)go(0);else if(idx===1)go(5);else if(idx===3)go(4);else showModal('清单','清单页可继续接入。')}));
  click('.back',()=>go(0),5);qa('.filter .t',5).forEach(el=>el.addEventListener('click',()=>{qa('.filter .t',5).forEach(x=>x.classList.remove('proto-filter-active'));el.classList.add('proto-filter-active');state.filter=el.textContent.trim();toastMsg('筛选：'+state.filter)}));
  qa('.ecard',5).forEach(el=>el.addEventListener('click',()=>{qa('.ecard .check',5).forEach(x=>x.classList.remove('proto-selected'));el.querySelector('.check')?.classList.add('proto-selected');q('.fab-bottom .s',5).textContent=(el.querySelector('.nm')?.textContent||'活动')+' · '+(el.querySelector('.price')?.textContent||'¥0');q('.fab-bottom .t',5).textContent='已选 1 项';toastMsg('已选中活动')}));click('.fab-bottom .btn',()=>showModal('报名确认','已选活动：喜剧盒子 · ¥120。接入真实报名接口后即可完成支付 / 报名。'),5);
  click('.back',()=>go(0),6);qa('.options .opt',6).forEach(el=>el.addEventListener('click',()=>{qa('.options .opt',6).forEach(x=>x.classList.remove('active'));el.classList.add('active')}));click('.pledge .ck',function(){this.classList.toggle('proto-unchecked');state.formValid=!this.classList.contains('proto-unchecked')},6);
  const submit=q('.submit',6);if(submit)submit.addEventListener('click',()=>{if(!state.formValid){toastMsg('请先确认担保信息');return}go(7)});qa('input,textarea',6).forEach(el=>el.addEventListener('input',()=>el.closest('.field')?.classList.add('has-value')));click('.upload',()=>showModal('上传资料','这里可以接入真实文件选择器，目前作为交互占位。'),6);
  click('.btn.ghost',()=>go(0),7);click('.btn.primary',()=>go(4),7);
  document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(state.page+1);if(e.key==='ArrowLeft')go(state.page-1);if(e.key==='Escape')modal.classList.remove('show')});
  const h=location.hash.match(/#([1-8])/);go(h?+h[1]-1:0);
})();
