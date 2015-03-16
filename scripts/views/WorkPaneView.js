// _________________________________________________________________________ WorkPaneView
main.views.WorkPaneView = main.views.PaneView.extend({
	VIDEO_EMBED_STR: '<iframe src="//instagram.com/p/m5N1iwEWuP/embed/" width="_width_" height="_height_" frameborder="0" scrolling="no" wmode="Opaque" allowtransparency="true"></iframe>',
	//	VIDEO_EMBED_STR: '<iframe src="//instagram.com/p/m5N1iwEWuP/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe>',
	id: "work",
	_route: "work",
	has_been_prepared: false,
	video_added: false,
	video_shown: false,
	offset: 0,
	    // ----------------- initialize
    initialize: function() {
        console.log("WorkPaneView ---- initialize");
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("WorkPaneView ---- beforeRender");
        var self = this;
        this.has_been_prepared = false;
        this.video_shown = false;
        setTimeout(function(){
	        self.offset = -($('.pane-title', self.el).outerHeight() + $('.spacer', self.el).outerHeight()) - 1;
        }, 100);
        //setTimeout to add the video
        setTimeout(function(){
	        self.addVideo();
        }, 1500);
	},
	// ----------------- addVideo
    addVideo: function() {
	    //make the vide the size of its parent
	    var parent_width = $('.video-container', this.el).width();
	    var parent_height = $('.video-container', this.el).height();
	    var embed_str = this.VIDEO_EMBED_STR.replace("_width_", parent_width);
	    embed_str = embed_str.replace("_height_", parent_height);
	    this.video_el = $(embed_str);
	    //this.video_el.css('visibility', 'hidden');
	    this.video_el.css('opacity', '0');
	    if(this.has_been_prepared) this.showVideo();
	    $('.video-container', this.el).append(this.video_el);
	    this.video_added = true;
    },
	// ----------------- showVideo
    showVideo: function() {
	    clearTimeout(this.hideMapTimeout);
	    var self = this;
	    /*this.showVideoTimeout = setTimeout(function(){
		    TweenLite.to(self.video_el, 0.5, {opacity:1, delay:0.75});
	    }, 550);*/
    	TweenLite.to(this.video_el, 0.5, {opacity:1, delay:0.75});
    	this.video_shown = true;
    },
    // ----------------- hideVideo
    hideVideo: function() {
    	//clearTimeout(this.showVideoTimeout);
	    var self = this;
    	//TweenLite.to(this.video_el, 0.5, {opacity:1, delay:0.75});
    	this.hideMapTimeout = setTimeout(function(){ 
		    if(self.video_el) self.video_el.css('opacity', '0');
	    }, 100);
    	this.video_shown = false;
    },
    // ----------------- beforePrepare
    beforePrepare: function() {
    	//fadee in the iframe
	    //if first time 
	    if(!this.video_shown && this.video_added) this.showVideo();
	    //fade in
	    this.has_been_prepared = true;
    },
    // ----------------- beforeDeactivate
    beforeDeactivate: function() {
	    //this.hideVideo();
    }
});