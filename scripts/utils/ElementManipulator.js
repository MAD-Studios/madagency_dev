main.utils.ElementManipulator = {
	SCALE_TYPE: {
		FIT: "scale_to_fit",
		COVER: "scale_to_cover"
	},
	//======================================
	// manipulate element
	// dimmensions
	//======================================
	//--------------------------------------
	// resizeElement
	//--------------------------------------
	resizeElement:function(el, init_width, init_height, parent_width, parent_height, scale_type){
		if(scale_type == null) scale_type = this.SCALE_TYPE.COVER;
		/*var parent_el = $(el).parent();
		var parent_width = parent_el.width();
        var parent_height = parent_el.height();
        
		if(parent_width == null) parent_width = $(window).width();
		if(parent_height == null) parent_height = $(window).height();*/
		
		console.log("&&&&&&&&&&&&&&&& parent_width = " + parent_width);
		console.log("&&&&&&&&&&&&&&&& parent_height = " + parent_height);
		        
        var el_width = init_width;
	    var el_height = init_height;
	    
        var scale = 1;
        var rat_width = 0;
        var rat_height = 0;
        
        if(parent_width){
			rat_width = (parent_width)/el_width;
			rat_height = (parent_height)/el_height;
		}
		
		console.log("&&&&&&&&&&&&&&&& rat_width = " + rat_width);
		console.log("&&&&&&&&&&&&&&&& rat_height = " + rat_height);
						
		var delta_scale_width = Math.abs(1-rat_width);
		var delta_scale_height = Math.abs(1-rat_height);
        
        //scale to cover
        switch(scale_type){
        	case this.SCALE_TYPE.COVER:
				//IF WIDTH AND HEIGHT GREATER THAN
				if(rat_width <= 1 && rat_height <= 1){
				 //use smallest difference
				 if(delta_scale_width >= delta_scale_height){ scale = rat_height; }
				 else{ scale = rat_width; }
				}
				//IF WIDTH AND HEIGHT LESS THAN
				else if(rat_width >= 1 && rat_height >= 1){
				 //use largest difference
				 if(delta_scale_width >= delta_scale_height){ scale = rat_width; }
				 else{ scale = rat_height; }
				}
				//IF WIDTH GRETAER THAN & HEIGHT LESS THAN
				else if(rat_width < 1 && rat_height > 1){
				 scale = rat_height;
				}
				//IF HEIGHT GRETAER THAN & WIDTH LESS THAN
				else if(rat_width > 1 && rat_height < 1){
				 scale = rat_width;
				}
				if(rat_width == 0){
					scale = rat_height;
				}
				else if(rat_height == 0){
					scale = rat_width;
				}
			break;
			case this.SCALE_TYPE.FIT:
				//IF WIDTH AND HEIGHT GREATER THAN
				console.log("SCALE_TYPE.FIT ");

				if(rat_width <= 1 && rat_height <= 1){
				//use greatest difference
				 if(delta_scale_width >= delta_scale_height){ scale = rat_width; }
				 else{ scale = rat_height; }
				}
				//IF WIDTH AND HEIGHT LESS THAN
				//leave as is
				else if(rat_width >= 1 && rat_height >= 1){
				}
				//IF WIDTH GRETAER THAN & HEIGHT LESS THAN
				else if(rat_width < 1 && rat_height > 1){
					//use width
					scale = rat_width;
				}
				//IF HEIGHT GRETAER THAN & WIDTH LESS THAN
				else if(rat_width > 1 && rat_height < 1){
					//use height
					scale = rat_height;
				}
				if(rat_width == 0){
					scale = rat_height;
				}
				else if(rat_height == 0){
					scale = rat_width;
				}
			break;
		}
		var to_width = Math.ceil(parseFloat(el_width*scale));
		var to_height = Math.ceil(parseFloat(el_height*scale));
		
		console.log("&&&&&&&&&&&&&&&& to_width = " + to_width);
		console.log("&&&&&&&&&&&&&&&& to_height = " + to_height);

		$(el).css('width', to_width + 'px');
		$(el).css('height', to_height + 'px');
	}
};