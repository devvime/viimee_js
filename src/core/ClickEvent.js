import { decrypt } from "./Utils"

export const clickEvent = (component) => {  
  document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener('click', (e) => handleClick(e, component))
  })
}

const handleClick = (e, component) => {
  if (component === undefined) {
    return
  }
  if (e.target.getAttribute('_style_index') !== null) {
    const callback = decrypt(e.target.getAttribute('_style_index')).split('"')[1]
    if (component.prototype !== undefined) {
      eval(`component.prototype.${(callback)}`)
    }
  }
}