// _________________________________________________________________________ LoaderView
main.castle.views.LoaderView = Backbone.View.extend({
	GOLD_GRAD_TRANS_CLASS: "gradient-transition",
	GOLD_GRAD_TRANS_CLASS_OUT: "gradient-transition-out",
	INFO_TRANS_CLASS: "info-transition",
	FADE_CLASS: "fade-fast",
	LOAD_RATIO_TRANS_CLASS: "loaded-ratio-indicator-transition",
	STATE_TOP: "state_top",
	STATE_BOTTOM: "state_bottom",
	STATE_STAGE: "state_stage",
	STATE_TOTAL: "state_total",
	IS_COVERING: "is_covering",
    TOTAL_HIDE_BG: "total_hide_bg",
	INFO_ANIM_OFFSET: 40,
	is_stopped: false,
	view_state: "",
	info_default_y_arr: [],
	show_info_incr: 0,
	rainbow_cache: [],
	basic_anim_is_complete: false,
	override_is_stoppped: false,
	num_rainbows_generated: 0,
	loadedRatioIndicator_defY: 0,
	ratio_indicator_num_letters: 0,
	actual_ratio_indicator_num_letters: 0,
	min_ratio_update_dealy: 100,
	cur_ratio_update_delay: 60,
	ratio_indicator_is_hidden: false,
	loaded_ratio_indicator_copy: "weeeeeeeeeeeeeeeeeeeeeeeeeeee",
	info: [
		"<p>It will be just one moment while we clean our Creative Castle for our very special guest.</p>",
		"<p>(That’s YOU!)</p>",
		"<p>Look.</p>",
		"<p>Even unicorns are involved.</p>",
		"<p>It will be just one moment while we clean our Creative Castle for our very special guest.</p>"
	],
    // ----------------- initialize
    initialize: function() {
        console.log("LoaderView ---- initialize");
         $(this.el).css('visibility', 'hidden');
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("LoaderView ---- render");
        this.initModel();
        //add the large yellow gradient
        this.createBG();
        this.createLoaderInfo();
        this.createReadyMsg();
        this.prepareForAnimation();
        this.view_state = this.STATE_BOTTOM;
        return this;
	},
	// ----------------- initModel
    initModel: function() {
            console.log("LoaderView ---- initModel");
	    var self = this;
	    //when the model's loaded ratio changes
	    //update the loaded ratio indicator
		this.model.on('change:loadedRatio', function(){
	        self.updateRatioIndicator();
        });
    },
	// ----------------- createBG
    createBG: function() {
	    this.rainbowContainer_el = $('<div class="rainbow-container"></div>');
	    $(this.el).append(this.rainbowContainer_el);
	    this.goldGrad_el = $('<div class="gradient"></div>');
	    this.goldGrad_el_top = $('<div class="top"></div>');
	    this.goldGrad_el_bottom = $('<div class="bottom"></div>');
	    this.goldGrad_el.append(this.goldGrad_el_top);
	    this.goldGrad_el.append(this.goldGrad_el_bottom);
	    $(this.el).append(this.goldGrad_el);
    },
    // ----------------- createReadyMsg
    createReadyMsg: function() {
	    this.readyMsgCnt_el = $('<div class="ready-msg-cnt"></div>');
	    this.readyMsg_el = $('<div class="ready-msg"><h1>READY<h1></div>');
	    this.readyMsgCnt_el.append(this.readyMsg_el);
	    $(this.el).append(this.readyMsgCnt_el);
	    this.readyMsgCnt_el.css('visibilty', 'hidden');
	    this.readyMsg_el.css('opacity', '0');
	    this.readyMsg_el.addClass(this.INFO_TRANS_CLASS);
    },
    // ----------------- createLoaderInfo
    createLoaderInfo: function() {
	    //create a container for the 
	    //loaded ratio indicator
	    this.loaderInfoContainer = $('<div class="loader-info-container"></div>');
	    $(this.el).append(this.loaderInfoContainer);
	    //create the loaded ratio indicator
	    //loaded_ratio_indicator_copy
	    this.createRatioIndicator();
	    this.createInfo();
	    
	    //position info at the center x
	    var to_x = ($(window).width() - this.loaderInfoContainer.outerWidth())/2;
	    //and at 2/3 y
	    var to_y = ($(window).height() - this.loaderInfoContainer.outerHeight())/2;
	    this.loaderInfoContainer.css('top', to_y + 'px');
	    this.loaderInfoContainer.css('left', to_x + 'px');
	    this.loaderInfoContainer.css('visibility', 'hidden');
	},
	// ----------------- createRatioIndicator
    createRatioIndicator: function() {
	    this.loadedRatioIndicator = $('<div class="loaded-ratio-indicator"></div>');
	    this.loadedRatioIndicatorTextContainer = $('<div class="loaded-ratio-indicator-text-cta"></div>');
	    this.loadedRatioIndicator.append(this.loadedRatioIndicatorTextContainer);
	    this.loadedRatioIndicatorActivityIndicator = $('<div class="activity-indicator"></div>');
	    this.loadedRatioIndicator.append(this.loadedRatioIndicatorActivityIndicator);
	    this.loadedRatioIndicatorActivityIndicator.activity({segments: 8, width:3, space: 0, length: 5, color: '#333e48', valign:'top', align:'left', padding:17});
	    var to_x = (this.loaderInfoContainer.outerWidth() - this.loadedRatioIndicator.outerWidth())/2;
		this.loadedRatioIndicator.css('left', to_x + 'px');
	    this.loadedRatioIndicator.css('visibilty', 'hidden');
	    this.loadedRatioIndicator.css('opacity', '0');
	    this.loaderInfoContainer.append(this.loadedRatioIndicator);
	    this.loadedRatioIndicator.addClass(this.INFO_TRANS_CLASS);
    },
    // ----------------- updateRatioIndicator
    updateRatioIndicator: function() {
	    //need to slow the 
	    //indicator down when data is cached
	    //save the current time
	    //if current time - last_ratio_update_time
	    //is less than minimum time to update again
	    //min_ratio_update_dealy
	    var delay = 60;
	    var date = new Date();
	    this.current_time = date.getTime();
	    if( (this.current_time-this.last_ratio_update_time) < this.min_ratio_update_dealy ){
		    this.cur_ratio_update_delay += 100;
		    delay = this.cur_ratio_update_delay;
	    }
	    this.last_ratio_update_time = this.current_time;
	    //show the ratio of letters
	    //that matches the ratio
	    //of assets loaded
	    var self = this;
	    var add_letter_start, add_letter_end, letter_el, to_x;
        var total_num_letters = self.loaded_ratio_indicator_copy.length;
        var num_letters_to_show = Math.floor(self.model.get("loadedRatio")*total_num_letters);
        if(self.ratio_indicator_num_letters < num_letters_to_show){
            //create an el for each letter that needs 
            //to be shown 
            add_letter_start = self.ratio_indicator_num_letters;
            add_letter_end = num_letters_to_show;
        }
        for(var i=add_letter_start;i<add_letter_end;i++){
            //create a new letter container el
            letter_el = $('<h1>' + this.loaded_ratio_indicator_copy.charAt(i) + '</h1>');
            letter_el.css('opacity', '0');
            //add the transition class
            letter_el.addClass(this.FADE_CLASS);
            this.addLetter(letter_el, delay);
            if(this.model.get("loadedRatio") == 1){
                this.loadedRatioIndicatorActivityIndicator.remove();
            }
        }
        self.ratio_indicator_num_letters = num_letters_to_show;
    },
    // ----------------- addLetter
    addLetter: function(letter_el, delay) {
         var self = this;
         var to_x;
         setTimeout(function(){
            if(!self.ratio_indicator_is_hidden){
                self.loadedRatioIndicatorTextContainer.append(letter_el);
                //and center the ratio indicator
                //after each add
                to_x = (self.loaderInfoContainer.outerWidth() - self.loadedRatioIndicator.outerWidth())/2;
                self.loadedRatioIndicator.css('left', to_x + 'px');
                letter_el.css('opacity', '1');
                self.actual_ratio_indicator_num_letters = self.loadedRatioIndicatorTextContainer.children().length;
           }
        }, delay);
    },
    // ----------------- createInfo
    createInfo: function() {
	    this.infoContainer = $('<div class="info-container"></div>');
	    this.loaderInfoContainer.append(this.infoContainer);
	    var info_el, to_y;
	    this.next_y = 0;
	    //create each info line
	    for(var i=0;i<this.info.length;i++){
	    	info_el = $('<div class="info">' + this.info[i] + '</div>');
	    	this.infoContainer.append(info_el);
	    	info_el.css('opacity', '0');
	    	to_y = this.next_y;
	    	this.next_y = to_y + info_el.outerHeight();
	    	info_el.css({transform: 'translate3d(0,' + (to_y + this.INFO_ANIM_OFFSET) + 'px, 0)',
						 MozTransform: 'translate3d(0,' + (to_y + this.INFO_ANIM_OFFSET) + 'px, 0)',
						 WebkitTransform: 'translate3d(0,' + (to_y + this.INFO_ANIM_OFFSET) + 'px, 0)',
						 OTransform: 'translate3d(0,' + (to_y + this.INFO_ANIM_OFFSET) + 'px, 0)',
						 msTransform: 'translate3d(0,' + (to_y + this.INFO_ANIM_OFFSET) + 'px, 0)'});
			info_el.addClass(this.INFO_TRANS_CLASS);
	    	this.info_default_y_arr.push(to_y);
	    }
	    //position it below the 
	    // ratio indicator
	    var to_y = this.loadedRatioIndicator.outerHeight();
	    this.infoContainer.css('top', to_y + 'px');
    },
    // ----------------- posize
    posize: function() {
	    var to_height = parseInt($(window).height()*(0.7));
	    this.goldGrad_el_top.css('height', to_height + 'px');
	    to_height = $(window).height()*1;
	    //set goldGrad_el_bottom height to window height
	    this.goldGrad_el_bottom.css('height', to_height + 'px');
	    
	    var to_y = $(window).height() - this.goldGrad_el_top.outerHeight();
	    if(this.view_state == this.STATE_BOTTOM){
		    var to_y = $(window).height();
		    var to_x = 0;
		    this.goldGrad_el.css({transform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  MozTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  WebkitTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  Oransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  msTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)'});
	    }
	    else if(this.view_state == this.STATE_STAGE){
	    	to_y = $(window).height() - this.goldGrad_el_top.outerHeight();
		    this.goldGrad_el.css({transform: 'translateY('+ to_y + 'px)',
							  MozTransform: 'translateY('+ to_y + 'px)',
							  WebkitTransform: 'translateY('+ to_y + 'px)',
							  OTransform: 'translateY('+ to_y + 'px)',
							  msTransform: 'translateY('+ to_y + 'px)'});
		}
		//update height of the rainbow container
		to_height = $(window).height()*(2/3);
		this.rainbowContainer_el.css('height', to_height + 'px');
		//position info at the center x
	    var to_x = ($(window).width() - this.loaderInfoContainer.outerWidth())/2;
	    //and at 2/3 y
	    //to_y = ($(window).height())*(0.4);
	    to_y = ($(window).height() - this.loaderInfoContainer.outerHeight())/2;
	    this.loaderInfoContainer.css('top', to_y + 'px');
	    this.loaderInfoContainer.css('left', to_x + 'px');
	    
	    //position the ready-msg-cnt in the center
	    to_y = ($(window).height() - this.readyMsgCnt_el.outerHeight())/2;
	    to_x = ($(window).width() - this.readyMsgCnt_el.outerWidth())/2;
	    this.readyMsgCnt_el.css({transform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  MozTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  WebkitTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  Oransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
							  msTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)'});
	},
	// ----------------- startLoader
    startLoader: function() {
	    //if already stopped 
	    //need to override this
	    if(this.is_stopped) this.override_is_stoppped = true;
	    var self = this;
	 	self.generateRainbows();
		this.is_stopped = false;
    },
     // ----------------- stopLoader
    stopLoader: function() {
	    var self = this;
	    //clear the generate rainbow timer
	    //if basic loader hasn't
	    //played out
	    if(!this.is_stopped){
		    if(this.basic_anim_is_complete){
			    this.completeStopLoader();
		    }
	    }
	    this.is_stopped = true;
	},
    // ----------------- completeStopLoader
    completeStopLoader: function() {
    	var self = this;
    	this.is_stopped = true;
	    //fade out the text
	    //stetImeout to 
	    //move the gold bg up
	    setTimeout(function(){
	    	self.hideLoaderInfo();
		    setTimeout(function(){
		    	self.showReadyMsg();
			    self.hideBg();
			    self.override_is_stoppped = false;
	    	}, 900);
		}, 500);
    },
    // ----------------- show
    show: function() {
    	$(this.el).css('visibility', 'visible');
	    //set to visible
	     this.animateBg();
    	 this.showLoaderInfo();
    },
    // ----------------- hide
    hide: function() {
    	//move the gradient off the screen
	    this.totalHideBg();
    },
    // ----------------- show
    showReadyMsg: function() {
	    var self = this;
	    //setTimeout(function(){
	    	self.readyMsgCnt_el.css('visibility', 'visible');
	    	//move in and fade in
			var to_y = 0;
			self.readyMsg_el.css({transform: 'translateY('+ to_y + 'px)',
							  MozTransform: 'translateY('+ to_y + 'px)',
							  WebkitTransform: 'translateY('+ to_y + 'px)',
							  OTransform: 'translateY('+ to_y + 'px)',
							  msTransform: 'translateY('+ to_y + 'px)'});
			self.readyMsg_el.css('opacity', '1');
		//}, 200);
    },
    // ----------------- hideReadyMsg
    hideReadyMsg: function() {
    	//move in and fade in
		var to_y = -(this.INFO_ANIM_OFFSET);
		this.readyMsg_el.css({transform: 'translateY('+ to_y + 'px)',
						  MozTransform: 'translateY('+ to_y + 'px)',
						  WebkitTransform: 'translateY('+ to_y + 'px)',
						  OTransform: 'translateY('+ to_y + 'px)',
						  msTransform: 'translateY('+ to_y + 'px)'});
		this.readyMsg_el.css('opacity', '0');
    },
    // ----------------- hideLoaderInfo
    hideLoaderInfo: function() {
	    var self = this;
    	this.hideLoaderRatioIndicator();
    	setTimeout(function(){
	    	self.hideInfo();
    	}, 300);
	},
    // ----------------- showLoaderInfo
    showLoaderInfo: function() {
    	var self = this;
	    //initialize the ratio indicator
	    this.initLoaderRatioIndicator();
	     //set a delay to show the 
	    //info lines
	    setTimeout(function(){
		    self.showInfo();
	    }, 500);
    },
    // ----------------- initLoaderRatioIndicator
    initLoaderRatioIndicator: function() {
    	//begin the ratio indicator
	    //and show it
    	this.showLoaderRatioIndicator();
    },
    // ----------------- hideLoaderRatioIndicator
    hideLoaderRatioIndicator: function() {
    	 //clearTimeout(this.upadteRatioIndicatorTimeout);
    	 this.ratio_indicator_is_hidden = true;
	    //if full ratio indicator is not shown
	    //add all letter els and show them immediately 
	    //clear any timeouts for the individual showing
	    //of the letters
	    var self = this;
	    var add_letter_start = 0; 
	    var add_letter_end = 0;
	    var letter_el, to_x;
	    var num_letters_to_show = this.loaded_ratio_indicator_copy.length;
	    if(this.actual_ratio_indicator_num_letters < num_letters_to_show){
		    //create an el for each letter that needs 
		    //to be shown 
		    add_letter_start = this.actual_ratio_indicator_num_letters;
		    add_letter_end = num_letters_to_show;
	    };
	    
	    for(var i=add_letter_start;i<add_letter_end;i++){
		    //create a new letter container el
		    letter_el = $('<h1>' + this.loaded_ratio_indicator_copy.charAt(i-1) + '</h1>');
		    letter_el.css('opacity', '0');
		    self.loadedRatioIndicatorTextContainer.append(letter_el);

		    //add the tarnsition class
		    letter_el.addClass(this.FADE_CLASS);
		    
		   to_x = (self.loaderInfoContainer.outerWidth() - self.loadedRatioIndicator.outerWidth())/2;
		   self.loadedRatioIndicator.css('left', to_x + 'px');
		}
	    
	    setTimeout(function(){
		    self.loadedRatioIndicatorActivityIndicator.remove();
			for(var i=add_letter_start;i<add_letter_end;i++){
				letter_el = self.loadedRatioIndicatorTextContainer.children().eq(i);
				letter_el.css('opacity', '1');
				//self.actual_ratio_indicator_num_letters = i;
			}
			//and center the ratio indicator
			to_x = (self.loaderInfoContainer.outerWidth() - self.loadedRatioIndicator.outerWidth())/2;
			self.loadedRatioIndicator.css('left', to_x + 'px');
		}, 200);
	    
	    this.ratio_indicator_num_letters = num_letters_to_show;
	    
	    setTimeout(function(){
		    var to_y = self.loadedRatioIndicator_defY - self.INFO_ANIM_OFFSET;
			self.loadedRatioIndicator.css({transform: 'translateY('+ to_y + 'px)',
							  MozTransform: 'translateY('+ to_y + 'px)',
							  WebkitTransform: 'translateY('+ to_y + 'px)',
							  OTransform: 'translateY('+ to_y + 'px)',
							  msTransform: 'translateY('+ to_y + 'px)'});
			self.loadedRatioIndicator.css('opacity', '0');
		}, 800);
    },
    // ----------------- showLoaderRatioIndicator
    showLoaderRatioIndicator: function() {
    	//fade in and move up
    	this.loadedRatioIndicator.css('visibility', 'visible');
    	//move in and fade in
		var to_y = this.loadedRatioIndicator_defY;
		this.loadedRatioIndicator.css({transform: 'translateY('+ to_y + 'px)',
						  MozTransform: 'translateY('+ to_y + 'px)',
						  WebkitTransform: 'translateY('+ to_y + 'px)',
						  OTransform: 'translateY('+ to_y + 'px)',
						  msTransform: 'translateY('+ to_y + 'px)'});
		this.loadedRatioIndicator.css('opacity', '1');
    },
    // ----------------- hideInfo
    hideInfo: function() {
	    var self = this;
	    clearTimeout(this.showInfoTimeout);
	    var info_1 = this.infoContainer.children().eq(this.show_info_incr-1);
	    var info_2 = this.infoContainer.children().eq(this.show_info_incr);
	    var info_1_to_y = this.info_default_y_arr[1] - this.INFO_ANIM_OFFSET;
	    var info_2_to_y = this.info_default_y_arr[2] - this.INFO_ANIM_OFFSET;
	    info_1.css('opacity', '0');
	    info_1.css( {transform: 'translate3d(0,' + info_1_to_y  + 'px, 0)',
				  MozTransform: 'translate3d(0,' + info_1_to_y  + 'px, 0)',
				  WebkitTransform: 'translate3d(0,' + info_1_to_y + 'px, 0)',
				  OTransform: 'translate3d(0,' + info_1_to_y + 'px, 0)',
				  msTransform: 'translate3d(0,' + info_1_to_y + 'px, 0)'} );
		setTimeout(function(){
			  info_2.css('opacity', '0');
			  info_2.css( {transform: 'translate3d(0,' + info_2_to_y  + 'px, 0)',
				  MozTransform: 'translate3d(0,' + info_2_to_y  + 'px, 0)',
				  WebkitTransform: 'translate3d(0,' + info_2_to_y + 'px, 0)',
				  OTransform: 'translate3d(0,' + info_2_to_y + 'px, 0)',
				  msTransform: 'translate3d(0,' + info_2_to_y + 'px, 0)'} );
		}, 400);
    },
    // ----------------- showInfo
    showInfo: function() {
	    //show the info lines
	    this.loaderInfoContainer.css('visibility', 'visible');
	    //show each line
	    this.show_info_incr = 0;	    
	    this.showInfoLine();
    },
     // ----------------- showInfoLine
    showInfoLine: function() {
    	var self = this;
	    //fade in
	    //and move up the 
	    //info line
	    var to_y; 
	    var delay = 1000;
	    var info_above, info_2_above;
	    var info = this.infoContainer.children().eq(this.show_info_incr);
	    if(this.show_info_incr > 0 ) delay = 1500;
	    //on show of 4 + lines move 2nd to top line out 
	    if(this.show_info_incr < 2){
		    to_y = this.info_default_y_arr[this.show_info_incr];
		    info.css('opacity', '1');
			info.css( {transform: 'translate3d(0,' + to_y  + 'px, 0)',
					  MozTransform: 'translate3d(0,' + to_y  + 'px, 0)',
					  WebkitTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  OTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  msTransform: 'translate3d(0,' + to_y + 'px, 0)'} );
	    }
	    else{
	    	info.css('opacity', '1');
		    to_y = this.info_default_y_arr[2];
		    info.css('opacity', '1');
			info.css( {transform: 'translate3d(0,' + to_y + 'px, 0)',
					  MozTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  WebkitTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  OTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  msTransform: 'translate3d(0,' + to_y + 'px, 0)'} );
		    //get the 2 info above and 2 above
	    	info_above = this.infoContainer.children().eq(this.show_info_incr - 1);
		    to_y = this.info_default_y_arr[1];
			info_above.css( {transform: 'translate3d(0,' + to_y + 'px, 0)',
					  MozTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  WebkitTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  OTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  msTransform: 'translate3d(0,' + to_y + 'px, 0)'} );
		    info_2_above = this.infoContainer.children().eq(this.show_info_incr - 2);
		    to_y = this.info_default_y_arr[0] + 12;
		    if(this.show_info_incr == 2)  to_y = this.info_default_y_arr[0]-this.INFO_ANIM_OFFSET;
		    info_2_above.css('opacity', '0');
			info_2_above.css( {transform: 'translate3d(0,' + to_y + 'px, 0)',
					  MozTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  WebkitTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  OTransform: 'translate3d(0,' + to_y + 'px, 0)',
					  msTransform: 'translate3d(0,' + to_y + 'px, 0)'} );
		}
		if(this.show_info_incr < this.info.length){
				this.showInfoTimeout = setTimeout(function(){
					self.show_info_incr++;
					self.showInfoLine();
				}, delay);
		}
	    //setTimeout to do the next line
	},
	// ----------------- hideBg
    hideBg: function() {
	    var self = this;
    	this.view_state = this.STATE_TOP;
    	this.goldGrad_el.removeClass(this.GOLD_GRAD_TRANS_CLASS_OUT);
	    this.goldGrad_el.addClass(this.GOLD_GRAD_TRANS_CLASS);
	    var to_y = $(window).height() - this.goldGrad_el.outerHeight();
        this.goldGrad_el.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			self.goldGrad_el.off('transitionend webkitTransitionEnd oTransitionEnd');
			$(self.el).trigger(self.IS_COVERING);
		});
	    this.goldGrad_el.css({transform: 'translateY(' + to_y + 'px)',
							  MozTransform: 'translateY(' + to_y + 'px)',
							  WebkitTransform: 'translateY(' + to_y + 'px)',
							  OTransform: 'translateY(' + to_y + 'px)',
							  msTransform: 'translateY(' + to_y + 'px)'});  
     
							  
	  setTimeout(function(){
		  self.rainbowContainer_el.css('visibilty', 'hidden');
	      self.rainbowContainer_el.remove();
	      self.hideReadyMsg();
	  }, 900);
    },
    // ----------------- totalHideBg
    totalHideBg: function() {
	    var self = this;
    	this.view_state = this.STATE_TOTAL;
        $(this.el).trigger(this.TOTAL_HIDE_BG);
	    this.goldGrad_el.removeClass(this.GOLD_GRAD_TRANS_CLASS);
	    this.goldGrad_el.addClass(this.GOLD_GRAD_TRANS_CLASS_OUT);
	    var to_y = -this.goldGrad_el.outerHeight();
	    this.goldGrad_el.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			self.goldGrad_el.off('transitionend webkitTransitionEnd oTransitionEnd');
			self.totalHide();
		});
         //setTimeout(function(){
	        self.goldGrad_el.css({transform: 'translateY(' + to_y + 'px)',
	                              MozTransform: 'translateY(' + to_y + 'px)',
	                              WebkitTransform: 'translateY(' + to_y + 'px)',
	                              OTransform: 'translateY(' + to_y + 'px)',
	                              msTransform: 'translateY(' + to_y + 'px)'});
         //}, 100);
    },
    // ----------------- totalHide
    totalHide: function() {
	    $(this.el).css('visibility', 'hidden');
	    this.dispose();
    },
    // ----------------- animateBg
    animateBg: function() {
	    var self = this;
	    //move the gold gradient down
	    //to the center of the screen
	    //(as the method pain text moves up)
	    var to_y = $(window).height() - this.goldGrad_el_top.outerHeight();
	    this.goldGrad_el.css({transform: 'translateY('+ to_y + 'px)',
						  MozTransform: 'translateY('+ to_y + 'px)',
						  WebkitTransform: 'translateY('+ to_y + 'px)',
						  OTransform: 'translateY('+ to_y + 'px)',
						  msTransform: 'translateY('+ to_y + 'px)'});
		this.view_state = this.STATE_STAGE;
		//on transition end
		this.goldGrad_el.on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			self.goldGrad_el.off('transitionend webkitTransitionEnd oTransitionEnd');
			self.basic_anim_is_complete = true;
			if(self.is_stopped || self.override_is_stoppped) self.completeStopLoader();
		});
    },
    // ----------------- prepareForAnimation
    prepareForAnimation: function() {
	    //set goldGrad_el_top height to about 2/3ish of window height
	    var to_height = parseInt($(window).height()*(0.7));
	    this.goldGrad_el_top.css('height', to_height + 'px');
	    to_height = $(window).height();
	    //set goldGrad_el_bottom height to window height
	    this.goldGrad_el_bottom.css('height', to_height + 'px');
	    //move the gold gradient to the top cente
	    //of the screen
	    var to_y = $(window).height();
	    var to_x = 0;
	    this.goldGrad_el.css({transform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
						  MozTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
						  WebkitTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
						  OTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)',
						  msTransform: 'translate3d('+ to_x + 'px,' + to_y + 'px, 0)'});
		this.goldGrad_el.addClass(this.GOLD_GRAD_TRANS_CLASS_OUT);
		
		this.readyMsgCnt_el.css('visibility', 'visible');
    	//move in and fade in
		to_y = -this.INFO_ANIM_OFFSET;
		this.readyMsg_el.css({transform: 'translateY('+ to_y + 'px)',
						  MozTransform: 'translateY('+ to_y + 'px)',
						  WebkitTransform: 'translateY('+ to_y + 'px)',
						  OTransform: 'translateY('+ to_y + 'px)',
						  msTransform: 'translateY('+ to_y + 'px)'});
		//move the indicator down initailly 
	    //so that it can move in with the 
	    //info lines of the info container
	    to_y = this.loadedRatioIndicator_defY + this.INFO_ANIM_OFFSET;
	    this.loadedRatioIndicator.css({transform: 'translateY('+ to_y + 'px)',
						  MozTransform: 'translateY('+ to_y + 'px)',
						  WebkitTransform: 'translateY('+ to_y + 'px)',
						  OTransform: 'translateY('+ to_y + 'px)',
						  msTransform: 'translateY('+ to_y + 'px)'});
    },
    // ----------------- generateRainbow
    generateRainbows: function() {
	    var self = this;
	    var rainbowView, view;
	    this.num_rainbows_generated++;
	    var contain = false;
	    var rand_delay = 160 + Math.random()*600;
	    //if one of the first two lines
	    //contain them more so that 
	    //they start  near the cneter of the screen
	    if(this.num_rainbows_generated < 2){
		    contain = true; 
	    } 
	    if(this.rainbow_cache.length > 0){
		    rainbowView = this.rainbow_cache.pop();
		    if(contain) rainbowView.contain = true;
		    setTimeout(function(){
			   rainbowView.beginAnimation();
		    }, 100);
	    }  
	    else{
		   rainbowView = new main.views.RainbowView(); 
		   if(contain) rainbowView.contain = true;
		   this.rainbowContainer_el.append($(rainbowView.el));
	    } 
	    $(rainbowView.el).on(rainbowView.KILL, function(event, params){
		    $(event.currentTarget).off();
	    	view = params;
		    self.rainbow_cache.push(view);
	    });
	    //set timer with a random delay
	    //to generate the next rainbow
	    if(!this.is_stopped || this.override_is_stoppped){
		    setTimeout(function(){self.generateRainbows();}, rand_delay);
	    }
	}, 
	// ----------------- beforeDispose
    beforeDispose: function() {
    	$(this.el).off();
	    this.goldGrad_el.off();
    }
});

