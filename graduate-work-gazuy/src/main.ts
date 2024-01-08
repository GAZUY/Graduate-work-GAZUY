import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
let cube = document.querySelector('.cube') as HTMLElement

let x = 0,
    y = 0;

document.addEventListener('keydown', function(e){
  if(e.code == 'ArrowLeft') y -= 5
  if(e.code == 'ArrowRight') y += 5
  if(e.code == 'ArrowUp') x += 5
  if(e.code == 'ArrowDown') x -= 5
 
 cube.style.transform = `rotateY(${y}deg) rotateX(${x}deg)`;
});

cube.addEventListener('DOMContentLoaded',function(){
  let x = 0
  let y = 0
  document.onmousedown = function(event){
    let target = event;
    let disX = target.clientX - y
    let disY = target.clientY - x
      document.onmousemove = function(event){
        let target = event;
        x = target.clientX - disX
        y = target.clientY - disY
        cube.style.transform = '  rotateY('+x+'deg) rotateX('+(-y)+'deg)'
      };
      document.onmouseup = function(){
          document.onmousemove = null
          document.onmouseup = null
      };
      return false
  }
},false)

