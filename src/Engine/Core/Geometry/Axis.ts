import { Vector3 } from "../Structs/index.js";

export class Axis {
	position: Vector3;
	direction: Vector3;
	constructor(pos: Vector3, dir: Vector3){
		this.position = pos;
		this.direction = dir;
	}
}
