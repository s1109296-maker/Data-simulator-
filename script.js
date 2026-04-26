let mode = "array";

let array = JSON.parse(localStorage.getItem("array")) || [];
let stack = [];
let queue = [];
let graph = {};
let root = null;

/* MODE */
document.getElementById("mode").onchange = (e) => {
  mode = e.target.value;
  render();
};

/* INSERT */
function insert() {
  let v1 = v1Input();
  let v2 = v2Input();

  if (!v1) return alert("Enter value");

  if (mode === "array") {
    array.push(v1);
    save();
  }

  if (mode === "stack") stack.push(v1);
  if (mode === "queue") queue.push(v1);

  if (mode === "graph") {
    if (!v2) return alert("Enter second value");
    addEdge(v1, v2);
  }

  render();
}

/* REMOVE */
function remove() {
  if (mode === "array") array.pop();
  if (mode === "stack") stack.pop();
  if (mode === "queue") queue.shift();

  save();
  render();
}

/* GRAPH */
function addEdge(a, b) {
  if (!graph[a]) graph[a] = [];
  if (!graph[b]) graph[b] = [];

  graph[a].push(b);
  graph[b].push(a);
}

/* ALGORITHMS */
function runAlgo() {
  if (mode === "graph") bfs();
}

/* BFS */
function bfs() {
  let visited = {};
  let queue = [];
  let start = Object.keys(graph)[0];

  queue.push(start);
  visited[start] = true;

  let log = [];

  while (queue.length) {
    let node = queue.shift();
    log.push(node);

    graph[node].forEach(n => {
      if (!visited[n]) {
        visited[n] = true;
        queue.push(n);
      }
    });
  }

  document.getElementById("log").innerText = "BFS: " + log.join(" → ");
}

/* RENDER */
function render() {
  let canvas = document.getElementById("canvas");
  canvas.innerHTML = "";

  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  canvas.appendChild(svg);

  if (mode === "array") {
    array.forEach((v, i) => drawNode(canvas, 50 + i * 60, 150, v));
  }

  if (mode === "stack") {
    stack.forEach((v, i) => drawNode(canvas, 200, 300 - i * 60, v));
  }

  if (mode === "queue") {
    queue.forEach((v, i) => drawNode(canvas, 50 + i * 60, 150, v));
  }

  if (mode === "graph") drawGraph(svg, canvas);
}

/* GRAPH DRAW */
function drawGraph(svg, container) {
  let keys = Object.keys(graph);
  let step = (2 * Math.PI) / keys.length;

  let pos = {};

  keys.forEach((k, i) => {
    pos[k] = {
      x: 300 + 150 * Math.cos(i * step),
      y: 200 + 150 * Math.sin(i * step)
    };
  });

  for (let a in graph) {
    graph[a].forEach(b => {
      drawLine(svg, pos[a].x, pos[a].y, pos[b].x, pos[b].y);
    });
  }

  keys.forEach(k => {
    drawNode(container, pos[k].x, pos[k].y, k);
  });
}

/* DRAW NODE */
function drawNode(container, x, y, text) {
  let d = document.createElement("div");
  d.className = "node";
  d.style.left = x + "px";
  d.style.top = y + "px";
  d.innerText = text;
  container.appendChild(d);
}

/* LINE */
function drawLine(svg, x1, y1, x2, y2) {
  let l = document.createElementNS("http://www.w3.org/2000/svg", "line");
  l.setAttribute("x1", x1 + 20);
  l.setAttribute("y1", y1 + 20);
  l.setAttribute("x2", x2 + 20);
  l.setAttribute("y2", y2 + 20);
  l.setAttribute("stroke", "white");
  svg.appendChild(l);
}

/* HELPERS */
function v1Input() {
  return document.getElementById("v1").value;
}

function v2Input() {
  return document.getElementById("v2").value;
}

function save() {
  localStorage.setItem("array", JSON.stringify(array));
}