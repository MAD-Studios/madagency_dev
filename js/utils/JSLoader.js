main.utils.JSLoader = {
    files: [],
    complete_callback: {},
    num_loaded: 0,
    // __________________________________ functions
    // ------------ load
    load: function(files, callback) {
    	this.files = files;
    	this.complete_callback = callback;
    	this.loadNext();
    },
    // ------------ loadNext
    loadNext: function() {
    	this.loadJS(this.files[this.num_loaded] + '.js');
    	    	    console.log("this.files.length --- " + this.files.length);
    	        	console.log("loadNext --- " + this.files[this.num_loaded]);
    },
    // ------------ loadJS
    loadJS: function(file) {
    	var self = this;
        $.getScript( file, function( data, textStatus, jqxhr ) {
            	        	console.log("loaded--- " + file);

        	self.num_loaded++;
	    	if(self.num_loaded < self.files.length) self.loadNext();
			else self.complete_callback();
        });
    }
};
