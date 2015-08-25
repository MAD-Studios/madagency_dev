// _________________________________________________________________________ CorporateView
main.views.corporate.CorporateView = main.views.CorporateView.extend({
    // ----------------- renderParts
    renderParts: function() {
		this.paneContainerView = new main.views.corporate.PaneContainerView({el: $('#pane-ctn', this.el)});
    },
    // ----------------- afterOnScroll
    afterOnScroll: function(scroll_top) {
        this.mainNavContainerView.checkPos(scroll_top);
    },
    // ----------------- beforePosize
    beforePosize: function() {
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