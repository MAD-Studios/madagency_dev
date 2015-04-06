// _________________________________________________________________________ AudioLoaderView
main.views.AudioLoaderView = Backbone.View.extend({
	FADE_CLASS: "fade-slow",
    templateLoader: main.utils.templateLoader,
    // ----------------- initialize
    initialize: function() {
        console.log("AudioLoaderView ---- initialize");
        this.template = _.template(this.templateLoader.get('audio-loader'));
        this.render();
    },
    // ----------------- render
    render: function(eventName) {
        console.log("AudioLoaderView ---- render");
        var self = this;
        $(this.el).html(this.template());
        $(this).css('display', 'none');
        $(this.el).css('opacity', '0');
        $(this.el).addClass(this.FADE_CLASS);
        
        //set the activity indicator
        $('.activity-indicator', this.el).activity({segments: 8, width:3, space: 0, length: 5, color: '#333e48', valign:'top', align:'left', padding: 12});
        
        return this;
	},
	// ----------------- show
    show: function() {
	    console.log("AudioLoaderView ------- show");
    	$(this).css('display', 'block');
	    $(this.el).css('opacity', '1');
    },
    // ----------------- hide
    hide: function() {
        console.log("AudioLoaderView ------- hide");
    	$(this.el).css('opacity', '0');
    	//add webkit transition end listener
    	$(this.el).on('transitionend webkitTransitionEnd oTransitionEnd', function(){
			$(this).off('transitionend webkitTransitionEnd oTransitionEnd');
			$(this).css('display', 'none');
		});
    },
    // ----------------- beforePosize
    posize: function() {
	    var to_margin = ($(window).outerHeight() - $('.activity-indicator', this.el).outerHeight())/2;
	    //center the activity indicator
	    $('.activity-indicator', this.el).css('margin-top', to_margin + 'px');
    }
});