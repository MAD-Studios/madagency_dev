// _________________________________________________________________________ IntroPaneView
main.views.corporate.IntroPaneView = main.views.PaneView.extend({
    ELEMENT_ANIM_OFFSET: 100,
    SHOW_UNDERLAYING_TEXT_SCROLL_TOP: 5,
	IDLE: "idle",
	PREVENT_BODY_SCROLL: "prevent_body_scroll",
	IDLE_START_TIME: 60000,
	VISIBLE_CLASS: "visible",
	MIN_TEXT_BLOCK_BOTTOM_MARGIN: 100,
	MIN_TEXT_BLOCK_TOP_MARGIN: 50,
	BTN_HIDDEN_PADDING_BOTTOM: 10,
	SHOW_MORE_PADDING_BOTTOM:  50,
	OVERLAY_HTML: '<div class="overlay"></div>',
	OVERLAY_BTN_HTML: '<a class="btn btn-overlay"></a>',
	id: "intro",
	_route: "",
	offset: 0,
	nav_offset: 0,
	default_elements_y: [],
	to_y: 0,
	num_posizes: 0,
	events:{
		'click #btn-show-more': 'onBtnShowMoreClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("IntroPaneView ---- initialize"); 
        //prevent document scroll
        $(this.el).trigger(main.events.Event.DISABLE_DOCUMENT_SCROLL);
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("IntroPaneView ---- beforeRender");
        var self = this;
        this.initElements();
        this.prepForAnim();
  	},
  	// ----------------- initElements
    initElements: function() {
    	var self = this;
    	this.intro_el = $('.intro', this.el);
    	this.grad_el = $('.gradient', this.el);
    	this.scroller_el = $('.scroller', this.el);
    	this.this_el = $(this.el);
    	this.scroller_el.scroll(function(){
	    	self.handleIntroScroll();
    	});
    	this.arrow_row_el = $('.row-arrow-container', this.el);
    	this.anim_rows = $('.row-content .column > .row-absolute', this.el);
    	    	
    	this.createOverlay();
    	this.hideContent();
    },
    // ----------------- posElements
    posElements: function() {
        var self 					= this;
        var last_h 					= 0;
        var to_h 					= 0;
        this.to_y				 	= 0;    
        this.default_elements_y	 	= [];
        
        this.arrow_row_el.css('top', this.def_arrow_row_el_top + 'px');        

        this.anim_rows.each(function(){
        	//make sure not arrow row
        	//or row within an absolute  row
			self.default_elements_y.push(self.to_y);
			
	        //if row is not shown
			//set its top to its value plus the offset
			if(!$(this).hasClass(self.VISIBLE_CLASS)) $(this).css('top', (self.to_y + self.ELEMENT_ANIM_OFFSET) + 'px');
			//otherwise set to default position
			else $(this).css('top', self.to_y + 'px');
            
            if($(this).css('display') != 'none') last_h = $(this).children().eq(0).outerHeight(true);
			else last_h = 0;
            
            self.to_y += last_h;
        });

        to_h = this.this_el.height() - this.nav_offset;

    	this.intro_el.css('height', to_h + 'px');
    	
    	to_h = self.to_y;
    	$('.row-content', this.el).css('height', to_h + 'px');
    	this.overlay_el.css('height', to_h + 'px');
    	
    	this.posOverlayBtns();
    },
    // ----------------- createOverlay
    createOverlay: function() {
    	//create overlay 
    	//to allow for
    	//scroll when mouse over
    	//gradient
    	this.overlay_el = $(this.OVERLAY_HTML);
    	$('.scroller-content', this.el).append(this.overlay_el);
    	
    	this.createOverlayBtns();
    },
    // ----------------- createOverlayBtns
    createOverlayBtns: function() {
        var self 					= this;	
    	var btn_w 					= 0, 
    		btn_h 					= 0;
    	var btn_id 					= "";
    	var overlay_btn,
    		btn_click_funct, 
    		btn_href;
    	this.overlay_btns 			= [];
    	this.btn_els 				= $('.btn', this.scroller_el);
    	//create invisible overlay btns
    	//at the positions of the 
    	//btns inside the scroller content
    	this.btn_els.each(function(){
	    	overlay_btn = $(self.OVERLAY_BTN_HTML);
	    	//SET ITS WITH AND HEIGHT
	    	btn_w = $(this).outerWidth();
	    	btn_h = $(this).outerHeight() + self.BTN_HIDDEN_PADDING_BOTTOM;
	    	overlay_btn.css('width', btn_w + 'px');
			overlay_btn.css('height', btn_h + 'px');
			//give it an id that 
			//corresponds to the btn
			btn_id = $(this).attr('id');
			btn_href = $(this).attr('href');
			if(btn_href) overlay_btn.attr('href', btn_href);
			//find the btn id in the events object
			//then get its corresponding function
			//if() events
			for(event in self.events){
				if(event.indexOf(btn_id) > -1) btn_click_funct = self.events[event];
			}
			
			if(btn_click_funct){
		    	//append to the overlay
		    	//add click listener
		    	$(overlay_btn).click(function(){
			    	//call its associated function
			    	self[btn_click_funct]();
		    	});
	    	}

	    	self.overlay_btns.push(overlay_btn);
	    	self.overlay_el.append(overlay_btn);
    	});
    },
    // ----------------- posOverlayBtns
    posOverlayBtns: function() {
        var self 					= this;	
        var overlay_btn;
    	var btn_y 					= 0,
    		btn_x 					= 0;
    	this.btn_els.each(function(index, value){
    		overlay_btn = self.overlay_btns[index];
    		//SET ITS TOP AND LEFT POSITIONS 
			btn_y = $(this).offset().top;
			if( !$(this).parent().parent().parent().hasClass(self.VISIBLE_CLASS) ) btn_y -= self.ELEMENT_ANIM_OFFSET;
			btn_x = $(this).offset().left;
			
			overlay_btn.css('top', btn_y + 'px');
			overlay_btn.css('left', btn_x + 'px');	
    	});
    },
    // ----------------- handleIntroScroll
    handleIntroScroll: function() {
    	//kill any previous animations
    	TweenLite.killTweensOf(this.arrow_row_el, false, {top:true, opacity:true} );
    	TweenLite.killTweensOf(this.anim_rows.eq(1), false, {top:true, opacity:true} );
    
    	//if scrolltop > a few pixels
    	//fade in the other items
    	//and faed out the arrow
    	var scroll_top = this.scroller_el.scrollTop();
    	var delay = 0;

		if(scroll_top >= 0 ){
			if(scroll_top > this.SHOW_UNDERLAYING_TEXT_SCROLL_TOP){
				TweenLite.to(this.arrow_row_el, 0.25, { opacity:0 });
		    	//move it up
		    	TweenLite.to(this.arrow_row_el, 0.35, { top: this.def_arrow_row_el_top-30, ease: Expo.easeOut });
	    		if(scroll_top  <= ( this.default_elements_y[2] - (this.this_el.height()/2) ) ){
					TweenLite.to(this.anim_rows.eq(1), 0.25, { opacity: 1, ease: Expo.easeOut });
					TweenLite.to(this.anim_rows.eq(1), 1, { top: this.default_elements_y[1], ease: Expo.easeOut });
					this.anim_rows.eq(1).addClass(this.VISIBLE_CLASS);
				}
				//show the gradient
				//TweenLite.to(this.grad_el, 0.1, { opacity: 1, ease: Expo.easeOut, delay: 0.1 });
                this.grad_el.css('opacity', '1');
			}
			else if( scroll_top <= this.SHOW_UNDERLAYING_TEXT_SCROLL_TOP ){
				delay = 0.2;
				TweenLite.to(this.arrow_row_el, 0.25, { opacity:1, delay:delay });
		    	//move it up
		    	TweenLite.to(this.arrow_row_el, 0.5, { top: this.def_arrow_row_el_top, ease: Expo.easeOut });
				TweenLite.to(this.anim_rows.eq(1), 0.5, { opacity: 0, ease: Expo.easeOut });
				TweenLite.to(this.anim_rows.eq(1), 0.5, { top: this.default_elements_y[1] + this.ELEMENT_ANIM_OFFSET, ease: Expo.easeOut });
				this.anim_rows.eq(1).removeClass(this.VISIBLE_CLASS);
				//hide the gradient
				//TweenLite.to(this.grad_el, 0.25, { opacity: 0, ease: Expo.easeOut });
                this.grad_el.css('opacity', '0');
			}
            if( scroll_top  > ( this.default_elements_y[2] - (this.this_el.height()/2) ) ){
				delay = 0;
				TweenLite.to(this.anim_rows.eq(2), 0.5, { opacity: 1, ease: Expo.easeOut, delay:delay });
				TweenLite.to(this.anim_rows.eq(2), 1.5, { top: this.default_elements_y[2], ease: Expo.easeOut, delay:delay });
				this.anim_rows.eq(2).addClass(this.VISIBLE_CLASS);
			}
            if( scroll_top  > ( this.default_elements_y[2] - (this.this_el.height()/3) ) ){
                delay = 0;
                TweenLite.to(this.anim_rows.eq(1), 0.5, { opacity: 0, ease: Expo.easeOut, delay:delay });
                TweenLite.to(this.anim_rows.eq(1), 0.75, { top: this.default_elements_y[1] - this.ELEMENT_ANIM_OFFSET, ease: Expo.easeOut, delay:delay });
                this.anim_rows.eq(1).removeClass(this.VISIBLE_CLASS);
            }
			//else if( scroll_top  <=  ( this.default_elements_y[2] - (this.this_el.height() - this.nav_offset - this.grad_el.height() )) ){
            if( scroll_top  <= ( this.default_elements_y[2] - (this.this_el.height()/2) ) ){
				TweenLite.to(this.anim_rows.eq(2), 0.5, { opacity: 0, ease: Expo.easeOut });
				TweenLite.to(this.anim_rows.eq(2), 1, { top: this.default_elements_y[2] + this.ELEMENT_ANIM_OFFSET, ease: Expo.easeOut });
				this.anim_rows.eq(2).removeClass(this.VISIBLE_CLASS);
			}
		}
    },
    // ----------------- prepForAnim
    prepForAnim: function() {
    	var self = this;
    	
    	console.log("prepForAnim");
    	
    	this.grad_el.css('opacity', '0');
    	//hide all but first text-block
    	//add fade class to them    	
    	this.anim_rows.each(function(index, value){
	    	if(index > 0) $(this).css('opacity', '0');
	    	else $(this).addClass(self.VISIBLE_CLASS);
    	});
    },
   	// ----------------- setIdleTimer
    setIdleTimer: function() {
	    var self = this;
	    this.idleTimeout = setTimeout(function(){
		    //trigger the idle event
		    self.this_el.trigger(self.IDLE);
	    }, this.IDLE_START_TIME);
    },
    // ----------------- unsetIdleTimer
    unsetIdleTimer: function() {
	    clearTimeout(this.idleTimeout);
    },
 	// ----------------- beforeActivate
    beforeActivate: function() {
	    //this.setIdleTimer();
	},
	// ----------------- beforeActivate
    beforeDeactivate: function() {
	    //this.unsetIdleTimer();
    },
    // ----------------- beforePosize
    beforePosize: function() {
    	// set the height of this.intro_el
    	// to the heigth of teh window 
    	// minus  nav_offset (height of mainConatiner) 
    	var to_bottom = this.nav_offset;
    	var to_margin = 0;
    	var self = this;
    	this.grad_el.css('bottom', to_bottom + 'px');
    	var vert_blocks = $('.text-block.vertical-center', this.el);
    	
    	vert_blocks.each(function(index, value){
	    	//give each a margin top and bottom
	    	//according to window height
	    	self.to_margin = ( ( self.this_el.outerHeight() - self.nav_offset - ( $(this).outerHeight() + 25 ) )/2 );
			if(index == 0){
				if(self.to_margin < self.MIN_TEXT_BLOCK_TOP_MARGIN) self.to_margin = self.MIN_TEXT_BLOCK_TOP_MARGIN;
				$(this).css('marginTop', self.to_margin + 'px');
				self.def_arrow_row_el_top = parseInt($(this).outerHeight()) + parseInt(self.to_margin);
			} 
			else if (index == vert_blocks.length-1){
				if(self.to_margin < self.MIN_TEXT_BLOCK_BOTTOM_MARGIN) self.to_margin = self.MIN_TEXT_BLOCK_BOTTOM_MARGIN;
				$(this).css('marginBottom', self.to_margin + 'px');
			} 
    	});
    	
    	setTimeout(function(){
	    	self.posElements();
    	}, 100);

    	//show the intro after 2nd posize
    	if(this.num_posizes == 1){
			setTimeout(function(){
		    	self.showContent();
		    }, 100);
    	} 
    	this.num_posizes++;
    },
    // ----------------- onScroll
    onScroll: function(scroll_top) {
    	if(scroll_top <= 1){
	    	$(this.el).trigger(main.events.Event.DISABLE_DOCUMENT_SCROLL);
    	}
    },
    // ----------------- show
    showContent: function() {
    	this.intro_el.css('opacity', '1');
    },
     // ----------------- hide
    hideContent: function() {
    	this.intro_el.css('opacity', '0');
    },
	// ----------------- beginHide
    beginHide: function() {

    },
	// ----------------- updateForUnsupportedBrowsers
	updateForUnsupportedBrowsers:function(){
		//updateForUnsupportedBrowsers
		//this.castleGatewayView.updateForUnsupportedBrowsers();
	},
    // ----------------- onBtnShowMoreClick
    onBtnShowMoreClick:function(){
    	//scrolldown
    	//!!!!!!!!!!!!!!!!!!!
    	//set active class on 
    	//underlying btn
    	//!!!!!!!!!!!!!!!!!!

    	this.scrollToShowMore();
	    return false;
    },
    // ----------------- scrollToShowMore
	scrollToShowMore: function(){
		//scroll to the top of the second anim row
    	var scroll_to_y = this.anim_rows.eq(1).offset().top - this.ELEMENT_ANIM_OFFSET - this.SHOW_MORE_PADDING_BOTTOM;
    	TweenLite.to(this.scroller_el, 1.4, { scrollTo:{y:scroll_to_y, autoKill:false}, ease:Expo.easeOut });
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
	}
});