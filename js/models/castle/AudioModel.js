// _________________________________________________________________________ AudioModel
main.models.castle.AudioModel = Backbone.Model.extend({
	ACTIVE_CLASS: "active",
     // set vars
     defaults: {
         "id": -1,
         "scene": "",
         "name": "",
         "src": "",
         "startScrollOffset": [],
         "endScrollOffset": [],
         loop: false
      },
     // ----------------- initialize
     initialize: function(){
         console.log("AudioModel ---- initialize");
     }
});

// _________________________________________________________________________ AudioCollection
main.models.castle.AudioCollection = Backbone.Collection.extend({
   model: main.models.castle.AudioModel,
   sounds: [
   	   //--------- scene-castle
	   { scene:"scene-castle", name:"royal-trumpet", src:"/assets/audio/castle/castle-horn.mp3", startScrollOffset:[490], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-castle", name:"shark-squeal", src:"/assets/audio/castle/castle-shark-squeal.mp3", startScrollOffset:[800], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   //--------- scene-xray
	   { scene:"scene-xray", name:"lightswitch", src:"/assets/audio/castle/xray-lightswitch.mp3", startScrollOffset:[1271], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   { scene:"scene-xray", name:"mecharm", src:"/assets/audio/castle/xray-mecharm-lower.mp3", startScrollOffset:[1800], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   { scene:"scene-xray", name:"lighting-sizzle", src:"/assets/audio/castle/xray-lighting-sizzle1.mp3", startScrollOffset:[1900], endScrollOffset:[2800], loop:false, fade:true, playOnUp:true },
	   { scene:"scene-xray", name:"treadmill", src:"/assets/audio/castle/xray-treadmill.mp3", startScrollOffset:[2120],  endScrollOffset:[4120], loop:true, fade:false, playOnUp:false },
	   { scene:"scene-xray", name:"victorian-man-scream", src:"/assets/audio/castle/xray-manscreaming-v02.mp3", startScrollOffset:[4115],  endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   //--------- scene-lab
	   { scene:"scene-lab", name:"bubbling-breakers", src:"/assets/audio/castle/lab-bubble-background1.mp3", startScrollOffset:[4800], endScrollOffset:[6200], loop:true, fade:false, playOnUp:true },
	   { scene:"scene-lab", name:"red-smoke", src:"/assets/audio/castle/lab-red-skull-smoke.mp3", startScrollOffset:[5035], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-lab", name:"lab-poof", src:"/assets/audio/castle/lab-poof1.mp3", startScrollOffset:[5140, 5250, 5470], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-lab", name:"lab-horse", src:"/assets/audio/castle/lab-horse.mp3", startScrollOffset:[5910], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-lab", name:"lab-fart", src:"/assets/audio/castle/lab-fart.mp3", startScrollOffset:[6200], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   //--------- scene-creation
	   { scene:"scene-creation", name:"hammer-chisel", src:"/assets/audio/castle/creation-chisel-ting1.mp3", startScrollOffset:[7240], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-creation", name:"boulder-crumble", src:"/assets/audio/castle/creation-rock-crumble.mp3", startScrollOffset:[7200], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-creation", name:"gorilla-swoop", src:"/assets/audio/castle/castle-gorilla.mp3", startScrollOffset:[7430], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   //--------- scene-gerbil
	   { scene:"scene-gerbil", name:"gorilla-whiff", src:"/assets/audio/castle/whiff1.mp3", startScrollOffset:[7850], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   { scene:"scene-gerbil", name:"gerbil-squeal", src:"/assets/audio/castle/gerbil-squeal.mp3", startScrollOffset:[8160], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-gerbil", name:"industrial-background", src:"/assets/audio/castle/gerbil-industrial-background2.mp3", startScrollOffset:[8500], endScrollOffset:[12000], loop:true, fade:false, playOnUp:true },
	   { scene:"scene-gerbil", name:"gerbil-warning", src:"/assets/audio/castle/gerbil-warning.mp3", startScrollOffset:[9720], endScrollOffset:[12400], loop:false, fade:true, playOnUp:false },
	   //--------- scene-boy
	   { scene:"scene-boy", name:"storm", src:"/assets/audio/castle/boy-storming1.mp3", startScrollOffset:[12460], endScrollOffset:[13600], loop:true, fade:false, playOnUp:false },
	   { scene:"scene-boy", name:"answer-revealed", src:"/assets/audio/castle/boy-reveal-answer.mp3", startScrollOffset:[13700], endScrollOffset:[14300], loop:false, fade:true, playOnUp:false },
	   { scene:"scene-boy", name:"behold-revealed", src:"/assets/audio/castle/boy-grunt.mp3", startScrollOffset:[14350], endScrollOffset:[], loop:false, fade:false, playOnUp:false }
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
   model: main.models.castle.AudioModel,
   // ----------------- initialize
   initialize: function(){
       console.log("AudioCollection --- initialize");
   }
});

