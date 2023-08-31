import { Vector3 } from "../Basic/Vector3.js";
import { LinearAlgebra } from "../Advanced/LinearAlgebra.js";

export class Triangle {
	vert: Array<Vector3> = new Array<Vector3>(3);
	normal: Vector3;
	midpoint: Vector3;
	
	constructor(v1: Vector3, v2: Vector3, v3: Vector3) {
		this.vert[0] = v1;
		this.vert[1] = v2;
		this.vert[2] = v3;
		this.calculateNormalVector();
		this.calculateMidPoint();
	}
	calculateNormalVector() {
		this.normal = LinearAlgebra.Vector3_CrossProduct(
			LinearAlgebra.Vector3_Sub(this.vert[1], this.vert[0]), 
			LinearAlgebra.Vector3_Sub(this.vert[2], this.vert[0])
		);
	}
	calculateMidPoint(){
		var midp01 = LinearAlgebra.Vector3_Add(this.vert[0], LinearAlgebra.Vector3_Scale(LinearAlgebra.Vector3_Sub(this.vert[1], this.vert[0]), 0.5));
		//this.midpoint = this.vert[0];
		this.midpoint = LinearAlgebra.Vector3_Add(midp01, (LinearAlgebra.Vector3_Scale(LinearAlgebra.Vector3_Sub(this.vert[2], midp01), 0.5)));
	}
}