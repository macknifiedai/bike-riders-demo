// ── CANVAS PARTICLES ──
var cvs=document.getElementById('cvs');
var ctx=cvs.getContext('2d');
var W,H,particles=[];
function resize(){W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
var colors=['#1565C0','#f54266','#6b1fd4','#42a5f5','#ff7096'];
for(var i=0;i<60;i++){particles.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,r:Math.random()*2.5+.5,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,c:colors[Math.floor(Math.random()*colors.length)],a:Math.random()*.4+.15});}
function draw(){ctx.clearRect(0,0,W,H);particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.c;ctx.globalAlpha=p.a;ctx.fill();ctx.globalAlpha=1;});requestAnimationFrame(draw);}
draw();

// ── THEME TOGGLE ──
function toggleTheme(){var h=document.documentElement,btn=document.getElementById('themeToggle');var isL=h.getAttribute('data-theme')==='light';h.setAttribute('data-theme',isL?'dark':'light');btn.textContent=isL?'🌙':'☀️';localStorage.setItem('br_theme',isL?'dark':'light');}
var sv=localStorage.getItem('br_theme');if(sv==='light'){document.documentElement.setAttribute('data-theme','light');document.getElementById('themeToggle').textContent='☀️';}

// ── SCROLL ANIMATIONS ──
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');var sib=e.target.parentElement.querySelectorAll('.svc-card,.why-card,.test-card,.faq-item,.gal-img');sib.forEach(function(s,i){setTimeout(function(){s.classList.add('vis');},i*70);});}});},{threshold:.1});
document.querySelectorAll('.svc-card,.why-card,.test-card,.faq-item,.gal-img,.why-img-wrap').forEach(function(el){obs.observe(el);});

// ── STAT COUNTERS ──
var cstarted=false;
var cobs=new IntersectionObserver(function(entries){if(entries[0].isIntersecting&&!cstarted){cstarted=true;document.querySelectorAll('.stat-num[data-count]').forEach(function(el){var tgt=parseInt(el.getAttribute('data-count')),suf=el.getAttribute('data-suffix')||'',cur=0,step=Math.ceil(tgt/60);var iv=setInterval(function(){cur+=step;if(cur>=tgt){cur=tgt;clearInterval(iv);}el.textContent=cur.toLocaleString()+suf;},30);});}},{threshold:.5});
var se=document.querySelector('.hero-stats');if(se)cobs.observe(se);

// ── FAQ TOGGLE ──
function toggleFaq(el){var item=el.parentElement,open=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(function(i){i.classList.remove('open');});if(!open)item.classList.add('open');}

// ── SCROLL TOP ──
window.addEventListener('scroll',function(){var b=document.getElementById('scrollTop');b.classList.toggle('show',window.scrollY>400);});

// ── HERO PARALLAX ──
var hero=document.querySelector('.hero');if(hero){hero.addEventListener('mousemove',function(e){var x=(e.clientX/window.innerWidth-.5)*10,y=(e.clientY/window.innerHeight-.5)*10;var img=document.querySelector('.hero-img-main');if(img)img.style.transform='perspective(900px) rotateY('+(-x/2)+'deg) rotateX('+(y/3)+'deg) translateZ(8px)';});hero.addEventListener('mouseleave',function(){var img=document.querySelector('.hero-img-main');if(img)img.style.transform='perspective(900px) rotateY(-4deg)';});}