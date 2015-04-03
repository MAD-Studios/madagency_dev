// _________________________________________________________________________set up main namespace
var main = {
    models: {},
    views: {},
    utils: {},
    router: {},
    events: {}
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
	 unrouted: true,
     routes:{
     },
     // ----------------- initialize
     initialize: function() {
        console.log("initialize");
        var self = this;
        
        if(this.beforeInitialize) this.beforeInitialize();
        
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
		        if(route == "") self.navigate(route, {trigger: true}); 
		    }, 100);
        }, 100);
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
var templates = null;

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
	    return (device_width >= 768);
	});
	Modernizr.addTest('mobile', function() {
	    return main.utils.DeviceDetector.isMobile();
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
	loadTemplates(templates);
}

// ----------------- loadTemplates
function loadTemplates(templates) {
	console.log("loadTemplates");
	if(templates && templates.length > 0){
		main.utils.TemplateLoader.load( templates, function(){ onLoadTemplatesComplete(); });
	}
	else onLoadTemplatesComplete();
}

// ----------------- loadTemplatesComplete
function onLoadTemplatesComplete() {
	onReady();
}

// ----------------- onReady
/*function onReady() {
    main.router = new main.Router();
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: "dev/" });
	    //Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}*/