//By Drayton Monkman, June 2020
import { Camera } from "./Renderer/index.js";
import { Vec3f, Quaternion } from "./Maths/index.js";
import { Entity, Cube, Plane } from "./Physics/index.js";

type KeyboardEventNames = 'keydown' | 'keyup';

class RasterEngine3D{
	// Components
	// 1. Physics / Gameplay
	// 2. I/O
	// 3. Graphics
	mainCamera : Camera;

	tickRate : number;
	const tickTime : number;
	frameRate : number;		
	frameTime : number;
	tFrameStart : number;
	tFrameEnd: number;
	tTickStart : number;
	tTickEnd : number;
	tPrevDraw : number;
	tSinceLastFrame : number;
	ticks : number;
	frames : number;

	printTris = false;
	KeyDown = [];	

	entities : Array<Entity>
	
	constructor(){
		this.mainCamera = new Camera([0, 2, -10], [0, 0, 1], [0, 1, 0]);
		this.tickRate = 10;	
		this.tickTime = 1000/this.tickRate;	
		this.frameRate = 60;			
		this.frameTime = 1000/this.frameRate; 
		this.tFrameStart = 0;
		this.tFrameEnd= 0;
		this.tTickStart = 0;
		this.tTickEnd = 0;
		this.tPrevDraw = 0;
		this.tSinceLastFrame = 0;
		
		this.ticks = 0;
		this.frames = 0;
		this.printTris = false;
	
		this.KeyDown = [];	

		// Initialize keys
		for(let i = 0; i < 256; i++){
			this.KeyDown[i] = false;
		}
	}
	

	const Keys = {
		ZERO: 48,
		ONE: 49,
		TWO: 50,
		THREE: 51,
		FOUR: 52,
		FIVE: 53,
		SIX: 54,
		SEVEN: 55,
		EIGHT: 56,
		NINE: 57,
		A: 65,
		B: 66,
		C: 67,
		D: 68,
		E: 69,
		F: 70,
		H: 71,
		G: 72,
		I: 73,
		J: 74,
		K: 75,
		L: 76,
		M: 77,
		N: 78,
		O: 79,
		P: 80,
		Q: 81,
		R: 82,
		S: 83,
		T: 84,
		U: 85,
		V: 86,
		W: 87,
		X: 88,
		Y: 89,
		Z: 90,
	};
	
	listenTo = (window: Window) => {
		const eventNames: KeyboardEventNames[] = ['keydown', 'keyup']; 
		eventNames.forEach(eventName => {
			window.addEventListener(eventName, e => {
			this.handleEvent(e, eventName);
			});
		});
	};

	handleEvent = (event: KeyboardEvent, eventName: KeyboardEventNames) => {
		if(eventName == 'keydown'){
			this.KeyDown[event.keyCode] = true;
		}
		else if(eventName == 'keyup'){
			this.KeyDown[event.keyCode] = false;
		}
	};



