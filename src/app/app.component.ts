import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private elementRef: ElementRef){

  this.Interval = setInterval(()=>{
    this.checkGameStatus() },4000); 
       
  }
 @ViewChild('myList')  myList: ElementRef;
 
  n:any = prompt('Please enter number for matrix');
  defaultColoredBoxes:any = prompt('Please enter number to be colored box');
 // timeInterval = prompt('Please enter time interval to be auto colored');
  n_numberArray = [];
  totalBoxes = this.n*this.n;
  //unColoredBoxes = this.totalBoxes - this.defaultColoredBoxes -1;
  Interval:any;
  ngOnInit(){
    this.generateMatrixArray();
    this.updateMatrixArray();
    console.log('uncolor box', this.unColoredBoxes)
    //
    
  }
  
  counter:any = 1;
  updateMatrixArray(){
    for(let i = 0; i < this.n; i++){
      for( let j = 0; j < this.n; j++){
        if(this.counter <= this.defaultColoredBoxes){
          this.n_numberArray[i][j] = 0;
      }
      this.counter++;
      }
    }
    console.log(this.n_numberArray);
  }

  generateMatrixArray(){
    for(var i = 0; i < this.n; i++){
      const newArry = Array.from(Array(this.n*1).map((x,i)=> x)).fill(1);
      this.n_numberArray.push(newArry);
    }
    
  }

getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement; 
  }


  unColoredBox(event){
   
   
    const elementId = event.target.getAttribute('id');
    console.log(elementId);
    const dVal = event.target.getAttribute('data-val');
    
      //if(event.target.classList.contains('active')){
      if(dVal == 0){
        event.target.classList.remove('active'); 
        const arrPostion = elementId.toString().split("");
        
        this.n_numberArray [arrPostion[0]][arrPostion[1]] = 1;
        console.log(this.n_numberArray);
        console.log(this.n_numberArray [arrPostion[0]][arrPostion[1]]);
        this.unColoredBoxes++;
        //setTimeout(()=>{this.n_numberArray[arrPostion[0]][arrPostion[1]] = 0;},500)
        
        //console.log(this.n_numberArray [arrPostion[0]][arrPostion[1]]);
        
        if(this.unColoredBoxes == this.totalBoxes){
              //clearInterval(Interval);
              alert('yea , you won the game');
        }
        else if(this.unColoredBoxes == 0){
            alert('You lost the game');
          // clearInterval(Interval);
        }
      }
  
    
    // const target = this.getEventTarget(e);
    // const elementId = target.getAttribute('id');
    // const dVal = target.getAttribute('data-val');
    // console.log(target)
    // console.log('elementId '+elementId)
    // if(dVal == 1){
    //     var arrPostion = elementId.toString().split("");
    //     var element = document.getElementById(target.getAttribute('id'));
    //     element.classList.remove("active");
    //     target.classList.remove('active');
    //     this.n_numberArray[arrPostion[0]][arrPostion[1]] = 0
    //     console.log(this.n_numberArray [arrPostion[0]][arrPostion[1]])
    //     this.unColoredBoxes++;
    //     if(this.unColoredBoxes == this.totalBoxes){
    //         clearInterval(Interval);
    //         alert('yea , you won the game');
    //     }
    //     else if(this.unColoredBoxes == 0){
    //         alert('You lost the game');
    //        clearInterval(Interval);
    //     }

    // }
   
  }
  updateBoxColor(){
    for(let i = 0; i < this.n; i++){
      for( let j = 0; j < this.n; j++){
          if(this.n_numberArray[i][j] === 1){
              this.n_numberArray[i][j] = 0;
              var element:any = document.getElementById(`${i}${j}`);
              console.log(element)
              element.classList.add("active");
              element.setAttribute('data-val', 1);
              this.unColoredBoxes--;
              console.log('uncoloredBoxes '+this.unColoredBoxes)
              console.log('totalBoxes '+this.totalBoxes)
              return;
          }
          
      }
    }
  }



  checkGameStatus(){
  
    if(this.unColoredBoxes == this.totalBoxes){
        clearInterval(this.Interval);
        alert('yea , you won the game');
    }
    else if(this.unColoredBoxes == 0){
        alert('You lost the game');
        clearInterval(this.Interval);
    }
    else{
        this.updateBoxColor();
    }
}

}

