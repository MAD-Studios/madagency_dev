// _________________________________________________________________________
var section 	= { corporate: {} };

main.setSection(section);

function onAppReady() {
    main.router = new main.routers.corporate.Router();
    if (Modernizr.history){
	    //Backbone.history.start({ pushState: true, root: "dev/" });
	    Backbone.history.start({ pushState: true });
    }
    else{
	    Backbone.history.start({ pushState: false });
    }
}
