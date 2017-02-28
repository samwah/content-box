import { OnInit, Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-physics-box',
  templateUrl: './physics-box.component.html',
  styleUrls: ['./physics-box.component.css']
})
export class PhysicsBoxComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor() {
    //svgPath = 'M71,46.6c10,0.7,11.7,12.8,0.9,13.7C43,62.8,54,70.5,38.3,96.5c-15,24.8-7.7-121.1,6.6-84C55.9,41,51.9,45.4,71,46.6z';


  }
  svgPath: string;
  morphSvg = function(){
    this.svgPath = "M118.8,46c10,0.7,11.7,12.8,0.9,13.7C90.8,62.2,54,70.5,38.3,96.5c-15,24.8-7.7-121.1,6.6-84C55.9,41,99.6,44.8,118.8,46z";
    this.morphCurve();
    
  };

  diff(a,b){return Math.abs(a-b);}

  morphCurve = function(){
    var path1 = [118.8,46,10, 0.7, 11.7, 12.8 ,0.9, 13.7,90.8, 62.2, 54, 70.5, 38.3, 96.5,-15, 24.8, -7.7, -121.1, 6.6, -84,55.9, 41, 99.6, 44.8, 118.8, 46];
    var path2 = [71,46.6,10, 0.7, 11.7, 12.8, 0.9, 13.7,43, 62.8, 54, 70.5, 38,3, 96.5,-15, 24.8, -7.7, -121.1, 6.6, -84,55.9, 41, 51.9, 45.4, 71, 46.6];
    let pathDiff = [];
    let path = path1;
    let step = 60;
    for(let i = 1; i < path1.length; i++){
      pathDiff.push(this.diff(path1[i],path2[i])/step);
    }
    this.render(path1, pathDiff);
  }

  i : number = 1;
  render = function(path, pathDiff){
    this.i += 1;
    for(let i = 1; i < path.length; i++){
        path[i] = path[i]+pathDiff[i];
    }
    let input = 
      'M'+path[0]+','+path[1]+//start
      'c'+path[2]+','+path[3]+','+path[4]+','+path[5]+','+path[6]+','+path[7]+ //curve1
      'C'+path[8]+','+path[9]+','+path[10]+','+path[11]+','+path[12]+','+path[13]+ //curve2
      'c'+path[14]+','+path[15]+','+path[16]+','+path[17]+','+path[18]+','+path[19]+ //curve3
      'C'+path[20]+','+path[21]+','+path[22]+','+path[23]+','+path[24]+','+path[25]+ //curve4
      'z';//close
    this.svgPath = input;
    var that = this;
    var path2 = path;
    var pathDiff2 = pathDiff;
    if(this.i<60){
      window.requestAnimationFrame( function() {that.render(path2,pathDiff2)});
    }
    
    

  }

  ngOnInit(){

    var moveTo = [118.8,46];
    var curve1 = [10, 0.7, 11.7, 12.8 ,0.9, 13.7];
    var curve2 = [90.8, 62.2, 54, 70.5, 38.3, 96.5];
    var curve3 = [-15, 24.8, -7.7, -121.1, 6.6, -84];
    var curve4 = [55.9, 41, 99.6, 44.8, 118.8, 46];

    var moveTo = [71,46.6];
    var curve1 = [10, 0.7, 11.7, 12.8, 0.9, 13.7];
    var curve2 = [43, 62.8, 54, 70.5, 38,3, 96.5];
    var curve3 = [-15, 24.8, -7.7, -121.1, 6.6, -84];
    var curve4 = [55.9, 41, 51.9, 45.4, 71, 46.6];

    this.svgPath = "M 71,46.6 c 10,0.7,11.7,12.8,0.9,13.7 C 43,62.8,54,70.5,38.3,96.5 c-15,24.8-7.7-121.1,6.6-84 C 55.9,41,51.9,45.4,71,46.6 z";

    /*
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(250, 60);
    ctx.lineTo(63.8, 126.4);
    ctx.lineTo(92.2, 372.6);
    ctx.lineTo(250, 460);
    ctx.lineTo(407.8, 372.6);
    ctx.lineTo(436.2, 126.4);
    ctx.moveTo(250, 104.2);
    ctx.lineTo(133.6, 365.2);
    ctx.lineTo(177, 365.2);
    ctx.lineTo(200.4, 306.8);
    ctx.lineTo(299.2, 306.8);
    ctx.lineTo(325.2, 365.2);
    ctx.lineTo(362.6, 365.2);
    ctx.lineTo(250, 104.2);
    ctx.moveTo(304, 270.8);
    ctx.lineTo(216, 270.8);
    ctx.lineTo(250, 189);
    ctx.lineTo(284, 270.8);
    ctx.clip('evenodd');

    // Draw 50,000 circles at random points
    ctx.beginPath();
    ctx.fillStyle = '#DD0031';
    for (let i=0 ; i < 50000 ; i++) {
      let x = Math.random() * 500;
      let y = Math.random() * 500;
      ctx.moveTo(x, y);
      ctx.arc(x, y, 1, 0, Math.PI * 2);
    }
    ctx.fill();*/
  }
  
  ngAfterViewInit() {
    var stage = new createjs.Stage(this.canvasRef.nativeElement);
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
  }
  
}
