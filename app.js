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
['bill-split-ar','قسّم الحساب','قسّم فاتورة الأكل بين الأصحاب بسهولة.','أخرى','🧾'],
['focus-timer-app','تركيز','مؤقت تركيز بطريقة بومودورو.','أخرى','⏱️'],
['habits-tracker-app','عاداتي','تابع عاداتك اليومية.','أخرى','✅'],
['tasbeeh-app-ar','المسبحة','مسبحة إلكترونية.','أخرى','📿'],
['js-flashcards-ar','بطاقات جافاسكريبت','راجع JavaScript ببطاقات.','تحدي','🃏'],
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
async function dbSync(){if(!ONLINE||PEND)return;try{const r=await fetch(await furl(''));if(!r.ok||PEND)return;const j=await r.json();if(PEND)return;DB=(j&&typeof j==='object')?j:{};splitD();saveLocal();return true}catch(e){}}
function splitD(){if(!DB.scores)return;DB.dscores={};for(const k of Object.keys(DB.scores))if(/_d\d+$/.test(k)){DB.dscores[k]=DB.scores[k];delete DB.scores[k]}}
loadLocal();splitD();

/* ---------- state ---------- */
if(localStorage.getItem('playhub_theme')==='light')document.body.classList.add('light');
let me=JSON.parse(localStorage.getItem('playhub_me')||'null');
let view={t:'home'},cat='الكل',q='';
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
const vals=o=>o?Object.entries(o).map(([k,v])=>({...v,_k:k})):[];
const BUILTIN=(window.__B||[]).concat(window.__B2||[]).concat(window.__B3||[]).filter((g,i,a)=>a.findIndex(x=>x.id===g.id)===i);SEED.push(...BUILTIN);
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
  if(gs>=1)b.push('🛠️ صانع');if(gs>=3)b.push('🏭 منتج');if(sc>=1)b.push('🎯 لاعب');if(sc>=5)b.push('🔥 محترف');if(top>=1)b.push('👑 بطل لعبة');if(followers(u)>=3)b.push('⭐ مشهور');if(champ()===u)b.push('👑 بطل الأسبوع');if(tchamp()===u)b.push('🏅 بطل البطولة');return b.concat(extraBadges(u))}
function activity(){const a=[];for(const g of vals(DB.games))a.push({ts:g.ts,t:`🆕 ${esc(userName(g.author))} نشر <b>${esc(g.title)}</b>`,g:g._k});
  for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];const g=allGames().find(x=>x.id===gid);if(g)a.push({ts:e.ts||0,t:`🏆 ${esc(e.name)} سجّل ${e.score} في <b>${esc(g.title)}</b>`,g:gid})}
  for(const gid in DB.comments||{})for(const c of vals(DB.comments[gid])){const g=allGames().find(x=>x.id===gid);if(g)a.push({ts:c.ts,t:`💬 ${esc(c.name)} علّق على <b>${esc(g.title)}</b>`,g:gid})}
  return a.sort((x,y)=>y.ts-x.ts).slice(0,8)}
function trending(g){const r=ratingOf(g.id);return playsOf(g.id)*1+r.avg*r.n*3+(g.seed?0:5)+(Date.now()-g.ts<864e5*3?4:0)}

/* ---------- cards ---------- */
function cover(g,c){let h=0;for(const ch of g.id+g.title)h=(h*31+ch.charCodeAt(0))>>>0;const a=h%360,b=(a+60)%360;
  return `radial-gradient(circle at ${h%90}% ${(h>>3)%80}%,hsla(${a},80%,60%,.55),transparent 45%),radial-gradient(circle at ${(h>>5)%100}% 90%,hsla(${b},80%,55%,.5),transparent 50%),linear-gradient(135deg,${c},#0f1226)`}
function myBestTag(id){try{const m=(DB.scores||{})[id]||{},u=me&&me.id,e=u&&m[u];if(!e)return'';let rk=1;for(const k in m)if(k!==u&&m[k]&&m[k].score>e.score)rk++;return `<span class="mybest" style="color:#ffd24a">🏅 ${e.score} · #${rk}</span>`}catch(x){return''}}
function card(g){g.title=g.title||'بدون اسم';g.cat=g.cat||'أخرى';g.desc=g.desc||'';const r=ratingOf(g.id);const c=COL[(g.title.length+g.cat.length)%COL.length];
  return `<div class="card" data-g="${esc(g.id)}"><div class="thumb" style="background:${g.img?`url('${esc(g.img)}') center/cover`:cover(g,c)}">${g.img?'':`<span style="text-shadow:0 4px 14px #000a">${esc(g.emo||'🎮')}</span>`}</div><div class="cb"><h3>${esc(g.title)}</h3>
  <div class="meta"><span class="star">${r.n?stars(r.avg):'☆☆☆☆☆'}</span><span>${r.n?r.avg.toFixed(1)+' ('+r.n+')':'جديد'}</span><span>▶ ${playsOf(g.id)}</span>${myBestTag(g.id)}</div>
  <div class="meta">${esc(g.cat)} · ${esc(userName(g.author))}</div>${g.tags?`<div class="meta">${String(g.tags).split(',').slice(0,3).map(t=>'#'+esc(t.trim())).join(' ')}</div>`:''}</div></div>`}
function bindCards(){document.querySelectorAll('[data-g]').forEach(e=>e.onclick=()=>go({t:'game',id:e.dataset.g}));
  document.querySelectorAll('[data-u]').forEach(e=>e.onclick=()=>go({t:'user',id:e.dataset.u}))}

/* ---------- views ---------- */
function myInbox(){if(!me)return[];return vals(DB.challenges).filter(c=>c.to===me.id||(!c.to&&c.from!==me.id&&false)).filter(c=>!((DB.seen||{})[me.id]||{})[c._k])}
function renderNav(){const items=[['home','🏠','الرئيسية'],['explore','🔍','اكتشف'],['publish','➕','انشر'],['chal','⚔️','تحديات'],['me','👤','ملفي']];
  const n=myInbox().length;$('#nav').innerHTML=items.map(([k,i,l])=>`<button data-n="${k}" class="${view.t===k?'on':''}"><b>${i}</b>${l}${k==='chal'&&n?`<span class="dot">${n}</span>`:''}</button>`).join('');
  $('#nav').querySelectorAll('button').forEach(b=>b.onclick=()=>go({t:b.dataset.n}));
  $('#mode').textContent=ONLINE?'● أونلاين':'● محلي';$('#mode').className='badge'+(ONLINE?' on':'');
  bell();$('#meBtn').textContent=me?me.avatar+' '+me.name:'سجّل دخول';$('#meBtn').onclick=()=>go({t:'me'});let tb=$('#thm');if(!tb){tb=document.createElement('button');tb.id='thm';tb.className='btn sm ghost';$('header').insertBefore(tb,$('#meBtn'));tb.onclick=()=>{document.body.classList.toggle('light');localStorage.setItem('playhub_theme',document.body.classList.contains('light')?'light':'dark');renderNav()}}tb.textContent=document.body.classList.contains('light')?'🌙':'☀️'}
function go(v){sfx('tap');view=v;scrollTo(0,0);render()}
function render(){renderNav();(V[view.t]||V.home)();try{lvlWatch()}catch(e){}try{newBadges()}catch(e){}}
const V={};
V.home=()=>{const g=allGames();const top=[...g].sort((a,b)=>trending(b)-trending(a)).slice(0,8);
  const fresh=[...g].filter(x=>!x.seed).sort((a,b)=>b.ts-a.ts).slice(0,8);
  const best=[...g].filter(x=>ratingOf(x.id).n).sort((a,b)=>ratingOf(b.id).avg-ratingOf(a.id).avg).slice(0,8);
  const fol=me?g.filter(x=>isFollowing(x.author)):[];
  const day=Math.floor(Date.now()/864e5),god=g[day%g.length],act=activity();
  const nUsers=Object.keys(DB.users||{}).length,nPlays=g.reduce((a,x)=>a+playsOf(x.id),0);
  app.innerHTML=`<div class="box dk" style="background:linear-gradient(135deg,#3a2a7a,#7a2a4a)"><h2 style="margin:0">أهلاً ${me?esc(me.name):'بيك في ملعب'} 👋</h2><div class="meta" style="margin-top:6px">العب، قيّم، تابع صنّاع الألعاب، وتحدَّ أصحابك. وانشر لعبتك بنفسك.</div>
  <div class="meta" style="margin-top:10px;font-size:13px"><span>🎮 ${g.length} لعبة</span><span>👥 ${nUsers} لاعب</span><span>▶ ${nPlays} لعبة اتلعبت</span></div></div>
  ${heroCar()}
  <div class="box" data-g="${esc(god.id)}" style="cursor:pointer;border:1px solid var(--ac)"><div class="meta" style="color:var(--ac)">⭐ لعبة اليوم</div><h2 style="margin:4px 0">${esc(god.emo||'🎮')} ${esc(god.title)}</h2><div class="meta">${esc(god.desc)}</div></div>
  ${newFromFollowed()}
  ${localStorage.getItem('playhub_tut')?'':`<div class="box" id="tut" style="border:1px dashed var(--ac)"><b>👋 إزاي تستخدم ملعب؟</b><div class="meta" style="display:block;line-height:1.9;margin-top:6px">1) سجّل اسمك من "ملفي".<br>2) افتح أي لعبة واضغط "العب الآن".<br>3) سجّل نتيجتك وتحدّى اللي قدامك في المتصدرين.<br>4) انشر لعبتك من تبويب "انشر" وخلّي الناس تقيّمها.</div><button class="btn sm gold" id="tutx" style="margin-top:8px">تمام، فهمت</button></div>`}
  ${dailyBox()}
  ${dailyCh()}
  ${tourney()}
  ${season()}
  ${spot()}
  <div class="box" data-go="hall" style="cursor:pointer;text-align:center"><b>🏛️ قاعة المشاهير</b><div class="meta" style="justify-content:center">أفضل اللاعبين وأفضل الصنّاع وبطل الأسبوع</div></div>
  <div class="box" data-go="gallery" style="cursor:pointer;text-align:center"><b>🖼️ معرض الألعاب</b><div class="meta" style="justify-content:center">كل الألعاب في رفوف حسب النوع + اختار لي لعبة عشوائي</div></div>
  <h2>🧭 التصنيفات</h2><div class="tiles">${CATS.map(c=>`<div class="tile" data-cat="${c}"><b>${{'أكشن':'💥','تحدي':'🎯','ألغاز':'🧩','سباق':'🏁','استراتيجية':'♟️','عائلي':'👨‍👩‍👧','أخرى':'✨'}[c]}</b>${c}<br><small>${g.filter(x=>x.cat===c).length} لعبة</small></div>`).join('')}</div>
  ${weekly()}
  ${myInbox().length?`<div class="box" id="chb" style="background:#3a1f2a;border:1px solid var(--bad);cursor:pointer"><b>⚔️ عندك ${myInbox().length} تحدي جديد!</b><div class="meta">اضغط لتشوفهم</div></div>`:''}
  ${recentRow()}${newRow()}${pubLists()}
  ${forYou()}
  <h2>🔥 الأكثر رواجاً</h2><div class="row">${top.map(card).join('')}</div>
  ${fol.length?`<h2>👥 من تتابعهم</h2><div class="row">${fol.map(card).join('')}</div>`:''}
  ${fresh.length?`<h2>🆕 جديد من اللاعبين</h2><div class="row">${fresh.map(card).join('')}</div>`:''}
  ${best.length?`<h2>⭐ الأعلى تقييماً</h2><div class="row">${best.map(card).join('')}</div>`:''}
  ${act.length?`<h2>⚡ آخر النشاط</h2><div class="box">${act.map(a=>`<div class="cm" data-g="${esc(a.g)}" style="cursor:pointer">${a.t}</div>`).join('')}</div>`:''}
  <h2>🏆 أفضل اللاعبين</h2><div class="box">${topPlayers().map((p,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(p.u))}</span><b style="flex:1" data-u="${esc(p.u)}">${esc(userName(p.u))}</b><span>${p.pts} نقطة</span></div>`).join('')||'<div class="empty">لسه مفيش نتائج. كن أول واحد يسجّل!</div>'}</div>`;bindCards();carInit();document.querySelectorAll('[data-tg]').forEach(e=>e.onclick=()=>go({t:'game',id:e.dataset.tg}));document.querySelectorAll('[data-go]').forEach(e=>e.onclick=()=>go({t:e.dataset.go}));document.querySelectorAll('[data-cat]').forEach(e=>e.onclick=()=>{cat=e.dataset.cat;go({t:'explore'})});const tx=$('#tutx');if(tx)tx.onclick=()=>{localStorage.setItem('playhub_tut','1');$('#tut').remove()};const cb=$('#chb');if(cb)cb.onclick=()=>go({t:'chal'})};
function newFromFollowed(){if(!me)return '';const last=+localStorage.getItem('playhub_last')||0;const n=allGames().filter(g=>!g.seed&&g.ts>last&&isFollowing(g.author));
  return n.length?`<div class="box" style="border:1px solid var(--ok)"><b>🆕 ${n.length} لعبة جديدة ممن تتابعهم</b>${n.slice(0,3).map(g=>`<div class="cm" data-g="${esc(g.id)}" style="cursor:pointer">${esc(g.emo||'🎮')} ${esc(g.title)} · ${esc(userName(g.author))}</div>`).join('')}</div>`:''}
function season(){const d=new Date(),end=new Date(d);end.setDate(d.getDate()+((7-d.getDay())%7||7));end.setHours(0,0,0,0);const left=Math.max(1,Math.ceil((end-d)/864e5));const wk=Math.ceil((d-new Date(d.getFullYear(),0,1))/6048e5);
  return `<div class="season">🏆 موسم الأسبوع ${wk}<small>باقي ${left} يوم. صاحب أعلى نتيجة هذا الأسبوع بياخد لقب 👑 بطل الأسبوع. العب وسجّل نتيجتك!</small>${champ()?`<small>👑 بطل الأسبوع الحالي: <b>${esc(userName(champ()))}</b></small>`:''}</div>`}
function weekly(){const w=[];const since=Date.now()-6048e5;for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];if(e.ts>=since)w.push({u,name:e.name,score:e.score,gid})}
  const best=w.sort((a,b)=>b.score-a.score).slice(0,5);if(!best.length)return '';
  return `<h2>📅 بطولة الأسبوع</h2><div class="box">${best.map((b,i)=>{const g=allGames().find(x=>x.id===b.gid)||{};return `<div class="lb" data-g="${esc(b.gid)}" style="cursor:pointer"><span class="n">${['🥇','🥈','🥉','4','5'][i]}</span><b style="flex:1">${esc(b.name)}<div class="meta">${esc(g.title||'')}</div></b><span>${b.score}</span></div>`}).join('')}</div>`}
function topPlayers(){const m={};for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const rk=Object.entries(DB.scores[gid]).sort((a,b)=>b[1].score-a[1].score).findIndex(x=>x[0]===u);m[u]=(m[u]||0)+[10,6,3][rk]||0}
  return Object.entries(m).map(([u,pts])=>({u,pts})).filter(x=>x.pts).sort((a,b)=>b.pts-a.pts).slice(0,10)}
V.explore=()=>{const FAV=JSON.parse(localStorage.getItem('playhub_fav')||'[]');const g=allGames().filter(x=>(cat==='الكل'||(cat==='من أتابع'?isFollowing(x.author):cat==='❤️ المفضلة'?FAV.includes(x.id):cat==='✅ لعبت'?playedSet().includes(x.id):cat==='🆕 ما لعبتش'?!playedSet().includes(x.id):cat==='🎮 من ملعب'?String(x.id).startsWith('b_'):cat==='🧠 مستويات'?DEEPIDS.includes(x.id):x.cat===cat))&&(!q||srch(x,q)));
  app.innerHTML=`<input id="sq" placeholder="ابحث عن لعبة أو صانع..." value="${esc(q)}"><div class="chips">${['الكل','🎮 من ملعب','🧠 مستويات','✅ لعبت','🆕 ما لعبتش','من أتابع','❤️ المفضلة',...CATS].map(c=>`<button class="chip ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}</div>
  <div style="display:flex;gap:8px;align-items:center"><select id="so" style="flex:1"><option value="t">الأكثر رواجاً</option><option value="r">الأعلى تقييماً</option><option value="n">الأحدث</option><option value="p">الأكثر لعباً</option></select><button class="btn sm gold" id="rnd">🎲 لعبة عشوائية</button></div><div class="meta" id="cnt" style="margin:6px 0"></div>
  <div class="grid" id="gl"></div>${playersBox()}`;
  $('#so').value=localStorage.getItem('playhub_sort')||'t';$('#rnd').onclick=()=>{if(!g.length){toast('مفيش ألعاب في الفلتر ده');return}const x=g[Math.floor(Math.random()*g.length)];go({t:'game',id:x.id})};
  const fill=()=>{const o=$('#so').value;localStorage.setItem('playhub_sort',o);$('#cnt').textContent=g.length+' لعبة';const l=[...g].sort((a,b)=>o==='p'?playsOf(b.id)-playsOf(a.id):o==='r'?ratingOf(b.id).avg-ratingOf(a.id).avg:o==='n'?b.ts-a.ts:trending(b)-trending(a));$('#gl').innerHTML=l.map(card).join('')||'<div class="empty">مفيش نتائج</div>';bindCards()};
  fill();$('#so').onchange=fill;$('#sq').oninput=e=>{q=e.target.value;const p=e.target.selectionStart;V.explore();const i=$('#sq');i.focus();i.setSelectionRange(p,p)};
  document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{cat=b.dataset.c;V.explore()})};
