// ------------------------------------------------------------------------- templateLoader
// asynchronously loads templates
// located in separate .html files

main.utils.TemplateLoader = {
    templates: {},
    
    // __________________________________ functions
    // ------------ load
    load: function(names, callback) {

        var deferreds = [],
            self = this,
            name = "",
            path_arr= [];

        $.each(names, function(index, path) {
            deferreds.push($.get(path + '.html', function(data) {
            	//at this point set the name
            	//grab last string  as name
            	path_arr = path.split("/");
            	name = path_arr[path_arr.length-1];
                self.templates[name] = data;
            }));
        });

        $.when.apply(null, deferreds).done(callback);
    },

    // ------------ get
    // Get template by name from hash of preloaded templates
    get: function(name) {
        return this.templates[name];
    }

};
