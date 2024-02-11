class Hub extends HTMLElement{
  constructor(){
    super();

    const template = document.getElementById('hub');
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  
}

