import { Vector3 } from "../Core/Structs/index.js";
import { Mesh, Triangle, Axis } from "../Core/Geometry/index.js";
import { LinearAlgebra } from "../Core/Functions/index.js"

export class Entity{
	position: Vector3;
	mesh: Mesh;
	color: string;
	tris: Array<Triangle>;
	
    constructor(x, y, z, meshFile = null, color = "#00FFAA") {
		this.position = new Vector3(x, y, z);
		this.mesh = this.LoadMesh(meshFile);
        this.color = color;
	} 
	draw(camera){
		for(var i = 0; i < this.mesh.faces.length; i++){
			camera.queueTriangle(this.mesh.faces[i]);
		}
	}
	rotate(angle, axis) {
		for(var i = 0; i < this.mesh.vertices.length; i++){
			this.mesh.vertices[i] = LinearAlgebra.Vector3_Rotate(this.mesh.vertices[i], angle, new Axis(this.position, axis));
			this.mesh.vertices[i].normalize();
		}
	}

    // Load meshes
	LoadMesh(meshFile){
        var mesh = new Mesh();
        if (meshFile == null) {
			return new Mesh();
		}

		var line = [];
        var vertices = [];
        var faces = [];
		for(var i = 0; i < meshFile.length; i++){
			line = meshFile[i].split(' ');
			if(line[0] == 'v'){
				vertices.push(new Vector3(parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])));
			}
			else if(line[0] == 'f'){
				faces.push(new Array(parseInt(line[1])-1, parseInt(line[2])-1, parseInt(line[3])-1));
			}
		}

		mesh.faces = faces;
		mesh.vertices = vertices;
		this.mesh = mesh;
		return mesh;
    }
}
