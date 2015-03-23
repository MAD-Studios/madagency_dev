// _________________________________________________________________________ MainView
main.views.MainView = Backbone.View.extend({
	STAGE_LEFT_CLASS: "stage-left",
	STAGE_CENTER_CLASS: "stage-center",
	STAGE_RIGHT_CLASS: "stage-right",
	STAGE_TRANSITION: "stage-transition",
	EXIT_STORY_PANE: "contact",
    // ----------------- initialize
    initialize: function() {
        console.log("MainView ---- initialize");
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("MainView ---- initialize");
        var self = this;
        this.initiateCorporate();
        $(window).resize(
	       function(){ self.posize(); }
        );
        return this;
	},
	// ----------------- posize
    posize: function() {
	    $(this.el).css('height', $(window).height() + 'px');
	    if(this.corporateView && this.corporateView.posize) this.corporateView.posize();
	    if(this.storyView && this.storyView.posize) this.storyView.posize();
    },
    // ----------------- scrollToPane
    scrollToPane: function(id) {
	   this.corporateView.scrollWindowTo(id);
	   this.corporateView.markNav(id);
    },
    // ----------------- openStory
    openStory: function() {
	    var self = this;
	    var story_div;
	    if(!this.storyView) this.storyView = new main.views.StoryView( { el: $('.story', this.el) } );
	    else {
			this.storyView = new main.views.StoryView();
		    $(this.el).append($(this.storyView.el));
		}
	    //create Story view
	    $(this.storyView.el).on(this.storyView.EXIT, function(event){
		    self.closeStory();
	    });
	    $(this.storyView.el).on(this.storyView.HIDE_COMPLETE, function(event){
		    self.handleHideStoryComplete();
	    });
	    $(this.storyView.el).addClass(this.STAGE_CENTER_CLASS);
	    this.storyView.render();
	    this.storyView.startLoader();
	    setTimeout(function(){
	    	self.storyView.show();
		    setTimeout(function(){
			    self.removeCorporate();
		    }, 1200);
	    }, 100);
	},
	// ----------------- closeStorys
    closeStory: function() {
	    var self = this;
	    //first hide the story
	    this.storyView.hide();	    
	},
    // ----------------- handleHideStoryComplete
    handleHideStoryComplete: function() {
	    var self = this;
	    setTimeout(function(){
	        $(document.body).height($(window).height());
	        $(document.body).css('overflow-x', 'visible');
	        $(document.body).css('overflow-y', 'visible');
	        $(document.documentElement).css('overflow-x', 'visible');
	        $(document.documentElement).css('overflow-y', 'visible');
	        $(document.documentElement).removeClass('no-skrollr');
		    //add the corporate view back
		    self.initiateCorporate();
		    //add the left transition class
		    $(self.corporateView.el).addClass(self.STAGE_TRANSITION);
		    $(self.storyView.el).addClass(self.STAGE_TRANSITION);
		    $(self.corporateView.el).removeClass(self.STAGE_CENTER_CLASS);
		    $(self.corporateView.el).addClass(self.STAGE_LEFT_CLASS);
		    $(self.corporateView.el).css('top', '0');
		    //set it to the left of the stage
		    //transition the story view 
		    //out to the right
		    //set it from fixed to absolute
		    setTimeout(function(){
			    $(self.storyView.el).css('position', 'absolute');
			    $(self.corporateView.el).removeClass(self.STAGE_CENTER_CLASS);
			    $(self.storyView.el).addClass(self.STAGE_RIGHT_CLASS);     
			    //add webkit transition end listener
			    $(self.storyView.el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
				    $(self.storyView.el).off('transitionend webkitTransitionEnd oTransitionEnd');
				    self.removeStory();
				});
			    //trasnition th ecorporate view
			    //in from the left
			    $(self.corporateView.el).removeClass(self.STAGE_LEFT_CLASS);
			    $(self.corporateView.el).addClass(self.STAGE_CENTER_CLASS);
		    }, 300);
		 }, 100);
    },
     // ----------------- moveIntoStory
    moveIntoStory: function(){
	    //first begin the hide animation 
	    //of the corporate view
	    //then open/add the story view 
	    //so that the memory spike during the add
	    //does not affect the performance of
	    //the hide animation
	    var self = this;
	    this.beginHideCorporateView();
	    setTimeout(function(){
		    self.openStory();
	    }, 1400);
    },
    // ----------------- initiateCorporate
    initiateCorporate: function(){
	    var self = this;
	    if(!this.corporateView) this.corporateView = new main.views.CorporateView( {el: $('.corporate', this.el)} );
	    else {
		    this.corporateView = new main.views.CorporateView();
		    this.corporateView.unfixHeader();
		    $(this.el).append($(this.corporateView.el));
		    //set scrolltop to go to the 
		    //contact pane
		    setTimeout(function(){
			    var animate = false;
			    self.corporateView.scrollWindowTo(self.EXIT_STORY_PANE, animate);
			    self.corporateView.fixHeader();
		    }, 200);
	    }
	    //append corporate view
	    $(this.corporateView.el).on(this.corporateView.CORPORATE_SUBMIT, function(event){
		    self.moveIntoStory();
        });
        //listen fo rthe method pane idle event
        //so that you can 
        //automatically go into the story
        //when the method pane is idle
	    $(this.corporateView.el).on(this.corporateView.METHOD_PANE_IDLE, function(event){
	    	self.moveIntoStory();
	    });
    },
    // ----------------- beginHideCorporateView
    beginHideCorporateView: function() {
	    this.corporateView.beginHide();
    },
    // ----------------- removeCorporate
    removeCorporate: function() {
	    this.corporateView.dispose(); 
	    $(this.corporateView.el).remove();
	    $(this.corporateView.el).off();
    },
    // ----------------- removeStory
    removeStory: function() {
	    this.storyView.dispose(); 
	    $(this.storyView.el).css('visibility', 'hidden');
	    $(this.storyView.el).remove();
	    $(this.storyView.el).off();
    }
});