V.game=()=>{const g=allGames().find(x=>x.id===view.id);if(!g){app.innerHTML='<div class="empty">اللعبة مش موجودة</div>';return}
  const r=ratingOf(g.id),mine=me?((DB.ratings||{})[g.id]||{})[me.id]:0;
  const sc=Object.entries((DB.scores||{})[g.id]||{}).map(([u,v])=>({u,...v})).sort((a,b)=>b.score-a.score);
  const cm=vals((DB.comments||{})[g.id]).sort((a,b)=>b.ts-a.ts);
  const src=g.html?`srcdoc="${esc(g.html)}" sandbox="allow-scripts allow-pointer-lock"`:`src="${esc(g.url)}" allow="fullscreen;autoplay"`;
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2 style="margin:4px 0">${esc(g.emo||'🎮')} ${esc(g.title)}</h2>
  <div class="meta" style="margin-bottom:8px"><span class="star">${r.n?stars(r.avg):''}</span><span>${r.n?r.avg.toFixed(1)+' ('+r.n+' تقييم)':'بدون تقييم'}</span><span>▶ ${playsOf(g.id)} لعبة</span><span>${esc(g.cat)}</span></div>
  ${view.sc&&view.by?`<div class="box dk" style="background:linear-gradient(135deg,#7a2a4a,#3a2a7a)">⚔️ <b>${esc(view.by)}</b> حقق <b>${view.sc}</b> في اللعبة دي. تقدر تكسرها؟</div>`:''}
  ${me&&me.id===g.author&&!g.seed&&Object.keys((DB.reports||{})[g.id]||{}).length?`<div class="box" style="border:1px solid var(--bad)">🚩 لعبتك اتبلّغ عنها ${Object.keys((DB.reports||{})[g.id]).length} مرة. عند 3 بلاغات بتختفي من المنصة تلقائي. راجع المحتوى.</div>`:''}
  <div id="fr"><div class="box" style="text-align:center"><p>${esc(g.desc)}</p>${HOW[g.id]?`<div class="meta" style="display:block;text-align:right;margin:8px 0;line-height:1.8">📖 ${HOW[g.id]}</div>`:''}<button class="btn gold" id="play">▶ العب الآن</button> <button class="btn ghost" id="fs">ملء الشاشة</button></div></div>
  <div class="box"><div class="meta" style="margin-bottom:8px">صانع اللعبة</div><div class="lb" style="border:0"><span class="av">${esc(userAv(g.author))}</span><b style="flex:1" data-u="${esc(g.author)}">${esc(userName(g.author))}</b>${me&&me.id!==g.author?`<button class="btn sm ${isFollowing(g.author)?'ghost':'gold'}" id="fl">${isFollowing(g.author)?'إلغاء المتابعة':'+ متابعة'}</button>`:''}</div><div class="meta">${followers(g.author)} متابع</div></div>
  <div class="box"><b>توزيع التقييمات</b>${[5,4,3,2,1].map(n=>{const all=Object.values((DB.ratings||{})[g.id]||{});const c=all.filter(x=>x===n).length;return `<div class="meta" style="margin:3px 0"><span style="width:28px">${n}★</span><div style="flex:1;background:var(--card2);border-radius:6px;height:8px;min-width:120px"><div style="width:${all.length?c*100/all.length:0}%;background:var(--ac);height:8px;border-radius:6px"></div></div><span>${c}</span></div>`}).join('')}</div>
  <div class="box"><b>قيّم اللعبة</b><div class="stars" id="st">${[1,2,3,4,5].map(i=>`<button data-s="${i}" class="${mine>=i?'on':''}">★</button>`).join('')}</div></div>
  <div class="box"><b>🏆 لوحة المتصدرين</b><div style="display:flex;gap:6px;margin:8px 0"><button class="chip on" data-lbw="0">كل الأوقات</button><button class="chip" data-lbw="1">الأسبوع ده</button></div><div id="lbr">${lbRows(sc)}</div>
  <div style="display:flex;gap:8px;margin-top:10px"><input id="scv" type="number" inputmode="numeric" placeholder="نتيجتك" style="margin:0"><button class="btn" id="scb">سجّل</button></div>
  <div class="meta" style="margin-top:6px">الألعاب الداعمة بتبعت النتيجة تلقائي. غير كده سجّلها بإيدك.</div></div>
  <div class="box"><b>💬 التعليقات (${cm.length})</b><div style="display:flex;gap:8px"><input id="cmt" placeholder="اكتب تعليق..." style="margin:0"><button class="btn" id="cmb">أرسل</button></div>
  ${cm.map(c=>`<div class="cm"><b>${esc(userAv(c.uid))} ${esc(c.name)}</b> <small>${new Date(c.ts).toLocaleDateString('ar-EG')}</small><div>${esc(c.text)}</div></div>`).join('')}</div>
  <h2>🎯 ألعاب مشابهة</h2><div class="row">${allGames().filter(x=>x.cat===g.cat&&x.id!==g.id).slice(0,6).map(card).join('')||'<div class="empty">لا يوجد</div>'}</div>
  <div class="box"><button class="btn ghost" id="scard">📸 كارت نتيجتي</button> <button class="btn ghost" id="sh">🔗 انسخ رابط اللعبة</button> <button class="btn ghost" id="wa">💬 واتساب</button> <button class="btn ghost" id="pl">📚 أضف لقائمة</button> <button class="btn ghost" id="cl">⚔️ تحدي برابط</button> <button class="btn ghost" id="fv">${JSON.parse(localStorage.getItem('playhub_fav')||'[]').includes(g.id)?'💔 شيل من المفضلة':'❤️ أضف للمفضلة'}</button> <button class="btn ghost" id="rp">🚩 إبلاغ</button>${me&&me.id===g.author&&!g.seed?' <button class="btn ghost" id="edg">✏️ تعديل</button> <button class="btn ghost" id="dl" style="color:var(--bad)">🗑️ حذف لعبتي</button>':''}</div>`;
  $('#bk').onclick=()=>history.length>1?go({t:'home'}):go({t:'home'});
  const start=async()=>{$('#fr').innerHTML=`<iframe class="frame" ${src}></iframe>`;qinc('play');markPlayed(g.id);try{let rc=JSON.parse(localStorage.getItem('playhub_recent')||'[]').filter(x=>x!==g.id);rc.unshift(g.id);localStorage.setItem('playhub_recent',JSON.stringify(rc.slice(0,8)))}catch(e){}if(me)await dbSet(`plays/${g.id}/${me.id}`,Date.now())};
  $('#play').onclick=start;$('#fs').onclick=async()=>{await start();$('#fr iframe').requestFullscreen&&$('#fr iframe').requestFullscreen()};
  if(view.autoplay)start();
  document.querySelectorAll('#st [data-s]').forEach(b=>b.onclick=async()=>{if(!need())return;await dbSet(`ratings/${g.id}/${me.id}`,+b.dataset.s);qinc('rate');toast('شكراً على تقييمك ⭐');V.game()});
  $('#scb').onclick=()=>submitScore(g,+$('#scv').value);
  $('#cmb').onclick=async()=>{const t=$('#cmt').value.trim();if(!t||!need())return;await dbPush(`comments/${g.id}`,{uid:me.id,name:me.name,text:t.slice(0,300),ts:Date.now()});qinc('comment');V.game()};
  const f=$('#fl');if(f)f.onclick=async()=>{if(!need())return;await dbSet(`follows/${me.id}/${g.author}`,isFollowing(g.author)?null:true);V.game()};
  document.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>challengeDlg(g,b.dataset.ch,+b.dataset.sc));
  $('#cl').onclick=()=>makeClink(g);$('#pl').onclick=async()=>{const L=lists();const names=Object.keys(L);const n=await askText('📚 أضف لقائمة','اسم القائمة'+(names.length?' (موجودة: '+names.join('، ')+')':''));if(!n||!n.trim())return;const k=n.trim().slice(0,24);L[k]=L[k]||[];if(!L[k].includes(g.id))L[k].push(g.id);saveLists(L);toast('اتضافت لقائمة '+k+' 📚')};$('#wa').onclick=()=>{const mine=me&&((DB.scores||{})[g.id]||{})[me.id];const u=location.href.split('#')[0].split('?')[0]+'?g='+encodeURIComponent(g.id)+(mine?'&sc='+mine.score+'&by='+encodeURIComponent(me.name):'');const t=(mine?'جبت '+mine.score+' في لعبة ':'جرّب لعبة ')+g.title+' على ملعب! تقدر تكسر نتيجتي؟ '+u;window.open('https://wa.me/?text='+encodeURIComponent(t),'_blank')};$('#scard').onclick=()=>{const e=sc.find(x=>me&&x.u===me.id);if(!e){toast('سجّل نتيجة الأول');return}shareCard(g,e.score)};$('#sh').onclick=()=>{const mine=me&&((DB.scores||{})[g.id]||{})[me.id];const u=location.href.split('#')[0].split('?')[0]+'?g='+encodeURIComponent(g.id)+(mine?'&sc='+mine.score+'&by='+encodeURIComponent(me.name):'');const txt=mine?me.name+' جاب '+mine.score+' في '+g.title+'. تقدر تكسر نتيجته؟ '+u:(me?me.name+' بيتحداك ':'')+'تلعب '+g.title+' في ملعب: '+u;if(navigator.share){navigator.share({title:g.title,text:txt,url:u}).catch(()=>{})}else{navigator.clipboard&&navigator.clipboard.writeText(txt);toast('تم نسخ الرابط')}};
  $('#fv').onclick=()=>{let f=JSON.parse(localStorage.getItem('playhub_fav')||'[]');f=f.includes(g.id)?f.filter(x=>x!==g.id):[...f,g.id];localStorage.setItem('playhub_fav',JSON.stringify(f));V.game()};
  $('#rp').onclick=async()=>{if(!need())return;await dbSet(`reports/${g.id}/${me.id}`,Date.now());toast('تم الإبلاغ، شكراً')};
  const edg=$('#edg');if(edg)edg.onclick=async()=>{const t=await askText('✏️ تعديل لعبتك','اسم اللعبة',g.title);if(t===null)return;const d=await askText('✏️ تعديل لعبتك','الوصف',g.desc);if(d===null)return;if(t.trim().length<2){toast('الاسم قصير');return}await dbSet('games/'+g.id+'/title',t.trim().slice(0,40));await dbSet('games/'+g.id+'/desc',d.trim().slice(0,200));toast('اتعدّلت ✅');V.game()};const dl=$('#dl');if(dl)dl.onclick=async()=>{if(confirm('حذف لعبتك نهائياً؟')){await dbSet('games/'+g.id,null);toast('اتحذفت');go({t:'home'})}};
  bindCards()};
function need(){if(me)return true;toast('سجّل دخول الأول');go({t:'me'});return false}
async function submitScore(g,s){if(!need())return;if(!(s>=0)||!isFinite(s)||s>1e9){toast('اكتب نتيجة صحيحة');return}
  try{if(g.id===dgame().id){const dk=dkeyG(g),od=((DB.dscores||{})[dk]||{})[me.id];if(!od||s>od.score){await dbSet(`scores/${dk}/${me.id}`,{name:me.name,score:Math.floor(s),ts:Date.now()});splitD();if(!od)toast('اتحسبت في تحدي اليوم 🌟')}}}catch(e){}
  const old=((DB.scores||{})[g.id]||{})[me.id];if(old&&old.score>=s){toast('نتيجتك الأعلى المسجلة '+old.score);return}
  await dbSet(`scores/${g.id}/${me.id}`,{name:me.name,score:Math.floor(s),ts:Date.now()});toast('اتسجلت نتيجتك 🏆');try{cloudAfterScore(g,Math.floor(s))}catch(e){}confetti();window.LASTSC={g,s:Math.floor(s)};qinc('score');
  const beat=vals(DB.challenges).filter(c=>c.gid===g.id&&c.to===me.id&&!c.done&&s>c.score);
  for(const c of beat){await dbSet(`challenges/${c._k}/done`,true);await dbSet(`challenges/${c._k}/winner`,me.id);toast('كسبت تحدي '+c.fromName+' ⚔️')}
  V.game();try{newBadges()}catch(e){}}
async function challengeDlg(g,to,score){const note=await askText('⚔️ تحدّى '+userName(to),'يكسر '+Math.max(score,0)+' في '+g.title+'؟ اكتب رسالة (اختياري)');if(note===null)return;
  dbPush('challenges',{from:me.id,fromName:me.name,to,gid:g.id,gtitle:g.title,score,note:(note||'').slice(0,100),ts:Date.now()}).then(()=>toast('اتبعت التحدي ⚔️'))}
V.publish=()=>{if(!me){app.innerHTML='<div class="empty">سجّل دخول الأول عشان تنشر</div><button class="btn" id="lg">دخول</button>';$('#lg').onclick=()=>go({t:'me'});return}
  app.innerHTML=`<h2>➕ انشر لعبتك</h2><div class="box"><input id="pt" placeholder="اسم اللعبة" maxlength="40"><textarea id="pd" placeholder="وصف قصير" maxlength="200"></textarea>
  <input id="ptg" placeholder="وسوم مفصولة بفاصلة (مثال: سريع, تحدي)" maxlength="60">
  <select id="pc">${CATS.map(c=>`<option>${c}</option>`).join('')}</select>
  <label class="meta" style="display:block;margin:6px 0">صورة غلاف (اختياري)</label><input id="pimg" type="file" accept="image/*"><div class="avs" id="pe">${['🎮','🚀','⚔️','🧩','🏎️','🧟','🏰','👽','⚽','🎯'].map((e,i)=>`<button class="${i?'':'on'}">${e}</button>`).join('')}</div>
  <div class="chips" style="margin-top:8px"><button class="chip on" id="m1">برابط</button><button class="chip" id="m2">كود HTML</button></div>
  <input id="pu" placeholder="رابط اللعبة (https://...)" dir="ltr"><textarea id="ph" style="display:none;direction:ltr;min-height:160px" placeholder="ألصق كود HTML كامل للعبة (حتى 200 ألف حرف)"></textarea>
  <button class="btn gold" id="pb" style="width:100%;margin-top:8px">نشر 🚀</button><button class="btn ghost" id="pq" style="width:100%;margin-top:8px">🧪 اعمل اختبار بدون كود</button><div class="meta" style="margin-top:8px">اللعبة بتشتغل داخل إطار معزول. ما تنشرش حاجة مش بتاعتك.</div></div>
  <div class="box"><b>🧩 خلّي لعبتك تبعت النتيجة تلقائي</b><div class="meta" style="margin:6px 0">حط السطر ده في لعبتك لما اللعبة تخلص:</div><textarea readonly dir="ltr" style="min-height:50px">parent.postMessage({type:'playhub-score',score:123},'*')</textarea><button class="btn sm ghost" id="cps">نسخ الكود</button></div>`;
  $('#pq').onclick=()=>go({t:'quiz'});
  $('#cps').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText("parent.postMessage({type:'playhub-score',score:123},'*')");toast('تم النسخ')};
  let mode=1,emo='🎮',COVER='';$('#pimg').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=320;c.height=180;const x=c.getContext('2d');const r=Math.max(320/im.width,180/im.height);x.drawImage(im,(320-im.width*r)/2,(180-im.height*r)/2,im.width*r,im.height*r);COVER=c.toDataURL('image/jpeg',.6);toast('تم تجهيز الغلاف')};im.src=URL.createObjectURL(f)};document.querySelectorAll('#pe button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#pe button').forEach(x=>x.classList.remove('on'));b.classList.add('on');emo=b.textContent});
  $('#m1').onclick=()=>{mode=1;$('#pu').style.display='';$('#ph').style.display='none';$('#m1').classList.add('on');$('#m2').classList.remove('on')};
  $('#m2').onclick=()=>{mode=2;$('#pu').style.display='none';$('#ph').style.display='';$('#m2').classList.add('on');$('#m1').classList.remove('on')};
  $('#pb').onclick=async()=>{const title=$('#pt').value.trim(),desc=$('#pd').value.trim();if(title.length<2){toast('اكتب اسم اللعبة');return}
    const o={title,desc:desc||'لعبة من '+me.name,cat:$('#pc').value,emo,author:me.id,authorName:me.name,ts:Date.now()};const tg=$('#ptg').value.trim();if(tg)o.tags=tg.slice(0,60);if(COVER)o.img=COVER;
    if(mode===1){const u=$('#pu').value.trim();if(!/^https:\/\/[^\s]+$/.test(u)){toast('الرابط لازم يبدأ بـ https://');return}o.url=u}
    else{const h=$('#ph').value;if(h.length<30||h.length>200000){toast('الكود قصير جداً أو أكبر من 200 ألف حرف');return}o.html=h}
    const k=await dbPush('games',o);toast('اتنشرت لعبتك 🎉');go({t:'game',id:k})}};
V.chal=()=>{if(!me){app.innerHTML='<div class="empty">سجّل دخول عشان تشوف التحديات</div><button class="btn" id="lg">دخول</button>';$('#lg').onclick=()=>go({t:'me'});return}
  const all=vals(DB.challenges).sort((a,b)=>b.ts-a.ts);const inc=all.filter(c=>c.to===me.id),out=all.filter(c=>c.from===me.id);
  const row=(c,mine)=>`<div class="box"><b>${mine?'⚔️ '+esc(userName(c.to)):'⚔️ '+esc(c.fromName)}</b> · ${esc(c.gtitle)}<div class="meta">اكسر ${c.score}${c.note?' · "'+esc(c.note)+'"':''}</div><div class="meta">${c.done?(c.winner===me.id?'✅ كسبت':'✅ اتحل'):'⏳ مفتوح'}</div><button class="btn sm gold" data-pg="${esc(c.gid)}" data-ck="${c._k}">العب</button></div>`;
  app.innerHTML=`${rivalsBox()}<h2>⚔️ تحديات وصلتلك (${inc.length})</h2>${inc.map(c=>row(c,0)).join('')||'<div class="empty">مفيش تحديات. روح لوحة متصدرين وتحدّى حد!</div>'}<h2>أرسلتها (${out.length})</h2>${out.map(c=>row(c,1)).join('')||'<div class="empty">لسه ما تحدّيتش حد</div>'}`;
  document.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>go({t:'game',id:b.dataset.rv,autoplay:1}));
  document.querySelectorAll('[data-pg]').forEach(b=>b.onclick=async()=>{await dbSet(`seen/${me.id}/${b.dataset.ck}`,true);go({t:'game',id:b.dataset.pg,autoplay:1})})};
V.me=()=>{if(!me){let av=AVS[0];app.innerHTML=`<h2>👤 إنشاء حساب</h2><div class="box"><input id="nm" placeholder="اسمك" maxlength="20"><div class="avs" id="av">${AVS.map((e,i)=>`<button class="${i?'':'on'}">${e}</button>`).join('')}</div><button class="btn gold" id="go" style="width:100%;margin-top:10px">ابدأ</button></div><button class="btn ghost" id="rst" style="width:100%">📥 عندي حساب؟ استعيده بكود النقل</button>`;
    $('#rst').onclick=async()=>{const c=((await askText('📥 استعادة الحساب','الصق كود النقل','',4000))||'').trim();if(!c)return;try{if(c.slice(0,4)!=='PH1-')throw 0;const j=JSON.parse(decodeURIComponent(escape(atob(c.slice(4)))));if(!j.r||!j.u||!j.m||!j.m.name)throw 0;localStorage.setItem('playhub_rt',j.r);localStorage.setItem('playhub_uid',j.u);localStorage.setItem('playhub_me',JSON.stringify(j.m));toast('✅ اتسترجع حسابك');setTimeout(()=>location.reload(),600)}catch(e){toast('الكود مش صحيح')}};
    document.querySelectorAll('#av button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#av button').forEach(x=>x.classList.remove('on'));b.classList.add('on');av=b.textContent});
    $('#go').onclick=async()=>{const n=$('#nm').value.trim();if(n.length<2){toast('اكتب اسمك');return}me={id:await myUid(),name:n,avatar:av};localStorage.setItem('playhub_me',JSON.stringify(me));await dbSet('users/'+me.id,{name:me.name,avatar:me.avatar,ts:Date.now()});go({t:'home'})};return}
  const my=allGames().filter(g=>g.author===me.id);const fol=Object.keys((DB.follows||{})[me.id]||{});
  app.innerHTML=`<div class="box" style="text-align:center"><div class="av" style="width:70px;height:70px;font-size:38px">${esc(me.avatar)}</div><h2>${esc(me.name)}</h2><div class="meta" style="justify-content:center">المستوى ${lvlOf(xpOf(me.id))} · ${lvlName(lvlOf(xpOf(me.id)))} · ${xpOf(me.id)} XP</div>${xpBar(me.id)}<div class="meta" style="justify-content:center;margin:4px 0">${badges(me.id).map(b=>`<span class="badge">${b}</span>`).join(' ')||'<span>العب وانشر لتكسب شارات</span>'}</div><div class="meta" style="justify-content:center">${followers(me.id)} متابع · ${fol.length} يتابع · ${my.length} لعبة</div></div>
  ${recapBox()}${themePicker()}${soundBox()}${badgeCatalog(me.id)}${creatorStats(me.id)}<h2>ألعابي</h2><div class="grid">${my.map(card).join('')||'<div class="empty">لسه ما نشرتش. جرّب تبويب "انشر"</div>'}</div>
  <h2>أفضل نتائجي</h2><div class="box">${Object.keys(DB.scores||{}).filter(g=>DB.scores[g][me.id]).map(g=>`<div class="lb"><span style="flex:1">${esc((allGames().find(x=>x.id===g)||{}).title||g)}</span><span class="meta">#${Object.values(DB.scores[g]).filter(v=>v.score>DB.scores[g][me.id].score).length+1} من ${Object.keys(DB.scores[g]).length}</span> <b>${DB.scores[g][me.id].score}</b></div>`).join('')||'<div class="empty">لا نتائج</div>'}</div>
  <button class="btn ghost" id="pcard">📸 كارت بروفايلي</button> <button class="btn ghost" id="ed">✏️ تعديل الاسم والصورة</button> <button class="btn ghost" id="bk1">🔑 كود النقل لجهاز تاني</button> <button class="btn ghost" id="lo">تسجيل خروج</button>`;
  $('#pcard').onclick=()=>profileCard();
  const rb=$('#rcap');if(rb)rb.onclick=()=>recapCard();
  $('#bk1').onclick=async()=>{const rt=localStorage.getItem('playhub_rt'),u=localStorage.getItem('playhub_uid');if(!rt||!u){toast('الكود متاح بعد الاتصال أونلاين');return}const code='PH1-'+btoa(unescape(encodeURIComponent(JSON.stringify({r:rt,u:u,m:me}))));try{await navigator.clipboard.writeText(code);toast('📋 اتنسخ الكود. ما تشاركوش مع حد! أي حد معاه الكود يقدر يدخل بحسابك')}catch(e){await askText('🔑 كود النقل (سرّي!)','انسخه واحفظه',code,4000)}};
  $('#ed').onclick=async()=>{const n=await askText('👤 تعديل الملف','الاسم الجديد',me.name);if(!n||n.trim().length<2)return;const a=(await askText('👤 تعديل الملف','إيموجي الصورة',me.avatar))||me.avatar;me.name=n.trim().slice(0,20);me.avatar=[...a][0]||me.avatar;localStorage.setItem('playhub_me',JSON.stringify(me));await dbSet('users/'+me.id,{name:me.name,avatar:me.avatar,ts:Date.now()});toast('تم التحديث');renderNav();V.me()};bindCards();$('#lo').onclick=()=>{if(confirm('تسجيل خروج؟')){localStorage.removeItem('playhub_me');me=null;go({t:'home'})}}};
V.user=()=>{const u=view.id;const gs=allGames().filter(g=>g.author===u);
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><div class="box" style="text-align:center"><div class="av" style="width:70px;height:70px;font-size:38px">${esc(userAv(u))}</div><h2>${esc(userName(u))}</h2><div class="meta" style="justify-content:center">المستوى ${lvlOf(xpOf(u))} · ${lvlName(lvlOf(xpOf(u)))} · ${xpOf(u)} XP</div>${xpBar(u)}<div class="meta" style="justify-content:center;margin:4px 0">${badges(u).map(b=>`<span class="badge">${b}</span>`).join(' ')}</div><div class="meta" style="justify-content:center">${followers(u)} متابع · ${gs.length} لعبة</div>${me&&me.id!==u?`<button class="btn ${isFollowing(u)?'ghost':'gold'}" id="fl" style="margin-top:8px">${isFollowing(u)?'إلغاء المتابعة':'+ متابعة'}</button>`:''}</div>${playerExtras(u)}<h2>🎮 ألعابه</h2><div class="grid">${gs.map(card).join('')||'<div class="empty">لسه ما نشرش ألعاب</div>'}</div>`;
  $('#bk').onclick=()=>go({t:'home'});const f=$('#fl');if(f)f.onclick=async()=>{await dbSet(`follows/${me.id}/${u}`,isFollowing(u)?null:true);V.user()};bindCards()};

