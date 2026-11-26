'use strict';
const BASE='https://mohamedelsayed16399-bit.github.io/';
const CATS=['أكشن','تحدي','ألغاز','سباق','استراتيجية','عائلي','أخرى'];
const AVS=['😎','🦁','🐺','🦅','🐉','🤖','👾','🧙','🥷','🐱','🦊','⚡'];
const SEED=[
['ghost-yourself-game','شبح نفسك','جولاتك السابقة تتحول لأشباح بتطاردك. 10 مراحل وزعماء.','تحدي','👻'],
['arabic-snake-game','الثعبان العربي','ثعبان كلاسيكي بدرع ووضع تحدي الوقت.','أكشن','🐍'],
['skeleton-battle-3d','معركة الهياكل','قتال سيوف ثلاثي الأبعاد ضد موجات الهياكل.','أكشن','💀'],
['knight-arena-3d','ساحة الفارس','فارس في ساحة قتال ضد موجات وزعماء.','أكشن','⚔️'],
['neon-storm-3d','عاصفة النيون','لعبة تصويب ثلاثية الأبعاد في ساحة نيون.','أكشن','🔫'],
['castle-guard-3d','حارس القلعة','دفاع عن القلعة بأبراج وحملة كاملة.','استراتيجية','🏰'],
['galaxy-runner-3d','عدّاء المجرة','سفينة فضاء بين الممرات وزعماء العوالم.','سباق','🚀'],
['zombie-siege-3d','حصار الزومبي','انجُ من حصار الزومبي ثلاثي الأبعاد.','أكشن','🧟'],
['highway-chase-3d','مطاردة الطريق السريع','سباق ومطاردة على الطريق.','سباق','🚗'],
['pirate-battle-3d','معركة القراصنة','معارك سفن بين القراصنة.','أكشن','🏴‍☠️'],
['tank-war-3d','حرب الدبابات','حرب دبابات ثلاثية الأبعاد.','أكشن','🪖'],
['space-guard-3d','حارس الفضاء','دافع عن الفضاء ضد الغزاة.','أكشن','🛸'],
['pharaoh-curse-3d','لعنة الفرعون','بقاء ضد حشود في معبد فرعوني.','أكشن','🏺'],
['orbit-hopper-ar','قافز المدار','اقفز بين المدارات بتوقيت دقيق.','ألغاز','🪐'],
['time-loop-ar','حلقة الزمن','لغز زمني بتكرار الأحداث.','ألغاز','⏳'],
['echo-loop-ar','صدى الحلقة','لغز منصات: نسخك السابقة تضغط الأزرار.','ألغاز','🔁'],
['laser-mirrors-ar','مرايا الليزر','وجّه الليزر بالمرايا لحل المراحل.','ألغاز','🔦'],
['typing-test-ar','اختبار الكتابة','قِس سرعة كتابتك بالعربي.','تحدي','⌨️'],
['dawwarha-wheel','دوّرها','عجلة حظ للقرارات والألعاب.','عائلي','🎡'],
['taarafni','تعرفني قد إيه؟','اختبار الأصدقاء: مين يعرفك أكتر.','عائلي','🧠'],
['Love-game','لعبة الأسئلة للأزواج','أسئلة للأزواج بغرف خاصة بالكود.','عائلي','💞']
].map(([slug,title,desc,cat,emo],i)=>({id:'s_'+slug,title,desc,cat,emo,url:BASE+slug+'/',author:'instinct',authorName:'محمد السيد',ts:1764000000000+i,seed:1}));
const COL=['#3a2a7a','#7a2a4a','#1f6b6b','#7a5a1f','#1f4a7a','#4a7a1f','#7a2a2a'];

/* ---------- storage layer: local (localStorage) or Firebase RTDB REST ---------- */
const URLDB=(window.PLAYHUB_DB_URL||'').replace(/\/$/,'');
const ROOT=window.PLAYHUB_ROOT||'playhub',KEY=window.PLAYHUB_API_KEY||'';
const ONLINE=!!URLDB;
let DB={}; // snapshot
const LS='playhub_db_v1';
const uid0=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);
function loadLocal(){try{DB=JSON.parse(localStorage.getItem(LS)||'{}')}catch(e){DB={}}}
function saveLocal(){localStorage.setItem(LS,JSON.stringify(DB))}
function setPath(obj,path,val){const p=path.split('/').filter(Boolean);let o=obj;for(let i=0;i<p.length-1;i++){o=o[p[i]]=o[p[i]]||{}}
  if(val===null)delete o[p[p.length-1]];else o[p[p.length-1]]=val}
