let buttons = document.querySelectorAll(".menu")
let selected = "table"
let componentContainer = document.querySelector("#component-container")

// menu click event
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector("#html5 code").innerHTML = ""
    selected = btn.getAttribute("data-name")
    switch (selected) {
      case "table":
        componentContainer.innerHTML = "<wcag-table></wcag-table>"
        break
      case "image":
        componentContainer.innerHTML = "<wcag-image></wcag-image>"
        break
    }
  })
})

// copy to clip board
document.querySelector("#copy").addEventListener("click", (e) => {
  e.preventDefault()

  let txtarea = document.createElement("textarea")
  document.body.appendChild(txtarea)
  txtarea.innerHTML = document.querySelector("#html5 code").innerHTML
  txtarea.select()
  document.execCommand("copy")
  document.body.removeChild(txtarea)

  alert("HTML Copied to Clipboard")
})
