/* ══ CURSOR ══ */
const cursor=document.getElementById('cursor');
const trail=document.getElementById('cursor-trail');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function animCursor(){
  tx+=(mx-tx)*.15;ty+=(my-ty)*.15;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
  trail.style.left=tx+'px';trail.style.top=ty+'px';
  requestAnimationFrame(animCursor);
})();

/* ══ HAMBURGER ══ */
document.getElementById('hamburger').onclick=()=>document.getElementById('mobile-menu').classList.toggle('open');
function closeMM(){document.getElementById('mobile-menu').classList.remove('open')}

/* ══ SPACE CANVAS ══ */
(function(){
  const c=document.getElementById('space-canvas');
  const ctx=c.getContext('2d');
  let W,H,stars=[],atoms=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<200;i++) stars.push({x:Math.random(),y:Math.random(),r:Math.random()*.85+.15,a:Math.random()*.45+.1,v:Math.random()*.0003+.0001});
  // floating atom circles
  for(let i=0;i<6;i++) atoms.push({x:Math.random()*W,y:Math.random()*H,r:40+Math.random()*60,a:Math.random()*Math.PI*2,speed:(.002+Math.random()*.003)*(Math.random()<.5?1:-1),vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12});

  function drawAtom(ctx,x,y,r,angle,col){
    ctx.save();ctx.translate(x,y);
    ctx.beginPath();ctx.arc(0,0,r*.15,0,Math.PI*2);ctx.fillStyle=col+'44';ctx.fill();
    for(let i=0;i<3;i++){
      ctx.save();ctx.rotate(angle+i*Math.PI/3);
      ctx.beginPath();ctx.ellipse(0,0,r,r*.4,0,0,Math.PI*2);
      ctx.strokeStyle=col+'22';ctx.lineWidth=1;ctx.stroke();
      // electron dot
      ctx.beginPath();ctx.arc(r,0,3,0,Math.PI*2);ctx.fillStyle=col+'55';ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  const cols=['#00d4ff','#c026d3','#7c3aed','#3b82f6'];
  function frame(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{
      s.a+=s.v;if(s.a>.65||s.a<.05)s.v*=-1;
      ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,215,255,${s.a})`;ctx.fill();
    });
    atoms.forEach((a,i)=>{
      a.x+=a.vx;a.y+=a.vy;a.a+=a.speed;
      if(a.x<-100)a.x=W+100;if(a.x>W+100)a.x=-100;
      if(a.y<-100)a.y=H+100;if(a.y>H+100)a.y=-100;
      drawAtom(ctx,a.x,a.y,a.r,a.a,cols[i%cols.length]);
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ══ FLOATING PHYSICS LABELS ══ */
(function(){
  const wrap=document.getElementById('physics-floats');
  const formulas=['F = ma','v = f&#955;','E = mc²','p = mv','W = Fd','V = IR','KE = ½mv²','F = kq₁q₂/r²','P = W/t','v² = u²+2as','&#949; = -d&#934;/dt','E = hf','J = F&#916;t','R = R₁+R₂','KE = hf - W₀'];
  const physicists=['Isaac Newton','Albert Einstein','Niels Bohr','Marie Curie','James Maxwell','Michael Faraday','Christian Doppler','Charles Coulomb','Christiaan Huygens','Galileo Galilei','Heinrich Hertz','Max Planck','Ernest Rutherford','James Joule'];
  const symbols=['⚛','→','∫','∑','∇','∂','∞','Ω','λ','φ','ψ','α','β','γ'];

  const all=[
    ...formulas.map(f=>{return{text:f,cls:'pf-formula'}}),
    ...physicists.map(p=>{return{text:p,cls:'pf-name'}}),
    ...symbols.map(s=>{return{text:s,cls:'pf-symbol'}}),
  ];

  all.forEach((item,i)=>{
    const el=document.createElement('div');
    el.className='physics-float '+item.cls;
    el.innerHTML=item.text;
    el.style.left=(3+Math.random()*90)+'%';
    el.style.setProperty('--rot',(Math.random()*16-8)+'deg');
    const dur=22+Math.random()*26;
    el.style.animationDuration=dur+'s';
    el.style.animationDelay=-(Math.random()*dur)+'s';
    wrap.appendChild(el);
  });
})();

/* ══ PANELS ══ */
const PANELS=[
  {tag:'Wave Physics',title:'WAVES',physicist:'Christiaan Huygens',sub:'All waves transfer energy without transferring matter. Understand transverse vs longitudinal, interference, and diffraction.',formula:'v = f&#955; &nbsp;|&nbsp; T = 1/f &nbsp;|&nbsp; f = 1/T',col:'#0ea5e9',draw:'waves', src:'Topics/waves.html'},
  {tag:'Electromagnetism',title:'ELECTRICITY',physicist:'Georg Simon Ohm',sub:"Explore the flow of charge, current, voltage and resistance. Ohm's Law connects them all.",formula:'V = IR &nbsp;|&nbsp; P = VI = I²R &nbsp;|&nbsp; Q = It',col:'#fbbf24',draw:'elec',src:'Topics/magnets.html'},
  {tag:'Classical Mechanics',title:'FORCES',physicist:'Sir Isaac Newton',sub:'A force is any interaction that, when unopposed, changes the motion of an object. Forces can be contact forces like friction and tension, or non-contact forces like gravity and electromagnetism.',formula:'F = ma &nbsp;|&nbsp; F_net = ΣF &nbsp;|&nbsp; W = mg',col:'#f97316',src: 'Topics/forces.html',draw:'newton'},
  //{tag:'Wave Physics',title:'WAVE TYPES',physicist:'Thomas Young',sub:'Transverse waves oscillate perpendicular to travel (light). Longitudinal waves oscillate parallel (sound).',formula:'&#955; = v/f &nbsp;|&nbsp; f = 1/T &nbsp;|&nbsp; v = f&#955;',col:'#10b981',draw:'wavetype', src:'waves.html'},
  {tag:'Electrostatics',title:'ELECTROSTATIC FORCES',physicist:'Charles-Augustin de Coulomb',sub:"Coulomb's Law: the force between two charges depends on their magnitudes and the square of the distance.",formula:'F = kq₁q₂ / r² &nbsp;|&nbsp; k = 9×10⁹ Nm²/C²',col:'#a78bfa',draw:'coulomb', src:'Topics/coulomb.html'},
  {tag:'Electromagnetism',title:'CIRCUITS',physicist:'Gustav Kirchhoff',sub:"Series and parallel circuits behave very differently. Master Kirchhoff's laws, EMF, and internal resistance.",formula:'R_total = R₁+R₂ &nbsp;|&nbsp; 1/R = 1/R₁+1/R₂',col:'#6366f1',draw:'circuits', src:'Topics/circuits.html'},
  {tag:'Electromagnetism',title:"OHM'S LAW",physicist:'Georg Simon Ohm',sub:"Ohm's Law states that the current through a conductor is directly proportional to the voltage across it and inversely proportional to its resistance.",formula:'V = IR &nbsp;|&nbsp; I = V/R &nbsp;|&nbsp; R = V/I',col:'#facc15',src:'Topics/ohms.html',draw:'elec'},
  //{tag:'Classical Mechanics',title:"FORCES",physicist:'Sir Isaac Newton',sub:'Three laws that govern all of classical mechanics: inertia, force equals mass times acceleration, and action-reaction.',formula:'F = ma &nbsp;|&nbsp; F₁₂ = −F₂₁ &nbsp;|&nbsp; ΣF = 0',col:'#e2e8f0',draw:'newton', src:'Topics/vector.html'},
  {tag:'Classical Mechanics',title:'VECTORS',physicist:'Willard Gibbs',sub:'A vector is a quantity that has both magnitude and direction. Vectors can be added, subtracted and resolved into components. Understanding vectors is fundamental to all of physics.',formula:'F = F_x + F_y &nbsp;|&nbsp; |F| = √(F_x² + F_y²) &nbsp;|&nbsp; θ = tan⁻¹(F_y/F_x)',col:'#22d3ee',src:'Topics/vectors.html',draw:'motion'},
  {tag:'Mechanics',title:'PROJECTILE MOTION',physicist:'Galileo Galilei',sub:'Vertical projectile motion under gravity follows the kinematic equations. g ≈ 9.8 m/s² downward.',formula:'v² = u²+2as &nbsp;|&nbsp; s = ut+½at² &nbsp;|&nbsp; g ≈ 9.8 m/s²',col:'#8b5cf6',draw:'projectile', src:'Topics/projectile.html'},
  {tag:'Mechanics',title:'MOMENTUM & IMPULSE',physicist:'René Descartes',sub:'Momentum is conserved in all isolated collisions. Impulse equals the change in momentum.',formula:'p = mv &nbsp;|&nbsp; J = F&#916;t = &#916;p &nbsp;|&nbsp; p_before = p_after',col:'#ef4444',draw:'momentum', src:'https://www.labxchange.org/library/items/lb:LabXchange:23440d70:lx_simulation:1?gad_source=1&gad_campaignid=17457652039&gbraid=0AAAAACZ8bHm6O3TpO71DBPrVVtpFm_xGe&gclid=Cj0KCQjw77bPBhC_ARIsAGAjjV9R4d6kKKhKAFjR99kUdA_REulp4sZhwS2zXPPSrWmMNIiSa1NdSbAaAl5oEALw_wcB&fullscreen=true'},
  //{tag:'Energy',title:'PROJECTILE MOTION',physicist:'James Watt',sub:'Work is done when a force causes displacement. Power is the rate of doing work. Energy is conserved.',formula:'W = Fd·cos&#952; &nbsp;|&nbsp; P = W/t &nbsp;|&nbsp; P = Fv',col:'#34d399',draw:'wep', src:'Topics/projectile.html'},
  //{tag:'Wave Physics',title:'DOPPLER EFFECT',physicist:'Christian Doppler',sub:'When a wave source moves relative to an observer, the observed frequency changes — higher approaching, lower receding.',formula:'f_L = f_s·(v ± v_L)/(v ∓ v_s)',col:'#38bdf8',draw:'doppler', src:'waves.html'},
  {tag:'Electrostatics',title:'ELECTROSTATICS',physicist:'Carl Friedrich Gauss',sub:'Electric fields, electric potential, and the behaviour of charged objects in static electric environments.',formula:'E = kQ/r² &nbsp;|&nbsp; V = kQ/r &nbsp;|&nbsp; F = qE',col:'#d946ef',draw:'estatics', src:'Topics/faradays.html'},
  //{tag:'Machines',title:'ELECTRODYNAMICS',physicist:'Michael Faraday',sub:"Faraday's law of induction, generators, motors, and transformers — how electricity and magnetism work together.",formula:'&#949; = −d&#934;/dt &nbsp;|&nbsp; F = BIL sin&#952;',col:'#818cf8',draw:'edyn'},
  {tag:'Modern Physics',title:'PHOTOELECTRIC EFFECT',physicist:'Albert Einstein',sub:"Einstein's Nobel Prize-winning discovery: light above a threshold frequency ejects electrons from a metal surface.",formula:'E = hf &nbsp;|&nbsp; E_k(max) = hf − W₀ &nbsp;|&nbsp; h = 6.63×10⁻³⁴ Js',col:'#fcd34d',draw:'photo', src:'https://phet.colorado.edu/sims/cheerpj/photoelectric/latest/photoelectric.html?simulation=photoelectric'},
];

const pcont=document.getElementById('panels-container');
const dotsEl=document.getElementById('panel-dots');
PANELS.forEach((p,i)=>{
  const s=document.createElement('section');
  s.className='panel';s.id=`panel-${i}`;
  s.innerHTML=`<canvas class="panel-canvas-bg" id="pcanvas-${i}"></canvas><div class="panel-dark"></div><div class="panel-body"><div class="panel-tag">${p.tag}</div><div class="panel-title" style="color:${p.col==='#e2e8f0'?'#fff':p.col};text-shadow:0 0 20px ${p.col}88,0 0 60px ${p.col}44">${p.title}</div><div class="panel-physicist">${p.physicist}</div><p class="panel-sub">${p.sub}</p><a href="${p.src}" class="panel-cta">Simulation of topic →</a></div><div class="panel-count">0${i+1} / ${String(PANELS.length).padStart(2,'0')}</div>`;
  pcont.appendChild(s);
  const dot=document.createElement('div');dot.className='pdot';dot.onclick=()=>goPanel(i);dotsEl.appendChild(dot);
});

const panelEls=document.querySelectorAll('.panel');
const dots=document.querySelectorAll('.pdot');
const pObs=new IntersectionObserver(e=>{
  e.forEach(en=>{
    if(en.isIntersecting&&en.intersectionRatio>.45){
      const i=+en.target.id.split('-')[1];
      en.target.classList.add('active');
      dots.forEach((d,j)=>d.classList.toggle('active',j===i));
    }else en.target.classList.remove('active');
  });
},{threshold:.45});
panelEls.forEach(p=>pObs.observe(p));
function goPanel(i){document.getElementById(`panel-${i}`).scrollIntoView({behavior:'smooth'})}

/* ══ CANVAS DRAWS ══ */
function H(n){return Math.max(0,Math.min(255,n|0)).toString(16).padStart(2,'0')}
function initPC(i,fn){
  const cv=document.getElementById(`pcanvas-${i}`);
  function rs(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight}
  rs();window.addEventListener('resize',rs);
  fn(cv.getContext('2d'),cv,PANELS[i].col);
}

function drawWaves(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(2,12,20,.14)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height;for(let l=0;l<6;l++){ctx.beginPath();for(let x=0;x<=W;x+=3){const y=H2/2+Math.sin(x*.009+t+l*1.1)*(50+l*12)+Math.sin(x*.018+t*1.4+l)*(20+l*5);x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.strokeStyle=col+H((1-l/6)*95);ctx.lineWidth=2-l*.25;ctx.stroke()}t+=.018;requestAnimationFrame(f);})()}
function drawElec(ctx,c,col){let t=0;function bolt(x1,y1,x2,y2,d,dep){if(!dep){ctx.lineTo(x2,y2);return}const mx=(x1+x2)/2+(Math.random()-.5)*d,my=(y1+y2)/2+(Math.random()-.5)*d;bolt(x1,y1,mx,my,d/2,dep-1);bolt(mx,my,x2,y2,d/2,dep-1)}(function f(){ctx.fillStyle='rgba(15,10,0,.15)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height;if(Math.random()<.18){const x1=Math.random()*W;ctx.beginPath();ctx.moveTo(x1,0);bolt(x1,0,x1+(Math.random()-.5)*180,H2,80,6);ctx.strokeStyle=col+'88';ctx.lineWidth=1.5;ctx.stroke()}for(let i=0;i<16;i++){const x=((t*90+i*65)%W),y=H2*(i%5+1)/6;ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle=col+'cc';ctx.fill()}ctx.strokeStyle=col+'18';ctx.lineWidth=1;for(let r=1;r<6;r++){const y=H2*r/6;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}t+=.015;requestAnimationFrame(f);})()}
function drawEnergy(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(10,4,0,.12)';ctx.fillRect(0,0,c.width,c.height);const cx=c.width/2,cy=c.height/2;for(let i=0;i<12;i++){const r=(t*45+i*80)%Math.max(c.width,c.height),a=1-r/Math.max(c.width,c.height);ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle=col+H(a*65);ctx.lineWidth=1.5;ctx.stroke()}const g=ctx.createRadialGradient(cx,cy,0,cx,cy,80*(1+Math.sin(t*3)*.12));g.addColorStop(0,col+'cc');g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,80,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();for(let i=0;i<8;i++){const a=t*1.1+i*Math.PI/4,d=55+Math.sin(t*2+i)*18;ctx.beginPath();ctx.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d,4,0,Math.PI*2);ctx.fillStyle=col+'bb';ctx.fill()}t+=.015;requestAnimationFrame(f);})()}
function drawMotion(ctx,c,col){let t=0;const lines=Array.from({length:22},(_,i)=>{return{y:Math.random(),v:.4+Math.random()*.8,l:40+Math.random()*120,x:Math.random()}});(function f(){ctx.fillStyle='rgba(5,8,18,.14)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height;lines.forEach(ln=>{ln.x=(ln.x+ln.v*.0015)%1.2;const x=ln.x*W,y=ln.y*H2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-ln.l,y);const gr=ctx.createLinearGradient(x-ln.l,0,x,0);gr.addColorStop(0,'transparent');gr.addColorStop(1,col+'88');ctx.strokeStyle=gr;ctx.lineWidth=1+ln.v*.5;ctx.stroke()});const dp=((t*.2)%1),dx=dp*W,dy=H2*.2+dp*(H2*.6)-Math.sin(dp*Math.PI)*(H2*.35);for(let i=0;i<20;i++){const pp=Math.max(0,dp-i*.02),tx=pp*W,ty=H2*.2+pp*(H2*.6)-Math.sin(pp*Math.PI)*(H2*.35);ctx.beginPath();ctx.arc(tx,ty,4-i*.15,0,Math.PI*2);ctx.fillStyle=col+H((1-i/20)*150);ctx.fill()}ctx.beginPath();ctx.arc(dx,dy,9,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();t+=.015;requestAnimationFrame(f);})()}
function drawWavetype(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(0,8,6,.13)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height;ctx.beginPath();for(let x=0;x<=W;x+=3){const y=H2*.28+Math.sin(x*.012+t)*55;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.strokeStyle=col+'cc';ctx.lineWidth=2.5;ctx.stroke();ctx.fillStyle=col+'44';ctx.font="11px 'JetBrains Mono'";ctx.fillText('TRANSVERSE',12,H2*.12);for(let i=0;i<28;i++){const phase=i*W/28+Math.sin(i*.4+t)*18,width=8+Math.sin(i*.6+t)*5;ctx.fillStyle=col+H(Math.sin(i*.4+t)*.5*120+40);ctx.fillRect(phase,H2*.55,width,H2*.3)}ctx.fillStyle=col+'44';ctx.fillText('LONGITUDINAL',12,H2*.52);t+=.02;requestAnimationFrame(f);})()}
function drawCoulomb(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(5,0,15,.12)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,cx=W/2,cy=H2/2,x1=cx-W*.22,x2=cx+W*.22;for(let a=0;a<20;a++){const angle=a*(Math.PI*2/20);ctx.beginPath();for(let r=25;r<W*.4;r+=2){const fa=angle+Math.sin(r*.025+t)*.5;ctx.lineTo(cx+Math.cos(fa)*r,cy+Math.sin(fa)*r*.55)}ctx.strokeStyle=col+H(25+Math.sin(a+t)*12);ctx.lineWidth=.8;ctx.stroke()}[{x:x1,c:'#ff4455'},{x:x2,c:'#44aaff'}].forEach(ch=>{const g=ctx.createRadialGradient(ch.x,cy,0,ch.x,cy,35);g.addColorStop(0,ch.c+'dd');g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(ch.x,cy,30,0,Math.PI*2);ctx.fillStyle=g;ctx.fill()});t+=.01;requestAnimationFrame(f);})()}
function drawCircuits(ctx,c,col){let t=0;const track=[[80,80],[420,80],[420,260],[80,260],[80,80]];(function f(){ctx.fillStyle='rgba(5,3,18,.15)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,sx=W/500,sy=H2/340;const paths=[[[80,80],[420,80],[420,260],[80,260],[80,80]],[[80,80],[250,80]],[[250,80],[250,150]],[[80,260],[250,260]],[[250,150],[250,260]]];paths.forEach(pts=>{ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x*sx,y*sy):ctx.lineTo(x*sx,y*sy));ctx.strokeStyle=col+'33';ctx.lineWidth=2;ctx.stroke()});for(let i=0;i<6;i++){const prog=((t+i/6)%1);let target=prog*1160,segs=[{l:340,dx:340,dy:0,x:80,y:80},{l:180,dx:0,dy:180,x:420,y:80},{l:340,dx:-340,dy:0,x:420,y:260},{l:180,dx:0,dy:-180,x:80,y:260},{l:100,dx:100,dy:0,x:80,y:260}];for(const seg of segs){if(target<=seg.l){const r=target/seg.l;ctx.beginPath();ctx.arc((seg.x+r*seg.dx)*sx,(seg.y+r*seg.dy)*sy,4,0,Math.PI*2);ctx.fillStyle=col+'ee';ctx.fill();break}target-=seg.l}}[[80,80],[420,80],[420,260],[80,260],[250,80],[250,260]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x*sx,y*sy,5,0,Math.PI*2);ctx.fillStyle=col+'88';ctx.fill()});t+=.006;requestAnimationFrame(f);})()}
function drawNewton(ctx,c,col){const boxes=[{x:.08,v:0,a:.055,m:8,trail:[]},{x:.08,v:0,a:.13,m:4,trail:[]},{x:.08,v:0,a:.3,m:1.5,trail:[]}];const cols=['#8899ff','#aaffcc','#ffffff'];const labels=['Heavy','Medium','Light'];(function f(){ctx.fillStyle='rgba(5,5,10,.15)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,gy=H2*.68;ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,gy+20);ctx.lineTo(W,gy+20);ctx.stroke();boxes.forEach((b,i)=>{const sz=14+b.m*2.5;b.v+=b.a;b.x+=b.v*.001;if(b.x>1.15){b.x=.05;b.v=0}const bx=b.x*W,by=gy+20-sz;b.trail.push({x:bx,y:by});if(b.trail.length>40)b.trail.shift();b.trail.forEach((pt,j)=>{ctx.fillStyle=cols[i]+H(j/b.trail.length*110);ctx.fillRect(pt.x,pt.y,4,4)});ctx.fillStyle=cols[i]+'bb';ctx.fillRect(bx-sz/2,by,sz,sz);ctx.fillStyle=cols[i];ctx.font=`${Math.max(9,W*.018)}px 'JetBrains Mono'`;ctx.fillText(labels[i],bx-20,by-7)});requestAnimationFrame(f);})()}
function drawProjectile(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(5,3,15,.13)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,prog=(Math.sin(t*.8)*.5+.5),bx=prog*W,by=H2*.15+(1-Math.sin(prog*Math.PI))*H2*.65;ctx.beginPath();ctx.setLineDash([4,6]);for(let x=0;x<=W;x+=3){const p=x/W,y=H2*.15+(1-Math.sin(p*Math.PI))*H2*.65;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y)}ctx.strokeStyle=col+'30';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);for(let i=0;i<20;i++){const pp=Math.max(0,prog-i*.022),tx=pp*W,ty=H2*.15+(1-Math.sin(pp*Math.PI))*H2*.65;ctx.beginPath();ctx.arc(tx,ty,4-i*.15,0,Math.PI*2);ctx.fillStyle=col+H((1-i/20)*150);ctx.fill()}ctx.beginPath();ctx.arc(bx,by,9,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();ctx.strokeStyle='rgba(255,255,255,.07)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,H2*.82);ctx.lineTo(W,H2*.82);ctx.stroke();t+=.016;requestAnimationFrame(f);})()}
function drawMomentum(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(12,2,2,.14)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,cy=H2/2,phase=(t*.4)%(Math.PI*2),sep=Math.abs(Math.cos(phase))*W*.35,cx=W/2,x1=cx-sep-20,x2=cx+sep+20;const g1=ctx.createRadialGradient(x1,cy,0,x1,cy,30);g1.addColorStop(0,'#ff445588');g1.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(x1,cy,22,0,Math.PI*2);ctx.fillStyle=g1;ctx.fill();ctx.beginPath();ctx.arc(x1,cy,14,0,Math.PI*2);ctx.fillStyle='#ff4455';ctx.fill();const g2=ctx.createRadialGradient(x2,cy,0,x2,cy,30);g2.addColorStop(0,'#44aaff88');g2.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(x2,cy,22,0,Math.PI*2);ctx.fillStyle=g2;ctx.fill();ctx.beginPath();ctx.arc(x2,cy,14,0,Math.PI*2);ctx.fillStyle='#44aaff';ctx.fill();if(sep<25){const fl=ctx.createRadialGradient(cx,cy,0,cx,cy,60);fl.addColorStop(0,col+'77');fl.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,60,0,Math.PI*2);ctx.fillStyle=fl;ctx.fill()}t+=.018;requestAnimationFrame(f);})()}
function drawWep(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(0,8,4,.13)';ctx.fillRect(0,0,c.width,c.height);const cx=c.width/2,cy=c.height/2;for(let i=0;i<14;i++){const r=(t*40+i*75)%Math.max(c.width,c.height),a=1-r/Math.max(c.width,c.height);ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.strokeStyle=col+H(a*70);ctx.lineWidth=1.5;ctx.stroke()}const ps=1+Math.sin(t*2.5)*.12,g=ctx.createRadialGradient(cx,cy,0,cx,cy,70*ps);g.addColorStop(0,col+'bb');g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,70*ps,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();t+=.015;requestAnimationFrame(f);})()}
function drawDoppler(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(3,8,18,.13)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,srcX=W*.3+Math.sin(t*.5)*W*.15,srcY=H2/2;for(let i=0;i<6;i++){const age=(t*.8+i*.5)%3,baseR=age*H2*.35;ctx.beginPath();ctx.ellipse(srcX+baseR*.05,srcY,baseR*.7,baseR,0,0,Math.PI*2);ctx.strokeStyle=col+H((1-age/3)*55);ctx.lineWidth=1.5;ctx.stroke()}ctx.beginPath();ctx.arc(srcX,srcY,10,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();t+=.016;requestAnimationFrame(f);})()}
function drawEstatics(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(8,0,18,.12)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height,cx=W/2,cy=H2/2;for(let a=0;a<22;a++){const ang=a*(Math.PI*2/22)+t*.08;ctx.beginPath();for(let r=20;r<W*.42;r+=2){const fa=ang+Math.sin(r*.022+t)*.55;ctx.lineTo(cx+Math.cos(fa)*r,cy+Math.sin(fa)*r*.55)}ctx.strokeStyle=col+H(20+Math.sin(a+t)*12);ctx.lineWidth=.9;ctx.stroke()}const g=ctx.createRadialGradient(cx,cy,0,cx,cy,40);g.addColorStop(0,col+'cc');g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,40,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();t+=.012;requestAnimationFrame(f);})()}
function drawEdyn(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(4,5,15,.13)';ctx.fillRect(0,0,c.width,c.height);const cx=c.width/2,cy=c.height/2;for(let r=0;r<4;r++){ctx.beginPath();ctx.ellipse(cx,cy,80+r*30,30+r*10,t*(1+r*.3),0,Math.PI*2);ctx.strokeStyle=col+H((4-r)*25);ctx.lineWidth=1.5;ctx.stroke()}const g=ctx.createRadialGradient(cx,cy,0,cx,cy,35);g.addColorStop(0,col+'aa');g.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(cx,cy,35,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();for(let i=0;i<8;i++){const a=t+i*Math.PI/4,len=60+Math.sin(t*2+i)*20;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*len,cy+Math.sin(a)*len*.6);ctx.strokeStyle=col+H(50);ctx.lineWidth=1;ctx.stroke()}t+=.014;requestAnimationFrame(f);})()}
function drawPhoto(ctx,c,col){let t=0;(function f(){ctx.fillStyle='rgba(12,8,0,.14)';ctx.fillRect(0,0,c.width,c.height);const W=c.width,H2=c.height;ctx.fillStyle='rgba(180,140,60,.15)';ctx.fillRect(0,H2*.65,W,H2*.35);ctx.strokeStyle='rgba(251,191,36,.2)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,H2*.65);ctx.lineTo(W,H2*.65);ctx.stroke();for(let i=0;i<5;i++){const bx=W*(.2+i*.15),phase=(t*.6+i*.3)%1;if(phase<.7){const by=phase*H2*.65;ctx.strokeStyle=col+H(.7*(1-phase)*200);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(bx,0);ctx.lineTo(bx,by);ctx.stroke();ctx.beginPath();ctx.arc(bx,by,5,0,Math.PI*2);ctx.fillStyle=col;ctx.fill()}if(phase>.65&&phase<1){const ep=phase-.65,ex=bx+Math.cos(-.7+i*.3)*ep*120,ey=H2*.65-ep*H2*.3;ctx.beginPath();ctx.arc(ex,ey,4,0,Math.PI*2);ctx.fillStyle='#60a5fa';ctx.fill()}}t+=.015;requestAnimationFrame(f);})()}

const drawMap={waves:drawWaves,elec:drawElec,energy:drawEnergy,motion:drawMotion,wavetype:drawWavetype,coulomb:drawCoulomb,circuits:drawCircuits,newton:drawNewton,projectile:drawProjectile,momentum:drawMomentum,wep:drawWep,doppler:drawDoppler,estatics:drawEstatics,edyn:drawEdyn,photo:drawPhoto};
PANELS.forEach((p,i)=>initPC(i,drawMap[p.draw]));

/* ══ SCROLL REVEAL ══ */
const revEls=document.querySelectorAll('.reveal');
const revObs=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*80);revObs.unobserve(e.target)}}  );
},{threshold:.1});
revEls.forEach(el=>revObs.observe(el));

document.querySelectorAll('.tile').forEach((t,i)=>{
  t.classList.add('reveal');
  t.style.transitionDelay=`${(i%4)*.06}s`;
  revObs.observe(t);
});

