// _________________________________________________________________________ CastleView
main.views.castle.CastleView = Backbone.View.extend({
	SHOW_SCENES: "show_scenes",
	CASTLE: "castle",
	EXIT: "exit",
	HIDE_COMPLETE: "hide_complete",
	FADE_CLASS: "fade-fast",
	FADE_SLOW_CLASS: "fade-slow",
	NAVY: "#333e48",
	CASTLE_INIT: "castle-init",
	MAINTAIN_RATIO_CLASS: "maintain-ratio",
	COVER_CLASS: "cover",
	CENTER_CLASS: "center",
	VERTICAL_CENTER_CLASS: "vertical-center",
	IDLE_START_TIME: 6000,
	INIT_IDLE_START_TIME: 1600,
	FORCE_TO_GERBIL_LEFT_SCROLLTOP: 9020,
	FORCE_TO_GERBIL_SCROLLTOP: 8520,
	FORCE_TO_STATUE_SCROLLTOP: 7820,
	REMOVE_FORCE_TO_GERBIL: 6700,
	REMOVE_EXPLANATION_SCREEN_SCROLLTOP: 14450,
	REMOVE_SCROLL_DOWN_INDICATOR_SCROLLTOP: 14450,
	maintain_aspect_ratios: [],
	template_load_external: false,
	scrollDownIndicatorShowNum: 0,
	templateLoader: main.utils.templateLoader,
    // ----------------- initialize
    initialize: function() {
        console.log("CastleView ---- initialize");
        /*if(!($(this.el).hasClass(this.CASTLE_INIT))) {
	         console.log("template load external");
	         this.template = _.template(this.templateLoader.get(this.CASTLE));
	         this.template_load_external = true;
        }*/
    },
    // ----------------- render
    render: function(eventName) {
        console.log("CastleView ---- render");
	    var self = this;
	     /*if(this.template_load_external) {
		    $(this.el).html(this.template());
		    $(this.el).addClass(this.CASTLE);
	    }*/
	    //-------- sceneContainerView
        this.sceneContainerView = new main.views.castle.SceneContainerView({el:$('.scene-container', this.el)});
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
        this.sceneContainerView.render();
        
        //-------- sceneContainerView
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
        
        //-------- ScrollDownIndicatorView
       this.scrollDownIndicatorView = new main.views.castle.ScrollDownIndicatorView();
       $(this.el).append(this.scrollDownIndicatorView.el);
        
        //position and size the elements
	    self.posize();
        return this;
	},
	// ----------------- handleInitSceneAssets
	handleInitSceneAssets: function(num_assets) {
		this.loaderModel.addNumAssets(num_assets);
	},
	// ----------------- handleSceneAssetsLoaded
	handleSceneAssetLoaded: function() {
		this.loaderModel.handleSceneAssetLoaded();
	},
	// ----------------- setIdleTimer
    setIdleTimer: function() {
	    var self = this;
	    var delay = this.IDLE_START_TIME;
	    if(this.scrollDownIndicatorShowNum == 0){
		    delay = this.INIT_IDLE_START_TIME;
	    } 
	    this.idleTimeout = setTimeout(function(){
		    //trigger the idle event
		    //$(self.el).trigger(self.IDLE);
		    self.showScrollDownIndicator();
	    }, delay);
	    //when the scene is idle
		//show the scrolldown indicator
    },
    // ----------------- unsetIdleTimer
    unsetIdleTimer: function() {
	    clearTimeout(this.idleTimeout);
	    this.hideScrollDownIndicator();
    },
    // ----------------- showScrollDownIndicator
    showScrollDownIndicator: function() {
	    //show the scrolldown indicator
	    this.scrollDownIndicatorView.show();
	    this.scrollDownIndicatorShowNum++;
    },
    // ----------------- showScrollDownIndicator
    hideScrollDownIndicator: function() {
	    //hide the scrolldown indicator
	    this.scrollDownIndicatorView.hide();
    },
    // ----------------- removeScrollDownIndicator
    removeScrollDownIndicator: function() {
	    //hide the scrolldown indicator
	    this.scrollDownIndicatorView.hide();
	    this.unsetIdleTimer();
    },
    // ----------------- removeExplanationScreen
    removeExplanationScreen: function() {
	    this.sceneContainerView.removeExplanationScreen();
    },
     // ----------------- showAnswerScreen
    showAnswerScreen: function() {
	    this.sceneContainerView.showAnswerScreen();
    },
	// ----------------- initSkrollr
	initSkrollr: function() {
		var self = this;
		this._skrollr = skrollr.init({
			smoothScrolling: true,
			smoothScrollingDuration: 500,
			mobileDeceleration: 1,
			constants: { gerbil: 7000,
						 boy: 12600 },
			beforerender: function(obj){ self.onBeforeSkrollrRender(obj); }
		});
	},
	// ----------------- onBeforeSkrollrRender
	onBeforeSkrollrRender: function(obj) {
		//obj
		//curTop: 10, //the current scroll top offset
	    //lastTop: 0, //the top value of last time
	    // maxTop: 100, //the max value you can scroll to. curTop/maxTop will give you the current progress.
	    //direction: 'down' /
	    var scrollVal = obj.curTop;
	    //!!!!!!!!!!!!!!!!!!!!!!!!
	    //refactor the below later
		this.triggerSelector('#castle-container-parts', 60, scrollVal, 1100);
		this.triggerSelector('#horn-container', 441, scrollVal);
		this.triggerSelector('#lake-02', 800, scrollVal, 1300);
		this.triggerSelector('.gears', 1200, scrollVal);
		this.triggerSelector('#castle-door-01', 800, scrollVal);
		this.triggerSelector('#castle-door-02', 800, scrollVal);
		this.triggerSelector('#signage-container', 1600, scrollVal, 3770);
		this.triggerSelector('#monitor-01', 1900, scrollVal, 2200);
		// Monitor Pipe
		this.triggerSelector('#xray-monitor', 2300, scrollVal);
		this.triggerSelector('#clipboard', 5000, scrollVal);
		this.triggerSelector('#stones-container', 7215, scrollVal);
		this.triggerSelector('#gerbil-container', 8500, scrollVal, 12450);
		this.triggerSelector('#steam-container', 6700, scrollVal, 12450);
		this.triggerSelector('#red-transparency', 9520, scrollVal);
		this.triggerSelector('#steam-text', 10850, scrollVal);
		this.triggerSelector('#boy-container', 14450, scrollVal);
		this.triggerSelector('#behold-container', 13850, scrollVal);
		//this.triggerSelector('#cta-container', 14450, scrollVal);
		//check sounds here
		this.sceneContainerView.checkScenes(obj);
		this.sceneContainerView.checkSounds(obj);
		this.unsetIdleTimer();
		this.setIdleTimer();
		this.checkUI(scrollVal);
	},
	// ----------------- this.triggerSelector
	triggerSelector: function(elementSelector, customOffset, documentOffset, removeOffset) {
		var element = $(elementSelector, this.el);
		if (customOffset <= documentOffset) element.addClass('animate');
		else element.removeClass('animate');
		if (typeof removeOffset != 'undefined' && removeOffset <= documentOffset) element.removeClass('animate');
	},
	// ----------------- checkUI
	checkUI: function(scrollVal) {
		//find any custom data triggers
		// and handle them
		//when you get to the end of the gerbil scene
		//force it to the end
		//so that the scene hhis positioned to 
		//the left of the window
		if(scrollVal >= this.FORCE_TO_STATUE_SCROLLTOP && scrollVal ){
			 this.sceneContainerView.forceToCreationStatue();
		}
		if(scrollVal >= this.FORCE_TO_GERBIL_SCROLLTOP && scrollVal ){
			 this.sceneContainerView.forceToGerbil();
		}
		if(scrollVal >= this.FORCE_TO_GERBIL_LEFT_SCROLLTOP && scrollVal){
			 this.sceneContainerView.forceToGerbilLeft();
		}
		if(scrollVal <= this.REMOVE_FORCE_TO_GERBIL){
			this.sceneContainerView.removeForceToPosition();
		}
		if(scrollVal >= this.REMOVE_SCROLL_DOWN_INDICATOR_SCROLLTOP){
			this.removeScrollDownIndicator();
		}
		if(scrollVal >= this.REMOVE_EXPLANATION_SCREEN_SCROLLTOP){
			this.showAnswerScreen();
		}
		else{
			this.removeExplanationScreen();
		}
		
	},
	// ----------------- initMaintainRatios
	initMaintainRatios: function() {
		var self = this;
		var rat_obj;
		//save the aspect ratios of all 
		//elements of class this.MAINTAIN_RATIO_CLASS
		//this is what is controlling the
		//change in height that allows for 
		//child percentage calculations
		$(".maintain-ratio", this.el).each(function(){
		    rat_obj = { id: $(this).attr("id"),
						width: $(this).width(),
						height: $(this).height() };

			self.maintain_aspect_ratios.push(rat_obj);
		});
	},
	// ----------------- maintainRatios
	maintainRatios: function() {
		var self = this;
		var i, rat, newW, newH, origW, origH, minW, newX, newY;
		if(this.maintain_aspect_ratios.length > 0){
				$(String("." + this.MAINTAIN_RATIO_CLASS), this.el).each(function(){		
					//set the width to the size of the window
					//and claculate the scale based upon 
					//initial size
					newW = $(window).width();
					//find th ratio_obj with id
					//of this el
					for(var i=0;i<self.maintain_aspect_ratios.length;i++){
						if(self.maintain_aspect_ratios[i].id == $(this).attr("id")){
							origW = parseInt(self.maintain_aspect_ratios[i].width);
							origH = parseInt(self.maintain_aspect_ratios[i].height);
							break;
						}
					}
					var rat = newW/origW;
					newH = rat*origH;
					// if the element has 
					//a perecnt min-width
					//and this now puts newW less than the min with
					//override 
					minW = $(this).css('min-width');
					if(minW && minW.indexOf("%") > -1){
						minW = minW.replace("%");
						minW = parseInt(minW)/100;
						console.log("minW = "+ minW);
						newW = $(window).width()*minW;
						rat = newW/origW;
						newH = rat*origH;
					}
					//if cover 
					//and new width causes the height to be
					//less than the window hieght
					//use the window height to determine ratio
					if($(this).hasClass(self.COVER_CLASS) && newH < $(window).height()) {
						newH = $(window).height();
						rat = newH/origH;
						newW = rat*origW;
					}
					$(this).css('width', newW + 'px');
					$(this).css('height', newH + 'px');
					
					//if center 
					//center the div horizontally within the window
					if($(this).hasClass(self.CENTER_CLASS)) {
						//determine if left or right justified
						newX = ($(window).width() - $(this).outerWidth())/2;
						$(this).css('right', newX + 'px');
					}
					//ifvertical center 
					//if center 
					//center the div horizontally within the window
					if($(this).hasClass(self.VERTICAL_CENTER_CLASS)) {
						//determine if left or right justified
						newY = ($(window).height() - $(this).outerHeight())/2;
						$(this).css('top', newY + 'px');
					}
						
			});
		}
	},
	// ----------------- exit
	exit: function() {
		$(this.el).trigger(this.EXIT);
	},
	// ----------------- destroySkrollr
    destroySkrollr: function() {
	    //destroy skrollr
		this._skrollr.destroy();
    },
	// ----------------- posize
    posize: function() {
	    $('[data-stretch]', this.el).height($(window).height());
	    this.maintainRatios();
	    //set this.el to height of the window
	    $(this.el).css('height', $(window).height() + 'px');
	    this.goldBg_el.css('height', $(window).height() + 'px');
	    this.sceneContainerView.posize();
	    this.loaderView.posize();
    },
    // ----------------- createBg
    createBg: function() {
	    this.goldBg_el = $('<div class="dark-gold-bg"></div>');
	    //make it's width the size of the window
	    var to_h = $(window).height();
	    this.goldBg_el.css('opacity', '0');
	    this.goldBg_el.css('height', to_h + 'px');
	    $(this.el).prepend(this.goldBg_el);
	    //this.goldBg_el.css('visibility', 'hidden');
	    this.goldBg_el.addClass(this.FADE_SLOW_CLASS);
    },
    // ----------------- show
    showBg: function() {
    	console.log("showBg");
	    var self = this;
	    //this.goldBg_el.css('visibility', 'visible');
	    //fade in the  bg 
	    this.goldBg_el.css('opacity', '1');
	    $(this.goldBg_el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
	    	 self.goldBg_el.removeClass(self.FADE_SLOW_CLASS);
	    });
	},
    // ----------------- hideBg
    hideBg: function() {
	    //this.goldBg_el.removeClass('fade-slow');
	    this.goldBg_el.css('visibility', 'hidden');
	    this.goldBg_el.css('opacity', '0');
	    this.goldBg_el.css('left', '100%');
    },
    // ----------------- startLoader
    startLoader: function() {
	    var self = this;
        setTimeout(function(){
		   self.loaderView.startLoader();	
		}, 400);
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
        setTimeout(function(){
	       self.loaderView.show();	
        }, 300);
    },
   	// ----------------- hide
    hide: function() {
	    var self = this;
	    //fade out the scene container
	    $(this.sceneContainerView.el).css('background-color', this.NAVY);
	    this.sceneContainerView.stopSounds();
	    $(this.sceneContainerView.skrollr_body_el).addClass(this.FADE_CLASS);
	    $(this.sceneContainerView.skrollr_body_el).css('opacity', '0');
	    $(this.sceneContainerView.skrollr_body_el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
    	    $(self.sceneContainerView.skrollr_body_el).off('transitionend webkitTransitionEnd oTransitionEnd');
    	    self.sceneContainerView.castle_is_stopped = true;
    	    self.destroySkrollr();
    	    self.sceneContainerView.skrollr_body_el.remove();
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
		    self.initMaintainRatios();
	        self.posize();
			self.loaderView.hide();
			self.sceneContainerView.show();
            TweenLite.to(window, 1.4, {scrollTo:{y:500, autoKill:false},  delay:0.20, ease:Expo.easeOut, onStart:self.onAutoScrollStart, onComplete:self.onAutoScrollComplete});
        }, 100);
        //initailize scrollr
        self.initSkrollr();
	},
    // ----------------- beforeDispose
	beforeDispose: function(){
	   $(this.sceneContainerView.el).off();
	   $(this.sceneContainerView.skrollr_body_el).off();
	   this.sceneContainerView.dispose(); 
	   $(this.loaderView.el).off();
    }
});