const accordionTemplate = document.createElement("template")
accordionTemplate.innerHTML = `
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
<style>
.accordion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 4px;
}
.accordion-item p {
  padding: 0;
  margin: 0;
  margin-left: 4px;
}
.accordion-item .item-content {
  height: 40px;
  overflow: hidden;
}
</style>

<div class="container">
  <a href="https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html" title="Web Accessibility Tutorial by W3C">Referenced W3C Web Accessibility Tutorial</a>
  <h2>Accordion</h2>
  <form data-name="accordion">
    <div class="form-group">
      <label for="itemTitle">Item Title</label>
      <input id="itemTitle" type="text" class="form-control" placeholder="Item Title" />
    </div>
  
    <div class="form-group">
      <label for="itemContent" class="mt-3">Item Content</label>
      <textarea id="itemContent" class="form-control" type="text" rows="7"></textarea>
    </div>
  
    <button class="btn btn-success mt-3" id="addItem">Add Item</button>
    <button class="btn btn-primary mt-3" id="generate">Generate Accordion HTML</button>
  </form>

  <hr />
    
  <div id="accordionItemPreview" class="mt-3"></div>

</div>
`

class WcagAccordion extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(accordionTemplate.content.cloneNode(true))
  }

  accordionItems = []

  // push item into accordionItems array
  addAccordionItem() {
    let itemTitle = this.shadowRoot.querySelector("#itemTitle")
    let itemContent = this.shadowRoot.querySelector("#itemContent")

    if (itemTitle.value != "") {
      let item = {
        title: itemTitle.value,
        content: itemContent.value
      }

      this.accordionItems.push(item)

      itemTitle.value = ""
      itemContent.value = ""
    } else {
      alert("Please Provide Title and Content")
    }
  }

  // remove item from the accordionItems array
  removeItem(buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        let index = e.target.getAttribute("data-index")

        this.accordionItems.splice(index, 1)

        this.showAccordionItems()
      })
    })
  }

  // display items in accordionItems array in browser
  showAccordionItems() {
    let preview = this.shadowRoot.querySelector("#accordionItemPreview")
    let div = ""

    for (let i = 0; i < this.accordionItems.length; i++) {
      div =
        div +
        `<div class="accordion-item mb-2">
      <p>${this.accordionItems[i].title}</p>
      <button class="btn btn-danger" data-index="${i}">X</button>
    </div>`
    }
    preview.innerHTML = div

    this.removeItem(preview.querySelectorAll(".accordion-item button"))
  }

  writeAccordionHTML() {
    let accordionGroup = `${openTag("div", { id: "accordionGroup", class: "Accordion", "data-allow-toggle": "" })}\n`

    let html = ""

    for (let i = 0; i < this.accordionItems.length; i++) {
      html += `\t${openTag("h3")}\n\t\t${openTag("button", {
        "aria-expanded": "true",
        class: "Accordion-trigger",
        "aria-controls": `sect${i + 1}`,
        id: `accordion${i + 1}id`
      })}\n\t\t\t${openTag("span", { class: "Accordion-title" })}\n\t\t\t\t${this.accordionItems[i].title}\n\t\t\t\t${openTag("span", { class: "Accordion-icon" })}${closeTag(
        "span"
      )}\n\t\t\t${closeTag("span")}\n\t\t${closeTag("button")}\n\t${closeTag("h3")}\n`

      if (i == 0) {
        html += `\t${openTag("div", { id: `sect${i + 1}`, role: "region", "aria-labelledby": `accordion${i + 1}id`, class: "Accordion-panel" })}`
      } else {
        html += `\t${openTag("div", { id: `sect${i + 1}`, role: "region", "aria-labelledby": `accordion${i + 1}id`, class: "Accordion-panel", hidden: "" })}`
      }

      html += `\n\t\t${openTag("div")}\n\t\t\t${this.accordionItems[i].content}\n\t\t${closeTag("div")}\n\t${closeTag("div")}\n`
    }

    accordionGroup = accordionGroup + html + `${closeTag("div")}`

    return accordionGroup
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#addItem").addEventListener("click", (e) => {
      e.preventDefault()

      this.addAccordionItem()
      this.showAccordionItems()
    })

    this.shadowRoot.querySelector("#generate").addEventListener("click", (e) => {
      e.preventDefault()

      let html = this.writeAccordionHTML()

      document.querySelector("pre").innerHTML = `<code>${html}</code>`

      html = html.replace(/<span>/g, "")
      html = html.replace(/<\/span>/g, "")
      html = html.replace(/&lt;/g, "<")
      html = html.replace(/&gt;/g, ">")

      document.querySelector("#previewHTML").innerHTML = html
    })
  }
}

window.customElements.define("wcag-accordion", WcagAccordion)
