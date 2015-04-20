// _________________________________________________________________________ SceneContainerView
main.views.castle.SceneContainerView = Backbone.View.extend({
	PEPARE_OFFSET: 1000,
	ALL_SCENE_ASSETS_LOADED: "all_scene_assets_loaded",
	ACTIVE_CLASS: "active",
	EXIT_SCENES: "exit_scenes",
	INIT_SCENE_ASSETS: "init_scene_assets",
	SCENE_IDLE: "scene_idle",
	SCENE_ASSET_LOADED: "scene_asset_loaded",
	SCENE_DEACTIVATE: "scene_deactivate",
	SCENE_ACTIVATE: "scene_activate",
	SCENE_DEACTIVATE: "scene_deactivate",
	scene_views: [],
	curSceneView: {},
	num_scenes_loaded: 0,
	num_scenes: 0,
	story_is_stopped: false,
    // ----------------- initialize
    initialize: function() {
        console.log("SceneContainerView ---- initialize");
        $(this.el).css('visibility', 'hidden');
    },
    // ----------------- render
    render: function(eventName) {
        console.log("SceneContainerView ---- render");
	    var self = this;
	    //ceraet audio collection
	    //to handle sound data
	    this.audioCollection = new main.models.castle.AudioCollection();
	    this.story_is_stopped = false;
	    //scene-ctn
	    //set model to the sceneCollection
	    this.model = new main.models.castle.SceneCollection();
	    this.model.setSounds(this.audioCollection);
	    this.skrollr_body_el = $('#skrollr-body', this.el);
	    this.createScenes();
	    setTimeout(function(){
	        //self.lastScrollTop = $(window).scrollTop();
	        self.initScenes();
	        //setTimeout(function(){
		        //self.checkScenes();
	        //}, 400);
        }, 200);

        return this;
	},
	// ----------------- posize
    posize: function() {
	   $(this.el).css('height', $(window).height() + 'px');
	   for(var i=0;i<this.scene_views.length;i++){
	   	   scene = this.scene_views[i];
	   	   scene.posize();
	   }
    },
    // ----------------- createScenes
    createScenes: function() {
	   var self = this;
	   var model, scene;
	   this.num_scenes_loaded = 0;
	   this.scene_views = [];
	   //create and render each scene view
	   //scene-castle
	   //find the right scene model
	   this.sceneCastleView = new main.views.castle.SceneCastleView();
	   this.scene_views.push(this.sceneCastleView);
	   this.sceneXrayView = new main.views.castle.SceneXrayView();
	   this.scene_views.push(this.sceneXrayView);
	   this.sceneLabView = new main.views.castle.SceneLabView();
	   this.scene_views.push(this.sceneLabView);
	   this.sceneCreationView = new main.views.castle.SceneCreationView();
	   this.scene_views.push(this.sceneCreationView);
	   this.sceneGerbilView = new main.views.castle.SceneGerbilView();
	   this.scene_views.push(this.sceneGerbilView);
	   this.sceneBoyView = new main.views.castle.SceneBoyView();
	   this.scene_views.push(this.sceneBoyView);
	   
   	   for(var i=0;i<this.scene_views.length;i++){
   	   	   scene = this.scene_views[i];
   	   	   model = this.model.find(function(scene_model){ return ( scene_model.get("name") ==  scene.name ) });
	   	   scene.model = model;
	   	   scene.render();
	   	   $(scene.el).on(scene.ACTIVATE, function(event, params){ $(self.el).trigger(self.SCENE_ACTIVATE, [params]); });
	   	   $(scene.el).on(scene.DEACTIVATE, function(event){ $(self.el).trigger(self.SCENE_DEACTIVATE); });
	       $(scene.el).on(scene.INIT_ASSETS, function(event, params){  $(self.el).trigger(self.INIT_SCENE_ASSETS, [params]); });
	       //$(scene.el).on(scene.IDLE, function(event){ $(self.el).trigger(self.SCENE_IDLE); });
	       $(scene.el).on(scene.ASSET_LOADED, function(event){ $(self.el).trigger(self.SCENE_ASSET_LOADED); });
	   	   $(scene.el).on(scene.ALL_ASSETS_LOADED, function(){ self.handleLoadSceneComplete(); });
   	   }
   	   //!!!!!!!!!!!!!!!!!!!!!!!!!
	   //$(this.sceneBoyView.el).on(this.sceneBoyView.EXIT_CLICK, function(){ $(self.el).trigger(self.EXIT_SCENES); });
	   //EXIT_CASTLE
	   this.num_scenes = this.scene_views.length;
	   setTimeout(function(){
		   self.beginLoadingAssets();
	   }, 100);
	   this.hideScenes();
    },
    // ----------------- initScenes
    initScenes: function() {
	    var self = this;
	    var scene_obj, scene_model, scene;
		//save each pane id
	    //and its absolute position on the page
	    for(var i=0;i<this.scene_views.length;i++){
		    scene = this.scene_views[i];
		    //grab the scene model with the name that matches the
		    //scene's name
		    scene_model = this.model.find( function(model){ return ( model.get("name") ==  scene.name ) } );
		    //update it with the scene view
		    if(scene_model) scene_model.set({view: scene});
	    }
    },
     // ----------------- removeExplanationScreen
    removeExplanationScreen: function() {
	    this.sceneBoyView.removeExplanationScreen();
    },
    // ----------------- showAnswerScreen
    showAnswerScreen: function() {
	    this.sceneBoyView.showAnswerScreen();
    },
   	// ----------------- removeForceToPosition
	removeForceToPosition: function(){
		this.sceneCreationView.removeForceToPosition(); 
		this.sceneGerbilView.removeForceToPosition();
	},
	// ----------------- forceToCreationStatue
	forceToCreationStatue: function(){
		this.sceneCreationView.forceToStatue(); 
		this.sceneGerbilView.forceToStatue();
	},
	// ----------------- forceToGerbil
	forceToGerbil: function(){
		this.sceneCreationView.forceToGerbil(); 
		this.sceneGerbilView.forceToGerbil();
	},
	// ----------------- forceToGerbilLeft
	forceToGerbilLeft: function(){
		this.sceneCreationView.forceToLeft(); 
		this.sceneGerbilView.forceToLeft();
	},
	// ----------------- checkScenes
	checkScenes: function(obj){
	   //obj
	   //curTop: 10, //the current scroll top offset
	   //lastTop: 0, //the top value of last time
	   // maxTop: 100, //the max value you can scroll to. curTop/maxTop will give you the current progress.
	   //direction: 'down' /
   	   var scene, scene_model;
   	   var scroll_top = obj.curTop;
   	   if(!this.story_is_stopped){
		if(scroll_top >= 0){
		    scene_model = this.model.find(function(model){
		         return ( scroll_top >= model.get("topOffset") && scroll_top < model.get("topOffsetEnd") );
		    });
		    //get the view 
			if(scene_model) {
				scene = scene_model.get("view");
				if( !$(scene.el).hasClass(scene.ACTIVE_CLASS) ){
					scene.activate();
					if(this.curSceneView && this.curSceneView.deactivate) this.curSceneView.deactivate();
					this.curSceneView = scene;
				} 				
			}
		 }
   	   }
   	},
    // ----------------- checkSounds
	checkSounds: function(obj){
   	   var scene;
   	   if(!this.story_is_stopped){
	   	   for(var i=0;i<this.scene_views.length;i++){
		   	   scene = this.scene_views[i];
		   	   scene.checkSounds(obj);
	   	   }
   	   }
   	},
   	// ----------------- stopSounds
	stopSounds: function(obj){
		var scene;
		for(var i=0;i<this.scene_views.length;i++){
		   scene = this.scene_views[i];
		   scene.stopSounds();
		}
	},
   	// ----------------- addScenes
    setScenes: function() {
	},
    // ----------------- addScenes
    addScenes: function() {
	   var scene;
   	   for(var i=0;i<this.scene_views.length;i++){
   	   	   scene = this.scene_views[i];
	   	   this.skrollr_body_el.append($(scene.el));
   	   }
    },
    // ----------------- beginLoadingAssets
    beginLoadingAssets: function() {
	    this.loadSceneAssets();
    },
    // ----------------- loadSceneAssets
    loadSceneAssets: function() {
	    var cur_scene = this.scene_views[this.num_scenes_loaded];
	    cur_scene.loadAssets();
    },
    // ----------------- handleLoadSceneComplete
    handleLoadSceneComplete: function() {
	    this.num_scenes_loaded++;
	    //begin loading the aseets of the next scene
	    if( this.num_scenes_loaded < this.num_scenes ) this.loadSceneAssets();
	    else $(this.el).trigger(this.ALL_SCENE_ASSETS_LOADED);
    },
     // ----------------- hideScenes
    hideScenes: function() {
    	$(this.el).css('visibility', 'hidden');
	},
    // ----------------- show
    show: function() {
    	$(this.el).css('visibility', 'visible');
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
	   var scene;
   	   for(var i=0;i<this.scene_views.length;i++){
   	   	   scene = this.scene_views[i];
	   	   $(scene.el).off();
	   	   scene.dispose();
   	   }
    }
});