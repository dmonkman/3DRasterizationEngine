export class Keyboard{
    KeyDown : Map<string, boolean> = new Map();

    constructor(){
        // Add event listeners for keydown and keyup events
        document.addEventListener("keydown", (event) => {
            this.KeyDown[event.key] = true;
            console.log(event.key + " " + this.KeyDown[event.key]);
        });

        document.addEventListener("keyup", (event) => {
            this.KeyDown[event.key] = false;
            console.log(event.key + " " + this.KeyDown[event.key]);
        });
    }
}