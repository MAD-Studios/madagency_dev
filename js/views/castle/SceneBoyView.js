// _________________________________________________________________________ SceneBoyView
main.views.castle.SceneBoyView = main.views.castle.SceneView.extend({
	FADE_CLASS: "fade-fast",
	FADE_SLOW_CLASS: "fade-slow",
	ANIMATE_CLASS: "animate",
	EXIT_CLICK: "exit_click",
	TOP_Z_INDEX: 999,
	ANIM_OFFSET: 40,
	name: "scene-boy",
	answer: "",
	exp_screen_is_shown: false,
	responseModel: {},
	events:{
		'click #btn-different-answer': 'onBtnDifferentAnswerClick'
		//'click #btn-exit': 'onBtnExitClick'
	},
    // ----------------- initialize
    initialize: function() {
        console.log("SceneBoyView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneBoyView ---- render");
        $(this.el).html(this.template());
        var self = this;
        //set the text of the answer
        this.answer_el = $('#answer', this.el);
        this.cta_container_el = $('#cta-ctn', this.el);
        //add fade class
		this.answer_el.addClass(this.FADE_CLASS);
		
		this.setResponseModel();
		
		setTimeout(function(){
	        self.setAnswer();
	        self.prepareForAnimation();
        }, 100);
        return this;
	},
	// ----------------- setModel
    setResponseModel: function() {
    	 //this.responseModel = main.router.responseGeneratorModel;
	     this.answers = main.router.responseGeneratorModel.get("answers");
    },
	// ----------------- beforePosize
    beforePosize: function() {
        console.log("SceneBoyView ---- beforePosize");
        var self = this;
        //set the cneter of the scene to the 
        //center of the castle parts
        setTimeout(function(){
	        var origin_x = parseInt($('.scene-boy-ctn', self.el).css('right')) + ($('.scene-boy-ctn', self.el).outerWidth()*0.45);
	        $('#scene-boy', self.el).css({webkitTransformOrigin:  origin_x + 'px 88%',
									         mozTransformOrigin:  origin_x + 'px 88%',
									         msTransformOrigin:  origin_x + 'px 88%',
									         oTransformOrigin:  origin_x + 'px 88%',
									         transformOrigin:  origin_x + 'px 88%' });
		}, 200);
	},
	// ----------------- prepareForAnimation
	prepareForAnimation:function(){
		//Explanation Screen Info
		//set to default pos + offset
		//
	},
	// ----------------- generateQuestion
	generateAnswer:function(){
		//generate a random number
		//between 0 and num questions
		var rand = Math.floor(Math.random()*this.answers.length);
		return this.answers[rand];
	},
	// ----------------- changeAnswer
	changeAnswer:function(){
		var self = this;
		this.hideAnswer();
		setTimeout(function(){
			//generate new answer
			self.setAnswer();
			//showAnswer
			self.showAnswer();
		}, 400);
	},
	// ----------------- setAnswer
	setAnswer:function(){
	    this.answer = this.generateAnswer();
		//set opacity to 0
        this.answer_el.html(this.answer);
        //also update the model 
        //so that you can send  the answer for reference
        //if the user sends a contact email
        main.router.responseGeneratorModel.set({current_answer: this.answer});
	},
	// ----------------- hideAnswer
	hideAnswer:function(){
		//set opacity to 0
		this.answer_el.css('opacity', '0');
	},
	// ----------------- showAnswer
	showAnswer:function(){
		//set opacity to 1
		this.answer_el.css('opacity', '1');
	},
	// ----------------- showAnswerScreen
	showAnswerScreen: function(){
		if(!this.exp_screen_is_shown) this.cta_container_el.addClass(this.ANIMATE_CLASS);
	},
	// ----------------- hideAnswerScreen
	hideAnswerScreen: function(){
		this.cta_container_el = $('#cta-ctn', this.el);
		this.cta_container_el.addClass(this.FADE_CLASS);
		//cta container
		this.cta_container_el.removeClass(this.ANIMATE_CLASS);
		this.cta_container_el.css('zIndex', this.TOP_Z_INDEX-1);
	},
	// ----------------- showExplanationScreen
	showExplanationScreen: function(){
		var self = this;
		this.exp_screen_is_shown = true;
		//first hide the first cta container
		this.hideAnswerScreen();
		//set display to block;
		this.cta_final_container_el = $('#cta-final-ctn', this.el);
		this.cta_final_container_el.css('opacity', '0'); 
		this.cta_final_container_el.css('display', 'block');
		this.cta_final_container_el.addClass(this.FADE_SLOW_CLASS);
		
		this.sub_text_el = $('.sub-text', this.cta_final_container_el);
		this.sub_text_el.css('opacity', '0');
		this.h1_el = $('h1', this.cta_final_container_el);
		this.h1_el.css('opacity', '0');
		this.btn_el = $('.button-ctn', this.cta_final_container_el);
		this.btn_el.css('opacity', '0');
		
		setTimeout(function(){
			//fade in 
			self.cta_final_container_el.css('opacity', '1');
			self.cta_final_container_el.css('zIndex', self.TOP_Z_INDEX);
			//then show the info
			//set z-index above the last
			self.showExplanationInfo();
		}, 100);
	},
	// ----------------- showExplanationInfo
	showExplanationInfo: function(){
		var self = this;
		this.sub_text_el.css('opacity', '0');
		this.sub_text_el.addClass(this.FADE_CLASS);
		this.h1_el.css('opacity', '0');
		this.h1_el.addClass(this.FADE_CLASS);
		this.btn_el.css('opacity', '0');
		this.btn_el.addClass(this.FADE_CLASS);
		//settimeout
		//to wait for faede in to nearly finish
		setTimeout(function(){
			//fade in h1
			self.h1_el.css('opacity', '1');
			setTimeout(function(){
				//fade in sub-text
				self.sub_text_el.css('opacity', '1');
				setTimeout(function(){
					//fade in button
					self.btn_el.css('opacity', '1');
				}, 60);
			}, 200);		
		}, 500);
	},
	// ----------------- removeExplanationScreen
	removeExplanationScreen: function(){
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
	},
	// ----------------- onBtnDifferentAnswerClick
	onBtnDifferentAnswerClick: function(){
		//this.changeAnswer();
		//show transition screen instead 
		this.showExplanationScreen();
		return false;
	}/*,
	// ----------------- onBtnExitClick
	onBtnExitClick: function(){
		$(this.el).trigger(this.EXIT_CLICK);
		return false;
	}*/
});