// _________________________________________________________________________ CorporateView
main.corporate.views.CorporateView = Backbone.View.extend({
    // ----------------- renderParts
    renderParts: function() {
        var self = this;
        this.mainNavContainerView = new main.views.MainNavContainerView({el: $('#main-nav-container', this.el)});
        this.mainNavContainerView.transition_point = $('#header', this.el).outerHeight();
        $(this.mainNavContainerView.el).on(this.mainNavContainerView.ANIMATE_TO_FIXED, function(){
	        self.headerView.lightenBackground();
        });
		$(this.mainNavContainerView.el).on(this.mainNavContainerView.ANIMATE_TO_MOVEABLE, function(){
	        self.headerView.darkenBackground();
        });
    },
    // ----------------- afterOnScroll
    afterOnScroll: function() {
        this.mainNavContainerView.checkPos(scroll_top);
    },
    // ----------------- beforePosize
    beforePosize: function() {
        this.mainNavContainerView.posize();
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