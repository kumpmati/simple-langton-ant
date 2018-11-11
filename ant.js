class Ant {
  constructor() {
    this.dir = 0;
    this.x = Math.floor(Math.random() * c.width);
    this.y = Math.floor(Math.random() * c.height);
  }
  move() {
    switch (this.dir) {
      //left
      case 0:
        this.x--;
        break;
      //up
      case 1:
        this.y--;
        break;
      //right
      case 2:
        this.x++;
        break;
      //down
      case 3:
        this.y++;
        break;
    }
  }
  turn(d) {
    this.dir += d;
    this.dir %= 4;
    if (this.dir < 0) this.dir = 4 + this.dir;
  }
}
