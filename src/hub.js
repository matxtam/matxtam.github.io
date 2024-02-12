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
    styleLink.setAttribute("href", "styles/hubStyle.css");
    shadowRoot.appendChild(styleLink);

    const btn = shadowRoot.querySelector(".hub-btn");
    btn.addEventListener("click", () => console.log("clicked"));

    this.setPosition();
  }
  setPosition() {
    const deg = parseInt(this.dataset.deg);
    const x = gso_x(deg);
    const y = gso_y(deg);
    this.style.setProperty("position", "absolute");
    this.style.setProperty("left", `${x}px`);
    this.style.setProperty("top", `${y}px`);
  }
  
}

// export default class Hub;