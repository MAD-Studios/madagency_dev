// _________________________________________________________________________ SceneLabView
main.views.SceneLabView = main.views.SceneView.extend({
	name: "scene-lab",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneLabView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneLabView ---- render");
        var self = this;
        $(this.el).html(this.template());  
        
        //this.labMove = Hammer($('#scene-lab', this.el));
	    // LAB GESTURES
	    //this.labMove.on('swipeleft dragleft', function() {
	    $('#scene-lab', this.el).on('swipeleft', function(){
	        if ($('body').hasClass(self.ALLOW_SWIPE_CLASS)) {
		    	self.playAudio();
		   	    self.deactivate();
		    }
	    });
	    $('#scene-lab', this.el).on('swiperight', function(){
	    //this.labMove.on('swiperight', function() {
		    //self.transitionBack();
		    //var back = true;
		    //self.deactivate(back);
	       /* if ($('body').hasClass(self.ALLOW_SWIPE_CLASS) && !$(this).hasClass(self.NEXT_CLASS)) {
	            $('body').removeClass(self.ALLOW_SWIPE_CLASS);
	            var bodyTimer = setTimeout(function() {
	                $('body').addClass(self.ALLOW_SWIPE_CLASS);
	            }, 2000);
	
	            $('#scene-lab', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	            $('#scene-xray', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	        } else if ($('body').hasClass(self.ALLOW_SWIPE_CLASS) && $(this).hasClass(self.NEXT_CLASS)) {
	            $('body').removeClass(self.ALLOW_SWIPE_CLASS);
	            var bodyTimer = setTimeout(function() {
	                $('body').addClass(self.ALLOW_SWIPE_CLASS);
	            }, 2000);
	
	            $('#scene-lab', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	            $('#scene-xray', self.el).css({
	                '-webkit-transition-delay': '0s',
	                '-webkit-transform': 'translateX(0%)'
	            });
	        }*/
	    });
              
        return this;
	},
	// ----------------- playAudioUnique
    playAudioUnique: function() {
	    var self = this;
	    //setTimeout(function(){
		main.router.mainView.storyView.audio_el.get(0).play();
		setTimeout(function(){
			 if(!self.can_play_sound) main.router.mainView.storyView.audio_el.get(0).pause();
		}, 1500);

		//}, 2500);
    }, 
	// ----------------- beforePosize
    beforePosize: function() {
	},
	// ----------------- beforeDeactivate
    beforeDeactivate: function() {
    },
	// ----------------- beginAnimation
    beginAnimation: function() {
	    var self = this;
	     $('#scene-lab', this.el).addClass(this.ANIMATE_CLASS);
	},
    // ----------------- transitionOut
    transitionOut: function() {
		var self = this;
		
		 var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	     }, 5000);
		
		if(!$('#scene-lab', self.el).hasClass(self.NEXT_CLASS)){
            clearTimeout(this.trasitionTimeout);
            clearTimeout(this.endTimeout);
			this.transitionTimeout = setTimeout(function(){
				$(self.el).trigger(self.NEXT);
				$('#scene-lab', self.el).addClass(self.NEXT_CLASS);
			}, 200);
		    $(self.el).css('zIndex', self.BASE_Z_INDEX);
		    //after transition end
	        //set to display none
	       this.endTimeout = setTimeout(function(){
		        $(self.el).css('display', 'none');
		   }, 5500);
		}
    },
    // ----------------- transitionOut
    transitionBack: function() {
    }
});