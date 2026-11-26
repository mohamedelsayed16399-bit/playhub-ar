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
async function dbSync(){if(!ONLINE||PEND)return;try{const r=await fetch(await furl(''));if(!r.ok||PEND)return;const j=await r.json();if(PEND)return;DB=(j&&typeof j==='object')?j:{};saveLocal();return true}catch(e){}}
loadLocal();

/* ---------- state ---------- */
if(localStorage.getItem('playhub_theme')==='light')document.body.classList.add('light');
let me=JSON.parse(localStorage.getItem('playhub_me')||'null');
let view={t:'home'},cat='الكل',q='';
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
const vals=o=>o?Object.entries(o).map(([k,v])=>({...v,_k:k})):[];
const BUILTIN=[{"id":"b_react","title":"اختبار الريفلكس","desc":"اضغط أول ما الشاشة تخضّر. 5 جولات، وكل ما كنت أسرع نقاطك أعلى. نتيجتك بتتسجل تلقائي.","cat":"تحدي","emo":"⚡","author":"instinct","authorName":"ملعب","ts":1764100000000,"seed":1,"html":"<!doctype html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>*{box-sizing:border-box;touch-action:manipulation}body{margin:0;background:#12142a;color:#fff;font-family:system-ui,sans-serif;text-align:center;user-select:none;-webkit-user-select:none}h3{margin:10px}button{font:inherit}.b{background:#7c5cff;color:#fff;border:0;border-radius:12px;padding:10px 22px;font-size:18px}#p{margin:10px auto;width:92%;height:300px;border-radius:20px;background:#46a;display:flex;align-items:center;justify-content:center;font-size:24px}</style></head><body>\n<h3 id=t>اختبار الريفلكس: 5 جولات</h3><div id=p>اضغط للبدء</div><div id=r style=\"margin:8px;min-height:24px\"></div>\n<script>\nvar n=0,tot=0,st=0,state=0,to,p=document.getElementById(\"p\"),t=document.getElementById(\"t\"),r=document.getElementById(\"r\");\nfunction wait(){state=1;p.style.background=\"#a33\";p.textContent=\"استنى اللون يخضر...\";to=setTimeout(function(){state=2;st=Date.now();p.style.background=\"#2a9d4a\";p.textContent=\"اضغط دلوقتي!\"},1000+Math.random()*3000)}\np.onclick=function(){\n if(state===0){n=0;tot=0;r.textContent=\"\";t.textContent=\"جولة 1/5\";wait();return}\n if(state===1){clearTimeout(to);r.textContent=\"بدري! الجولة بتتعاد\";wait();return}\n if(state===2){var ms=Date.now()-st,pt=Math.max(0,1000-ms);tot+=pt;n++;r.textContent=\"سرعتك \"+ms+\" مللي ثانية (+\"+pt+\" نقطة)\";\n  if(n>=5){state=0;p.style.background=\"#46a\";p.textContent=\"النتيجة \"+tot+\". اضغط للإعادة\";t.textContent=\"خلصت!\";parent.postMessage({type:\"playhub-score\",score:tot},\"*\");return}\n  t.textContent=\"جولة \"+(n+1)+\"/5\";wait()}};\n</script></body></html>\n"},
{"id":"b_simon","title":"ذاكرة الألوان","desc":"احفظ تسلسل الألوان وكرره. كل مستوى بيزوّد لون. كام مستوى توصل؟","cat":"ألغاز","emo":"🧠","author":"instinct","authorName":"ملعب","ts":1764100000001,"seed":1,"html":"<!doctype html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>*{box-sizing:border-box;touch-action:manipulation}body{margin:0;background:#12142a;color:#fff;font-family:system-ui,sans-serif;text-align:center;user-select:none;-webkit-user-select:none}h3{margin:10px}button{font:inherit}.b{background:#7c5cff;color:#fff;border:0;border-radius:12px;padding:10px 22px;font-size:18px}.c{height:120px;border-radius:18px;opacity:.5;border:0}.c.on{opacity:1;box-shadow:0 0 30px #fff}#g{display:grid;grid-template-columns:1fr 1fr;gap:12px;width:90%;max-width:360px;margin:12px auto}</style></head><body>\n<h3 id=t>ذاكرة الألوان</h3><div id=g></div><button class=b id=s>ابدأ</button>\n<script>\nvar cols=[\"#e74c3c\",\"#2ecc71\",\"#3498db\",\"#f1c40f\"],seq=[],pos=0,lock=true,g=document.getElementById(\"g\"),t=document.getElementById(\"t\"),bs=[];\ncols.forEach(function(c,i){var b=document.createElement(\"button\");b.className=\"c\";b.style.background=c;b.onclick=function(){press(i)};g.appendChild(b);bs.push(b)});\nfunction flash(i,d){bs[i].classList.add(\"on\");setTimeout(function(){bs[i].classList.remove(\"on\")},d||350)}\nfunction play(){lock=true;t.textContent=\"المستوى \"+seq.length+\": شوف\";var k=0;var iv=setInterval(function(){if(k>=seq.length){clearInterval(iv);lock=false;pos=0;t.textContent=\"المستوى \"+seq.length+\": دورك\";return}flash(seq[k]);k++},650)}\nfunction next(){seq.push(Math.floor(Math.random()*4));setTimeout(play,600)}\nfunction press(i){if(lock)return;flash(i,150);if(seq[pos]===i){pos++;if(pos===seq.length){lock=true;next()}}else{lock=true;var lv=seq.length-1;t.textContent=\"غلطت! وصلت مستوى \"+lv;parent.postMessage({type:\"playhub-score\",score:lv*100},\"*\");document.getElementById(\"s\").style.display=\"\"}}\ndocument.getElementById(\"s\").onclick=function(){seq=[];this.style.display=\"none\";next()};\n</script></body></html>\n"},
{"id":"b_bubbles","title":"صيد الفقاعات","desc":"30 ثانية تفقع فيها أكبر عدد من الفقاعات. الصغيرة بنقاط أكتر.","cat":"أكشن","emo":"🫧","author":"instinct","authorName":"ملعب","ts":1764100000002,"seed":1,"html":"<!doctype html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>*{box-sizing:border-box;touch-action:manipulation}body{margin:0;background:#12142a;color:#fff;font-family:system-ui,sans-serif;text-align:center;user-select:none;-webkit-user-select:none}h3{margin:10px}button{font:inherit}.b{background:#7c5cff;color:#fff;border:0;border-radius:12px;padding:10px 22px;font-size:18px}#a{position:relative;margin:8px auto;width:94%;height:420px;background:#1b1f45;border-radius:20px;overflow:hidden}.bb{position:absolute;border-radius:50%;border:0;box-shadow:inset -6px -6px 12px #0004}</style></head><body>\n<h3><span id=t>30</span> ث · نقاط: <span id=sc>0</span></h3><div id=a></div><button class=b id=s>ابدأ</button>\n<script>\nvar a=document.getElementById(\"a\"),sc=0,left=30,run=false,iv,sp;\nfunction mk(){if(!run)return;var d=34+Math.random()*40,b=document.createElement(\"button\");b.className=\"bb\";b.style.width=b.style.height=d+\"px\";b.style.left=Math.random()*(a.clientWidth-d)+\"px\";b.style.top=Math.random()*(a.clientHeight-d)+\"px\";b.style.background=\"hsl(\"+Math.random()*360+\",80%,60%)\";\n var pts=d<50?3:d<65?2:1;b.onclick=function(){sc+=pts;document.getElementById(\"sc\").textContent=sc;b.remove()};a.appendChild(b);setTimeout(function(){b.remove()},1100)}\ndocument.getElementById(\"s\").onclick=function(){this.style.display=\"none\";a.innerHTML=\"\";sc=0;left=30;run=true;document.getElementById(\"sc\").textContent=0;\n sp=setInterval(mk,420);iv=setInterval(function(){left--;document.getElementById(\"t\").textContent=left;if(left<=0){clearInterval(iv);clearInterval(sp);run=false;a.innerHTML=\"<h2 style=margin-top:150px>النتيجة \"+sc+\"</h2>\";document.getElementById(\"s\").style.display=\"\";document.getElementById(\"s\").textContent=\"العب تاني\";parent.postMessage({type:\"playhub-score\",score:sc},\"*\")}},1000)};\n</script></body></html>\n"},
{"id":"b_math","title":"سباق الحساب","desc":"30 ثانية تحل فيها أكبر عدد من المسائل. الإجابات المتتالية بتديك نقاط زيادة.","cat":"تحدي","emo":"🔢","author":"instinct","authorName":"ملعب","ts":1764100000003,"seed":1,"html":"<!doctype html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>*{box-sizing:border-box;touch-action:manipulation}body{margin:0;background:#12142a;color:#fff;font-family:system-ui,sans-serif;text-align:center;user-select:none;-webkit-user-select:none}h3{margin:10px}button{font:inherit}.b{background:#7c5cff;color:#fff;border:0;border-radius:12px;padding:10px 22px;font-size:18px}#q{font-size:44px;margin:24px 0;direction:ltr}.o{display:inline-block;width:42%;margin:6px;padding:16px;font-size:26px;background:#2a2f66;color:#fff;border:0;border-radius:14px}</style></head><body>\n<h3><span id=t>30</span> ث · نقاط: <span id=sc>0</span> · 🔥 <span id=cb>0</span></h3><div id=q>؟</div><div id=os></div><button class=b id=s>ابدأ</button>\n<script>\nvar sc=0,left=30,cb=0,ans=0,run=false,iv;\nfunction ask(){var a=2+Math.floor(Math.random()*(8+sc/3)),b=2+Math.floor(Math.random()*9),op=Math.random()<.5?\"+\":\"×\";ans=op==\"+\"?a+b:a*b;document.getElementById(\"q\").textContent=a+\" \"+op+\" \"+b;\n var o=[ans],i;while(o.length<4){var w=ans+Math.floor(Math.random()*11)-5;if(w>0&&o.indexOf(w)<0)o.push(w)}o.sort(function(){return Math.random()-.5});\n var h=\"\";o.forEach(function(v){h+='<button class=o data-v='+v+'>'+v+'</button>'});var e=document.getElementById(\"os\");e.innerHTML=h;\n [].forEach.call(e.children,function(b){b.onclick=function(){if(!run)return;if(+b.dataset.v==ans){cb++;sc+=10+Math.min(cb,10)}else{cb=0;sc=Math.max(0,sc-5)}document.getElementById(\"sc\").textContent=sc;document.getElementById(\"cb\").textContent=cb;ask()}})}\ndocument.getElementById(\"s\").onclick=function(){this.style.display=\"none\";sc=0;cb=0;left=30;run=true;document.getElementById(\"sc\").textContent=0;ask();\n iv=setInterval(function(){left--;document.getElementById(\"t\").textContent=left;if(left<=0){clearInterval(iv);run=false;document.getElementById(\"os\").innerHTML=\"\";document.getElementById(\"q\").textContent=\"النتيجة \"+sc;var s=document.getElementById(\"s\");s.style.display=\"\";s.textContent=\"العب تاني\";parent.postMessage({type:\"playhub-score\",score:sc},\"*\")}},1000)};\n</script></body></html>\n"},
{"id":"b_snake","title":"الثعبان","desc":"كُل التفاح وكبّر ثعبانك. اسحب بصباعك أو استخدم الأسهم. ما تخبطش في الحيط!","cat":"أكشن","emo":"🐍","author":"instinct","authorName":"ملعب","ts":1764100000004,"seed":1,"html":"<!doctype html><html lang=\"ar\" dir=\"rtl\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>*{box-sizing:border-box;touch-action:manipulation}body{margin:0;background:#12142a;color:#fff;font-family:system-ui,sans-serif;text-align:center;user-select:none;-webkit-user-select:none}h3{margin:10px}button{font:inherit}.b{background:#7c5cff;color:#fff;border:0;border-radius:12px;padding:10px 22px;font-size:18px} canvas{background:#1b1f45;border-radius:16px;margin:8px auto;display:block;max-width:94vw}</style></head><body>\n<h3>نقاط: <span id=sc>0</span></h3><canvas id=c width=300 height=300></canvas><div style=\"margin:6px\"><button class=b id=u>▲</button></div><div><button class=b id=l>◀</button> <button class=b id=d>▼</button> <button class=b id=r>▶</button></div><button class=b id=s style=\"margin-top:8px\">ابدأ</button>\n<script>\nvar c=document.getElementById(\"c\"),x=c.getContext(\"2d\"),N=15,S=20,sn,dir,nd,fd,sc,iv,run=false;\nfunction put(){do{fd={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)}}while(sn.some(function(p){return p.x==fd.x&&p.y==fd.y}))}\nfunction draw(){x.fillStyle=\"#1b1f45\";x.fillRect(0,0,300,300);x.fillStyle=\"#ff5577\";x.fillRect(fd.x*S+2,fd.y*S+2,S-4,S-4);x.fillStyle=\"#3ddc84\";sn.forEach(function(p,i){x.fillRect(p.x*S+1,p.y*S+1,S-2,S-2)})}\nfunction end(){clearInterval(iv);run=false;x.fillStyle=\"rgba(0,0,0,.6)\";x.fillRect(0,0,300,300);x.fillStyle=\"#fff\";x.font=\"28px sans-serif\";x.textAlign=\"center\";x.fillText(\"انتهت: \"+sc,150,155);document.getElementById(\"s\").style.display=\"\";document.getElementById(\"s\").textContent=\"العب تاني\";parent.postMessage({type:\"playhub-score\",score:sc},\"*\")}\nfunction tick(){dir=nd;var h={x:sn[0].x+dir.x,y:sn[0].y+dir.y};if(h.x<0||h.y<0||h.x>=N||h.y>=N||sn.some(function(p){return p.x==h.x&&p.y==h.y}))return end();sn.unshift(h);if(h.x==fd.x&&h.y==fd.y){sc+=10;document.getElementById(\"sc\").textContent=sc;put();clearInterval(iv);iv=setInterval(tick,Math.max(60,140-sc/2))}else sn.pop();draw()}\nfunction turn(a,b){if(dir.x+a==0&&dir.y+b==0)return;nd={x:a,y:b}}\ndocument.getElementById(\"u\").onclick=function(){turn(0,-1)};document.getElementById(\"d\").onclick=function(){turn(0,1)};document.getElementById(\"l\").onclick=function(){turn(-1,0)};document.getElementById(\"r\").onclick=function(){turn(1,0)};\naddEventListener(\"keydown\",function(e){var k={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(k){turn(k[0],k[1]);e.preventDefault()}});\nvar tx,ty;c.addEventListener(\"touchstart\",function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY});c.addEventListener(\"touchend\",function(e){var a=e.changedTouches[0].clientX-tx,b=e.changedTouches[0].clientY-ty;if(Math.abs(a)>Math.abs(b))turn(a>0?1:-1,0);else turn(0,b>0?1:-1)});\ndocument.getElementById(\"s\").onclick=function(){this.style.display=\"none\";sn=[{x:7,y:7},{x:6,y:7},{x:5,y:7}];dir=nd={x:1,y:0};sc=0;document.getElementById(\"sc\").textContent=0;put();draw();run=true;iv=setInterval(tick,140)};\n</script></body></html>\n"}];SEED.push(...BUILTIN);
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
  if(gs>=1)b.push('🛠️ صانع');if(gs>=3)b.push('🏭 منتج');if(sc>=1)b.push('🎯 لاعب');if(sc>=5)b.push('🔥 محترف');if(top>=1)b.push('👑 بطل لعبة');if(followers(u)>=3)b.push('⭐ مشهور');if(champ()===u)b.push('👑 بطل الأسبوع');if(tchamp()===u)b.push('🏅 بطل البطولة');return b}