/* anonymous Firebase auth (REST) */
let TOK=null,TOKEXP=0;
async function token(){if(!KEY)return '';if(TOK&&Date.now()<TOKEXP)return TOK;
  let rt=localStorage.getItem('playhub_rt');
  try{if(rt){const r=await fetch('https://securetoken.googleapis.com/v1/token?key='+KEY,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=refresh_token&refresh_token='+encodeURIComponent(rt)});const j=await r.json();if(j.id_token){TOK=j.id_token;TOKEXP=Date.now()+(+j.expires_in-120)*1000;localStorage.setItem('playhub_rt',j.refresh_token);if(j.user_id)localStorage.setItem('playhub_uid',j.user_id);return TOK}}
    const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+KEY,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({returnSecureToken:true})});const j=await r.json();
    if(j.idToken){TOK=j.idToken;TOKEXP=Date.now()+(+j.expiresIn-120)*1000;localStorage.setItem('playhub_rt',j.refreshToken);if(j.localId)localStorage.setItem('playhub_uid',j.localId);return TOK}}catch(e){}
  return ''}
async function myUid(){if(ONLINE){await token();const u=localStorage.getItem('playhub_uid');if(u)return u}return 'u'+uid0()}
async function furl(path){const t=await token();return `${URLDB}/${ROOT}/${path}.json`+(t?'?auth='+t:'')}
let PEND=0;
async function dbSet(path,val){setPath(DB,path,val);saveLocal();
  if(ONLINE){PEND++;try{const r=await fetch(await furl(path),{method:val===null?'DELETE':'PUT',body:val===null?undefined:JSON.stringify(val)});if(!r.ok)toast('تعذر الحفظ أونلاين ('+r.status+')')}catch(e){toast('تعذر الحفظ أونلاين')}finally{PEND--}}}
async function dbPush(path,val){const k='k'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);await dbSet(path+'/'+k,val);return k}
async function dbSync(){if(!ONLINE||PEND)return;try{const r=await fetch(await furl(''));if(!r.ok||PEND)return;const j=await r.json();if(PEND)return;DB=(j&&typeof j==='object')?j:{};saveLocal();return true}catch(e){}}
loadLocal();

/* ---------- state ---------- */
let me=JSON.parse(localStorage.getItem('playhub_me')||'null');
let view={t:'home'},cat='الكل',q='';
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
const vals=o=>o?Object.entries(o).map(([k,v])=>({...v,_k:k})):[];
function allGames(){const g=vals(DB.games).map(x=>({...x,id:x._k})).filter(x=>Object.keys((DB.reports||{})[x.id]||{}).length<3);return [...SEED,...g]}
function ratingOf(id){const r=Object.values((DB.ratings||{})[id]||{});return{n:r.length,avg:r.length?r.reduce((a,b)=>a+b,0)/r.length:0}}
const playsOf=id=>Object.keys((DB.plays||{})[id]||{}).length+((DB.playc||{})[id]||0);
const followers=u=>Object.values(DB.follows||{}).filter(f=>f&&f[u]).length;
const isFollowing=u=>!!(me&&((DB.follows||{})[me.id]||{})[u]);
const userName=u=>u==='instinct'?'محمد السيد':((DB.users||{})[u]||{}).name||'لاعب';
const userAv=u=>u==='instinct'?'🛠️':((DB.users||{})[u]||{}).avatar||'🙂';
const stars=a=>'★'.repeat(Math.round(a))+'☆'.repeat(5-Math.round(a));
const scoreLvl=s=>s>=3000?'👑':s>=1000?'🥇':'';
function xpOf(u){let x=0;for(const g of vals(DB.games))if(g.author===u)x+=50;for(const gid in DB.scores||{})if((DB.scores[gid]||{})[u])x+=10;
  for(const gid in DB.comments||{})for(const c of vals(DB.comments[gid]))if(c.uid===u)x+=5;for(const gid in DB.ratings||{})if((DB.ratings[gid]||{})[u])x+=3;
  for(const gid in DB.plays||{})if((DB.plays[gid]||{})[u])x+=1;return x}
