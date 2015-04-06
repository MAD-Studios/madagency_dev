// _________________________________________________________________________ SceneCastleView
main.castle.views.SceneCastleView = main.views.SceneView.extend({
	name: "scene-castle",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneCastleView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneCastleView ---- render");
        $(this.el).html(this.template());
        return this;
	},
	// ----------------- beforePosize
    beforePosize: function() {
        console.log("SceneCastleView ---- beforePosize");
        var self = this;
        //set the cneter of the scene to the 
        //center of the castle parts
        setTimeout(function(){
	        var origin_y = $(window).height() - $('#castle-container-parts', self.el).outerHeight()  +  parseInt($('#castle-door-01', self.el).css('top')) + ($('#castle-door-01', self.el).outerHeight()/2); 
	        var origin_x = parseInt($('#castle-door-01', self.el).css('left')) + ($('#castle-door-01', self.el).outerWidth()/2); 
	
	        $('#scene-castle', self.el).css({webkitTransformOrigin: origin_x + 'px ' + origin_y + 'px',
									         mozTransformOrigin: origin_x + 'px ' + origin_y + 'px',
									         msTransformOrigin: origin_x + 'px ' + origin_y + 'px',
									         oTransformOrigin: origin_x + 'px ' + origin_y + 'px',
									         transformOrigin: origin_x + 'px ' + origin_y + 'px' });
		}, 100);
	}
});