import { Triangle, Axis } from "../../Core/Geometry/index.js";
import { Entity } from "../Entity.js";
import { Vector3 } from "../../Core/Structs/Vector3.js";

export class Cube extends Entity{
	constructor(x, y, z, size) {
		super(x, y, z)

		const halfSize = size / 2;
    
		this.mesh.vertices[0] = new Vector3(x - halfSize, y - halfSize, z - halfSize);
		this.mesh.vertices[1] = new Vector3(x - halfSize, y + halfSize, z - halfSize);
		this.mesh.vertices[2] = new Vector3(x + halfSize, y + halfSize, z - halfSize);
		this.mesh.vertices[3] = new Vector3(x + halfSize, y - halfSize, z - halfSize);
		this.mesh.vertices[4] = new Vector3(x + halfSize, y + halfSize, z + halfSize);
		this.mesh.vertices[5] = new Vector3(x + halfSize, y - halfSize, z + halfSize);
		this.mesh.vertices[6] = new Vector3(x - halfSize, y - halfSize, z + halfSize);
		this.mesh.vertices[7] = new Vector3(x - halfSize, y + halfSize, z + halfSize);

		this.mesh.faces.push(new Vector3(0, 1, 2));
		this.mesh.faces.push(new Vector3(0, 2, 3));
		this.mesh.faces.push(new Vector3(3, 2, 4));
		this.mesh.faces.push(new Vector3(3, 4, 5));
		this.mesh.faces.push(new Vector3(5, 4, 7));
		this.mesh.faces.push(new Vector3(5, 7, 6));
		this.mesh.faces.push(new Vector3(6, 7, 1));
		this.mesh.faces.push(new Vector3(6, 1, 0));
		this.mesh.faces.push(new Vector3(1, 7, 4));
		this.mesh.faces.push(new Vector3(1, 4, 2));
		this.mesh.faces.push(new Vector3(5, 6, 0));
		this.mesh.faces.push(new Vector3(5, 0, 3));
	} 
}

