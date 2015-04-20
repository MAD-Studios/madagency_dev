// _________________________________________________________________________ SceneBoyView
main.views.castle.mobile.SceneBoyView = main.views.castle.mobile.SceneView.extend({
	TOP_Z_INDEX: 999,
	ANIM_OFFSET: 40,
	name: "scene-boy",
	answer: "",
	exp_screen_is_shown: false,
	events:{
		'click #btn-different-answer': 'onBtnDifferentAnswerClick',
		'click #btn-exit': 'onBtnExitClick'
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
        //this.boyMove = Hammer($('#scene-boy', this.el));
        // BOY GESTURES
	    //this.boyMove.on('swipeleft dragleft', function() {
	   $('#scene-boy', this.el).on('swipeleft', function(){
	        self.deactivate();
	    });
	    //set the text of the answer
        this.answer_el = $('#answer', this.el);
        this.cta_container_el = $('#cta-ctn', this.el);
        this.text_container_el = $('.text-ctn', self.el);
		this.text_container_el.addClass(this.STAGE_TRANSITION_CLASS);
       //$('#text-02', self.el).css('opacity', '0');
       $('#text-01', this.el).addClass(this.FADE_CLASS);
       $('#text-02', this.el).addClass(this.FADE_CLASS);
        //add fade class
		this.answer_el.addClass(this.FADE_CLASS);
		setTimeout(function(){
	        //self.model = main.router.responseGeneratorModel;
	        self.answers = main.router.responseGeneratorModel.get("answers");
	        self.setAnswer();
	        self.prepareForAnimation();
        }, 100);
        return this;
	},	
	// ----------------- prepareForAnimation
	prepareForAnimation:function(){
		//Explanation Screen Info
		//set to default pos + offset  d
	},
	// ----------------- generateQuestion
	generateAnswer:function(){
		//generate a random number
		//between 0 and num questions
		var rand = Math.floor(Math.random()*this.answers.length);
		return this.answers[rand];
		//return this.answers[5];
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
		var self =  this;
	    this.answer = this.generateAnswer();
		//set opacity to 0
        this.answer_el.html(this.answer);
        //set text container height its inner row
        //also update the model 
        //so that you can send  the answer for reference
        //if the user sends a contact email
        main.router.responseGeneratorModel.set({current_answer: this.answer});
	},
	// ----------------- onAppend
    onAppend: function() {
    },
    // ----------------- posizeAnswer
    posizeAnswer: function() {
	    var self = this;
	    setTimeout(function(){
			var min_height = parseInt(self.text_container_el.css('min-height'));
			var to_height = $('#answer', self.el).outerHeight();
			if(to_height > min_height) self.text_container_el.css('height', to_height + 'px');
		}, 100);
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
	// ----------------- beginAnimation
    beginAnimation: function() {
	     var self = this;
	     $('#scene-boy', self.el).addClass(self.ANIMATE_CLASS).delay(2500).queue(function() {
		        self.posizeAnswer();
		        
                setTimeout(function(){
	                $('#text-01', self.el).css('opacity', '0');
	            }, 1000);
                setTimeout(function(){
	                $('#text-02', self.el).css('opacity', '1');
	                $('#boy-02', self.el).css('display', 'none');
	                $('#boy-01', self.el).css({
	                    'display': 'block',
	                    '-webkit-animation': 'headTremble 0.25s',
	                    '-webkit-animation-iteration-count': '4'
	                });
                }, 1500);
         });
	},
    // ----------------- transitionOut
    transitionOut: function() {
	    var self = this;
	     var bodyTimer = setTimeout(function() {
	         $('body').addClass(self.ALLOW_SWIPE_CLASS);
	    }, 1000);
	    
         $(this.el).css('zIndex', this.BASE_Z_INDEX);
         this.transitionTimeout = setTimeout(function(){
				$(self.el).trigger(self.NEXT);
				$('#scene-lab', self.el).addClass(self.NEXT_CLASS);
		}, 200);
	},
	// ----------------- beforeDisposeUnique
    beforeDisposeUnique: function() {
	    var self = this;
	     this.boyMove.off('swipeleft dragleft', function() {
	        self.deactivate();
	    });
    }
});