
function menu(){
  var a = document.getElementById("menuLink");
  if(a.style.display=="none"){
    a.style.display="flex";
    a.style.pointerEvents="auto";
  }else{
    a.style.display="none";
    a.style.pointerEvents="none";
  }
  return;
}

function scrollToTop(){
  window.scroll(0,0);
  return;
}

function copyScript(){
  var menuElement = this.parentElement;
  menuElement.classList.add("cCodeMenuEffectCopy");
  menuElement.addEventListener("animationend", () => {this.classList.remove("cCodeMenuEffectCopy")});
  navigator.clipboard.writeText(excludeComment(menuElement.lastChild.textContent));
  return;
}

function excludeComment(node){
  var s = "";
  switch(node.nodeName){
   case "#text":
    s = node.data;
    break;
   default:
    for(child of node.childNodes){
      if(
        (child.nodeName != "SPAN") ||
        !(child.classList.contains("qComMetaComment"))
      ){
        s += excludeComment(child);
      }
    }
    break;
  }
  return s;
}
