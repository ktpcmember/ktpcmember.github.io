

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