const lvlOf=x=>Math.floor(Math.sqrt(x/15))+1;
function badges(u){const b=[];const gs=vals(DB.games).filter(g=>g.author===u).length;const sc=Object.values(DB.scores||{}).filter(m=>m&&m[u]).length;const top=Object.values(DB.scores||{}).filter(m=>{const e=Object.entries(m||{}).sort((a,b)=>b[1].score-a[1].score)[0];return e&&e[0]===u}).length;
  if(gs>=1)b.push('🛠️ صانع');if(gs>=3)b.push('🏭 منتج');if(sc>=1)b.push('🎯 لاعب');if(sc>=5)b.push('🔥 محترف');if(top>=1)b.push('👑 بطل لعبة');if(followers(u)>=3)b.push('⭐ مشهور');return b}
function activity(){const a=[];for(const g of vals(DB.games))a.push({ts:g.ts,t:`🆕 ${esc(userName(g.author))} نشر <b>${esc(g.title)}</b>`,g:g._k});
  for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];const g=allGames().find(x=>x.id===gid);if(g)a.push({ts:e.ts||0,t:`🏆 ${esc(e.name)} سجّل ${e.score} في <b>${esc(g.title)}</b>`,g:gid})}
  for(const gid in DB.comments||{})for(const c of vals(DB.comments[gid])){const g=allGames().find(x=>x.id===gid);if(g)a.push({ts:c.ts,t:`💬 ${esc(c.name)} علّق على <b>${esc(g.title)}</b>`,g:gid})}
  return a.sort((x,y)=>y.ts-x.ts).slice(0,8)}
function trending(g){const r=ratingOf(g.id);return playsOf(g.id)*1+r.avg*r.n*3+(g.seed?0:5)+(Date.now()-g.ts<864e5*3?4:0)}

/* ---------- cards ---------- */
function cover(g,c){let h=0;for(const ch of g.id+g.title)h=(h*31+ch.charCodeAt(0))>>>0;const a=h%360,b=(a+60)%360;
  return `radial-gradient(circle at ${h%90}% ${(h>>3)%80}%,hsla(${a},80%,60%,.55),transparent 45%),radial-gradient(circle at ${(h>>5)%100}% 90%,hsla(${b},80%,55%,.5),transparent 50%),linear-gradient(135deg,${c},#0f1226)`}
function card(g){g.title=g.title||'بدون اسم';g.cat=g.cat||'أخرى';g.desc=g.desc||'';const r=ratingOf(g.id);const c=COL[(g.title.length+g.cat.length)%COL.length];
  return `<div class="card" data-g="${esc(g.id)}"><div class="thumb" style="background:${cover(g,c)}"><span style="text-shadow:0 4px 14px #000a">${esc(g.emo||'🎮')}</span></div><div class="cb"><h3>${esc(g.title)}</h3>
  <div class="meta"><span class="star">${r.n?stars(r.avg):'☆☆☆☆☆'}</span><span>${r.n?r.avg.toFixed(1)+' ('+r.n+')':'جديد'}</span><span>▶ ${playsOf(g.id)}</span></div>
  <div class="meta">${esc(g.cat)} · ${esc(userName(g.author))}</div></div></div>`}
function bindCards(){document.querySelectorAll('[data-g]').forEach(e=>e.onclick=()=>go({t:'game',id:e.dataset.g}));
  document.querySelectorAll('[data-u]').forEach(e=>e.onclick=()=>go({t:'user',id:e.dataset.u}))}

/* ---------- views ---------- */
function myInbox(){if(!me)return[];return vals(DB.challenges).filter(c=>c.to===me.id||(!c.to&&c.from!==me.id&&false)).filter(c=>!((DB.seen||{})[me.id]||{})[c._k])}
function renderNav(){const items=[['home','🏠','الرئيسية'],['explore','🔍','اكتشف'],['publish','➕','انشر'],['chal','⚔️','تحديات'],['me','👤','ملفي']];
  const n=myInbox().length;$('#nav').innerHTML=items.map(([k,i,l])=>`<button data-n="${k}" class="${view.t===k?'on':''}"><b>${i}</b>${l}${k==='chal'&&n?`<span class="dot">${n}</span>`:''}</button>`).join('');
  $('#nav').querySelectorAll('button').forEach(b=>b.onclick=()=>go({t:b.dataset.n}));
  $('#mode').textContent=ONLINE?'● أونلاين':'● محلي';$('#mode').className='badge'+(ONLINE?' on':'');
  $('#meBtn').textContent=me?me.avatar+' '+me.name:'سجّل دخول';$('#meBtn').onclick=()=>go({t:'me'})}
