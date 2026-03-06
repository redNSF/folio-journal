const LF=['&#127810;','&#127809;','&#127811;','&#127807;'];
for(let i=0;i<18;i++){const l=document.createElement('div');l.className='leaf';l.innerHTML=LF[i%4];l.style.cssText='left:'+Math.random()*100+'vw;font-size:'+(0.9+Math.random()*1.2)+'rem;animation-duration:'+(14+Math.random()*20)+'s;animation-delay:'+(-Math.random()*30)+'s';document.getElementById('lbg').appendChild(l);}
const AV=[{e:'&#129418;',b:'#3a1a08',g:'#e07830'},{e:'&#129417;',b:'#1a2010',g:'#60c060'},{e:'&#127812;',b:'#2a0a10',g:'#e84040'},{e:'&#127769;',b:'#0a1020',g:'#8090e0'},{e:'&#128059;',b:'#2a1808',g:'#c07840'},{e:'&#127809;',b:'#3a1008',g:'#e05020'},{e:'&#127807;',b:'#0a2018',g:'#40c890'},{e:'&#11088;',b:'#1a1808',g:'#f0d040'},{e:'&#128058;',b:'#181820',g:'#b070e0'}];
const gA=()=>JSON.parse(localStorage.getItem('fa')||'[]');
const sA=a=>localStorage.setItem('fa',JSON.stringify(a));
const gE=u=>JSON.parse(localStorage.getItem('fe_'+u)||'[]');
const sE=(u,e)=>localStorage.setItem('fe_'+u,JSON.stringify(e));
async function hp(p){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(p+'fs1'));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('');}
let U=null,E=[],aid=null,st=null,sa=0;

function renderProfiles(){const ac=gA();document.getElementById('pgrid').innerHTML=ac.map(a=>{const c=gE(a.id).length;return'<div class="pc" style="--gc:'+(a.g||a.b)+'" onclick="selP(\''+a.id+'\')"><div class="pav" style="background:'+a.b+'">'+a.e+'</div><div class="pn">'+esc(a.name)+'</div><div class="pc2">'+c+' entr'+(c===1?'y':'ies')+'</div><button class="pcd" onclick="qDel(\''+a.id+'\',event)">&#10005;</button></div>';}).join('')+'<div class="pa" onclick="openCreate()"><div class="pai">&#xFF0B;</div><div class="pal">New Account</div></div>';}

function showPicker(){document.getElementById('lpanel').classList.remove('show');document.getElementById('pkr').style.display='';renderProfiles();}
function selP(id){const a=gA().find(x=>x.id===id);if(!a)return;U=a;document.getElementById('pkr').style.display='none';document.getElementById('lav').innerHTML=a.e;document.getElementById('lav').style.background=a.b;document.getElementById('lname').textContent=a.name;document.getElementById('lpw').value='';document.getElementById('lerr').classList.remove('show');document.getElementById('lpanel').classList.add('show');setTimeout(()=>document.getElementById('lpw').focus(),60);}
async function doLogin(){const pw=document.getElementById('lpw').value,err=document.getElementById('lerr');if(!pw){showE(err,'Please enter your password.');return;}if(await hp(pw)!==U.ph){showE(err,'Wrong password.');document.getElementById('lpw').value='';return;}enterApp();}
function enterApp(){E=gE(U.id);document.getElementById('pilav').innerHTML=U.e;document.getElementById('pilav').style.background=U.b;document.getElementById('piln').textContent=U.name;document.getElementById('ddn').textContent=U.name;document.getElementById('dds').textContent=E.length+' entries';aid=null;document.getElementById('wel').style.display='flex';document.getElementById('ed').style.display='none';document.getElementById('sin').value='';renderList();updateStreak();const ac=document.getElementById('as'),ap=document.getElementById('app');ac.classList.add('fo');setTimeout(()=>{ac.classList.add('hidden');ac.classList.remove('fo');ap.classList.add('visible');},700);}
function switchAccount(){closeDrop();U=null;E=[];aid=null;const ap=document.getElementById('app');ap.classList.remove('visible');setTimeout(()=>{const ac=document.getElementById('as');ac.classList.remove('hidden');void ac.offsetWidth;showPicker();},600);}

function openCreate(){sa=Math.floor(Math.random()*AV.length);['cNm','cPw','cPw2'].forEach(id=>document.getElementById(id).value='');document.getElementById('cErr').classList.remove('show');document.getElementById('avGrid').innerHTML=AV.map((a,i)=>'<div class="ao'+(i===sa?' sel':'')+'" style="background:'+a.b+'" onclick="pickAv('+i+')">'+a.e+'</div>').join('');openM('mCreate');}
function pickAv(i){sa=i;document.querySelectorAll('.ao').forEach((el,idx)=>el.classList.toggle('sel',idx===i));}
async function doCreate(){const nm=document.getElementById('cNm').value.trim(),p1=document.getElementById('cPw').value,p2=document.getElementById('cPw2').value,err=document.getElementById('cErr');if(!nm){showE(err,'Please enter a display name.');return;}if(p1.length<6){showE(err,'Password must be at least 6 characters.');return;}if(p1!==p2){showE(err,'Passwords do not match.');return;}const ac=gA();if(ac.find(a=>a.name.toLowerCase()===nm.toLowerCase())){showE(err,'That name is already taken.');return;}const av=AV[sa];ac.push({id:Date.now().toString(),name:nm,e:av.e,b:av.b,ph:await hp(p1)});sA(ac);closeM('mCreate');renderProfiles();toast('Account created!');}

function openDelA(){closeDrop();document.getElementById('daPw').value='';document.getElementById('daErr').classList.remove('show');openM('mDelA');}
async function doDelA(){const pw=document.getElementById('daPw').value,err=document.getElementById('daErr');if(!pw){showE(err,'Enter your password.');return;}if(await hp(pw)!==U.ph){showE(err,'Wrong password.');return;}sA(gA().filter(a=>a.id!==U.id));localStorage.removeItem('fe_'+U.id);closeM('mDelA');toast('Account deleted.');switchAccount();}
function qDel(id,e){e.stopPropagation();if(!confirm('Delete this account and all its entries?'))return;sA(gA().filter(a=>a.id!==id));localStorage.removeItem('fe_'+id);renderProfiles();toast('Account removed.');}

function openCPw(){closeDrop();['cpC','cpN','cpN2'].forEach(id=>document.getElementById(id).value='');document.getElementById('cpErr').classList.remove('show');openM('mCPw');}
async function doCPw(){const c=document.getElementById('cpC').value,p1=document.getElementById('cpN').value,p2=document.getElementById('cpN2').value,err=document.getElementById('cpErr');if(await hp(c)!==U.ph){showE(err,'Current password is wrong.');return;}if(p1.length<6){showE(err,'Min 6 characters.');return;}if(p1!==p2){showE(err,'Passwords do not match.');return;}const ac=gA(),i=ac.findIndex(a=>a.id===U.id);ac[i].ph=U.ph=await hp(p1);sA(ac);closeM('mCPw');toast('Password updated!');}

