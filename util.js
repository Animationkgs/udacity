
var pad= function (x)   { return x.toString().padStart(2,"0"); };
var style= `
div { background-color: green; border: 10px; }
div div { background-color: pink; border: 4px; }
div div div { background-color: maroon; border: 16px; }
img { width: 500px; height: auto; }
`;

var element= function () {
	return {
   e : null, 
   create : function (eT) { this.e= document.createElement(eT); return this; },
   find : function (id) { this.e= document.getElementById(id); return this; },
   init: function (e) { this.e= e; return this; },
   setid : function (id) { this.e.id= id; return this; },
   appendTo: function (p) { p.e.appendChild(this.e); return this; },
   append: function (e) { this.e.appendChild(e.e); return this; },
   setme: function (x) { this.e.innerHTML= x; return this; }, 
   setonclick: function (f) { this.e.onclick= f; return this; }
	};
};

var html= {
   img :  function (src) { return ` <img src='${src}'> `; }, 
   richdiv :  function (id,s) { return ` <div id="${id}"> ${s} </div> `; }, 
   anonymousdiv : function (x) { return ` <div> ${x} </div> `; }, 
   iframe : function (vid) {
	return ` <iframe width="440" height="248" src="https://www.youtube.com/embed/${vid}?rel=0&amp;autoplay=1&mute=1&cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `;
   },
   richbutton : function (id, code, s) {
	return ` <button id= ${id} onclick= "(${code})()"> ${s} </button> `;
   }
};


html.table= {
   td : function (x) { return ` <td> ${x} </td> `; }, 
   tr : function (x) {
      var cells= x.split(',').map( this.td ).join( '' );
      return ` <tr> ${cells} </tr> `;
   },
   get : function (x) {
      var rows= x.split('\n').map( this.tr ).join( '' );
      return ` <table valign="top"> ${rows} </table> `;
   }
};


var dom= {
   make : function (eT) { return element().create(eT); },
   find : function (id) { return element().find(id); },
   init : function (e)  { return element().init(e); },
   body : element().init( document.body ),
   head : element().init( document.head ),
   div  : function () {  return element().create('div'); },
   richdiv : function (id,s) { return this.div().setid(id).setme(s); },
   button  : function () { return element().create('button'); },
   richbutton  : function (id,f,x)  {
	return this.button().setid(id).setonclick(f).setme(x);
   },
   style  : function (x) { return element().create('style').setme(x); }, 
   img  : function () { return element().create('img'); }, 
   title  : function (x) { return element().create('title').setme(x); }
};


dom.body.append( dom.richdiv('d1','hi') );
var box= function (id,s) {
	return {
   onclick1 : function () { dom.find(id).setme(id); },
   onclick2 : function () { dom.find(id).setme(s); },
   b1id : id+'Clearme',
   b2id : id+'Fillme',
   b1 : function () { return dom.richbutton (this.b1id, this.onclick1, 'Clear me'); },
   b2 : function () { return dom.richbutton (this.b2id, this.onclick2, 'Fill me'); },
   div : function () { return dom.richdiv (id,s); },
   appendTo : function (p) { p.append(this.div()); p.append(this.b1()); p.append(this.b2()); }
	};
};


var util= {
   zipme : function (a,b) { return a.map( function(e, i) { return [e, b[i]]; } ); },
   parse : function (s)   { return s.split(/\s+/); }, 
   pretty: function (x)   { return x.split( '\n' ).join( '<br>' ); }, 
   fill  : function (id, x) { document.getElementById(id).innerHTML= this.pretty(x); },
   setme : function (id, x) { document.getElementById(id).innerHTML= x; }
};


var lesson;

(function() {
   var i;
   lesson = function () {
      if (i) return i;
      i = this;
      i.setme= function (x,n) { x.lesson= 3; x.number= n; };
      i.p= dom.find('initfields'); 
      i.add2= function(id, s) {  box (id,s).appendTo(i.p); };
      i.add= function (id, s) { dom.richdiv(id,s).appendTo(i.p); };
      i.embed= function (x,n) { i.add2('embed'+pad(n),html.iframe(x)); };
      i.subs= function (x,n) { i.add2('subs'+pad(n),x); };
      i.subsmeaning= function (x,n) { i.add2('subsmeaning'+pad(n),x); };
      return i;
   }();
}());
alert(lesson.p.e.id);
dom.body.append( dom.richdiv('d1','hi') );
box ('test', '1').appendTo (dom.body);


var setup= new Object();
setup.fields= function (x) {
	lesson.p= dom.find('fields');
   lesson.add ( "navigate", [x.prev, x.next] );
   lesson.add ( "CourseTitle", x.title );
   lesson.add ( "Wiki", x.wiki );
   lesson.add ( "URL", x.url );
   lesson.add ( "Concept", x.concept );
   lesson.add ( "VideoIds", x.vids );
   util.parse(x.vids).map( lesson.embed );
   x.subs.map( lesson.subs );
   x.subsmeaning.map( lesson.subsmeaning );
   if ( 'quiz' in x && x.quiz!=null ) {
     var q= x.quiz;
     lesson.add2 ( "QuizImage", html.img(q.image) );
     lesson.add ( "QuizOCR", q.ocr );
     lesson.add ( "quizSolution", q.solution );
     lesson.add ( "quizSolutionFeedback", q.solutionfeedback );
   }

};

setup.page= function (x) {
   var p= dom.head;
   p.append(dom.style(style));
   var t= pad(x.lesson);
   x.name= `${t}${pad(x.number)}`;
   p.append(dom.title(x.name));
  var prev= t+ pad(x.number-1);
  var next= t+ pad(x.number+1);
  x.prev= `<a href= "${prev}.html"> prev </a>`;
  x.next= `<a href= "${next}.html"> next </a>`;
  //x.subs= zipme( x.subs, x.subsmeaning ).map(objectSubtitle);
  setup.fields(x);
};


