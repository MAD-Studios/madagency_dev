// _________________________________________________________________________ SceneModel
main.models.SceneModel = Backbone.Model.extend({
     // set vars
     defaults: {
         "id": -1,
         "name": "",
         "topOffset": -1,
         "topOffsetEnd": -1,
         "sounds": [],
         "view": {}
      },
     // ----------------- initialize
     initialize: function(){
         console.log("SceneModel ---- initialize");
     }
});

// _________________________________________________________________________ SceneCollection
main.models.SceneCollection = Backbone.Collection.extend({
   model: main.models.SceneModel,
   scenes: [
	   { name:"scene-castle", topOffset: 0, topOffsetEnd: 1099 },
	   { name:"scene-xray", topOffset: 1200, topOffsetEnd: 4900 },
	   { name:"scene-lab", topOffset: 4900, topOffsetEnd: 6700 },
	   { name:"scene-creation", topOffset: 6700, topOffsetEnd: 8520 },
	   { name:"scene-gerbil", topOffset: 8520, topOffsetEnd: 12400 },
	   { name:"scene-boy", topOffset: 12600, topOffsetEnd: 13800 }
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
