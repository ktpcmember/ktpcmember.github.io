
function ck(){
 var a=document.getElementById("hnmu");
 var b=document.getElementById("ib3_vo");
 if(a.style.display=="none"){
  a.style.display="flex";
  a.style.pointerEvents="auto";
  b.controls=false;
 }else{
  a.style.display="none";
  a.style.pointerEvents="none";
  b.controls=true;
 }
 return;
}
