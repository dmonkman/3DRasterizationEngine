import { Quaternion } from "./Quaternion.js";
import { Vec3f } from "./Vec3f.js";
import { Mat4x4 } from "./Mat4x4.js";

// STANDALONE ALGEBRA FUNCTIONS
export function Matrix_MultiplyVector(m, i)
{
    let q : Quaternion = new Quaternion(0, 0, 0);
    q.x = i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + i.w * m.m[3][0];
    q.y = i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + i.w * m.m[3][1];
    q.z = i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + i.w * m.m[3][2];
    q.w = i.x * m.m[0][3] + i.y * m.m[1][3] + i.z * m.m[2][3] + i.w * m.m[3][3];
    return new Vec3f(q.x, q.y, q.z);
}

export function Matrix_MultiplyMatrix(m1, m2)
{
    var matrix = new Mat4x4();
    for (var c = 0; c < 4; c++)
        for (var r = 0; r < 4; r++)
            matrix.m[r][c] = m1.m[r][0] * m2.m[0][c] + m1.m[r][1] * m2.m[1][c] + m1.m[r][2] * m2.m[2][c] + m1.m[r][3] * m2.m[3][c];
    return matrix;
}

export function Quaternion_Mul_Q(q1, q2){
	var w_ = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
	var x_ = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
	var y_ = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
	var z_ = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w;
	return new Quaternion(w_, x_, y_, z_)
}

export function Quaternion_Mul_V(q, v){
	var w_ = -q.x*v.x - q.y*v.y - q.z*v.z;
	var x_ = q.w*v.x + q.y*v.z - q.z*v.y;
	var y_ = q.w*v.y - q.x*v.z + q.z*v.x;
	var z_ = q.w*v.z + q.x*v.y - q.y*v.x;
	return new Quaternion(w_, x_, y_, z_)
}

export function Quaternion_Mul_Q_V(q1, q2){
	//var w_ = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
	var x_ = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
	var y_ = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
	var z_ = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w;
	return new Vec3f(x_, y_, z_)
}

export function Vector_Add(v1, v2)
{
    return new Vec3f(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

export function Vector_Sub(v1, v2)
{
    return new Vec3f(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

export function Vector_Scale(v1, k)
{
    return new Vec3f(v1.x * k, v1.y * k, v1.z * k );
}

export function Vector_Div(v1, k)
{
    return new Vec3f(v1.x / k, v1.y / k, v1.z / k );
}

export function Vector_DotProduct(v1, v2)
{
    return v1.x*v2.x + v1.y*v2.y + v1.z * v2.z;
}

export function Vector_Length(v)
{
    return Math.sqrt(Vector_DotProduct(v, v));
}

export function Vector_Normalize(v)
{
    let l = Vector_Length(v);
    return new Vec3f(v.x / l, v.y / l, v.z / l );
}

export function Vector_CrossProduct(v1, v2)
{
    let v : Vec3f = new Vec3f(0, 0, 0);
    v.x = v1.y * v2.z - v1.z * v2.y;
    v.y = v1.z * v2.x - v1.x * v2.z;
    v.z = v1.x * v2.y - v1.y * v2.x;
    return v;
}

export function Vector_IntersectPlane(plane_p, plane_n, lineStart, lineEnd)
{
    plane_n = Vector_Normalize(plane_n);
    let plane_d : number = -Vector_DotProduct(plane_n, plane_p);
    let ad : number = Vector_DotProduct(lineStart, plane_n);
    let bd : number = Vector_DotProduct(lineEnd, plane_n);
    let t : number = (-plane_d - ad) / (bd - ad);
    let lineStartToEnd : Vec3f = Vector_Sub(lineEnd, lineStart);
    let lineToIntersect : Vec3f = Vector_Scale(lineStartToEnd, t);
    return Vector_Add(lineStart, lineToIntersect);
}