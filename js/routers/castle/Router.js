// _________________________________________________________________________ main.routers.castle.Router
main.routers.castle.Router = main.routers.Router.extend({
     routes:{
        "": "gateway",
        "enter": "enter",
        "play": "play"
     },
     // ----------------- createMainView
     createMainView: function() {
     	this.mainView = new main.views.castle.MainView( {el: $('#main', this.el)} );
     },
     // ----------------- beforeInitialize
     beforeInitialize: function() {
         this.responseGeneratorModel = new main.models.castle.ResponseGeneratorModel();
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
