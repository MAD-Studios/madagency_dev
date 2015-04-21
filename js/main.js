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
    section: {},
    // ----------------- init
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
		var namespace_enities = ["models", "views", "routers", "events"];
	    //for each 
	    for(var i=0;i<namespace_enities.length;i++){
		    if( !this[namespace_enities[i]] ) this[namespace_enities[i]] = {};
		    for(var section in this.section){
		    	 if( !this[namespace_enities[i]][section] ) this[namespace_enities[i]][section] = {};
		    	 for(subsection in this.section[section]){
			    	 if( !this[namespace_enities[i]][section][subsection] ) this[namespace_enities[i]][section][subsection] = {};
			    	 for(subsubsection in this.section[section][subsection]){
				    	 if( !this[namespace_enities[i]][section][subsection][subsubsection] ) this[namespace_enities[i]][section][subsection][subsubsection] = {};
			    	 }
		    	 }
		    }
	    }
	},
	// ----------------- addSubSection
    addSubSection: function(subsection){
    	for(var section in this.section){
		    this.section[section][subsection] = {};
		}
    	
    	this.createSectionNamespaces();
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
				cur_src = $(this).attr('data-img-src');
				if(cur_src) {
    				cur_src = cur_src.replace(/svg/g, 'png');
    				$(this).attr('src', cur_src);
				}
			});
		}
		//if (!Modernizr.hires) {
			//replace the svg with the png
			$('img').each(function(){
				cur_src = $(this).attr('data-img-src');
				console.log("IMG ^^^^^------ cur_src" + cur_src);
				if(cur_src) {
    				if(!Modernizr.hires) cur_src = cur_src.replace(/@2x/g, '');
    				$(this).attr('src', cur_src);
				}
			});
		//}
	},
	// ----------------- loadTemplates
	loadTemplates: function(templates, callback) {
		if(templates && templates.length > 0){
			this.utils.TemplateLoader.load( templates, function(){ console.log('templates laoded'); callback(); });
		}
		else callback();
	},
	// ----------------- loadJS
	loadJS: function(js_files, callback) {
		if(js_files && js_files.length > 0){
			this.utils.JSLoader.load( js_files, function(){ console.log('js loaded'); callback(); });
		}
		else callback();
	},
	// ----------------- loadExternalFiles
	loadExternalFiles: function(templates, js_files, callback) {
	    console.log("loadExternalFiles -------");
		var self = this;
		this.templates = templates;
		this.js_files = js_files;
		this.load_ext_files_callback = callback;
		
		if(this.js_files) main.loadJS(js_files, function(){ self.onJsLoadComplete(); } );
		else self.onJsLoadComplete(templates);
	},
	// ----------------- onJsLoadComplete
	onJsLoadComplete: function() {
        console.log("onJsLoadComplete -------");
		var self = this;
		if(this.templates) this.loadTemplates(this.templates, function(){  console.log("main--------- onJsLoadComplete"); self.load_ext_files_callback(); });
		else this.load_ext_files_callback();
	}
};

// _________________________________________________________________________
var section = null;
var templates = null;
var js_files = null;
/*var views = null;
var routers = null;*/
var beforeOnDocReady = null;

// ----------------- document ready handler
$(document).ready(function() {
    try{Typekit.load();}catch(e){}
	main.handleUnsupportedFeatures();
    onDocReady();
});

// ----------------- onAppReady
function onAppReady() {
}
// ----------------- onDocReady
function onDocReady() {
    console.log("onDocReady");
	if(beforeOnDocReady) beforeOnDocReady();
	main.init();
	
	main.loadExternalFiles(templates, js_files, onAppReady);
}