// ── Sidebar collapse (RAF-animated) ──────────────────────────────────
const SB_OPEN=280, SB_CLOSED=0;
let sbWidth=SB_OPEN, sbTarget=SB_OPEN, sbRaf=null;

function easeInOut(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function easeOutExpo(t){return t>=1?1:1-Math.pow(2,-10*t);}

function animateSidebar(){
  const diff=sbTarget-sbWidth;
  if(Math.abs(diff)<.3){
    sbWidth=sbTarget;
    applyWidth(sbWidth);
    sbRaf=null;
    // final state
    const inner=document.getElementById('sb-inner');
    if(sbTarget===SB_CLOSED){inner.style.opacity='0';inner.style.pointerEvents='none';}
    document.getElementById('sb-open-btn').classList.toggle('visible',sbTarget===SB_CLOSED);
    return;
  }
  sbWidth+=diff*0.14; // lerp factor — lower = slower/smoother
  applyWidth(sbWidth);
  sbRaf=requestAnimationFrame(animateSidebar);
}

function applyWidth(w){
  document.getElementById('app').style.setProperty('--sb-w',w+'px');
  // fade border when nearly closed
  const t=w/SB_OPEN;
  document.getElementById('sidebar').style.borderRightColor=
    `rgba(${getComputedStyle(document.documentElement).getPropertyValue('--bs').trim()||'58,34,8'},${t})`;
}

function toggleSidebar(){
  const collapsing=sbTarget===SB_OPEN;
  sbTarget=collapsing?SB_CLOSED:SB_OPEN;
  const inner=document.getElementById('sb-inner');
  if(collapsing){
    // fade content out first, then collapse
    inner.style.transition='opacity .18s ease';
    inner.style.opacity='0';
    inner.style.pointerEvents='none';
    document.getElementById('sb-open-btn').classList.remove('visible');
  } else {
    // start expanding, then fade content in
    document.getElementById('sb-open-btn').classList.remove('visible');
    setTimeout(()=>{
      inner.style.opacity='1';
      inner.style.pointerEvents='';
    },260);
  }
  if(sbRaf)cancelAnimationFrame(sbRaf);
  sbRaf=requestAnimationFrame(animateSidebar);
}
function toggleDrop(){document.getElementById('udrop').classList.toggle('open');}
function closeDrop(){document.getElementById('udrop').classList.remove('open');}
document.addEventListener('click',e=>{if(!document.getElementById('upill')?.contains(e.target))closeDrop();});

function saveD(){sE(U.id,E);setSI('saved');document.getElementById('dds').textContent=E.length+' entries';updateStreak();}
function setSI(s){['si1','si2'].forEach(id=>{const el=document.getElementById(id);if(!el)return;el.textContent=s==='saving'?'saving...':'saved';el.className='sind'+(s==='saved'?' saved':'');});}
function newEntry(){const e={id:Date.now().toString(),title:'',content:'',ca:new Date().toISOString()};E.unshift(e);saveD();renderList();selEntry(e.id);document.getElementById('eTitle').focus();maybeShowPrompt();}
function selEntry(id){aid=id;const e=E.find(x=>x.id===id);if(!e)return;document.getElementById('wel').style.display='none';document.getElementById('ed').style.display='flex';document.getElementById('edate').textContent=new Date(e.ca).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});document.getElementById('eTitle').value=e.title;document.getElementById('eBody').innerHTML=e.content||'';updWC();renderList();renderMoodBar(e.mood||null);}
function delEntry(id,ev){ev.stopPropagation();E=E.filter(x=>x.id!==id);saveD();if(aid===id){aid=null;document.getElementById('wel').style.display='flex';document.getElementById('ed').style.display='none';}renderList();toast('Entry deleted.',true);}
function onEdit(){if(!aid)return;const e=E.find(x=>x.id===aid);if(!e)return;e.title=document.getElementById('eTitle').value;e.content=document.getElementById('eBody').innerHTML;updWC();setSI('saving');clearTimeout(st);st=setTimeout(()=>{saveD();renderList();},600);}
function updWC(){const w=(document.getElementById('eBody').innerText.trim().match(/\S+/g)||[]).length;document.getElementById('wc').textContent=w+(w===1?' word':' words');}
function fmt(cmd,val){document.getElementById('eBody').focus();document.execCommand(cmd,false,val||null);onEdit();updateToolbarState();}

function fmtBlock(tag){
  const el=document.getElementById('eBody');el.focus();
  const sel=window.getSelection();
  if(!sel.rangeCount)return;
  const r=sel.getRangeAt(0);
  let node=r.commonAncestorContainer;
  while(node&&node!==el&&node.nodeType!==1)node=node.parentNode;
  if(node&&node!==el&&node.tagName&&node.tagName.toLowerCase()===tag){
    // unwrap
    const p=document.createElement('p');
    while(node.firstChild)p.appendChild(node.firstChild);
    node.parentNode.replaceChild(p,node);
  } else {
    document.execCommand('formatBlock',false,tag);
  }
  onEdit();
}

function updateToolbarState(){
  ['bold','italic','underline','strikeThrough'].forEach(cmd=>{
    const id='btn-'+cmd.replace('T','t').replace('H','h').replace('T','t');
    const btn=document.getElementById(id);
    if(btn)btn.classList.toggle('active',document.queryCommandState(cmd));
  });
}

// ── COLOR & HIGHLIGHT PALETTES ────────────────────────────────────────
const TEXT_COLORS=[
  {c:'currentColor',label:'Default'},
  {c:'#f0e0c8',label:'Cream'},{c:'#d4a030',label:'Gold'},{c:'#e07820',label:'Amber'},
  {c:'#c86010',label:'Rust'},{c:'#e05040',label:'Red'},{c:'#5a9a50',label:'Sage'},
  {c:'#5080b0',label:'Slate'},{c:'#9070c0',label:'Plum'},{c:'#50a0a0',label:'Teal'},
  {c:'#ffffff',label:'White'},{c:'#aaaaaa',label:'Gray'},{c:'#555555',label:'Dark'},
];
const HIGHLIGHTS=[
  {c:'transparent',label:'None'},
  {c:'rgba(212,160,48,.35)',label:'Gold'},{c:'rgba(224,120,32,.3)',label:'Amber'},
  {c:'rgba(200,60,60,.3)',label:'Red'},{c:'rgba(90,154,80,.3)',label:'Green'},
  {c:'rgba(80,128,176,.3)',label:'Blue'},{c:'rgba(144,112,192,.3)',label:'Purple'},
  {c:'rgba(80,160,160,.3)',label:'Teal'},{c:'rgba(220,200,80,.35)',label:'Yellow'},
];

let activeColor=TEXT_COLORS[2].c, activeHL=HIGHLIGHTS[7].c;

function buildPalettes(){
  const cp=document.getElementById('pop-color');
  cp.innerHTML='<div class="pop-label">Text Color</div>'+
    TEXT_COLORS.map((x,i)=>`<div class="clr-swatch${i===1?' active':''}" style="background:${x.c==='currentColor'?'var(--cream)':x.c};${x.c==='currentColor'?'border:2px solid var(--border)':''}" title="${x.label}" onclick="setColor('${x.c}',this)"></div>`).join('');
  const hp=document.getElementById('pop-highlight');
  hp.innerHTML='<div class="pop-label">Highlight</div>'+
    HIGHLIGHTS.map((x,i)=>`<div class="clr-swatch${i===0?' active':''}" style="background:${x.c==='transparent'?'var(--surface)':x.c};${x.c==='transparent'?'border:2px dashed var(--border)':''}" title="${x.label}" onclick="setHL('${x.c}',this)"></div>`).join('');
}

