// import net from "./src/net.js";
// import Hub from "./src/hub.js";

var cv = new net(document.getElementById('bg-net'));
customElements.define('gso-sat', Hub); //hub: define custom element
const gsoSats = document.querySelectorAll("gso-sat");
gsoSats.forEach(sat => {
  const deg = parseInt(sat.dataset.deg)
  if(deg === 612) cv.appendPlanet();
  else cv.appendGss(deg);
})