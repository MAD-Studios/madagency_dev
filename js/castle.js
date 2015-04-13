var section 	= { castle: {} };
var base_path 	= "castle/";
var templates 	= [ 'scene-castle',
					'scene-xray',
					'scene-lab',
					'scene-creation',
					'scene-gerbil',
					'scene-boy',
					'scroll-down-indicator'								     
				  ];
				  
main.setSection(section);

function detectMobile(){
	//set templates depending on mobile
	if(main.utils.DeviceDetector.isMobile()) base_path += "mobile/";
	console.log(" MMMMMMMMMM ------ main.utils.DeviceDetector.isMobile() = " + main.utils.DeviceDetector.isMobile());
	
	for(var i=0;i<templates.length;i++){
		templates[i] = base_path + templates[i];
	}
}

function beforeOnDocReady(){
	detectMobile();
}
                
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