// _________________________________________________________________________ RainbowView
main.views.RainbowView = Backbone.View.extend({
	KILL: "kill",
	RAINBOW_SOLID_W_RANGE: {min: 0, max: 1400},
	EASE_OUT_TRANS_CLASS: "rainbow-ease-out-transition",
	EASE_IN_TRANS_CLASS: "rainbow-ease-in-transition",
	slope: 0,
	intercept: 0,
	end_y: 0,
	end_x:0,
	rot:0,
	contain: false,
	// ----------------- initialize
    initialize: function() {
        console.log("RainbowView ---- initialize");
        this.rainbow_el = $('<div class="rainbow"></div>');
	    this.el = this.rainbow_el; 
	    this.el.css('visibility', 'hidden');
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("RainbowView ---- render");
        var self = this;
        //create the unicorn & his rainbow
        setTimeout(function(){
	        self.createRainbow();
        }, 100);
        //setTimer to kill
        return this;
	},
	// ----------------- createRainbow
    createRainbow: function() {
	    var self = this;
	    var rand_solid_w = this.RAINBOW_SOLID_W_RANGE.min + parseInt(Math.random()*(this.RAINBOW_SOLID_W_RANGE.max - this.RAINBOW_SOLID_W_RANGE.min));
	    //load the rainbow parts
	    //then add them as the 
	    //bg image for each
	    this.rainbow_all_el = $('<div class="rainbow-all"></div>');
	    this.rainbow_end_el = $('<div class="rainbow-end"></div>');
	    this.rainbow_solid_el = $('<div class="rainbow-solid"></div>');
	    this.unicorn_el = $('<div class="unicorn"></div>');
	    
	    this.rainbow_solid_el.css('width', rand_solid_w + 'px');
	    
	    this.el.append(this.rainbow_all_el); 
	    this.rainbow_all_el.append(this.rainbow_end_el); 
	    this.rainbow_all_el.append(this.rainbow_solid_el); 
	    this.el.append(this.unicorn_el); 
	    var to_w = this.rainbow_all_el.outerWidth() + this.unicorn_el.width()*3;
	    $(this.el).css('width', to_w + 'px');
	    this.el.css('transform-origin', 'center right');
	    this.beginAnimation();
    },
    // ----------------- prepareForAnimate
    beginAnimation: function() {
	    var self = this;
	    //roatate
	    this.deg_rot_1 = -89 + parseInt(Math.random()*54);
	    this.deg_rot_2 = 35 + parseInt(Math.random()*54);
	    
	    if(this.contain) {
		    this.deg_rot_1 = -80 + parseInt(Math.random()*30);
		    this.deg_rot_2 = 50 + parseInt(Math.random()*30);
	    }
	    
	    var rander = Math.round(Math.random());
	    if(rander == 0) this.deg_rot = this.deg_rot_1;
	    else this.deg_rot = this.deg_rot_2;

	    this.rot  = this.deg_rot  * (Math.PI/180);
		//position x as random 
		var rainbow_cnt_el = this.el.parent();
		//if  contain
		//limit the start x to the center
		if(this.contain) this.start_x = parseInt( $(window).width()*(1/3) +  Math.random()*($(window).width()*(2/3)) ) - this.el.outerWidth();
		else this.start_x = parseInt( -$(window).width()*(1/4) + Math.random()*($(window).width()*(1.5)) ) - this.el.outerWidth();
		//position y according to rand_rotate
		this.slope = Math.tan(this.rot);
		var start_y;
		//--- upward
		if(this.deg_rot >= -90 && this.deg_rot <= 0 ){
			start_y = rainbow_cnt_el.outerHeight() + this.unicorn_el.outerHeight(); 
			this.end_y = -(this.unicorn_el.outerHeight()) - this.el.outerWidth();
		} 
		// downward 
		else{
			start_y = (-rainbow_cnt_el.outerHeight()) - this.unicorn_el.outerHeight();
			this.end_y = rainbow_cnt_el.outerHeight() + this.unicorn_el.outerHeight() + this.el.outerWidth();
		}
		this.intercept = start_y - (this.slope*this.start_x);
		//determin end x 
	    //by this.slope
	    this.end_x = (this.end_y - this.intercept)/this.slope;
		this.el.css({transform: 'translate3d('+ this.start_x + 'px,' + start_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
				  MozTransform: 'translate3d('+ this.start_x + 'px,' + start_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
				  WebkitTransform: 'translate3d('+ this.start_x + 'px,' + start_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
				  OTransform: 'translate3d('+ this.start_x + 'px,' + start_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
				  msTransform: 'translate3d('+ this.start_x + 'px,' + start_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)'});
	    setTimeout(function(){
			if(self.deg_rot >= -90 && self.deg_rot <= 0) self.el.addClass(self.EASE_OUT_TRANS_CLASS);
			// --- downward 
			else self.el.addClass(self.EASE_IN_TRANS_CLASS);
	        self.animate();
		}, 100);
    },
    // ----------------- animate
    animate: function() {
	    var self = this;
    	this.el.css('visibility', 'visible');
	    this.el.css({ transform: 'translate3d('+ this.end_x + 'px,' + this.end_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
					  MozTransform: 'translate3d('+ this.end_x + 'px,' + this.end_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
					  WebkitTransform: 'translate3d('+ this.end_x + 'px,' + this.end_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
					  OTransform: 'translate3d('+ this.end_x + 'px,' + this.end_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)',
					  msTransform: 'translate3d('+ this.end_x + 'px,' + this.end_y + 'px, 0) rotateZ(' + this.deg_rot +'deg)'});
		//listen gfo rtransition end
		//or set a timeout
		setTimeout(function(){
			self.kill();
		}, 12000); 
    },
    // ----------------- kill
    kill: function() {
    	this.reset();
	    $(this.el).trigger(this.KILL, [this]);
	    $(this.el).off();
	    $(this.el).unbind();
    },
    // ----------------- reset
    reset: function() {
	    $(this.el).css('visibility', 'hidden');
	    $(this.el).removeClass(this.EASE_IN_TRANS_CLASS);
	    $(this.el).removeClass(this.EASE_OUT_TRANS_CLASS);
    }	    
});