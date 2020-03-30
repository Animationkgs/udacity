

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

alert(1);

dom.body.append( dom.richdiv('d1','hi') );
var box= function (id,s) {
	return {
   onclick1 : function () { dom.find(id).setme(id); },
   onclick2 : function () { dom.find(id).setme(s); },
   b1id : id+'Clearme',
   b2id : id+'Fillme',
   b1 : function () { return dom.richbutton (this.b1id, this.onclick1, 'Clear me'); },
   b2 : function () { return dom.richbutton (this.b2id, this.onclick2, 'Fill me'); },
   div : function () { return dom.richdiv (id,s); }
	};
};



var util= {
   zipme : function (a,b) { return a.map( function(e, i) { return [e, b[i]]; } ); },
   pad   : function (x)   { return x.toString().padStart(2,"0"); }, 
   parse : function (s)   { return s.split(/\s+/); }, 
   pretty: function (x)   { return x.split( '\n' ).join( '<br>' ); }, 
   fill  : function (id, x) { document.getElementById(id).innerHTML= this.pretty(x); },
   setme : function (id, x) { document.getElementById(id).innerHTML= x; }
};

function lesson03(x,n) { x.lesson= 3; x.number= n; }

/*
var html= {
   me :   this,
   img :  function (src) { return ` <img src='${src}'> `; }, 
   div :  function (id,x) { return ` <div id="${id}"> ${x} </div> `; }, 
   anonymousdiv : function (x) { return ` <div> ${x} </div> `; }, 
   iframe : function (vid) {
	return ` <iframe width="440" height="248" src="https://www.youtube.com/embed/${vid}?rel=0&amp;autoplay=1&mute=1&cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `;
   },
   button : function (id, code, caption) {
	return ` <button id= ${id} onclick= "(${code})()"> ${caption} </button> `;
   }
};
*/

/*


var add= {
   div: function (id, s, p) {
      var div = document.getElementById( "initfields" );
      div.innerHTML=  div.innerHTML.concat(text.div(id,id + '= ' + s))
}
};



function elementButton(id,onclick,x) {
   var ret= document.createElement('button');
   ret.id= id; ret.onclick= onclick; ret.innerHTML= x;
   return ret;
}
text.table= {
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



box= {
   x: '1';
   onclick1 : function () { setme(id,id); }
   onclick2 : function () { setme(id,'1'); }
   button : function (id) {
	   create( 'button', 
	return ` <button id= "${id}clearme" onclick= "this.onclick1"> Clear </button> `;
   },
   div    : function (id,s) {
      return [ text.div(id,s), this.button(id) ].join(' ');
   }
};

text.fillmebutton= function (id, s) {
  var code= ` function () { document.getElementById('${id}').innerHTML= \`${s}\`; } `;
  return text.button (id+'fillme', code, 'Fillme');
};


function getBox(id,data) {
   var ret= {
      boxid : id+'box',
      divid: id,
      data: data,
      clearme: function() { document.getElementById(this.divid).innerHTML= this.divid; },
      fillme: function() { document.getElementById(this.divid).innerHTML= this.data; },
      button1: elementButton (this.divid+'clearme', this.clearme, 'Clearme'),
      button2: elementButton (this.divid+'fillme', this.fillme, 'Fillme'), 
      div: elementDiv (this.divid, this.data),
   };
	document.getElementById('fields').appendChild(ret.div);
}
add.box= function ( id, s ) { add.div (id+'box', text.clearme.div(id,s)); }
add.video= function ( vid, n ) { add.box ('embed' + pad(n), text.iframe(vid)); }
add.subtitle= function ( x, n ) { add.box ( 'subtitle' + pad(n), pretty(x) ); }



setup.fields= function (x) {
alert(1);
alert(2);
   add.div ( "MessageMeaning", x.messagemeaning );
   parse(x.vids).map( add.video );
	var vids= parse(x.vids);
document.getElementById('fields').appendChild( elementDiv ('vid01', text.iframe(vids[0])) );
   x.subs.map( add.subtitle );
   x.subsmeaning.map( add.subsmeaning );
   if ( 'quiz' in x && x.quiz!=null ) {
     var q= x.quiz;
     add.box ( "QuizImage", text.img(q.image) );
     add.div ( "QuizOCR", q.ocr );
     add.div ( "quizSolution", q.solution );
     add.div ( "quizSolutionFeedback", q.solutionfeedback );
   }
}
*/

/*
function add (id, s) {
   var p= dom.find('initfields');
   dom.div().setid(id).setme(id+"= "+s).appendTo(p);
}


var setup= new Object();
setup.fields= function (x) {
	alert(1);
   add ( "navigate", [x.prev, x.next] );
   add ( "CourseTitle", x.title );
   add ( "Wiki", x.wiki );
   add ( "URL", x.url );
   add ( "Concept", x.concept );
   add ( "VideoIds", x.vids );
	x.message= 'test';
   add ( "MessageBox", x.message );
   var p= dom.find("MessageBox");
   p.append( dom.div().setid( 'Message' ).setme( 'message' ) );
	var b1= dom.button().setid('MessageClearme').setme('Clear me');
	var b2= dom.button().setid('MessageFillme').setme('Fill me');
	var b= box('Message','data');
	b1.e.onclick= b.onclick1;
	b2.e.onclick= b.onclick2;
   p.append(b1);
   p.append(b2);
};
setup.page= function (x) {
   var p= dom.head;
   p.append(dom.style(style));
   var t= util.pad(x.lesson);
   x.name= `${t}${util.pad(x.number)}`;
   p.append(dom.title(x.name));
  var prev= t+ util.pad(x.number-1);
  var next= t+ util.pad(x.number+1);
  x.prev= `<a href= "${prev}.html"> prev </a>`;
  x.next= `<a href= "${next}.html"> next </a>`;
  //x.subs= zipme( x.subs, x.subsmeaning ).map(objectSubtitle);
  setup.fields(x);
};


function video(vid, subs) {
  var ret= new Object();

  ret.vid= vid;
  ret.subs= subs;
  ret.meaning= 'meaning';
  return ret;
}
*/
