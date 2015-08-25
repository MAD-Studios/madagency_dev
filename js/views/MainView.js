// _________________________________________________________________________ MainView
main.views.MainView = Backbone.View.extend({
	STAGE_LEFT_CLASS: "stage-left",
	STAGE_CENTER_CLASS: "stage-center",
	STAGE_RIGHT_CLASS: "stage-right",
	STAGE_TRANSITION: "stage-transition",
	EXIT_STORY_PANE: "contact",
	elementManipulator: main.utils.ElementManipulator,
    // ----------------- initialize
    initialize: function() {
        console.log("MainView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("MainView ---- render");
        var self = this;
        this.setMainListeners();
        this.initiateCorporate();
        if(this.setCorporateListeners) this.setCorporateListeners();
        setTimeout(function(){
	        self.posize();
        }, 300);
        $(window).resize(
	       function(){ self.posize(); }
        );
        return this;
	},
	// ----------------- posize
    posize: function() {
	    if(this.corporateView && this.corporateView.posize) this.corporateView.posize();
	    if(this.castleView && this.castleView.posize) this.castleView.posize();
	    /*if($(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS)){
		   	this.disableDocumentScroll();
	    }
	    else this.enableDocumentScroll();*/
    },
    // ----------------- setMainListeners
    setMainListeners: function() {
    	var self = this;
		/*$(this.el).on(main.events.Event.ENABLE_DOCUMENT_SCROLL, function(){
			self.enableDocumentScroll();
		});
		$(this.el).on(main.events.Event.DISABLE_DOCUMENT_SCROLL, function(){
			self.disableDocumentScroll();
		});*/
    },
    // ----------------- enableDocumentScroll
    /*enableDocumentScroll: function() {
		this.elementManipulator.enableDocumentScroll();
		this.updateDocumentScroll();
    },
    // ----------------- disableDocumentScroll
    disableDocumentScroll: function() {
    	this.elementManipulator.disableDocumentScroll();
		this.updateDocumentScroll();
    },
    // ----------------- enableDocumentScroll
    updateDocumentScroll: function() {
    	if($(document.documentElement).hasClass(this.elementManipulator.NO_DOCUMENT_SCROLL_CLASS)){
		   $(this.el).css('height', ($(window).outerHeight()) + 'px');
	    }
	    else $(this.el).css('height', $(this.corporateView.el).outerHeight() + 'px');
    },*/
    // ----------------- scrollToPane
    scrollToPane: function(id) {
	   this.corporateView.scrollWindowTo(id);
	   this.corporateView.markNav(id);
    },
    // ----------------- initiateCorporate
    initiateCorporate: function(){ 
  	    if(!this.corporateView) this.corporateView = new main.views.CorporateView( {el: $('.corporate', this.el)} );
    }
});