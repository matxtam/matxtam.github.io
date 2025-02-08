/**
 * phy: a math lib that calculate the whole planet and satellite sys
 * purp: building up a virtual gravitational sys
 * tech: pure math and phys
 * 
 * Terminology:
 * planet == 612 == the fake gss at the center
 * sat == satellites == nodes
 * gso == geosynchronous orbit
 * gss == gsosat == geosynchronous sat
 * gssNode == planet || gss
 */

const center = {x:window.innerWidth/2, y:window.innerHeight/2}
const GM = 500;
const dt = 0.1;
const r_gso = (center.x > center.y) ? (center.y - 50) : center.x - 50;
const r_max = Math.min(window.innerWidth, window.innerHeight)/3.5
const r_void = 0.6;

class sat {

  constructor(r, rad){
    const cc = this.p2c({r, rad});
    this.x = cc.x;
    this.y = cc.y;

    const v = Math.sqrt(GM / r);
    const dir = Math.random() > 0.5 ? 1 : (-1);
    this.v = {
      x: v * Math.sin(rad) * (-dir),
      y: v * Math.cos(rad) *   dir ,
    }
  }

  p2c({r, rad}) {
    const x = center.x + r * Math.cos(rad);
    const y = center.y + r * Math.sin(rad);
    return ({x, y});
  }
  
  sqrDist(node) {
    const dx = node.x - this.x;
    const dy = node.y - this.y;
    return (dx * dx + dy * dy);
  }

  move() {
    const dx = this.x - center.x;
    const dy = this.y - center.y;
    const da_r = GM / Math.pow(dx * dx + dy * dy, 1.5)
    this.x = this.x + this.v.x * dt;
    this.y = this.y + this.v.y * dt;
    this.v.x = this.v.x + (center.x - this.x) * da_r * dt;
    this.v.y = this.v.y + (center.y - this.y) * da_r * dt;
  }
}

class gsoSat {
  constructor(deg) {
    this.x = center.x + r_gso * Math.cos(deg * Math.PI / 180);
    this.y = center.y + r_gso * Math.sin(deg * Math.PI / 180);
  }
}

function gso_x(deg) {
  return (deg === 612) ? center.x : center.x + r_gso * Math.cos(deg * Math.PI / 180);
}

function gso_y(deg) {
  return (deg === 612) ? center.y : center.y + r_gso * Math.sin(deg * Math.PI / 180);
}
