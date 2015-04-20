// _________________________________________________________________________ CorporateView
main.views.CorporateView = Backbone.View.extend({
	CORPORATE: "corporate",
    // ----------------- initialize
    initialize: function() {
        console.log("CorporateView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
       console.log("CorporateView ---- render");
	   var self = this;
        
       this.renderCommonParts();
       setTimeout(function(){
	       self.show();
       }, 100); 
        
       return this;
	},
    // ----------------- renderCommonParts
    renderCommonParts: function() {
        var self = this;
        this.headerView = new main.views.HeaderView({el: $('#header', this.el)});
        this.footerView = new main.views.FooterView({el: $('#footer', this.el)});  
        $(window).scroll(function(){
            self.onScroll();
	    });
        
        if (this.renderParts) this.renderParts();
        //this.paneContainerView = new main.views.PaneContainerView({el: $('#pane-ctn', this.el)});
        
        $(this.paneContainerView.el).on(this.paneContainerView.PANE_ACTIVATE, function(event, params){
	        //for all
	        //mark the correct nav
	        self.markNav(params, true);
        });
        $(this.paneContainerView.el).on(this.paneContainerView.SCROLL_TO_BOTTOM, function(event, params){
			self.scrollToBottom();
        });
        $(this.paneContainerView.el).on(this.paneContainerView.UPDATE_HEIGHT, function(event){
            setTimeout(function(){
			 self.posize();
            }, 400);
        });
    },
    // ----------------- onScroll
    onScroll: function() {
        var scroll_top = $(window).scrollTop();

        this.paneContainerView.checkPanes(scroll_top);
        if(this.afterOnScroll) this.afterOnScroll(scroll_top);
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
        if(this.beforePosize) this.beforePosize();
        
	    //this.paneContainerView.nav_offset = $(this.mainNavContainerView.el).outerHeight();
        this.paneContainerView.offset = $(this.headerView.el).outerHeight();
	    this.paneContainerView.posize();
	    
	    var to_height = $(this.paneContainerView.el).outerHeight() + $('#footer', this.el).outerHeight(); 
        console.log("$(this.paneContainerView.el).outerHeight() = " + $(this.paneContainerView.el).outerHeight());
        console.log("$('#footer', this.el).outerHeight() = " + $('#footer', this.el).outerHeight());
	    $(this.el).css('height', to_height + 'px');
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
    // ----------------- hide
    hide: function() {
    },
	// ----------------- show
    show: function() {
	     $(this.el).css('visibility', 'visible');
    },
    // ----------------- markNav
    markNav: function(btn_id, delay) {
	},
	// ----------------- basicDispose
	basicDispose: function(){
		$(window).off('scroll');
	},
	// ----------------- beforeDispose
	beforeDispose: function(){
         this.basicDispose();
		 //remove any event listeners 
		 $(this.paneContainerView.el).off();
		 //dispose children
		 this.paneContainerView.dispose();
		 this.headerView.dispose();
		 this.footerView.dispose();
        
        if(this.disposeParts) this.disposeParts();
	}
});