let DEFER=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();DEFER=e;const b=document.createElement('button');b.className='btn sm gold';b.textContent='📲';b.title='ثبّت التطبيق';b.onclick=()=>{DEFER.prompt();b.remove()};$('header').appendChild(b)});
/* games can report scores: parent.postMessage({type:'playhub-score',score:123},'*') */
addEventListener('message',e=>{const d=e.data;if(d&&d.type==='playhub-score'&&view.t==='game'){const g=allGames().find(x=>x.id===view.id);if(g)submitScore(g,+d.score)}});

addEventListener('pagehide',()=>localStorage.setItem('playhub_last',Date.now()));
/* ---------- round 13: weekly tournament on a built-in game ---------- */
const DEEPIDS=['b_mancala','b_coins','b_peg','b_split','b_laser','b_untangle','b_chain','b_knight','b_jam','b_sudoku','b_gomoku','b_flood','b_dots','b_kiosk','b_queens','b_hanoi','b_water','b_code','b_nim','b_nono','b_binary','b_tower','b_reversi','b_sokoban','b_ice','b_hunt','b_pipes','b_simon','b_digits','b_grid','b_count','b_tones','b_lights'];
const TPOOL=["b_simon","b_bubbles","b_math","b_snake","b_2048","b_ttt","b_flap","b_cards","b_words","b_race","b_mole","b_schulte","b_stack","b_cps","b_stroop","b_mines","b_digits","b_aim","b_cmp","b_dodge","b_odd","b_scramble","b_grid","b_duel","b_count","b_pong","b_sum","b_jump","b_typing","b_rps","b_flip","b_colortap","b_fall","b_tones","b_catch","b_hilo","b_lights","b_puzzle","b_guess","b_connect","b_trivia","b_maze","b_flags","b_pattern","b_stopwatch","b_arrows","b_times","b_evenodd","b_oddemoji","b_reverse","b_tiles"];
function tgame(){const wk=Math.floor(Date.now()/6048e5);const id=TPOOL[wk%TPOOL.length];return BUILTIN.find(g=>g.id===id)||BUILTIN[0]}
function tboard(){const g=tgame(),since=Date.now()-6048e5;return Object.entries((DB.scores||{})[g.id]||{}).map(([u,e])=>({u,...e})).filter(e=>e.ts>=since).sort((a,b)=>b.score-a.score)}
function tchamp(){const b=tboard();return b.length?b[0].u:null}
function tourney(){const g=tgame(),b=tboard().slice(0,3);const end=new Date();end.setDate(end.getDate()+((7-end.getDay())%7||7));end.setHours(0,0,0,0);const h=Math.max(1,Math.ceil((end-Date.now())/36e5));
  return `<div class="box dk" style="background:linear-gradient(135deg,#0f4c5c,#5f0f40);border:1px solid #ffd24a"><div class="meta" style="color:#ffd24a">🏁 بطولة الأسبوع · باقي ${h>48?Math.ceil(h/24)+' يوم':h+' ساعة'}</div>
  <h2 style="margin:6px 0">${esc(g.emo)} ${esc(g.title)}</h2><div class="meta">الجوايز: 🥇 لقب 🏅 بطل البطولة على بروفايلك · 🥈🥉 شرف المركز</div>
  ${b.map((e,i)=>`<div class="lb"><span class="n">${['🥇','🥈','🥉'][i]}</span><span class="av">${esc(userAv(e.u))}</span><b style="flex:1">${esc(e.name)}</b><span>${e.score}</span></div>`).join('')||'<div class="meta">لسه مفيش مشاركين. كن أول واحد!</div>'}
  <button class="btn gold" data-tg="${esc(g.id)}" style="margin-top:8px;width:100%">▶ شارك في البطولة</button></div>`}

