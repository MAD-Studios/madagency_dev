// _________________________________________________________________________ AudioModel
main.models.castle.mobile.AudioModel = Backbone.Model.extend({
	ACTIVE_CLASS: "active",
     // set vars
     defaults: {
         "id": -1,
         "scene": "",
         "name": "",
         "src": ""
      },
     // ----------------- initialize
     initialize: function(){
         console.log("AudioModel ---- initialize");
     }
});

// _________________________________________________________________________ AudioCollection
main.models.castle.mobile.AudioCollection = Backbone.Collection.extend({
   model: main.models.castle.mobile.AudioModel,
   sounds: [
   	   //--------- cene-swipe-instruction
	   { scene:"scene-swipe-instruction", name:"royal-trumpet", src:"/assets/audio/castle/mobile/castle-horn.mp3" },
	   //--------- scene-castle
	   { scene:"scene-castle", name:"lighting-sizzle", src:"/assets/audio/castle/mobile/xray-lighting-sizzle1.mp3" },
	   //--------- scene-xray
	   { scene:"scene-xray", name:"victorian-man-scream", src:"/assets/audio/castle/mobile/xray-lab-m.mp3" },
	   //--------- scene-lab
	   { scene:"scene-lab", name:"lab-fart", src:"/assets/audio/castle/mobile/lab-creation-m.mp3" },
	   //--------- scene-creation
	   { scene:"scene-creation", name:"gorilla-swoop", src:"/assets/audio/castle/mobile/gorilla-gerbil-m.mp3" },
	   //--------- scene-gerbil
	   { scene:"scene-gerbil", name:"gerbil-squeal", src:"/assets/audio/castle/mobile/behold-answer-m.mp3" }
   ],
   // ----------------- initialize
   initialize: function(){
       console.log("AudioCollection --- initialize");
       //create a model for each scene
       this.reset(this.sounds);
   }
});

// _________________________________________________________________________ BasicAudioCollection
main.models.BasicAudioCollection = Backbone.Collection.extend({
   model: main.models.castle.mobile.AudioModel,
   // ----------------- initialize
   initialize: function(){
       console.log("AudioCollection --- initialize");
   }
});

