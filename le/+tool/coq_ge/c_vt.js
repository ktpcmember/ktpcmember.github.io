﻿
function push(os){
 var i_pt=document.getElementById("i_pt").value;
 var la=document.getElementById("la").value;
 var nrofsp=document.getElementById("nrofsp").value;
 var ottt="",sx,sxtn=new Array(4096),nrofsxtn=0,r_qt,i,j,k,c,l,f,spt_r_pt="";
 var wd=new Array(),pr=new Array(),cr=new Array(),ky=new Array();
 var p_vsty="",ctty="",cttn="";
 var sk=new Array();
 var ostt;
 sk.push({tg:"",sg:"",tt:false});
 r_qt=new XMLHttpRequest();
 r_qt.open("GET","https://www.ktpc.tokyo/le/+tool/coq_ge/"+la+".txt",false);
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
     p_vswd:sxtn[i+1],
     na:sxtn[i+2],
     ntwd:sxtn[i+3]
    });
    i+=4;
    break;
   default:
    i++;
  }
 }
 if(i_pt.charCodeAt(0)==0xFEFF){
  i=1;
 }else{
  i=0;
 }
 do{
  l=1;
  for(j=Math.min(4,i_pt.length-i);0<j;j--){
   c=i_pt.substring(i,i+j);
   for(k=0;cr.length>k;k++){
    if(cr[k].na==c){
     l=j;
     break;
    }
   }
   if(cr.length!=k) break;
  }
  if(j==0){
   ctty="?";
   c=i_pt.charAt(i);
   if(c==""){
    for(j=0;cr.length>j;j++){
     if(cr[j].na==c) break;
    }
    if(cr.length==j){
     ctty="";
    }else{
     ctty=cr[j].wd;
    }
   }
  }else{
   ctty=cr[k].wd;
  }
  f=false;
  for(j=0;pr.length>j;j++){
   if((pr[j].lt==p_vsty)&&(pr[j].rt==ctty)){
    if(pr[j].sp){
     f=true;
    }
    ctty=p_vsty;
    break;
   }
  }
  if(f){
   cttn+=c;
   ctty=gtky(ky,ctty,cttn);
   gttt(wd,ctty,cttn,sk);
   cttn="";
   ctty="";
  }else if((pr.length==j)&&(cttn!="")){
   p_vsty=gtky(ky,p_vsty,cttn);
   if(gttt(wd,p_vsty,cttn,sk)&&(c=="\n")){
    cttn="\\\n";
   }else{
    cttn=c;
   }
  }else{
   cttn+=c;
  }
  p_vsty=ctty;
  i+=l;
 }while(i_pt.length>=i);
 if(sk[sk.length-1].tt){
  t=sk.pop();
  sk[sk.length-1].sg+='<span class="'+t.tg+'">'+t.sg+'</span>';
 }
 ottt+=sk[0].sg;
 if(nrofsp>0){
  for(nrofsp;nrofsp>0;nrofsp--){
   spt_r_pt+=" ";
  }
  ottt=ottt.replace(/\t/g,spt_r_pt);
 }
 if(os==0){
  ottt='<span class="cb62">'+ottt+'</span>';
  ostt="multi-line";
 }else{
  ostt="single-line";
 }
 document.getElementById("o_pt").value=ottt;
 navigator.permissions.query({
  name:"clipboard-write"
 });
 navigator.clipboard.writeText(ottt).then(
  function(){
   alert("Copied for "+ostt);
  },
  function(){
   alert("Failed to copy...");
  }
 );
 return;
}

function gtky(ky,ty,tn){
 var i,m;
 for(i=0;ky.length>i;i++){
  if((ky[i].p_vswd==ty)&&(ky[i].na==tn)){
   m=ky[i].ntwd;
   break;
  }
 }
 if(ky.length==i){
  m=ty;
 }
 return m;
}

function gttt(wd,ty,tt,sk){
 var i,a,m="",t,f=false;
 for(i=0;wd.length>i;i++){
  if(wd[i].na==ty){
   a=wd[i].cs;
   break;
  }
 }
 tt=tt.split("&").join("&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\\n/g,'<span style="display:none">\n</span>');
 if((a=="PGS")||(a=="PGE")){
  if(sk[sk.length-1].tt){
   t=sk.pop();
   sk[sk.length-1].sg+='<span class="'+t.tg+'">'+t.sg+'</span>';
  }
  if(a=="PGS"){
   sk.push({tg:tt.slice(2),sg:"",tt:false});
  }else{
   t=sk.pop();
   if(t.sg!=""){
    m='<span class="pagh '+t.tg+'"><span class="paghco">'+t.sg+'</span>';
    if(tt.length>2){
     m+='<span class="paghna"><span class="paghti"><span style="display:none;">{{</span>'+tt.slice(2)+'<span style="display:none;">}}</span></span></span>';
    }else{
     m+='<span style="display:none;">{{}}</span>';
    }
    m+='</span>';
    f=true;
   }
  }
 }else{
  if(!sk[sk.length-1].tt){
   sk.push({tg:"paghco",sg:"",tt:true});
  }
  if((wd.length==i)||(a=="*")){
   m=tt;
  }else{
   m='<span class="'+a+'">'+tt+'</span>';
  }
 }
 sk[sk.length-1].sg+=m;
 return f;
}