function go(v){view=v;scrollTo(0,0);render()}
function render(){renderNav();(V[view.t]||V.home)()}
const V={};
V.home=()=>{const g=allGames();const top=[...g].sort((a,b)=>trending(b)-trending(a)).slice(0,8);
  const fresh=[...g].filter(x=>!x.seed).sort((a,b)=>b.ts-a.ts).slice(0,8);
  const best=[...g].filter(x=>ratingOf(x.id).n).sort((a,b)=>ratingOf(b.id).avg-ratingOf(a.id).avg).slice(0,8);
  const fol=me?g.filter(x=>isFollowing(x.author)):[];
  const day=Math.floor(Date.now()/864e5),god=g[day%g.length],act=activity();
  const nUsers=Object.keys(DB.users||{}).length,nPlays=g.reduce((a,x)=>a+playsOf(x.id),0);
  app.innerHTML=`<div class="box" style="background:linear-gradient(135deg,#3a2a7a,#7a2a4a)"><h2 style="margin:0">أهلاً ${me?esc(me.name):'بيك في ملعب'} 👋</h2><div class="meta" style="margin-top:6px">العب، قيّم، تابع صنّاع الألعاب، وتحدَّ أصحابك. وانشر لعبتك بنفسك.</div>
  <div class="meta" style="margin-top:10px;font-size:13px"><span>🎮 ${g.length} لعبة</span><span>👥 ${nUsers} لاعب</span><span>▶ ${nPlays} لعبة اتلعبت</span></div></div>
  <div class="box" data-g="${esc(god.id)}" style="cursor:pointer;border:1px solid var(--ac)"><div class="meta" style="color:var(--ac)">⭐ لعبة اليوم</div><h2 style="margin:4px 0">${esc(god.emo||'🎮')} ${esc(god.title)}</h2><div class="meta">${esc(god.desc)}</div></div>
  ${myInbox().length?`<div class="box" id="chb" style="background:#3a1f2a;border:1px solid var(--bad);cursor:pointer"><b>⚔️ عندك ${myInbox().length} تحدي جديد!</b><div class="meta">اضغط لتشوفهم</div></div>`:''}
  <h2>🔥 الأكثر رواجاً</h2><div class="row">${top.map(card).join('')}</div>
  ${fol.length?`<h2>👥 من تتابعهم</h2><div class="row">${fol.map(card).join('')}</div>`:''}
  ${fresh.length?`<h2>🆕 جديد من اللاعبين</h2><div class="row">${fresh.map(card).join('')}</div>`:''}
  ${best.length?`<h2>⭐ الأعلى تقييماً</h2><div class="row">${best.map(card).join('')}</div>`:''}
  ${act.length?`<h2>⚡ آخر النشاط</h2><div class="box">${act.map(a=>`<div class="cm" data-g="${esc(a.g)}" style="cursor:pointer">${a.t}</div>`).join('')}</div>`:''}
  <h2>🏆 أفضل اللاعبين</h2><div class="box">${topPlayers().map((p,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(p.u))}</span><b style="flex:1" data-u="${esc(p.u)}">${esc(userName(p.u))}</b><span>${p.pts} نقطة</span></div>`).join('')||'<div class="empty">لسه مفيش نتائج. كن أول واحد يسجّل!</div>'}</div>`;bindCards();const cb=$('#chb');if(cb)cb.onclick=()=>go({t:'chal'})};
function topPlayers(){const m={};for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const rk=Object.entries(DB.scores[gid]).sort((a,b)=>b[1].score-a[1].score).findIndex(x=>x[0]===u);m[u]=(m[u]||0)+[10,6,3][rk]||0}
  return Object.entries(m).map(([u,pts])=>({u,pts})).filter(x=>x.pts).sort((a,b)=>b.pts-a.pts).slice(0,10)}
V.explore=()=>{const g=allGames().filter(x=>(cat==='الكل'||x.cat===cat)&&(!q||(x.title+x.desc+userName(x.author)).includes(q)));
  app.innerHTML=`<input id="sq" placeholder="ابحث عن لعبة أو صانع..." value="${esc(q)}"><div class="chips">${['الكل',...CATS].map(c=>`<button class="chip ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}</div>
  <select id="so"><option value="t">الأكثر رواجاً</option><option value="r">الأعلى تقييماً</option><option value="n">الأحدث</option></select>
  <div class="grid" id="gl"></div>`;
  const fill=()=>{const o=$('#so').value;const l=[...g].sort((a,b)=>o==='r'?ratingOf(b.id).avg-ratingOf(a.id).avg:o==='n'?b.ts-a.ts:trending(b)-trending(a));$('#gl').innerHTML=l.map(card).join('')||'<div class="empty">مفيش نتائج</div>';bindCards()};
  fill();$('#so').onchange=fill;$('#sq').oninput=e=>{q=e.target.value;const p=e.target.selectionStart;V.explore();const i=$('#sq');i.focus();i.setSelectionRange(p,p)};
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{cat=b.dataset.c;V.explore()})};
V.game=()=>{const g=allGames().find(x=>x.id===view.id);if(!g){app.innerHTML='<div class="empty">اللعبة مش موجودة</div>';return}
  const r=ratingOf(g.id),mine=me?((DB.ratings||{})[g.id]||{})[me.id]:0;
  const sc=Object.entries((DB.scores||{})[g.id]||{}).map(([u,v])=>({u,...v})).sort((a,b)=>b.score-a.score);
  const cm=vals((DB.comments||{})[g.id]).sort((a,b)=>b.ts-a.ts);
  const src=g.html?`srcdoc="${esc(g.html)}" sandbox="allow-scripts allow-pointer-lock"`:`src="${esc(g.url)}" allow="fullscreen;autoplay"`;
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2 style="margin:4px 0">${esc(g.emo||'🎮')} ${esc(g.title)}</h2>
  <div class="meta" style="margin-bottom:8px"><span class="star">${r.n?stars(r.avg):''}</span><span>${r.n?r.avg.toFixed(1)+' ('+r.n+' تقييم)':'بدون تقييم'}</span><span>▶ ${playsOf(g.id)} لعبة</span><span>${esc(g.cat)}</span></div>
  <div id="fr"><div class="box" style="text-align:center"><p>${esc(g.desc)}</p><button class="btn gold" id="play">▶ العب الآن</button> <button class="btn ghost" id="fs">ملء الشاشة</button></div></div>
  <div class="box"><div class="meta" style="margin-bottom:8px">صانع اللعبة</div><div class="lb" style="border:0"><span class="av">${esc(userAv(g.author))}</span><b style="flex:1" data-u="${esc(g.author)}">${esc(userName(g.author))}</b>${me&&me.id!==g.author?`<button class="btn sm ${isFollowing(g.author)?'ghost':'gold'}" id="fl">${isFollowing(g.author)?'إلغاء المتابعة':'+ متابعة'}</button>`:''}</div><div class="meta">${followers(g.author)} متابع</div></div>
  <div class="box"><b>قيّم اللعبة</b><div class="stars" id="st">${[1,2,3,4,5].map(i=>`<button data-s="${i}" class="${mine>=i?'on':''}">★</button>`).join('')}</div></div>
  <div class="box"><b>🏆 لوحة المتصدرين</b>${sc.slice(0,10).map((s,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(s.u))}</span><b style="flex:1">${esc(s.name)} ${scoreLvl(s.score)}</b><span>${s.score}</span>${me&&s.u!==me.id?`<button class="btn sm ghost" data-ch="${esc(s.u)}" data-sc="${s.score}">⚔️ تحدّى</button>`:''}</div>`).join('')||'<div class="empty">مفيش نتائج لسه</div>'}
  <div style="display:flex;gap:8px;margin-top:10px"><input id="scv" type="number" inputmode="numeric" placeholder="نتيجتك" style="margin:0"><button class="btn" id="scb">سجّل</button></div>
  <div class="meta" style="margin-top:6px">الألعاب الداعمة بتبعت النتيجة تلقائي. غير كده سجّلها بإيدك.</div></div>
  <div class="box"><b>💬 التعليقات (${cm.length})</b><div style="display:flex;gap:8px"><input id="cmt" placeholder="اكتب تعليق..." style="margin:0"><button class="btn" id="cmb">أرسل</button></div>
  ${cm.map(c=>`<div class="cm"><b>${esc(userAv(c.uid))} ${esc(c.name)}</b> <small>${new Date(c.ts).toLocaleDateString('ar-EG')}</small><div>${esc(c.text)}</div></div>`).join('')}</div>
  <div class="box"><button class="btn ghost" id="sh">🔗 انسخ رابط اللعبة</button> <button class="btn ghost" id="rp">🚩 إبلاغ</button>${me&&me.id===g.author&&!g.seed?' <button class="btn ghost" id="dl" style="color:var(--bad)">🗑️ حذف لعبتي</button>':''}</div>`;
  $('#bk').onclick=()=>history.length>1?go({t:'home'}):go({t:'home'});
  const start=async()=>{$('#fr').innerHTML=`<iframe class="frame" ${src}></iframe>`;if(me)await dbSet(`plays/${g.id}/${me.id}`,Date.now())};
  $('#play').onclick=start;$('#fs').onclick=async()=>{await start();$('#fr iframe').requestFullscreen&&$('#fr iframe').requestFullscreen()};
  if(view.autoplay)start();
  document.querySelectorAll('#st [data-s]').forEach(b=>b.onclick=async()=>{if(!need())return;await dbSet(`ratings/${g.id}/${me.id}`,+b.dataset.s);toast('شكراً على تقييمك ⭐');V.game()});
  $('#scb').onclick=()=>submitScore(g,+$('#scv').value);
  $('#cmb').onclick=async()=>{const t=$('#cmt').value.trim();if(!t||!need())return;await dbPush(`comments/${g.id}`,{uid:me.id,name:me.name,text:t.slice(0,300),ts:Date.now()});V.game()};
  const f=$('#fl');if(f)f.onclick=async()=>{if(!need())return;await dbSet(`follows/${me.id}/${g.author}`,isFollowing(g.author)?null:true);V.game()};
  document.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>challengeDlg(g,b.dataset.ch,+b.dataset.sc));
  $('#sh').onclick=()=>{const u=location.href.split('#')[0].split('?')[0]+'?g='+encodeURIComponent(g.id);const txt=(me?me.name+' بيتحداك ':'')+'تلعب '+g.title+' في ملعب: '+u;if(navigator.share){navigator.share({title:g.title,text:txt,url:u}).catch(()=>{})}else{navigator.clipboard&&navigator.clipboard.writeText(txt);toast('تم نسخ الرابط')}};
  $('#rp').onclick=async()=>{if(!need())return;await dbSet(`reports/${g.id}/${me.id}`,Date.now());toast('تم الإبلاغ، شكراً')};
  const dl=$('#dl');if(dl)dl.onclick=async()=>{if(confirm('حذف لعبتك نهائياً؟')){await dbSet('games/'+g.id,null);toast('اتحذفت');go({t:'home'})}};
  bindCards()};
