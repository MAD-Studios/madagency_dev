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
	    //var self = this;
        console.log("TeamPaneView ---- beforeRender");
        //setTimeout(function(){
            //!!!!!!!!!!!!!!
            
	        //self.offset = -($('.pane-title', self.el).outerHeight() + $('.divider', self.el).outerHeight());
        //}, 100);
	},
	// ----------------- beforeRender
    beforePosize: function() {
        console.log("TeamPaneView ------ beforePosize -------  $('.pane-title', this.el).parent().css('display') = " + $('.pane-title', this.el).parent().css('display'));
        if($('.hide-for-small .pane-title', this.el).parent().css('display') != 'none') this.offset = -($('.hide-for-small .pane-title', this.el).outerHeight() + $('.hide-for-small .divider', this.el).outerHeight());
        else this.offset = -$('.hide-for-small .divider', this.el).outerHeight();
    },
    // ----------------- onBtnMoveClick
    onBtnMoveClick: function() {
	    main.router.navigate('team', {trigger: false});
    	main.router.navigate('work', {trigger: true});
	    return false;
    }
});