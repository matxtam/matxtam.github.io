/**
 * main: collecting everything up.
 * using hub, net.
 */

// import net from "./src/net.js";
// import Hub from "./src/hub.js";

let net = new Net(document.getElementById('bg-net'));
customElements.define('gso-sat', Hub); //hub: define custom element

const gsoSats = document.querySelectorAll("gso-sat");
const overview = document.getElementById("overview");

overview.addEventListener("click", () => {
  overview.setAttribute("hidden", "");
  gsoSats.forEach(sat => sat.setAttribute("state", "overview"));
})

gsoSats.forEach((sat, idx) => {
  const deg = parseInt(sat.dataset.deg)

  // append to net
  if(deg === 612) net.appendPlanet();
  else net.appendGss(deg);

  // set position
  const x = gso_x(deg);
  const y = gso_y(deg);
  sat.style.setProperty("left", `${x}px`);
  sat.style.setProperty("top", `${y}px`)

  // handle clicking
  sat.setAttribute("state", "overview");
  sat.addEventListener("click-sat", () => {
    const oldState = sat.getAttribute("state");
    if(oldState !== "detail"){
      gsoSats.forEach((tas, xdi) => {
        if(idx === xdi) tas.setAttribute("state", "detail");
        else tas.setAttribute("state", "listed");
      })
    }
    if(oldState === "overview"){
      overview.removeAttribute("hidden");
    }
  })
})