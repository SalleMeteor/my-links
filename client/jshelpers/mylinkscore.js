	Template.home.collection_size = function () {
		return Links.find({}).count();
	};


	Template.link_list.links = function () {
		return Links.find({}, {sort : {score: -1} });
	};


	Template.link_detail.events = {
	    'click input.thumbs_up' : function () {
				Meteor.call('vote', this.url, 'thumbs_up');
			},

	    'click input.thumbs_down' : function () {
				Meteor.call('vote', this.url, 'thumbs_down');
			}

		};

	Template.add_new_link.events = {

	    'click input#add_url' : function () {
			var new_url = $('#url').val();
			var url_row = Links.findOne( {url:new_url} );
				if(!url_row){
					Links.insert( { url : new_url,
	                        score: 0,
	                        thumbs_up: 0,
	                        thumbs_down: 0 });
				} 
			
	    }
	};

