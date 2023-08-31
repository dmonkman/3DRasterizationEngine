import { Vec3f, Axis, Triangle, Mesh } from "../Maths/index.js";

export class Entity{
	protected position: Vec3f;
	protected mesh: Mesh;
	protected color: string;
	
    constructor(x, y, z, meshFile = null, color = "#00FFAA") {
		this.position = new Vec3f(x, y, z);
		this.mesh = this.LoadMesh(meshFile);
        this.color = color;
	} 
	draw(camera){
		for(var i = 0; i < this.mesh.faces.length; i++){
			camera.queueTriangle(this.mesh.faces[i]);
			//camera.fillTriangle(this.mesh.faces[i]);	
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

    // Load meshes
	LoadMesh(meshFile){
        var mesh = new Mesh();
        if (meshFile == null) return new Mesh();
		var line = [];
        var vertices = [];
        var faces = [];
		for(var i = 0; i < meshFile.length; i++){
			line = meshFile[i].split(' ');
			if(line[0] == 'v'){
				vertices.push(new Vec3f(parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])));
			}
			else if(line[0] == 'f'){
				faces.push(new Array(parseInt(line[1])-1, parseInt(line[2])-1, parseInt(line[3])-1));
			}
		}
        for(var i = 0; i < faces.length-1; i++){
            mesh.faces.push(new Triangle(
                this.position.x + vertices[faces[i][0]].x,
                this.position.y + vertices[faces[i][0]].y,
                this.position.z + vertices[faces[i][0]].z,
                this.position.x + vertices[faces[i][1]].x,
                this.position.y + vertices[faces[i][1]].y,
                this.position.z + vertices[faces[i][1]].z,
                this.position.x + vertices[faces[i][2]].x,
                this.position.y + vertices[faces[i][2]].y,
                this.position.z + vertices[faces[i][2]].z,
                this.color))
        }
		return mesh;
		//console.log(teapotMesh.faces);
    }
}