/* ---------- round 20: daily challenge ---------- */
const TZ2=72e5;function dayIdx(){return Math.floor((Date.now()+TZ2)/864e5)}
function dgame(){const d=dayIdx();let id=TPOOL[(d*7+3)%TPOOL.length];const w=tgame().id;if(id===w)id=TPOOL[(d*7+4)%TPOOL.length];return BUILTIN.find(g=>g.id===id)||BUILTIN[0]}
function dkeyG(g){return g.id+'_d'+dayIdx()}
function dboard(){const g=dgame(),since=dayIdx()*864e5-TZ2;return Object.entries((DB.dscores||{})[dkeyG(g)]||{}).map(([u,e])=>({u,...e})).filter(e=>e.ts>=since).sort((x,y)=>y.score-x.score)}
function dailyCh(){const g=dgame(),b=dboard(),h=Math.max(1,Math.ceil(((dayIdx()+1)*864e5-TZ2-Date.now())/36e5));const mine=me?b.findIndex(e=>e.u===me.id):-1;
  return `<div class="box dk" style="background:linear-gradient(135deg,#1b3a4b,#3a1f5c);border:1px solid #7cf0c9"><div class="meta" style="color:#7cf0c9">🌟 تحدي اليوم · بيتغير كل يوم · باقي ${h} ساعة</div>
  <h2 style="margin:6px 0">${esc(g.emo)} ${esc(g.title)}</h2>
  ${b.slice(0,5).map((e,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(e.u))}</span><b style="flex:1">${esc(e.name)}</b><span>${e.score}</span></div>`).join('')||'<div class="meta">لسه محدش لعب النهارده. كن أول واحد!</div>'}
  ${mine>=5?`<div class="meta" style="margin-top:6px">ترتيبك النهارده: ${mine+1} من ${b.length}</div>`:''}
  <button class="btn" data-tg="${esc(g.id)}" style="margin-top:8px;width:100%">▶ العب تحدي اليوم</button></div>`}

/* ---------- round 21: level bar + level-up ---------- */
function lvlName(l){return l<3?'🌱 مبتدئ':l<6?'🎮 لاعب':l<10?'🔥 محترف':l<15?'💎 خبير':'👑 أسطورة'}
function xpBar(u){const x=xpOf(u),l=lvlOf(x),lo=15*(l-1)*(l-1),hi=15*l*l,p=Math.max(2,Math.min(100,Math.round((x-lo)/(hi-lo)*100)));return `<div style="margin:6px auto;max-width:260px"><div style="height:10px;border-radius:6px;background:#0b0d1f;overflow:hidden"><div style="width:${p}%;height:100%;background:linear-gradient(90deg,#7c5cff,#ffd24a)"></div></div><div class="meta" style="justify-content:center;margin-top:3px">باقي ${hi-x} XP للمستوى ${l+1}</div></div>`}
function lvlWatch(){if(!me)return;const l=lvlOf(xpOf(me.id)),k='playhub_lvl_'+me.id,prev=+localStorage.getItem(k)||0;if(prev&&l>prev){toast('⬆️ وصلت المستوى '+l+' · '+lvlName(l));try{confetti()}catch(e){}}if(l!==prev)localStorage.setItem(k,l)}

/* ---------- round 22: rivals record ---------- */
function rivalsRec(){const R={};if(!me)return[];for(const c of vals(DB.challenges)){if(!c.done||!c.winner)continue;let o=null;if(c.to===me.id)o=c.from;else if(c.from===me.id)o=c.to;if(!o||o===me.id)continue;const r=R[o]||(R[o]={u:o,w:0,l:0,g:c.gid,t:c.gtitle,ts:0});if(c.winner===me.id)r.w++;else r.l++;if((c.ts||0)>=r.ts){r.ts=c.ts||0;r.g=c.gid;r.t=c.gtitle}}return Object.values(R).sort((a,b)=>(b.w+b.l)-(a.w+a.l))}
function rivalsBox(){const r=rivalsRec();if(!r.length)return '';const W=r.reduce((s,x)=>s+x.w,0),L=r.reduce((s,x)=>s+x.l,0);
  return `<h2>🥊 ساحة الخصوم</h2><div class="box"><div class="meta" style="margin-bottom:6px">سجلك الكلي: ✅ ${W} فوز · ❌ ${L} خسارة</div>${r.slice(0,6).map(x=>`<div class="lb"><span class="av">${esc(userAv(x.u))}</span><b style="flex:1">${esc(userName(x.u))}</b><span>${x.w}-${x.l}</span> <button class="btn sm gold" data-rv="${esc(x.g)}">↩️ ${x.w>x.l?'كمّل':'ثأر'}</button></div>`).join('')}</div>`}

/* ---------- round 23: more achievements ---------- */
function extraBadges(u){const b=[],ds=DB.dscores||{},days=new Set();let dq=0;for(const k in ds)if((ds[k]||{})[u]){dq++;days.add(k.replace(/^.*_d/,''))}
  const wins=vals(DB.challenges).filter(c=>c.winner===u&&c.done).length;const S=DB.scores||{};const got=id=>!!(S[id]||{})[u];let mx=0;for(const g in S)if((S[g]||{})[u])mx=Math.max(mx,S[g][u].score||0);
  if(dq>=1)b.push('🌟 متحدي اليوم');if(days.size>=3)b.push('📅 ملتزم');if(wins>=3)b.push('⚔️ مقاتل');if(wins>=5)b.push('🥊 ملك الخصوم');if(lvlOf(xpOf(u))>=5)b.push('💎 مستوى 5');
  if(got('b_sokoban')&&got('b_ice')&&got('b_hunt'))b.push('🧩 عقل ذهبي');if(Object.keys(S).filter(g=>(S[g]||{})[u]).length>=10)b.push('🧭 متعدد المواهب');if(mx>=1000)b.push('💯 ألف نقطة');return b}

/* ---------- round 24: richer player page ---------- */
function playerExtras(u){const S=DB.scores||{};const mine=Object.keys(S).filter(g=>(S[g]||{})[u]).map(g=>{const e=S[g][u];const rk=Object.values(S[g]).filter(v=>v.score>e.score).length+1;return {g,s:e.score,rk,n:Object.keys(S[g]).length}}).sort((a,b)=>a.rk-b.rk||b.s-a.s);
  let h2h='';if(me&&me.id!==u){let w=0,l=0;for(const c of vals(DB.challenges)){if(!c.done||!c.winner)continue;if((c.from===me.id&&c.to===u)||(c.from===u&&c.to===me.id)){if(c.winner===me.id)w++;else l++}}if(w+l)h2h=`<div class="meta" style="margin-bottom:6px">🥊 مواجهاتك معاه: ✅ ${w} فوز · ❌ ${l} خسارة</div>`}
  const firsts=mine.filter(x=>x.rk===1).length;
  return `<h2>🏆 إنجازاته</h2><div class="box">${h2h}<div class="meta" style="margin-bottom:6px">🎯 لعب ${mine.length} لعبة · 👑 مركز أول في ${firsts}</div>${mine.slice(0,5).map(x=>`<div class="lb"><span style="flex:1">${esc((allGames().find(g=>g.id===x.g)||{}).title||x.g)}</span><span class="meta">#${x.rk} من ${x.n}</span> <b>${x.s}</b></div>`).join('')||'<div class="empty">لسه ما سجّلش نتايج</div>'}</div>`}

/* ---------- round 25: weekly recap ---------- */
function recapStats(u){const since=Date.now()-6048e5,S=DB.scores||{};let games=0,best=0,bestG='';for(const g in S){const e=(S[g]||{})[u];if(e&&e.ts>=since){games++;if(e.score>best){best=e.score;bestG=(allGames().find(x=>x.id===g)||{}).title||g}}}
  let daily=0;const ds=DB.dscores||{};for(const k in ds){const e=(ds[k]||{})[u];if(e&&e.ts>=since)daily++}
  const duels=vals(DB.challenges).filter(c=>c.done&&c.winner===u&&(c.ts||0)>=since).length;return {games,best,bestG,daily,duels,xp:games*10+duels*0}}
function recapBox(){if(!me)return '';const r=recapStats(me.id);
  return `<h2>📊 ملخصك الأسبوعي</h2><div class="box"><div class="tiles" style="margin:0"><div class="tile"><b>🎮 ${r.games}</b>لعبة اتسجلت<br><small>آخر 7 أيام</small></div><div class="tile"><b>🏆 ${r.best}</b>أحسن نتيجة<br><small>${esc(r.bestG||'لسه')}</small></div><div class="tile"><b>🌟 ${r.daily}</b>تحدي يوم</div><div class="tile"><b>⚔️ ${r.duels}</b>تحدي كسبته</div></div><button class="btn ghost" id="rcap" style="margin-top:8px;width:100%">📸 شارك ملخصي</button></div>`}
function recapCard(){const r=recapStats(me.id),c=document.createElement('canvas');c.width=800;c.height=450;const x=c.getContext('2d');const gr=x.createLinearGradient(0,0,800,450);gr.addColorStop(0,'#0f4c5c');gr.addColorStop(1,'#5f0f40');x.fillStyle=gr;x.fillRect(0,0,800,450);
  x.textAlign='center';x.fillStyle='#ffb020';x.font='bold 30px sans-serif';x.fillText('📊 ملخصي الأسبوعي في ملعب',400,55);x.fillStyle='#fff';fitText(x,me.avatar+' '+me.name+' · المستوى '+lvlOf(xpOf(me.id)),400,115,700,34,'bold');
  const cells=[['🎮',r.games,'لعبة'],['🏆',r.best,'أحسن نتيجة'],['🌟',r.daily,'تحدي يوم'],['⚔️',r.duels,'تحدي كسبته']];cells.forEach((q,i)=>{const cx=110+i*193;x.fillStyle='#ffffff18';x.fillRect(cx-85,150,170,170);x.font='40px sans-serif';x.fillStyle='#fff';x.fillText(q[0],cx,205);x.font='bold 50px sans-serif';x.fillStyle='#ffd24a';x.fillText(String(q[1]),cx,265);x.font='20px sans-serif';x.fillStyle='#fff';x.fillText(q[2],cx,300)});
  x.font='24px sans-serif';x.fillStyle='#ffffffcc';fitText(x,r.bestG?'أحسن لعبة: '+r.bestG:'ابدأ أسبوعك بلعبة جديدة',400,370,700,24,'');x.font='22px sans-serif';x.fillStyle='#ffffffaa';x.fillText('تعالى نتحدى بعض في ملعب',400,415);
  c.toBlob(async b=>{const f=new File([b],'playhub-week.png',{type:'image/png'});try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f]});return}}catch(e){}const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='playhub-week.png';a.click();toast('اتحفظ الكارت 📸')},'image/png');return c}

/* ---------- round 14: achievements catalog ---------- */
const BCAT=[['🛠️ صانع','انشر أول لعبة'],['🏭 منتج','انشر 3 ألعاب'],['🎯 لاعب','سجّل أول نتيجة'],['🔥 محترف','سجّل نتائج في 5 ألعاب'],['👑 بطل لعبة','احتل المركز الأول في لعبة'],['⭐ مشهور','وصل لـ 3 متابعين'],['👑 بطل الأسبوع','أعلى نتيجة هذا الأسبوع'],['🏅 بطل البطولة','فز ببطولة الأسبوع'],['🌟 متحدي اليوم','العب تحدي اليوم'],['📅 ملتزم','العب تحدي اليوم 3 أيام'],['⚔️ مقاتل','اكسب 3 تحديات'],['🥊 ملك الخصوم','اكسب 5 تحديات'],['💎 مستوى 5','وصل للمستوى 5'],['🧩 عقل ذهبي','سجّل في ادفع الصناديق وملك الجليد ومطاردة الكلمات'],['🧭 متعدد المواهب','سجّل في 10 ألعاب'],['💯 ألف نقطة','وصل لـ 1000 نقطة في أي لعبة']];
function badgeCatalog(u){const have=badges(u);return `<h2>🎖️ الأوسمة (${have.length}/${BCAT.length})</h2><div class="box"><div class="tiles" style="margin:0">${BCAT.map(([n,d])=>{const ok=have.includes(n);return `<div class="tile" style="${ok?'border:1px solid #ffd24a':'opacity:.45;filter:grayscale(1)'}"><b>${n.split(' ')[0]}</b>${n.split(' ').slice(1).join(' ')}<br><small>${ok?'✅ تم':d}</small></div>`}).join('')}</div></div>`}

const NEWIDS=['b_mancala','b_coins','b_peg','b_split','b_laser','b_untangle','b_chain','b_knight','b_jam','b_sudoku','b_gomoku','b_flood','b_dots','b_kiosk','b_queens','b_hanoi','b_water','b_code','b_nim','b_nono','b_binary','b_tower','b_reversi','b_pipes','b_hunt','b_ice','b_sokoban','b_biggest','b_subtract','b_squares','b_percent','b_table','b_between','b_double','b_remainder','b_order3','b_missing','b_fractions','b_clock','b_center'];
function newRow(){const l=NEWIDS.map(id=>allGames().find(g=>g.id===id)).filter(Boolean);return l.length?`<h2>🆕 جديد في ملعب</h2><div class="row">${l.map(card).join('')}</div>`:''}
function pubLists(){try{const o=[];const L=DB.lists||{};for(const u in L)for(const k in L[u]){const l=L[u][k];if(l&&(l.ids||[]).length>=2&&(!me||u!==me.id))o.push({u,k,l})}
  o.sort((x,y)=>(y.l.ts||0)-(x.l.ts||0));if(!o.length)return '';
  return `<h2>📚 قوائم من اللاعبين</h2><div class="row">${o.slice(0,8).map(x=>`<div class="box" data-pl="${esc(x.u)}~${esc(x.k)}" style="min-width:150px;cursor:pointer;flex:0 0 auto"><b>${esc(x.l.name)}</b><div class="meta">${(x.l.ids||[]).length} لعبة · ${esc(userName(x.u))}</div></div>`).join('')}</div>`}catch(e){return ''}}
function recentRow(){let rc=[];try{rc=JSON.parse(localStorage.getItem('playhub_recent')||'[]')}catch(e){}const l=rc.map(id=>allGames().find(g=>g.id===id)).filter(Boolean);return l.length?`<h2>🕘 كمّل لعب</h2><div class="row">${l.map(card).join('')}</div>`:''}

/* ---------- round 16: confetti + accent colors ---------- */
function confetti(){sfx('win');const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99';c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext('2d');
  const P=Array.from({length:120},()=>({x:c.width/2+(Math.random()-.5)*120,y:c.height*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,r:4+Math.random()*5,h:Math.random()*360,a:Math.random()*6}));let f=0;
  (function t(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.2;x.fillStyle=`hsl(${p.h},90%,60%)`;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore()});if(++f<110)requestAnimationFrame(t);else c.remove()})()}
const ACCS=[['#ffb020','#7c5cff','ذهبي'],['#2ee6a6','#1e88e5','أخضر'],['#ff5c8a','#8e44ff','وردي'],['#4dc3ff','#6c5ce7','سماوي'],['#ff7a45','#c0392b','برتقالي']];
function applyAccent(){const i=+localStorage.getItem('playhub_acc')||0,a=ACCS[i]||ACCS[0];document.documentElement.style.setProperty('--ac',a[0]);document.documentElement.style.setProperty('--ac2',a[1])}
function themePicker(){const i=+localStorage.getItem('playhub_acc')||0;setTimeout(()=>document.querySelectorAll('[data-acc]').forEach(e=>e.onclick=()=>{localStorage.setItem('playhub_acc',e.dataset.acc);applyAccent();V.me()}),0);
  return `<h2>🎨 لون التطبيق</h2><div class="box" style="display:flex;gap:10px;justify-content:center">${ACCS.map((a,k)=>`<button data-acc="${k}" title="${a[2]}" style="width:44px;height:44px;border-radius:50%;border:${k===i?'3px solid #fff':'2px solid #fff3'};background:linear-gradient(135deg,${a[0]},${a[1]})"></button>`).join('')}</div>`}
applyAccent();

function forYou(){if(!me)return '';const pl=DB.plays||{};const mine=new Set(Object.keys(pl).filter(g=>pl[g]&&pl[g][me.id]));if(!mine.size)return '';
  const all=allGames(),cc={};all.filter(g=>mine.has(g.id)).forEach(g=>cc[g.cat]=(cc[g.cat]||0)+1);
  const l=all.filter(g=>!mine.has(g.id)).map(g=>({g,s:(cc[g.cat]||0)*10+ratingOf(g.id).avg+Math.random()*.5})).filter(x=>x.s>=10).sort((a,b)=>b.s-a.s).slice(0,8).map(x=>x.g);
  return l.length?`<h2>🎯 مقترح ليك</h2><div class="meta" style="margin-bottom:6px">بناءً على الألعاب اللي لعبتها</div><div class="row">${l.map(card).join('')}</div>`:''}

function fitText(x,t,px,py,maxw,size,w){let s=size;do{x.font=(w?w+' ':'')+s+'px sans-serif';s-=2}while(x.measureText(t).width>maxw&&s>14);x.fillText(t,px,py)}
function shareCard(g,score){const c=document.createElement('canvas');c.width=800;c.height=450;const x=c.getContext('2d');const gr=x.createLinearGradient(0,0,800,450);gr.addColorStop(0,'#2a1f6a');gr.addColorStop(1,'#7a2a4a');x.fillStyle=gr;x.fillRect(0,0,800,450);
  x.fillStyle='rgba(255,255,255,.08)';for(let i=0;i<14;i++){x.beginPath();x.arc(Math.random()*800,Math.random()*450,20+Math.random()*60,0,7);x.fill()}
  x.textAlign='center';x.fillStyle='#ffb020';x.font='bold 34px sans-serif';x.fillText('🎮 ملعب',400,60);x.fillStyle='#fff';fitText(x,g.title,400,140,720,44,'bold');
  x.font='bold 120px sans-serif';x.fillStyle='#ffd24a';x.fillText(String(score),400,290);x.fillStyle='#fff';x.font='30px sans-serif';fitText(x,(me?me.name:'لاعب')+' · المستوى '+(me?lvlOf(xpOf(me.id)):1),400,350,720,30,'');x.fillStyle='#ffffffaa';x.font='24px sans-serif';x.fillText('تقدر تكسر نتيجتي؟ تعالى العب في ملعب',400,410);
  c.toBlob(async b=>{const f=new File([b],'playhub-score.png',{type:'image/png'});try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:g.title});return}}catch(e){}
    const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='playhub-score.png';a.click();toast('اتحفظ الكارت 📸')},'image/png');return c}

var HOW={b_react:'استنى الشاشة تتحول للأخضر وبعدها اضغط بأسرع ما تقدر. لو ضغطت بدري الجولة بتتعاد. النتيجة = مجموع 5 جولات (1000 ناقص الزمن بالمللي ثانية).',
b_simon:'شوف تسلسل الألوان وكرره بنفس الترتيب. كل مستوى بيضيف لون. النتيجة = 100 × عدد المستويات اللي خلصتها.',
b_bubbles:'30 ثانية. الفقاعة الصغيرة = 3 نقاط، المتوسطة 2، الكبيرة 1. الفقاعة بتختفي بعد ثانية.',
b_math:'حل أكبر عدد من المسائل في 30 ثانية. كل إجابة صح متتالية بتزوّد نقاطك، والغلط بيخصم 5 ويقطع السلسلة.',
b_snake:'اسحب على اللوحة أو استخدم الأزرار. كل تفاحة 10 نقاط والثعبان بيسرّع. الخبطة في الحيط أو في نفسك بتنهي اللعبة.',
b_2048:'اسحب لدمج الأرقام المتشابهة. نقاطك = مجموع الأرقام اللي دمجتها. اللعبة بتخلص لما ما يبقاش في حركات.',
b_flap:'اضغط على اللوحة (أو المسافة) عشان الطائر يطير. عدّي من الفتحة بين الأنابيب. كل أنبوبة = نقطة.',
b_words:'اضغط على الحروف بالترتيب الصحيح لتكوين الكلمة. كل كلمة = 10 نقاط + 2 لكل حرف. التخطي بيخصم 5 نقاط.',
b_race:'اضغط على نص اللوحة اليمين أو الشمال (أو الأسهم) لتغيير المسار. كل ما تمشي أبعد السرعة بتزيد. النتيجة = المسافة بالمتر.',
b_mole:'اضغط على الخلد 🐹 (+10) وإوعى تضغط على القنبلة 💣 (-15). بيظهروا أسرع مع الوقت.',
b_schulte:'اضغط الأرقام من 1 لـ 16 بالترتيب بأسرع ما تقدر. النتيجة = 1000 ناقص 20 × الثواني.',
b_stack:'اضغط لتنزيل الطابق المتحرك فوق اللي قبله. الجزء اللي بيطلع برا بيتقطع والبرج بيضيق. كل طابق = 10 نقاط.',
b_stroop:'اضغط على اللون اللي الكلمة مكتوبة بيه مش اللي بتقوله. +10 للصح و-5 للغلط، 30 ثانية.',
b_mines:'اضغط الخانات لكشفها. الرقم هو عدد الألغام حواليه. اكشف كل الآمن لتكسب، النقاط أكتر كل ما كنت أسرع.',
b_digits:'احفظ الرقم لحد ما يختفي واكتبه. كل مستوى بيزوّد رقم، وكل مستوى = 100 نقطة.',
b_aim:'اضغط الأهداف الحمرا 20 مرة. بتصغر مع كل إصابة. النتيجة حسب سرعتك.',
b_cmp:'اختار الرقم الأكبر من الاتنين. الصح المتتالي بيزوّد النقاط والغلط بيخصم 10.',
b_dodge:'اسحب صباعك يمين وشمال (أو الأسهم) وتفادى الكور. لما تخبط اللعبة بتخلص ونتيجتك بتتسجل.',
b_odd:'لاقي المربع المختلف عن باقي المربعات في الدرجة. الصح +10 والغلط -5 ويخصم ثانيتين.',
b_scramble:'رتّب الحروف واكتب الكلمة الصح. +20 للصح و-5 للغلط أو التخطي، 60 ثانية.',
b_grid:'احفظ أماكن المربعات الصفرا اللي بتنور واضغطها. كل مستوى بيزوّد مربعات. أول غلطة بتخلّص اللعبة.',
b_duel:'استنى الأحمر لما يتحول أخضر واضغط قبل الروبوت. الضغط بدري بيخسّرك الجولة.',
b_count:'عدّ النقط الصفرا اللي بتظهر لحظة واختار العدد الصح. كل مستوى = 100 نقطة وأول غلطة بتنهي اللعبة.',
b_pong:'حرّك المضرب بصباعك أو الأسهم عشان تردّ الكورة. كل ارتداد = 20 نقطة.',
b_sum:'اضغط أرقام مجموعها بالظبط الهدف. الصح +15 والتجاوز -5 والشبكة بتتغير.',
b_jump:'اضغط على الشاشة (أو المسافة) عشان تنط فوق العوائق الحمرا. كل ما عشت أكتر نقاطك أعلى.',
b_typing:'اكتب الكلمة الظاهرة بالظبط وهتنتقل للتالية تلقائي. الكلمة الأطول نقاطها أكتر.',
b_rps:'اختار حجر أو ورقة أو مقص. كل فوز بيزوّد سلسلتك (100 نقطة للفوز)، التعادل بيكمل، وأول خسارة بتنهي اللعبة.',
b_flip:'اقلب كارتين كل مرة وطابق الأرقام. النتيجة = 1000 ناقص 20 × الحركات ناقص 5 × الثواني.',
b_colortap:'اقرأ اسم اللون واضغط المربع اللي لونه ده. الصح +10 والغلط -5. 30 ثانية.',
b_fall:'اكتب الكلمة الساقطة بالظبط قبل ما توصل الأسفل. كل كلمة بتفلت بتخسرك روح من 3.',
b_tones:'اسمع تسلسل النغمات وكرره بالضغط على نفس الألوان. كل مستوى بيزوّد نغمة. كل مستوى = 100 نقطة.',
b_catch:'اسحب السلة (أو الأسهم) والتقط النجوم +10. القنبلة أو نجمة تفلت بتخصم روح من 3.',
b_hilo:'اختار لو الكارت الجاي أعلى ولا أقل. التعادل بيكمل. كل صح = 100 نقطة وأول غلطة بتنهي اللعبة.',
b_lights:'اضغط مربع فيقلب هو وجيرانه الأربعة (نور/طفي). طفّي الشبكة كلها. 5 مستويات وكل مستوى بنقاط حسب حركاتك.',
b_puzzle:'حرّك الخانات المجاورة للفراغ لحد ما الأرقام تترتب من 1 لـ 8. النتيجة = 1000 ناقص 8 × الحركات ناقص 3 × الثواني.',
b_guess:'خمّن الرقم السري من 1 لـ 100. الروبوت بيقولك أعلى أو أقل. 8 محاولات كحد أقصى في كل جولة، و3 جولات.',
b_connect:'اضغط على عمود لنزول القطعة. وصّل 4 في صف أفقي أو رأسي أو قطري. كل فوز بيكمّل بجولة جديدة، وأول خسارة بتسجل 150 × انتصاراتك.',
b_trivia:'جاوب أسئلة ثقافة عامة بالعربي. الصح +10 والغلط -5. 45 ثانية.',
b_maze:'حرّك الكرة بالسحب (أو الأسهم) للوصول للنجمة. 5 متاهات في 60 ثانية. الوقت المتبقي بيزوّد نقاطك.',
b_tiles:'اضغط البلاطة السودا في الصف الأخير فقط. كل صح = 20 نقطة. أي غلطة بتنهي اللعبة. 20 ثانية.',
b_cps:'اضغط على المربع بأسرع ما تقدر لمدة 10 ثواني. كل ضغطة = 10 نقاط. أول ضغطة بتبدأ العد.',
b_cards:'اقلب كارتين كل مرة ولاقي الأزواج. النتيجة = 1000 ناقص (25 × الحركات) ناقص (5 × الثواني).',
b_ttt:'العب X ضد الكمبيوتر. كل فوز بيزوّد سلسلتك، والتعادل بيحافظ عليها. أول خسارة بتسجل نتيجتك = 100 × عدد الانتصارات.'};

function platStats(){const g=allGames(),cs={};g.forEach(x=>{cs[x.cat]=(cs[x.cat]||0)+playsOf(x.id)});const mx=Math.max(1,...Object.values(cs));
  const top=[...g].sort((a,b)=>playsOf(b.id)-playsOf(a.id)).slice(0,5);const nu=Object.keys(DB.users||{}).length,ns=Object.values(DB.scores||{}).reduce((a,m)=>a+Object.keys(m||{}).length,0),nc=Object.values(DB.comments||{}).reduce((a,m)=>a+Object.keys(m||{}).length,0);
  return `<h2>📈 إحصائيات المنصة</h2><div class="box"><div class="tiles" style="margin:0 0 10px"><div class="tile"><b>${g.length}</b>لعبة</div><div class="tile"><b>${nu}</b>لاعب</div><div class="tile"><b>${ns}</b>نتيجة</div><div class="tile"><b>${nc}</b>تعليق</div></div>
  <b>التشغيل حسب التصنيف</b>${Object.entries(cs).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`<div class="meta" style="margin:4px 0"><span style="width:80px">${esc(c)}</span><div style="flex:1;height:10px;background:#0006;border-radius:6px;overflow:hidden"><div style="height:100%;width:${n/mx*100}%;background:linear-gradient(90deg,var(--ac2),var(--ac))"></div></div><span>${n}</span></div>`).join('')}
  <div style="margin-top:10px"><b>الأكثر لعباً</b>${top.map((x,i)=>`<div class="lb" data-g="${esc(x.id)}" style="cursor:pointer"><span class="n">${i+1}</span><b style="flex:1">${esc(x.emo||'🎮')} ${esc(x.title)}</b><span>▶ ${playsOf(x.id)}</span></div>`).join('')}</div></div>`}

function newBadges(){if(!me||!ONLINE)return;const k='playhub_bdg_'+me.id;const have=badges(me.id);const raw=localStorage.getItem(k);
  if(raw===null){localStorage.setItem(k,JSON.stringify(have));return}const old=JSON.parse(raw);const nw=have.filter(b=>!old.includes(b));
  if(nw.length){localStorage.setItem(k,JSON.stringify([...new Set([...old,...have])]));confetti();toast('🎖️ وسام جديد: '+nw.join(' و '))}}

function playersBox(){if(!q||q.length<2)return '';const ql=q.toLowerCase();const us=Object.entries(DB.users||{}).filter(([id,u])=>u&&String(u.name||'').toLowerCase().includes(ql)).slice(0,10);
  return us.length?`<h2>👥 لاعبين</h2><div class="box">${us.map(([id,u])=>`<div class="lb" data-u="${esc(id)}" style="cursor:pointer"><span class="av">${esc(u.avatar||'🙂')}</span><b style="flex:1">${esc(u.name)}</b><span>مستوى ${lvlOf(xpOf(id))}</span></div>`).join('')}</div>`:''}

function podium(sc){if(!sc.length)return '';const p=[sc[1],sc[0],sc[2]],h=[70,100,52],m=['🥈','🥇','🥉'];
  return `<div style="display:flex;gap:8px;align-items:flex-end;justify-content:center;margin:12px 0 6px">${p.map((e,i)=>e?`<div style="flex:1;max-width:110px;text-align:center"><div style="font-size:26px">${esc(userAv(e.u))}</div><div class="meta" style="justify-content:center"><b>${esc(e.name)}</b></div><div style="height:${h[i]}px;border-radius:10px 10px 0 0;background:linear-gradient(180deg,var(--ac),var(--ac2));display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;color:#1b1500"><span style="font-size:22px">${m[i]}</span>${e.score}</div></div>`:'<div style="flex:1;max-width:110px"></div>').join('')}</div>`}

var CARI=0,CART=null;
function heroCar(){const g=allGames().filter(x=>!x.seed||String(x.id).startsWith('b_'));const l=[...g].sort((a,b)=>trending(b)-trending(a)).slice(0,5);if(!l.length)return '';
  return `<div class="car dk" style="position:relative;overflow:hidden;border-radius:18px;margin:10px 0;height:150px"><div id="cartrack" style="display:flex;height:100%;transition:transform .5s;direction:ltr">${l.map(x=>`<div data-g="${esc(x.id)}" style="min-width:100%;height:100%;cursor:pointer;direction:rtl;padding:18px;display:flex;flex-direction:column;justify-content:flex-end;background:${x.img?`linear-gradient(transparent,#000a),url('${esc(x.img)}') center/cover`:'linear-gradient(transparent,#0008),'+cover(x,COL[x.title.length%COL.length])}"><div style="font-size:40px;position:absolute;top:12px;left:16px">${esc(x.emo||'🎮')}</div><h2 style="margin:0">${esc(x.title)}</h2><div class="meta">${esc(x.cat)} · ${esc(String(x.desc).slice(0,50))}</div></div>`).join('')}</div><div id="cardots" style="position:absolute;bottom:6px;left:0;right:0;display:flex;gap:5px;justify-content:center">${l.map((_,i)=>`<span style="width:7px;height:7px;border-radius:50%;background:${i?'#fff5':'#fff'}"></span>`).join('')}</div></div>`}
function carInit(){clearInterval(CART);const t=$('#cartrack');if(!t)return;const n=t.children.length;CARI=0;CART=setInterval(()=>{const t=$('#cartrack');if(!t||view.t!=='home'){clearInterval(CART);return}CARI=(CARI+1)%n;t.style.transform=`translateX(${-CARI*100}%)`;[...$('#cardots').children].forEach((d,i)=>d.style.background=i===CARI?'#fff':'#fff5')},3500)}

(function(){const st=document.createElement('style');st.textContent='.dk,.dk h2,.dk .meta,.dk small,.dk b,.dk .lb,.dk .lb *{color:#fff!important}.dk .meta{opacity:.85}.dk .btn.gold{color:#1b1500!important}';document.head.appendChild(st)})();

var AC=null;
function haptic(p){try{if(localStorage.getItem('playhub_hap')!=='0'&&navigator.vibrate)navigator.vibrate(p)}catch(e){}}
function sfx(k){haptic(k==='win'?[40,40,80]:15);if(localStorage.getItem('playhub_snd')==='0')return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const seq={tap:[[660,.04]],win:[[523,.09],[659,.09],[784,.09],[1047,.18]]}[k]||[];let t=AC.currentTime;seq.forEach(([f,d])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.0001,t+d+.05);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.06);t+=d})}catch(e){}}
function soundBox(){const on=localStorage.getItem('playhub_snd')!=='0',hp=localStorage.getItem('playhub_hap')!=='0';setTimeout(()=>{const h=$('#hapt');if(h)h.onclick=()=>{localStorage.setItem('playhub_hap',hp?'0':'1');if(!hp)haptic(60);V.me()};const b=$('#sndt');if(b)b.onclick=()=>{localStorage.setItem('playhub_snd',on?'0':'1');V.me()}},0);
  return `<h2>🔊 الصوت</h2><div class="box"><button class="btn ${on?'gold':'ghost'}" id="sndt">${on?'🔊 الأصوات شغالة':'🔇 الأصوات مقفولة'}</button> <button class="btn ${hp?'gold':'ghost'}" id="hapt">${hp?'📳 الاهتزاز شغال':'📴 الاهتزاز مقفول'}</button></div>`}

