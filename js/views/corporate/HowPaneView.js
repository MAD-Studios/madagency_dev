// _________________________________________________________________________ HowPaneView
main.views.corporate.HowPaneView = main.views.PaneView.extend({
	id: "how",
	_route: "how",
	events: {
		'click .btn-move' : 'onBtnMoveClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("HowPaneView ---- initialize");
        //this.render();
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("HowPaneView ---- beforeRender");
	},
	// ----------------- onBtnMoveClick
    onBtnMoveClick: function() {
        main.router.navigate('how', {trigger: false});
    	main.router.navigate('', {trigger: true});
	    return false;
    }
});