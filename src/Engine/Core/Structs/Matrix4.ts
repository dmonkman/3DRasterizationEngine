export class Mat4x4 {
	m: Array<Array<number>>;
	constructor(){
		this.m = new Array();
		for(var i = 0; i < 4; i++){
			this.m[i] = [];
		}
	}
}
