// _________________________________________________________________________ TeamPaneView
main.views.corporate.TeamPaneView = main.views.PaneView.extend({
	id: "team",
	_route: "team",
	offset: 0,
	events: {
		'click .btn-move' : 'onBtnMoveClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("TeamPaneView ---- initialize");
    },
    // ----------------- beforeRender
    beforeRender: function() {
	    var self = this;
        console.log("TeamPaneView ---- beforeRender");
        setTimeout(function(){
	        self.offset = -($('.pane-title', self.el).outerHeight() + $('.spacer', self.el).outerHeight());
        }, 100);
	},
    // ----------------- onBtnMoveClick
    onBtnMoveClick: function() {
	    main.router.navigate('team', {trigger: false});
    	main.router.navigate('work', {trigger: true});
	    return false;
    }
});