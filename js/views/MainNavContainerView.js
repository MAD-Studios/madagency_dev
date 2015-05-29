// _________________________________________________________________________ MainNavContainerView
main.views.MainNavContainerView = Backbone.View.extend({
	TOP_STICKY_CLASS: "top-sticky",
	FULL_LOGO_CLASS: "full-logo",
	TRANS_CLASS: "main-nav-trans",
	BTN_CLASS_END_STR: "-btn",
	ANIMATE_TO_FIXED: "animate_to_fixed",
	ANIMATE_TO_MOVEABLE: "animate_to_moveable",
	HIDE_ANIMATE_OFFSET: 200,
	H_LOGO_CLASS: "h-logo",
	MENU_OFFSET: 10,
	MIN_TOP: 0,
	OFF_NAV_HEIGHT: '7px',
	default_top: 0, 
	is_fixed: false,
	is_fixed_prep: false,
	default_logo_el_margin_top: 0,
	default_nav_el_margin_top: 0,
	default_nav_btn_height: 0,
	events: {
		'click .logo' : 'onLogoClick',
		'click #how-btn' : 'onBtnClick',
		'click #work-btn' : 'onBtnClick',
		'click #team-btn' : 'onBtnClick',
		'click #disciplines-btn' : 'onBtnClick',
		'click #contact-btn' : 'onBtnClick'
	},
    // ----------------- initialize
    initialize: function() {
        console.log("MainNavContainerView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
	    var self = this;
        console.log("MainNavContainerView ---- render");
		this.divider_el = $('.divider', this.el);
		this.logo_el = $('.logo', this.el);
		this.logo_el.css('opacity', '0');
		this.nav_el = $('.nav', this.el);
		setTimeout(function(){
			self.default_logo_el_margin_top = self.logo_el.css('margin-top');
			self.default_nav_el_margin_top = self.nav_el.css('margin-top');
			self.default_height = $(self.el).outerHeight();
			self.prepNav();
			self.posize();
	        self.show();
		}, 100);
        return this;
	},
	// ----------------- prepNav
    prepNav: function() {
	    var self = this;
	    //for eahc nav btn
	    //set the height to OFF_NAV_HEIGHT
	    //add a mouse hover listener
	    $('.nav-btn', this.el).each(function(){
		     self.default_nav_btn_height = $(this).css('height');
		     $(this).css('height', self.OFF_NAV_HEIGHT);
		     $(this).mouseenter(function(){
			     //animate the height of the btn
			    TweenLite.to(this, 1, {height:self.default_nav_btn_height, ease: Expo.easeOut});
		     });
		     $(this).mouseleave(function(){
			    if(!$(this).hasClass('active')){
				    TweenLite.killTweensOf(this, false, {height:true} );
			     	$(this).css('height', self.OFF_NAV_HEIGHT);
		     	}
		     });
	    });
	    
    },
	// ----------------- initPanes
    initPanes: function() {
	    //save each pane id
	    //and its absolute position on the page
    },
    // ----------------- posize
    posize: function() {
        console.log("posize -------");
	   //if does not have class top-sticky
	   //position it at the bottom of the window
	   this.default_height = $(this.el).outerHeight();
	   this.default_top = $(window).innerHeight() - this.default_height;
	   if(this.default_top < this.MIN_TOP) this.default_top = this.MIN_TOP;
	   if( !$(this.el).hasClass(this.TOP_STICKY_CLASS) ){
		   $(this.el).css('top', this.default_top + 'px');
	   }
    },
    // ----------------- checkPos
    checkPos: function(actual_scroll_top) {
	    var self = this;
	    var scroll_top = actual_scroll_top;
	    //if the top of this has reached
	    if(scroll_top >= this.default_top - this.MENU_OFFSET) {
		    //the header
		    this.animateFixedPrep();
	    }
	    if(scroll_top >=  this.default_top) {
		   this.animateToFixed();
		}
		if(scroll_top <  this.default_top) {
			this.animateToMovable();
		}
    },
      // ----------------- animateFixedPrep
    animateFixedPrep: function() {
		var self = this;
		if(!this.is_fixed_prep){
		    ///fade out the full logo
		    //delay fade in the h-logo
		    //change the nav to fixed and 
		    //set it in the right place
		    TweenLite.killTweensOf(this.divider_el);
		    TweenLite.killTweensOf(this.logo_el, false, {opacity:true} );
		    TweenLite.to(this.divider_el, 0.15, {opacity:0});
		    TweenLite.to(this.logo_el, 0.25, { opacity:0 });
	    }
	    this.is_fixed_prep = true;
	},
    // ----------------- animateToFixed
    animateToFixed: function() {
		var self = this;
		if(!this.is_fixed ){
		    $(self.el).css('position', 'fixed');
		    $(self.el).css('top', 0);
		    $(self.el).addClass(self.TOP_STICKY_CLASS);
		    self.swapLogosH();
		    TweenLite.killTweensOf(this.logo_el, false, {marginTop:true} );
		    TweenLite.killTweensOf(this.nav_el, false, {marginTop:true});

		    TweenLite.to(self.logo_el, 0.3, {marginTop:"0", ease: Sine.easeOut});
		    TweenLite.to(self.nav_el, 0.45, {marginTop:"3px", ease: Sine.easeOut});
		    //trigger event to fade the header bg
		    $(this.el).trigger(self.ANIMATE_TO_FIXED);
		    this.is_fixed = true;
	    }
	    this.is_fixed = true;
    },
    // ----------------- animateToMovable
    animateToMovable: function() {
	    var self = this;
	    if(this.is_fixed || this.is_fixed_prep){
		    //fade out h logo
		    //delay fade in new logo
		    //delay fade in stroke
		    //set position to absolute
		    $(self.el).css('position', 'absolute');
		    $(self.el).css('top', self.default_top);
		    $(self.el).removeClass(self.TOP_STICKY_CLASS);
		    TweenLite.killTweensOf(self.divider_el);
		    TweenLite.killTweensOf(this.logo_el, false, {marginTop:true} );
		    TweenLite.killTweensOf(this.nav_el, false, {marginTop:true} );

		    TweenLite.to(self.divider_el, 0.15, {opacity:1, delay:0.25});
		    TweenLite.to(self.logo_el, 0.1, { opacity:0, onComplete: function(){
			   self.swapLogos();
		    } });
		    TweenLite.to(self.logo_el, 0.4, {marginTop:self.default_logo_el_margin_top, ease: Quart.easeOut, delay:0.15});
		    TweenLite.to(self.nav_el, 0.5, {marginTop:self.default_nav_el_margin_top, ease: Quart.easeOut, delay:0.25});
		    $(self.el).trigger(self.ANIMATE_TO_MOVEABLE);
		}
		this.is_fixed = false;
		this.is_fixed_prep = false;
    },
    // ----------------- swapLogos
    swapLogosH: function() {
    	this.logo_el.removeClass(this.FULL_LOGO_CLASS);
	    this.logo_el.addClass(this.H_LOGO_CLASS);
	    TweenLite.killTweensOf(this.logo_el, false, {opacity:true} );
	    TweenLite.to(this.logo_el, 0.15, {opacity:1, delay:0});
    },
    // ----------------- swapLogos
    swapLogos: function() {
		this.logo_el.removeClass(this.H_LOGO_CLASS);
		this.logo_el.addClass(this.FULL_LOGO_CLASS);
		TweenLite.killTweensOf(this.logo_el, false, {opacity:true} );
	    TweenLite.to(this.logo_el, 0.25, {opacity:1});
    },
    // ----------------- show
    show: function() {
	    TweenLite.to(this.logo_el, 0.5, {opacity:1, delay:0.5});
    },
    // ----------------- markBtn
    markBtn: function(btn_id, delay) {
	    var self = this;
	    var attr_btn_id = "";
	    clearTimeout(this.markBtnTimeout);
	    if(delay == null) delay = false;
	    if(delay){
		    this.markBtnTimeout = setTimeout(function(){
			    if( !main.router.autoScrolling ){
				    $('.nav-btn', self.el).each(function(){
				        attr_btn_id = $(this).attr('id');
				        if(attr_btn_id.indexOf(btn_id) > -1){
						     $(this).addClass('active');
						     TweenLite.to(this, 1, {height:self.default_nav_btn_height, ease: Expo.easeOut});
					    }
						else{
							TweenLite.killTweensOf(this, false, {height:true} );
							$(this).css('height', self.OFF_NAV_HEIGHT);
							$(this).removeClass('active');
						} 
					 });
				 }
		    }, 100);
	    }
	    else{
			if( !main.router.autoScrolling ){
			    $('.nav-btn', self.el).each(function(){
				    //if($(this).hasClass(btn_id + self.BTN_CLASS_END_STR, self.el)){
                    attr_btn_id = $(this).attr('id');
				    if(attr_btn_id.indexOf(btn_id) > -1){
						$(this).addClass('active');
						 TweenLite.to(this, 1, {height:self.default_nav_btn_height, ease: Expo.easeOut});
				    } 
					else{
						 TweenLite.killTweensOf(this, false, {height:true} );
						$(this).css('height', self.OFF_NAV_HEIGHT);
						$(this).removeClass('active');
					} 
				 });
			 }
	    }
    },
    // ----------------- beginHide
    beginHide: function() {
	    //get current Y
	    var cur_top = parseInt($(this.el).css('top'));
	    //move this down and fade it out
	    $(this.el).addClass(this.TRANS_CLASS);
	    $(this.el).css('top', (cur_top + this.HIDE_ANIMATE_OFFSET)+ 'px');
	    $(this.el).css('opacity', '0');
	},
	// ----------------- onBtnClick
    onBtnClick: function(event) {
        console.log("onBtnClick -----");
        main.utils.BtnUtils.onBtnClick(event);
        return false;
    },
    // ----------------- onLogoClick
    onLogoClick: function(event) {
        main.utils.BtnUtils.onLogoClick(event);
	    return false;
    }	
});