// _________________________________________________________________________ SceneSwipeInstructionView
main.views.castle.mobile.SceneSwipeInstructionView = main.views.castle.mobile.SceneView.extend({
	STAGE_TOP: "stage-top",
	INFO_TRANS_CLASS: "info-transition",
	ANIM_OFFSET: 60,
	name: "scene-swipe-instruction",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneSwipeInstructionView ---- initialize");

        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- playAudioUnique
    playAudioUnique: function() {
	    var self = this;
	   // setTimeout(function(){
			 main.router.mainView.storyView.audio_el.get(0).play();
			 setTimeout(function(){
				 if(!self.can_play_sound) main.router.mainView.storyView.audio_el.get(0).pause();
			 }, 1500);
		//}, 100);
    }, 
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneSwipeInstructionView ----bfore render");
        var self = this;
        $(this.el).html(this.template());
        $(this.el).addClass(this.SCENE_TRANSITION_CLASS);
        $(this.el).addClass(this.STAGE_CENTER);
        this.swipe_instructions_el = $('#swipe-instructions', this.el);
        this.swipe_instructions_el.css('opacity', '0');
        this.swipe_instructions_el.css('bottom', String(-this.ANIM_OFFSET) + 'px');
        this.swipe_instructions_el.addClass(this.INFO_TRANS_CLASS);
        //Hammer.defaults.behavior.touchAction = 'pan-y';
       // var myCustomBehavior = Hammer.utils.extend({}, Hammer.defaults.behavior);
		//myCustomBehavior.touchAction = 'pan-y';

        $('#scene-swipe-instruction', self.el).swipeleft( function(event){
        	//!!!!!!!!!!!!!!
        	//thi should donly be able to be called once
        	//!!!!!!!!!!!
        	 if ($('body').hasClass(self.ALLOW_SWIPE_CLASS)) {
	        	 self.playAudio();
		         self.deactivate();
	         }
	    });
	    
	    //}, 100);
        return this;
	},
	// ----------------- show
    show: function() {
	    this.beginAnimation();
    },
    // ----------------- beginAnimation
    beginAnimation: function() {
	    var self = this;
	    setTimeout(function(){
		    //fade in and move up the content
		    self.swipe_instructions_el.css('opacity', '1');
		    self.swipe_instructions_el.css('bottom', '0');
	    }, 300);
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
	    clearTimeout(this.transitionTimeout);
	    var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	    }, 1000);

	    //add the next class to 
	    //move up
	    this.transitionTimeout = setTimeout(function(){
		    $(self.el).removeClass(self.STAGE_CENTER);
		   	$(self.el).addClass(self.STAGE_TOP);
		   self.removeTimeout = setTimeout(function(){
		        //on comolete
		   	    //display none
			    $(self.el).css('display', 'none');
		   }, 2000);
		   	
	   	}, 200);
	   	
        $(self.el).trigger(self.NEXT);
    }
});