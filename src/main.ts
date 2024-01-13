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

cube.classList.add('rotate')

let x = 0,
    y = 0,
    z = 0;

// "matrix3d(0.996195, 0, -0.0871557, 0, 
//           0, 1, 0, 0,
//           0.0871557, 0, 0.996195, 0, 
//           0, 0, 0, 1)"

// "matrix3d(1, 0, 0, 0,
//           0, 0.996195, 0.0871557, 0,
//           0, -0.0871557, 0.996195, 0, 
//           0, 0, 0, 1)"

// 0.849411, 0.278501, -0.448261, 0,
// 0, 0.849411, 0.527732, 0,
// 0.527732, -0.448261, 0.721499, 0, 
// 0, 0, 0, 1

const getTransform = function($element: HTMLElement) {
  var matrix = getComputedStyle($element).transform,
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0;
  if (matrix !== 'none') {
      // do some magic
      var values = matrix.split('(')[1].split(')')[0].split(','),
          pi = Math.PI,
          sinB = parseFloat(values[8]),
          b = Math.round(Math.asin(sinB) * 180 / pi),
          cosB = Math.cos(b * pi / 180),
          matrixVal10 = parseFloat(values[9]),
          a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi),
          matrixVal1 = parseFloat(values[0]),
          c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);
      rotateX = a;
      rotateY = b;
      rotateZ = c;
  }
  return {
      rotateX: rotateX,
      rotateY: rotateY,
      rotateZ: rotateZ
  };
}

let isAnimate = true

document.addEventListener('keydown', function(e){
  if(e.code == 'ArrowLeft') y -= 2
  if(e.code == 'ArrowRight') y += 2
  if(e.code == 'ArrowUp') x += 2
  if(e.code == 'ArrowDown') x -= 2
  
  if (isAnimate) {
    const rotateObj = getTransform(cube)
    x = rotateObj.rotateX
    y = rotateObj.rotateY
    z = rotateObj.rotateZ
    cube.style.transform = `rotateY(${y}deg) rotateX(${x}deg) rotateZ(${z}deg)`;
    cube.classList.remove('rotate')
    isAnimate = false
    console.log (x,y,z)
  }
  
  cube.style.transform = `rotateY(${y}deg) rotateX(${x}deg) rotateZ(${z}deg)`;
});

document.addEventListener('DOMContentLoaded',function(){
  let x = 0
  let y = 0
  let z = 0
  document.onmousedown = function(event){
    cube.classList.remove('rotate')
    let target = event;
    let disX = target.clientX - y
    let disY = target.clientY - x
    
      document.onmousemove = function(event){
        let target = event;
        x = target.clientX - disX
        y = target.clientY - disY
        
        cube.style.transform = `rotateY(${y}deg) rotateX(${x}deg) rotateZ(${z}deg)`;
      };
      document.onmouseup = function(){
          document.onmousemove = null
          document.onmouseup = null
      };
      return false
  }
},false)

