// _________________________________________________________________________ SmallMenuView
main.views.SmallMenuView = Backbone.View.extend({
	ARROW_UP_CLASS: "arrow-up",
	ARROW_TRANSITION_CLASS: "arrow-transition",
	ARROW_LEFT_CLASS: "arrow-left",
	TOP_BORDERED_CLASS: "top-bordered",
	MENU_TRANSITION_CLASS: "menu-transition",
	MENU_TRANSITION_Y_CLASS: "menu-transition-y",
	SOCIAL_NAV_TRANSITION_H_CLASS: "social-nav-ctn-transition-h",
    BTN_SELECTOR_SUFFIX: "-btn",
	OFFSET_Y: 12, 
	OPEN: "open",
	CLOSE: "close",
	state: "",
	width_offset: 0,
	scroll_y_offset: 0,
	is_open: false,
	social_is_shown: false,
	has_posized: false,
	events: {
		'click .toggle-btn' : 'onToggleBtnClick',
		'click .social-btn' : 'onSocialBtnClick',
		'click #how-btn' : 'onBtnClick',
		'click #work-btn' : 'onBtnClick',
		'click #team-btn' : 'onBtnClick',
		'click #disciplines-btn' : 'onBtnClick',
		'click #contact-btn' : 'onBtnClick'
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
        this.nav_cnt_el = $('.nav-ctn', this.el);
        this.social_nav_cnt_el = $('.social-nav-ctn', this.el);
        this.social_nav_cnt_el.addClass(this.SOCIAL_NAV_TRANSITION_H_CLASS);
        this.social_nav_arrow_img_el = $('.arrow', this.social_nav_cnt_el);
        this.social_nav_arrow_img_el.addClass(this.ARROW_TRANSITION_CLASS);
        this.btn_toggle_el = $('.toggle-btn', this.el);
        this.nav_arrow_img_el = $('.arrow', this.btn_toggle_el);
        this.nav_arrow_img_el.addClass(this.ARROW_TRANSITION_CLASS);
        this.state = this.CLOSE;
        setTimeout(function(){
	        self.scroll_y_offset = self.btn_toggle_el.height();
	        $(self.el).addClass(self.MENU_TRANSITION_CLASS);
        }, 500);
        return this;
	},
    // ----------------- posize
    posize: function() {
        var self = this;
        var to_w = $(window).width() - this.btn_toggle_el.outerWidth();
		var max_w = parseInt( this.nav_cnt_el.css('max-width') );
		if(to_w > max_w) to_w = max_w;
		this.nav_cnt_el.width( to_w );
        //if first time here
        //set a delay
        if(!this.has_posized){
            setTimeout(function(){
                self.posNav(to_w);
                self.has_posized = true;
    		}, 600);
        }
        else this.posNav(to_w);
	},
    // ----------------- posNav
    posNav: function(to_w) {
		//position it to the left od stage is state is closed
		var to_left = -to_w - 1; 
        if(this.state == this.CLOSE) $(this.el).css( 'left', to_left + 'px' );
    	else  $(this.el).css( 'left', -1 + 'px' );
    },
	// ----------------- toggleNav
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
	    $(this.el).css('left', (cur_left - $(this.btn_toggle_el).outerWidth()) + 'px');
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
	    //animate the height of the 'social-nav-ctn'
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
	    //animate the height of the 'social-nav-ctn'
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
    // ----------------- onBtnClick
    onBtnClick: function(event) {
    	this.toggleNav();
    	if($(event.currentTarget).attr("id")) {
	    	var id = $(event.currentTarget).attr("id");
	    	id = id.replace(this.BTN_SELECTOR_SUFFIX, "");
    	}
        $(this.el).trigger(main.events.Event.ENABLE_DOCUMENT_SCROLL);
        setTimeout(function(){
            if (Modernizr.history) main.router.navigate('', {trigger: false});
        	main.router.navigate(id, {trigger: true});
        }, 200);
        return false;
    },
    // ----------------- onToggleBtnClick
    onToggleBtnClick: function(event) {
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