// ── Selection preservation ───────────────────────────────────────────
let savedRange=null;
function saveSelection(){
  const sel=window.getSelection();
  if(sel.rangeCount>0)savedRange=sel.getRangeAt(0).cloneRange();
}
function restoreSelection(){
  const el=document.getElementById('eBody');
  el.focus();
  if(!savedRange)return;
  const sel=window.getSelection();
  sel.removeAllRanges();
  sel.addRange(savedRange);
}

function setColor(color,swatch){
  document.querySelectorAll('#pop-color .clr-swatch').forEach(s=>s.classList.remove('active'));
  swatch.classList.add('active');
  activeColor=color;
  document.getElementById('color-bar').style.background=color==='currentColor'?'var(--cream)':color;
  closeAllPops();
  restoreSelection();
  document.execCommand('styleWithCSS',false,true);
  if(color==='currentColor') document.execCommand('foreColor',false,'');
  else document.execCommand('foreColor',false,color);
  onEdit();
}

function setHL(color,swatch){
  document.querySelectorAll('#pop-highlight .clr-swatch').forEach(s=>s.classList.remove('active'));
  swatch.classList.add('active');
  activeHL=color;
  document.getElementById('hl-bar').style.background=color==='transparent'?'transparent':color;
  closeAllPops();
  restoreSelection();
  document.execCommand('styleWithCSS',false,true);
  document.execCommand('hiliteColor',false,color==='transparent'?'transparent':color);
  onEdit();
}



function togglePop(id){
  const pop=document.getElementById(id);
  const wasOpen=pop.classList.contains('open');
  closeAllPops();
  if(!wasOpen){
    saveSelection();
    pop.classList.add('open');
  }
}
function closeAllPops(){document.querySelectorAll('.tb-pop.open').forEach(p=>p.classList.remove('open'));}
document.addEventListener('mousedown',e=>{if(!e.target.closest('.tb-pop-wrap'))closeAllPops();});
document.getElementById('eBody').addEventListener('keyup',()=>{updateToolbarState();updateFontBtn();});
document.getElementById('eBody').addEventListener('mouseup',()=>{updateToolbarState();updateFontBtn();});

// build palettes + size picker
buildPalettes();
// size picker

function mood(em){
  const el=document.getElementById('eBody');el.focus();
  const sel=window.getSelection();
  if(sel.rangeCount){const r=sel.getRangeAt(0);r.deleteContents();r.insertNode(document.createTextNode(' '+em+' '));r.collapse(false);sel.removeAllRanges();sel.addRange(r);}
  else{el.innerHTML+=' '+em+' ';}
  onEdit();
}
function renderList(){
  const q=(document.getElementById('sin')?.value||'').toLowerCase();
  const fl=E.filter(e=>e.title.toLowerCase().includes(q)||e.content.toLowerCase().includes(q));
  const list=document.getElementById('elist');
  if(!fl.length){
    list.innerHTML='<div class="empty"><span>&#127810;</span>'+(q?'No entries match.':'No entries yet.<br>Press <strong>New Entry</strong> to begin.')+'</div>';
    return;
  }
  list.innerHTML=fl.map(e=>{
    const d=new Date(e.ca).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const moodDot=e.mood?'<span class="ei-mood">'+e.mood+'</span>':'';
    const preview=e.content?'<div class="eip">'+esc(e.content.slice(0,90))+'</div>':'';
    return '<div class="ei'+(e.id===aid?' active':'')
      +'" onclick="selEntry(\''+e.id+'\')">'
      +'<div class="eit">'+(e.title||'<span style="color:var(--faint)">Untitled</span>')+'</div>'
      +'<div class="eid2">'+d+'</div>'
      +preview
      +moodDot
      +'<button class="eid" onclick="delEntry(\''+e.id+'\',event)">&#10005;</button>'
      +'</div>';
  }).join('');
}

async function dk(p,s){const r=await crypto.subtle.importKey('raw',new TextEncoder().encode(p),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:s,iterations:250000,hash:'SHA-256'},r,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);}
async function encD(d,p){const s=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv},await dk(p,s),new TextEncoder().encode(JSON.stringify(d)));const o=new Uint8Array(28+ct.byteLength);o.set(s,0);o.set(iv,16);o.set(new Uint8Array(ct),28);return o;}
async function decD(buf,p){const d=new Uint8Array(buf),r=await crypto.subtle.decrypt({name:'AES-GCM',iv:d.slice(16,28)},await dk(p,d.slice(0,16)),d.slice(28));return JSON.parse(new TextDecoder().decode(r));}

function openExport(){if(!E.length){toast('No entries to export.',true);return;}openM('mExpFmt');}
function openExportEncrypted(){if(!E.length){toast('No entries to export.',true);return;}['exPw','exPw2'].forEach(id=>document.getElementById(id).value='');document.getElementById('exErr').classList.remove('show');openM('mExp');}
async function doExport(){const p1=document.getElementById('exPw').value,p2=document.getElementById('exPw2').value,err=document.getElementById('exErr');if(!p1){showE(err,'Enter a passphrase.');return;}if(p1!==p2){showE(err,'Passphrases do not match.');return;}if(p1.length<8){showE(err,'Min 8 characters.');return;}err.classList.remove('show');const enc=await encD({v:1,entries:E},p1);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([enc],{type:'application/octet-stream'}));a.download='folio-'+U.name+'-'+Date.now()+'.jrnl';a.click();URL.revokeObjectURL(a.href);closeM('mExp');toast('Exported!');}

function openImportEncrypted(){document.getElementById('imF').value='';document.getElementById('imPw').value='';document.getElementById('imErr').classList.remove('show');openM('mImp');}
async function doImport(){const f=document.getElementById('imF').files[0],pw=document.getElementById('imPw').value,err=document.getElementById('imErr');if(!f){showE(err,'Select a .jrnl file.');return;}if(!pw){showE(err,'Enter your passphrase.');return;}try{const {entries:imp}=await decD(await f.arrayBuffer(),pw);const ids=new Set(E.map(e=>e.id)),nw=imp.filter(e=>!ids.has(e.id));E=[...nw,...E];saveD();renderList();closeM('mImp');toast('Imported '+nw.length+' entr'+(nw.length===1?'y':'ies')+'!');}catch{showE(err,'Wrong passphrase or corrupted file.');}}

