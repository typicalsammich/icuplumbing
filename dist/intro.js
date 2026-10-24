/* THE FLATLINE. Adjust duration; set enabled:false to disable automatic playback. */
(()=>{'use strict';
const config={enabled:true,duration:5000,mobileDuration:5000,sessionKey:'icu-flatline-v3-seen'};
const overlay=document.querySelector('#intro');if(!overlay)return;
const replayQuery=new URLSearchParams(location.search).get('intro')==='replay';
if(replayQuery){const clean=new URL(location.href);clean.searchParams.delete('intro');history.replaceState(null,'',clean.pathname+clean.search+clean.hash)}
let seen=false;try{seen=sessionStorage.getItem(config.sessionKey)==='1'}catch{}
let active=false,cleanup=()=>{};
function play(explicit=false){
 if(active)return;const canvas=overlay.querySelector('canvas'),ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced&&!explicit)return;
 if(explicit)window.scrollTo({top:0,behavior:'instant'});
 active=true;overlay.hidden=false;overlay.classList.remove('closing');overlay.classList.toggle('static-intro',reduced);
 const message=overlay.querySelector('.intro-message'),brand=overlay.querySelector('.intro-brand'),skip=overlay.querySelector('#skip-intro');
 const emblem=brand.querySelector('img'),tagline=brand.querySelector('p'),headerLogo=document.querySelector('header .brand img');
 let dock=null;document.body.classList.add('intro-logo-held');
 message.style.opacity='0';brand.style.opacity=reduced?'1':'0';
 let note=brand.querySelector('small');if(!note){note=document.createElement('small');brand.append(note)}note.textContent=reduced?'Your device requests reduced motion. Here is the static brand reveal.':'';
 skip.firstChild.textContent=reduced?'Continue to site ':'Skip intro ';
 const previousFocus=document.activeElement;const inertElements=[...document.body.children].filter(el=>el!==overlay&&!['SCRIPT','STYLE','LINK'].includes(el.tagName)).map(el=>[el,el.inert]);inertElements.forEach(([el])=>el.inert=true);
 document.body.classList.add('intro-running');skip.focus({preventScroll:true});
 let frame=0,timer=0,start=0,elapsed=0,playing=false,w=0,h=0,finished=false;const duration=innerWidth<600?config.mobileDuration:config.duration;
 const clamp=x=>Math.max(0,Math.min(1,x));const ease=x=>{x=clamp(x);return x*x*(3-2*x)};const g=(x,c,s)=>Math.exp(-(((x-c)/s)**2));
 const ecg=x=>-(.12*g(x,.29,.024)-.15*g(x,.37,.01)+g(x,.4,.009)-.45*g(x,.425,.013)+.2*g(x,.51,.034));
 function resize(){dock=headerLogo?.getBoundingClientRect()||null;w=innerWidth;h=innerHeight;const dpr=Math.min(devicePixelRatio||1,innerWidth<600?1.25:1.5);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);if(reduced)composeBrand(.8)}
 // One logo remains on screen as its rectangle meets the real header image.
 function composeBrand(t){
  const appear=reduced?1:ease((t-.74)/.07);
  const docking=reduced?0:ease((t-.84)/.15);
  const width=Math.min(w*.78,520),height=width*2/3;
  const from={left:(w-width)/2,top:h*.47-height*.56,width,height};
  const target=dock&&dock.width>0?dock:from;
  const mix=(a,b)=>a+(b-a)*docking;
  const box={left:mix(from.left,target.left),top:mix(from.top,target.top),width:mix(from.width,target.width),height:mix(from.height,target.height)};
  brand.style.opacity=String(appear);
  Object.assign(emblem.style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px'});
  tagline.style.top=(from.top+from.height*.9)+'px';tagline.style.opacity=String(1-ease((t-.85)/.06));
  note.style.top=(from.top+from.height*.9+40)+'px';
  canvas.style.opacity=reduced?'0':String(1-ease((t-.84)/.15));
  skip.style.opacity=reduced?'1':String(1-ease((t-.94)/.05));
 }
 function finish(restoreFocus=false){if(finished)return;finished=true;active=false;playing=false;cancelAnimationFrame(frame);clearTimeout(timer);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('resize',resize);window.removeEventListener('pagehide',leave);skip.removeEventListener('click',onSkip);document.removeEventListener('keydown',onKey);document.body.classList.remove('intro-running','intro-logo-held');inertElements.forEach(([el,prior])=>el.inert=prior);overlay.hidden=true;overlay.classList.remove('static-intro');canvas.width=1;canvas.height=1;try{sessionStorage.setItem(config.sessionKey,'1')}catch{}if(restoreFocus&&previousFocus?.isConnected&&previousFocus!==document.body)previousFocus.focus({preventScroll:true});else{const main=document.querySelector('#main');main.setAttribute('tabindex','-1');main.focus({preventScroll:true})}}
 function onSkip(){finish(true)}function onKey(ev){if(ev.key==='Escape')finish(true)}function leave(){finish(false)}
 function visibility(){if(document.hidden){if(playing){elapsed+=performance.now()-start;playing=false;cancelAnimationFrame(frame);clearTimeout(timer)}}else resume()}
 function resume(){if(finished||playing||reduced||document.hidden)return;playing=true;start=performance.now();timer=setTimeout(()=>finish(),Math.max(0,duration-elapsed)+1500);frame=requestAnimationFrame(draw)}
 cleanup=finish;skip.addEventListener('click',onSkip);document.addEventListener('keydown',onKey);document.addEventListener('visibilitychange',visibility);window.addEventListener('resize',resize);window.addEventListener('pagehide',leave,{once:true});resize();
 function draw(now){if(finished||!playing)return;try{const t=(elapsed+now-start)/duration;ctx.clearRect(0,0,w,h);ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);if(t>=1){finish();return}
 const cy=h*.47,left=w*.1,right=w*.9,span=right-left,amp=Math.min(w*.13,85);const fade=ease(t/.11),water=ease((t-.55)/.16),pipe=ease((t-.71)/.12);const beat=t<.11?0:t<.27?1-ease((t-.23)/.04):t<.55?0:1;
 message.style.opacity=t>=.27&&t<.41?String(ease((t-.27)/.025)*(1-ease((t-.38)/.03))):'0';composeBrand(t);
 // The same curve changes continuously from ECG to flowing water.
 ctx.save();ctx.globalAlpha=fade*(1-pipe*.8)*(1-ease((t-.76)/.08));const trace=ctx.createLinearGradient(left,cy-20,right,cy+20);trace.addColorStop(0,'#164a91');trace.addColorStop(.45,water?'#d4efff':'#84b6ff');trace.addColorStop(.65,water?'#21679e':'#367df4');trace.addColorStop(1,'#d5f0ff');ctx.strokeStyle=trace;ctx.lineWidth=1.6+water*17;ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor='#0b4cc4';ctx.shadowBlur=10*(1-water);ctx.beginPath();const travel=t<.27?clamp((t-.11)/.16):t<.55?.5:clamp(.32+(t-.55)*2);for(let j=0;j<=320;j++){const x=j/320;const y=cy+ecg((x-travel)*1.6+.4)*amp*beat*(1-water)+Math.sin(x*15-t*45)*water*6;j?ctx.lineTo(left+x*span,y):ctx.moveTo(left+x*span,y)}ctx.stroke();
 if(water){ctx.shadowBlur=0;ctx.globalAlpha=water*(1-pipe*.8)*.7*(1-ease((t-.76)/.08));ctx.strokeStyle='#d7f2ff';ctx.lineWidth=1;ctx.beginPath();for(let j=0;j<=160;j++){const x=j/160,y=cy-3+Math.sin(x*15-t*45)*water*6;j?ctx.lineTo(left+x*span,y):ctx.moveTo(left+x*span,y)}ctx.stroke()}ctx.restore();
 if(t>=.41&&t<.55){const q=clamp((t-.41)/.14),y=cy-140+140*q*q,r=innerWidth<600?12:15;ctx.save();ctx.translate(w/2,y);ctx.beginPath();ctx.moveTo(0,-r*1.8);ctx.bezierCurveTo(r*.3,-r*.5,r,0,r,r*.5);ctx.bezierCurveTo(r,r*1.8,-r,r*1.8,-r,r*.5);ctx.bezierCurveTo(-r,0,-r*.3,-r*.5,0,-r*1.8);const drop=ctx.createRadialGradient(-r*.4,0,1,0,r*.3,r*1.8);drop.addColorStop(0,'#f3fcff');drop.addColorStop(.22,'#89b6ca');drop.addColorStop(.5,'#182d39');drop.addColorStop(.82,'#c3e0eb');drop.addColorStop(1,'#284960');ctx.fillStyle=drop;ctx.fill();ctx.strokeStyle='#d8eff6';ctx.lineWidth=.8;ctx.stroke();ctx.restore()}
 if(t>=.55&&t<.63){const q=(t-.55)/.08;ctx.strokeStyle=`rgba(148,200,247,${1-q})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(w/2,cy,8+q*80,3+q*20,0,0,Math.PI*2);ctx.stroke()}
 if(pipe&&t<.87){ctx.save();ctx.globalAlpha=pipe*(1-ease((t-.79)/.08));const cx=w*.58,maxR=Math.max(w,h)*1.05;const metal=ctx.createRadialGradient(cx,cy,12,cx,cy,maxR);metal.addColorStop(0,'#d7e5ec');metal.addColorStop(.035,'#9caeb8');metal.addColorStop(.075,'#12202c');metal.addColorStop(.24,'#0e1720');metal.addColorStop(.48,'#3a4650');metal.addColorStop(.65,'#88939b');metal.addColorStop(.72,'#25313a');metal.addColorStop(1,'#050b10');ctx.fillStyle=metal;ctx.fillRect(0,0,w,h);for(let k=0;k<12;k++){const z=(k/12+(t-.71)*2.4)%1,r=15+z*z*maxR;ctx.strokeStyle=`rgba(183,196,206,${.1+z*.18})`;ctx.lineWidth=1+z*4;ctx.beginPath();ctx.ellipse(cx,cy,r,r*.8,0,0,Math.PI*2);ctx.stroke()}ctx.strokeStyle='#428bbc';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx,cy+15);ctx.bezierCurveTo(cx+20,cy+50,w*.4,h*.7,w*.1,h);ctx.stroke();ctx.restore()}
 frame=requestAnimationFrame(draw)}catch{finish()}}
 resume();
}
 document.querySelectorAll('[data-replay-intro]').forEach(link=>link.addEventListener('click',ev=>{ev.preventDefault();play(true)}));
 if(replayQuery)play(true);else if(config.enabled&&!seen){if(document.hidden){const wait=()=>{if(!document.hidden){document.removeEventListener('visibilitychange',wait);play()}};document.addEventListener('visibilitychange',wait)}else play()}
})();
