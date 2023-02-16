function updateResponsive() {
    let style = document.createElement("style")
    style.innerHTML += generateStyleCSS_ifw()
    style.innerHTML += generateStyleCSS_lerpw()
    style.innerHTML += generateStyleCSS_switchw()
    let head = document.head || document.getElementsByTagName('head')[0]
    head.appendChild(style)
}

updateResponsive()