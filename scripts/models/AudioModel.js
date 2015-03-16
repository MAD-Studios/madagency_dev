// _________________________________________________________________________ AudioModel
main.models.AudioModel = Backbone.Model.extend({
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
main.models.AudioCollection = Backbone.Collection.extend({
   model: main.models.AudioModel,
   sounds: [
   	   //--------- scene-castle
	   { scene:"scene-castle", name:"royal-trumpet", src:"sounds/castle-horn.mp3", startScrollOffset:[490], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-castle", name:"shark-squeal", src:"sounds/castle-shark-squeal.mp3", startScrollOffset:[800], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   //--------- scene-xray
	   { scene:"scene-xray", name:"lightswitch", src:"sounds/xray-lightswitch.mp3", startScrollOffset:[1271], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   { scene:"scene-xray", name:"mecharm", src:"sounds/xray-mecharm-lower.mp3", startScrollOffset:[1800], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   { scene:"scene-xray", name:"lighting-sizzle", src:"sounds/xray-lighting-sizzle1.mp3", startScrollOffset:[1900], endScrollOffset:[2800], loop:false, fade:true, playOnUp:true },
	   { scene:"scene-xray", name:"treadmill", src:"sounds/xray-treadmill.mp3", startScrollOffset:[2120],  endScrollOffset:[4120], loop:true, fade:false, playOnUp:false },
	   { scene:"scene-xray", name:"victorian-man-scream", src:"sounds/xray-manscreaming-v02.mp3", startScrollOffset:[4115],  endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   //--------- scene-lab
	   { scene:"scene-lab", name:"bubbling-breakers", src:"sounds/lab-bubble-background1.mp3", startScrollOffset:[4800], endScrollOffset:[6200], loop:true, fade:false, playOnUp:true },
	   { scene:"scene-lab", name:"red-smoke", src:"sounds/lab-red-skull-smoke.mp3", startScrollOffset:[5035], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-lab", name:"lab-poof", src:"sounds/lab-poof1.mp3", startScrollOffset:[5140, 5250, 5470], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-lab", name:"lab-horse", src:"sounds/lab-horse.mp3", startScrollOffset:[5910], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-lab", name:"lab-fart", src:"sounds/lab-fart.mp3", startScrollOffset:[6200], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   //--------- scene-creation
	   { scene:"scene-creation", name:"hammer-chisel", src:"sounds/creation-chisel-ting1.mp3", startScrollOffset:[7240], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-creation", name:"boulder-crumble", src:"sounds/creation-rock-crumble.mp3", startScrollOffset:[7200], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-creation", name:"gorilla-swoop", src:"sounds/castle-gorilla.mp3", startScrollOffset:[7430], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   //--------- scene-gerbil
	   { scene:"scene-gerbil", name:"gorilla-whiff", src:"sounds/whiff1.mp3", startScrollOffset:[7850], endScrollOffset:[], loop:false, fade:false, playOnUp:true },
	   { scene:"scene-gerbil", name:"gerbil-squeal", src:"sounds/gerbil-squeal.mp3", startScrollOffset:[8160], endScrollOffset:[], loop:false, fade:false, playOnUp:false },
	   { scene:"scene-gerbil", name:"industrial-background", src:"sounds/gerbil-industrial-background2.mp3", startScrollOffset:[8500], endScrollOffset:[12000], loop:true, fade:false, playOnUp:true },
	   { scene:"scene-gerbil", name:"gerbil-warning", src:"sounds/gerbil-warning.mp3", startScrollOffset:[9720], endScrollOffset:[12400], loop:false, fade:true, playOnUp:false },
	   //--------- scene-boy
	   { scene:"scene-boy", name:"storm", src:"sounds/boy-storming1.mp3", startScrollOffset:[12460], endScrollOffset:[13600], loop:true, fade:false, playOnUp:false },
	   { scene:"scene-boy", name:"answer-revealed", src:"sounds/boy-reveal-answer.mp3", startScrollOffset:[13700], endScrollOffset:[14300], loop:false, fade:true, playOnUp:false },
	   { scene:"scene-boy", name:"behold-revealed", src:"sounds/boy-grunt.mp3", startScrollOffset:[14350], endScrollOffset:[], loop:false, fade:false, playOnUp:false }
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
   model: main.models.AudioModel,
   // ----------------- initialize
   initialize: function(){
       console.log("AudioCollection --- initialize");
   }
});

