import { Vec3f } from "./Vec3f.js";

export class Axis {
	position: Vec3f;
	direction: Vec3f;
	constructor(px, py, pz, vx, vy, vz){
		this.position = new Vec3f(px, py, pz);
		this.direction = new Vec3f(vx, vy, vz);
	}
}
