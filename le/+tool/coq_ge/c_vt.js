
function push(){
 var i_pt=document.getElementById("i_pt").textContent;;
 var ottt="",sx,sxtn=new Array(4096),nrofsxtn=0,r_qt,i,j,k,c;
 var wd=new Array(),pr=new Array,cr=new Array,ky=new Array;
 var ttty=new Array(i_pt.length+1);
 r_qt=new XMLHttpRequest();
 r_qt.open("GET","https://www.ktpc.tokyo/le/+tool/coq_ge/_cps.txt",false);
 r_qt.send(null);
 sx=r_qt.responseText;
 sxtn.fill("");
 i=0;
 j=0;
 do{
  c=sx.charAt(i);
  switch(c){
   case "":
   case " ":
   case "\n":
    if(j!=nrofsxtn){
     j++;
    }
    break;
   default:
    if(j==nrofsxtn){
     nrofsxtn++;
    }
    sxtn[j]+=c;
    break;
  }
  i++;
 }while(i<sx.length);
 i=0;
 while(i<nrofsxtn){
  switch(sxtn[i]){
   case "+":
    wd.push({
     na:sxtn[i+1],
     cs:sxtn[i+2]
    });
    i+=3;
    break;
   case "&":
    pr.push({
     lt:sxtn[i+1],
     rt:sxtn[i+2],
     sp:false
    });
    i+=3;
    break;
   case "|":
    pr.push({
     lt:sxtn[i+1],
     rt:sxtn[i+2],
     sp:true
    });
    i+=3;
    break;
   case "-":
    cr.push({
     na:sxtn[i+1],
     wd:sxtn[i+2]
    });
    i+=3;
    break;
   case "!":
    ky.push({
     p_viwd:sxtn[i+1],
     na:sxtn[i+2],
     ntwd:sxtn[i+3]
    });
    i+=4;
    break;
   default:
    i++;
  }
 }
 i=0;
 do{
  switch(i_pt.charAt(i)){
   case "":
   case "\t":
   case "\n":
   case " ":
    
    break;
   default:
    for(j=4;0<j;j++){
     c=i_pt.substring(i,i+j);
     for(k=0;cr.length>k;k++){
      if(cr[k].na==c) break;
     }
     if(cr.length!=k) break;
    }
    if(j==0){
     ttty[i]="?";
    }else{
     ttty[i]=cr[k].wd;
    }
  }
  i++;
 }while(i_pt.kength>i);
 alert(ttty);
 navigator.clipboard.writeText(ottt);
 return;
}
