// _________________________________________________________________________ SceneGerbilView
main.views.castle.SceneGerbilView = main.views.castle.SceneView.extend({
	SCENE_TRANSITION_CLASS: "scene-transition",
	STATE_LEFT: "state-left",
	STATE_GERBIL: "state-gerbil",
	STATE_STATUE: "state-statue",
	STATE_DEFAULT: "state-default",
	STATUE_FOCUS_POS_OFFSET_LEFT: 0.42,
	GERBIL_FOCUS_POS_OFFSET_LEFT: 0.21,
	state: "",
	name: "scene-gerbil",
    // ----------------- initialize
    initialize: function() {
        console.log("SceneGerbilView ---- initialize");
        this.template = _.template(this.templateLoader.get(this.name));
    },
    // ----------------- beforeRender
    beforeRender: function() {
        console.log("SceneGerbilView ---- render");
        $(this.el).html(this.template());  
        this.scene_cta_el = $('.movable-scene-container', this.el);      
        this.state = this.STATE_DEFAULT;
        return this;
	},
	// ----------------- beforePosize
    beforePosize: function() {
	    var self = this;
	    setTimeout(function(){
	    	if(self.state == self.STATE_STATUE) self.forceToStatue();
		    if(self.state == self.STATE_GERBIL) self.forceToGerbil();
		    if(self.state == self.STATE_LEFT) self.forceToLeft();
	    }, 1200);
    },
    // ----------------- removeForceToLeft
    removeForceToPosition: function() {
    	this.state = this.STATE_DEFAULT;
    },
    // ----------------- forceToPosition
    forceToPosition: function(to_pos) {
	    //animate the right pos 
	    //so that the scene is actually
	    //positioned to focus on the gerbil
	    this.scene_cta_el.addClass(this.SCENE_TRANSITION_CLASS);
	    var to_right = to_pos;
	    //set an animate transition class on it
	    this.scene_cta_el.css('right', to_right + 'px');
	    //also move each movable 
	    //div inside the movable-scene-container
	    $('.movable', this.scene_cta_el).each(function(){
		    $(this).css('right', to_right + 'px');
	    });
    },
    // ----------------- forceToLeft
    forceToLeft: function() {
       //animate the right pos 
	    //so that the scene is actually
	    //positioned to the left of the 
	    //window
	    this.state = this.STATE_LEFT;
	    var to_pos = $(window).width() - this.scene_cta_el.outerWidth();
	    this.forceToPosition(to_pos);
    },
     // ----------------- forceToStatue
    forceToStatue: function() {
	    //animate the right pos 
	    //so that the scene is actually
	    //positioned to focus on the statue
	    this.state = this.STATE_STATUE;
	    var to_pos = $(window).width() - this.scene_cta_el.outerWidth() + this.scene_cta_el.outerWidth()*this.STATUE_FOCUS_POS_OFFSET_LEFT;
	    this.forceToPosition(to_pos);
	},
    // ----------------- forceToLeft
    forceToGerbil: function() {
	     //animate the right pos 
	    //so that the scene is actually
	    //positioned to focus on the gerbil
	    this.state = this.STATE_GERBIL;
	    var to_pos = $(window).width() - this.scene_cta_el.outerWidth() + this.scene_cta_el.outerWidth()*this.GERBIL_FOCUS_POS_OFFSET_LEFT;
	    this.forceToPosition(to_pos);
    }
});   