// _________________________________________________________________________ CorporateView
main.views.corporate.CorporateView = main.views.CorporateView.extend({
    // ----------------- renderParts
    renderParts: function() {
        console.log("CorporateView --------- renderParts");
        //var self = this;
		this.paneContainerView = new main.views.corporate.PaneContainerView({el: $('#pane-ctn', this.el)});
		
		console.log("CorporateView --------- renderParts ------ after paneContainerView init" );
    },
    // ----------------- afterOnScroll
    afterOnScroll: function(scroll_top) {
        this.mainNavContainerView.checkPos(scroll_top);
    },
    // ----------------- beforePosize
    beforePosize: function() {
       /* this.mainNavContainerView.posize();
        if($(this.mainNavContainerView.el).css('display') != 'none') this.paneContainerView.nav_offset = $(this.mainNavContainerView.el).outerHeight();
        else this.paneContainerView.nav_offset = 0;
        if(this.smallMenuView.posize) this.smallMenuView.posize(); */
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