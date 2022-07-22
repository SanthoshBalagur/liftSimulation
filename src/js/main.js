const Selector  = document.querySelector('#section__selector');

const modal = document.getElementById("myModal");
const button = document.getElementById("button__generate");
const span = document.getElementsByClassName("close")[0];


function generate(){
    const FloorInputValue = document.getElementById('input__floor').value;
    const LiftInputValue =document.getElementById('input__lifts').value;
    if(!FloorInputValue ||!LiftInputValue){
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
      }
   if(FloorInputValue &&LiftInputValue )  {
    generateFloor(FloorInputValue);
    generateLift(LiftInputValue);
   } 
  

}

function generateFloor(value) {

   
 for(let i=value;i>0;i--){


    let idSelector  =  document.createElement('section');
        idSelector.classList.add('section-output')
        idSelector.innerHTML +=` 
 
        <div class='button_output'>
 
        ${`<button type ='submit' class='moveup' data-floor="${0 + i}" >UP</button>`}
        ${ `<button type ='submit'  class='moveup' data-floor="${i == value ? (i-(value-1)): i}">DOWN</button>`}
        <p class=floor-number>Floor:${i} </p>
        </div>
 
        `
      
        Selector.append(idSelector)
    } 
}

document.addEventListener('click',(e) =>{
   if(e.target.classList.value === 'moveup'){
    check(e.target.dataset.floor)
   }
})

function generateLift(value){
    let section =document.querySelector('.section-output')
    for(let i =1;i<=value;i++){
        section.innerHTML +=`<div class ='lifts lifts${i}' data-currentlift = "0" style =' left: ${20 *i+2}%;}'>
        <div id ='lift-left'  class ='lift-door'> </div>
        <div id ='lift-right' class ='lift-door'> </div>
        </div>`
    }
}
function check(value){

    const totalLift = Array.from(document.getElementsByClassName("lifts"));
    for (let index = 0; index < totalLift.length; index++) {

    if(!totalLift[index].classList.contains('busy')){

        upButton(value,totalLift[index])
        break;
    }

       
}
}

function upButton(value,lift) {
        let currentlocations = lift.dataset.currentlift;
        let timming = Math.abs(value - currentlocations) * 2;
     
        let move = (value-1) * -264;
        console.log('timing',value,timming,move)
        lift.style.transition = `transform ${timming}s linear`;
        lift.style.transform = "translateY(" + move + "px)";
        lift.classList.add('busy');
        lift.dataset.currentlocation = value; 
       
        setTimeout(() => {
            lift.children[0].classList.add("lift-left-open");
            lift.children[1].classList.add("lift-right-open");
          }, timming * 1000 + 1000);
          setTimeout(() => {
            lift.children[0].classList.remove("lift-left-open");
            lift.children[1].classList.remove("lift-right-open");
          }, timming * 1000 + 2000)

        setTimeout(() =>{
            lift.classList.remove('busy')
        },timming*1000+2000)
       
        
}
