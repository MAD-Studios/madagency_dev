// _________________________________________________________________________ IntroPaneView
main.views.IntroPaneView = main.views.PaneView.extend({
 	ELEMENT_TRANS_CLASS: ".element-trans",
    LAST_ELEMENT_TRANS_CLASS: ".last-element-trans",
    ELEMENT_ANIM_OFFSET: 300,
    LAST_ELEMENT_ANIM_OFFSET: 900,
	UNSUPPOSRTED_CLASS: "unsupported-browser",
	IDLE: "idle",
	PREVENT_BODY_SCROLL: "prevent_body_scroll",
	//!!!!!!!!!!!!!!!!!!!
	UNSUPPORTED_H1_COPY: "We noticed you aren’t running at full optimization",
	UNSUPPORTED_P_COPY: 'We recommend you upgrade your browser to the latest version of Safari or <a href="https://www.google.com/intl/en_US/chrome/browser/">Chrome</a>.',
	IDLE_START_TIME: 60000,
	id: "intro",
	_route: "",
	offset: 0,
	nav_offset: 0,
	to_y: 0,
	elementManipulator: main.utils.ElementManipulator,
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
  	},
  	// ----------------- initElements
    initElements: function() {
    	this.intro_el = $('.intro', this.el);
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
    	var to_h = $(window).height() - this.nav_offset;
    	var to_margin = 0;
    	var self = this;
    	this.intro_el.css('height', to_h + 'px');
    	
    	$('.text-block.vertical-center', this.el).each(function(){
	    	//give each a margin top and bottom
	    	//according to window height
	    	to_margin = (($(window).height() - self.nav_offset - $(this).outerHeight())/2) + 'px';
			$(this).css('marginTop', to_margin);
			$(this).css('marginBottom', to_margin);
    	});
    },
    // ----------------- show
    show: function() {
    	$(this.el).css('opacity', '1');
    },
	// ----------------- beginHide
    beginHide: function() {

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
	// ----------------- onBtnCastleClick
    onBtnCastleClick:function(){
	    
    },
	// ----------------- beforeDispose
	beforeDispose: function(){
	}
});