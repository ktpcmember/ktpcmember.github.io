
function push(){
 var i_pt=document.getElementById("i_pt").textContent;;
 var ottt="",da,r_qt;
 r_qt=new XMLHttpRequest();
 r_qt.open("GET","https://www.ktpc.tokyo/le/+tools/coq_ge/_cps.txt",false);
 r_qt.send(null);
 da=r_qt.responseText;
 ottt=da;
 navigator.clipboard.writeText(ottt);
 return;
}
