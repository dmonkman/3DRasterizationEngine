import { Entity } from "../Entity.js"
import { Vector3 } from "../../Core/Structs/index.js";

export class Plane extends Entity{
	constructor(x, y, z, size) {
		super(x, y, z)

		let halfSize = size /2;
		this.mesh.vertices.push(new Vector3(x - halfSize, y, z - halfSize));
		this.mesh.vertices.push(new Vector3(x - halfSize, y, z + halfSize));
		this.mesh.vertices.push(new Vector3(x + halfSize, y, z + halfSize));
		this.mesh.vertices.push(new Vector3(x + halfSize, y, z - halfSize));

		this.mesh.faces.push(new Vector3(0,    1,    2));
		this.mesh.faces.push(new Vector3(0,    2,    3));
	} 
}