function need(){if(me)return true;toast('سجّل دخول الأول');go({t:'me'});return false}
async function submitScore(g,s){if(!need())return;if(!(s>=0)||!isFinite(s)||s>1e9){toast('اكتب نتيجة صحيحة');return}
  const old=((DB.scores||{})[g.id]||{})[me.id];if(old&&old.score>=s){toast('نتيجتك الأعلى المسجلة '+old.score);return}
  await dbSet(`scores/${g.id}/${me.id}`,{name:me.name,score:Math.floor(s),ts:Date.now()});toast('اتسجلت نتيجتك 🏆');
  const beat=vals(DB.challenges).filter(c=>c.gid===g.id&&c.to===me.id&&!c.done&&s>c.score);
  for(const c of beat){await dbSet(`challenges/${c._k}/done`,true);await dbSet(`challenges/${c._k}/winner`,me.id);toast('كسبت تحدي '+c.fromName+' ⚔️')}
  V.game()}
function challengeDlg(g,to,score){const note=prompt('تحدّى '+userName(to)+' إنه يكسر '+Math.max(score,0)+' في '+g.title+'؟\nاكتب رسالة (اختياري):','');if(note===null)return;
  dbPush('challenges',{from:me.id,fromName:me.name,to,gid:g.id,gtitle:g.title,score,note:(note||'').slice(0,100),ts:Date.now()}).then(()=>toast('اتبعت التحدي ⚔️'))}