const THEME_META={"ember": ["🌙", "Ember"], "harvest": ["☀️", "Harvest"], "ocean": ["🌊", "Ocean"], "midnight": ["✨", "Midnight"], "forest": ["🌿", "Forest"], "rosewood": ["🌸", "Rosewood"], "slate": ["🪨", "Slate"], "dusk": ["🌆", "Dusk"]};
let theme=localStorage.getItem('ft')||'ember';
function applyTheme(t,anim,x,y){
  closeAllPops();
  const doSwap=()=>{
    document.documentElement.setAttribute('data-theme',t==='ember'?'':t);
    theme=t;localStorage.setItem('ft',t);
    utb(t);
  };
  if(!anim){doSwap();return;}
  const bx=x??window.innerWidth/2,by=y??window.innerHeight/2;
  document.documentElement.style.setProperty('--tx',bx+'px');
  document.documentElement.style.setProperty('--ty',by+'px');
  if(document.startViewTransition){
    document.startViewTransition(doSwap);
  } else {
    document.body.style.transition='opacity .18s ease';
    document.body.style.opacity='0';
    setTimeout(()=>{doSwap();document.body.style.opacity='1';setTimeout(()=>document.body.style.transition='',200);},180);
  }
}
function utb(t){
  const meta=THEME_META[t]||THEME_META['ember'];
  const icon=document.getElementById('tbtn-icon'),lbl=document.getElementById('tbtn-lbl');
  if(icon) icon.textContent=meta[0];
  if(lbl)  lbl.textContent=meta[1];
  document.querySelectorAll('.th-opt').forEach(o=>o.classList.toggle('sel',o.id==='th-'+t));
}
function toggleTheme(){}  // kept for compat, now unused
// Apply saved theme on load
(()=>{ applyTheme(theme,false); })();

function openM(id){document.getElementById(id).classList.add('open');}
function closeM(id){document.getElementById(id).classList.remove('open');}
function showE(el,msg){el.textContent=msg;el.classList.add('show');}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function toast(msg,isErr=false){const t=document.createElement('div');t.className='toast'+(isErr?' te':'');t.textContent=msg;document.getElementById('tw').appendChild(t);setTimeout(()=>t.remove(),3200);}
document.querySelectorAll('.mbd').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)closeM(el.id);}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.mbd.open').forEach(el=>closeM(el.id));});


const PROMPTS=[
  "Describe a moment today when time seemed to slow down. What were you doing, and why did it feel different?",
  "Write about something you keep meaning to say to someone but haven't yet. What's stopping you?",
  "What's a belief you held five years ago that you no longer hold? What changed?",
  "Describe your current mood as a kind of weather. What does the landscape look like?",
  "What's the last thing that genuinely surprised you? Walk through the moment it happened.",
  "Write about a place you go to feel like yourself again. What is it about that place?",
  "What would you do differently about today if you could live it again? Why?",
  "Describe a small, ordinary thing that made you feel something today — joy, irritation, nostalgia, anything.",
  "What are you looking forward to right now? Let yourself describe it in detail.",
  "Write a letter to yourself from six months ago. What do you wish you'd known?",
  "What's something you've been avoiding thinking about? Write about why.",
  "Describe a person in your life who makes things feel easier. What do they do?",
  "What does your ideal version of next week look like? Be specific.",
  "Write about something you learned recently — anything from a new skill to a new way of seeing.",
  "What's a decision you made recently that felt right? How did you know?",
  "Describe a memory that comes back to you unexpectedly. Why do you think it lingers?",
  "What's something you're quietly proud of that you don't often talk about?",
  "Write about a creative project you've been dreaming about but haven't started. What's the first step?",
  "What does your body feel like right now? Start there and see where it takes you.",
  "Describe a conversation you had recently that stuck with you. What made it matter?",
  "What's something you've changed your mind about lately — about yourself, about others, about the world?",
  "Write about a fear that feels smaller than it used to. What happened?",
  "If today were a chapter in a book, what would it be called? What happens in it?",
  "What's something you need but find hard to ask for?",
  "Describe a sound, smell, or texture that brings you right back to childhood.",
  "What are you in the middle of right now — emotionally, creatively, in life? Describe the middle.",
  "Write about someone you miss. What would you do if you had one afternoon with them?",
  "What's one thing you want to remember about this exact period of your life?",
  "Describe a goal that feels close. What does reaching it actually look like?",
  "What's the most honest thing you could say about how you're really doing right now?"
];

let curPrompt=0,promptVisible=false;

function showPromptCard(){
  curPrompt=Math.floor(Math.random()*PROMPTS.length);
  document.getElementById('pcard-text').textContent=PROMPTS[curPrompt];
  document.getElementById('pcard').classList.add('show');
  promptVisible=true;
}
function nextPrompt(){
  curPrompt=(curPrompt+1)%PROMPTS.length;
  const el=document.getElementById('pcard-text');
  el.style.opacity='0';
  el.style.transform='translateY(6px)';
  setTimeout(()=>{
    el.textContent=PROMPTS[curPrompt];
    el.style.transition='opacity .2s ease,transform .2s ease';
    el.style.opacity='1';
    el.style.transform='translateY(0)';
  },180);
}
function dismissPrompt(){
  document.getElementById('pcard').classList.remove('show');
  promptVisible=false;
}
function usePrompt(){
  const txt=PROMPTS[curPrompt];
  const el=document.getElementById('eBody');el.focus();
  const sel=window.getSelection();
  const node=document.createTextNode((el.innerText.trim()?'\n\n':'')+txt+'\n\n');
  if(sel.rangeCount){const r=sel.getRangeAt(0);r.collapse(false);r.insertNode(node);r.collapse(false);sel.removeAllRanges();sel.addRange(r);}
  else{el.appendChild(node);}
  onEdit();
  dismissPrompt();
}
// auto-show prompt card on new blank entries after a short delay
function maybeShowPrompt(){
  const body=document.getElementById('eBody');
  if(body&&!body.innerText.trim()&&!promptVisible){
    setTimeout(()=>{
      if(!document.getElementById('eBody').innerText.trim()) showPromptCard();
    },1800);
  }
}


// ── FONT DETECTION ────────────────────────────────────────────────────
const FALLBACK_FONTS=[
  'Arial','Arial Black','Arial Narrow','Calibri','Candara','Century Gothic',
  'Franklin Gothic Medium','Gill Sans','Gill Sans MT','Helvetica','Impact',
  'Lucida Grande','Optima','Segoe UI','Tahoma','Trebuchet MS','Verdana',
  'Book Antiqua','Cambria','Cambria Math','Constantia','Garamond','Georgia',
  'Palatino','Palatino Linotype','Times New Roman',
  'Consolas','Courier New','Lucida Console','Menlo','Monaco','Source Code Pro',
  'Baskerville','Big Caslon','Bodoni MT','Bradley Hand','Brush Script MT',
  'Chalkboard','Chalkduster','Comic Sans MS','Copperplate','Didot','Futura',
  'Herculanum','Hoefler Text','Marker Felt','Noteworthy','Papyrus',
  'Rockwell','Snell Roundhand','Trattatello','Zapfino',
  'Segoe Print','Segoe Script','Sitka Text','Bahnschrift',
];

let allFonts=[], activeFontFamily='', fontDetectDone=false;
let fpOpen=false;

