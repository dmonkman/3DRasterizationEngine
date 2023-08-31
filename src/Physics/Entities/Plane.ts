import { Triangle, Mesh, Axis } from "../../Maths/index.js";
import { Entity } from "../Entity.js"

export class Plane extends Entity{
	constructor(x, y, z, size, color) {
		super(x, y, z)

		this.mesh.faces.push(new Triangle(x-size, y+0.0, z-size,    x-size, y+0.0, z+size,    x+size, y+0.0, z+size, color));
		this.mesh.faces.push(new Triangle(x+size, y+0.0, z+size,    x+size, y+0.0, z-size,    x-size, y+0.0, z-size, color));
	} 
	draw(camera){
		for(var i = 0; i < this.mesh.faces.length; i++){
			camera.queueTriangle(this.mesh.faces[i]);
		}
	}
	rotate(angle, axis) {
		for(var i = 0; i < this.mesh.faces.length; i++){
			for(var j = 0; j < 3; j++){
				this.mesh.faces[i].vert[j].rotate(angle, new Axis(this.position.x, this.position.y, this.position.z, axis.x, axis.y, axis.z));
				this.mesh.faces[i].normalize();
			}
		}
	}
}