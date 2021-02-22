// class RS {
//   constructor(color) {
//     this.color = color;
//   }

//   fly() {
//     console.log(`The ${this.color} ship is flying.`)
//   }

//   land() {
//     console.log(`The ${this.color} ship has landed.`)
//   }
// }

// const r1 = new RS('blue');

// r1.fly();
// r1.land()


class RocketShip {
  constructor(color) {
    this.defColor = color;
  }
  get color() {
    return this.defColor;
  }
  fly() {
    console.log(`The ${this.color} rocket is flying!`);
  }
  land() {
    console.log(`The ${this.color} rocket has landed.`);
    yield
  }
}

const r1 = new RocketShip('blue');

r1.fly()
r1.land()
console.log(r1.color)
r1.color = 'sad';
console.log(r1.color)
r1.fly()
