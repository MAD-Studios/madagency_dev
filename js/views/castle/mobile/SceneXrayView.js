// _________________________________________________________________________ SceneXrayView
main.views.castle.mobile.SceneXrayView = main.views.castle.mobile.SceneView.extend({
	name: "scene-xray",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneXrayView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneXrayView ---- render");
        var self = this;
        $(this.el).html(this.template());
        //this.xRayMove = Hammer($('#scene-xray', this.el));
         //this.xRayMove.on('swipeleft dragleft', function() {
        $('#scene-xray', this.el).on('swipeleft', function(){
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
			main.router.mainView.storyView.audio_el.get(0).play();
			setTimeout(function(){
				 if(!self.can_play_sound) main.router.mainView.storyView.audio_el.get(0).pause();
			}, 1500);
		}, 2500);
    }, 
	// ----------------- beginAnimation
    beginAnimation: function() {
	     $('#scene-xray', this.el).addClass(this.ANIMATE_CLASS);
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
        clearTimeout(this.endTimeout);
         var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	    }, 5000);
	    
        //clearTimeout(this.manAudioTimeout);
	    $('#scene-xray', self.el).addClass(self.NEXT_CLASS).delay(3000).queue(function() {
            $(self.el).trigger(self.NEXT);
        });
        this.endTimeout = setTimeout(function(){
	        $(self.el).css('display', 'none');
        }, 5000);

        $('#xray-parts', self.el).addClass(self.ANIMATE_CLASS);
        $('#xray-parts', self.el).addClass(self.NEXT_CLASS);
    }
});