async function detectFonts(){
  let families=[];
  if(window.queryLocalFonts){
    try{
      const all=await window.queryLocalFonts();
      families=[...new Set(all.map(f=>f.family))].sort((a,b)=>a.localeCompare(b));
    }catch(e){}
  }
  if(!families.length){
    const canvas=document.createElement('canvas');
    const ctx=canvas.getContext('2d');
    ctx.font='72px monospace';
    const base=ctx.measureText('mmmmmmmmmlli').width;
    for(const f of FALLBACK_FONTS){
      ctx.font=`72px '${f}',monospace`;
      if(Math.abs(ctx.measureText('mmmmmmmmmlli').width-base)>0.1) families.push(f);
    }
    families.sort((a,b)=>a.localeCompare(b));
  }
  // pin Patrick Hand at top
  allFonts=[{label:'Patrick Hand (default)',value:'Patrick Hand',isDefault:true},...families.filter(f=>f!=='Patrick Hand').map(f=>({label:f,value:f}))];
  fontDetectDone=true;
  renderFontList(allFonts);
}

function renderFontList(fonts){
  const list=document.getElementById('fp-list');
  if(!fonts.length){list.innerHTML='<div class="fp-empty">No fonts found</div>';return;}
  const activeVal=activeFontFamily||'Patrick Hand';
  list.innerHTML=fonts.map((f,i)=>{
    const isActive=f.value===activeVal;
    const preview='Aa';
    return `<button class="fp-item${isActive?' active':''}" style="font-family:'${f.value}',sans-serif" onclick="setFont('${f.value.replace(/'/g,"&#39;")}')">
      <span class="fp-item-preview">${preview}</span>
      <span class="fp-item-name">${f.label}</span>
    </button>`;
  }).join('');
  // scroll active into view after render
  setTimeout(()=>{
    const active=list.querySelector('.fp-item.active');
    if(active)active.scrollIntoView({block:'nearest'});
  },50);
}

function filterFonts(q){
  const filtered=q.trim()?allFonts.filter(f=>f.label.toLowerCase().includes(q.toLowerCase())):allFonts;
  renderFontList(filtered);
}

function toggleFontPanel(){
  const panel=document.getElementById('font-panel');
  fpOpen=!fpOpen;
  if(fpOpen){
    saveSelection();
    if(!fontDetectDone) detectFonts();
    panel.classList.add('open');
    closeAllPops();
    setTimeout(()=>document.getElementById('fp-search')?.focus(),80);
  } else {
    panel.classList.remove('open');
    document.getElementById('fp-search').value='';
    if(fontDetectDone) renderFontList(allFonts);
  }
}

function closeFontPanel(){
  fpOpen=false;
  document.getElementById('font-panel').classList.remove('open');
  const s=document.getElementById('fp-search');
  if(s){s.value='';if(fontDetectDone)renderFontList(allFonts);}
}

