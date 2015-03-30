
//set up main namespace
var main = {
    models: {},
    views: {},
    utils: {},
    router: {}
};

// ----------------- Backbone.View.prototype.close
Backbone.View.prototype.close = function () {
    //extend the close method of of all views
    //apply beforeClose
    if (this.beforeClose) {
        this.beforeClose();
    }
}
// ----------------- Backbone.View.prototype.dispose
Backbone.View.prototype.dispose = function () {
    if (this.beforeDispose) {
        this.beforeDispose();
    }
    this.unbind();
    this.undelegateEvents();
    this.remove();
};

// _________________________________________________________________________ main Router
main.Router = Backbone.Router.extend({
	 UNROUTED_TIMEOUT: 300,
	 autoScrolling: false,
	 unrouted: true,
     routes:{
        "": "method",
        "how": "how",
        "work": "work",
        "team": "team",
        "disciplines": "disciplines",
        "contact": "contact",
        "play": "play"
     },
     // ----------------- initialize
     initialize: function() {
        console.log("initialize");
        var self = this;
        this.responseGeneratorModel = new main.models.ResponseGeneratorModel();
        this.mainView = new main.views.MainView( {el: $('#main', this.el)} );
        this.initTouchEvents();
        //break down url and navigate to the right place
        //if rerefreshed from story 
        //grab the string after the last "/"
        var route = window.location.href;
        var slash_index = route.lastIndexOf("/");
        if( slash_index > 0 && route.length >= (slash_index+1) ){
			route = route.slice( (slash_index+1), route.length );
			if(route.length == 0) {
				route = "";
			}
        } 
        setTimeout(function(){
	        $(window).scrollTop(0);
	        setTimeout(function(){
		        if(route == "" || route == "web") self.navigate(route, {trigger: true}); 
		    }, 100);
        }, 100);
     },
     // ----------------- method
     method: function(){
         console.log("main --- method");
         var self = this;
         var id = "method";
         //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){	
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
	     }
     },
     // ----------------- how
     how: function(){
          console.log("main --- how");
          var self = this;
          var id = "how";
          //if first time set a delay
          if(this.unrouted){
	         setTimeout(function(){
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
          }
          else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
	      }
     },
     // ----------------- work
     work: function(){
          console.log("main --- work");
          var self = this;
          var id = "work";
          //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){	
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
		 }
     },
     // ----------------- team
     team: function(){
          console.log("main --- team");
          var self = this;
          var id = "team";
           //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
		 }
     },
     // ----------------- disciplines
     disciplines: function(){
         console.log("main --- disciplines");
         var self = this;
         var id = "disciplines";         
           //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){
		          self.mainView.scrollToPane(id);
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
	     }
     },
     // ----------------- contact
     contact: function(){
         console.log("main --- contact");
         var self = this;
         var id = "contact";         
         //if first time set a delay
         if(this.unrouted){
	         setTimeout(function(){	
		          self.mainView.scrollToPane(id);	          
	         }, this.UNROUTED_TIMEOUT);
	         self.unrouted = false;
         }
         else{
		     //scroll to the  posY
		     this.mainView.scrollToPane(id);
		 }
     },
     // ----------------- play
     play: function(){
         console.log("main --- play");
         var self = this;
         setTimeout(function(){
            self.mainView.moveIntoStory();  
         }, 3000);
     },
     // ----------------- initTouchEvents
     initTouchEvents: function() {
        var self = this;
        // otherwise register mouse events instead
        $('#main').on('mousedown', 'a', function(event) {
           self.selectItem(event);
        });
        $('#main').on('mouseup', 'a', function(event) {
             self.deselectItem(event);
        });
     },
     // ----------------- posize
     posize: function() {
     },
     // ----------------- selectItem
     selectItem: function(event) {
       $(event.currentTarget).addClass('tappable-active');
     },
     // ----------------- deselectItem
     deselectItem: function(event) {
       $(event.currentTarget).removeClass('tappable-active');
     }
});

// _________________________________________________________________________

if (!window.console) {
  var noOp = function(){}; // no-op function
  console = {
    log: noOp,
    warn: noOp,
    error: noOp
  }
}

// ----------------- document ready handler
$(document).ready(function() {
    onDocReady();

    if (!Object.keys) {
	console.log("Object.keys = " + Object.keys);
	Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

	  return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
      var result = [], prop, i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
});

// ----------------- initModernizr
function initModernizr() {
	Modernizr.addTest('hires', function() {
	    // starts with default value for modern browsers
	    var dpr = window.devicePixelRatio || 1;
	    return !!(dpr > 1);
	});
	Modernizr.addTest('large', function() {
	    var device_width = $(window).width();
	    //var device_width = window.width;
	    return (device_width >= 768);
	});
	if (!Modernizr.svg) {
		//replace the svg with the png
		$('img').each(function(){
			cur_src = $(this).attr('src');
			cur_src = cur_src.replace(/svg/g, 'png');
			$(this).attr('src', cur_src);
		});
	}
	if (!Modernizr.hires) {
		//replace the svg with the png
		$('img').each(function(){
			cur_src = $(this).attr('src');
			cur_src = cur_src.replace(/@2x/g, '');
			$(this).attr('src', cur_src);
		});
	}
}

// ----------------- doc handler
function onDocReady() {
    
    initModernizr();
	    
	/*Modernizr.addTest('hires', function() {
	    // starts with default value for modern browsers
	    var dpr = window.devicePixelRatio || 1;
	    return !!(dpr > 1);
	});
	Modernizr.addTest('large', function() {
	    var device_width = $(window).width();
	    //var device_width = window.width;
	    return (device_width >= 640);
	});
	if (!Modernizr.svg) {
		//replace the svg with the png
		$('img').each(function(){
			cur_src = $(this).attr('src');
			cur_src = cur_src.replace(/svg/g, 'png');
			$(this).attr('src', cur_src);
		});
	}
	if (!Modernizr.hires) {
		//replace the svg with the png
		$('img').each(function(){
			cur_src = $(this).attr('src');
			cur_src = cur_src.replace(/@2x/g, '');
			$(this).attr('src', cur_src);
		});
	}*/
	
    main.utils.TemplateLoader.load([ 'scene-castle',
								     'scene-xray',
								     'scene-lab',
								     'scene-creation',
								     'scene-gerbil',
								     'scene-boy',
								     'corporate',
								     'story',
								     'scroll-down-indicator'								     
                                   ],
        function() {
            onReady();
    });
}

// ----------------- onReady
function onReady() {
    main.router = new main.Router();
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: "dev/" });
	    //Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}