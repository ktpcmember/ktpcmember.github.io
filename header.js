
function ck(){
 var a=document.getElementById("hnmu");
 if(a.style.display=="none"){
  a.style.display="flex";
  a.style.pointerEvents="auto";
 }else{
  a.style.display="none";
  a.style.pointerEvents="none";
 }
 return;
}

function tp(){
 window.scroll(0,0);
 return;
}

function copy(s){
 navigator.clipboard.writeText(document.getElementById(s).textContent);
 return;
}
