// _________________________________________________________________________ PaneModel
main.models.PaneModel = Backbone.Model.extend({
     // set vars
     defaults: {
         "id": -1,
         "el_id": "",
         "posY": -1,
         "endPosY": -1,
         "view": {}
      },
     // ----------------- initialize
     initialize: function(){
         console.log("PaneModel ---- initialize");
     }
});

// _________________________________________________________________________ PaneCollection
main.models.PaneCollection = Backbone.Collection.extend({
   model: main.models.PaneModel,
   // ----------------- initialize
   initialize: function(){
       console.log("PaneCollection --- initialize");
   }
});