function activity(){const a=[];for(const g of vals(DB.games))a.push({ts:g.ts,t:`🆕 ${esc(userName(g.author))} نشر <b>${esc(g.title)}</b>`,g:g._k});
  for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];const g=allGames().find(x=>x.id===gid);if(g)a.push({ts:e.ts||0,t:`🏆 ${esc(e.name)} سجّل ${e.score} في <b>${esc(g.title)}</b>`,g:gid})}
  for(const gid in DB.comments||{})for(const c of vals(DB.comments[gid])){const g=allGames().find(x=>x.id===gid);if(g)a.push({ts:c.ts,t:`💬 ${esc(c.name)} علّق على <b>${esc(g.title)}</b>`,g:gid})}
  return a.sort((x,y)=>y.ts-x.ts).slice(0,8)}
function trending(g){const r=ratingOf(g.id);return playsOf(g.id)*1+r.avg*r.n*3+(g.seed?0:5)+(Date.now()-g.ts<864e5*3?4:0)}

/* ---------- cards ---------- */
function cover(g,c){let h=0;for(const ch of g.id+g.title)h=(h*31+ch.charCodeAt(0))>>>0;const a=h%360,b=(a+60)%360;
  return `radial-gradient(circle at ${h%90}% ${(h>>3)%80}%,hsla(${a},80%,60%,.55),transparent 45%),radial-gradient(circle at ${(h>>5)%100}% 90%,hsla(${b},80%,55%,.5),transparent 50%),linear-gradient(135deg,${c},#0f1226)`}
