/**
 * main: collecting everything up.
 * using hub, net.
 */

// import net from "./src/net.js";
// import Hub from "./src/hub.js";

// build background: the net
let net = new Net(document.getElementById('bg-net'));
customElements.define('gso-sat', Hub); //hub: define custom element

// build endpoints of key elements: gsoSats and overview btn
const gsoSats = document.querySelectorAll("gso-sat");
const overview = document.getElementById("overview");

// overview: things to do on click
// "detail", "listed" -> "overview"
overview.addEventListener("click", () => {
	const mains = document.getElementsByTagName("main");
	console.log(mains);
	mains[0].classList.add("transOut");
	setTimeout(() => {
		mains[0].classList.remove("transOut"); //stop fadeout animation
		mains[0].classList.add("transIn");
		overview.setAttribute("hidden", ""); // hide "overview" button
		const existedStone = document.getElementById("stone"); // remove stone
		if(existedStone) existedStone.remove();
		gsoSats.forEach(sat => { // place sats
			const deg = parseInt(sat.dataset.deg)
			const x = gso_x(deg);
			const y = gso_y(deg);
			sat.style.setProperty("left", `${x}px`);
			sat.style.setProperty("top", `${y}px`)
			sat.setAttribute("state", "overview")
		});
	}, 800);
})

// gsoSats
gsoSats.forEach((sat, idx) => {
  const deg = parseInt(sat.dataset.deg)

	// Initialization: build net
  if(deg === 612) net.appendPlanet();
  else net.appendGss(deg);

  // Initialization: set position
  const x = gso_x(deg);
  const y = gso_y(deg);
  sat.style.setProperty("left", `${x}px`);
  sat.style.setProperty("top", `${y}px`)

	// Initialization: state
  sat.setAttribute("state", "overview");

	// Initialization: the "stone" (a fake element for listed sats)
  const stone = document.createElement("div");
  stone.setAttribute("id", "stone")

  // things to do on click
  sat.addEventListener("click-sat", () => {
    const oldState = sat.getAttribute("state");

		// "overview" -> "detail"
    if(oldState === "overview"){
			const mains = document.getElementsByTagName("main");
			mains[0].classList.remove("transIn");
			mains[0].classList.add("transOut");
			setTimeout(() => {
				mains[0].classList.remove("transOut");
				// renew all sat's states and position
				gsoSats.forEach((tas, xdi) => {
					if(idx === xdi){
						tas.setAttribute("state", "detail");
						tas.insertAdjacentElement("afterend", stone);
					}
					else {
						tas.setAttribute("state", "listed");
					}
				})
      	overview.removeAttribute("hidden");
			}, 800);
    }

		// "listed" -> "detail"
    if(oldState === "listed"){
			// remove stone
      const existedStone = document.getElementById("stone");
      if(existedStone) existedStone.remove();
			// renew all sat's states and position
      gsoSats.forEach((tas, xdi) => {
        if(idx === xdi){
          tas.setAttribute("state", "detail");
          tas.insertAdjacentElement("afterend", stone);
        }
        else {
          tas.setAttribute("state", "listed");
        }
      })
    }

  })
})

// language toggle
let currentLang = "en";  // Default language
document.querySelectorAll("[data-en]").forEach(element => {
	element.innerText = element.getAttribute("data-" + currentLang);
});
document.getElementById("toggleLang").addEventListener("click", function() {
	currentLang = currentLang === "en" ? "zh" : "en"; // Toggle language
	document.querySelectorAll("[data-en]").forEach(element => {
		element.innerText = element.getAttribute("data-" + currentLang);
	});

	this.classList.toggle("en");
	this.classList.toggle("zh");
});
