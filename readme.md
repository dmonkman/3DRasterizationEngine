# 3D Rasterization Engine by Drayton Monkman

Updated: July 19, 2023

## About

This is a basic 3D renderer and rasterizer developed from scratch using only HTML canvas and Javacript + JQuery. It can parse .obj files as used in blender if conformed to the template found in teapot.obj.js. The camera can be moved using the controls listed below. I opted to use quaternion rotation to allow for more freedom when rotating the camera. It also makes it easier to implement aircraft / flight based programs where the camera is constantly rotating about it's axes in different orientations.


## Controls

- Movement:
    - w, a ,s, d keys to move the camera
- Rotation:
    - 1, 2 keys to control yaw (rotate the camera about it's up axis)
    - q, e keys to control roll (rotate the camera about it's forward axis)
    - r, f keys to control pitch (rotate the camera about it's right axis)
- Misc:
    - 3, 4 keys change the field of view 
    - 5, 6 keys to disable, enable wireframe meshes respectively
    - z key to reset the camera direction to (0,0,1), ie. the positive z axis