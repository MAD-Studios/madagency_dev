// _________________________________________________________________________ SceneCastleView
main.views.castle.mobile.SceneCastleView = main.views.castle.mobile.SceneView.extend({
	FADE_CLASS: "fade-fast",
	name: "scene-castle",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneCastleView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneCastleView ---- render");
	    var self = this;
        $(this.el).html(this.template());
        //this.castleMove = Hammer($('#scene-castle', this.el));
        //this.castleMove.on('swipeleft dragleft', function() {
        $('#scene-castle', this.el).on('swipeleft', function(){
        	if ($('body').hasClass(self.ALLOW_SWIPE_CLASS)) {
		       self.playAudio();
		       self.deactivate();
	        }
	    });
        return this;
	},
	// ----------------- playAudioUnique
    playAudioUnique: function() {
	    var self = this;
	    setTimeout(function(){
		    //haven't hit the can play sound event yet
		    //do not do not play the sound
		    if(self.can_play_sound) main.router.mainView.castleView.audio_el.get(0).play();
		     setTimeout(function(){
				 if(!self.can_play_sound) main.router.mainView.castleView.audio_el.get(0).pause();
			 }, 1500);
		}, 3000);
    }, 
	// ----------------- beforePosize
    beforePosize: function() {
        console.log("SceneCastleView ---- beforePosize");
	},
	// ----------------- beginAnimation
    beginAnimation: function() {
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
	    clearTimeout(this.transitionTimeout);
	    
	    var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	    }, 3000);
	    
	    $('.fade-to-black').css('display', 'block');
	    this.transitionTimeout = setTimeout(function(){
	    	$('#scene-castle', self.el).removeClass(self.NEXT_CLASS);
	        $('#scene-castle', self.el).addClass(self.ANIMATE_CLASS).delay(2900).queue(function() {
	            $(this).hide();
	            $(self.el).css('display', 'none');
	            $(self.el).trigger(self.NEXT);
	            $('body').addClass(self.ALLOW_SWIPE_CLASS);
			 });
		 }, 200);
    },
    // ----------------- show
	show:function(){
		var self = this;
	   $('#scene-castle', this.el).addClass(this.NEXT_CLASS);
	}
});