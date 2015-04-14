// _________________________________________________________________________ CastleView
main.views.castle.mobile.CastleView = Backbone.View.extend({
	SHOW_SCENES: "show_scenes",
	CASTLE: "castle",
	EXIT: "exit",
	HIDE_COMPLETE: "hide_complete",
	FADE_CLASS: "fade-fast",
	FADE_SLOW_CLASS: "fade-slow",
	NAVY: "#333e48",
	CASTLE_INIT: "castle-init",
	COVER_CLASS: "cover",
	CENTER_CLASS: "center",
	VERTICAL_CENTER_CLASS: "vertical-center",
	maintain_aspect_ratios: [],
	//template_load_external: false,
	templateLoader: main.utils.TemplateLoader,
    // ----------------- initialize
    initialize: function() {
        console.log("CastleView ---- initialize");
    },
    // ----------------- render
    render: function(eventName) {
        console.log("CastleView ---- render");
	    var self = this;
	    //prevent the nav bounce on safari mobile
	    document.ontouchmove = function(event) {
	        event.preventDefault();
	    };
	    /*if(this.template_load_external) {
		    $(this.el).html(this.template());
		    $(this.el).addClass(this.CASTLE);
	    }*/
	    //-------- sceneContainerView
        this.sceneContainerView = new main.views.castle.mobile.SceneContainerView({el:$('.scene-container', this.el)});
        //ALL_SCENE_ASSETS_LOADED
        $(this.sceneContainerView.el).on(this.sceneContainerView.ALL_SCENE_ASSETS_LOADED, function(){
	        self.stopLoader();
        });
        //EXIT_SCENES
        $(this.sceneContainerView.el).on(this.sceneContainerView.EXIT_SCENES, function(){ self.exit(); });
        //listen for the init assets event
        //that comes from each scene
        //so that you can sen the total num assets 
        //of all scenes to the loader
        //INIT_ASSETS
        $(this.sceneContainerView.el).on(this.sceneContainerView.INIT_SCENE_ASSETS, function(event, params){ self.handleInitSceneAssets(params); });
        //ASSET_LOADED
        $(this.sceneContainerView.el).on(this.sceneContainerView.SCENE_ASSET_LOADED, function(){ self.handleSceneAssetLoaded(); });
        //SHOW_AUDIO_LOADER
        //HIDE_AUDIO_LOADER
        //$(this.sceneContainerView.el).on(this.sceneContainerView.SHOW_AUDIO_LOADER, function(event){ self.showAudioLoader(); });
	   	//$(this.sceneContainerView.el).on(this.sceneContainerView.HIDE_AUDIO_LOADER, function(event){ self.hideAudioLoader(); });
        this.sceneContainerView.render();
        
        //create bg
        this.createBg();
        
        //-------- LoaderView
        this.loaderModel = new main.models.castle.LoaderModel();
        this.loaderView = new main.views.castle.LoaderView({ el:$('.loader', this.el), model: this.loaderModel});
        $(this.loaderView.el).on(this.loaderView.IS_COVERING, function(){
	       	self.unveilScenes();
        });
         $(this.loaderView.el).on(this.loaderView.TOTAL_HIDE_BG, function(){
	       	self.hideBg();
        });
        
        //-------- OrientationAlertView
        this.orientationAlertView = new main.views.castle.mobile.OrientationAlertView();
        $(this.el).append(this.orientationAlertView.el);
        
        this.initAudio();
        
        //position and size the elements
	    self.posize();
        return this;
	},
    // ----------------- initAudio
	initAudio: function() {
		console.log("initAudio");
        //create  this.audio_container
	    this.audio_container = $('<div class="scene-audio-cnt"></div>');
        $(this.el).append(this.audio_container);
        
        this.audio_el = $('<audio></audio>');
    },
	// ----------------- handleInitSceneAssets
	handleInitSceneAssets: function(num_assets) {
		this.loaderModel.addNumAssets(num_assets);
	},
	// ----------------- handleSceneAssetsLoaded
	handleSceneAssetLoaded: function() {
		this.loaderModel.handleSceneAssetLoaded();
	},
	// ----------------- exit
	exit: function() {
		$(this.el).trigger(this.EXIT);
	},
	// ----------------- posize
    posize: function() {
	    //set this.el to height of the window
	    $(this.el).css('height', $(window).height() + 'px');
	    this.goldBg_el.css('height', $(window).height() + 'px');
	    this.sceneContainerView.posize();
	    this.loaderView.posize();
	   // this.audioLoaderView.posize();
        
        //if aspect ratio is landsape
        //show alert that orientation
        //is best in portrait
        if(window.orientation && Math.abs(window.orientation) == 90){
            $(this.orientationAlertView.el).css('display', 'block');
        }
    },
    // ----------------- createBg
    createBg: function() {
	    this.goldBg_el = $('<div class="gold-bg"></div>');
	    //make it's width the size of the window
	    var to_h = $(window).height();
	    this.goldBg_el.css('opacity', '0');
	    this.goldBg_el.css('height', to_h + 'px');
	    $(this.el).prepend(this.goldBg_el);
	    this.goldBg_el.css('visibility', 'hidden');
	    this.goldBg_el.addClass(this.FADE_SLOW_CLASS);
    },
    // ----------------- show
    showBg: function() {
	    var self = this;
	    this.goldBg_el.css('visibility', 'visible');
	    //fade in the  bg 
	    this.goldBg_el.css('opacity', '1');
	    $(this.goldBg_el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
	    	 self.goldBg_el.removeClass(self.FADE_SLOW_CLASS);
	    });
	},
    // ----------------- hideBg
    hideBg: function() {
	    var self = this;
	    this.goldBg_el.addClass('fade-slow');
	    this.goldBg_el.css('opacity', '0');
	    this.goldBg_el.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			$(this).off('transitionend webkitTransitionEnd oTransitionEnd');
			self.goldBg_el.css('display', 'none');
			self.goldBg_el.remove();
		});
    },
    // ----------------- startLoader
    startLoader: function() {
	    var self = this;
        setTimeout(function(){
		   self.loaderView.startLoader();	
		}, 100);
    },
     // ----------------- stopLoader
    stopLoader: function() {
		this.loaderView.stopLoader();	
    },
     // ----------------- beginLoadingAssets
    beginLoadingAssets: function() {
	    this.sceneContainerView.beginLoadingAssets();
    },
    // ----------------- show
    show: function() {
	    var self = this;
    	$(this.el).css('visibility', 'visible');
    	self.showBg();
        //setTimeout(function(){
	       self.loaderView.show();	
        //}, 100);
    },
   	// ----------------- hide
    hide: function() {
	    var self = this;
	    //fade out the scene container
	    $(this.el).css('background-color', this.NAVY);
	    //this.sceneContainerView.stopSounds();
	    $(this.sceneContainerView.el).addClass(this.FADE_CLASS);
	    $(this.sceneContainerView.el).css('opacity', '0');
	    $(this.sceneContainerView.el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
    	    $(self.sceneContainerView.el).off('transitionend webkitTransitionEnd oTransitionEnd');
    	    self.sceneContainerView.castle_is_stopped = true;
    	    $(self.sceneContainerView.el).remove();
			$(self.el).trigger(self.HIDE_COMPLETE);
		});
    },
	// ----------------- unveilScenes
	unveilScenes: function() {
		var self = this;
		//settimeout ot unveil, 
		//move gold bg up
        //and hide Loder
    	self.sceneContainerView.addScenes();
    	setTimeout(function(){
	        self.posize();
	        setTimeout(function(){
				self.loaderView.hide();
			}, 200);
			self.sceneContainerView.show();
        }, 100);
	},
    // ----------------- beforeDispose
	beforeDispose: function(){
	   $(this.sceneContainerView.el).off();
	   this.sceneContainerView.dispose(); 
	   $(this.loaderView.el).off();
    }
});