	entities = Array<Entity>;
	// this.print = false;
	// Load assets required for the program
	Load(){
		// Greate a large cube
		this.entities.push(new Cube(-50, -100, 100, 100));


		// Create some cube game objects to represent the x, y, z axes
		this.entities.push(new Cube(0, 0, 0, 1));
		for(var i = 1; i < 6; i++){
			this.entities.push(new Cube(0, 0, i, 1));
			this.entities.push(new Cube(i, 0, 0, 1));
			this.entities.push(new Cube(0, i, 0, 1));
		}

		// Load a plane at y = -100
		this.entities.push(new Plane(-500, -10, -500, 1000, "#000088"))
		
		// Load the teapot game object
		this.entities.push(new Entity(5, 1, 5, teapotobj))
    }
	// Handle all key inputs
	Input(){
		if(this.KeyDown[this.Keys.Z]){
			// Reset camera vectors using the rotation Quaternion 
			var Q = this.mainCamera.rotation
			this.mainCamera.direction.rotate_origin(2*Math.acos(Q.w), new Vec3f(Q.x, Q.y, Q.z))
			this.mainCamera.up.rotate_origin(2*Math.acos(Q.w), new Vec3f(Q.x, Q.y, Q.z))
			this.mainCamera.right.rotate_origin(2*Math.acos(Q.w), new Vec3f(Q.x, Q.y, Q.z))
			this.mainCamera.rotation = new Quaternion()
		}
		if(this.KeyDown[this.Keys.W]){
			this.mainCamera.position.addAssign(this.mainCamera.direction.scale(0.2));
		}
		if(this.KeyDown[this.Keys.S]){
			this.mainCamera.position.subAssign(this.mainCamera.direction.scale(0.2));
		}
		if(this.KeyDown[this.Keys.A]){
			this.mainCamera.position.addAssign(this.mainCamera.right.scale(-0.2));
		}
		if(this.KeyDown[this.Keys.D]){
			this.mainCamera.position.subAssign(this.mainCamera.right.scale(-0.2));
		}
		if(this.KeyDown[this.Keys.ONE]){
			this.mainCamera.yaw(-0.02)
		}
		if(this.KeyDown[this.Keys.TWO]){
			this.mainCamera.yaw(0.02)
		}
		if(this.KeyDown[this.Keys.E]){
			this.mainCamera.roll(-0.02)
		}
		if(this.KeyDown[this.Keys.Q]){
			this.mainCamera.roll(0.02)
		}
		if(this.KeyDown[this.Keys.R]){
			this.mainCamera.pitch(0.02)
		}
		if(this.KeyDown[this.Keys.F]){
			this.mainCamera.pitch(-0.02)
		}
		if(this.KeyDown[this.Keys.THREE]){
			//printTris = true;
			
			this.mainCamera.FOV -= 0.01;
			this.mainCamera.FOV = Math.max(this.mainCamera.FOV, Math.PI/6);
			this.mainCamera.invTanFOV = 1/Math.tan(this.mainCamera.FOV/2);
			
		}
		if(this.KeyDown[this.Keys.FOUR]){
			
			this.mainCamera.FOV += 0.01;
			this.mainCamera.FOV = Math.min(this.mainCamera.FOV, 5*Math.PI/6);
			this.mainCamera.invTanFOV = 1/Math.tan(this.mainCamera.FOV/2);
		}
		if(this.KeyDown[this.Keys.FIVE]){
			this.mainCamera.DEBUG = false;
		}
		if(this.KeyDown[this.Keys.SIX]){
			this.mainCamera.DEBUG = true;
		}
		if(this.KeyDown[this.Keys.G]){
			console.log(true)
			printTris = true;
		}
	}
	
