// _________________________________________________________________________ SceneView
main.views.castle.SceneView = Backbone.View.extend({
	ASSET_LOADED: "asset_loaded",
	ALL_ASSETS_LOADED: "all_assets_loaded",
	ACTIVE_CLASS: "scene-active",
	DEACTIVATE: "deactivate",
	ACTIVATE: "activate",
	RESIZE: "resize",
	//IDLE: "idle",
	INIT_ASSETS: "init-assets",
	VOLUME_DECREMENT: 0.2,
	//IDLE_START_TIME: 8000,
	templateLoader: main.utils.TemplateLoader,
	scene_name: "",
	offset: 0,
	id: "",
	images: [],
	num_assets: 0,
	num_images: 0,
	num_sounds: 0,
	num_sounds_loaded: 0,
	sounds: [], 
	soundCollection: {},
	_route: "",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneView ---- initialize");
    },
    // ----------------- render
    render: function(eventName) {
	    if(this.beforeRender) this.beforeRender();
        console.log("SceneView ---- render");
        //create a view for each pane
        //make a list of all images
        $(this.el).addClass('scene');
        $(this.el).addClass(this.name);
        this.initAssets();
        //load them
        this.posize();
        return this;
	},
	// ----------------- setImages
    setImages: function() {
	    //determine the number of images 
	    //so that we can send it to
	    //the loader
	    //find all elements with source images
	    this.images =  $('[data-src]', this.el).toArray();
	    this.num_images = this.images.length;
    },
	// ----------------- setSounds
    setSounds: function(arr) {
        this.sounds = arr;
        this.soundCollection = new main.models.BasicAudioCollection();
        for(var i=0;i<this.sounds.length;i++){
	        this.sounds[i].set("id", i);
	        this.soundCollection.add(this.sounds[i]);
        }
        this.num_sounds = this.sounds.length;
        console.log(" ------------- this.num_sounds = " + this.num_sounds);
    },
	// ----------------- posize
    posize: function() {
		if(this.beforePosize) this.beforePosize();
    },
    // ----------------- activate
    activate: function() {
	    console.log("ACTIVATE ---------------------------- " + this.name);
	    if(this.el) {
		    $(this.el).addClass(this.ACTIVE_CLASS);
		    if(this.beforeActivate) this.beforeActivate();
		    $(this.el).trigger(this.ACTIVATE, [this.name]);
		    //this.setIdleTimer();
	    }
    }, 
    // ----------------- deactivate
    deactivate: function() {
    	console.log("DEACTIVATE ---------------------------- " + this.name);
    	if(this.el) {
	    	$(this.el).removeClass(this.ACTIVE_CLASS);
		    if(this.beforeDeactivate) this.beforeDeactivate();
		    $(this.el).trigger(this.DEACTIVATE);
		    //this.unsetIdleTimer();
	    }
    },
    // ----------------- setIdleTimer
    /*setIdleTimer: function() {
	    var self = this;
	    this.idleTimeout = setTimeout(function(){
		    //trigger the idle event
		    $(self.el).trigger(self.IDLE);
	    }, this.IDLE_START_TIME);
    },
    // ----------------- unsetIdleTimer
    unsetIdleTimer: function() {
	    clearTimeout(this.idleTimeout);
    },*/
    // ----------------- initAssets
    initAssets: function() {
	    var self = this;
	    self.setImages();
        self.setSounds(self.model.get("sounds"));
        
        console.log('self.model.get("sounds").length = ' + self.model.get("sounds").length);
        
        self.num_assets = self.num_sounds + self.num_images;
	    setTimeout(function(){
	        $(self.el).trigger(self.INIT_ASSETS, [self.num_assets]);
        }, 100);
	    //create  this.audio_container
	    this.audio_container = $('<div class="scene-audio-cnt"></div>');
    },
    // ----------------- loadAssets
    loadAssets: function() {
    	var complete_funct = this.loadSounds;
	    this.loadImages(complete_funct);
    },
    // ----------------- loadImages
    loadImages: function(complete_funct) {
	    var self = this;
	    //if images already loaded move on with loading sounds	    
	    $(this.el).loadImages({
		      imgLoadedClb: function(){ $(self.el).trigger(self.ASSET_LOADED); }, // Triggered when an image is loaded. ('this' is the loaded image)
			  allLoadedClb: function(){ self.loadSounds(); }, // Triggered when all images are loaded. ('this' is the wrapper in which all images are loaded, or the image if you ran it on one image)
			  imgErrorClb:  function(){ /*self.loadSounds();*/ } // Triggered when the image gives an error. Useful when you want to add a placeholder instead or remove it. ('this' is the loaded image)
	    });
    },
    // ----------------- loadSounds
    loadSounds: function() {
        this.num_sounds_loaded = 0;
	    this.loadSound();
    },
    // ----------------- loadSound
    loadSound: function() {
	    var self = this;
	    var cur_sound_model = this.sounds[this.num_sounds_loaded];
	    //create the audio element
	    var audio_el = $('<audio></audio>');
	    audio_el.attr('id', cur_sound_model.get("name"));
	    audio_el.attr('src', cur_sound_model.get("src"));
	    audio_el.attr('loop', cur_sound_model.get("loop"));
	    this.audio_container.append(audio_el);
	    //added loaded listener
	    //listen for loadeddata instead of 
	    //canplay b/c some browsers
	    //suspend downloads to save bandwidth
	    //and the canplay evenet doesn't fire
	    //$(audio_el.get(0)).on('canplay', function(){
	    $(audio_el.get(0)).on('loadeddata', function(){
		    $(this).off();
		    $(self.el).trigger(self.ASSET_LOADED);
		    setTimeout(function(){
			    self.num_sounds_loaded++;
			    if(self.num_sounds_loaded < self.sounds.length) self.loadSound();
			    else self.handleLoadSoundsComplete();
		    }, 10);
	    });
	    $(audio_el.get(0)).on('error', function(){
		    //continue even if error
		    console.log("loadSound ERROR");
		    $(this).off();
		    self.num_sounds_loaded++;
		    if(self.num_sounds_loaded < self.sounds.length) self.loadSound();
		    else self.handleLoadSoundsComplete();
	    });
	    $(audio_el.get(0)).on('stalled', function(){
	    	console.log("loadSound stalled");
	    });
	     $(audio_el.get(0)).on('suspend', function(){
	    	console.log("loadSound suspend ");
	    });
    },
    // ----------------- handleLoadSoundComplete
    handleLoadSoundsComplete: function() {
	    $(this.el).trigger(this.ALL_ASSETS_LOADED);
    },
    // ----------------- stopSounds
	stopSounds: function(){
		//stop any sounds that are playing
		$('audio', this.audio_container).each(function(){
			$(this).get(0).pause();
		});	
	},
    // ----------------- checkSounds
	checkSounds: function(obj){
	    //obj
		//curTop: 10, //the current scroll top offset
	    //lastTop: 0, //the top value of last time
	    // maxTop: 100, //the max value you can scroll to. curTop/maxTop will give you the current progress.
	    //direction: 'down' /
	    var self = this;
	    var is_current = false;
	    var start_scrolls, end_scrolls, 
	    to_play_audio_el, to_stop_audio_el, 
	    model, loop, fade;
	    //find any model who has a startScrollOffset 
	    //between lastTop and curTop
	    //play it 	    
	    //find any models who has a endScrollOffset
	    //beteween lastTop and curTop
	    //stop it
	    var sounds_to_play = this.soundCollection.filter(function(audio_model){
		     is_current = false;
		     loop = audio_model.get("loop");
		     start_scrolls = audio_model.get("startScrollOffset");
		     end_scrolls = audio_model.get("endScrollOffset");
		     for(var i=0;i<start_scrolls.length;i++){
			     //start on start pos when going down
			     if(start_scrolls[i] <= obj.curTop && start_scrolls[i] > obj.lastTop && obj.direction == 'down'){
				     is_current = true;
				     return is_current;
			     } 
			     //start on start  scroll when going up
			     //if loop is false
			     else if(start_scrolls[i] >= obj.curTop && start_scrolls[i] < obj.lastTop && obj.direction == 'up' && !loop){
				     is_current = true;
				     return is_current
			     }
		     }
		     //start on end scroll when going up
		     for(var i=0;i<end_scrolls.length;i++){
				 if(end_scrolls[i] >= obj.curTop && end_scrolls[i] < obj.lastTop && obj.direction == 'up'){
				     is_current = true;
				     return is_current;
			     }
			 }
		     return is_current;
	    });
	    var sounds_to_stop = this.soundCollection.filter(function(audio_model){
		     is_current = false;
		     loop = audio_model.get("loop");
		     playOnUp = audio_model.get("playOnUp");
		     start_scrolls = audio_model.get("startScrollOffset");
		     end_scrolls = audio_model.get("endScrollOffset");
		     for(var i=0;i<end_scrolls.length;i++){
			     //stop on end pos when going down
			     if(end_scrolls[i] <= obj.curTop && end_scrolls[i] > obj.lastTop && obj.direction == 'down'){
				     is_current = true;
				     return is_current;
			     } 
			     //stop on end scroll if going up & loop is not true
			     else if(end_scrolls[i] >= obj.curTop && end_scrolls[i] < obj.lastTop && obj.direction == 'up' && !loop){
				     is_current = true;
				     return is_current
			     }
		     }
		     //stops the loops at strt pos when 
		     //going back up
		     //also stops the non loops  from playing
		     //when going back up
		     for(var i=0;i<start_scrolls.length;i++){
			     if(start_scrolls[i] >= obj.curTop && start_scrolls[i] < obj.lastTop && obj.direction == 'up' && (loop || !playOnUp)){
				     is_current = true;
				     return is_current;
			     } 
			 }
		     return is_current;
	    });
	    var sounds_to_pause = this.soundCollection.filter(function(audio_model){
		     is_current = false;
		     loop = audio_model.get("loop");
		     fade = audio_model.get("fade");
		     start_scrolls = audio_model.get("startScrollOffset");
		     end_scrolls = audio_model.get("endScrollOffset");
		     for(var i=0;i<end_scrolls.length;i++){
		     	 //fade out on end pos going down
			     if(end_scrolls[i] <= obj.curTop && end_scrolls[i] > obj.lastTop && obj.direction == 'down' && fade){
				     is_current = true;
				     return is_current;
			     } 
		     }
		     for(var i=0;i<start_scrolls.length;i++){
			     //fade out on start pos when going up
			     if(start_scrolls[i] >= obj.curTop && start_scrolls[i] < obj.lastTop && obj.direction == 'up' && fade){
				     is_current = true;
				     return is_current;
			     } 
			 }
		     return is_current;
	    });
	    
	    for(var i=0;i<sounds_to_play.length;i++){
		    model = sounds_to_play[i];
		    to_play_audio_el = $('#' + model.get("name"), this.audio_container);
		    //if playing 
		    to_play_audio_el.get(0).volume = 1;
		    to_play_audio_el.get(0).currentTime = 0;
		    to_play_audio_el.get(0).play();
	    }
	    for(var i=0;i<sounds_to_stop.length;i++){
	    	model = sounds_to_stop[i];
		    to_stop_audio_el = $('#' + model.get("name"), this.audio_container);
		    to_stop_audio_el.get(0).pause();
		    //this.pauseSound(to_stop_audio_el.get(0));
	    }
	    for(var i=0;i<sounds_to_pause.length;i++){
	    	model = sounds_to_pause[i];
		    to_stop_audio_el = $('#' + model.get("name"), this.audio_container);
		    this.pauseSound(to_stop_audio_el.get(0));
	    }
	  },
	  // ----------------- pauseSound
	  pauseSound: function(sound_el){
		  var cur_vol = sound_el.volume;
		  this.fadeSound(sound_el, cur_vol);
	  },
	  // ----------------- fadeSound
	  fadeSound: function(sound_el, cur_vol){
		  ///need to stop this
		  //if play is encountered first
		  var self = this;
		  var new_vol = cur_vol - this.VOLUME_DECREMENT;
		  if(new_vol < 0) new_vol = 0;
		  sound_el.volume = new_vol;
		  if(new_vol > 0){
			  setTimeout(function(){
				  self.fadeSound(sound_el, new_vol);
			  }, 60);
		  }
	  }
});