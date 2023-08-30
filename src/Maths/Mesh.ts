import { Vec3f } from "./Vec3f.js";
import { Triangle } from "./Triangle.js";

export class Mesh {
	vertices: Array<Vec3f>;
	faces: Array<Triangle>;
	constructor() {
		this.vertices = [];
		this.faces = [];
	}
}
