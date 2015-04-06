// _________________________________________________________________________ CastleGatewayPaneView
main.views.castle.CastleGatewayPaneView = main.views.PaneView.extend({
    ELEMENT_TRANS_CLASS: ".element-trans",
    LAST_ELEMENT_TRANS_CLASS: ".last-element-trans",
	INPUT_BLINK_TRANS_CLASS: "input-blink-trans",
	INPUT_DULL_CLASS: "input-dull",
    ELEMENT_ANIM_OFFSET: 300,
    LAST_ELEMENT_ANIM_OFFSET: 900,
	UNSUPPOSRTED_CLASS: "unsupported-browser",
	SUBMIT: "submit",
	IDLE: "idle",
	UNSUPPORTED_H1_COPY: "We noticed you aren’t running at full optimization",
	UNSUPPORTED_P_COPY: 'We recommend you upgrade your browser to the latest version of Safari or <a href="https://www.google.com/intl/en_US/chrome/browser/">Chrome</a>.',
	MAX_INPUT_PLACEHOLDER_CHARS: 45,
	//time to wait before auto 
	//going into the story view
	INPUT_ALERT_START_TIME: 4000,
	IDLE_START_TIME: 60000,
	//PREPEND_PLACEHOLDER_STR: "Example: ",
	PREPEND_PLACEHOLDER_STR: "",
	id: "method",
	_route: "",
	offset: 0,
	questions: [],
	//default_h1_top: 0,
	//default_p_top: 0,
	//default_input_cta_top: 0,
    default_elements_y: [],
	blink_i: 0,
	to_y: 0,
	events:{
		'click .btn-ask': 'onBtnAskClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("CastleGatewayPaneView ---- initialize"); 
        var self = this;
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("CastleGatewayPaneView ---- beforeRender");
        var self = this;
        //this.h1_el = $('h1', this.el);
	    //this.p_el = $('p', this.el);
	    this.input_cnt_el = $('.input-w-btn-container', this.el);
	    this.input_cnt_el.addClass(this.INPUT_BLINK_TRANS_CLASS);
	    this.input_el = $('.input-method', this.el);
	    this.input_ta_el = $('.input-ta-method', this.el);
	    this.content_el = $('.row-content', this.el);
	    this.content_el.css('opacity', '0');
	    //this.to_y = 0;
        this.initElements();
        setTimeout(function(){ 
            self.posElements();
	        //self.default_h1_top = parseInt(self.h1_el.css('top'));
	        //self.default_p_top = parseInt(self.p_el.css('top')); 
	        //self.default_input_cta_top = parseInt(self.input_cnt_el.css('top'));   
	        self.model = main.responseGeneratorModel;
	        self.questions = self.model.get("questions");
	        self.setQuestionPlaceholder();
        }, 100);
        
        $('.input', this.el).each(function(){
           $(this).keyup(function(event){
                if(event.keyCode == 13){
                    self.submit();
                }
            });
            $(this).focus(function(event){
                self.unsetInputAlertTimer();
            });
            $(this).blur(function(event){
                self.setInputAlertTimer();
            });
        });
  	},
    // ----------------- initElements
    initElements: function() {
        $('.row-absolute', this.el).each(function(){
            $(this).css('opacity', '0');
        });
    },
    // ----------------- saveElementsPos
    posElements: function() {
        var self = this;
        var last_h = 0, padding = 0;
        this.to_y = 0;
        var input_to_left, ta_to_left = 0;
        $('.row-absolute', this.el).each(function(){
            //grab all row absolutes
            //and sset their positions by height of 
            //content above
            $(this).css({ transform: 'translate3d(0,' + self.to_y + 'px, 0)',
						 MozTransform: 'translate3d(0,' + self.to_y + 'px, 0)',
						 WebkitTransform: 'translate3d(0,' + self.to_y + 'px, 0)',
						 OTransform: 'translate3d(0,' + self.to_y + 'px, 0)',
						 msTransform: 'translate3d(0,' + self.to_y + 'px, 0)'});
						 
			$(this).css('opacity', '1');
			self.default_elements_y.push(self.to_y);

			if($(this).css('display') != 'none') last_h = $(this).children().eq(0).outerHeight();
			else last_h = 0;

			if(last_h > 0) padding = parseInt($(this).css('paddingBottom'));
			else padding = 0;
			self.to_y += (last_h + padding);
        });
        
        //center the input container within its row
        $('.input-w-btn-container',  this.el).each(function(){
	        input_to_left = ($(this).parent().outerWidth() - $(this).outerWidth())/2; 
			$(this).css('left', input_to_left + 'px');
        });
    },
	// ----------------- setIdleTimer
    setIdleTimer: function() {
	    var self = this;
	    this.idleTimeout = setTimeout(function(){
		    //trigger the idle event
		    $(self.el).trigger(self.IDLE);
	    }, this.IDLE_START_TIME);
    },
    // ----------------- unsetIdleTimer
    unsetIdleTimer: function() {
	    clearTimeout(this.idleTimeout);
    },
    // ----------------- setInputAlertTimer
    setInputAlertTimer: function() {
	    var self = this;
	    this.inputAlertTimeout = setTimeout(function(){
		    self.beginInputAlert();
	    }, this.INPUT_ALERT_START_TIME);
    },
    // ----------------- unsetImputAlertTimer
    unsetInputAlertTimer: function() {
	    clearTimeout(this.inputAlertTimeout);
	    clearTimeout(this.blinkTimeout);
	    this.input_cnt_el.removeClass(this.INPUT_DULL_CLASS);
    },
    // ----------------- beginInputAlert
    beginInputAlert: function() {
	    this.blinkInput();
    },
    // ----------------- blinkInput
    blinkInput: function() {
	    var self = this;
	    var delay = 1400;
	    //begin repetative 
	    //blinking of input box
	    //blink three times quickly then 
	    //wait about one minute and
	    //blinking three times again
	    //fadeout 
	    //and scale down
	    this.input_cnt_el.addClass(this.INPUT_DULL_CLASS);
	    //setTimeout
	    this.blinkDefaultTimeout = setTimeout(function(){
		    //fadein 
		    //and scale up
		    self.input_cnt_el.removeClass(self.INPUT_DULL_CLASS);
	    }, 650);
	    
	    this.blink_i++;
	    //if just blinked three times
	    //set a longer timeout
	    //to call this method again
	   	if(this.blink_i%8 == 0){
		   delay = 5000; 
	    }
	    //if still blinking three times
	    //use the default shorter timeout
	    //to call this method again
	   this.blinkTimeout = setTimeout(function(){
		   self.blinkInput();
	   }, delay);	    
	    
    },
	// ----------------- beforeActivate
    beforeActivate: function() {
	    //this.setIdleTimer();
	    this.setInputAlertTimer();
	},
	// ----------------- beforeActivate
    beforeDeactivate: function() {
	    //this.unsetIdleTimer();
	    this.unsetInputAlertTimer();
    },
    // ----------------- beforePosize
    beforePosize: function() {
	    this.posElements();
	    this.content_el.css('opacity', '1');
    	
    	//also set the height of the 
    	//content Element
    	var to_margin_top = ($(this.el).outerHeight() - this.to_y)/2.1;
    	
	    //position content to be nearly centered
	    //var to_margin_top = ($(this.el).outerHeight() - $('.row-content', this.el).outerHeight())/2;
	    //b/c content is abs positioned we need to set the height
	    this.content_el.css('margin-top', to_margin_top + 'px');
    },
	// ----------------- setQuestionPlaceholder
	setQuestionPlaceholder:function(){
		var quest = this.generateQuestion();
		quest = this.PREPEND_PLACEHOLDER_STR + quest;
		quest = this.shortenPlaceholder(quest);
		//set the input placeholder to the 
		//generated question
		/*this.input_el.attr('placeholder', quest);
		this.input_ta_el.attr('placeholder', quest);*/
        $('.input', this.el).each(function(){
            $(this).attr('placeholder', quest);
        });
    },
	// ----------------- generateQuestion
	generateQuestion:function(){
		//generate a random number
		//between 0 and num questions
		var rand = Math.floor(Math.random()*this.questions.length);
		return this.questions[rand];
	},
	// ----------------- shortenPlaceholder
	shortenPlaceholder:function(str){
		var slice_char;
		//if str is longer than  MAX_INPUT_PLACEHOLDER_CHARS
		//shorten it 
		if( str.length > this.MAX_INPUT_PLACEHOLDER_CHARS ){
			str = str.slice(0, this.MAX_INPUT_PLACEHOLDER_CHARS-1);
			//if the last char is not the end of a word
			slice_char = str.lastIndexOf(" ");
			if(str.lastIndexOf(",") == (slice_char-1)) slice_char = str.lastIndexOf(",");
			
			//find the last end of word
			if(slice_char > -1) str = str.slice(0, slice_char);
			str = str + "...";
		}
		return str;
	},
	// ----------------- submit
	submit:function(){
		this.model.set({current_question: this.input_el.val()});
		//send them into 
		//the story
		$(this.el).trigger(this.SUBMIT);
		//also update the model 
        //so that you can send the question for reference
        //if the user sends a contact email
	},
	// ----------------- beginHide
    beginHide: function() {
	    ////movethe h1 up
	    /*this.h1_el.addClass(this.H1_TRANS_CLASS);
	    this.p_el.addClass(this.P_TRANS_CLASS);*/
	    this.input_cnt_el.removeClass(this.INPUT_BLINK_TRANS_CLASS);
	    this.input_cnt_el.removeClass(this.INPUT_DULL_CLASS);
        //!!!!!!!!!!!!!!!!!!!!!
        
	    //this.input_cnt_el.addClass(this.INPUT_CNT_TRANS_CLASS);
	    //them move the h1 & p up
	    /*this.h1_el.css('top', (this.default_h1_top + this.H1_ANIM_OFFSET) + 'px');
	    this.h1_el.css('opacity', '0');
	    this.p_el.css('top', (this.default_p_top + this.P_ANIM_OFFSET) + 'px');
	    this.p_el.css('opacity', '0');
	    //move the input container down
	    this.input_cnt_el.css('top', (this.default_input_cta_top + (this.INPUT_CNT_ANIM_OFFSET*3)) + 'px');
	    this.input_cnt_el.css('opacity', '0');*/
    },
	// ----------------- onBtnAskClick
	onBtnAskClick: function(){
		this.submit();
		return false;
	},
	// ----------------- updateForUnsupportedBrowsers
	updateForUnsupportedBrowsers:function(){
		//set the h1 text 
		$('h1', this.el).html(this.UNSUPPORTED_H1_COPY);
		//set the p text
		$('p', this.el).html(this.UNSUPPORTED_P_COPY);
		$(this.el).addClass(this.UNSUPPOSRTED_CLASS);
		//remove the question
		$('.input-w-btn-container', this.el).remove();
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
		clearTimeout(this.inputAlertTimeout);
	    clearTimeout(this.blinkTimeout);
        //input_el
        $('.input', this.el).each(function(){
            $(this).off();
        });
	}
});