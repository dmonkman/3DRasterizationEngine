//By Drayton Monkman, June 2020
import { Camera } from "./Renderer/index.js";
import { Vec3f, Quaternion } from "./Maths/index.js";
import { Entity, Cube, Plane } from "./Physics/index.js";
import { teapotobj } from "./teapot.obj.js"
type KeyboardEventNames = 'keydown' | 'keyup';

enum Keys {
	ZERO = 48,
	ONE = 49,
	TWO = 50,
	THREE = 51,
	FOUR = 52,
	FIVE = 53,
	SIX = 54,
	SEVEN = 55,
	EIGHT = 56,
	NINE = 57,
	A = 65,
	B = 66,
	C = 67,
	D = 68,
	E = 69,
	F = 70,
	H = 71,
	G = 72,
	I = 73,
	J = 74,
	K = 75,
	L = 76,
	M = 77,
	N = 78,
	O = 79,
	P = 80,
	Q = 81,
	R = 82,
	S = 83,
	T = 84,
	U = 85,
	V = 86,
	W = 87,
	X = 88,
	Y = 89,
	Z = 90,
};

let KeyDown = [];	

// Initialize keys
for(let i = 0; i < 256; i++){
	KeyDown[i] = false;
}


// Add event listeners for keydown and keyup events
document.addEventListener("keydown", (event) => {
    KeyDown[event.keyCode] = true;
	console.log(event.key + " " + KeyDown[event.keyCode]);
});

document.addEventListener("keyup", (event) => {
    KeyDown[event.keyCode] = false;
	console.log(event.keyCode + " " + KeyDown[event.keyCode]);
});


class RasterEngine3D{
	// Components
	// 1. Physics / Gameplay
	// 2. I/O
	// 3. Graphics
	mainCamera : Camera;

	tickRate : number;
	tickTime : number;
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

	readonly Keys = Keys;

	printTris = false;

	entities : Array<Entity>
	
	constructor(){
		this.mainCamera = new Camera(new Vec3f(0, 2, -10), new Vec3f(0, 0, 1), new Vec3f(0, 1, 0));
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
	

		this.entities = new Array<Entity>;
	}

	
	// listenTo = (window: Window) => {
	// 	const eventNames: KeyboardEventNames[] = ['keydown', 'keyup']; 
	// 	eventNames.forEach(eventName => {
	// 		window.addEventListener(eventName, e => {
	// 		this.handleEvent(e, eventName);
	// 		});
	// 	});
	// };

	// handleEvent = (event: KeyboardEvent, eventName: KeyboardEventNames) => {
	// 	console.log(event + " " + eventName);
	// 	if(eventName == 'keydown'){
	// 		KeyDown[event.key] = true;
	// 	}
	// 	else if(eventName == 'keyup'){
	// 		KeyDown[event.key] = false;
	// 	}
	// };

	// this.print = false;
	// Load assets required for the program
	Load(){
		// Greate a large cube
		this.entities.push(new Cube(0, 0, 200, 100));

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
		// this.entities.push(new Entity(5, 1, 5, teapotobj))
    }

	// Handle all key inputs
	Input(){
		if(KeyDown[this.Keys.Z]){
			// Reset camera vectors using the rotation Quaternion 
			this.mainCamera.resetRotation();
		}
		if(KeyDown[this.Keys.W]){
			this.mainCamera.moveForward();
		}
		if(KeyDown[this.Keys.S]){
			this.mainCamera.moveBackwards();
		}
		if(KeyDown[this.Keys.A]){
			this.mainCamera.moveLeft();
		}
		if(KeyDown[this.Keys.D]){
			this.mainCamera.moveRight();
		}
		if(KeyDown[this.Keys.ONE]){
			this.mainCamera.yaw(-0.02)
		}
		if(KeyDown[this.Keys.TWO]){
			this.mainCamera.yaw(0.02)
		}
		if(KeyDown[this.Keys.E]){
			this.mainCamera.roll(-0.02)
		}
		if(KeyDown[this.Keys.Q]){
			this.mainCamera.roll(0.02)
		}
		if(KeyDown[this.Keys.R]){
			this.mainCamera.pitch(0.02)
		}
		if(KeyDown[this.Keys.F]){
			this.mainCamera.pitch(-0.02)
		}
		if(KeyDown[this.Keys.THREE]){
			//printTris = true;
			this.mainCamera.modifyFOV(-0.01);
		}
		if(KeyDown[this.Keys.FOUR]){
			this.mainCamera.modifyFOV(0.01);
		}
		if(KeyDown[this.Keys.FIVE]){
			this.mainCamera.DEBUG = false;
		}
		if(KeyDown[this.Keys.SIX]){
			this.mainCamera.DEBUG = true;
		}
		if(KeyDown[this.Keys.G]){
			console.log(true)
			this.printTris = true;
		}
	}
	
	// Handle all changes to the environment that do not result from input
	Engine(){
		//cube1.rotate(-0.01, new Vec3f(1,1,0));
		
		
	}

	loopCount : number = 0;
	quit : boolean;

	public run(){
		this.Load()
		this.main();
	}

	private async main(): Promise<void>{
		this.quit = false;

		// Main Application loop
		while(true){
			// console.log("Main successful!: " + this.loopCount);
			this.loopCount += 1;
			const date = new Date();
			// console.log(date.toLocaleTimeString());

			// Start time of the new tick and end of the previous tick
			let tTickEnd = performance.now();		
			
			// Add time since last frame
			this.tSinceLastFrame += tTickEnd - this.tTickStart;			
			this.tTickStart = tTickEnd;
			
			this.Input();				// Poll for user input
			this.Engine();				// Perform calculations and actions within the engine
			this.mainCamera.Render(this.entities);
			console.log("Hello World1!!!!!!!");

			await delay(1);
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

