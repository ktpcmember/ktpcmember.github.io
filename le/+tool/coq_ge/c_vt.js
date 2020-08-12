
function push(){
 var i_pt=document.getElementById("i_pt").value;
 var ottt="",sx,sxtn=new Array(4096),nrofsxtn=0,r_qt,i,j,k,c,l;
 var wd=new Array(),pr=new Array(),cr=new Array(),ky=new Array();
 var p_vsty="",ctty="",cttn="";
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
   case "\r":
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
 }while(i<=sx.length);
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
    switch(sxtn[i+1]){
     case "EOF":
      sxtn[i+1]="";
      break;
     case "NL":
      sxtn[i+1]="\n";
      break;
     case "TAB":
      sxtn[i+1]="\t";
      break;
     case "SP":
      sxtn[i+1]=" ";
      break;
    }
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
  l=1;
  for(j=Math.min(4,i_pt.length-i);0<=j;j--){
   c=i_pt.substring(i,i+j);
   for(k=0;cr.length>k;k++){
    if(cr[k].na==c){
     l=Math.max(1,j);
     break;
    }
   }
   if(cr.length!=k) break;
  }
  alert(c);
  if(j==-1){
   ctty="?";
  }else{
   ctty=cr[k].wd;
  }
  for(j=0;pr.length>j;j++){
   if((pr[j].lt==p_vsty)&&(pr[j].rt==ctty)){
    if(pr[j].sp){
     j=pr.length;
    }
    ctty=p_vsty;
    break;
   }
  }
  if((cttn!="")&&((pr.length==j)||(i_pt.charAt(i)==""))){
   for(j=0;ky.length>j;j++){
    if((ky[j].p_vswd==ctty)&&(ky[j].na==cttn)){
     ctty=ky[j].ntwd;
     break;
    }
   }
   for(j=0;wd.length>j;j++){
    if(wd[j].na==ctty){
     ctty=wd[j].cs;
     break;
    }
   }
   if((wd.length==j)||(ctty=="*")){
    ottt+=cttn;
   }else{
    ottt+="<span class=\""+ctty+"\">"+cttn+"</span>";
   }
   cttn="";
   ctty="";
  }
  cttn+=c;
  p_vsty=ctty;
  i+=l;
  alert("##"+i);
 }while(i_pt.length>=i);
 alert(ottt);
 navigator.clipboard.writeText(ottt.replace(/</g,"&lt;").replace(/>/g,"&gt;"));
 return;
}
