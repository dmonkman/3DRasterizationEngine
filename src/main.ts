//By Drayton Monkman, June 2020
import { Camera } from "./Engine/Graphics/index.js";
import { Vector3 } from "./Engine/Core/Structs/index.js";
import { Entity, Cube, Plane } from "./Engine/Physics/index.js";

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

	printTris = false;

	entities : Array<Entity>
	
	constructor(){
		this.mainCamera = new Camera(new Vector3(0, 2, -10), new Vector3(0, 0, 1), new Vector3(0, 1, 0));
		this.entities = new Array<Entity>();
	}

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
		this.entities.push(new Plane(-500, -10, -500, 1000))
		
		// Load the teapot game object
		// this.entities.push(new Entity(5, 1, 5, teapotobj))
    }

	// Handle all key inputs
	Input(){}
	
	// Handle all changes to the environment that do not result from input
	Engine(){}

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
			this.loopCount += 1;
			const date = new Date();

			// Start time of the new tick and end of the previous tick
			let tTickEnd = performance.now();		
			
			// Add time since last frame
			this.tSinceLastFrame += tTickEnd - this.tTickStart;			
			this.tTickStart = tTickEnd;
			
			this.Input();				// Poll for user input
			this.Engine();				// Perform calculations and actions within the engine

			this.mainCamera.Render(this.entities);
			console.log("Hello World1!!!!!!!");

			await delay(33);
		}
	};


}

function delay(ms: number) {
	return new Promise( resolve => setTimeout(resolve, ms) );
}

let ApplicationInstance : RasterEngine3D = new RasterEngine3D();
ApplicationInstance.run();


// $(document).ready(function(){