V.publish=()=>{if(!me){app.innerHTML='<div class="empty">سجّل دخول الأول عشان تنشر</div><button class="btn" id="lg">دخول</button>';$('#lg').onclick=()=>go({t:'me'});return}
  app.innerHTML=`<h2>➕ انشر لعبتك</h2><div class="box"><input id="pt" placeholder="اسم اللعبة" maxlength="40"><textarea id="pd" placeholder="وصف قصير" maxlength="200"></textarea>
  <select id="pc">${CATS.map(c=>`<option>${c}</option>`).join('')}</select>
  <div class="avs" id="pe">${['🎮','🚀','⚔️','🧩','🏎️','🧟','🏰','👽','⚽','🎯'].map((e,i)=>`<button class="${i?'':'on'}">${e}</button>`).join('')}</div>
  <div class="chips" style="margin-top:8px"><button class="chip on" id="m1">برابط</button><button class="chip" id="m2">كود HTML</button></div>
  <input id="pu" placeholder="رابط اللعبة (https://...)" dir="ltr"><textarea id="ph" style="display:none;direction:ltr;min-height:160px" placeholder="ألصق كود HTML كامل للعبة (حتى 200 ألف حرف)"></textarea>
  <button class="btn gold" id="pb" style="width:100%;margin-top:8px">نشر 🚀</button><div class="meta" style="margin-top:8px">اللعبة بتشتغل داخل إطار معزول. ما تنشرش حاجة مش بتاعتك.</div></div>`;
  let mode=1,emo='🎮';document.querySelectorAll('#pe button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#pe button').forEach(x=>x.classList.remove('on'));b.classList.add('on');emo=b.textContent});
  $('#m1').onclick=()=>{mode=1;$('#pu').style.display='';$('#ph').style.display='none';$('#m1').classList.add('on');$('#m2').classList.remove('on')};
  $('#m2').onclick=()=>{mode=2;$('#pu').style.display='none';$('#ph').style.display='';$('#m2').classList.add('on');$('#m1').classList.remove('on')};
  $('#pb').onclick=async()=>{const title=$('#pt').value.trim(),desc=$('#pd').value.trim();if(title.length<2){toast('اكتب اسم اللعبة');return}
    const o={title,desc:desc||'لعبة من '+me.name,cat:$('#pc').value,emo,author:me.id,authorName:me.name,ts:Date.now()};
    if(mode===1){const u=$('#pu').value.trim();if(!/^https:\/\/[^\s]+$/.test(u)){toast('الرابط لازم يبدأ بـ https://');return}o.url=u}
    else{const h=$('#ph').value;if(h.length<30||h.length>200000){toast('الكود قصير جداً أو أكبر من 200 ألف حرف');return}o.html=h}
    const k=await dbPush('games',o);toast('اتنشرت لعبتك 🎉');go({t:'game',id:k})}};
