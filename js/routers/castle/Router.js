// _________________________________________________________________________ main.routers.castle.Router
main.routers.castle.Router = main.routers.Router.extend({
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
