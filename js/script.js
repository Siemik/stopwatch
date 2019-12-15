let timeTable = [];

class Stopwatch extends React.Component {
  constructor(display) {
   super(display);
    this.state = {
      running: false,
      display: display,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
    };
  }
  reset() {
    this.setState ({
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
    });
  }

  format(times) {
    return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start() {
	console.log(this.state.running);
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    if (!this.state.running) return;
    let miliseconds = this.state.times.miliseconds;
    let seconds = this.state.times.seconds;
    let minutes = this.state.times.minutes;

    miliseconds++;

    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    this.setState({
      times: {
        minutes: minutes,
        seconds: seconds,
        miliseconds: miliseconds
      }
    })
  }

  stop() {
    this.state.running = false;
    clearInterval(this.watch);
  }

  get() {
    console.log(this.format(this.times));
    timeTable = [...timeTable, this.format(this.times)];
    console.log(timeTable);
  }

  results() {
    let pos = timeTable.length - 1;
    this.val = timeTable;
    let addTime = timeTable[pos]
    const res = document.getElementById('list');
    const list = document.createElement("li");
    list.innerText = addTime;
    res.appendChild(list);
  }

  pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
 }

  render() {
    return React.createElement('div', {},
      React.createElement('div', {className: 'controls'},
      React.createElement('paragraph',  {className: 'button', onClick: () => this.start()}, 'start'),
      React.createElement('paragraph', {className: 'button', onClick: () => this.stop()}, 'stop'),
    ),
    React.createElement('div', {className: 'stopwatch',id: 'stopwatch'}, this.format())
    )
  }
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));
