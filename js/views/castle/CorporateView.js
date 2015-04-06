// _________________________________________________________________________ CorporateView
main.castle.views.CorporateView = Backbone.View.extend({
    // ----------------- renderParts
    renderParts: function() {
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