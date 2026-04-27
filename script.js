let ds = localStorage.getItem('ds');
document.getElementById('title').innerText = ds;

let data = [];

function render(){
  let v = document.getElementById('visual');
  v.innerHTML = '';

  // STACK
  if(ds === 'stack'){
    let c = document.createElement('div');
    c.className = 'stack';

    data.forEach(x=>{
      let d = document.createElement('div');
      d.innerText = x;
      c.appendChild(d);
    });

    v.appendChild(c);
  }

  // QUEUE
  if(ds === 'queue'){
    let c = document.createElement('div');
    c.className = 'queue';

    data.forEach(x=>{
      let d = document.createElement('div');
      d.innerText = x;
      c.appendChild(d);
    });

    v.appendChild(c);
  }

  // TREE
  if(ds === 'tree'){
    let t = document.createElement('div');
    t.className = 'tree';

    let svg = document.createElementNS(\"http://www.w3.org/2000/svg\",\"svg\");
    svg.setAttribute(\"width\",\"400\");
    svg.setAttribute(\"height\",\"300\");

    let pos = [
      {x:180,y:20},
      {x:80,y:150},
      {x:280,y:150}
    ];

    data.forEach((x,i)=>{
      let n = document.createElement('div');
      n.className = 'tree-node';
      n.style.left = pos[i].x+'px';
      n.style.top = pos[i].y+'px';
      n.innerText = x;
      t.appendChild(n);
    });

    if(data.length>1){
      drawLine(svg,pos[0],pos[1]);
    }
    if(data.length>2){
      drawLine(svg,pos[0],pos[2]);
    }

    t.appendChild(svg);
    v.appendChild(t);
  }

  // GRAPH
  if(ds === 'graph'){
    let g = document.createElement('div');
    g.className = 'graph';

    let svg = document.createElementNS(\"http://www.w3.org/2000/svg\",\"svg\");
    svg.setAttribute(\"width\",\"400\");
    svg.setAttribute(\"height\",\"300\");

    let pos = [
      {x:50,y:50},
      {x:300,y:50},
      {x:180,y:200}
    ];

    if(data.length>=2) drawLine(svg,pos[0],pos[1]);
    if(data.length>=3){
      drawLine(svg,pos[0],pos[2]);
      drawLine(svg,pos[1],pos[2]);
    }

    data.forEach((x,i)=>{
      let n = document.createElement('div');
      n.className = 'node';
      n.style.left = pos[i].x+'px';
      n.style.top = pos[i].y+'px';
      n.innerText = x;
      g.appendChild(n);
    });

    g.appendChild(svg);
    v.appendChild(g);
  }
}

function drawLine(svg,p1,p2){
  let l = document.createElementNS(\"http://www.w3.org/2000/svg\",\"line\");
  l.setAttribute(\"x1\",p1.x+20);
  l.setAttribute(\"y1\",p1.y+20);
  l.setAttribute(\"x2\",p2.x+20);
  l.setAttribute(\"y2\",p2.y+20);
  l.setAttribute(\"stroke\",\"white\");
  svg.appendChild(l);
}

function insert(){
  let val = document.getElementById('val').value;
  if(!val) return;
  data.push(val);
  render();
}

function removeItem(){
  if(ds==='queue') data.shift();
  else data.pop();
  render();
}

render();