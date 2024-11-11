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
  gsoSats.forEach(sat => {
    const deg = parseInt(sat.dataset.deg)
    const x = gso_x(deg);
    const y = gso_y(deg);
    sat.style.setProperty("left", `${x}px`);
    sat.style.setProperty("top", `${y}px`)
    sat.setAttribute("state", "overview")
  });
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
  const stone = document.createElement("div");
  stone.setAttribute("id", "stone")
  sat.addEventListener("click-sat", () => {
    const oldState = sat.getAttribute("state");
    if(oldState !== "detail"){
      const existedStone = document.getElementById("stone");
      if(existedStone) existedStone.remove();
      gsoSats.forEach((tas, xdi) => {
        if(idx === xdi){
          tas.setAttribute("state", "detail");
          tas.style.setProperty("left", "10em");
          tas.style.setProperty("top", "0");
          tas.insertAdjacentElement("afterend", stone);
        }
        else {
          tas.setAttribute("state", "listed");
          tas.style.setProperty("left", "0");
          tas.style.setProperty("top", "0");
        }
      })
    }
    if(oldState === "overview"){
      overview.removeAttribute("hidden");
    }
  })
})
