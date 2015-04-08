var section 	= { castle: {} };
var templates 	= [ 'castle/scene-castle',
					'castle/scene-xray',
					'castle/scene-lab',
					'castle/scene-creation',
					'castle/scene-gerbil',
					'castle/scene-boy',
					'castle/scroll-down-indicator'								     
				  ];
				  
main.setSection(section);
                
function onAppReady() {
    main.router = new main.routers.castle.Router();
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: "castle" });
	    //Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}
