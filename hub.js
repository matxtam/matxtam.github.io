class Hub extends HTMLElement{
  constructor(){
    super();

  }
  connectedCallback() {
    // create shadow DOM
    const template = document.getElementById('hub-template');
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // link stylesheet
    const styleLink = document.createElement("link");
    styleLink.setAttribute("rel", "stylesheet");
    styleLink.setAttribute("href", "hubStyle.css");
    shadowRoot.appendChild(styleLink);

    const btn = shadowRoot.querySelector(".hub-btn");
    btn.addEventListener("click", () => console.log("clicked"));

    this.setPosition();
  }
  setPosition() {
    const center = {x: window.innerWidth/2, y: window.innerHeight/2}
    const x = parseInt(this.dataset.x);
    const y = parseInt(this.dataset.y);
    this.style.setProperty("position", "absolute");
    this.style.setProperty("left", `${center.x + x}px`);
    this.style.setProperty("top", `${center.y + y}px`);
  }
  
}

