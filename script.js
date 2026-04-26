let current = "array";

let array = [];
let stack = [];
let queue = [];

// TREE
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
let root = null;

// GRAPH
let graph = {};

// SWITCH TAB
function show(type) {
  current = type;
  display();
}

// INSERT
function insert() {
  let val = document.getElementById("value").value;
  let val2 = document.getElementById("value2").value;

  if (val === "") return alert("Enter value");

  if (current === "array") array.push(val);

  else if (current === "stack") stack.push(val);

  else if (current === "queue") queue.push(val);

  else if (current === "tree") {
    root = insertTree(root, val);
  }

  else if (current === "graph") {
    if (!val2) return alert("Enter second node");
    addEdge(val, val2);
  }

  display();
}

// REMOVE
function remove() {
  if (current === "array") array.pop();

  else if (current === "stack") stack.pop();

  else if (current === "queue") queue.shift();

  display();
}

// TREE INSERT (BST)
function insertTree(node, val) {
  if (!node) return new Node(val);

  if (val < node.val)
    node.left = insertTree(node.left, val);
  else
    node.right = insertTree(node.right, val);

  return node;
}

// GRAPH
function addEdge(a, b) {
  if (!graph[a]) graph[a] = [];
  if (!graph[b]) graph[b] = [];

  graph[a].push(b);
  graph[b].push(a);
}

// DISPLAY
function display() {
  let output = document.getElementById("output");
  output.innerHTML = "";

  if (current === "array") draw(array);
  if (current === "stack") draw(stack);
  if (current === "queue") draw(queue);
  if (current === "tree") drawTree(root, output);
  if (current === "graph") drawGraph(output);
}

// DRAW ARRAY/STACK/QUEUE
function draw(data) {
  let output = document.getElementById("output");

  data.forEach(x => {
    let div = document.createElement("div");
    div.className = "box";
    div.innerText = x;
    output.appendChild(div);
  });
}

// DRAW TREE
function drawTree(node, container) {
  if (!node) return;

  let div = document.createElement("div");
  div.className = "tree-node";
  div.innerText = node.val;

  container.appendChild(div);

  if (node.left) drawTree(node.left, container);
  if (node.right) drawTree(node.right, container);
}

// DRAW GRAPH
function drawGraph(container) {
  for (let key in graph) {
    let div = document.createElement("div");
    div.className = "node";
    div.innerText = key;

    container.appendChild(div);
  }
}