/**
 * Net: a class for building the background net animation
 * els: nodes(nodes + gsss) and lines drawn on a canvas
 * purp: CONNECTING THE DOTS (yeah!)
 * tech: <canvas/>
 * using phy.js
 */

class Net {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.nodes = this.randomNodes();
    this.gssNodes = [];
    this.drawCanvas();
  };

  config = {
    nodeNum: 10,
    nodeColor: "#FFFFFF",
    lineColor: "khaki",
  }

  randomNodes() {
    return new Array(this.config.nodeNum).fill(0).map(_ => {
      const r = (Math.random()*(1 - r_void) + r_void) * r_max;
      const rad = Math.random() * Math.PI * 2;
      const newNode = new sat(r, rad);
      return newNode;
    })
  }

  drawCanvas() {
    const nodes = this.nodes;
    const gsss = this.gssNodes;
    const canvas = this.canvas;
    const ctx = this.ctx;

    // canvas reset, brush setup
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillStyle = this.config.nodeColor;
    ctx.strokeStyle = this.config.lineColor;

    // go through each node
    nodes.forEach((node, idx) => {

      // the node itself
      ctx.fillRect(node.x, node.y, 1, 1);
      
      //lines between nodes
      nodes.forEach((edon, xdi) => {
        if(idx > xdi){
          // line width limits
          const lineW = 5000 / node.sqrDist(edon);
          if(lineW > 0.1){
            if(lineW > 1.5) ctx.lineWidth = 1.5;
            else ctx.lineWidth = lineW;

            // draw the line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(edon.x, edon.y);
            ctx.stroke();
          }
        }
      })

      // lines between nodes and gsss
      gsss.forEach(gss => {

        // line width limits
        const lineW = 5000 / node.sqrDist(gss);
        if(lineW > 0.1){
          if(lineW > 1.5) ctx.lineWidth = 1.5;
          else ctx.lineWidth = lineW;

          // draw the line
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(gss.x, gss.y);
          ctx.stroke();
        }
      })

      // move a little bit
      node.move();
    })

    // past some time and draw again
    window.requestAnimationFrame(() => this.drawCanvas.call(this));
  }

  // append* funcs: adding nodes that already existed in the document
  appendGss(deg) {
    const newNode = new gsoSat(deg);
    this.gssNodes.push(newNode);
  }
  appendPlanet() {
    const newNode = {x: center.x, y:center.y};
    this.gssNodes.push(newNode);
  }
}

// export default Net;