function friendsBoard(){if(!me)return '';const fl=new Set([me.id,...Object.keys((DB.follows||{})[me.id]||{})]);if(fl.size<2)return '<h2>👥 تصنيف أصحابي</h2><div class="box"><div class="empty">تابع لاعبين عشان تشوف ترتيبكم هنا</div></div>';
  const m=topPlayersAll().filter(p=>fl.has(p.u));return `<h2>👥 تصنيف أصحابي</h2><div class="box">${m.map((p,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(p.u))}</span><b style="flex:1" data-u="${esc(p.u)}">${esc(userName(p.u))}${p.u===me.id?' (أنت)':''}</b><span>${p.pts} نقطة</span></div>`).join('')||'<div class="empty">لسه مفيش نتائج</div>'}</div>`}
function topPlayersAll(){const m={};for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const rk=Object.entries(DB.scores[gid]).sort((a,b)=>b[1].score-a[1].score).findIndex(x=>x[0]===u);m[u]=(m[u]||0)+([10,6,3][rk]||1)}
  return Object.entries(m).map(([u,pts])=>({u,pts})).sort((a,b)=>b.pts-a.pts)}

function quizHtml(qs){const data=JSON.stringify(qs).replace(/</g,'\\u003c');
  return '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{margin:0;background:#12142a;color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:12px}h2{margin:12px 0}.o{display:block;width:100%;margin:8px 0;padding:14px;font-size:18px;background:#2a2f66;color:#fff;border:0;border-radius:12px}.ok{background:#1f7a4a!important}.no{background:#a33!important}.b{background:#7c5cff;color:#fff;border:0;border-radius:12px;padding:10px 22px;font-size:18px}</style></head><body><div id=h style="color:#9aa3d6"></div><h2 id=q></h2><div id=os></div><div id=r></div><script>var Q='+data+',i=0,sc=0,lock=false;function show(){lock=false;if(i>=Q.length){document.getElementById("h").textContent="";document.getElementById("q").textContent="خلصت! نتيجتك "+sc;document.getElementById("os").innerHTML="";document.getElementById("r").innerHTML="<button class=b onclick=\\"i=0;sc=0;show()\\">العب تاني</button>";parent.postMessage({type:"playhub-score",score:sc},"*");return}var q=Q[i];document.getElementById("r").innerHTML="";document.getElementById("h").textContent="سؤال "+(i+1)+" من "+Q.length+" · نقاط: "+sc;document.getElementById("q").textContent=q.q;var o=q.o.map(function(t,k){return [t,k]}).sort(function(){return Math.random()-.5}),h="";o.forEach(function(p){h+="<button class=o data-k="+p[1]+">"+p[0].replace(/</g,"&lt;")+"</button>"});var e=document.getElementById("os");e.innerHTML=h;[].forEach.call(e.children,function(b){b.onclick=function(){if(lock)return;lock=true;if(b.dataset.k=="0"){sc+=100;b.className="o ok"}else{b.className="o no";[].forEach.call(e.children,function(x){if(x.dataset.k=="0")x.className="o ok"})}i++;setTimeout(show,900)}})}show()<\/script></body></html>'}
V.quiz=()=>{if(!me){go({t:'me'});return}
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2>🧪 صانع الاختبارات</h2><div class="box"><div class="meta" style="margin-bottom:8px">اكتب أسئلتك والإجابة الصح أول خانة. اللعبة بتتولّد وتتنشر لوحدها وبتسجل النتيجة تلقائي (100 نقطة لكل إجابة صح).</div><input id="qt" placeholder="اسم الاختبار" maxlength="40"><input id="qtg" placeholder="وصف قصير" maxlength="100"><div id="qs"></div><button class="btn ghost" id="qa">+ سؤال جديد</button> <button class="btn gold" id="qp">نشر الاختبار 🚀</button></div>`;
  const add=()=>{const d=document.createElement('div');d.className='box';d.style.background='var(--card2)';d.innerHTML='<input class="qq" placeholder="نص السؤال" maxlength="120"><input class="qo" placeholder="✅ الإجابة الصح" maxlength="50"><input class="qo" placeholder="إجابة غلط 1" maxlength="50"><input class="qo" placeholder="إجابة غلط 2" maxlength="50"><input class="qo" placeholder="إجابة غلط 3 (اختياري)" maxlength="50">';$('#qs').appendChild(d)};
  add();add();add();$('#qa').onclick=()=>{if(document.querySelectorAll('#qs .box').length<12)add()};$('#bk').onclick=()=>go({t:'publish'});
  $('#qp').onclick=async()=>{const title=$('#qt').value.trim();if(title.length<2){toast('اكتب اسم الاختبار');return}const qs=[];
    for(const b of document.querySelectorAll('#qs .box')){const q=b.querySelector('.qq').value.trim(),o=[...b.querySelectorAll('.qo')].map(x=>x.value.trim()).filter(Boolean);if(!q&&!o.length)continue;if(!q||o.length<2){toast('كل سؤال محتاج نص وإجابتين على الأقل');return}qs.push({q,o})}
    if(qs.length<3){toast('اكتب 3 أسئلة على الأقل');return}
    const o={title,desc:$('#qtg').value.trim()||('اختبار من '+me.name+' ('+qs.length+' سؤال)'),cat:'ألغاز',emo:'🧪',author:me.id,authorName:me.name,ts:Date.now(),tags:'اختبار',html:quizHtml(qs)};
    const k=await dbPush('games',o);toast('اتنشر اختبارك 🎉');go({t:'game',id:k})}};

