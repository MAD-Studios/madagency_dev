// _________________________________________________________________________ CorporateView
main.views.castle.CorporateView = main.views.CorporateView.extend({
    // ----------------- renderParts
    renderParts: function() {
    	this.paneContainerView = new main.views.castle.PaneContainerView({el: $('#pane-ctn', this.el)});

        this.modernCheck();
    },
    // ----------------- createSmallMenuView
    createSmallMenuView: function() {
        this.smallMenuView = new main.views.castle.SmallMenuView({el: $('.small-menu', this.el)});
    },
     // ----------------- createMainNavView
    createMainNavView: function() {
        this.mainNavContainerView = new main.views.castle.MainNavContainerView({el: $('#main-nav-ctn', this.el)});
    },
    // ----------------- beginHide
    beginHide: function() {
	    this.headerView.beginHide();
	    console.log("CorporateView ---------paneContainerView beginHide");
	    //this.mainNavContainerView.beginHide();
	    this.paneContainerView.beginHide();
	    this.basicDispose();
	    //add the gold cover
	    //setTimeout
	    //show the gold cover
	    //move corporate off stage and make it invisible
	    //!!!!!!!!!!!!!!!!!!!!!!
    }
});