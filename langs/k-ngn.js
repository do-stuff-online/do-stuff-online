(() => {
'use strict' // ngn/k, (c) 2019-2021 ngn, GNU AGPLv3 - https://codeberg.org/ngn/k/blob/master/LICENSE
// Adapted from original source by chunkybanana
const{min,max}=Math,{now}=Date,U8=x=>new Uint8Array(x),doc=document,
T1=new TextEncoder,t1=x=>T1.encode(x),
T0=new TextDecoder,t0=x=>T0.decode(x),
c1=x=>{let r='';for(let i=0;i<x.length;i++)r+=String.fromCharCode(x[i]);return r},
c0=x=>{const r=U8(x.length);for(let i=0;i<x.length;i++)r[i]=x.charCodeAt(i);return r},
p0=x=>{try{return x?t0(z0(c0(atob(x)))):''}catch(x){console.error(x);return''}},
p1=x=>x?btoa(c1(z1(t1(x)))):'',
kc=x=>x.which+1000*(x.ctrlKey+10*(x.shiftKey+10*x.altKey)),
hsh=x=>x.split``.reduce((x,y)=>0|(x<<5)-x+y.charCodeAt(0),0),
hx8=x=>('0000000'+x.toString(16)).slice(-8),
rdy=f=>['complete','interactive'].indexOf(doc.readyState)<0?doc.addEventListener('DOMContentLoaded',f):setTimeout(f,1),
thr=(f,d)=>{let i,l=0,g=_=>{i=0;l=now();f()};return()=>i=i||setTimeout(g,max(1,l+d-now()))}

let app,heap,inp=''
const kw=fetch`https://ngn.bitbucket.io/k/k.wasm`.then(x=>x.arrayBuffer()),
M=(p,n)=>U8(app.memory.buffer).subarray(p,p+n),
g1=p=>new DataView(app.memory.buffer).getUint8(p),
gb=p=>{let q=p;while(g1(q))q++;return M(p,q-p)},
gs=p=>t0(gb(p)),
s4=(p,x)=>new DataView(app.memory.buffer).setUint32(p,x,1),
S4=(p,a)=>a.forEach((x,i)=>s4(p+4*i,x)),
ma=n=>{heap+=n;let m=app.memory,l=m.buffer.byteLength;heap>l&&m.grow((heap-l-1>>>16)+1);return heap-n},
msn=s=>{s=t1(s);let p=ma(s.length);M(p,s.length).set(s);return[p,s.length]},
ms=s=>msn(s)[0],
wa=_=>kw.then(x=>WebAssembly.instantiate(x,{env})),
env={sin:Math.sin,cos:Math.cos,log:Math.log,exp:Math.exp,
 js_in:(a,n)=>{const s=inp||prompt`stdin:\n`;inp='';return T1.encodeInto(s,M(a,n)).written},
 js_out:(a,n)=>(console.log(t0(M(a,n))),n),
 js_log:a=>console.log(t0(gb(a))),
 js_time:(a,b)=>{const t=now();s4(a,t/1000);s4(b,t%1000*1000)},
 js_exit:x=>{throw Error(`exit(${x})`)},
 js_alloc:n=>{const p=4096,r=heap%p;r&&ma(p-r);return ma(n)},
 js_eval:(a,m,r,n)=>T1.encodeInto(''+eval(t0(M(a,m))),M(r,n)).written}

let w=wa();const kst=s=>s.replace(/[\0\t\n\r\"\\]/g,c=>'\\'+'0tnr"\\'['\0\t\n\r\"\\'.indexOf(c)])
rdy(_=>{

  const ev=s=>w.then(x=>{app=x.instance.exports;heap=app.__heap_base;
   const O_RDWR=2,O_CREAT=64/*512 on freebsd*/
   const f=app.open(ms('a.k\0'),O_RDWR|O_CREAT,438/*0666*/),[q,nq]=msn(s);app.write(f,q,nq);app.close(f)
   const h=heap,a=heap+=T1.encodeInto('k\0a.k\0',M(heap,8)).written;S4(a,[h,h+2,0,0]);heap+=16;
   let e;try{app.main(2,a)}catch(x){e=x}if(e&&e.message!=='exit(0)')throw e;w=wa()})
  const evp=_=>{const v=ed.value,s=v.slice(-1)==='\n'?v:v+'\n',p=p1(v);location.hash=p+'-';ev(s).then(_=>location.hash=p)}
  ev('5')
})

let cnv,g,iid,tid,aid,tickPeriod=50
const pi=Math.PI,tau=2*pi,K=s=>app.evs(ms(s+'\0')),
tick=_=>K('tick[]'),
draw=_=>{K('draw[]');tid=setTimeout(raf,40)},
raf=_=>aid=requestAnimationFrame(draw),
hgr=_=>{if(g)return;doc.body.appendChild(cnv=doc.createElement('canvas'));g=cnv.getContext('2d')
 onresize();g.font='0.05px monospace';iid=setInterval(tick,tickPeriod);raf()
 onkeydown=onkeyup=e=>g&&K('k'+e.type[3]+'@'+e.keyCode)
 onkeypress=e=>{if(g){let c=e.charCode;K('kx@'+c);(c===10||c===13)&&K('kr@10');c===8&&K('kb@8')}}
 cnv.onmousedown=cnv.onmouseup=cnv.onmousemove=
  e=>{const r=cnv.getBoundingClientRect();K('m'+e.type[5]+'@'+[e.clientX-r.x,e.clientY-r.y])}},
txt=_=>{if(!g)return;cnv.parentNode.removeChild(cnv);clearInterval(iid);clearTimeout(tid);cancelAnimationFrame(aid)
 cnv=g=iid=tid=aid=null}

})()