function setFont(family){
  family=family.replace(/&#39;/g,"'");
  activeFontFamily=family;
  const short=family.length>11?family.slice(0,10)+"\u2026":family;
  document.getElementById("btn-font").textContent=short;
  document.getElementById("btn-font").style.fontFamily="'" +family+ "',sans-serif";
  closeFontPanel();
  restoreSelection();
  const el=document.getElementById("eBody");el.focus();
  const sel=window.getSelection();
  if(sel&&!sel.isCollapsed&&sel.toString().trim()){
    // Has selection — wrap selected text in a span with chosen font
    const range=sel.getRangeAt(0);
    const frag=range.extractContents();
    const sp=document.createElement("span");
    sp.style.fontFamily="'"+family+"',sans-serif";
    sp.appendChild(frag);
    range.insertNode(sp);
    // restore selection over the new span
    sel.removeAllRanges();
    const r=document.createRange();
    r.selectNodeContents(sp);
    sel.addRange(r);
  } else {
    // No selection — insert a styled zero-width carrier so next keystrokes use this font
    const sp=document.createElement("span");
    sp.style.fontFamily="'"+family+"',sans-serif";
    sp.textContent="\u200B";
    if(sel&&sel.rangeCount){
      const r=sel.getRangeAt(0);r.collapse(true);
      r.insertNode(sp);
      r.setStartAfter(sp);r.setEndAfter(sp);
      sel.removeAllRanges();sel.addRange(r);
    } else { el.appendChild(sp); }
  }
  onEdit();
}

function updateFontBtn(){
  const sel=window.getSelection();
  if(!sel||!sel.rangeCount)return;
  let node=sel.getRangeAt(0).commonAncestorContainer;
  if(node.nodeType===3)node=node.parentNode;
  let found="Patrick Hand";
  let cur=node;
  while(cur&&cur.id!=="eBody"){
    if(cur.style&&cur.style.fontFamily){
      found=cur.style.fontFamily.replace(/['"]/g,"").split(",")[0].trim();
      break;
    }
    cur=cur.parentNode;
  }
  activeFontFamily=found;
  const short=found.length>11?found.slice(0,10)+"\u2026":found;
  const btn=document.getElementById("btn-font");
  if(btn){btn.textContent=short;btn.style.fontFamily="'"+found+"',sans-serif";}
  document.querySelectorAll(".fp-item").forEach(b=>{
    const bfam=b.style.fontFamily.replace(/['"]/g,"").split(",")[0].trim();
    b.classList.toggle("active",bfam===found);
  });
}


// close font panel on outside click
document.addEventListener('mousedown',e=>{
  if(fpOpen&&!document.getElementById('fp-wrap').contains(e.target)) closeFontPanel();
});




// ── STREAK ─────────────────────────────────────────────────────────────
function dateKey(d){return d.toISOString().slice(0,10);}
function today(){return dateKey(new Date());}
function yesterday(){const d=new Date();d.setDate(d.getDate()-1);return dateKey(d);}

function calcStreak(){
  if(!E.length) return{streak:0,longest:0,total:0,writtenDays:new Set(),wordsByDay:{}};
  const days=new Set(E.map(e=>e.ca.slice(0,10)));
  // words per day — strip HTML tags
  const wordsByDay={};
  E.forEach(e=>{
    const dk=e.ca.slice(0,10);
    const tmp=document.createElement('div');
    tmp.innerHTML=(e.content||'');
    const wc=(tmp.innerText||tmp.textContent||'').trim().split(/\s+/).filter(Boolean).length;
    wordsByDay[dk]=(wordsByDay[dk]||0)+wc;
  });
  // current streak
  let streak=0,check=today();
  while(days.has(check)){streak++;const d=new Date(check);d.setDate(d.getDate()-1);check=dateKey(d);}
  if(!days.has(today())){
    streak=0;check=yesterday();
    while(days.has(check)){streak++;const d=new Date(check);d.setDate(d.getDate()-1);check=dateKey(d);}
  }
  // longest streak
  const sorted=[...days].sort();
  let longest=0,cur=0,prev=null;
  for(const dk of sorted){
    if(prev){const diff=(new Date(dk)-new Date(prev))/(864e5);cur=diff===1?cur+1:1;}
    else cur=1;
    if(cur>longest)longest=cur;
    prev=dk;
  }
  return{streak,longest,total:days.size,writtenDays:days,wordsByDay};
}

function dayColor(words, maxWords){
  if(!words) return null;
  // 5 intensity levels, each a mix of amber->orange->rust
  const t=Math.min(words/Math.max(maxWords,1),1);
  // levels: very faint → full amber
  const levels=[
    'rgba(200,96,16,.18)',
    'rgba(200,96,16,.38)',
    'rgba(200,96,16,.58)',
    'rgba(200,96,16,.78)',
    'rgba(200,96,16,.95)',
  ];
  const idx=Math.floor(t*4.99);
  return levels[idx];
}

function updateStreak(){
  const {streak,longest,total,writtenDays,wordsByDay}=calcStreak();
  document.getElementById('streakNum').textContent=streak;
  const flame=document.querySelector('.streak-flame');
  flame.style.filter=streak>0?'drop-shadow(0 0 4px rgba(224,120,32,.8))':'';

  // build tooltip
  const tip=document.getElementById('streakTip');
  const maxW=Math.max(...Object.values(wordsByDay),1);
  const cells=[];
  for(let i=27;i>=0;i--){
    const d=new Date();d.setDate(d.getDate()-i);
    const k=dateKey(d);
    const isToday=k===today();
    const words=wordsByDay[k]||0;
    const color=dayColor(words,maxW);
    const dateLabel=new Date(k).toLocaleDateString('en-US',{month:'short',day:'numeric'});
    const tip2=words?`${dateLabel} · ${words.toLocaleString()} words`:`${dateLabel} · no entry`;
    const style=color?`background:${color}`:'';
    cells.push(`<div class="st-day${isToday?' today':''}" style="${style}" data-tip="${tip2}"></div>`);
  }
  // legend swatches
  const swatches=[.18,.38,.58,.78,.95].map(a=>
    `<div class="st-legend-swatch" style="background:rgba(200,96,16,${a})"></div>`
  ).join('');

  // mood cells for last 28 days
  const moodCells=[];
  for(let i=27;i>=0;i--){
    const d2=new Date();d2.setDate(d2.getDate()-i);
    const k2=dateKey(d2);
    const isToday2=k2===today();
    // find latest mood entry for this day
    const dayMood=E.filter(e=>e.ca.slice(0,10)===k2&&e.mood).map(e=>e.mood)[0]||'';
    const dateLabel2=new Date(k2).toLocaleDateString('en-US',{month:'short',day:'numeric'});
    const tipTxt2=dayMood?`${dateLabel2} · ${dayMood}`:`${dateLabel2} · no mood`;
    moodCells.push(`<div class="mood-cal-day${isToday2?' today':''}" data-tip="${tipTxt2}">${dayMood}</div>`);
  }
  tip.innerHTML=
    `<div class="st-header"><div class="st-header-label">&#128293; writing streak</div></div>`+
    `<div class="st-stats">`+
      `<div class="st-row"><span class="st-row-label">&#128293; Current streak</span><span class="st-row-val">${streak} day${streak!==1?'s':''}</span></div>`+
      `<div class="st-row"><span class="st-row-label">&#127942; Longest streak</span><span class="st-row-val">${longest} day${longest!==1?'s':''}</span></div>`+
      `<div class="st-sep"></div>`+
      `<div class="st-row"><span class="st-row-label">&#128221; Writing days</span><span class="st-row-val">${total}</span></div>`+
      `<div class="st-row"><span class="st-row-label">&#128196; Total entries</span><span class="st-row-val">${E.length}</span></div>`+
    `</div>`+
    `<div class="st-cal-wrap">`+
      `<div class="st-cal-label">Last 28 days</div>`+
      `<div class="st-calendar">${cells.join('')}</div>`+
      `<div class="st-legend"><div class="st-legend-bar">${swatches}</div>fewer&nbsp;&nbsp;·&nbsp;&nbsp;more words</div>`+
    `</div>`;
}

let streakTipOpen=false;
function toggleStreakTip(e){
  e&&e.stopPropagation();
  streakTipOpen=!streakTipOpen;
  document.getElementById('streakTip').classList.toggle('open',streakTipOpen);
}
document.addEventListener('click',e=>{
  if(streakTipOpen&&!document.getElementById('streakPill').contains(e.target)){
    streakTipOpen=false;
    document.getElementById('streakTip').classList.remove('open');
  }
});

// Day-cell tooltip via event delegation
function getDT(){return document.getElementById('day-tip');}
document.addEventListener('mousemove',e=>{
  const dt=getDT();if(!dt)return;
  const cell=e.target.closest('.st-day');
  if(cell&&cell.dataset.tip){
    dt.textContent=cell.dataset.tip;
    dt.classList.add('show');
    const x=Math.min(e.clientX-(dt.offsetWidth/2||50),window.innerWidth-160);
    const y=e.clientY-36;
    dt.style.left=Math.max(8,x)+'px';
    dt.style.top=Math.max(8,y)+'px';
  } else {
    dt.classList.remove('show');
  }
});
document.addEventListener('mouseleave',()=>{const dt=getDT();if(dt)dt.classList.remove('show');},true);


// ── Font size slider helpers ──────────────────────────────────────────
// ── Font size controls ───────────────────────────────────────────────
function szUpdateUI(px){
  document.getElementById('btn-size').textContent=px+'px';
  document.getElementById('sz-slider').value=px;
  document.getElementById('sz-input').value=px;
  document.querySelectorAll('.sz-preset').forEach(b=>{
    b.classList.toggle('active',parseInt(b.textContent)===px);
  });
}
// Slider dragging — just update UI, don't apply yet (selection is preserved by mousedown saveSelection)
function szSliderMove(v){
  szUpdateUI(parseInt(v));
}
// Slider released — apply to selection
function szSliderCommit(v){
  const px=Math.min(72,Math.max(8,parseInt(v)));
  szUpdateUI(px);
  applyFontSize(px);
}
// Typing in the number input
function szInputChange(v){
  const px=Math.min(72,Math.max(8,parseInt(v)||8));
  document.getElementById('sz-slider').value=px;
  document.getElementById('btn-size').textContent=px+'px';
  document.querySelectorAll('.sz-preset').forEach(b=>{
    b.classList.toggle('active',parseInt(b.textContent)===px);
  });
}
// Preset click
function setSzPreset(px){
  szUpdateUI(px);
  closeAllPops();
  applyFontSize(px);
}
// Commit from Enter key in input
function szCommit(px){
  px=Math.min(72,Math.max(8,px||8));
  szUpdateUI(px);
  applyFontSize(px);
}
function applyFontSize(px){
  const el=document.getElementById('eBody');
  // Focus stays in eBody because all toolbar buttons use event.preventDefault()
  // on mousedown — so window.getSelection() still holds the real cursor/selection
  const sel=window.getSelection();
  const hasSelection=sel&&!sel.isCollapsed&&sel.toString().trim()&&
    el.contains(sel.anchorNode);

  if(hasSelection){
    // Wrap selected text in a sized span
    const range=sel.getRangeAt(0);
    const frag=range.extractContents();
    const sp=document.createElement('span');
    sp.style.fontSize=px+'px';
    sp.appendChild(frag);
    range.insertNode(sp);
    sel.removeAllRanges();
    const r=document.createRange();
    r.selectNodeContents(sp);
    sel.addRange(r);
  } else if(sel&&sel.rangeCount&&el.contains(sel.anchorNode)){
    // No selection — insert a sized carrier span at the cursor.
    // Subsequent typing inside it inherits the size.
    const range=sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    const sp=document.createElement('span');
    sp.style.fontSize=px+'px';
    sp.textContent='​'; // zero-width space as anchor
    range.insertNode(sp);
    // Put cursor after the ZWS, inside the span
    const r=document.createRange();
    r.setStart(sp.firstChild,1);
    r.collapse(true);
    sel.removeAllRanges();
    sel.addRange(r);
  }
  onEdit();
}
// ── Mood tracker ──────────────────────────────────────────────────────
const MOOD_COLORS={
  '😊':'rgba(90,180,80,.25)','😌':'rgba(80,160,200,.25)','😔':'rgba(80,100,200,.25)',
  '😤':'rgba(200,80,60,.25)','😰':'rgba(180,120,200,.25)','🤩':'rgba(220,160,40,.25)',
  '😴':'rgba(120,100,160,.2)','🥰':'rgba(220,100,140,.25)','🔥':'rgba(220,100,20,.28)',
  '🌧️':'rgba(100,120,180,.22)'
};

function pickMood(m){
  if(!aid)return;
  const e=E.find(x=>x.id===aid);if(!e)return;
  // toggle off if same mood clicked
  e.mood=(e.mood===m)?null:m;
  saveD();
  renderMoodBar(e.mood);
  renderList();
  updateStreak();
}

function renderMoodBar(mood){
  document.querySelectorAll('.mood-btn').forEach(b=>{
    b.classList.toggle('picked',b.dataset.mood===mood);
  });
  // tint editor bg
  const ep=document.querySelector('.ep');
  if(ep) ep.style.setProperty('--mood-tint', mood&&MOOD_COLORS[mood]?MOOD_COLORS[mood]:'transparent');
}



renderProfiles();

// ── PLAIN TEXT EXPORT ────────────────────────────────────────────────
function openExportTxt(){
  if(!E.length){toast('No entries to export.',true);return;}
  openM('mExpTxt');
}

function doExportTxt(){
  const incDate=document.getElementById('txtIncDate').checked;
  const incTitle=document.getElementById('txtIncTitle').checked;
  const sepLine=document.getElementById('txtSepLine').checked;
  const sep=sepLine?'\n'+'─'.repeat(48)+'\n\n':'\n\n';
  const lines=E.map(e=>{
    const parts=[];
    if(incDate){
      const d=new Date(e.ca).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
      parts.push(d);
    }
    if(incTitle&&e.title) parts.push(e.title);
    // strip HTML tags from rich content
    const tmp=document.createElement('div');
    tmp.innerHTML=e.content||'';
    const plainBody=tmp.innerText||tmp.textContent||'';
    if(plainBody.trim()) parts.push(plainBody.trim());
    return parts.join('\n');
  }).filter(Boolean);
  const out=lines.join(sep);
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([out],{type:'text/plain;charset=utf-8'}));
  a.download='folio-'+U.name+'-'+Date.now()+'.txt';
  a.click();URL.revokeObjectURL(a.href);
  closeM('mExpTxt');
  toast('Exported as plain text &#128196;');
}

// ── PLAIN TEXT IMPORT ─────────────────────────────────────────────────
function openImportTxt(){
  document.getElementById('imTxtF').value='';
  document.getElementById('imTxtErr').classList.remove('show');
  openM('mImpTxt');
}

async function doImportTxt(){
  const file=document.getElementById('imTxtF').files[0];
  const err=document.getElementById('imTxtErr');
  if(!file){showE(err,'Please select a .txt file.');return;}
  const text=await file.text();
  // split on blank lines — two or more newlines = new entry
  const blocks=text.split(/\n{2,}/).map(b=>b.trim()).filter(Boolean);
  if(!blocks.length){showE(err,'No entries found in file.');return;}
  const now=Date.now();
  const imported=blocks.map((block,i)=>{
    const ls=block.split('\n').filter(l=>l.trim());
    const title=ls[0]||'Imported Entry';
    const body=ls.slice(1).join('\n').trim();
    return{id:(now+i).toString(),title,content:body,ca:new Date().toISOString(),ua:new Date().toISOString()};
  });
  const ids=new Set(E.map(e=>e.id));
  const newOnes=imported.filter(e=>!ids.has(e.id));
  E=[...newOnes,...E];
  saveD();renderList();
  closeM('mImpTxt');
  toast('Imported '+newOnes.length+' entr'+(newOnes.length===1?'y':'ies')+' from text!');
}



// ── VENT MODE ─────────────────────────────────────────────────────────
const VK = 'folio_vent_v2';
let vDur = 86400, vTick = null;

const vGet   = () => { try{return JSON.parse(localStorage.getItem(VK))||null;}catch{return null;} };
const vStore = d  => localStorage.setItem(VK, JSON.stringify(d));
const vClear = () => localStorage.removeItem(VK);

// Purge expired on load
(()=>{ const v=vGet(); if(v && Date.now()>=v.exp) vClear(); })();

function openVentSheet(){
  const v = vGet();
  if(v){ vOpenPage(); return; }
  const el = document.getElementById('ventSheet');
  el.classList.remove('closing');
  el.style.display = 'flex';
}
function vCloseSheet(){
  const el = document.getElementById('ventSheet');
  el.classList.add('closing');
  setTimeout(()=>{ el.style.display='none'; el.classList.remove('closing'); }, 290);
}

function vSelDur(sec){
  vDur = sec;
  document.querySelectorAll('.vdopt').forEach(o=>{
    const isSel = +o.dataset.sec === sec;
    o.classList.toggle('sel', isSel);
    o.style.borderColor = isSel ? '#c03020' : '';
    o.style.background  = isSel ? 'rgba(160,40,10,.18)' : '';
  });
}

function vStart(){
  const now = Date.now();
  vStore({ title:'', body:'', created:now, exp: now + vDur*1000 });
  vCloseSheet();
  vOpenPage();
}

function vOpenPage(){
  const v = vGet();
  if(!v) return;
  document.getElementById('vTitle').value = v.title||'';
  document.getElementById('vBody').innerHTML = v.body||'';
  document.getElementById('vDate').textContent =
    new Date(v.created).toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  vWCUpdate();
  const pg = document.getElementById('ventPage');
  pg.classList.remove('closing');
  pg.style.display = 'flex';
  pg.classList.add('opening');
  setTimeout(()=>pg.classList.remove('opening'), 400);
  vStartTick();
  setTimeout(()=>document.getElementById(v.title?'vBody':'vTitle').focus(), 80);
}

function vClose(){
  const pg = document.getElementById('ventPage');
  pg.classList.add('closing');
  setTimeout(()=>{ pg.style.display='none'; pg.classList.remove('closing'); vStopTick(); }, 290);
}

function vSave(){
  const v = vGet(); if(!v) return;
  v.title = document.getElementById('vTitle').value;
  v.body  = document.getElementById('vBody').innerHTML;
  vStore(v);
}

function vWCUpdate(){
  const el = document.getElementById('vBody');
  const n = (el.innerText||'').trim().split(/\s+/).filter(Boolean).length;
  document.getElementById('vWC').textContent = n+' word'+(n!==1?'s':'');
}

function vBurn(){
  const pg = document.getElementById('ventPage');
  startFireCanvas();
  pg.classList.add('burning');
  setTimeout(()=>{
    vClear();
    document.getElementById('vTitle').value = '';
    document.getElementById('vBody').innerHTML = '';
    vWCUpdate();
    pg.classList.remove('burning');
    pg.style.display = 'none';
    vStopTick();
  }, 1400);
  setTimeout(()=>{
    stopFireCanvas();
    toast('🔥 Gone forever.');
  }, 1700);
}

// ── Fire canvas particle system ───────────────────────────────────────
let fireRaf = null;
const FIRE_COLORS = [
  'rgba(255,240,180,',  // white-yellow core
  'rgba(255,200,60,',   // gold
  'rgba(255,130,20,',   // orange
  'rgba(220,50,10,',    // deep orange
  'rgba(160,20,5,',     // dark red
  'rgba(80,10,2,',      // ember
];

function startFireCanvas(){
  const canvas = document.getElementById('burnCanvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');
  const ctx = canvas.getContext('2d');
  const particles = [];

  function spawnParticles(){
    // Spawn a row of embers along the bottom edge, growing upward over time
    const progress = Math.min(1,(Date.now()-startTime)/1200);
    const spawnY = canvas.height - progress * canvas.height * 0.9;
    const count = Math.floor(8 + Math.random()*10);
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: spawnY + Math.random()*60,
        vx: (Math.random()-.5)*1.8,
        vy: -(1.5 + Math.random()*3.5),
        life: 1,
        decay: .008 + Math.random()*.018,
        size: 4 + Math.random()*18,
        colorIdx: Math.floor(Math.random()*FIRE_COLORS.length),
        wobble: Math.random()*Math.PI*2,
        wobbleSpeed: .08+Math.random()*.12,
      });
    }
    // Embers (tiny sparks)
    for(let i=0;i<5;i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: spawnY + Math.random()*40,
        vx: (Math.random()-.5)*4,
        vy: -(3+Math.random()*5),
        life: 1, decay:.02+Math.random()*.03,
        size: 1+Math.random()*3,
        colorIdx:1, wobble:0, wobbleSpeed:0, ember:true,
      });
    }
  }

  const startTime = Date.now();
  let lastSpawn = 0;

  function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const now = Date.now();
    if(now - lastSpawn > 30){ spawnParticles(); lastSpawn=now; }

    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= .04; // upward acceleration
      p.vx += Math.sin(p.wobble)*0.12;
      p.wobble += p.wobbleSpeed;
      p.life -= p.decay;
      if(p.life<=0){ particles.splice(i,1); continue; }

      if(p.ember){
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle = FIRE_COLORS[1]+p.life+')';
        ctx.fill();
      } else {
        // Flame petal shape
        const h = p.size*(1+p.life*.5);
        const grad = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y-h*.4,h);
        grad.addColorStop(0, FIRE_COLORS[p.colorIdx]+Math.min(1,p.life*1.4)+')');
        grad.addColorStop(1, FIRE_COLORS[Math.min(p.colorIdx+2,FIRE_COLORS.length-1)]+'0)');
        ctx.beginPath();
        ctx.ellipse(p.x,p.y,p.size*.5,h,0,0,Math.PI*2);
        ctx.fillStyle=grad;
        ctx.fill();
      }
    }

    // Hot glow overlay at the bottom
    const progress = Math.min(1,(now-startTime)/1200);
    const glowH = canvas.height*progress*.8;
    const glow = ctx.createLinearGradient(0,canvas.height,0,canvas.height-glowH);
    glow.addColorStop(0,'rgba(220,60,10,0.35)');
    glow.addColorStop(1,'rgba(220,60,10,0)');
    ctx.fillStyle=glow;
    ctx.fillRect(0,canvas.height-glowH,canvas.width,glowH);

    fireRaf = requestAnimationFrame(frame);
  }
  fireRaf = requestAnimationFrame(frame);
}

