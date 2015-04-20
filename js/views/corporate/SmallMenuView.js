// _________________________________________________________________________ SmallMenuView
main.views.SmallMenuView = Backbone.View.extend({
	ARROW_UP_CLASS: "arrow-up",
	ARROW_TRANSITION_CLASS: "arrow-transition",
	ARROW_LEFT_CLASS: "arrow-left",
	TOP_BORDERED_CLASS: "top-bordered",
	MENU_TRANSITION_CLASS: "menu-transition",
	MENU_TRANSITION_Y_CLASS: "menu-transition-y",
	SOCIAL_NAV_TRANSITION_H_CLASS: "social-nav-cnt-transition-h",
	OFFSET_Y: 12, 
	OPEN: "open",
	CLOSE: "close",
	state: "",
	width_offset: 0,
	scroll_y_offset: 0,
	is_open: false,
	social_is_shown: false,
	events: {
		'click .btn-how' : 'onHowBtnClick',
		'click .btn-work' : 'onWorkBtnClick',
		'click .btn-team' : 'onTeamBtnClick',
		'click .btn-disciplines' : 'onDisciplinesBtnClick',
		'click .btn-contact' : 'onContactBtnClick',
		'click .btn-social' : 'onSocialBtnClick',
		'click .btn-nav': 'onBtnNavClick'
	},
    // ----------------- initialize
    initialize: function() {
        console.log("SmallMenuView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("SmallMenuView ---- render");
        var self = this;
        this.nav_cnt_el = $('.nav-cnt', this.el);
        this.social_nav_cnt_el = $('.social-nav-cnt', this.el);
        this.social_nav_cnt_el.addClass(this.SOCIAL_NAV_TRANSITION_H_CLASS);
        this.social_nav_arrow_img_el = $('.arrow', this.social_nav_cnt_el);
        this.social_nav_arrow_img_el.addClass(this.ARROW_TRANSITION_CLASS);
        this.btn_nav_el = $('.btn-nav', this.el);
        this.nav_arrow_img_el = $('.arrow', this.btn_nav_el);
        this.nav_arrow_img_el.addClass(this.ARROW_TRANSITION_CLASS);
        this.state = this.CLOSE;
        setTimeout(function(){
	        self.scroll_y_offset = self.btn_nav_el.height();
        	//self.width_offset = self.nav_cnt_el.width();
	        $(self.el).addClass(self.MENU_TRANSITION_CLASS);
        }, 100);
        return this;
	},
    // ----------------- posize
    posize: function() {
		var to_w = $(window).width() - this.btn_nav_el.outerWidth();
		var max_w = parseInt( this.nav_cnt_el.css('max-width') );
		if(to_w > max_w) to_w = max_w;
		this.nav_cnt_el.width( to_w );
		//position it to the left od stage is state is closed
		var to_left = -to_w - 1; 
		if(this.state == this.CLOSE) $(this.el).css( 'left', to_left + 'px' );
		else  $(this.el).css( 'left', -1 + 'px' );
	},
	// ----------------- open
    toggleNav: function() {
	    if(this.is_open) this.close();
	    else this.open();
    },
	// ----------------- open
    open: function() {
	    var self = this;
	    $(this.el).css( 'left', '-1px' );
	    this.state = this.OPEN;
	    //$(this.el).trigger(this.OPEN);
		this.is_open = true;
		clearTimeout(this.rotateArrowTimeout);
		//setTimeout to rotate the arrow
		this.rotateArrowTimeout = setTimeout(function(){
			self.nav_arrow_img_el.addClass(self.ARROW_LEFT_CLASS);
		}, 250);
	},
    // ----------------- close
    close: function() {
    	var self = this;
	    var to_left = -(this.nav_cnt_el.outerWidth());
	    $(this.el).css( 'left', to_left + 'px' )
    	this.state = this.CLOSE;
    	this.hideSocial();
    	//$(this.el).trigger(this.CLOSE);
    	this.is_open = false;
    	clearTimeout(this.rotateArrowTimeout);
		//setTimeout to rotate the arrow
		this.rotateArrowTimeout = setTimeout(function(){
			self.nav_arrow_img_el.removeClass(self.ARROW_LEFT_CLASS);
		}, 250);
    },
    // ----------------- beginHide
    beginHide: function() {
	    //get current x
	    var cur_left = parseInt($(this.el).css('left'));
	    //move this left 
	    $(this.el).css('left', (cur_left - $(this.btn_nav_el).outerWidth()) + 'px');
	},	
	// ----------------- toggleSocial
    toggleSocial: function() {
	    if(this.social_is_shown) this.hideSocial();
	    else this.showSocial();
    },
	// ----------------- showSocial
    showSocial: function() {
    	var self = this;
	    var to_height = $('.header', this.social_nav_cnt_el).outerHeight() + $('.social-nav', this.el).outerHeight();
	    //animate the height of the 'social-nav-cnt'
	    //to fit header height + social nav height
	    this.social_nav_cnt_el.css('height', to_height + 'px');
	    this.social_is_shown = true;
	    clearTimeout(this.socialRotateArrowTimeout);
		//setTimeout to rotate the arrow
		this.socialRotateArrowTimeout = setTimeout(function(){
			self.social_nav_arrow_img_el.addClass(self.ARROW_UP_CLASS);
		}, 50);
	},
	// ----------------- hideSocial
    hideSocial: function() {
	    var self = this;    
    	var to_height = $('.header', this.social_nav_cnt_el).outerHeight();
	    //animate the height of the 'social-nav-cnt'
	    //to fit header height
	    this.social_nav_cnt_el.css('height', to_height + 'px');
	    this.social_is_shown = false;
	    clearTimeout(this.socialRotateArrowTimeout);
		//setTimeout to rotate the arrow
    	this.socialRotateArrowTimeout = setTimeout(function(){
			self.social_nav_arrow_img_el.removeClass(self.ARROW_UP_CLASS);
		}, 50);
	},
	// ----------------- onSocialBtnClick
    onSocialBtnClick: function(event) {
	    this.toggleSocial();
	    return false;
    },
    // ----------------- onHowBtnClick
    onHowBtnClick: function(event) {
	    this.toggleNav();
	    //setTimeout(function(){
		    if (Modernizr.history) main.router.navigate('', {trigger: false});
		    main.router.navigate('how', {trigger: true});
	    //}, 300);
	    return false;
    },
    // ----------------- onWorkBtnClick
    onWorkBtnClick: function(event) {
    	this.toggleNav();
    	//setTimeout(function(){
	    	if (Modernizr.history) main.router.navigate('', {trigger: false});
		    main.router.navigate('work', {trigger: true});
	    //}, 300);	    
	    return false;
    },
    // ----------------- onHowBtnClick
    onTeamBtnClick: function(event) {
	    this.toggleNav();
	    //setTimeout(function(){	     
	        if (Modernizr.history) main.router.navigate('', {trigger: false});
		    main.router.navigate('team', {trigger: true});
	    //}, 300);	    
	    return false;
    },
    // ----------------- onHowBtnClick
    onDisciplinesBtnClick: function(event) {
	    this.toggleNav(); 
	    //setTimeout(function(){	       
	        if (Modernizr.history) main.router.navigate('', {trigger: false});
		    main.router.navigate('disciplines', {trigger: true});
	    //}, 300);	    
	    return false;
    },  
	// ----------------- onHowBtnClick
    onContactBtnClick: function(event) {
	    this.toggleNav();
	    //setTimeout(function(){	    
	        if (Modernizr.history) main.router.navigate('', {trigger: false});
		    main.router.navigate('contact', {trigger: true});
	    //}, 300);	    
	    return false;
    },
    // ----------------- onBtnNavClick
    onBtnNavClick: function(event) {
	    this.toggleNav();
	    return false;
    },
    // ----------------- checkMenu
    checkMenu: function(scrollTop){
	    var self = this;
	    clearTimeout(this.hideBorderTimeout);
	    if(scrollTop >= this.scroll_y_offset){
		    $(this.el).css('top', this.OFFSET_Y + 'px');
		    $(this.el).addClass(this.TOP_BORDERED_CLASS);
	    } 
	    else {
		    $(this.el).css('top', '0');
		    this.hideBorderTimeout = setTimeout(function(){
			    $(self.el).removeClass(self.TOP_BORDERED_CLASS);
		    }, 300);
	    }
    }
});