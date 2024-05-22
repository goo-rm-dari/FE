type XYZ = {
    x: number;
    y: number;
    z: number;
  };
  
  class getGyroLocation {
    private dt: number;
    private acceleration: { x: number; y: number; z: number };
    public velocity: { x: number; y: number; z: number };
    public location: { x: number; y: number; z: number };
    constructor() {
      this.dt = 0.02;
      this.acceleration = { x: 0, y: 0, z: 0 };
      this.velocity = { x: 0, y: 0, z: 0 };
      this.location = { x: 0, y: 0, z: 0 };
    }
  
    private calculate() {
      this.velocity.x = this.acceleration.x * this.dt + this.velocity.x;
      this.velocity.y = this.acceleration.y * this.dt + this.velocity.y;
      this.velocity.z = this.acceleration.z * this.dt + this.velocity.z;
  
      const x = this.velocity.x * this.dt + this.location.x;
      const y = this.velocity.y * this.dt + this.location.y;
      const z = this.velocity.z * this.dt + this.location.z;
  
      this.location = { x: x, y: y, z: z };
    }
  
    public setAcceleration({ x, y, z }: XYZ) {
      const base = 9;
      const ax = Number(x.toFixed(Math.floor(Math.abs(((x * 10) % 10) / base))));
      const ay = Number(y.toFixed(Math.floor(Math.abs(((y * 10) % 10) / base))));
      const az = Number(z.toFixed(Math.floor(Math.abs(((z * 10) % 10) / base))));
  
      this.acceleration = { x: ax, y: ay, z: az };
    }
  
    public getLocation() {
      this.calculate();
      return this.location;
    }
  }
  
  export { getGyroLocation };