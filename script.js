// flow
const screens = [...document.querySelectorAll(".screen")];
let step = 1;

function showStep(n){
  step = n;
  screens.forEach(s => s.classList.toggle("is-active", s.dataset.step == n));
  document.body.classList.toggle("step3", n === 3);
  if (n === 3) startBloom();
}

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-next]")){
    showStep(Math.min(step + 1, 3));
  }
});

// bloom + typing
const MESSAGE = "I'm blessed that you come into my life daddy, i love you!";
const typed = document.getElementById("typed");
let timer = null;

function typeMessage(){
  clearTimeout(timer);
  typed.textContent = "";
  let i = 0;
  const run = () => {
    typed.textContent = MESSAGE.slice(0, i);
    i++;
    if (i <= MESSAGE.length) timer = setTimeout(run, 26);
  };
  run();
}

function startBloom(){
  // like the video: small pause, then bloom
  setTimeout(() => {
    document.body.classList.add("bloom");
    typeMessage();
  }, 650);
}

// sparkles canvas
const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");
let W=0, H=0, DPR=1;

function resize(){
  DPR = Math.min(2, window.devicePixelRatio || 1);
  W = canvas.width = Math.floor(innerWidth * DPR);
  H = canvas.height = Math.floor(innerHeight * DPR);
  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";
}
window.addEventListener("resize", resize);
resize();

const dots = Array.from({length: 160}, () => ({
  x: Math.random(),
  y: Math.random()*0.55,
  r: 0.6 + Math.random()*1.8,
  a: 0.15 + Math.random()*0.7,
  tw: 0.004 + Math.random()*0.014,
  sp: 0.00025 + Math.random()*0.0012,
}));

function loop(){
  ctx.clearRect(0,0,W,H);

  // soft haze
  const grad = ctx.createRadialGradient(W*0.5, H*0.2, 0, W*0.5, H*0.2, H*0.9);
  grad.addColorStop(0, "rgba(255,255,255,0.05)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = 1;
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,W,H);

  for (const d of dots){
    d.a += (Math.random()-0.5)*d.tw;
    d.a = Math.max(0.08, Math.min(0.9, d.a));
    d.y += d.sp;
    if (d.y > 0.6) d.y = 0.02;

    ctx.beginPath();
    ctx.globalAlpha = d.a;
    ctx.fillStyle = "white";
    ctx.arc(d.x*W, d.y*H, d.r*DPR, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();

// init
showStep(1);