V.chal=()=>{if(!me){app.innerHTML='<div class="empty">سجّل دخول عشان تشوف التحديات</div><button class="btn" id="lg">دخول</button>';$('#lg').onclick=()=>go({t:'me'});return}
  const all=vals(DB.challenges).sort((a,b)=>b.ts-a.ts);const inc=all.filter(c=>c.to===me.id),out=all.filter(c=>c.from===me.id);
  const row=(c,mine)=>`<div class="box"><b>${mine?'⚔️ '+esc(userName(c.to)):'⚔️ '+esc(c.fromName)}</b> · ${esc(c.gtitle)}<div class="meta">اكسر ${c.score}${c.note?' · "'+esc(c.note)+'"':''}</div><div class="meta">${c.done?(c.winner===me.id?'✅ كسبت':'✅ اتحل'):'⏳ مفتوح'}</div><button class="btn sm gold" data-pg="${esc(c.gid)}" data-ck="${c._k}">العب</button></div>`;
  app.innerHTML=`<h2>⚔️ تحديات وصلتلك (${inc.length})</h2>${inc.map(c=>row(c,0)).join('')||'<div class="empty">مفيش تحديات. روح لوحة متصدرين وتحدّى حد!</div>'}<h2>أرسلتها (${out.length})</h2>${out.map(c=>row(c,1)).join('')||'<div class="empty">لسه ما تحدّيتش حد</div>'}`;
  document.querySelectorAll('[data-pg]').forEach(b=>b.onclick=async()=>{await dbSet(`seen/${me.id}/${b.dataset.ck}`,true);go({t:'game',id:b.dataset.pg,autoplay:1})})};
