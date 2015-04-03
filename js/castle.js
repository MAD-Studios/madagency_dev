// _________________________________________________________________________extend main namespace
main.castle: {
    models: {},
    views: {}
};

// _________________________________________________________________________ main Router
main.castle.CastleRouter = main.Router.extend({
     routes:{
        "": "gateway",
        "enter": "enter",
        "play": "play"
     },
     // ----------------- beforeInitialize
     beforeInitialize: function() {
         this.responseGeneratorModel = new main.models.ResponseGeneratorModel();
     },
     // ----------------- gateway
     gateway: function(){
         console.log("main --- gateway");
         var self = this;
     },
     // ----------------- enter
     enter: function(){
     },
     // ----------------- play
     play: function(){
     }
});

// _________________________________________________________________________
var templates = [ 	'scene-castle',
					'scene-xray',
					'scene-lab',
					'scene-creation',
					'scene-gerbil',
					'scene-boy',
					'castle',
					'scroll-down-indicator'								     
                ];
                
function onReady() {
    main.router = new main.castle.CastleRouter();
    if (Modernizr.history){
	    Backbone.history.start({ pushState: true, root: "dev/castle" });
	    //Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}
