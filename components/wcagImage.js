const imageTemplate = document.createElement("template")
imageTemplate.innerHTML = `
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />

<div class="container">
<h2>Image</h2>
<form data-name="table">
  <div class="form-group">
    <label for="source">Source</label>
    <input id="source" class="form-control" placeholder="Image Source"/>
  </div>

  <div class="form-group">
    <label for="alt" class="mt-3">Alternative Text</label>
    <input id="alt" class="form-control" type="text" placeholder="Alternative Text"/>
  </div>

  <div class="form-group">
    <label for="longDesc" class="mt-3">Does it need long description?</label>
    <input id="longDesc" type="checkbox" />
  </div>

  <div id="desc-field">
    <div class="form-group">
      <label for="desc-link">Link to long desription</label>
      <input type="text" id="longDescLink" class="form-control mb-3" placeholder="Description link" />
      <label for="linkText">Link Text</label>
      <input type="text" id="linkText" class="form-control mb-3" placeholder="Link Text" />
      <span>OR</span><br>
      <label for="desc-text" class="mt-3">Long Description</label>
      <textarea class="form-control" id="desc-text" rows="7" placeholder="Long description here..."></textarea>
    </div>
  </div>
  <button class="btn btn-primary mt-3" id="generate">Generate Image HTML</button>
</form>
</div>
`

class WcagImage extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(imageTemplate.content.cloneNode(true))
  }

  getImageFormData() {
    let form = this.shadowRoot
    return {
      imgSrc: form.querySelector("#source").value,
      imgAlt: form.querySelector("#alt").value,
      haveLongDesc: form.querySelector("#longDesc").checked,
      longDescLink: form.querySelector("#longDescLink").value,
      longDescText: form.querySelector("#desc-text").value,
      linkText: form.querySelector("#linkText").value
    }
  }

  writeImageHtml(data) {
    let image;

    // Image have long description
    if(data.haveLongDesc && data.longDescLink){
      image = `
      ${openTag('p')}
        ${openTag('img', {src: data.imgSrc, alt: data.imgAlt}, true)}
        ${openTag('a', {href: data.longDescLink})}${data.linkText}${closeTag('a')}
      ${closeTag('p')}`
    }
    else{
      image = openTag('img', {src: data.imgSrc, alt: data.imgAlt}, true)
    }

    return image
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#desc-field").style.display = "none"

    this.shadowRoot.querySelector("#longDesc").addEventListener("click", (e) => {
      let longDescField = this.shadowRoot.querySelector("#desc-field")
      if (e.target.checked) {
        longDescField.style.display = "block"
      } else {
        longDescField.style.display = "none"
      }
    })

    this.shadowRoot.querySelector("#longDescLink").addEventListener('keyup', (e) => {
      console.log(e.target.value)

      this.shadowRoot.querySelector("#desc-text").readOnly = e.target.value != ""

    })

    this.shadowRoot.querySelector("#generate").addEventListener('click', (e) => {
      e.preventDefault()

      let data = this.getImageFormData()
      let image = this.writeImageHtml(data)

      document.querySelector("code").innerHTML = image
    })

  }

  disconnectedCallback() {
  }
}

window.customElements.define("wcag-image", WcagImage)
