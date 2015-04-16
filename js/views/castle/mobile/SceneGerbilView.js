// _________________________________________________________________________ SceneGerbilView
main.views.castle.mobile.SceneGerbilView = main.views.castle.mobile.SceneView.extend({
	SCENE_TRANSITION_CLASS: "scene-transition",
	STATE_LEFT: "state-left",
	STATE_GERBIL: "state-gerbil",
	STATE_STATUE: "state-statue",
	STATE_DEFAULT: "state-default",
	STATUE_FOCUS_POS_OFFSET_LEFT: 0.42,
	GERBIL_FOCUS_POS_OFFSET_LEFT: 0.21,
	state: "",
	name: "scene-gerbil",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneGerbilView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneGerbilView ---- render");
        var self = this;
        $(this.el).html(this.template());  
        //this.gerbilMove = Hammer($('#scene-gerbil', this.el));
        // GERBIL GESTURES
	    //this.gerbilMove.on('swipeleft dragleft', function() {
	    $('#scene-gerbil', this.el).on('swipeleft', function(){
	        if ($('body').hasClass(self.ALLOW_SWIPE_CLASS)) {
		    	self.playAudio();
			    self.deactivate();
		    }
	 	});
	    //this.gerbilMove.on('swiperight', function() {
	    $('#scene-gerbil', this.el).on('swiperight', function(){
	    	//implement below functionality later
	    	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	        /*if ($('body').hasClass(self.ALLOW_SWIPE_CLASS) && !$(this).hasClass(self.NEXT_CLASS)) {
	            $('body').removeClass(self.ALLOW_SWIPE_CLASS);
	            var bodyTimer = setTimeout(function() {
	                $('body').addClass(self.ALLOW_SWIPE_CLASS);
	            }, 2000);
	
	            $('#scene-gerbil', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	            $('#scene-creation', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(-100%)'
	            });
	        } else if ($('body').hasClass(self.ALLOW_SWIPE_CLASS) && $(this).hasClass(self.NEXT_CLASS)) {
	            $('body').removeClass(self.ALLOW_SWIPE_CLASS);
	            var bodyTimer = setTimeout(function() {
	                $('body').addClass(self.ALLOW_SWIPE_CLASS);
	            }, 2000);
	
	            $('#scene-gerbil', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	            $('#scene-creation', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(-100%)'
	            });
	        }*/
	    });
        return this;
	},
	// ----------------- playAudioUnique
    playAudioUnique: function() {
	    var self = this;
	    //setTimeout(function(){
		main.router.mainView.castleView.audio_el.get(0).play();
		 setTimeout(function(){
			 if(!self.can_play_sound) main.router.mainView.castleView.audio_el.get(0).pause();
		 }, 2000);
		//}, 2500);
    }, 
	// ----------------- beforePosize
    beforePosize: function() {
	    var self = this;
	    setTimeout(function(){
	    	if(self.state == self.STATE_STATUE) self.forceToStatue();
		    if(self.state == self.STATE_GERBIL) self.forceToGerbil();
		    if(self.state == self.STATE_LEFT) self.forceToLeft();
	    }, 1200);
    },
   
    // ----------------- beginAnimation
    beginAnimation: function() {
	     var self = this;
	     $('#scene-gerbil', this.el).addClass(this.ANIMATE_CLASS);
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
	    
	     var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	    }, 3000);
	    
	    if ( !$('#scene-gerbil', self.el).hasClass(self.NEXT_CLASS) ) {
            $('#scene-gerbil', self.el).addClass(self.NEXT_CLASS);
            $(self.el).trigger(self.NEXT);
            $(self.el).css('display', 'none');
	    }
	}
});   