function profileCard(){const c=document.createElement('canvas');c.width=800;c.height=450;const x=c.getContext('2d');const gr=x.createLinearGradient(0,0,800,450);gr.addColorStop(0,'#1f2a6a');gr.addColorStop(1,'#7a2a6a');x.fillStyle=gr;x.fillRect(0,0,800,450);
  x.textAlign='center';x.fillStyle='#ffb020';x.font='bold 30px sans-serif';x.fillText('🎮 ملعب',400,55);x.font='90px sans-serif';x.fillStyle='#fff';x.fillText(me.avatar,400,170);x.fillStyle='#fff';fitText(x,me.name,400,235,700,46,'bold');
  x.font='28px sans-serif';x.fillStyle='#ffd24a';x.fillText('المستوى '+lvlOf(xpOf(me.id))+' · '+xpOf(me.id)+' XP',400,285);const bd=badges(me.id);x.fillStyle='#fff';fitText(x,bd.slice(0,4).join('  ')||'لسه بيبدأ رحلته',400,335,700,26,'');
  x.font='22px sans-serif';x.fillStyle='#ffffffaa';x.fillText(allGames().filter(g=>g.author===me.id).length+' لعبة منشورة · '+followers(me.id)+' متابع',400,385);x.fillText('تعالى العب معايا في ملعب',400,420);
  c.toBlob(async b=>{const f=new File([b],'playhub-profile.png',{type:'image/png'});try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f]});return}}catch(e){}const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='playhub-profile.png';a.click();toast('اتحفظ الكارت 📸')},'image/png');return c}

/* ---------- round 12: daily quests + streak ---------- */
var QS=[['play','▶ العب أي لعبة',1],['rate','⭐ قيّم لعبة',1],['score','🏆 سجّل نتيجة',1],['comment','💬 اكتب تعليق',1]];
function dkey(){return new Date().toISOString().slice(0,10)}
function qget(){let q={};try{q=JSON.parse(localStorage.getItem('playhub_q')||'{}')}catch(e){}if(q.d!==dkey())q={d:dkey()};return q}
function qinc(k){const q=qget();if(q[k])return;q[k]=1;localStorage.setItem('playhub_q',JSON.stringify(q));
  const done=QS.filter(x=>q[x[0]]).length;if(done===QS.length)confetti();toast(done===QS.length?'🎉 خلصت كل مهام النهاردة! +مكافأة':'✅ مهمة اتنجزت ('+done+'/'+QS.length+')')}
function streak(){let st={n:0,last:''};try{st=JSON.parse(localStorage.getItem('playhub_streak')||'')||st}catch(e){}const t=dkey();
  if(st.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);st.n=st.last===y?st.n+1:1;st.last=t;localStorage.setItem('playhub_streak',JSON.stringify(st))}return st.n}
function dailyBox(){const q=qget(),n=streak(),done=QS.filter(x=>q[x[0]]).length;
  const DY=(function(){let a=[];try{a=JSON.parse(localStorage.getItem('playhub_days')||'[]')}catch(e){}if(a.indexOf(dkey())<0){a.push(dkey());a=a.slice(-60);localStorage.setItem('playhub_days',JSON.stringify(a))}return a})();const WD=['ح','ن','ث','ر','خ','ج','س'];const cal=[6,5,4,3,2,1,0].map(i=>{const d=new Date(Date.now()-i*864e5);const k=d.toISOString().slice(0,10);return `<span style="text-align:center;flex:1"><div class="meta" style="justify-content:center">${WD[d.getDay()]}</div><div style="font-size:20px">${DY.indexOf(k)>=0?'🔥':'⚪'}</div></span>`}).join('');const MS=[[3,'🥉 برونزي'],[7,'🥈 فضي'],[14,'🥇 ذهبي'],[30,'💎 ماسي']];const got=MS.filter(m=>n>=m[0]).slice(-1)[0],nxt=MS.find(m=>n<m[0]);
  return `<div class="box" style="border:1px solid var(--ac)"><div style="display:flex;justify-content:space-between"><b>🎯 مهام النهاردة (${done}/${QS.length})</b><b>🔥 ${n} يوم متتالي</b></div>
  <div style="height:8px;background:#0006;border-radius:6px;margin:8px 0;overflow:hidden"><div style="height:100%;width:${done/QS.length*100}%;background:linear-gradient(90deg,var(--ac),#ffd24a)"></div></div>
  <div class="meta">${QS.map(x=>`<span>${q[x[0]]?'✅':'⬜'} ${x[1]}</span>`).join('')}</div><div style="display:flex;margin-top:8px">${cal}</div><div class="meta" style="margin-top:6px">${got?'درجتك: '+got[1]+' · ':''}${nxt?'باقي '+(nxt[0]-n)+' يوم لـ '+nxt[1]:'وصلت لأعلى درجة 👑'}</div></div>`}

if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
(function(){const d=document.createElement('div');d.id='splash';d.innerHTML='<div class="sp"><div style="font-size:64px;animation:spin 1.2s ease-in-out infinite">🎮</div><h1 style="margin:8px 0;color:#ffb020">ملعب</h1><div style="color:#9aa3d6">بنجهّز الملعب...</div></div>';
  d.style.cssText='position:fixed;inset:0;background:#0f1226;z-index:200;display:flex;align-items:center;justify-content:center;text-align:center;transition:opacity .5s';
  const st=document.createElement('style');st.textContent='@keyframes spin{0%{transform:rotate(-12deg) scale(1)}50%{transform:rotate(12deg) scale(1.15)}100%{transform:rotate(-12deg) scale(1)}}';document.head.appendChild(st);document.body.appendChild(d);
  window.hideSplash=()=>{d.style.opacity=0;setTimeout(()=>d.remove(),500)};setTimeout(window.hideSplash,4000)})();

(async()=>{const p=new URLSearchParams(location.search);if(p.get('g'))view={t:'game',id:p.get('g'),sc:+p.get('sc')||0,by:(p.get('by')||'').slice(0,20)};if(p.get('c')&&view.t==='game')view.cl=p.get('c').slice(0,40);if(p.get('l')){const q2=p.get('l').split('~');view={t:'slist',u:(q2[0]||'').slice(0,40),k:(q2[1]||'').slice(0,40)}}render();if(!ONLINE)setTimeout(hideSplash,600);
  if(ONLINE){await dbSync();render();hideSplash();setInterval(async()=>{const a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return;if(await dbSync())render()},10000)}})();

