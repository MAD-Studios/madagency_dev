// _________________________________________________________________________ TeamPaneView
main.views.corporate.TeamPaneView = main.views.PaneView.extend({
	id: "team",
	_route: "team",
	events: {
		'click .btn-move' : 'onBtnMoveClick'
	},
	// ----------------- initialize
    initialize: function() {
        console.log("TeamPaneView ---- initialize");
    },
	// ----------------- beforeRender
    /*beforePosize: function() {
        if($('.hide-for-small .pane-title', this.el).parent().css('display') != 'none') this.offset = -($('.hide-for-small .pane-title', this.el).outerHeight() + $('.hide-for-small .divider', this.el).outerHeight());
        else this.offset = -$('.hide-for-small .divider', this.el).outerHeight();
    },*/
    // ----------------- onBtnMoveClick
    onBtnMoveClick: function() {
	    main.router.navigate('team', {trigger: false});
    	main.router.navigate('work', {trigger: true});
	    return false;
    }
});