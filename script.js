let buttons = document.querySelectorAll(".menu")
let selected = "table"
let componentContainer = document.querySelector("#component-container")

// menu click event
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector("#html5 pre").innerHTML = ""
    selected = btn.getAttribute("data-name")
    switch (selected) {
      case "table":
        componentContainer.innerHTML = "<wcag-table></wcag-table>"
        break
      case "image":
        componentContainer.innerHTML = "<wcag-image></wcag-image>"
        break
      case "accordion":
        componentContainer.innerHTML = "<wcag-accordion></wcag-accordion>"
        break
    }

    try {
      document.querySelector("#previewHTML").innerHTML = ""
      document.querySelector("#previewCSS").removeChild(document.querySelector("#previewCSS pre"))
    } catch {}
  })
})

// copy to clip board
document.querySelector("#copy").addEventListener("click", (e) => {
  e.preventDefault()

  let txtarea = document.createElement("textarea")
  document.body.appendChild(txtarea)
  txtarea.innerHTML = document.querySelector("#html5 code").innerText
  txtarea.select()
  document.execCommand("copy")
  document.body.removeChild(txtarea)

  alert("HTML Copied to Clipboard")
})

document.querySelector("#copyCSS").addEventListener("click", (e) => {
  e.preventDefault()

  let txtarea = document.createElement("textarea")
  document.body.appendChild(txtarea)
  txtarea.innerHTML = document.querySelector("#previewCSS code").innerText
  txtarea.select()
  document.execCommand("copy")
  document.body.removeChild(txtarea)

  alert("HTML Copied to Clipboard")
})