/* ---------- round 11: notifications, champion, creator stats, hall of fame ---------- */
function champ(){const since=Date.now()-6048e5;let b=null;for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];if(e&&e.ts>=since&&(!b||e.score>b.s))b={u,s:e.score}}return b?b.u:null}
function notifs(){if(!me)return[];const mine=new Set(allGames().filter(g=>g.author===me.id).map(g=>g.id)),n=[];
  for(const gid of mine){const g=allGames().find(x=>x.id===gid);for(const c of vals((DB.comments||{})[gid]))if(c.uid!==me.id)n.push({ts:c.ts,t:`💬 ${esc(c.name)} علّق على <b>${esc(g.title)}</b>: ${esc(String(c.text).slice(0,60))}`,g:gid});
    for(const u in (DB.scores||{})[gid]||{}){const e=DB.scores[gid][u];if(u!==me.id)n.push({ts:e.ts||0,t:`🏆 ${esc(e.name)} سجّل ${e.score} في <b>${esc(g.title)}</b>`,g:gid})}}
  for(const c of vals(DB.challenges))if(c.to===me.id)n.push({ts:c.ts,t:`⚔️ ${esc(c.fromName)} تحداك في <b>${esc(c.gtitle)}</b>`,g:c.gid});
  for(const id in (DB.clinks||{})){const c=DB.clinks[id];if(!c||c.from!==me.id)continue;for(const u in (c.results||{})){if(u===me.id)continue;const r=c.results[u];n.push({ts:r.ts||c.ts||0,t:`⚔️ ${esc(r.name||'لاعب')} رد على تحديك في <b>${esc(c.gtitle)}</b> بـ ${r.score} ${r.score>c.score?'(كسر رقمك!)':'(لسه ما كسرش رقمك)'}`,g:c.gid})}}
  return n.sort((a,b)=>b.ts-a.ts).slice(0,40)}
function bell(){let b=$('#bell');if(!b){b=document.createElement('button');b.id='bell';b.className='btn sm ghost';$('header').insertBefore(b,$('#meBtn'));b.onclick=()=>go({t:'notif'})}
  const seen=+localStorage.getItem('playhub_nseen')||0,c=notifs().filter(x=>x.ts>seen).length;b.textContent='🔔'+(c?' '+c:'');b.style.display=me?'':'none'}
V.notif=()=>{const seen=+localStorage.getItem('playhub_nseen')||0,l=notifs();
  app.innerHTML=`<h2>🔔 الإشعارات</h2>${l.map(x=>`<div class="box" data-g="${esc(x.g)}" style="cursor:pointer;${x.ts>seen?'border:1px solid var(--ac)':''}">${x.t}<div class="meta">${new Date(x.ts).toLocaleString('ar-EG')}</div></div>`).join('')||'<div class="empty">مفيش إشعارات لسه. انشر لعبة وخلّي الناس تتفاعل معاها!</div>'}`;
  localStorage.setItem('playhub_nseen',Date.now());bindCards();bell()};
function creatorStats(u){const gs=allGames().filter(g=>g.author===u);if(!gs.length)return '';let pl=0,rs=0,rn=0,cm=0;
  for(const g of gs){pl+=playsOf(g.id);const r=ratingOf(g.id);rs+=r.avg*r.n;rn+=r.n;cm+=vals((DB.comments||{})[g.id]).length}
  const best=[...gs].sort((a,b)=>playsOf(b.id)-playsOf(a.id))[0];
  return `<h2>📊 لوحة الصانع</h2><div class="box"><div class="tiles" style="margin:0"><div class="tile"><b>${gs.length}</b>ألعاب</div><div class="tile"><b>${pl}</b>تشغيل</div><div class="tile"><b>${rn?(rs/rn).toFixed(1):'-'}</b>متوسط التقييم</div><div class="tile"><b>${cm}</b>تعليق</div><div class="tile"><b>${followers(u)}</b>متابع</div></div><div class="meta" style="margin-top:8px">الأكثر لعباً: ${esc(best.title)} (${playsOf(best.id)})</div></div>`}
V.hall=()=>{const cr={};for(const g of allGames().filter(x=>!x.seed)){const c=cr[g.author]=cr[g.author]||{u:g.author,pl:0,n:0,rs:0,rn:0};c.n++;c.pl+=playsOf(g.id);const r=ratingOf(g.id);c.rs+=r.avg*r.n;c.rn+=r.n}
  const cl=Object.values(cr).map(c=>({...c,sc:c.pl+c.rs*2+followers(c.u)*3})).sort((a,b)=>b.sc-a.sc).slice(0,10);const ch=champ();
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2>🏛️ قاعة المشاهير</h2>
  <div class="box dk" style="text-align:center;background:linear-gradient(135deg,#6a4a10,#2a1a4a)"><div class="meta" style="justify-content:center">👑 بطل الأسبوع</div>${ch?`<h2 style="margin:6px 0" data-u="${esc(ch)}">${esc(userAv(ch))} ${esc(userName(ch))}</h2>`:'<div class="empty">لسه مفيش بطل. سجّل أعلى نتيجة!</div>'}</div>
  <h2>🎮 أفضل اللاعبين</h2><div class="box">${topPlayers().map((p,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(p.u))}</span><b style="flex:1" data-u="${esc(p.u)}">${esc(userName(p.u))} ${badges(p.u).slice(-1).join('')}</b><span>${p.pts} نقطة</span></div>`).join('')||'<div class="empty">لسه مفيش نتائج</div>'}</div>
  <h2>🛠️ أفضل الصنّاع</h2><div class="box">${cl.map((c,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(c.u))}</span><b style="flex:1" data-u="${esc(c.u)}">${esc(userName(c.u))}</b><span>${c.n} لعبة · ▶ ${c.pl}</span></div>`).join('')||'<div class="empty">لسه مفيش صنّاع. انشر لعبة!</div>'}</div>`;
  (function(){const h=app.querySelector('h2');if(h)h.insertAdjacentHTML('afterend',friendsBoard())})();
  app.insertAdjacentHTML('beforeend',tourneyHistory());
  app.insertAdjacentHTML('beforeend','<div class="box" data-go="mod" style="cursor:pointer;text-align:center"><b>🛡️ لوحة البلاغات</b><div class="meta" style="justify-content:center">شفافية: الألعاب المبلّغ عنها وحالتها</div></div>');document.querySelectorAll('[data-go=mod]').forEach(e=>e.onclick=()=>go({t:'mod'}));
  app.insertAdjacentHTML('beforeend',platStats());
  $('#bk').onclick=()=>go({t:'home'});bindCards()};

/* ---------- round: gallery ---------- */
V.gallery=()=>{const g=allGames();const cats=[...new Set(g.map(x=>x.cat||'أخرى'))];
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2>🖼️ معرض الألعاب</h2><button class="btn gold" id="rnd" style="width:100%">🎲 اختار لي لعبة عشوائي</button><button class="btn ghost" id="mylists" style="width:100%;margin-top:8px">📚 قوائمي</button><input id="gq" placeholder="ابحث في المعرض..." style="margin-top:8px"><div class="meta" style="margin:8px 0">${g.length} لعبة في ${cats.length} أنواع</div>`+
  cats.map(c=>{const l=g.filter(x=>(x.cat||'أخرى')===c).sort((a,b)=>trending(b)-trending(a));return `<h2>${esc(c)} <span class="meta" style="display:inline">(${l.length})</span></h2><div class="shelf" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:8px">${l.map(x=>`<div data-g="${esc(x.id)}" class="box" style="min-width:120px;text-align:center;cursor:pointer;flex:none"><div style="font-size:38px">${esc(x.emo||'🎮')}</div><b style="font-size:13px">${esc(x.title)}</b><div class="meta" style="justify-content:center">▶ ${playsOf(x.id)}</div></div>`).join('')}</div>`}).join('');
  $('#mylists').onclick=()=>go({t:'lists'});$('#gq').oninput=e=>{const v=e.target.value.trim();document.querySelectorAll('.shelf .box').forEach(x=>{x.style.display=!v||x.innerText.includes(v)?'':'none'})};$('#bk').onclick=()=>go({t:'home'});$('#rnd').onclick=()=>{const x=g[Math.floor(Math.random()*g.length)];toast('🎲 '+x.title);go({t:'game',id:x.id})};bindCards()};

/* ---------- round: reports panel ---------- */
V.mod=()=>{const R=DB.reports||{};const l=vals(DB.games).map(g=>({g,n:Object.keys(R[g._k]||{}).length,mine:me&&(R[g._k]||{})[me.id]})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n);
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2>🛡️ لوحة البلاغات</h2><div class="box meta">أي لعبة بتوصل لـ 3 بلاغات بتختفي تلقائي من المنصة. تقدر تسحب بلاغك لو غيرت رأيك.</div>
  ${l.map(x=>`<div class="box"><b>${esc(x.g.emo||'🎮')} ${esc(x.g.title||'بدون اسم')}</b> <span class="meta" style="display:inline">· ${esc(userName(x.g.author))}</span><div class="meta">🚩 ${x.n} / 3 · ${x.n>=3?'⛔ مخفية':'⚠️ تحت المراجعة'}</div>${x.mine?`<button class="btn" data-w="${esc(x.g._k)}">سحب بلاغي</button>`:''}</div>`).join('')||'<div class="empty">مفيش بلاغات. المنصة نضيفة ✨</div>'}`;
  $('#bk').onclick=()=>go({t:'hall'});document.querySelectorAll('[data-w]').forEach(b=>b.onclick=async()=>{await dbSet(`reports/${b.dataset.w}/${me.id}`,null);toast('اتسحب البلاغ');render()})};

/* ---------- round: game of the day ---------- */
function spot(){return spot0()+explBox()+feedBox()}
function spot0(){const g=allGames();if(!g.length)return'';const d=Math.floor((Date.now()+2*36e5)/864e5);const x=g[(d*7+3)%g.length];const r=ratingOf(x.id);
  return `<div class="box dk" data-g="${esc(x.id)}" style="cursor:pointer;background:linear-gradient(135deg,#7c2d12,#4c1d95);border:1px solid #ffd24a;display:flex;gap:12px;align-items:center"><div style="font-size:46px">${esc(x.emo||'🎮')}</div><div style="flex:1"><div class="meta" style="color:#ffd24a">⭐ لعبة اليوم</div><b>${esc(x.title)}</b><div class="meta">▶ ${playsOf(x.id)}${r.n?' · ⭐ '+r.avg.toFixed(1):''}</div></div><button class="btn gold">العب</button></div>`};

/* ---------- round: weekly leaderboard tab ---------- */
function lbRows(sc){return podium(sc)+(sc.slice(0,10).map((s,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(s.u))}</span><b style="flex:1">${esc(s.name)} ${scoreLvl(s.score)}</b><span>${s.score}</span>${me&&s.u!==me.id?`<button class="btn sm ghost" data-ch="${esc(s.u)}" data-sc="${s.score}">⚔️ تحدّى</button>`:''}</div>`).join('')||'<div class="empty">مفيش نتائج '+'في الفترة دي</div>')}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-lbw]');if(!b||view.t!=='game')return;const g=allGames().find(x=>x.id===view.id);if(!g)return;const w=b.dataset.lbw==='1',since=Date.now()-6048e5;
  const sc=Object.entries((DB.scores||{})[g.id]||{}).map(([u,v])=>({u,...v})).filter(x=>!w||x.ts>=since).sort((a,b)=>b.score-a.score);
  document.querySelectorAll('[data-lbw]').forEach(x=>x.classList.toggle('on',x===b));const box=$('#lbr');if(box){box.innerHTML=lbRows(sc);box.querySelectorAll('[data-ch]').forEach(x=>x.onclick=()=>challengeDlg(g,x.dataset.ch,+x.dataset.sc))}});

/* ---------- round: explorer achievement + onboarding ---------- */
function playedSet(){try{return JSON.parse(localStorage.getItem('playhub_played')||'[]')}catch(e){return[]}}
function EXTL(){return [[3,'🧭 مستكشف'],[8,'🗺️ رحّالة'],[15,'🚀 خبير'],[25,'🌟 أسطورة الألعاب']]}
function markPlayed(id){const EXT=EXTL();const a=playedSet();if(a.indexOf(id)>=0)return;const before=EXT.filter(t=>a.length>=t[0]).length;a.push(id);localStorage.setItem('playhub_played',JSON.stringify(a));const t=EXT.filter(t=>a.length>=t[0]);if(t.length>before){toast('🎖️ إنجاز جديد: '+t[t.length-1][1]);try{confetti()}catch(e){}}}
function explBox(){const EXT=EXTL();const n=playedSet().length,tot=allGames().length,got=EXT.filter(t=>n>=t[0]).slice(-1)[0],nx=EXT.find(t=>n<t[0]);
  return `<div class="box"><div style="display:flex;justify-content:space-between"><b>🎖️ المستكشف</b><span class="meta">لعبت ${n} من ${tot} لعبة</span></div><div style="height:8px;background:#0006;border-radius:6px;margin:8px 0;overflow:hidden"><div style="height:100%;width:${Math.min(100,n/tot*100)}%;background:linear-gradient(90deg,var(--ac),#ffd24a)"></div></div><div class="meta">${got?'لقبك: '+got[1]+' · ':''}${nx?'العب '+(nx[0]-n)+' لعبة جديدة عشان توصل لـ '+nx[1]:'وصلت لأعلى لقب 🏆'}</div></div>`}
function tour(){if(localStorage.getItem('playhub_tour'))return;const S=[['🎮','أهلاً في ملعب','أكتر من 50 لعبة جاهزة تلعبها فوراً، وتقدر تنشر لعبتك الخاصة مجاناً.'],['🏆','نافس أصحابك','كل لعبة ليها لوحة متصدرين. سجّل نتيجتك وتحدّى غيرك.'],['🔥','مهام وإنجازات','العب كل يوم عشان تحافظ على سلسلتك وتكسب ألقاب وشارات.'],['🛠️','اصنع لعبتك','من تبويب النشر اعمل اختبار بدون كود أو ارفع لعبتك.']];let i=0;
  const d=document.createElement('div');d.id='tour';d.style.cssText='position:fixed;inset:0;z-index:200;background:#000b;display:flex;align-items:center;justify-content:center;padding:20px';document.body.appendChild(d);
  const draw=()=>{const s=S[i];d.innerHTML=`<div class="box dk" style="max-width:340px;width:100%;text-align:center;background:#1b1f45"><div style="font-size:56px">${s[0]}</div><h2 style="margin:8px 0">${s[1]}</h2><p>${s[2]}</p><div class="meta" style="justify-content:center">${S.map((x,k)=>k===i?'●':'○').join(' ')}</div><div style="display:flex;gap:8px;margin-top:12px"><button class="btn ghost" id="tk" style="flex:1">تخطي</button><button class="btn gold" id="tn" style="flex:1">${i<S.length-1?'التالي':'يلا نبدأ'}</button></div></div>`;
    const end=()=>{localStorage.setItem('playhub_tour','1');d.remove()};$('#tk').onclick=end;$('#tn').onclick=()=>{if(i<S.length-1){i++;draw()}else end()}};draw()}
setTimeout(()=>{try{tour()}catch(e){}},2600);

