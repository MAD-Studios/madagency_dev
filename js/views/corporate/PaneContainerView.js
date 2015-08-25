// _________________________________________________________________________ PaneContainerView
main.views.corporate.PaneContainerView = main.views.PaneContainerView.extend({
    // ----------------- renderPanes
    renderPanes: function() {
        var self = this;
        var to_height = 0;
        
        this.fauxIntroPaneView = new main.views.corporate.FauxIntroPaneView( {el: $('#faux-intro-pane', this.el)} );
        this.paneViews.push(this.fauxIntroPaneView);
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
        this.fauxIntroPaneView.activate();
        this.introPaneView.activate();
        
        setTimeout(function(){
            to_height = self.introPaneView.getScrollHeight();
            self.fauxIntroPaneView.setHeight(to_height);
        }, 1000);
        
        //listen for fauxIntroPaneView
        //active and set 
        //introPaneView to active
        $(this.fauxIntroPaneView.el).on(this.fauxIntroPaneView.ACTIVE, function(event){
            self.introPaneView.activate();
        });
        
        //this.curPaneView = this.introPaneView;
        this.curPaneView = this.fauxIntroPaneView;
        
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
    // ----------------- beforePosize
    beforePosize: function() {
    	 this.introPaneView.nav_offset = this.nav_offset;
    }
});