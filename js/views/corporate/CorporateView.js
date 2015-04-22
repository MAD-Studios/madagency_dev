// _________________________________________________________________________ CorporateView
main.views.corporate.CorporateView = main.views.CorporateView.extend({
    // ----------------- renderParts
    renderParts: function() {
        var self = this;
		this.paneContainerView = new main.views.corporate.PaneContainerView({el: $('#pane-ctn', this.el)});
		
		this.smallMenuView = new main.views.SmallMenuView({el: $('.small-menu', this.el)});

        this.mainNavContainerView = new main.views.MainNavContainerView({el: $('#main-nav-ctn', this.el)});
        this.mainNavContainerView.transition_point = $('#header', this.el).outerHeight();
        $(this.mainNavContainerView.el).on(this.mainNavContainerView.ANIMATE_TO_FIXED, function(){
	        self.headerView.lightenBackground();
        });
		$(this.mainNavContainerView.el).on(this.mainNavContainerView.ANIMATE_TO_MOVEABLE, function(){
	        self.headerView.darkenBackground();
        });
    },
    // ----------------- afterOnScroll
    afterOnScroll: function(scroll_top) {
        this.mainNavContainerView.checkPos(scroll_top);
    },
    // ----------------- beforePosize
    beforePosize: function() {
        this.mainNavContainerView.posize();
        if($(this.mainNavContainerView.el).css('display') != 'none') this.paneContainerView.nav_offset = $(this.mainNavContainerView.el).outerHeight();
        else this.paneContainerView.nav_offset = 0;
        if(this.smallMenuView.posize) this.smallMenuView.posize(); 
    },
    // ----------------- beforePosize
    markNav: function(btn_id, delay) {
    	if(delay == null) delay = false;
	    this.mainNavContainerView.markBtn(btn_id, delay);
	},
    // ----------------- disposeParts
    disposeParts: function() {
        $(this.mainNavContainerView.el).off();
        this.mainNavContainerView.dispose();
    }
});