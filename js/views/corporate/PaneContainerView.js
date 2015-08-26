// _________________________________________________________________________ PaneContainerView
main.views.corporate.PaneContainerView = main.views.PaneContainerView.extend({
    view_delay_reached: false,
    // ----------------- renderPanes
    renderPanes: function() {
        var self = this;
        
        this.introPaneView = new main.views.corporate.IntroPaneView( {el: $('#intro-pane', this.el)} );
        this.paneViews.push(this.introPaneView);
        this.howPaneView = new main.views.corporate.HowPaneView( {el: $('#how-pane', this.el)} );
        this.paneViews.push(this.howPaneView);
        this.workPaneView = new main.views.corporate.WorkPaneView( {el: $('#work-pane', this.el)} );
        this.paneViews.push(this.workPaneView);
        this.teamPaneView = new main.views.corporate.TeamPaneView( {el: $('#team-pane', this.el)} );
        this.paneViews.push(this.teamPaneView);
        this.disciplinesPaneView = new main.views.corporate.DisciplinesPaneView( {el: $('#disciplines-pane', this.el)} );
        this.paneViews.push(this.disciplinesPaneView);
        this.contactPaneView = new main.views.corporate.ContactPaneView( {el: $('#contact-pane', this.el)} );
        this.paneViews.push(this.contactPaneView);
        
        //set the introPaneView to active
        this.introPaneView.activate();
        
        setTimeout(function(){
            self.syncIntroPanes();
            self.view_delay_reached = true;
            $(self.el).trigger(self.UPDATE_HEIGHT);
        }, 1000);
        
        this.curPaneView = this.introPaneView;
        
        //work pane ----
        $(this.workPaneView.el).on(this.workPaneView.VIDEO_ADDED, function(event){
            self.posize();
            self.updateHeight();
        });
        //contact pane ----
        $(this.contactPaneView.el).on(this.contactPaneView.RESIZE, function(event){
	        //self.initPanes();
            self.posize();
            self.updateHeight();
        });
        $(this.contactPaneView.el).on(this.contactPaneView.SHOW_MESSAGE, function(event){
	        //scrollto bottom of the screen
	        $(self.el).trigger(self.SCROLL_TO_BOTTOM);
        });
    },
    // ----------------- afterCheckPanes
    afterCheckPanes: function(actual_scroll_top) {
        this.introPaneView.onScroll(actual_scroll_top);
    },
    // ----------------- syncIntroPanes
    syncIntroPanes: function() {
       var to_height = this.introPaneView.getScrollHeight();
       this.introPaneView.setHeight(to_height); 
    },
    // ----------------- beforePosize
    beforePosize: function() {
    	 this.introPaneView.nav_offset = this.nav_offset;
    },
    // ----------------- afterPosize
    afterPosize: function() {
        var self = this;
        //make sure a delay exists before 
        //this is called
        //setTimeout(function(){
            if(self.view_delay_reached) self.syncIntroPanes();
        //}, 100);
    }
});