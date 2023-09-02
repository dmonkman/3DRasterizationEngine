import { Vector3 } from "../Structs/index.js";

export class Mesh {
	vertices: Array<Vector3>;
	faces: Array<Vector3>;
	constructor() {
		this.vertices = [];
		this.faces = [];
	}
}
