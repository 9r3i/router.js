/* sample.js */

/* 
Using HASH --> window.location.hash
descriptions:
- this router is using hash location generated by window.location.hash
- this router is also working with url query state which located after hash
  - example: - #path/to/route?id=123
             - will generate query object like: {"id":123}
- this router is using property .routes as array
  - require 3 element of array:
    - path  = string of route path
    - title = string of title name
    - call  = function of calling after routed
  - example:
    - var route=new router()
    - route.routes.push(['test','Some Title',function(){return 'something in path "test"';}])
- this router is best using events.js so that probably simpler than none
  - example:
    - WINDOW_EVENTS.onpopstate.push(function(){return route.init();});
- using html body tag, example:
  - <body onload="route.init()">
- using native window object (without events.js), example:
  - window.onpopstate=function(){return route.init();};
*/


/* samples */
var route=new router();
route.routes.push([
'testing/test',
'Hanya Judul Saja',
function(r){
    var html='<pre>Yang takkan pernah terlupakan selamanya dalam hidupku</pre>';
    if(r.test){
      html+='<pre>test: '+r.test+'</pre>';
    }
      document.body.innerHTML=html;
    try{
    }catch(e){alert('error: failed to write in document.body');}
  },
]);
WINDOW_EVENTS.onpopstate.push(function(){
  return route.init();
});
WINDOW_EVENTS.execAll();
//*/


