// _________________________________________________________________________ LoaderModel
main.models.castle.LoaderModel = Backbone.Model.extend({
     // set vars
     defaults: {
         "totalNumAssets": 0,
         "numAssetsLoaded": 0,
         "loadedRatio": 0
     },
     // ----------------- initialize
     initialize: function(){
         console.log("AudioModel ---- initialize");
         var self = this;
     },
     // ----------------- handleSceneAssetLoaded
     handleSceneAssetLoaded: function(){	     
	     var cur_num_loaded = this.get("numAssetsLoaded");
	     cur_num_loaded++;
	     this.set({numAssetsLoaded: cur_num_loaded});
	     var loaded_rat = this.get("numAssetsLoaded")/this.get("totalNumAssets");
	     this.set({loadedRatio: loaded_rat});
     },
     // ----------------- addNumAssets
     addNumAssets: function(num_assets){
	     var cur_total_num_assets = this.get("totalNumAssets");
	     cur_total_num_assets+=num_assets;
	     this.set({totalNumAssets: cur_total_num_assets});
	 }
});
