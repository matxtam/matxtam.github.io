/**
 * Hub: a class for building custom element "gso-sat"
 * els: a satellite, its title and description
 * purp: change style while attr "state" changes
 * tech: Web Components
 */

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

    // redefine click event
    const clickSat = new CustomEvent("click-sat");
    const Btn = shadowRoot.querySelector("button");
    Btn.addEventListener("click", () => {
      this.dispatchEvent(clickSat);
    });
  }

  //main purp: change style with "state" attr
  static observedAttributes = ["state"];
  attributeChangedCallback(name, oldValue, newValue) {
    if(name === "state"){
      if(newValue !== "overview" && newValue !== "listed" && newValue !== "detail" ){
        console.error("state value not valid");
      }
      const btn = this.shadowRoot.querySelector("button");
      btn.setAttribute("class", newValue);
      this.querySelectorAll("*").forEach(el => el.setAttribute("class", newValue));
    }
  }
}

// export default class Hub;