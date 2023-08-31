import { Vector3 } from "./Vector3.js";
import { Triangle } from "../Geometry/Triangle.js";

export class Mesh {
	vertices: Array<Vector3>;
	faces: Array<Triangle>;
	constructor() {
		this.vertices = [];
		this.faces = [];
	}
}