/* ---------- round: activity feed + polish ---------- */
(function(){const st=document.createElement('style');st.textContent='@keyframes vin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}#app>*{animation:vin .28s ease both}.btn{transition:transform .12s,filter .12s}.btn:active{transform:scale(.95)}.btn:hover{filter:brightness(1.1)}.feed .lb{animation:vin .4s ease both}';document.head.appendChild(st)})();
function ago(t){const m=Math.max(1,Math.round((Date.now()-t)/6e4));return m<60?'من '+m+' د':m<1440?'من '+Math.round(m/60)+' س':'من '+Math.round(m/1440)+' يوم'}
function feedBox(){const it=[];for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];if(e&&e.ts)it.push({gid,u,name:e.name,score:e.score,ts:e.ts})}
  it.sort((a,b)=>b.ts-a.ts);const l=it.slice(0,6);if(!l.length)return'';
  return `<h2>⚡ نشاط حديث</h2><div class="box feed">${l.map(x=>{const g=allGames().find(y=>y.id===x.gid);return `<div class="lb" data-g="${esc(x.gid)}" style="cursor:pointer"><span class="av">${esc(userAv(x.u))}</span><span style="flex:1"><b>${esc(x.name||userName(x.u))}</b> سجّل <b>${x.score}</b> في ${esc(g?g.title:'لعبة')}</span><span class="meta">${ago(x.ts)}</span></div>`}).join('')}</div>`}

/* ---------- round: personal playlists ---------- */
function lists(){try{return JSON.parse(localStorage.getItem('playhub_lists')||'{}')||{}}catch(e){return{}}}
function saveLists(L){localStorage.setItem('playhub_lists',JSON.stringify(L));try{mirrorLists(L)}catch(e){}}
V.lists=()=>{const L=lists(),all=allGames(),ks=Object.keys(L);
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2>📚 قوائمي</h2>`+(ks.map(k=>`<div class="box"><div style="display:flex;justify-content:space-between;align-items:center"><b>${esc(k)} <span class="meta" style="display:inline">(${L[k].length})</span></b><button class="btn sm ghost" data-dl="${esc(k)}">🗑️ مسح القائمة</button></div><div class="grid" style="margin-top:8px">${L[k].map(id=>all.find(x=>x.id===id)).filter(Boolean).map(card).join('')}</div></div>`).join('')||'<div class="empty">لسه معندكش قوائم. من صفحة أي لعبة اضغط "📚 أضف لقائمة".</div>');
  $('#bk').onclick=()=>go({t:'gallery'});document.querySelectorAll('[data-dl]').forEach(b=>b.onclick=()=>{if(!confirm('تمسح القائمة "'+b.dataset.dl+'"؟'))return;const L2=lists();delete L2[b.dataset.dl];saveLists(L2);V.lists()});bindCards()};

/* ---------- round: in-app text dialog ---------- */
function askText(title,sub,def,mx){return new Promise(res=>{const d=document.createElement('div');d.style.cssText='position:fixed;inset:0;z-index:300;background:#000b;display:flex;align-items:center;justify-content:center;padding:20px';d.innerHTML=`<div class="box dk" style="max-width:340px;width:100%;background:#1b1f45"><h2 style="margin:0 0 6px">${esc(title)}</h2><div class="meta" style="margin-bottom:8px">${esc(sub||'')}</div><input id="atx" maxlength="${mx||100}" autocomplete="off"><div style="display:flex;gap:8px;margin-top:12px"><button class="btn ghost" id="atc" style="flex:1">إلغاء</button><button class="btn gold" id="ato" style="flex:1">تمام</button></div></div>`;document.body.appendChild(d);const i=d.querySelector('#atx');i.value=def||'';i.focus();const done=v=>{d.remove();res(v)};d.querySelector('#atc').onclick=()=>done(null);d.querySelector('#ato').onclick=()=>done(i.value);i.onkeydown=e=>{if(e.key==='Enter')done(i.value)}})}

/* ---------- round: real backend features (shared lists, challenge links, tournament history) ---------- */
function lkey(n){let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;return 'l'+h.toString(36)}
function mirrorLists(L){if(!me||!ONLINE)return;const mine=(DB.lists||{})[me.id]||{};
  for(const n of Object.keys(L)){if(!L[n].length)continue;const key=lkey(n);dbSet(`lists/${me.id}/${key}`,{name:n.slice(0,40),ids:L[n].slice(0,60),owner:me.id,ts:Date.now()})}
  for(const key in mine){if(!Object.keys(L).some(n=>lkey(n)===key))dbSet(`lists/${me.id}/${key}`,null)}}
function listLink(n){return location.href.split('#')[0].split('?')[0]+'?l='+encodeURIComponent(me.id)+'~'+lkey(n)}
V.slist=()=>{const l=((DB.lists||{})[view.u]||{})[view.k];
  if(!l){app.innerHTML='<button class="back" id="bk">→ رجوع</button><div class="empty">القائمة دي مش موجودة أو لسه بتتحمّل...</div>';$('#bk').onclick=()=>go({t:'home'});return}
  const all=allGames();app.innerHTML=`<button class="back" id="bk">→ رجوع</button><h2>📚 ${esc(l.name)}</h2><div class="meta" style="margin-bottom:8px">قائمة من ${esc(userName(view.u))} · ${(l.ids||[]).length} لعبة</div><div class="grid">${(l.ids||[]).map(id=>all.find(x=>x.id===id)).filter(Boolean).map(card).join('')||'<div class="empty">مفيش ألعاب متاحة</div>'}</div>`;
  $('#bk').onclick=()=>go({t:'home'});bindCards()};
(function(){const o=V.lists;V.lists=()=>{o();if(!me||!ONLINE)return;const L=lists();document.querySelectorAll('[data-dl]').forEach(b=>{const n=b.dataset.dl;const sb=document.createElement('button');sb.className='btn sm gold';sb.textContent='🔗 شارك';sb.style.marginInlineEnd='6px';sb.onclick=async()=>{mirrorLists(lists());const u=listLink(n);if(navigator.share){try{await navigator.share({title:n,url:u});return}catch(e){}}try{await navigator.clipboard.writeText(u);toast('اتنسخ رابط القائمة 🔗')}catch(e){prompt('انسخ الرابط',u)}};b.parentNode.insertBefore(sb,b)})}})();
async function makeClink(g){if(!need())return;const mine=((DB.scores||{})[g.id]||{})[me.id];if(!mine){toast('سجّل نتيجة في اللعبة الأول');return}
  const id=await dbPush('clinks',{from:me.id,fromName:me.name,gid:g.id,gtitle:g.title,score:mine.score,ts:Date.now()});
  const u=location.href.split('#')[0].split('?')[0]+'?g='+encodeURIComponent(g.id)+'&c='+id+'&sc='+mine.score+'&by='+encodeURIComponent(me.name);
  const t=me.name+' بيتحداك تكسر '+mine.score+' في '+g.title+'! '+u;
  if(navigator.share){try{await navigator.share({text:t});return}catch(e){}}
  try{await navigator.clipboard.writeText(t);toast('اتنسخ رابط التحدي ⚔️')}catch(e){prompt('انسخ الرابط',t)}}
(function(){const og=V.game;V.game=()=>{og();if(!view.cl)return;const c=((DB.clinks||{})[view.cl]);if(!c)return;const r=Object.entries(c.results||{}).map(([u,v])=>({u,...v})).sort((a,b)=>b.score-a.score);
  const box=document.createElement('div');box.className='box';box.style.border='1px solid var(--ac)';box.innerHTML=`<b>⚔️ تحدي من ${esc(c.fromName||'')}: اكسر ${c.score}</b>${r.length?'<div style="margin-top:6px">'+r.slice(0,10).map((x,i)=>`<div class="lb"><span class="n">${i+1}</span><b style="flex:1">${esc(x.name||userName(x.u))}</b><span>${x.score}${x.score>c.score?' ✅':''}</span></div>`).join('')+'</div>':'<div class="meta">لسه محدش رد على التحدي</div>'}`;
  if(me&&c.from!==me.id){const rb=document.createElement('button');rb.className='btn sm gold';rb.style.marginTop='8px';rb.textContent='↩️ رد بتحدي جديد';rb.onclick=()=>{const b=document.getElementById('cl');if(b)b.click()};box.appendChild(rb)}
  const h=app.querySelector('h2');if(h)h.parentNode.insertBefore(box,h.nextSibling)}})();
function cloudAfterScore(g,sc){if(!me||!ONLINE)return;if(view.cl&&(DB.clinks||{})[view.cl]){const cur=(((DB.clinks[view.cl]||{}).results||{})[me.id]||{}).score||0;if(sc>cur)dbSet(`clinks/${view.cl}/results/${me.id}`,{name:me.name,score:sc,ts:Date.now()})}
  if(g.id===tgame().id){const wk=Math.floor(Date.now()/6048e5),cur=(((DB.tourneys||{})[wk]||{})[me.id]||{}).score||0;if(sc>cur)dbSet(`tourneys/${wk}/${me.id}`,{name:me.name,score:sc,gid:g.id,ts:Date.now()})}}
function tourneyHistory(){const T=DB.tourneys||{};const wks=Object.keys(T).sort((a,b)=>b-a).slice(0,8);
  const rows=wks.map(w=>{const e=Object.entries(T[w]||{}).map(([u,v])=>({u,...v})).sort((a,b)=>b.score-a.score);if(!e.length)return'';const g=allGames().find(x=>x.id===e[0].gid)||{};const d=new Date(w*6048e5);return `<div class="lb"><span class="n">🏅</span><span class="av">${esc(userAv(e[0].u))}</span><b style="flex:1" data-u="${esc(e[0].u)}">${esc(e[0].name||userName(e[0].u))}</b><span class="meta">${esc(g.title||'')} · ${e[0].score}</span><span class="meta">${d.getMonth()+1}/${d.getDate()}</span></div>`}).join('');
  return `<h2>📜 تاريخ البطولات</h2><div class="box">${rows||'<div class="empty">لسه مفيش بطولات اتسجلت. العب بطولة الأسبوع!</div>'}</div>`}

document.addEventListener('click',e=>{const p=e.target.closest&&e.target.closest('[data-pl]');if(p){const [u,k]=p.dataset.pl.split('~');go({t:'slist',u,k})}});

(function(){const o=V.me;V.me=()=>{o();if(!me)return;try{const all=allGames(),S=DB.scores||{};const played=playedSet().filter(id=>all.some(g=>g.id===id));
  let firsts=0,tot=0;for(const g in S){const m=S[g][me.id];if(!m)continue;tot++;const best=Math.max(...Object.values(S[g]).map(x=>+x.score||0));if((+m.score||0)>=best)firsts++}
  const cc={};played.forEach(id=>{const g=all.find(x=>x.id===id);cc[g.cat]=(cc[g.cat]||0)+1});const fav=Object.entries(cc).sort((a,b)=>b[1]-a[1])[0];
  const box=document.createElement('div');box.className='box';box.innerHTML=`<b>📊 إحصائياتي</b><div class="meta" style="display:block;line-height:2;margin-top:6px">🎮 لعبت ${played.length} لعبة من ${all.length}<br>🏆 ليك نتيجة في ${tot} لعبة، وإنت الأول في ${firsts}<br>${fav?'❤️ أكتر فئة بتلعبها: '+esc(fav[0])+' ('+fav[1]+')':'ابدأ العب عشان تظهر إحصائياتك'}</div>`;
  const first=app.querySelector('.box');if(first)first.after(box)}catch(e){}}})();

function nrm(s){return String(s||'').toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي')}
function srch(x,q){const h=nrm(x.title+' '+x.desc+' '+(x.tags||'')+' '+x.cat+' '+userName(x.author));return nrm(q).split(/\s+/).filter(Boolean).every(w=>h.includes(w))}

function ariaFix(){const L={bell:'الإشعارات',thm:'تبديل الوضع الفاتح والداكن',meBtn:'ملفي'};for(const id in L){const e=document.getElementById(id);if(e&&!e.getAttribute('aria-label'))e.setAttribute('aria-label',L[id])}document.querySelectorAll('nav button').forEach(b=>{if(!b.getAttribute('aria-label'))b.setAttribute('aria-label',b.textContent.trim())});document.querySelectorAll('.stars button,[data-star]').forEach(b=>{if(!b.getAttribute('aria-label'))b.setAttribute('aria-label','تقييم '+(b.dataset.star||b.textContent.trim()))});const a=document.getElementById('app');if(a&&!a.getAttribute('aria-live'))a.setAttribute('aria-live','polite')}
(function(){const o=renderNav;renderNav=function(){o.apply(this,arguments);ariaFix()}})();
new MutationObserver(()=>{clearTimeout(window.__af);window.__af=setTimeout(ariaFix,200)}).observe(document.body,{childList:true,subtree:true});ariaFix();

(function(){const og=V.game;V.game=()=>{og();try{const g=allGames().find(x=>x.id===view.id);if(!g||!app.querySelector('.frame,#fr'))return;
  const rel=allGames().filter(x=>x.id!==g.id&&x.cat===g.cat).sort((a,b)=>ratingOf(b.id).avg-ratingOf(a.id).avg||String(a.id).localeCompare(String(b.id))).slice(0,6);if(!rel.length||app.querySelector('#relrow'))return;
  const d=document.createElement('div');d.id='relrow';d.innerHTML=`<h2>🎯 ألعاب شبه دي</h2><div class="row">${rel.map(card).join('')}</div>`;app.appendChild(d);bindCards()}catch(e){}}})();

const TIPS={'ألغاز':'خد وقتك وفكّر قبل ما تضغط. الغلطة بتكلّف أكتر من البطء.','أكشن':'ركّز على الشاشة كلها مش على نقطة واحدة، وجرّب تلعب بصباع واحد.','تحدي':'السرعة مهمة، بس الدقة بتكسبك نقاط أكتر. إبدأ بهدوء وزوّد.','عائلي':'العبها مع حد من العيلة وقارنوا النتايج بتحدي برابط.','استراتيجية':'فكّر في الحركة اللي بعد الحركة. الروبوت بيتعلم من غلطاتك.'};
const GT={b_stopwatch:'عدّ في دماغك: واحد، اتنين، تلاتة... ما تعتمدش على العدّاد.',b_hold3:'اعتمد على إحساسك بالوقت، وجرّب تعدّ بصوت واطي.',b_flap:'اضغط ضغطات خفيفة ومتباعدة بدل ما تضغط بسرعة.',b_stack:'استنى لحظة قبل ما تنزّل الطابق وخلّي عينك على الحافة.',b_snake:'خلّي الثعبان جنب الحيط وبعيد عن نفسه لحد ما تحتاج تلف.',b_t2048:'خلّي أكبر رقم في ركن واحد وما تغيّرش الاتجاه كتير.',b_mines:'ابدأ من الأرقام 1 اللي حواليها خانة مجهولة واحدة.',b_typing:'اتعلم تكتب من غير ما تبص على الكيبورد، والدقة قبل السرعة.',b_react:'ما تخمّنش. استنى اللون يتغيّر وبعدين اضغط.',b_bar:'بص على الخط وهو داخل مش وهو في النص عشان زمن رد الفعل.'};
(function(){const og=V.game;V.game=()=>{og();try{const g=allGames().find(x=>x.id===view.id);if(!g||!g.seed||app.querySelector('#tipbox'))return;const t=GT[g.id]||TIPS[g.cat];if(!t)return;const fr=app.querySelector('.box');if(!fr)return;
  const d=document.createElement('div');d.id='tipbox';d.className='meta';d.style.cssText='display:block;margin:4px 2px 8px';d.textContent='💡 نصيحة: '+t;fr.after(d)}catch(e){}}})();
