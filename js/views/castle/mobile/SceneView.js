// _________________________________________________________________________ SceneView
main.views.SceneView = Backbone.View.extend({
	ASSET_LOADED: "asset_loaded",
	ALL_ASSETS_LOADED: "all_assets_loaded",
	SCENE_ACTIVE_CLASS: "scene-active",
	ACTIVE_CLASS: "active",
	ANIMATE_CLASS: "animate",
	FADE_CLASS: "fade-fast",
	FADE_SLOW_CLASS: "fade-slow",
	STAGE_TRANSITION_CLASS: "stage-transition",
	SCENE_TRANSITION_CLASS: "scene-transition",
	NEXT_CLASS: 'next',
	DEACTIVATE: "deactivate",
	ACTIVATE: "activate",
	RESIZE: "resize",
	ALLOW_SWIPE_CLASS: 'allowSwipe',
	NEXT: "next",
	SHOW_AUDIO_LOADER: "show_audio_loader",
	HIDE_AUDIO_LOADER: "hide_audio_loader",
	//IDLE: "idle",
	INIT_ASSETS: "init-assets",
	VOLUME_DECREMENT: 0.2,
	BASE_Z_INDEX: 200,
	BACK: 'back',
	//IDLE_START_TIME: 8000,
	templateLoader: main.utils.templateLoader,
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
	audio_has_played: false,
	can_play_sound: false,
    // ----------------- initialize
    initialize: function() {
        console.log("SceneView ---- initialize");
    },
    // ----------------- render
    render: function(eventName) {
        console.log("SceneView ---- render");
        var self = this;
	    if(this.beforeRender) this.beforeRender();
        //create a view for each pane
        //make a list of all images
        $(this.el).addClass('scene');
        $(this.el).addClass(this.name);
        this.initAssets();
        this.panel_el = $('.panel', this.el);
        this.text_tab_el = $('.text-tab', this.panel_el);
        $('img', this.el).attr('draggable', 'false');
        
        //load them
        setTimeout(function(){
	        self.posize();
	        self.setTab();
        });
        return this;
	},
	// ----------------- onAppend
    onAppend: function() {
	    var self = this;
	    setTimeout(function(){
		    self.initTab();
	    }, 100);
    },
	// ----------------- initTab
    initTab: function() {
       //also set the height of the tab to fit it's 
	    //containeing row
	    var to_height =  $('#text-tab-container', this.text_tab_el).outerHeight();
	    //var to_height = $(this.el).outerHeight();
	    this.text_tab_el.css('height', to_height + 'px');
	    //also potiion the tab so the that only the tab  shows
	    var to_margin_bottom = -(to_height - $('h3', this.text_tab_el).outerHeight() );
	    this.text_tab_el.css('margin-bottom', to_margin_bottom + 'px');
    },
	// ----------------- setTab
    setTab: function() {
	     var self = this;
	     clearTimeout(self.tabTimeout);

	      this.text_tab_el.on('mousedown touchstart', function() {
		      self.text_tab_el.off('mousedown touchstart'); 
		     //once released reset
		     $(self.el).on('mouseup touchend', function() {
		         $(self.el).off('mouseup touchend');
		         self.tabTimeout = setTimeout(function(){
			         self.setTab();
		          }, 500);
		      });
			  var active = $(this);
			  if (active.hasClass(self.ACTIVE_CLASS)) {
				  active.removeClass(self.ACTIVE_CLASS);
				  var to_margin_bottom = -(active.outerHeight() - $('h3', active).outerHeight() );
			      active.css('margin-bottom', to_margin_bottom + 'px');
			  } 
			  else if (!active.hasClass(self.ACTIVE_CLASS)) {
				  active.addClass(self.ACTIVE_CLASS);
				  active.css('margin-bottom', '0');
			  }
	    });
    },
    // ----------------- closeTab
    closeTab: function() {
	    var to_margin_bottom = -( this.text_tab_el.outerHeight() - $('h3',  this.text_tab_el).outerHeight() );
	     this.text_tab_el.css('margin-bottom', to_margin_bottom + 'px');
    },
	// ----------------- setImages
    setImages: function() {
	    //determine the number of images 
	    //so that we can send it to
	    //the loader
	    //find all elements with source images
	    this.images =  $('[data-src]', this.el).toArray();

	    if(!this.images) this.num_images = 0;
	    else this.num_images = this.images.length;
    },
	// ----------------- setSounds
    setSounds: function(arr) {
	    var self = this;
        this.sounds = arr;
        this.soundCollection = new main.models.BasicAudioCollection();
        
        for(var i=0;i<this.sounds.length;i++){
	        this.sounds[i].set("id", i);
	        this.soundCollection.add(this.sounds[i]);
        }
        this.num_sounds = this.sounds.length;
    },
	// ----------------- posize
    posize: function() {
		if(this.beforePosize) this.beforePosize();
    },
    // ----------------- activate
    activate: function() {
	    var self = this;
	    console.log("ACTIVATE ---------------------------- " + this.name);
	    if(this.el) {
		    //this.setIdleTimer();
		    $(this.el).addClass(this.SCENE_ACTIVE_CLASS);
		    if(this.beforeActivate) this.beforeActivate();

		    $(this.el).trigger(this.ACTIVATE, [this.name]);
            this.beginAnimation();
	    }
    }, 
    // ----------------- deactivate
    deactivate: function(back) {
    	var self = this;
    	console.log("DEACTIVATE ---------------------------- " + this.name);
    	if(back == null) back = false;
    	if(this.el) {
	    	//this.setIdleTimer();
		    if ($('body').hasClass(self.ALLOW_SWIPE_CLASS)) {
		    	$('body').removeClass(self.ALLOW_SWIPE_CLASS);
		    	if(back) this.transitionBack();
		    	else this.transitionOut();
		    	$(this.el).removeClass(this.SCENE_ACTIVE_CLASS);
			    if(this.beforeDeactivate) this.beforeDeactivate();
			    $(this.el).trigger(this.DEACTIVATE);
			    //this.unsetIdleTimer();
			    this.closeTab();
		    }
	    }
    },
    // ----------------- playAudio
   playAudio: function() {
   		if(!this.audio_has_played) {
	   		this.audio_has_played = true;
		    var self = this;
		    var cur_sound_model = this.sounds[0];
	        	
	        main.router.mainView.storyView.audio_el.attr('src', cur_sound_model.get("src"));
		    //play the audio
		    main.router.mainView.storyView.audio_el.get(0).load();
		   // $(self.el).trigger(this.SHOW_AUDIO_LOADER);

			//set unique timeout per scene
		    this.playAudioUnique();
			
			$(main.router.mainView.storyView.audio_el.get(0)).on('loadeddata', function(){
				$(this).off('loadeddata');
				self.can_play_sound = true;
				//self.deactivate();
				//$(self.el).trigger(self.HIDE_AUDIO_LOADER);
				console.log("loadSound CANPLAY");
			});
			$(main.router.mainView.storyView.audio_el.get(0)).on('error', function(){
			    //continue even if error
			    console.log("loadSound ERROR");
			    $(this).off();
		    });
		    $(main.router.mainView.storyView.audio_el.get(0)).on('stalled', function(){
		    	console.log("loadSound stalled");
		    });
		     $(main.router.mainView.storyView.audio_el.get(0)).on('suspend', function(){
		    	console.log("loadSound suspend ");
		    });
	    }
    },
    // ----------------- beginAnimation
    beginAnimation: function() {
    },
    // ----------------- transitionOut
    transitionOut: function() {
    },
    // ----------------- initAssets
    initAssets: function() {
	    var self = this;
	    self.setImages();
        self.setSounds(self.model.get("sounds"));
        self.num_assets = self.num_sounds + self.num_images;
	    setTimeout(function(){
	        $(self.el).trigger(self.INIT_ASSETS, [self.num_assets]);
        }, 100);
    },
    // ----------------- loadAssets
    loadAssets: function() {
	    this.loadImages();
    },
    // ----------------- loadImages
    loadImages: function() {
	    var self = this;
	    if(this.num_images == 0 ) this.handleLoadSoundsComplete();
	    //if images already loaded move on with loading sounds	    
	    $(this.el).loadImages({
		      imgLoadedClb: function(){ $(self.el).trigger(self.ASSET_LOADED); }, // Triggered when an image is loaded. ('this' is the loaded image)
			  allLoadedClb: function(){ self.handleLoadSoundsComplete(); }, // Triggered when all images are loaded. ('this' is the wrapper in which all images are loaded, or the image if you ran it on one image)
			  imgErrorClb:  function(){  } // Triggered when the image gives an error. Useful when you want to add a placeholder instead or remove it. ('this' is the loaded image)
	    });
    },
    // ----------------- handleLoadSoundComplete
    handleLoadSoundsComplete: function() {
	    $(this.el).trigger(this.ALL_ASSETS_LOADED);
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
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
		 $('.text-tab', this.panel_el).off();
		 $(this.el).off();
		 if(this.beforeDisposeUnique) this.beforeDisposeUnique();
		 //!!!!!!!!!!!!!!!!!!!!!!!!!
		 //$(audio_el.get(0)).off();	
	}
});