// _________________________________________________________________________ SceneContainerView
main.views.SceneContainerView = Backbone.View.extend({
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
	ALLOW_SWIPE_CLASS: 'allowSwipe',
	SHOW_AUDIO_LOADER: "show_audio_loader",
	HIDE_AUDIO_LOADER: "hide_audio_loader",
	scene_views: [],
	cur_scene_index: 0,
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
	    this.audioCollection = new main.models.AudioCollection();
	    this.story_is_stopped = false;
	    //scene-container
	    //set model to the sceneCollection
	    this.model = new main.models.SceneCollection();
	    this.model.setAudio(this.audioCollection);
	    this.createScenes();
	    $('body').addClass(this.ALLOW_SWIPE_CLASS);
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
	   this.sceneSwipeInstructionView = new main.views.SceneSwipeInstructionView();
	   this.scene_views.push(this.sceneSwipeInstructionView);
	   this.sceneCastleView = new main.views.SceneCastleView();
	   this.scene_views.push(this.sceneCastleView);
	   this.sceneXrayView = new main.views.SceneXrayView();
	   this.scene_views.push(this.sceneXrayView);
	   this.sceneLabView = new main.views.SceneLabView();
	   this.scene_views.push(this.sceneLabView);
	   this.sceneCreationView = new main.views.SceneCreationView();
	   this.scene_views.push(this.sceneCreationView);
	   this.sceneGerbilView = new main.views.SceneGerbilView();
	   this.scene_views.push(this.sceneGerbilView);
	   this.sceneBoyView = new main.views.SceneBoyView();
	   this.scene_views.push(this.sceneBoyView);
	   this.sceneFinalView = new main.views.SceneFinalView();
	   this.scene_views.push(this.sceneFinalView);
	   //set the castle scene as the fisrt scene
	   
   	   for(var i=0;i<this.scene_views.length;i++){
   	   	   scene = this.scene_views[i];
   	   	   console.log(" befroe render --------- scene.name ------- " +  scene.name);
   	   	   model = this.model.find(function(scene_model){ return ( scene_model.get("name") ==  scene.name ) });
	   	   scene.model = model;
	   	   scene.render();
	   	   $(scene.el).on(scene.NEXT, function(event, params){ self.showNextScene() });
	   	   //$(scene.el).on(scene.DEACTIVATE, function(event){ $(self.el).trigger(self.SCENE_DEACTIVATE); });
	       $(scene.el).on(scene.INIT_ASSETS, function(event, params){  $(self.el).trigger(self.INIT_SCENE_ASSETS, [params]); });
	       //$(scene.el).on(scene.IDLE, function(event){ $(self.el).trigger(self.SCENE_IDLE); });
	       $(scene.el).on(scene.ASSET_LOADED, function(event){ $(self.el).trigger(self.SCENE_ASSET_LOADED); });
	   	   $(scene.el).on(scene.ALL_ASSETS_LOADED, function(event){ self.handleLoadSceneComplete(); });
	   	   $(scene.el).on(scene.SHOW_AUDIO_LOADER, function(event){ $(self.el).trigger(self.SHOW_AUDIO_LOADER); });
	   	   $(scene.el).on(scene.HIDE_AUDIO_LOADER, function(event){ $(self.el).trigger(self.HIDE_AUDIO_LOADER); });
   	   }
	  //$(this.sceneFinalView.el).on(this.sceneFinalView.EXIT_SWIPE, function(){ $(self.el).trigger(self.EXIT_SCENES); });
	   this.num_scenes = this.scene_views.length;
	   setTimeout(function(){
		   self.beginLoadingAssets();
	   }, 100);
	   this.hideScenes();
    },
    // ----------------- showNextScene
    showNextScene: function() {
	    console.log("showNextScene");
	    //activate the next scene
	    //var cur_scene_view = scene_views[this.cur_scene_index];
	    //cur_scene_view.deactivate();
	    this.cur_scene_index++;
	    if(this.cur_scene_index >= this.scene_views.length) {
		    //exit BAU
		    $(this.el).trigger(this.EXIT_SCENES);
	    }
	    else{
		    //and deactivate the current scene
		    var next_scene_view = this.scene_views[this.cur_scene_index];
		    next_scene_view.activate();
	    }
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
   	// ----------------- stopSounds
	/*stopSounds: function(obj){
		var scene;
		for(var i=0;i<this.scene_views.length;i++){
		   scene = this.scene_views[i];
		   scene.stopSounds();
		}
	},*/
   	// ----------------- addScenes
    setScenes: function() {
	},
    // ----------------- addScenes
    addScenes: function() {
	   var scene;
   	   for(var i=0;i<this.scene_views.length;i++){
   	   	   scene = this.scene_views[i];
	   	   $(this.el).append($(scene.el));
	   	   scene.onAppend();
   	   }
    },
    // ----------------- beginLoadingAssets
    beginLoadingAssets: function() {
    	console.log("beginLoadingAssets");
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
	    if( this.num_scenes_loaded < this.num_scenes ) this.loadSceneAssets();
	    else $(this.el).trigger(this.ALL_SCENE_ASSETS_LOADED);
    },
     // ----------------- hideScenes
    hideScenes: function() {
    	$(this.el).css('visibility', 'hidden');
	},
    // ----------------- show
    show: function() {
	    console.log("SceneContainerView ------ show");
    	$(this.el).css('visibility', 'visible');
    	var scene = this.scene_views[this.cur_scene_index];
    	if(scene.show) scene.show();
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