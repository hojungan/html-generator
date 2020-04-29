const tableTemplate = document.createElement("template")
tableTemplate.innerHTML = `
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />

<div class="container">
<a href="https://www.w3.org/WAI/tutorials/tables/one-header/#table-with-header-cells-in-the-top-row-only" title="Web Accessibility Tutorial by W3C">Referenced W3C Web Accessibility Tutorial</a>
<h2>Table</h2>
<form data-name="table">
  <div class="form-group">
    <label for="caption">Enter Table Caption</label>
    <input id="caption" class="form-control" placeholder="Table Caption"/>
  </div>

  <div class="form-group">
    <label for="rows" class="mt-3">Number of Rows</label>
    <input id="rows" class="form-control" type="number" min=0 placeholder="Number of Rows"/>
  </div>

  <div class="form-group">
    <label for="cols" class="mt-3">Number of Columns</label>
    <input id="cols" class="form-control" type="number" min=0 placeholder="Number of Columns"/>
  </div>

  <fieldset class="form-group">
  <legend>Where is header?</legend>
  <div class="radio-group">
    <div class="radio-control">
      <label for="header-row">First Row</label>
      <input id="header-row" type="radio" name="header" value="0" checked  />
    </div>
    <div class="radio-control">
      <label for="header-col">First Column</label>
      <input id="header-col" type="radio" name="header" value="1"  />
    </div>
  </div>
  </fieldset>
  <button class="btn btn-primary mt-3" id="generate">Generate Table HTML</button>
</form>
</div>
`

class WcagTable extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(tableTemplate.content.cloneNode(true))
  }

  getTableFormData() {
    let form = this.shadowRoot
    return {
      tableCaption: form.querySelector("#caption").value,
      rows: form.querySelector("#rows").value,
      cols: form.querySelector("#cols").value,
      header: form.querySelector("#header-row").checked ? "row" : "col"
    }
  }

  writeTableHTML() {
    let data = this.getTableFormData()
    let rows = data.rows,
      cols = data.cols,
      header = data.header
    let caption = data.tableCaption

    let body = ""

    for (let i = 0; i < rows; i++) {
      if (i == 0) {
        body += `\t${openTag("tr")}`
      } else {
        body += `\n\t${openTag("tr")}`
      }

      for (let j = 0; j < cols; j++) {
        // header is first row
        if (header == "row" && i == 0) {
          body += `\n\t\t${openTag("th")}Header Cell ${j + 1}${closeTag("th")}`
        } else if (header == "col" && j == 0) {
          body += `\n\t\t${openTag("th")}Header Cell ${i + 1}${closeTag("th")}`
        } else {
          body += `\n\t\t${openTag("td")}Cell ${j + 1}${closeTag("td")}`
        }
      }
      body += `\n\t${closeTag("tr")}`
    }

    let table = `${openTag("table", { class: "wcag-table" })}\n\t${openTag("caption")}${caption}${closeTag("caption")}\n${body}\n${closeTag("table")}`

    return table
  }

  writeTableCSS() {
    return `
    .wcag-table {
      border-collapse: collapse;
      border: 1px solid #333;
    } 
    
    .wcag-table th,
    .wcag-table td {
      border: 1px solid #333;
      padding: 5px;
      text-align: center;
    }
    `
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#generate").addEventListener("click", (e) => {
      e.preventDefault()

      let data = this.getTableFormData()

      let html = this.writeTableHTML(data)

      document.querySelector("pre").innerHTML = `<code>${html}</code>`

      html = html.replace(/<span>/g, "")
      html = html.replace(/<\/span>/g, "")
      html = html.replace(/&lt;/g, "<")
      html = html.replace(/&gt;/g, ">")

      document.querySelector("#previewHTML").innerHTML = html
      let pre = document.createElement("pre")
      let code = document.createElement("code")
      code.innerHTML = this.writeTableCSS()
      pre.appendChild(code)
      document.querySelector("#previewCSS").appendChild(pre)
    })
  }
}

window.customElements.define("wcag-table", WcagTable)
