var section_name			= "castle";
var section 				= {};
section[section_name] 		= {};
main.setSection(section);


// _________________________________________________________________________castle
var castle = {
	device_is_mobile		: false,
	section_path 			: section_name + "/",
	js_path 				: "/js/",
	mobile_path 			: "mobile/",
	
	//templates
	template_path			: '/tpl/' + this.section_path,
	templates 				: [ 'scene-castle',
								'scene-xray',
								'scene-lab',
								'scene-creation',
								'scene-gerbil',
								'scene-boy',
								'scroll-down-indicator'								     
							  ],
	//mobile templates
	mobile_template_path 	: this.template_path + this.mobile_path,
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
	view_path 				: this.js_path + "views/" + this.section_path,
	views 					: [ 'CastleView',
								'LoaderView',
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
	mobile_view_path 		: this.view_path + this.mobile_path,
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
	model_path 				: this.js_path + "models/" + this.section_path,
	models 					: [ 'AudioModel',
								'SceneModel',						     
							  ],
	//mobile models
	mobile_model_path 		: this.model_path + this.mobile_path,
	mobile_models 			: [ 'AudioModel',
								'SceneModel',						     
							  ],
	//mobile routers
	router_path				: this.js_path + 'routers/' + this.section_path + '/',
	mobile_router_path 		: this.router_path + "mobile/",
	mobile_routers 			: [ 'Router' ],
	// ----------------- init
	init: function(){
	    //check if mobile
		this.device_is_mobile = main.utils.DeviceDetector.isMobile();
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
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//concatenate views and models androuters
		/*var js_files = views;
		if(js_files && routers) js_files = js_files.concat(routers);
		else if(routers)  js_files = routers;*/
		
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
	castle.intit();
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
