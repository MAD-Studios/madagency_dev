// _________________________________________________________________________ SceneModel
main.models.castle.mobile.SceneModel = Backbone.Model.extend({
     // set vars
     defaults: {
         "id": -1,
         "name": "",
         "topOffset": -1,
         "sounds": []
      },
     // ----------------- initialize
     initialize: function(){
         console.log("SceneModel ---- initialize");
     }
});

// _________________________________________________________________________ SceneCollection
main.models.castle.mobile.SceneCollection = Backbone.Collection.extend({
   model: main.models.castle.mobile.SceneModel,
   scenes: [
   	   { name:"scene-swipe-instruction" },
	   { name:"scene-castle" },
	   { name:"scene-xray" },
	   { name:"scene-lab" },
	   { name:"scene-creation" },
	   { name:"scene-gerbil" },
	   { name:"scene-boy" },
	   { name:"scene-final" }
   ],
   // ----------------- initialize
   initialize: function(){
       console.log("SceneCollection --- initialize");
       //create a model for each scene
       this.reset(this.scenes);
   },
   // ----------------- setAudio
   setAudio: function(audioCollection){
	   var sounds = [];
	   //for each model
	   //filter audioCollection
	   //by scene name
	   this.each(function(model){
		   sounds = audioCollection.filter(function(audio_model){
			   return ( model.get("name") == audio_model.get("scene") )
		   });
		   model.set({sounds: sounds});
	   });
	   
   }
});