function stopFireCanvas(){
  if(fireRaf){ cancelAnimationFrame(fireRaf); fireRaf=null; }
  const canvas=document.getElementById('burnCanvas');
  canvas.classList.remove('active');
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function vStartTick(){ vStopTick(); vTickFn(); vTick=setInterval(vTickFn,1000); }
function vStopTick(){ if(vTick){clearInterval(vTick);vTick=null;} }

function vTickFn(){
  const v = vGet();
  if(!v){ vStopTick(); return; }
  const rem = Math.max(0, v.exp - Date.now());
  if(rem===0){ vBurn(); return; }
  const h=Math.floor(rem/36e5), m=Math.floor((rem%36e5)/6e4), s=Math.floor((rem%6e4)/1e3);
  document.getElementById('vTimerTxt').textContent =
    (h ? String(h).padStart(2,'0')+':' : '') +
    String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  const urgent = rem < 60000;
  document.getElementById('vTimer').style.borderColor = urgent ? 'rgba(220,40,20,.7)' : '';
  document.getElementById('vTimer').style.color       = urgent ? '#ff6040' : '#e07050';
}

document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    if(document.getElementById('ventSheet').style.display==='flex') vCloseSheet();
    else if(document.getElementById('ventPage').style.display==='flex') vClose();
  }
});


