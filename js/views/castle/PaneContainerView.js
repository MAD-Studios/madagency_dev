// _________________________________________________________________________ PaneContainerView
main.views.castle.PaneContainerView = main.views.PaneContainerView.extend({
    // ----------------- renderPanes
    renderPanes: function() {
        this.castleGatewayPaneView = new main.views.castle.CastleGatewayPaneView({ el: $('#castle-gateway-pane', this.el) });
		this.paneViews.push(this.castleGatewayPaneView);
		
		this.castleGatewayPaneView.activate();
        this.curPaneView = this.castleGatewayPaneView;
    },
    // ----------------- updateForUnsupportedBrowsers
    updateForUnsupportedBrowsers: function() {
	    this.castleGatewayPaneView.updateForUnsupportedBrowsers();
	},
	// ----------------- afterBeginHide
    afterBeginHide: function() {
	    //not going into this
    	//begin hide the gateway view
    	this.castleGatewayPaneView.beginHide();
    }
});