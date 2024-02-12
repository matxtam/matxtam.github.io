class net {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    // this.center = { x: window.innerWidth/2, y: window.innerHeight/2 }

    this.nodes = this.randomNodes();
    this.gssNodes = [];
    this.drawCanvas();
  };
  config = {
    nodeNum: 10,
    nodeColor: "#FFFFFF",
    lineColor: "khaki",

  }
  phy = {
    GM: 500,
    dt: 0.5,
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillStyle = this.config.nodeColor;
    ctx.strokeStyle = this.config.lineColor;
    nodes.forEach((node, idx) => {
      ctx.fillRect(node.x, node.y, 1, 1);
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
    window.requestAnimationFrame(() => this.drawCanvas.call(this));
  }
  appendGss(deg) {
    const newNode = new gsoSat(deg);
    this.gssNodes.push(newNode);
  }
  appendPlanet() {
    const newNode = {x: center.x, y:center.y};
    this.gssNodes.push(newNode);
  }
}

// export default net;