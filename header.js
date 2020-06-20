
function fsticky(){
 var a=document.getElementById("mubr");
 if(a.getBoundingClientRect().height>window.innerHeight){
  a.style.position="static";
 }else{
  a.style.position="sticky";
 }
 return;
}

window.onload=fsticky;
window.onresize=fsticky;

function ck(){
 var a=document.getElementById("hnmu");
 if(a.style.display=="none"){
  a.style.display="flex";
  a.style.pointerEvents="auto";
 }else{
  a.style.display="none";
  a.style.pointerEvents="none";
 }
 fsticky();
 return;
}
