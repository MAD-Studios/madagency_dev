// _________________________________________________________________________ WorkPaneView
main.views.corporate.WorkPaneView = main.views.PaneView.extend({
	VIDEO_EMBED_STR: '<iframe src="//instagram.com/p/m5N1iwEWuP/embed/" frameborder="0" scrolling="no" wmode="Opaque" allowtransparency="true"></iframe>',
	VIDEO_ADDED: 'video_added',
	id: "work",
	_route: "work",
	has_been_prepared: false,
	video_added: false,
	video_shown: false,
	video_def_width: 0,
	video_def_height: 0,
	elementManipulator: main.utils.ElementManipulator,
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
        /*setTimeout(function(){
	        self.offset = -($('.pane-title', self.el).outerHeight() + $('.divider', self.el).outerHeight());
        }, 100);*/
        //setTimeout to add the video
        setTimeout(function(){
	        self.addVideo();
        }, 200);
	},
	// ----------------- addVideo
    addVideo: function() {
	    //make the vide the size of its parent
	    this.video_container_el = $('.video-ctn', this.el);
	    this.video_def_width = parseInt(this.video_container_el.css('maxWidth'));
	    this.video_def_height = parseInt(this.video_container_el.css('maxHeight'));
	    var embed_str = this.VIDEO_EMBED_STR.replace("_width_", this.video_def_width);
	    embed_str = embed_str.replace("_height_", this.video_def_height);
	    this.video_el = $(embed_str);
	    
	    this.video_el.css('opacity', '0');
	    this.video_container_el.append(this.video_el);
	    if(this.has_been_prepared) this.showVideo();
	    this.video_added = true;
	    this.posize();
	    //trigger an event here
	    $(this.el).trigger(this.VIDEO_ADDED);
    },
	// ----------------- showVideo
    showVideo: function() {
	    clearTimeout(this.hideMapTimeout);
	    var self = this;
    	TweenLite.to(this.video_el, 0.5, {opacity:1, delay:0.75});
    	this.video_shown = true;
    },
    // ----------------- hideVideo
    hideVideo: function() {
	    var self = this;
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
    },
    // ----------------- beforeRender
   /* beforePosize: function() {
        if($('.hide-for-small .pane-title', this.el).parent().css('display') != 'none') this.offset = -($('.hide-for-small .pane-title', this.el).outerHeight() + $('.hide-for-small .divider', this.el).outerHeight());
        else this.offset = -$('.hide-for-small .divider', this.el).outerHeight();
    },*/
    // ----------------- beforePosize
    beforePosize: function() {
    	//maintain the original aspect ratio of the 
    	//video
    	if(this.video_container_el){
    		var self = this;
    		var parent_w = this.video_container_el.parent().outerWidth();
    		this.video_def_width = parseInt(this.video_container_el.css('maxWidth'));
			this.video_def_height = parseInt(this.video_container_el.css('maxHeight'));
	    
	    	this.elementManipulator.resizeElement(this.video_container_el, this.video_def_width, this.video_def_height, parent_w, null, this.elementManipulator.SCALE_TYPE.FIT );
	    	
			setTimeout(function(){
				var to_left = (parent_w - self.video_container_el.outerWidth())/2;
		    	self.video_container_el.css('left', to_left + 'px');
		    	var video_container_w = self.video_container_el.width();
		    	var video_container_h = self.video_container_el.height();
				self.video_container_el.parent().css('height', video_container_h + 'px');
	    	}, 100);
    	}
    }
});