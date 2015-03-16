// ------------------------------------------------------------------------- templateLoader
// asynchronously loads templates
// located in separate .html files

main.utils.templateLoader = {
    templates: {},
    
    // __________________________________ functions
    // ------------ load
    load: function(names, callback) {

        var deferreds = [],
            self = this;

        $.each(names, function(index, name) {
            deferreds.push($.get('tpl/' + name + '.html', function(data) {
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
