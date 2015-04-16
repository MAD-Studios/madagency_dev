var section_name			= "castle";
var section 				= {};
section[section_name] 		= {};
main.setSection(section);


// _________________________________________________________________________castle
var castle = {
    MOBILE                  : 'mobile',
	device_is_mobile		: false,
	//section_path 			: window['section_name'] + '/',
	//js_path               : '/js/',
	//mobile_path 			: 'mobile/',
	//templates
	template_path			: '/tpl/' + window['section_name'] + '/',
	templates 				: [ 'scene-castle',
								'scene-xray',
								'scene-lab',
								'scene-creation',
								'scene-gerbil',
								'scene-boy',
								'scroll-down-indicator'								     
							  ],
	//mobile templates
	mobile_template_path 	: '/tpl/' + window['section_name'] + '/mobile/',
	mobile_templates		: [ 'scene-swipe-instruction',
								'scene-castle',
								'scene-xray',
								'scene-lab',
								'scene-creation',
								'scene-gerbil',
								'scene-boy',
								'scene-final',
								'orientation-alert'
							  ],
	//views
	view_path 				: '/js/views/' + window['section_name'] + '/',
	views 					: [ 'CastleView',
								'SceneView',
								'SceneBoyView',
								'SceneCastleView',
								'SceneContainerView',
								'SceneCreationView',
								'SceneGerbilView',
								'SceneLabView',
								'SceneXrayView',
								'ScrollDownIndicatorView'							     
							  ],
	//mobile views
	mobile_view_path 		: '/js/views/' + window['section_name'] + '/mobile/',
	mobile_views 			: [ 'MainView',
								'CastleView',
								'LoaderView',
								'SceneView',
								'OrientationAlertView',
								'SceneBoyView',
								'SceneCastleView',
								'SceneContainerView',
								'SceneCreationView',
								'SceneFinalView',
								'SceneGerbilView',
								'SceneLabView',
								'SceneSwipeInstructionView',
								'SceneXrayView'
							  ],
	//models
	model_path 				: '/js/models/' + window['section_name'] + '/',
	models 					: [ 'AudioModel',
								'SceneModel',						     
							  ],
	//mobile models
	mobile_model_path 		: '/js/models/' + window['section_name'] + '/' + '/mobile/',
	mobile_models 			: [ 'AudioModel',
								'SceneModel',						     
							  ],
	//mobile routers
	router_path				: '/js/routers/' + window['section_name'] + '/',
	mobile_router_path 		: '/js/routers/' + window['section_name'] + '/mobile/',
	mobile_routers 			: [ 'Router' ],
	
	// ----------------- init
	init: function(){
	    //check if mobile
		this.device_is_mobile = main.utils.DeviceDetector.isMobile();
        if(this.device_is_mobile) main.addSubSection(this.MOBILE);
		this.setExternalFiles();
	},
	// ----------------- setExternalFiles
	setExternalFiles: function(){
	    var ext_file_sections = ["templates", "views", "models", "routers"];
		for(var i=0;i<ext_file_sections.length;i++){
			this.setExternalFilePaths(ext_file_sections[i]);
		}
		//separate into
		//templates and js_files
		//concatenate views and models and routers
		window['templates'] = this.templates;
		window['js_files'] = this.views;
		if(window['js_files'] && this.models) window['js_files'] = window['js_files'].concat(this.models);
		else if(this.models)  window['js_files'] = this.models;
		if(window['js_files'] && this.routers) window['js_files'] = window['js_files'].concat(this.routers);
		else if(this.routers)  window['js_files'] = this.routers;
		
	},
	// ----------------- setExternalFilePathVars
	setExternalFilePaths: function(var_name){
		var singular_var_name = var_name;
		if(var_name.charAt(var_name.length-1) == "s") singular_var_name = var_name.slice(0, var_name.length-1);
		
		if(this.device_is_mobile){
			this[singular_var_name + "_path"] = this["mobile_" + singular_var_name + "_path"];	
			this[var_name] = this["mobile_" + var_name];
		} 
		if(this[var_name]) {
			for(var i=0;i<this[var_name].length;i++){
				this[var_name][i] = this[singular_var_name + "_path"] + this[var_name][i];
			}
		}
	}
};

// _________________________________________________________________________
function beforeOnDocReady(){
	castle.init();
}
                
function onAppReady() {
	//initialize router
    if(castle.device_is_mobile) main.router = new main.routers.castle.mobile.Router();
    else main.router = new main.routers.castle.Router();
    
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: section_name });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}