	// Handle all changes to the environment that do not result from input
	Engine(){
		//cube1.rotate(-0.01, new Vec3f(1,1,0));
		
		
	}
	Render(){

		// Fill the backgrounds
		this.mainCamera.position.addAssign(this.mainCamera.direction)
		this.mainCamera.ctx.clearRect(0, 0, this.mainCamera.cvsWidth, this.mainCamera.cvsHeight);
		this.mainCamera.ctx.fillStyle = "#FFFFFF";
		this.mainCamera.ctx.strokeStyle = "#FFFFFF";
		var grd = this.mainCamera.ctx.createLinearGradient(this.mainCamera.cvsWidth/2, this.mainCamera.cvsHeight, this.mainCamera.cvsWidth/2, 0);
		grd.addColorStop(1, '#8888DD');
		grd.addColorStop(0, "white");
		this.mainCamera.ctx.fillStyle = grd;


		this.mainCamera.ctx.fillRect(0, 0, this.mainCamera.cvsWidth, this.mainCamera.cvsHeight);
		/*
		var grd = this.mainCamera.ctx.createLinearGradient(cvsWidth/2, cvsHeight/2, cvsWidth/2, cvsHeight);
		grd.addColorStop(1, '#0000FF');
		grd.addColorStop(0, "#4444EE");
		this.mainCamera.ctx.fillStyle = grd;
		this.mainCamera.ctx.fillRect(0, cvsHeight/2, cvsWidth, cvsHeight);*/

		// Draw the x,y,z axis
		this.mainCamera.ctx.strokeStyle = "#FF0000";
		this.mainCamera.drawLine(new Vec3f(0, 0, 0), new Vec3f(50000, 0, 0));
		this.mainCamera.ctx.strokeStyle = "#00FF00";
		this.mainCamera.drawLine(new Vec3f(0, 0, 0), new Vec3f(0, 50000, 0));
		this.mainCamera.ctx.strokeStyle = "#0000FF";
		this.mainCamera.drawLine(new Vec3f(0, 0, 0), new Vec3f(0, 0, 50000));
		this.mainCamera.ctx.strokeStyle = "#FFFFFF";
		
		// Queue all game objects to be rendered
		for(var i = 0; i < this.entities.length; i++){
			this.entities[i].draw(this.mainCamera);
		}	

		// Draw all previously queued objects to be rendered
		this.mainCamera.draw();
		
		// Display the current camera position and viewing direction
		this.mainCamera.ctx.fillStyle = "#000000";
		this.mainCamera.ctx.fillText("Position: x:" + this.mainCamera.position.x.toFixed(3) + ", y:" + this.mainCamera.position.y.toFixed(3) + ", z:" + this.mainCamera.position.z.toFixed(3), 10, 20);
		this.mainCamera.ctx.fillText("Direction: x:" + this.mainCamera.direction.x.toFixed(3) + ", y:" + this.mainCamera.direction.y.toFixed(3) + ", z:" + this.mainCamera.direction.z.toFixed(3), 10, 30);
		this.mainCamera.ctx.fillText("Up: x:" + this.mainCamera.up.x.toFixed(3) + ", y:" + this.mainCamera.up.y.toFixed(3) + ", z:" + this.mainCamera.up.z.toFixed(3), 10, 40);
		this.mainCamera.ctx.fillText("Right: x:" + this.mainCamera.right.x.toFixed(3) + ", y:" + this.mainCamera.right.y.toFixed(3) + ", z:" + this.mainCamera.right.z.toFixed(3), 10, 50);
		this.mainCamera.ctx.fillText("Rotation: w:" + this.mainCamera.rotation.w.toFixed(3) + ", x:" + this.mainCamera.rotation.x.toFixed(3) + ", y:" +this.mainCamera.rotation.y.toFixed(3) + ", z:" + this.mainCamera.rotation.z.toFixed(3), 10, 70)

		//this.mainCamera.renderTriangles2D();
		this.mainCamera.ctx.fillText(this.mainCamera.triangleQueue.length.toString(), 10, 200);
	};
	loopCount : number = 0;
	quit : boolean;

	public run(){
		this.main();
	}

	private async main(): Promise<void>{
		this.quit = false;

		// Main Application loop
		while(true){
			console.log("Main successful!: " + this.loopCount);
			this.loopCount += 1;
			const date = new Date();
			console.log(date.toLocaleTimeString());
			await delay(1000);

			// Start time of the new tick and end of the previous tick
			let tTickEnd = performance.now();		
			
			// Add time since last frame
			this.tSinceLastFrame += tTickEnd - this.tTickStart;			
			this.tTickStart = tTickEnd;
			
			this.Input();				// Poll for user input
			this.Engine();				// Perform calculations and actions within the engine
		
			// Draw a new frame if enough time has passed
			if(this.tSinceLastFrame >= this.frameTime)
			{
				this.tSinceLastFrame -= this.frameTime;
				this.Render();
				this.tFrameEnd = performance.now();		// End time of the frame
				let prevFrameTime = this.tFrameEnd - this.tFrameStart;
				this.mainCamera.ctx.fillStyle = "#000000";
				this.mainCamera.ctx.fillText("Time since last frame: " + prevFrameTime.toFixed(3), 10, 160);
				this.mainCamera.ctx.fillText("Frame rate: " + (1000/prevFrameTime).toFixed(1), 10, 10);
				this.tFrameStart = this.tFrameEnd;
				this.frames++;
			}
			this.ticks++;
			this.mainCamera.ctx.fillStyle = "#000000";
			this.mainCamera.ctx.fillText("Ticks : " + this.ticks, 10, 100);
			this.mainCamera.ctx.fillText("Frames : " + frames, 10, 110);

			console.log("Hello World1!!!!!!!");
		}
	};


}

function delay(ms: number) {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

let ApplicationInstance : RasterEngine3D = new RasterEngine3D();
ApplicationInstance.run();


// $(document).ready(function(){

// 	// Draw objects and text to the screen

