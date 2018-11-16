import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){
    this.Interval = setInterval(()=>{
      this.checkGameStatus() },this.timeInterval*1000
    ); 
  }
 
  n:any = prompt('Please enter number for matrix');
  defaultColoredBoxes:any = prompt('Please enter number to be colored box');
  timeInterval:any = prompt('Please enter time interval to be auto colored');
  message = "Game has been started";
  

  n_numberArray = [];
  totalBoxes = this.n*this.n;
  unColoredBoxes = this.totalBoxes - this.defaultColoredBoxes;
  Interval:any;
  isUserWinGame = false;
  isGameFinish = false;

  ngOnInit(){
    this.generateMatrixArray();
    this.updateMatrixArray();
  
    var wrapper = document.querySelector('ul');
    wrapper.style.width = this.n <10 ? this.n*100 + 'px':this.n*50 + 'px' ;
  }
  
  counter:any = 1;

  // Updating matrix array according to passing auto colored boxes
  updateMatrixArray(){
    for(let i = 0; i < this.n; i++){
      for( let j = 0; j < this.n; j++){
        if(this.counter <= this.defaultColoredBoxes){
          this.n_numberArray[i][j] = 0;
      }
      this.counter++;
      }
    }
  }

  // Generating matrix array from n papameter
  generateMatrixArray(){
    for(var i = 0; i < this.n; i++){
      const newArry = Array.from(Array(this.n*1).map((x,i)=> x)).fill(1);
      this.n_numberArray.push(newArry);
    }
    
  }

  // Gettiing targeted li element
  getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement; 
  }

  //do uncolor box on click by user
  unColoredBox(event){
    const elementId = event.target.getAttribute('id');
    if(event.target.classList.contains('active')){
      event.target.classList.remove('active'); 
      const arrPostion = elementId.toString().split("");
      this.unColoredBoxes++;
      this.gameWinStatus();
    }
  
  }

  gameWinStatus(){
    if(this.unColoredBoxes == this.totalBoxes){
        clearInterval(this.Interval);
        var msgElement:any = document.getElementById('msg');
        msgElement.classList.add("win");
        this.message = "Yea , You Won the Game";
        this.isGameFinish = true;
    }
    else if(this.unColoredBoxes == 0){
      clearInterval(this.Interval);
      var msgElement:any = document.getElementById('msg');
      msgElement.classList.add("lost");  
      this.message = "You Lost the Game, Try Again";
      this.isGameFinish = true;
    }
    return this.isGameFinish;
  }


  // Updating box color Auto by time interval
  updateBoxColor(){
    for(let i = 0; i < this.n; i++){
      for( let j = 0; j < this.n; j++){
          var element:any = document.getElementById(`${i}${j}`);
          if(!element.classList.contains('active')){
              element.classList.add("active");
              element.setAttribute('data-val', 1);
              this.unColoredBoxes--;
            //  console.log('uncoloredBoxes '+this.unColoredBoxes)
            //  console.log('totalBoxes '+this.totalBoxes)
              return;
          }
      }
    }
  }

  checkGameStatus(){
    if(!this.gameWinStatus()){
      this.updateBoxColor();
    }
  }

}

