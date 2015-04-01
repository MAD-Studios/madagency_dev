// _________________________________________________________________________ IntroPaneView
main.views.IntroPaneView = main.views.PaneView.extend({
 	ELEMENT_TRANS_CLASS: ".element-trans",
    LAST_ELEMENT_TRANS_CLASS: ".last-element-trans",
    ELEMENT_ANIM_OFFSET: 300,
    LAST_ELEMENT_ANIM_OFFSET: 900,
    SHOW_UNDERLAYING_TEXT_SCROLL_TOP: 5,
	IDLE: "idle",
	PREVENT_BODY_SCROLL: "prevent_body_scroll",
	IDLE_START_TIME: 60000,
	id: "intro",
	_route: "",
	offset: 0,
	nav_offset: 0,
	to_y: 0,
	elementManipulator: main.utils.ElementManipulator,
	num_posizes: 0,
	underlaying_text_shown: false,
	events:{
		'click .btn-castle': 'onBtnCastleClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("IntroPaneView ---- initialize"); 
        //prevent document scroll
        this.elementManipulator.preventDocumentScroll();
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
    	this.scroller_el.scroll(function(){
	    	self.handleIntroScroll();
    	});
    	this.arrow_row_el = $('.row-arrow-container', this.el);
    	    	
    	this.createOverlay();
    	this.hideContent();
    	
    	//castleGatewayView
    	//!!!!!!!!!!!!!!!!!!!!!!
    },
    // ----------------- posElements
    posElements: function() {
        this.arrow_row_el.css('top', this.def_arrow_row_el_top + 'px');
        
        var to_h = $('.row-content', this.el).outerHeight();
    	this.overlay_el.css('height', to_h + 'px');

        to_h = $(this.el).outerHeight() - this.nav_offset;
    	this.intro_el.css('height', to_h + 'px');
    	
    	//!!!!!!!!!!!!!!!!!!!!!!!!!
    	 /*$('.row-absolute', this.el).each(function(){
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
        });*/
    },
    // ----------------- createOverlay
    createOverlay: function() {
    	//create overlay 
    	//to allow for
    	//scroll when mouse over
    	//gradient
    	this.overlay_el = $('<div class="overlay"></div>');
    	
    	$('.scroller-content', this.el).append(this.overlay_el);
    },
    // ----------------- handleIntroScroll
    handleIntroScroll: function() {
    	//if scrolltop > a few pixels
    	//fade in the other items
    	//and faed out the arrow
    	var scroll_top = this.scroller_el.scrollTop();

		if(scroll_top > this.SHOW_UNDERLAYING_TEXT_SCROLL_TOP){
			TweenLite.to(this.arrow_row_el, 0.25, { opacity:0, delay:0.2 });
	    	//move it up
	    	TweenLite.to(this.arrow_row_el, 0.5, { top: this.def_arrow_row_el_top-30, ease: Expo.easeOut });
			$('.text-block', this.el).eq(0)
		}
		
		this.underlaying_text_shown = true;
    },
    // ----------------- hideUnderlayingText
    hideUnderlayingText: function() {
    },
    // ----------------- prepForAnim
    prepForAnim: function() {
    	//hide all but first text-block
    	//add fade class to them
    	$('.text-block', this.el).each(function(index, value){
	    	if(index > 0) $(this).css('opacity', '0');
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
	    	self.to_margin = ( ( $(self.el).outerHeight() - self.nav_offset - ( $(this).outerHeight() + 25 ) )/2 ) + 'px';
			if(index == 0){
				$(this).css('marginTop', self.to_margin);
				this.def_arrow_row_el_top = $(this).outerHeight();
			} 
			else if (vert_blocks.length) $(this).css('marginBottom', self.to_margin);
    	});

    	//show the intro after 2nd posize
    	if(this.num_posizes == 1){
    		this.posElements();
	    	this.showContent();
    	} 
    	this.num_posizes++;
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
	// ----------------- onBtnCastleClick
    onBtnCastleClick:function(){
	    
    },
	// ----------------- beforeDispose
	beforeDispose: function(){
	}
});