// ── Page Style ──────────────────────────────────────────────────────
function setPageStyle(style){
  closeAllPops();
  localStorage.setItem('folio_page', style);
  document.documentElement.setAttribute('data-page', style);
  ['fresh','ruled','dotted'].forEach(s=>{
    document.getElementById('pg-'+s).classList.toggle('sel', s===style);
  });
  const labels={'fresh':'Fresh','ruled':'Ruled','dotted':'Dotted'};
  const icons={'fresh':'📄','ruled':'📋','dotted':'⠿'};
  const lbl=document.getElementById('btn-page-lbl');
  const ico=document.getElementById('btn-page-icon');
  if(lbl) lbl.textContent=labels[style]||style;
  if(ico) ico.textContent=icons[style]||'📄';
}
// Apply on load
(()=>{
  const s = localStorage.getItem('folio_page')||'fresh';
  document.documentElement.setAttribute('data-page', s);
  document.querySelectorAll('.pg-opt').forEach(o=>o.classList.remove('sel'));
  const el=document.getElementById('pg-'+s);
  if(el) el.classList.add('sel');
  const labels={'fresh':'Fresh','ruled':'Ruled','dotted':'Dotted'};
  const icons={'fresh':'📄','ruled':'📋','dotted':'⠿'};
  const lbl=document.getElementById('btn-page-lbl');
  const ico=document.getElementById('btn-page-icon');
  if(lbl) lbl.textContent=labels[s]||s;
  if(ico) ico.textContent=icons[s]||'📄';
})();


// ── Page line/dot spacing synced to font size ────────────────────────
// Ruled line spacing is fixed — set once, never changes
(()=>{
  document.documentElement.style.setProperty('--line-h','30.4px');
  document.documentElement.style.setProperty('--dot-s','26px');
})();