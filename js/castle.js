var section 	= { castle: {} };
var templates 	= [ 'scene-castle',
					'scene-xray',
					'scene-lab',
					'scene-creation',
					'scene-gerbil',
					'scene-boy',
					'castle',
					'scroll-down-indicator'								     
				  ];
				  
main.setSection(section);
                
function onAppReady() {
    main.router = new main.routers.castle.Router();
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: "dev/castle" });
	    //Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}
