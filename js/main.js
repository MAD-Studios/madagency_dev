// _________________________________________________________________________extend Backbone
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


// _________________________________________________________________________main
var main = {
    utils: {},
    router: {},
    events: {},
    section: [],
    // ----------------- createSectionNamespaces
    init: function(){
	     this.initModernizr();
    },
    // ----------------- setSection
    setSection: function(section){
    	this.section = section;
    	this.createSectionNamespaces();
    },
    // ----------------- createSectionNamespaces
    createSectionNamespaces: function(){
    	console.log("createSectionNamespaces ---- this.section = " + this.section);
    			        	console.log("createSectionNamespaces ---- this.section.length = " + this.section.length);

		var namespace_enities = ["models", "views", "routers"];
	    //for each 
	    for(var i=0;i<namespace_enities.length;i++){
		    this[namespace_enities[i]] = {};
		    for(var section in this.section){
		    
		        	console.log("createSectionNamespaces ---- section = " + section);
		        	console.log("createSectionNamespaces ---- namespace_enities[i] = " + namespace_enities[i]);
		        	

		    	 this[namespace_enities[i]][section] = {};
		    	 for(subsection in this.section[section]){
			    	 this[namespace_enities[i]][section][subsection] = {};
			    	 for(subsubsection in this.section[section][subsection]){
				    	 this[namespace_enities[i]][section][subsection][subsubsection] = {};
			    	 }
		    	 }
		    }
	    }
	},
	// ----------------- handleUnsupportedFeatures
    handleUnsupportedFeatures: function(){
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
		
		if (!window.console) {
		  var noOp = function(){}; // no-op function
		  console = {
		    log: noOp,
		    warn: noOp,
		    error: noOp
		  }
		}
    },
    // ----------------- initModernizr
    initModernizr: function() {
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
	},
	// ----------------- loadTemplates
	loadTemplates: function(templates, callback) {
		if(templates && templates.length > 0){
			main.utils.TemplateLoader.load( templates, function(){ callback(); });
		}
		else callback();
	}
};

// _________________________________________________________________________
var templates = null;
var section = null;

// ----------------- document ready handler
$(document).ready(function() {
	main.handleUnsupportedFeatures();
    onDocReady();
});

// ----------------- onAppReady
function onAppReady() {
}
// ----------------- onDocReady
function onDocReady() {
	main.init();
	main.loadTemplates(templates, function(){ onAppReady(); });
}
