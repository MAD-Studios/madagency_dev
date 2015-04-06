// _________________________________________________________________________ PaneContainerView
main.castle.views.PaneContainerView = Backbone.View.extend({
    // ----------------- renderPanes
    renderPanes: function() {
        this.castleGatewayPaneView = new main.castle.views.CastleGatewayPaneView({ el: $('#castle-gateway-pane', this.el) });
    },
    // ----------------- updateForUnsupportedBrowsers
    updateForUnsupportedBrowsers: function() {
	    this.castleGatewayPaneView.updateForUnsupportedBrowsers();
	},
});