function card(g){g.title=g.title||'بدون اسم';g.cat=g.cat||'أخرى';g.desc=g.desc||'';const r=ratingOf(g.id);const c=COL[(g.title.length+g.cat.length)%COL.length];
  return `<div class="card" data-g="${esc(g.id)}"><div class="thumb" style="background:${g.img?`url('${esc(g.img)}') center/cover`:cover(g,c)}">${g.img?'':`<span style="text-shadow:0 4px 14px #000a">${esc(g.emo||'🎮')}</span>`}</div><div class="cb"><h3>${esc(g.title)}</h3>
  <div class="meta"><span class="star">${r.n?stars(r.avg):'☆☆☆☆☆'}</span><span>${r.n?r.avg.toFixed(1)+' ('+r.n+')':'جديد'}</span><span>▶ ${playsOf(g.id)}</span></div>
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
  ${newFromFollowed()}
  ${localStorage.getItem('playhub_tut')?'':`<div class="box" id="tut" style="border:1px dashed var(--ac)"><b>👋 إزاي تستخدم ملعب؟</b><div class="meta" style="display:block;line-height:1.9;margin-top:6px">1) سجّل اسمك من "ملفي".<br>2) افتح أي لعبة واضغط "العب الآن".<br>3) سجّل نتيجتك وتحدّى اللي قدامك في المتصدرين.<br>4) انشر لعبتك من تبويب "انشر" وخلّي الناس تقيّمها.</div><button class="btn sm gold" id="tutx" style="margin-top:8px">تمام، فهمت</button></div>`}
  ${dailyBox()}
  ${tourney()}
  ${season()}
  <div class="box" data-go="hall" style="cursor:pointer;text-align:center"><b>🏛️ قاعة المشاهير</b><div class="meta" style="justify-content:center">أفضل اللاعبين وأفضل الصنّاع وبطل الأسبوع</div></div>
  <h2>🧭 التصنيفات</h2><div class="tiles">${CATS.map(c=>`<div class="tile" data-cat="${c}"><b>${{'أكشن':'💥','تحدي':'🎯','ألغاز':'🧩','سباق':'🏁','استراتيجية':'♟️','عائلي':'👨‍👩‍👧','أخرى':'✨'}[c]}</b>${c}<br><small>${g.filter(x=>x.cat===c).length} لعبة</small></div>`).join('')}</div>
  ${weekly()}
  ${myInbox().length?`<div class="box" id="chb" style="background:#3a1f2a;border:1px solid var(--bad);cursor:pointer"><b>⚔️ عندك ${myInbox().length} تحدي جديد!</b><div class="meta">اضغط لتشوفهم</div></div>`:''}
  ${recentRow()}
  <h2>🔥 الأكثر رواجاً</h2><div class="row">${top.map(card).join('')}</div>
  ${fol.length?`<h2>👥 من تتابعهم</h2><div class="row">${fol.map(card).join('')}</div>`:''}
  ${fresh.length?`<h2>🆕 جديد من اللاعبين</h2><div class="row">${fresh.map(card).join('')}</div>`:''}
  ${best.length?`<h2>⭐ الأعلى تقييماً</h2><div class="row">${best.map(card).join('')}</div>`:''}
  ${act.length?`<h2>⚡ آخر النشاط</h2><div class="box">${act.map(a=>`<div class="cm" data-g="${esc(a.g)}" style="cursor:pointer">${a.t}</div>`).join('')}</div>`:''}
  <h2>🏆 أفضل اللاعبين</h2><div class="box">${topPlayers().map((p,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(p.u))}</span><b style="flex:1" data-u="${esc(p.u)}">${esc(userName(p.u))}</b><span>${p.pts} نقطة</span></div>`).join('')||'<div class="empty">لسه مفيش نتائج. كن أول واحد يسجّل!</div>'}</div>`;bindCards();document.querySelectorAll('[data-tg]').forEach(e=>e.onclick=()=>go({t:'game',id:e.dataset.tg}));document.querySelectorAll('[data-go]').forEach(e=>e.onclick=()=>go({t:e.dataset.go}));document.querySelectorAll('[data-cat]').forEach(e=>e.onclick=()=>{cat=e.dataset.cat;go({t:'explore'})});const tx=$('#tutx');if(tx)tx.onclick=()=>{localStorage.setItem('playhub_tut','1');$('#tut').remove()};const cb=$('#chb');if(cb)cb.onclick=()=>go({t:'chal'})};
function newFromFollowed(){if(!me)return '';const last=+localStorage.getItem('playhub_last')||0;const n=allGames().filter(g=>!g.seed&&g.ts>last&&isFollowing(g.author));
  return n.length?`<div class="box" style="border:1px solid var(--ok)"><b>🆕 ${n.length} لعبة جديدة ممن تتابعهم</b>${n.slice(0,3).map(g=>`<div class="cm" data-g="${esc(g.id)}" style="cursor:pointer">${esc(g.emo||'🎮')} ${esc(g.title)} · ${esc(userName(g.author))}</div>`).join('')}</div>`:''}
function season(){const d=new Date(),end=new Date(d);end.setDate(d.getDate()+((7-d.getDay())%7||7));end.setHours(0,0,0,0);const left=Math.max(1,Math.ceil((end-d)/864e5));const wk=Math.ceil((d-new Date(d.getFullYear(),0,1))/6048e5);
  return `<div class="season">🏆 موسم الأسبوع ${wk}<small>باقي ${left} يوم. صاحب أعلى نتيجة هذا الأسبوع بياخد لقب 👑 بطل الأسبوع. العب وسجّل نتيجتك!</small>${champ()?`<small>👑 بطل الأسبوع الحالي: <b>${esc(userName(champ()))}</b></small>`:''}</div>`}
function weekly(){const w=[];const since=Date.now()-6048e5;for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];if(e.ts>=since)w.push({u,name:e.name,score:e.score,gid})}
  const best=w.sort((a,b)=>b.score-a.score).slice(0,5);if(!best.length)return '';
  return `<h2>📅 بطولة الأسبوع</h2><div class="box">${best.map((b,i)=>{const g=allGames().find(x=>x.id===b.gid)||{};return `<div class="lb" data-g="${esc(b.gid)}" style="cursor:pointer"><span class="n">${['🥇','🥈','🥉','4','5'][i]}</span><b style="flex:1">${esc(b.name)}<div class="meta">${esc(g.title||'')}</div></b><span>${b.score}</span></div>`}).join('')}</div>`}
function topPlayers(){const m={};for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const rk=Object.entries(DB.scores[gid]).sort((a,b)=>b[1].score-a[1].score).findIndex(x=>x[0]===u);m[u]=(m[u]||0)+[10,6,3][rk]||0}
  return Object.entries(m).map(([u,pts])=>({u,pts})).filter(x=>x.pts).sort((a,b)=>b.pts-a.pts).slice(0,10)}
V.explore=()=>{const FAV=JSON.parse(localStorage.getItem('playhub_fav')||'[]');const g=allGames().filter(x=>(cat==='الكل'||(cat==='من أتابع'?isFollowing(x.author):cat==='❤️ المفضلة'?FAV.includes(x.id):x.cat===cat))&&(!q||(x.title+x.desc+(x.tags||'')+userName(x.author)).includes(q)));
  app.innerHTML=`<input id="sq" placeholder="ابحث عن لعبة أو صانع..." value="${esc(q)}"><div class="chips">${['الكل','من أتابع','❤️ المفضلة',...CATS].map(c=>`<button class="chip ${c===cat?'on':''}" data-c="${c}">${c}</button>`).join('')}</div>
  <select id="so"><option value="t">الأكثر رواجاً</option><option value="r">الأعلى تقييماً</option><option value="n">الأحدث</option><option value="p">الأكثر لعباً</option></select>
  <div class="grid" id="gl"></div>`;
  const fill=()=>{const o=$('#so').value;const l=[...g].sort((a,b)=>o==='p'?playsOf(b.id)-playsOf(a.id):o==='r'?ratingOf(b.id).avg-ratingOf(a.id).avg:o==='n'?b.ts-a.ts:trending(b)-trending(a));$('#gl').innerHTML=l.map(card).join('')||'<div class="empty">مفيش نتائج</div>';bindCards()};
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
  <div class="box"><b>توزيع التقييمات</b>${[5,4,3,2,1].map(n=>{const all=Object.values((DB.ratings||{})[g.id]||{});const c=all.filter(x=>x===n).length;return `<div class="meta" style="margin:3px 0"><span style="width:28px">${n}★</span><div style="flex:1;background:var(--card2);border-radius:6px;height:8px;min-width:120px"><div style="width:${all.length?c*100/all.length:0}%;background:var(--ac);height:8px;border-radius:6px"></div></div><span>${c}</span></div>`}).join('')}</div>
  <div class="box"><b>قيّم اللعبة</b><div class="stars" id="st">${[1,2,3,4,5].map(i=>`<button data-s="${i}" class="${mine>=i?'on':''}">★</button>`).join('')}</div></div>
  <div class="box"><b>🏆 لوحة المتصدرين</b>${sc.slice(0,10).map((s,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(s.u))}</span><b style="flex:1">${esc(s.name)} ${scoreLvl(s.score)}</b><span>${s.score}</span>${me&&s.u!==me.id?`<button class="btn sm ghost" data-ch="${esc(s.u)}" data-sc="${s.score}">⚔️ تحدّى</button>`:''}</div>`).join('')||'<div class="empty">مفيش نتائج لسه</div>'}
  <div style="display:flex;gap:8px;margin-top:10px"><input id="scv" type="number" inputmode="numeric" placeholder="نتيجتك" style="margin:0"><button class="btn" id="scb">سجّل</button></div>
  <div class="meta" style="margin-top:6px">الألعاب الداعمة بتبعت النتيجة تلقائي. غير كده سجّلها بإيدك.</div></div>
  <div class="box"><b>💬 التعليقات (${cm.length})</b><div style="display:flex;gap:8px"><input id="cmt" placeholder="اكتب تعليق..." style="margin:0"><button class="btn" id="cmb">أرسل</button></div>
  ${cm.map(c=>`<div class="cm"><b>${esc(userAv(c.uid))} ${esc(c.name)}</b> <small>${new Date(c.ts).toLocaleDateString('ar-EG')}</small><div>${esc(c.text)}</div></div>`).join('')}</div>
  <h2>🎯 ألعاب مشابهة</h2><div class="row">${allGames().filter(x=>x.cat===g.cat&&x.id!==g.id).slice(0,6).map(card).join('')||'<div class="empty">لا يوجد</div>'}</div>
  <div class="box"><button class="btn ghost" id="sh">🔗 انسخ رابط اللعبة</button> <button class="btn ghost" id="fv">${JSON.parse(localStorage.getItem('playhub_fav')||'[]').includes(g.id)?'💔 شيل من المفضلة':'❤️ أضف للمفضلة'}</button> <button class="btn ghost" id="rp">🚩 إبلاغ</button>${me&&me.id===g.author&&!g.seed?' <button class="btn ghost" id="dl" style="color:var(--bad)">🗑️ حذف لعبتي</button>':''}</div>`;
  $('#bk').onclick=()=>history.length>1?go({t:'home'}):go({t:'home'});
  const start=async()=>{$('#fr').innerHTML=`<iframe class="frame" ${src}></iframe>`;qinc('play');try{let rc=JSON.parse(localStorage.getItem('playhub_recent')||'[]').filter(x=>x!==g.id);rc.unshift(g.id);localStorage.setItem('playhub_recent',JSON.stringify(rc.slice(0,8)))}catch(e){}if(me)await dbSet(`plays/${g.id}/${me.id}`,Date.now())};
  $('#play').onclick=start;$('#fs').onclick=async()=>{await start();$('#fr iframe').requestFullscreen&&$('#fr iframe').requestFullscreen()};
  if(view.autoplay)start();
  document.querySelectorAll('#st [data-s]').forEach(b=>b.onclick=async()=>{if(!need())return;await dbSet(`ratings/${g.id}/${me.id}`,+b.dataset.s);qinc('rate');toast('شكراً على تقييمك ⭐');V.game()});
  $('#scb').onclick=()=>submitScore(g,+$('#scv').value);
  $('#cmb').onclick=async()=>{const t=$('#cmt').value.trim();if(!t||!need())return;await dbPush(`comments/${g.id}`,{uid:me.id,name:me.name,text:t.slice(0,300),ts:Date.now()});qinc('comment');V.game()};
  const f=$('#fl');if(f)f.onclick=async()=>{if(!need())return;await dbSet(`follows/${me.id}/${g.author}`,isFollowing(g.author)?null:true);V.game()};
  document.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>challengeDlg(g,b.dataset.ch,+b.dataset.sc));
  $('#sh').onclick=()=>{const u=location.href.split('#')[0].split('?')[0]+'?g='+encodeURIComponent(g.id);const txt=(me?me.name+' بيتحداك ':'')+'تلعب '+g.title+' في ملعب: '+u;if(navigator.share){navigator.share({title:g.title,text:txt,url:u}).catch(()=>{})}else{navigator.clipboard&&navigator.clipboard.writeText(txt);toast('تم نسخ الرابط')}};
  $('#fv').onclick=()=>{let f=JSON.parse(localStorage.getItem('playhub_fav')||'[]');f=f.includes(g.id)?f.filter(x=>x!==g.id):[...f,g.id];localStorage.setItem('playhub_fav',JSON.stringify(f));V.game()};
  $('#rp').onclick=async()=>{if(!need())return;await dbSet(`reports/${g.id}/${me.id}`,Date.now());toast('تم الإبلاغ، شكراً')};
  const dl=$('#dl');if(dl)dl.onclick=async()=>{if(confirm('حذف لعبتك نهائياً؟')){await dbSet('games/'+g.id,null);toast('اتحذفت');go({t:'home'})}};
  bindCards()};
function need(){if(me)return true;toast('سجّل دخول الأول');go({t:'me'});return false}
async function submitScore(g,s){if(!need())return;if(!(s>=0)||!isFinite(s)||s>1e9){toast('اكتب نتيجة صحيحة');return}
  const old=((DB.scores||{})[g.id]||{})[me.id];if(old&&old.score>=s){toast('نتيجتك الأعلى المسجلة '+old.score);return}
  await dbSet(`scores/${g.id}/${me.id}`,{name:me.name,score:Math.floor(s),ts:Date.now()});toast('اتسجلت نتيجتك 🏆');confetti();qinc('score');
  const beat=vals(DB.challenges).filter(c=>c.gid===g.id&&c.to===me.id&&!c.done&&s>c.score);
  for(const c of beat){await dbSet(`challenges/${c._k}/done`,true);await dbSet(`challenges/${c._k}/winner`,me.id);toast('كسبت تحدي '+c.fromName+' ⚔️')}
  V.game()}
function challengeDlg(g,to,score){const note=prompt('تحدّى '+userName(to)+' إنه يكسر '+Math.max(score,0)+' في '+g.title+'؟\nاكتب رسالة (اختياري):','');if(note===null)return;
  dbPush('challenges',{from:me.id,fromName:me.name,to,gid:g.id,gtitle:g.title,score,note:(note||'').slice(0,100),ts:Date.now()}).then(()=>toast('اتبعت التحدي ⚔️'))}
V.publish=()=>{if(!me){app.innerHTML='<div class="empty">سجّل دخول الأول عشان تنشر</div><button class="btn" id="lg">دخول</button>';$('#lg').onclick=()=>go({t:'me'});return}
  app.innerHTML=`<h2>➕ انشر لعبتك</h2><div class="box"><input id="pt" placeholder="اسم اللعبة" maxlength="40"><textarea id="pd" placeholder="وصف قصير" maxlength="200"></textarea>
  <input id="ptg" placeholder="وسوم مفصولة بفاصلة (مثال: سريع, تحدي)" maxlength="60">
  <select id="pc">${CATS.map(c=>`<option>${c}</option>`).join('')}</select>
  <label class="meta" style="display:block;margin:6px 0">صورة غلاف (اختياري)</label><input id="pimg" type="file" accept="image/*"><div class="avs" id="pe">${['🎮','🚀','⚔️','🧩','🏎️','🧟','🏰','👽','⚽','🎯'].map((e,i)=>`<button class="${i?'':'on'}">${e}</button>`).join('')}</div>
  <div class="chips" style="margin-top:8px"><button class="chip on" id="m1">برابط</button><button class="chip" id="m2">كود HTML</button></div>
  <input id="pu" placeholder="رابط اللعبة (https://...)" dir="ltr"><textarea id="ph" style="display:none;direction:ltr;min-height:160px" placeholder="ألصق كود HTML كامل للعبة (حتى 200 ألف حرف)"></textarea>
  <button class="btn gold" id="pb" style="width:100%;margin-top:8px">نشر 🚀</button><div class="meta" style="margin-top:8px">اللعبة بتشتغل داخل إطار معزول. ما تنشرش حاجة مش بتاعتك.</div></div>
  <div class="box"><b>🧩 خلّي لعبتك تبعت النتيجة تلقائي</b><div class="meta" style="margin:6px 0">حط السطر ده في لعبتك لما اللعبة تخلص:</div><textarea readonly dir="ltr" style="min-height:50px">parent.postMessage({type:'playhub-score',score:123},'*')</textarea><button class="btn sm ghost" id="cps">نسخ الكود</button></div>`;
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
  app.innerHTML=`<h2>⚔️ تحديات وصلتلك (${inc.length})</h2>${inc.map(c=>row(c,0)).join('')||'<div class="empty">مفيش تحديات. روح لوحة متصدرين وتحدّى حد!</div>'}<h2>أرسلتها (${out.length})</h2>${out.map(c=>row(c,1)).join('')||'<div class="empty">لسه ما تحدّيتش حد</div>'}`;
  document.querySelectorAll('[data-pg]').forEach(b=>b.onclick=async()=>{await dbSet(`seen/${me.id}/${b.dataset.ck}`,true);go({t:'game',id:b.dataset.pg,autoplay:1})})};
V.me=()=>{if(!me){let av=AVS[0];app.innerHTML=`<h2>👤 إنشاء حساب</h2><div class="box"><input id="nm" placeholder="اسمك" maxlength="20"><div class="avs" id="av">${AVS.map((e,i)=>`<button class="${i?'':'on'}">${e}</button>`).join('')}</div><button class="btn gold" id="go" style="width:100%;margin-top:10px">ابدأ</button></div>`;
    document.querySelectorAll('#av button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#av button').forEach(x=>x.classList.remove('on'));b.classList.add('on');av=b.textContent});
    $('#go').onclick=async()=>{const n=$('#nm').value.trim();if(n.length<2){toast('اكتب اسمك');return}me={id:await myUid(),name:n,avatar:av};localStorage.setItem('playhub_me',JSON.stringify(me));await dbSet('users/'+me.id,{name:me.name,avatar:me.avatar,ts:Date.now()});go({t:'home'})};return}
  const my=allGames().filter(g=>g.author===me.id);const fol=Object.keys((DB.follows||{})[me.id]||{});
  app.innerHTML=`<div class="box" style="text-align:center"><div class="av" style="width:70px;height:70px;font-size:38px">${esc(me.avatar)}</div><h2>${esc(me.name)}</h2><div class="meta" style="justify-content:center">المستوى ${lvlOf(xpOf(me.id))} · ${xpOf(me.id)} XP</div><div class="meta" style="justify-content:center;margin:4px 0">${badges(me.id).map(b=>`<span class="badge">${b}</span>`).join(' ')||'<span>العب وانشر لتكسب شارات</span>'}</div><div class="meta" style="justify-content:center">${followers(me.id)} متابع · ${fol.length} يتابع · ${my.length} لعبة</div></div>
  ${themePicker()}${badgeCatalog(me.id)}${creatorStats(me.id)}<h2>ألعابي</h2><div class="grid">${my.map(card).join('')||'<div class="empty">لسه ما نشرتش. جرّب تبويب "انشر"</div>'}</div>
  <h2>أفضل نتائجي</h2><div class="box">${Object.keys(DB.scores||{}).filter(g=>DB.scores[g][me.id]).map(g=>`<div class="lb"><span style="flex:1">${esc((allGames().find(x=>x.id===g)||{}).title||g)}</span><b>${DB.scores[g][me.id].score}</b></div>`).join('')||'<div class="empty">لا نتائج</div>'}</div>
  <button class="btn ghost" id="ed">✏️ تعديل الاسم والصورة</button> <button class="btn ghost" id="lo">تسجيل خروج</button>`;
  $('#ed').onclick=async()=>{const n=prompt('الاسم الجديد',me.name);if(!n||n.trim().length<2)return;const a=prompt('إيموجي الصورة',me.avatar)||me.avatar;me.name=n.trim().slice(0,20);me.avatar=[...a][0]||me.avatar;localStorage.setItem('playhub_me',JSON.stringify(me));await dbSet('users/'+me.id,{name:me.name,avatar:me.avatar,ts:Date.now()});toast('تم التحديث');renderNav();V.me()};bindCards();$('#lo').onclick=()=>{if(confirm('تسجيل خروج؟')){localStorage.removeItem('playhub_me');me=null;go({t:'home'})}}};
V.user=()=>{const u=view.id;const gs=allGames().filter(g=>g.author===u);
  app.innerHTML=`<button class="back" id="bk">→ رجوع</button><div class="box" style="text-align:center"><div class="av" style="width:70px;height:70px;font-size:38px">${esc(userAv(u))}</div><h2>${esc(userName(u))}</h2><div class="meta" style="justify-content:center">المستوى ${lvlOf(xpOf(u))}</div><div class="meta" style="justify-content:center;margin:4px 0">${badges(u).map(b=>`<span class="badge">${b}</span>`).join(' ')}</div><div class="meta" style="justify-content:center">${followers(u)} متابع · ${gs.length} لعبة</div>${me&&me.id!==u?`<button class="btn ${isFollowing(u)?'ghost':'gold'}" id="fl" style="margin-top:8px">${isFollowing(u)?'إلغاء المتابعة':'+ متابعة'}</button>`:''}</div><div class="grid">${gs.map(card).join('')}</div>`;
  $('#bk').onclick=()=>go({t:'home'});const f=$('#fl');if(f)f.onclick=async()=>{await dbSet(`follows/${me.id}/${u}`,isFollowing(u)?null:true);V.user()};bindCards()};

let DEFER=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();DEFER=e;const b=document.createElement('button');b.className='btn sm gold';b.textContent='📲';b.title='ثبّت التطبيق';b.onclick=()=>{DEFER.prompt();b.remove()};$('header').appendChild(b)});
/* games can report scores: parent.postMessage({type:'playhub-score',score:123},'*') */
addEventListener('message',e=>{const d=e.data;if(d&&d.type==='playhub-score'&&view.t==='game'){const g=allGames().find(x=>x.id===view.id);if(g)submitScore(g,+d.score)}});

addEventListener('pagehide',()=>localStorage.setItem('playhub_last',Date.now()));
/* ---------- round 13: weekly tournament on a built-in game ---------- */
function tgame(){const wk=Math.floor(Date.now()/6048e5);return BUILTIN[wk%BUILTIN.length]}
function tboard(){const g=tgame(),since=Date.now()-6048e5;return Object.entries((DB.scores||{})[g.id]||{}).map(([u,e])=>({u,...e})).filter(e=>e.ts>=since).sort((a,b)=>b.score-a.score)}
function tchamp(){const b=tboard();return b.length?b[0].u:null}
function tourney(){const g=tgame(),b=tboard().slice(0,3);const end=new Date();end.setDate(end.getDate()+((7-end.getDay())%7||7));end.setHours(0,0,0,0);const h=Math.max(1,Math.ceil((end-Date.now())/36e5));
  return `<div class="box" style="background:linear-gradient(135deg,#0f4c5c,#5f0f40);border:1px solid #ffd24a"><div class="meta" style="color:#ffd24a">🏁 بطولة الأسبوع · باقي ${h>48?Math.ceil(h/24)+' يوم':h+' ساعة'}</div>
  <h2 style="margin:6px 0">${esc(g.emo)} ${esc(g.title)}</h2><div class="meta">الجوايز: 🥇 لقب 🏅 بطل البطولة على بروفايلك · 🥈🥉 شرف المركز</div>
  ${b.map((e,i)=>`<div class="lb"><span class="n">${['🥇','🥈','🥉'][i]}</span><span class="av">${esc(userAv(e.u))}</span><b style="flex:1">${esc(e.name)}</b><span>${e.score}</span></div>`).join('')||'<div class="meta">لسه مفيش مشاركين. كن أول واحد!</div>'}
  <button class="btn gold" data-tg="${esc(g.id)}" style="margin-top:8px;width:100%">▶ شارك في البطولة</button></div>`}

/* ---------- round 14: achievements catalog ---------- */
const BCAT=[['🛠️ صانع','انشر أول لعبة'],['🏭 منتج','انشر 3 ألعاب'],['🎯 لاعب','سجّل أول نتيجة'],['🔥 محترف','سجّل نتائج في 5 ألعاب'],['👑 بطل لعبة','احتل المركز الأول في لعبة'],['⭐ مشهور','وصل لـ 3 متابعين'],['👑 بطل الأسبوع','أعلى نتيجة هذا الأسبوع'],['🏅 بطل البطولة','فز ببطولة الأسبوع']];
function badgeCatalog(u){const have=badges(u);return `<h2>🎖️ الأوسمة (${have.length}/${BCAT.length})</h2><div class="box"><div class="tiles" style="margin:0">${BCAT.map(([n,d])=>{const ok=have.includes(n);return `<div class="tile" style="${ok?'border:1px solid #ffd24a':'opacity:.45;filter:grayscale(1)'}"><b>${n.split(' ')[0]}</b>${n.split(' ').slice(1).join(' ')}<br><small>${ok?'✅ تم':d}</small></div>`}).join('')}</div></div>`}

function recentRow(){let rc=[];try{rc=JSON.parse(localStorage.getItem('playhub_recent')||'[]')}catch(e){}const l=rc.map(id=>allGames().find(g=>g.id===id)).filter(Boolean);return l.length?`<h2>🕘 كمّل لعب</h2><div class="row">${l.map(card).join('')}</div>`:''}

/* ---------- round 16: confetti + accent colors ---------- */
function confetti(){const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:99';c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const x=c.getContext('2d');
  const P=Array.from({length:120},()=>({x:c.width/2+(Math.random()-.5)*120,y:c.height*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,r:4+Math.random()*5,h:Math.random()*360,a:Math.random()*6}));let f=0;
  (function t(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=.2;x.fillStyle=`hsl(${p.h},90%,60%)`;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore()});if(++f<110)requestAnimationFrame(t);else c.remove()})()}
const ACCS=[['#ffb020','#7c5cff','ذهبي'],['#2ee6a6','#1e88e5','أخضر'],['#ff5c8a','#8e44ff','وردي'],['#4dc3ff','#6c5ce7','سماوي'],['#ff7a45','#c0392b','برتقالي']];
function applyAccent(){const i=+localStorage.getItem('playhub_acc')||0,a=ACCS[i]||ACCS[0];document.documentElement.style.setProperty('--ac',a[0]);document.documentElement.style.setProperty('--ac2',a[1])}
function themePicker(){const i=+localStorage.getItem('playhub_acc')||0;setTimeout(()=>document.querySelectorAll('[data-acc]').forEach(e=>e.onclick=()=>{localStorage.setItem('playhub_acc',e.dataset.acc);applyAccent();V.me()}),0);
  return `<h2>🎨 لون التطبيق</h2><div class="box" style="display:flex;gap:10px;justify-content:center">${ACCS.map((a,k)=>`<button data-acc="${k}" title="${a[2]}" style="width:44px;height:44px;border-radius:50%;border:${k===i?'3px solid #fff':'2px solid #fff3'};background:linear-gradient(135deg,${a[0]},${a[1]})"></button>`).join('')}</div>`}
applyAccent();

/* ---------- round 12: daily quests + streak ---------- */
var QS=[['play','▶ العب أي لعبة',1],['rate','⭐ قيّم لعبة',1],['score','🏆 سجّل نتيجة',1],['comment','💬 اكتب تعليق',1]];
function dkey(){return new Date().toISOString().slice(0,10)}
function qget(){let q={};try{q=JSON.parse(localStorage.getItem('playhub_q')||'{}')}catch(e){}if(q.d!==dkey())q={d:dkey()};return q}
function qinc(k){const q=qget();if(q[k])return;q[k]=1;localStorage.setItem('playhub_q',JSON.stringify(q));
  const done=QS.filter(x=>q[x[0]]).length;if(done===QS.length)confetti();toast(done===QS.length?'🎉 خلصت كل مهام النهاردة! +مكافأة':'✅ مهمة اتنجزت ('+done+'/'+QS.length+')')}
function streak(){let st={n:0,last:''};try{st=JSON.parse(localStorage.getItem('playhub_streak')||'')||st}catch(e){}const t=dkey();
  if(st.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);st.n=st.last===y?st.n+1:1;st.last=t;localStorage.setItem('playhub_streak',JSON.stringify(st))}return st.n}
function dailyBox(){const q=qget(),n=streak(),done=QS.filter(x=>q[x[0]]).length;
  return `<div class="box" style="border:1px solid var(--ac)"><div style="display:flex;justify-content:space-between"><b>🎯 مهام النهاردة (${done}/${QS.length})</b><b>🔥 ${n} يوم متتالي</b></div>
  <div style="height:8px;background:#0006;border-radius:6px;margin:8px 0;overflow:hidden"><div style="height:100%;width:${done/QS.length*100}%;background:linear-gradient(90deg,var(--ac),#ffd24a)"></div></div>
  <div class="meta">${QS.map(x=>`<span>${q[x[0]]?'✅':'⬜'} ${x[1]}</span>`).join('')}</div></div>`}

if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
(async()=>{const p=new URLSearchParams(location.search);if(p.get('g'))view={t:'game',id:p.get('g')};render();
  if(ONLINE){await dbSync();render();setInterval(async()=>{const a=document.activeElement;if(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))return;if(await dbSync())render()},10000)}})();

/* ---------- round 11: notifications, champion, creator stats, hall of fame ---------- */
function champ(){const since=Date.now()-6048e5;let b=null;for(const gid in DB.scores||{})for(const u in DB.scores[gid]){const e=DB.scores[gid][u];if(e&&e.ts>=since&&(!b||e.score>b.s))b={u,s:e.score}}return b?b.u:null}
function notifs(){if(!me)return[];const mine=new Set(allGames().filter(g=>g.author===me.id).map(g=>g.id)),n=[];
  for(const gid of mine){const g=allGames().find(x=>x.id===gid);for(const c of vals((DB.comments||{})[gid]))if(c.uid!==me.id)n.push({ts:c.ts,t:`💬 ${esc(c.name)} علّق على <b>${esc(g.title)}</b>: ${esc(String(c.text).slice(0,60))}`,g:gid});
    for(const u in (DB.scores||{})[gid]||{}){const e=DB.scores[gid][u];if(u!==me.id)n.push({ts:e.ts||0,t:`🏆 ${esc(e.name)} سجّل ${e.score} في <b>${esc(g.title)}</b>`,g:gid})}}
  for(const c of vals(DB.challenges))if(c.to===me.id)n.push({ts:c.ts,t:`⚔️ ${esc(c.fromName)} تحداك في <b>${esc(c.gtitle)}</b>`,g:c.gid});
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
  <div class="box" style="text-align:center;background:linear-gradient(135deg,#6a4a10,#2a1a4a)"><div class="meta" style="justify-content:center">👑 بطل الأسبوع</div>${ch?`<h2 style="margin:6px 0" data-u="${esc(ch)}">${esc(userAv(ch))} ${esc(userName(ch))}</h2>`:'<div class="empty">لسه مفيش بطل. سجّل أعلى نتيجة!</div>'}</div>
  <h2>🎮 أفضل اللاعبين</h2><div class="box">${topPlayers().map((p,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(p.u))}</span><b style="flex:1" data-u="${esc(p.u)}">${esc(userName(p.u))} ${badges(p.u).slice(-1).join('')}</b><span>${p.pts} نقطة</span></div>`).join('')||'<div class="empty">لسه مفيش نتائج</div>'}</div>
  <h2>🛠️ أفضل الصنّاع</h2><div class="box">${cl.map((c,i)=>`<div class="lb"><span class="n">${i+1}</span><span class="av">${esc(userAv(c.u))}</span><b style="flex:1" data-u="${esc(c.u)}">${esc(userName(c.u))}</b><span>${c.n} لعبة · ▶ ${c.pl}</span></div>`).join('')||'<div class="empty">لسه مفيش صنّاع. انشر لعبة!</div>'}</div>`;
  $('#bk').onclick=()=>go({t:'home'});bindCards()};
