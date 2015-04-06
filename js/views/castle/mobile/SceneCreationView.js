// _________________________________________________________________________ SceneCreationView
main.views.SceneCreationView = main.views.castle.SceneView.extend({
	state: "",
	name: "scene-creation",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneCreationView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneCreationView ---- render");
        var self = this;
        $(this.el).html(this.template());
        //this.creationMove = Hammer($('#scene-creation', this.el));
        // CREATION GESTURES
	    //this.creationMove.on('swipeleft dragleft', function() {
	    $('#scene-creation', this.el).on('swipeleft', function(){
	    	if ($('body').hasClass(self.ALLOW_SWIPE_CLASS)) {
		    	self.playAudio();
			    self.deactivate();
		    }
	    });
	    $('#scene-creation', this.el).on('swiperight', function(){
	    //this.creationMove.on('swiperight', function() {
		    //!!!!!!!!!!!!!!!!!!!
	        /*if ($('body').hasClass(self.ALLOW_SWIPE_CLASS) && !$(this).hasClass(self.NEXT_CLASS)) {
	            $('body').removeClass(self.ALLOW_SWIPE_CLASS);
	            var bodyTimer = setTimeout(function() {
	                $('body').addClass(self.ALLOW_SWIPE_CLASS);
	            }, 2800);
	
	            $('#scene-creation', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	            $('#scene-lab', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(-100%)'
	            });
	        } else if ($('body').hasClass(self.ALLOW_SWIPE_CLASS) && $(this).hasClass(self.NEXT_CLASS)) {
	            $('body').removeClass(self.ALLOW_SWIPE_CLASS);
	            var bodyTimer = setTimeout(function() {
	                $('body').addClass(self.ALLOW_SWIPE_CLASS);
	            }, 2000);
	
	            $(this).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	            $('#scene-lab').css({
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
	   // setTimeout(function(){
		main.router.mainView.storyView.audio_el.get(0).play();
		setTimeout(function(){
			 if(!self.can_play_sound) main.router.mainView.storyView.audio_el.get(0).pause();
		}, 2000);

		//}, 2500);
    }, 
	// ----------------- beforePosize
    beforePosize: function() {
    	var self = this;
    },
    // ----------------- beginAnimation
    beginAnimation: function() {
	    var self = this;
        $('#scene-creation', this.el).addClass(this.ANIMATE_CLASS);
        //set 3600 timeout to hide unicorn container
        $('#unicorn-container', this.el).addClass(this.ANIMATE_CLASS);
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
	    
	     var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	    }, 3000);
	    
	    if ( !$('#scene-creation', self.el).hasClass(self.NEXT_CLASS)) {
            clearTimeout(this.davidTimeout);
            clearTimeout(this.trasitionTimeout);
            clearTimeout(this.endTimeout);
            this.davidTimeout = setTimeout(function(){
	            $('#david', self.el).css('display', 'none');
            }, 1410);
            $(self.el).css('zIndex', self.BASE_Z_INDEX);
            this.trasitionTimeout = setTimeout(function(){
	            $('#scene-creation', self.el).addClass(self.NEXT_CLASS);
	            $(self.el).trigger(self.NEXT);
            }, 200);
             //after transition end
	        //set to display none
	        this.endTimeout = setTimeout(function(){
		        $(self.el).css('display', 'none');
	        }, 3500);
        } 
        else {
            $('#scene-creation', self.el).css({
                '-webkit-transition-delay': '0s',
                '-webkit-transform': 'translateX(-200%)'
            });
        }
	}
});