/* router.js
 , ~ router for browser url hash
 , authored by 9r3i
 , https://github.com/9r3i/router.js
 , started at october 24th 2018
 */
;function router(){
/* router version */
this.version='1.0.0';
/* array of defined routes
 * add using .push()
 * contain: [path,title,call]
 */
this.routes=[];
/* hash of path assignment
 * ~ router redirect to path as hash
 * @parameters:
 *   p = string of path as hash
 * @return: object of pop state redirected
 */
this.__proto__.go=function(p){
  p=typeof p==='string'?p:'';
  return window.location.assign('#'+p);
};
/* title management
 * @parameters:
 *   s = string of title name
 * @return: always true
 */
this.__proto__.title=function(s){
  s=typeof s==='string'?s:'';
  var t=document.getElementsByTagName('title');
  if(t&&t[0]){
    t[0].innerText=s;
  }else{
    t=document.createElement('title');
    document.head.appendChild(t);
    t.innerText=s;
  }return true;
};
/* get route
 * ~ find route using path
 * @parameters: 
 *   p = string of path
 * @return: object of route, contain: path, title and call function
 */
this.__proto__.route=function(p){
  var r=false;
  for(var i in this.routes){
    if(this.routes[i][0]===p){
      r={
        path:this.routes[i][0],
        title:this.routes[i][1],
        call:this.routes[i][2]
      };break;
    }
  }return r;
};
/* initialize
 * ~ initialize for auto-generate route
 * @paramenters: none
 * @return: mixed of executed given call function
 */
this.__proto__.init=function(){
  var hash=this.hash();
  this.error(false);
  var r=this.route(hash.path);
  /* check route is exist */
  if(!r){
    var error='Not Found';
    this.title('404 '+error);
    return this.error(error,404);
  }
  /* check call function */
  if(!r.call||typeof r.call!=='function'){
    var error='Missing Function';
    this.title('404 '+error);
    return this.error(error,400);
  }
  /* print out the title */
  if(typeof r.title==='string'){
    this.title(r.title);
  }
  /* execute call function */
  return r.call.call(r.call,hash.query);
};
/* error statement
 * ~ print out error from string given
 * @parameters:
 *   s = string of error statement
 *       - set to false to remove printed statement
 *   c = integer of response code
 * @return: print out genetated error statement into document.body
 */
this.__proto__.error=function(s,c){
  var id='router-error-statement';
  var n=document.getElementById(id);
  if(n){n.parentElement.removeChild(n);}
  if(s===false){return false;}
  s=typeof s==='string'?s:'Unknown Error';
  c=c%1===0?c:200;
  n=document.createElement('div');
  n.id=id;
  var sp=document.createElement('div');
  var sd=document.createElement('div');
  n.style.margin='0px';
  n.style.padding='30px';
  n.style.textAlign='center';
  n.style.position='fixed';
  n.style.zIndex=99999;
  n.style.top='0px';
  n.style.bottom='0px';
  n.style.left='0px';
  n.style.right='0px';
  n.style.backgroundColor='#eed';
  n.style.cursor='default';
  sp.style.textAlign='center';
  sp.style.color='#555';
  sp.style.fontSize='32px';
  sp.style.fontFamily='consolas,monospace';
  sp.innerText='Error: '+c.toString()+' '+s;
  sd.style.marginTop='30px';
  sd.style.textAlign='center';
  sd.style.color='#999';
  sd.style.fontSize='11px';
  sd.style.fontFamily='consolas,monospace';
  sd.innerText='9r3i\\router.js';
  n.appendChild(sp);
  n.appendChild(sd);
  document.body.appendChild(n);
  return true;
};
/* parse hash
 * ~ parse location hash from window.location.hash
 * @parameters: none
 * @return: object of parsed hash
 *   - return object contains:
 *     - path  = string of router path
 *     - query = object of router parsed query
 */
this.__proto__.hash=function(){
  var h=window.location.hash.substr(1);
  var d=h.split('?'),r={path:d[0],query:{}};
  if(typeof d[1]==='string'){
    r.query=this.query(d[1]);
  }return r;
};
/* parse query
 * ~ parse url query into readable object
 * @parameters:
 *   t = string of url query
 * @return: object of parsed query
 */
this.__proto__.query=function(t){
  if(typeof t!=='string'){return false;}
  var s=t.split('&');
  var r={},c={};
  for(var i in s){
    var p=s[i].split('=');
    var k=decodeURIComponent(p[0]);
    if(k.match(/\[(.*)?\]$/g)){
      var l=k.replace(/\[(.*)?\]$/g,'');
      var w=k.replace(/^.*\[(.*)?\]$/g,"$1");
      c[l]=c[l]?c[l]:0;
      if(w==''){w=c[l];c[l]+=1;}
      if(!r[l]){r[l]={};}
      r[l][w]=decodeURIComponent(p[1]);
      continue;
    }r[k]=p[1]?decodeURIComponent(p[1]):'';
  }return r;
};
/* temporary statement
 * @return: always false
 */
this.__proto__.temp=function(){
  return false;
};
};


