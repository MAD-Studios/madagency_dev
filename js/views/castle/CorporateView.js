// _________________________________________________________________________ CorporateView
main.views.castle.CorporateView = main.views.CorporateView.extend({
    // ----------------- renderParts
    renderParts: function() {
    	this.paneContainerView = new main.views.castle.PaneContainerView({el: $('#pane-container', this.el)});

        this.modernCheck();
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
    }
});