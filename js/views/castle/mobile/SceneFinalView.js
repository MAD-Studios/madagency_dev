// _________________________________________________________________________ SceneFinalView
main.views.SceneFinalView = main.views.castle.SceneView.extend({
	//EXIT_SWIPE: "exit_swipe",
	ACTIVE_Z_INDEX: 300,
	name: "scene-final",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneFinalView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneFinalView ---- render");
        var self = this;
        $(this.el).html(this.template());
        //this.finalMove = Hammer($('#scene-final', this.el));
        //this.finalMove.on('swipeleft dragleft', function() {
        $('#scene-final', this.el).on('swipeleft', function(){
	         self.deactivate();
	         //$(self.el).trigger(self.EXIT_SWIPE);
	    });
        return this;
	},
	// ----------------- showExplanation
	showExplanation: function(){
		var self = this;
		//this.exp_screen_is_shown = true;
		//first hide the first cta container
		//this.hideAnswerScreen();
		//set display to block;
		this.cta_final_container_el = $('#cta-final-container', this.el);
		this.cta_final_container_el.css('opacity', '0'); 
		this.cta_final_container_el.css('display', 'block');
		console.log("this.FADE_SLOW_CLASS = " + this.FADE_SLOW_CLASS);
		this.cta_final_container_el.addClass(this.FADE_SLOW_CLASS);
		
		this.sub_text_top_el = $('.sub-text-top', this.cta_final_container_el);
		this.sub_text_top_el.css('opacity', '0');
		this.h1_el = $('h1', this.cta_final_container_el);
		this.h1_el.css('opacity', '0');
		this.sub_text_bottom_el = $('.sub-text-bottom', this.cta_final_container_el);
		this.sub_text_bottom_el.css('opacity', '0');
		
		setTimeout(function(){
			//fade in 
			self.cta_final_container_el.css('opacity', '1');
			//self.cta_final_container_el.css('zIndex', self.TOP_Z_INDEX);
			//then show the info
			//set z-index above the last
			self.showExplanationInfo();
		}, 100);
	},
	// ----------------- showExplanationInfo
	showExplanationInfo: function(){
		var self = this;
		this.sub_text_top_el.css('opacity', '0');
		this.sub_text_top_el.addClass(this.FADE_CLASS);
		this.h1_el.css('opacity', '0');
		this.h1_el.addClass(this.FADE_CLASS);
		this.sub_text_bottom_el.css('opacity', '0');
		this.sub_text_bottom_el.addClass(this.FADE_CLASS);
		//settimeout
		//to wait for faede in to nearly finish
		setTimeout(function(){
			//fade in h1
			self.h1_el.css('opacity', '1');
			setTimeout(function(){
				//fade in sub-text
				self.sub_text_top_el.css('opacity', '1');
				setTimeout(function(){
					//fade in button
					self.sub_text_bottom_el.css('opacity', '1');
				}, 60);
			}, 200);		
		}, 500);
	},
	// ----------------- removeExplanation
	/*removeExplanation: function(){
		if(this.exp_screen_is_shown && this.cta_final_container_el && this.cta_container_el){
			this.cta_final_container_el.css('opacity', '0');
			this.cta_final_container_el.css('zIndex', this.TOP_Z_INDEX-1);
			this.cta_container_el.css('zIndex', this.TOP_Z_INDEX);
			this.sub_text_el.css('opacity', '0');
			this.h1_el.css('opacity', '0');
			this.btn_el.css('opacity', '0');
			this.exp_screen_is_shown = false;
			//this.cta_container_el.css('opacity', '1');
		}
		this.cta_container_el.removeClass(this.ANIMATE_CLASS);
	},*/
	// ----------------- beginAnimation
    beginAnimation: function() {
	     $('#scene-final', this.el).addClass(this.ANIMATE_CLASS);
	     $(this.el).css('zIndex', this.ACTIVE_Z_INDEX);
	     this.showExplanation();
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
	    //  $('#scene-final', self.el).addClass(self.NEXT_CLASS).delay(3000).queue(function() {
        $(self.el).trigger(self.NEXT);
        
        // });
        //after transition end
        //set to display none
        //$('#scene-xray', self.el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
        /*this.endTimeout = setTimeout(function(){
	        $(self.el).css('display', 'none');
        //});
        }, 5000);

        $('#xray-parts', self.el).addClass(self.ANIMATE_CLASS);
        $('#xray-parts', self.el).addClass(self.NEXT_CLASS);*/
    }
});