// _________________________________________________________________________ CorporateView
main.views.CorporateView = Backbone.View.extend({
	CORPORATE_SUBMIT: "corporate_submit",
	CORPORATE: "corporate",
	CORPORATE_INIT: "corporate-init",
	METHOD_PANE_IDLE: "method_pane_idle",
	template_load_external: false,
	templateLoader: main.utils.templateLoader,
    // ----------------- initialize
    initialize: function() {
        console.log("CorporateView ---- initialize");
        //if no el pull it in through template loader
       /* if(!($(this.el).hasClass(this.CORPORATE_INIT))) {
	         console.log("template load external");
	         this.template = _.template(this.templateLoader.get(this.CORPORATE));
	         this.template_load_external = true;
        }*/
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("CorporateView ---- render");
	    var self = this;
	    if(this.template_load_external) {
		    $(this.el).html(this.template());
		    $(this.el).addClass(this.CORPORATE);
	    }
        this.paneContainerView = new main.views.PaneContainerView({el: $('#pane-container', this.el)});
        this.mainNavContainerView = new main.views.MainNavContainerView({el: $('#main-nav-container', this.el)});
        this.headerView = new main.views.HeaderView({el: $('#header', this.el)});
        this.mainNavContainerView.transition_point = $('#header', this.el).outerHeight();
        this.footerView = new main.views.FooterView({el: $('#footer', this.el)});  
        $(this.paneContainerView.el).on(this.paneContainerView.PANE_ACTIVATE, function(event, params){
	        //for all
	        //mark the correct nav
	        self.markNav(params, true);
        });
        $(this.paneContainerView.el).on(this.paneContainerView.METHOD_PANE_SUBMIT, function(event){
	        $(self.el).trigger(self.CORPORATE_SUBMIT);
        });
        $(this.paneContainerView.el).on(this.paneContainerView.SCROLL_TO_BOTTOM, function(event, params){
			self.scrollToBottom();
        });
        $(this.mainNavContainerView.el).on(this.mainNavContainerView.ANIMATE_TO_FIXED, function(){
	        self.headerView.lightenBackground();
        });
		$(this.mainNavContainerView.el).on(this.mainNavContainerView.ANIMATE_TO_MOVEABLE, function(){
	        self.headerView.darkenBackground();
        });
        $(window).scroll(function(){
        	self.mainNavContainerView.checkPos();
	        self.paneContainerView.checkPanes();
	    });
       this.modernCheck();
       setTimeout(function(){
           self.paneContainerView.offset = $(self.headerView.el).outerHeight();
	       if(self.template_load_external) self.posize();
	       self.show();
       }, 100);
       return this;
	},
	// ----------------- modernCheck
    modernCheck: function() {
	    //if 3dTransforms not supported
	    //csstransforms3d
	    //show method pane view for
	    //unsupported browsers
	    if (!Modernizr.csstransforms3d){
		    this.paneContainerView.updateForUnsupportedBrowsers();
		}
    },
	// ----------------- posize
    posize: function() {
	    $(this.el).css('height', $(window).height() + 'px');
	    $('.corporate', this.el).css('height', $(window).height() + 'px');
	     this.paneContainerView.posize();
	     this.mainNavContainerView.posize();
    },
    // ----------------- unfixHeader
    unfixHeader: function(){
	   $(this.headerView.el).css('position', 'absolute');
	   $(this.headerView.el).css('top', '0');
	   $(this.headerView.el).css('left', '0');
    },
     // ----------------- fixHeader
    fixHeader: function(){
	    $(this.headerView.el).css('position', 'fixed');
	    $(this.headerView.el).css('float', 'none');
	    $(this.headerView.el).css('top', '0');
	    $(this.headerView.el).css('left', '0');
    },
    // ----------------- scrollWindowTo
    scrollWindowTo: function(id, animate) {
	    if(animate == null ||  typeof animate === undefined) animate = true;
	   this.paneContainerView.scrollWindowTo(id, animate);
    },
     // ----------------- scrollTo
    scrollToBottom: function() {
	   this.paneContainerView.scrollToBottom($(window));
    },
    // ----------------- beginHide
    beginHide: function() {
	    this.headerView.beginHide();
	    this.mainNavContainerView.beginHide();
	    this.paneContainerView.beginHide();
	    this.basicDispose();
	    //add the gold cover
	    //setTimeout
	    //show the gold cover
	    //move corporate off stage and make it invisible
    },
    // ----------------- hide
    hide: function() {
    },
	// ----------------- show
    show: function() {
	     $(this.el).css('visibility', 'visible');
    },
    // ----------------- markNav
    markNav: function(btn_id, delay) {
    	if(delay == null) delay = false;
	    this.mainNavContainerView.markBtn(btn_id, delay);
	},
	// ----------------- basicDispose
	basicDispose: function(){
		$(window).off('scroll');
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
		 $(this.el).removeClass(this.CORPORATE_INIT);
		 //remove any event listeners 
		 $(this.paneContainerView.el).off();
		 $(this.mainNavContainerView.el).off();
	     $(window).off('scroll');
		 //dispose children
		 this.paneContainerView.dispose();
		 this.mainNavContainerView.dispose();
		 this.headerView.dispose();
		 this.footerView.dispose();
	}
});