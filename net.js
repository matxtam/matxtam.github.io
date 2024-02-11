class net {
  constructor(canvas){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.center = { x: window.innerWidth/2, y: window.innerHeight/2 }

    this.nodes = this.randomNodes();
    this.drawCanvas();
  };
  config = {
    nodeNum: 10,
    nodeColor: "#FFFFFF",
    lineColor: "#FFFFFF",
  }
  phy = {
    GM: 500,
    dt: 0.05,
  }
  randomNodes() {
    const r_max = Math.min(this.canvas.width, this.canvas.height)/2.5
    const r_void = 0.3;
    return new Array(this.config.nodeNum).fill(0).map(_ => {
      const r = (Math.random()*(1 - r_void) + r_void) * r_max;
      const theta = Math.random() * Math.PI * 2;
      const v = Math.sqrt(this.phy.GM/r);
      const dir = Math.random() > 0.5 ? 1 : (-1);
      return ({
        x: Math.round(this.center.x + r * Math.cos(theta)),
        y: Math.round(this.center.y + r * Math.sin(theta)),
        v_x: Math.round(v * Math.sin(theta) * (-dir)),
        v_y: Math.round(v * Math.cos(theta) *   dir ),
      })
    })
  }

  drawCanvas() {
    const nodes = this.nodes;
    const canvas = this.canvas;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    // ctx.fillRect(this.center.x, this.center.y, 3, 3);
    ctx.fillStyle = this.config.nodeColor;
    ctx.strokeStyle = this.config.lineColor;
    nodes.forEach((node, idx) => {
      ctx.fillRect(node.x, node.y, 1, 1);
      nodes.forEach((edon, xdi) => {
        if(idx > xdi){
          // calculate distance
          const dx = node.x - edon.x;
          const dy = node.y - edon.y;
          const lineW = 6000 / (dx * dx + dy * dy);
          if(lineW > 0.1){
            if(lineW > 2) ctx.lineWidth = 2;
            else ctx.lineWidth = lineW;

            // draw the line
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(edon.x, edon.y);
            ctx.stroke();
          }
        }
      })

      // move a little bit
      const dt = this.phy.dt;
      const dx = node.x - this.center.x;
      const dy = node.y - this.center.y;
      const da_r = this.phy.GM / Math.pow(dx * dx + dy * dy, 1.5)
      node.x = node.x + node.v_x * dt;
      node.y = node.y + node.v_y * dt;
      node.v_x = node.v_x + (this.center.x - node.x) * da_r * dt;
      node.v_y = node.v_y + (this.center.y - node.y) * da_r * dt;
      // node.x = Math.round(node.x + node.v_x);
      // node.y = Math.round(node.y + node.v_y);
    })
    window.requestAnimationFrame(() => this.drawCanvas.call(this));
  }
  
}

// new net(document.getElementById('bg-net'));