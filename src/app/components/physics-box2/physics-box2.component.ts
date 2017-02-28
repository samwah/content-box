import { Component, OnInit, AfterContentInit ,ViewChild, NgZone, ElementRef } from '@angular/core';
import * as Matter from 'matter-js';
@Component({
  selector: 'app-physics-box2',
  templateUrl: './physics-box2.component.html',
  styleUrls: ['./physics-box2.component.css']
})
/**
 * RENDERER, CREATEJS/EASELJS PHYSICS, MATTER-JS
 */      

export class PhysicsBox2Component implements OnInit {

    constructor(private _ngZone: NgZone) {}
  
    //Bind 'myCanvas2' to the designated canvas in DOM, typed with ElementRef
    @ViewChild('myCanvas2') myCanvas2: ElementRef;

    ngOnInit() {}

    ngAfterViewInit() {
        var tempContext = this.myCanvas2.nativeElement.getContext("2d");
        tempContext.translate(0.5, 0.5);
        var Engine = Matter.Engine;
        var Render = Matter.Render;
        var Runner = Matter.Runner;
        var Body = Matter.Body;
        var Composites = Matter.Composites;
        var MouseConstraint = Matter.MouseConstraint;
        var Bodies = Matter.Bodies;
        var World = Matter.World;
        var Mouse = Matter.Mouse;
        var Vector = Matter.Vector;

        /** 
         * Heavenly actor class
         */ 

        /** 
         * Heavenly World class
         */         
        class CanvasWorld {
            //Typings
            //Setup
            stage : createjs.Stage;
            engine : Matter.Engine;
            world : Matter.World;

            //Actors
            actors : Array<any>;
            anim : any;
            //Options
            fps : number;
            currentTime : number;
            previousTime : number;
            active : boolean;
            deltaTarget : number;
            deltaTime : number;
            frame : number;

            constructor(canvas, options?){
                // Create Render World, TODO?: create canvas if none is provided
                this.stage = new createjs.Stage(canvas);
                this.frame = 0;
                // Create Physics World
                this.engine = Engine.create();
                this.world = this.engine.world;
                this.actors = [];
                // Define options
                this.fps = 60;
                this.currentTime = Date.now();
                this.previousTime = Date.now();
                this.active = false;
                this.deltaTarget = 1000 / this.fps;
                this.deltaTime = this.deltaTarget;

            }
            initBoundarys(){
                var groundBox = new createjs.Shape();
                groundBox.graphics.beginFill("red");
                groundBox.graphics.drawRect(0, 290, 500, 10);
                groundBox.graphics.endFill();
                this.stage.addChild(groundBox);

                var ground = Bodies.rectangle(150, 300, 500, 10);
                ground.isStatic = true;
                var left = Bodies.rectangle(0, 150, 10, 375);
                left.isStatic = true;
                var right = Bodies.rectangle(375, 150, 10, 375);
                right.isStatic = true;
                World.add(megaWorld.world, ground);
                World.add(megaWorld.world, left);
                World.add(megaWorld.world, right);
            }
            /**
             * Spawn object in both worlds,
             * spawn(type, link)
             */
            spawn(type?, link?){
                //TODO, type is news, getStarted etc..
                //TODO, link is link to HTML

                //Render Spawn
                var typeBMP = new createjs.Bitmap("assets/images/test.png");
                typeBMP.x = Math.random()*100+200;
                typeBMP.y = 0;
                typeBMP.regX = 25; //middle of image, change later. to be based on type etc...
                typeBMP.regY = 25;
                this.stage.addChild(typeBMP);
                //Physics Spawn
                var physicsSize = {
                    x: 50, 
                    y: 50
                }
                var typeBody = Bodies.rectangle(typeBMP.x, typeBMP.y, physicsSize.x, physicsSize.y); //TODO Size should be dependant on content type later..
                typeBody.density = 0.5;
                typeBody.restitution = 0.7;
                Body.setAngularVelocity(typeBody, Math.random()*0.1)
                World.add(megaWorld.world, typeBody); //add to physics world
                //create actor, link between phys and render.
                var actor = new CanvasWorld.ActorObject(typeBody, typeBMP);
                this.actors.push(actor);
                var mega = this;
                //setTimeout(mega.spawn(), 1000);
            }
            startStepper(){
                this.active = true;
                this.step();
            };

            stopStepper(){
                this.active = false;
            };

            step(){
                //Define current time and calculate length (dT) of last frame
                this.currentTime = Date.now();
                this.deltaTime = this.currentTime - this.previousTime;
                if(this.deltaTime >= 1000/this.fps){

                    this.frame += 1;
                    if(this.frame % 60 ===0){
                        this.spawn();
                    }

                    
                    //Update physics world (Matterjs)
                    Engine.update(this.engine, this.deltaTime); 

                    //Update all actors (for loop is faster than array.foreach...)
                    for(let i = 0; i < this.actors.length; i++){
                        this.actors[i].update();
                        if(this.actors[i].sprite.y > 350){ //kill out of bound actors and bodies..
                            this.stage.removeChild(this.actors[i].sprite);
                            World.remove(this.engine.world, this.actors[i].body);
                            this.actors.splice(i,1);
                        }
                    } 
                    
                    //update render world (Createjs)
                    this.stage.update(); 

                    //Prepare next frame
                    this.previousTime = this.currentTime;

                }
                // Schedule next frame
                let context = this;
                if(this.active){
                    this.anim = window.requestAnimationFrame( function() {context.step()} );
                }
            };

            static ActorObject = class {
                public body: Matter.Body;      //
                public sprite: createjs.Bitmap;  //
                constructor (body: Matter.Body, sprite: createjs.Bitmap){
                    this.body = body;
                    this.sprite = sprite;
                }
                update (){
                    this.sprite.rotation = this.body.angle/((Math.PI*2)/360); //body.angle is in radians. sprite is in degrees
                    this.sprite.x = this.body.position.x;
                    this.sprite.y = this.body.position.y;
                }
            };

        };//end worldclass
        
        //create world. TODO: FIND BETTER NAME "megaWorld" sucks
        var megaWorld = new CanvasWorld(this.myCanvas2.nativeElement);
        megaWorld.initBoundarys();
        ////Run stepper
        //(megaWorld.startStepper();

        //Run stepper, (Optimized for Angular2)
        this._ngZone.runOutsideAngular(() => megaWorld.startStepper());

        //!!Prototype
        //Spawn Body in both Renderer + PhysicsEngine

        // add bodies
        /*
        var compositesOptions = {
              xx: 200, 
              yy: 200, 
              columns: 20, 
              rows: 20, 
              columnGap: 4, 
              rowGap: 1, 
              crossBrace: false, 
              particleRadius: 2,
              particleOptions: Infinity,
              constraintOptions: 0.4
            };

        var group = Body.nextGroup(true),
            particleOptions = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: true }},
            cloth = Composites.softBody(200,200,20,12,8,8,false,8,particleOptions,0.4);

        for (var i = 0; i < 20; i++) {
            cloth.bodies[i].isStatic = true;
        }
        for (let i = 90; i < 100; i++){
          Body.scale(cloth.bodies[i], 2, 2);
        }
        */
        /*
        var testBody = Bodies.rectangle(80,80,80,80);//Body.create();
        World.add(megaWorld.world, testBody);
        var addWorldOptions = [
              //Bodies.circle(300, 500, 80, { isStatic: true }, 25),
              //Bodies.rectangle(500, 480, 80, 80, { isStatic: true }),
              Bodies.rectangle(400, 609, 800, 50, { isStatic: true })
              ]
            ;
            
        World.add(megaWorld.world, cloth);
        World.add(megaWorld.world, addWorldOptions);
        */
        // add mouse control
        /*
        var mouseOptions = {
                mouse: mouse,
                constraint: {
                    stiffness: 0.98
                }
            };
            */
        
        //Create mouse input on HTML element
        var mouse = Mouse.create(this.myCanvas2.nativeElement);
        //Sets the element the mouse is bound to (and relative to). (??)
        Mouse.setElement(mouse, this.myCanvas2.nativeElement);

        var mouseConstraint = MouseConstraint.create(megaWorld.engine, {mouse: mouse});

        World.add(megaWorld.world, mouseConstraint);
        
        
        megaWorld.spawn();
        // keep the mouse in sync with rendering
        //render.mouse = mouse;
        // fit the render viewport to the scene
        //Render.lookAt(render);

        // run the engine
        Engine.run(megaWorld.engine);
    };
}