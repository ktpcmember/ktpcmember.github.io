
function menu(){
 var a=document.getElementById("menuLink");
 if(a.style.display=="none"){
  a.style.display="flex";
  a.style.pointerEvents="auto";
 }else{
  a.style.display="none";
  a.style.pointerEvents="none";
 }
 return;
}

function top(){
 window.scroll(0,0);
 return;
}
