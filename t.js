const p = {
  name: "Dinesh",
  getName: function () {
    console.log(this.name)
  }
}

const p1 = {
  name: "lalli",
  getName: function (arg) {
    console.log(this.name, this.arg)
  }
}

// setTimeout(p.getName, 1000);
// setTimeout(function () { p.getName() }, 1000)
const f = p.getName.bind(p1, 'flkf')

setTimeout(f, 1000)
