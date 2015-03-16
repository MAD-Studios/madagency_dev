// _________________________________________________________________________ SceneLabView
main.views.SceneLabView = main.views.SceneView.extend({
	name: "scene-lab",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneLabView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneLabView ---- render");
        $(this.el).html(this.template());        
        return this;
	},
	// ----------------- beforePosize
    beforePosize: function() {
	    var self = this;
        //change the bottom
        //percentage of
        //the .flask
        setTimeout(function(){
        if($('#flask-container', self.el).outerHeight() > 0){
	        var rat = $(window).height()/$('#flask-container', self.el).outerHeight();
	        var perc = 10 + (rat*rat*5);
	        if(perc > 85)  perc = 85;
	        console.log("rat = " + rat);
	        $('.flask', self.el).each(function(){
		        $(this).css('bottom', perc + '%');
	        });
	    }
        }, 100);
	},
	// ----------------- beforeDeactivate
    beforeDeactivate: function() {
	    //$(this.el).css('z-index', '600');
    }
	
});