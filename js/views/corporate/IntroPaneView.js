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
	nav_offset: 0,
	default_elements_y: [],
    animateRowsShown: [],
	to_y: 0,
	num_posizes: 0,
    scroll_top: 0,
    scroll_top: 0,
    at_intro_bottom: false,
    is_doc_scrolling: false,
    //check_active_by_scroll: false,
	events:{
		'click #show-more-btn': 'onBtnShowMoreClick',
		'click #contact-btn': 'onBtnClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("IntroPaneView ---- initialize"); 
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("IntroPaneView ---- beforeRender");
        var self = this;
        this.initElements();
        this.prepForAnim();
  	},
  	// ----------------- enableScroller
    enableScroller: function() {
    	this.scroller_el.css('overflowY', 'scroll');
    },
    // ----------------- disableScroller
    disableScroller: function() {
        this.scroller_el.css('overflowY', 'hidden');
    },
  	// ----------------- initElements
    initElements: function() {
    	var self = this;
    	this.intro_el = $('.intro', this.el);
    	this.grad_el = $('.gradient', this.el);
    	this.content_row_el = $('.row-content', this.el);
    
    	this.this_el = $(this.el);
    	
    	this.arrow_row_el = $('.row-arrow-ctn', this.el);
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

        to_h = $(window).height() - this.nav_offset;
    	
    	to_h = self.to_y;
    	this.intro_el.css('height', to_h + 'px');
    	this.content_row_el.css('height', to_h + 'px');
    	this.overlay_el.css('height', to_h + 'px');
    	
    	this.posOverlayBtns();
        
        var row_1_end_y = this.anim_rows.eq(0).offset().top + this.anim_rows.eq(0).height() - 100;
        
        //to_top value is going
        //to change
        var to_top = $(window).height() - this.nav_offset - this.grad_el.outerHeight();
    	this.grad_el.css('top', to_top + 'px');
        
        /*if(this.grad_el.offset().top >= row_1_end_y){
            if( this.scroll_top <= this.SHOW_UNDERLAYING_TEXT_SCROLL_TOP ) this.grad_el.css('opacity', '0');
            else this.grad_el.css('opacity', '1');
        }*/
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
    	this.btn_els 				= $('.btn', this.el);
    	//create invisible overlay btns
    	//at the positions of the 
    	//btns inside the scroller content
    	this.btn_els.each(function(){
    		btn_click_funct = null;
	    	overlay_btn = $(self.OVERLAY_BTN_HTML);
	    	//SET ITS WITH AND HEIGHT
	    	btn_w = $(this).outerWidth();
	    	btn_h = $(this).outerHeight() + self.BTN_HIDDEN_PADDING_BOTTOM;
	    	overlay_btn.css('width', btn_w + 'px');
			overlay_btn.css('height', btn_h + 'px');
			//give it an id that 
			//corresponds to the btn
			btn_id = $(this).attr('id');
			overlay_btn.attr('id', btn_id);
			btn_href = $(this).attr('href');
			if(btn_href) overlay_btn.attr('href', btn_href);
			
			$(overlay_btn).click(function(event){
				self.onOverlayBtnClick(event);
			});
	    	self.overlay_btns.push(overlay_btn);
	    	self.overlay_el.append(overlay_btn);
    	});
    },
    // ----------------- onOverlayBtnClick
    onOverlayBtnClick: function(event) {
    	var self = this;
        var btn_id = $(event.currentTarget).attr('id');
        var btn_click_funct = null;
        //find the btn id in the events object
		//then get its corresponding function
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
    handleIntroScroll: function(scroll_top) { 
        this.animateOnScroll(scroll_top);
    },
    // ----------------- addTouchWheelScrollListener
    addTouchWheelScrollListener: function() { 
         var self = this;
         this.disableScroller();
         main.utils.ElementManipulator.addTouchWheelScrollListener(window, function(deltaX, deltaY, event){ self.handleMouseWheel(deltaY) });
    },
    // ----------------- removeMouseWheelEvent
    removeTouchWheelScrollListener: function() { 
        var self = this;
        main.utils.ElementManipulator.removeTouchWheelScrollListener(window);
    },
    // ----------------- endDocScroll
    endDocScroll: function() { 
        if(this.is_doc_scrolling){
            this.enableScroller();
            this.is_doc_scrolling = false;
        }
    },
    // ----------------- beginDocScroll
    beginDocScroll: function() { 
        if(!this.is_doc_scrolling){
            this.disableScroller();
            this.is_doc_scrolling = true;
        }
    },
    // ----------------- animateOnScroll
    animateOnScroll: function(scroll_top) {
        console.log("animateOnScroll ------------- scroll_top = " + scroll_top);
        //if scrolltop > a few pixels
    	//fade in the other items
    	//and faed out the ar        
        var delay = 0, ind = 0; 
        var row_1_end_y = 0;
        
        if(this.at_intro_bottom) this.handleEnterIntro();
        
		if(scroll_top >= 0 && scroll_top < this.max_scroll_top){
            row_1_end_y = this.anim_rows.eq(0).offset().top + this.anim_rows.eq(0).height() - 100;
            
			if(scroll_top > this.SHOW_UNDERLAYING_TEXT_SCROLL_TOP){
			     //show and move up row 2
                if(this.animateRowsShown.indexOf(1) == -1){ 
                    //kill any previous animations
                    TweenLite.killTweensOf(this.arrow_row_el, false, {top:true, opacity:true} );
                    TweenLite.to(this.arrow_row_el, 0.25, { opacity:0 });
                    //move it up
                    TweenLite.to(this.arrow_row_el, 0.35, { top: this.def_arrow_row_el_top-30, ease: Expo.easeOut });
                    if(scroll_top  <= ( this.default_elements_y[2] - (this.this_el.height()/7) ) ){
                        TweenLite.killTweensOf(this.anim_rows.eq(1), false, {top:true, opacity:true} );
                        TweenLite.to(this.anim_rows.eq(1), 0.25, { opacity: 1, ease: Expo.easeOut });
                        TweenLite.to(this.anim_rows.eq(1), 1, { top: this.default_elements_y[1], ease: Expo.easeOut });
                        this.anim_rows.eq(1).addClass(this.VISIBLE_CLASS);
                        this.animateRowsShown.push(1);
                    }
				}
				//hide and move up row 2
				else if( scroll_top  > ( this.default_elements_y[2] - (this.this_el.height()/7) ) ){
                    ind = this.animateRowsShown.indexOf(1);
                    if(ind > -1){ 
                        delay = 0;
                        TweenLite.killTweensOf(this.anim_rows.eq(1), false, {top:true, opacity:true} );
                        TweenLite.to(this.anim_rows.eq(1), 0.5, { opacity: 0, ease: Expo.easeOut, delay:delay });
                        TweenLite.to(this.anim_rows.eq(1), 0.75, { top: this.default_elements_y[1] - this.ELEMENT_ANIM_OFFSET, ease: Expo.easeOut, delay:delay });
                        this.anim_rows.eq(1).removeClass(this.VISIBLE_CLASS);
                        this.animateRowsShown = main.utils.ElementManipulator.removeFromArray(ind, this.animateRowsShown);
                    }
                }
				//show the gradient
                if(this.grad_el.offset().top >= row_1_end_y) this.grad_el.css('opacity', '1');
			}
			else if( scroll_top <= this.SHOW_UNDERLAYING_TEXT_SCROLL_TOP ){
				//hide and move down row 2
				//when move back up to top
                ind = this.animateRowsShown.indexOf(1);
                if(ind > -1){ 
                    delay = 0.2;
                    TweenLite.killTweensOf(this.arrow_row_el, false, {top:true, opacity:true} );
                    TweenLite.killTweensOf(this.anim_rows.eq(1), false, {top:true, opacity:true} );
                    TweenLite.to(this.arrow_row_el, 0.25, { opacity:1, delay:delay });
                    //move it up
                    TweenLite.to(this.arrow_row_el, 0.5, { top: this.def_arrow_row_el_top, ease: Expo.easeOut });
                    TweenLite.to(this.anim_rows.eq(1), 0.5, { opacity: 0, ease: Expo.easeOut });
                    TweenLite.to(this.anim_rows.eq(1), 0.5, { top: this.default_elements_y[1] + this.ELEMENT_ANIM_OFFSET, ease: Expo.easeOut });
                    this.anim_rows.eq(1).removeClass(this.VISIBLE_CLASS);
                    //hide the gradient
                    if(this.grad_el.offset().top >= row_1_end_y) this.grad_el.css('opacity', '0');
                    this.animateRowsShown = main.utils.ElementManipulator.removeFromArray(ind, this.animateRowsShown);
                }
			}
            if( this.max_scroll_top  > ( this.default_elements_y[2] - (this.this_el.height()/2) ) &&  scroll_top < this.max_scroll_top){
            	//show row 3
                //if not already animated
                if(this.animateRowsShown.indexOf(2) == -1){ 
    				delay = 0;
                    this.anim_rows.eq(2).css('top', this.default_elements_y[2] + 'px');
                    TweenLite.killTweensOf(this.anim_rows.eq(2), false, {top:true, opacity:true} );
    				TweenLite.to(this.anim_rows.eq(2), 0.5, { opacity: 1, ease: Expo.easeOut, delay:delay });
    				this.anim_rows.eq(2).addClass(this.VISIBLE_CLASS);
    				this.animateRowsShown.push(2);
				}
			}
            else if( scroll_top <= ( this.default_elements_y[2] - (this.this_el.height()/2) )){
                //hide and move up row 3
                ind = this.animateRowsShown.indexOf(2);
                if(ind > -1){ 
                    TweenLite.killTweensOf(this.anim_rows.eq(2), false, {top:true, opacity:true} );
    				TweenLite.to(this.anim_rows.eq(2), 0.5, { opacity: 0, ease: Expo.easeOut });
    				TweenLite.to(this.anim_rows.eq(2), 1, { top: this.default_elements_y[2] + this.ELEMENT_ANIM_OFFSET, ease: Expo.easeOut });
    				this.anim_rows.eq(2).removeClass(this.VISIBLE_CLASS);
    				this.animateRowsShown = main.utils.ElementManipulator.removeFromArray(ind, this.animateRowsShown);
				}
			}
		}
		else{
    		if(!this.at_intro_bottom) this.handleExitIntro();
		}
    },
    // ----------------- handleExitIntro
    handleExitIntro: function() {
        //make the panel
        //absolute instead of fixed
        /*this.this_el.css('position', 'absolute');
        //find the scroll top value
        var to_top = $(window).scrollTop();
        this.this_el.css('top', to_top + 'px');*/
        this.at_intro_bottom = true;
        //hide gradient
        this.grad_el.css('opacity', '0');
    },
    // ----------------- handleEnterIntro
    handleEnterIntro: function() {
        /*this.this_el.css('position', 'fixed');
        this.this_el.css('top', '0');*/
        this.at_intro_bottom = false;
        //show gradient
        this.grad_el.css('opacity', '1');
    },
    // ----------------- prepForAnim
    prepForAnim: function() {
    	var self = this;    	
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
        //center the row-content 
        //horizontally
        var to_x = ( $(window).width() - this.content_row_el.outerWidth() )/2;
        this.content_row_el.css('left', to_x + 'px');
        
    	// set the height of this.intro_el
    	// to the heigth of teh window 
    	// minus  nav_offset (height of mainConatiner) 
    	var to_margin = 0;
    	var self = this;
    	var vert_blocks = $('.text-block.vertical-center', this.el);
    	
    	this.max_scroll_top = this.content_row_el.outerHeight() - $(window).height() - this.nav_offset;
        //this.max_scroll_top = this.content_row_el.outerHeight() - this.intro_el.outerHeight();
        //this.max_scroll_top = this.content_row_el.outerHeight() - $(window).height();
       
    	vert_blocks.each(function(index, value){
	    	//give each a margin top and bottom
	    	//according to window height
            //self.to_margin = ( ( self.this_el.outerHeight() - self.nav_offset - ( $(this).outerHeight() ) )/2 );
            self.to_margin = ( ( $(window).height() - self.nav_offset - ( $(this).outerHeight() ) )/2 ); 
            self.to_margin_bottom = ( ( $(window).height() - self.nav_offset - ( $(this).outerHeight() ) )/2 ) + self.nav_offset;            
           
			if(index == 0){
				if(self.to_margin < self.MIN_TEXT_BLOCK_TOP_MARGIN) self.to_margin = self.MIN_TEXT_BLOCK_TOP_MARGIN;
				$(this).css('marginTop', self.to_margin + 'px');
				self.def_arrow_row_el_top = parseInt($(this).outerHeight()) + parseInt(self.to_margin);
			} 
			else if (index == vert_blocks.length-1){
				if(self.to_margin_bottom < self.MIN_TEXT_BLOCK_BOTTOM_MARGIN) self.to_margin_bottom = self.MIN_TEXT_BLOCK_BOTTOM_MARGIN;
				$(this).css('marginBottom', self.to_margin_bottom + 'px');
			} 
    	});
    	
    	setTimeout(function(){
	    	self.posElements();
    	}, 100);

    	//show the intro after fourth posize
    	if(this.num_posizes > 2){
			setTimeout(function(){
		    	self.showContent();
		    }, 100);
    	} 
    	
    	/*var to_height = this.getScrollHeight();
    	$(this.this_el).css('height', to_height + 'px');*/
    	
    	this.num_posizes++;
    },
    // ----------------- onScroll
    onScroll: function(scroll_top) { 
        this.scroll_top = scroll_top;
        //this.content_row_el.css('top', -scroll_top + 'px');
        this.handleIntroScroll(scroll_top);
    	
    	//set the top of
    	//row-content
    	//the the scrollTop
    },
    // ----------------- getScrollHeight
    getScrollHeight: function() {     
        //add up the heights of 
        //the row absolutes        
        return $('.row-content', this.el).outerHeight();
    },
    // ----------------- setHeight
    setHeight: function(_height) {
        console.log("setHeight --------- _height = " + _height);
        this.this_el.css('height', _height + 'px');
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
	},
    // ----------------- onBtnShowMoreClick
    onBtnShowMoreClick:function(){
    	this.scrollToShowMore();
	    return false;
    },
    // ----------------- onBtnClick
    onBtnClick: function(event) {
        main.utils.BtnUtils.onBtnClick(event);
        return false;
    },
    // ----------------- scrollToShowMore
	scrollToShowMore: function(){
		//scroll to the top of the second anim row
    	var scroll_to_y = this.anim_rows.eq(1).offset().top - this.ELEMENT_ANIM_OFFSET - this.SHOW_MORE_PADDING_BOTTOM;
    	// actually call an event
    	// scroll the body to 
    	// the value and the
    	// content row will follow
        this.this_el.trigger(main.events.Event.SCROLL_WINDOW_TO, [scroll_to_y]);
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
	}
});