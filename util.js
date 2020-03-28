
function lesson03(x,n) {
  x.lesson= 3;
  x.number= n;
}





function pretty(x) { return x.split( '\n' ).join( '<br>' ); }
function fill(id, x) { document.getElementById(id).innerHTML= pretty(x); }

function setupids(ids) {
  var n= 0;
  while (n < ids.length) {
	  var t= ids[n];
	  fill( t[0], t[1] );
	  n++;
  }
}

function makeButton(id) {
  return ` <button id= ${id} 
                     onclick= "my[${id}].show()"> 
		       test 
	     </button> <br> `;
}

function clearmeButton(id) {
  var code= ` function () {
    document.getElementById('${id}').innerHTML= '${id}';
  } `;
  return `<button id="${id}" onclick="(${code})()">Clearme</button>`;
}

function makeDiv(id) { return ` <div id="${id}"> ${id} </div> `; }
function fillDiv(id,x) { return ` <div id="${id}"> ${x} </div> `; }
function makeAnonymousDiv(x) { return ` <div> ${x} </div> `; }


function makeTable(x) {
  var s= x.split('\n').map(makeTablerow).join( '' );
  return ` <table valign="top"> ${s} </table> `;
}

function makeTd(x) { return ` <td> ${x} </td> `; }

function makeTablerow(x) {
  var cells= x.split(',').map( makeTd );
  return ` <tr> ${cells.join('')} </tr> `;
}


function clearmeDiv2(id,s) {
  var d=  fillDiv(id,s);
  var b= clearmeButton(id);
  var box= [d, b ];
  return box.toString();
}


function clearmeDiv(id) {
  var d=  makeDiv(id);
  var s= clearmeButton(id);
  var box= [d, s ];
  return box.toString();
}


function iframe(vid) {
	var ret= ` <iframe width="440" height="248" src="https://www.youtube.com/embed/${vid}?rel=0&amp;autoplay=1&mute=1&cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `;
	return ret;
}



function setupstyle() {
   var style= `
div { background-color: green; border: 10px; }
div div { background-color: pink; border: 4px; }
div div div { background-color: maroon; border: 16px; }
img { width: 500px; height: auto; }
`;

   var element = document.createElement("style");
   element.innerHTML= style;
   document.head.appendChild(element);
}

function setuptitle(title) {
  var title= `<title> ${title} </title>`;
  var element = document.createElement("title");
  element.innerHTML= title;
  document.head.appendChild(element);
}


function pad(x) { return x.toString().padStart(2,"0"); }


function video(vid, subs) {
  var ret= new Object();

  ret.vid= vid;
  ret.subs= subs;
  ret.meaning= 'meaning';
  return ret;
}

function parse(s) { return s.split(/\s+/); }

function createfields(x) {

   var fields= [];
   var boxes= [];
   if (x.quiz!=null) { fields.push( quizfields ); boxes.push( quizboxes ); }
   fields= fields.join(" "); boxes= boxes.join(" ");
   fields= parse(fields);
   fields= fields.map(makeDiv);
   document.getElementById( "fields" ).innerHTML= fields.join('\n');
}

function add(id, s) {
   s= fillDiv(id,s);
   var str1= document.getElementById( "initfields" ).innerHTML;
   document.getElementById( "initfields" ).innerHTML= str1.concat(s);
}
function addbox( id, s ) {
   s=  clearmeDiv2( id, s );
   add ( id+'box', s );
}

function addvid ( x, index ) {
   var id= 'embed' + pad(index);
   var s= iframe( x );
   addbox ( id, s );
}

function addsubtitle ( x, n ) {
   var id= 'subtitle' + pad(n);
   var s=  pretty(x);
   addbox ( id, s );
}

function setupfields(x) {
   add ( "navigate", [x.prev, x.next] );
   add ( "title", "Course Title= " + x.title );
   add ( "wiki", "Wiki= " + x.wiki );
   add ( "url", "URL= " + x.url );
   add ( "concept", "Concept= " + x.concept );
   add ( "videos", "Vids= " + x.vids );
   addbox ( "message", "Message= " + x.message );
   add ( "messagemeaning", "Message Meaning= " + x.messagemeaning );
   parse(x.vids).map( addvid );
   x.subs.map( addsubtitle );
   if ( 'intro' in x && x.intro!=null && 'meaning' in x.intro)
     add( "introvideosubtitlesmeaning", "Intro Video Subtitles Meaning= " + x.intro.meaning );
   if ( 'answer' in x && x.answer!=null && 'meaning' in x.answer)
     add( "answervideosubtitlesmeaning", "Answer Video Subtitles Meaning= " + x.answer.meaning );
   if ( 'quiz' in x && x.quiz!=null ) {
     var q= x.quiz;
     addbox ( "quiz", q.image );
     add ( "quizocr", q.ocr );
     add ( "quizsolution", "Solution= " + q.solution );
     add ( "quizsolutionfeedback", "Solution Feedback= " + q.solutionfeedback );
   }
}


function setuppage(x) {
  setupstyle();	
  var t= pad(x.lesson);
  x.name= `${t}${pad(x.number)}`;
  setuptitle(x.name)
  var prev= t+ pad(x.number-1);
  var next= t+ pad(x.number+1);
  x.prev= `<a href= "${prev}.html"> prev </a>`;
  x.next= `<a href= "${next}.html"> next </a>`;
  setupfields(x);
}