V.me=()=>{if(!me){let av=AVS[0];app.innerHTML=`<h2>👤 إنشاء حساب</h2><div class="box"><input id="nm" placeholder="اسمك" maxlength="20"><div class="avs" id="av">${AVS.map((e,i)=>`<button class="${i?'':'on'}">${e}</button>`).join('')}</div><button class="btn gold" id="go" style="width:100%;margin-top:10px">ابدأ</button></div>`;
    document.querySelectorAll('#av button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#av button').forEach(x=>x.classList.remove('on'));b.classList.add('on');av=b.textContent});
    $('#go').onclick=async()=>{const n=$('#nm').value.trim();if(n.length<2){toast('اكتب اسمك');return}me={id:await myUid(),name:n,avatar:av};localStorage.setItem('playhub_me',JSON.stringify(me));await dbSet('users/'+me.id,{name:me.name,avatar:me.avatar,ts:Date.now()});go({t:'home'})};return}
  const my=allGames().filter(g=>g.author===me.id);const fol=Object.keys((DB.follows||{})[me.id]||{});
  app.innerHTML=`<div class="box" style="text-align:center"><div class="av" style="width:70px;height:70px;font-size:38px">${esc(me.avatar)}</div><h2>${esc(me.name)}</h2><div class="meta" style="justify-content:center">المستوى ${lvlOf(xpOf(me.id))} · ${xpOf(me.id)} XP</div><div class="meta" style="justify-content:center;margin:4px 0">${badges(me.id).map(b=>`<span class="badge">${b}</span>`).join(' ')||'<span>العب وانشر لتكسب شارات</span>'}</div><div class="meta" style="justify-content:center">${followers(me.id)} متابع · ${fol.length} يتابع · ${my.length} لعبة</div></div>
  <h2>ألعابي</h2><div class="grid">${my.map(card).join('')||'<div class="empty">لسه ما نشرتش. جرّب تبويب "انشر"</div>'}</div>
  <h2>أفضل نتائجي</h2><div class="box">${Object.keys(DB.scores||{}).filter(g=>DB.scores[g][me.id]).map(g=>`<div class="lb"><span style="flex:1">${esc((allGames().find(x=>x.id===g)||{}).title||g)}</span><b>${DB.scores[g][me.id].score}</b></div>`).join('')||'<div class="empty">لا نتائج</div>'}</div>
  <button class="btn ghost" id="lo">تسجيل خروج</button>`;bindCards();$('#lo').onclick=()=>{if(confirm('تسجيل خروج؟')){localStorage.removeItem('playhub_me');me=null;go({t:'home'})}}};
V.user=()=>{const u=view.id;const gs=allGames().filter(g=>g.author===u);
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><div class="box" style="text-align:center"><div class="av" style="width:70px;height:70px;font-size:38px">${esc(userAv(u))}</div><h2>${esc(userName(u))}</h2><div class="meta" style="justify-content:center">المستوى ${lvlOf(xpOf(u))}</div><div class="meta" style="justify-content:center;margin:4px 0">${badges(u).map(b=>`<span class="badge">${b}</span>`).join(' ')}</div><div class="meta" style="justify-content:center">${followers(u)} متابع · ${gs.length} لعبة</div>${me&&me.id!==u?`<button class="btn ${isFollowing(u)?'ghost':'gold'}" id="fl" style="margin-top:8px">${isFollowing(u)?'إلغاء المتابعة':'+ متابعة'}</button>`:''}</div><div class="grid">${gs.map(card).join('')}</div>`;
  $('#bk').onclick=()=>go({t:'home'});const f=$('#fl');if(f)f.onclick=async()=>{await dbSet(`follows/${me.id}/${u}`,isFollowing(u)?null:true);V.user()};bindCards()};

/* games can report scores: parent.postMessage({type:'playhub-score',score:123},'*') */
addEventListener('message',e=>{const d=e.data;if(d&&d.type==='playhub-score'&&view.t==='game'){const g=allGames().find(x=>x.id===view.id);if(g)submitScore(g,+d.score)}});

(async()=>{const p=new URLSearchParams(location.search);if(p.get('g'))view={t:'game',id:p.get('g')};render();
  if(ONLINE){await dbSync();render();setInterval(async()=>{const a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return;if(await dbSync())render()},10000)}})();
