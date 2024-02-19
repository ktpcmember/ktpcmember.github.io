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
  
  function copyScript(element){
    var menuElement = element.parentElement;
    var titleElement = menuElement.firstChild;
    navigator.clipboard.writeText(excludeComment(menuElement.parentElement.lastChild)).then(function (){
      element.classList.add("cCodeMenuInvisible");
      element.nextElementSibling.classList.remove("cCodeMenuInvisible");
      titleElement.classList.add("cCodeMenuEffectCopy");
      titleElement.addEventListener("animationend", () => {
        titleElement.classList.remove("cCodeMenuEffectCopy");
        element.classList.remove("cCodeMenuInvisible");
        element.nextElementSibling.classList.add("cCodeMenuInvisible");
      });
    });
    return;
  }
  
  function excludeComment(node){
    var s = "";
    if(node.nodeName == "#text"){
      s = node.data;;
    }else{
      var f = false;
      if(node.childNodes){
        for(var i = 0; i < node.childNodes.length; i++){
          var child = node.childNodes[i];
          if(!child.classList || !child.classList.contains("qComMetaComment")){
            if(child.classList && child.classList.contains("qLine")){
              if(f){
                s += "\n";
              }else{
                f = true;
              }
            }
            s += excludeComment(child);
          }
        }
      }
    }
    return s;
  }
  
  function expandCode(element){
    element.parentElement.parentElement.lastChild.classList.remove("cCodeContracted");
    element.classList.add("cCodeMenuInvisible");
    element.nextElementSibling.classList.remove("cCodeMenuInvisible");
    return;
  }
  
  function contractCode(element){
    element.parentElement.parentElement.lastChild.classList.add("cCodeContracted");
    element.classList.add("cCodeMenuInvisible");
    element.previousElementSibling.classList.remove("cCodeMenuInvisible");
    return;
  }