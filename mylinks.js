Links = new Meteor.Collection("links");
Messages = new Meteor.Collection("messages");



Meteor.methods( {
	addMessage : function (newMessage) {
        if (newMessage.message == "") {
			throw new Meteor.Error(413, "Missing message content...");
		}
		var id = Messages.insert(newMessage);
		var cursor = Messages.find();
		if (cursor.count() > 20) {
			var oldestMessage = Messages.findOne();
			Messages.remove(oldestMessage);
		}
		return id;
	}
});

if (Meteor.isClient) {

	Router.map(function() {
	  this.route('home', {path: '/'})
	  this.route('about');
    });

   	Template.chatTemplate.messages = function() {
		return Messages.find();
	};

	Template.chatTemplate.events = {
		'submit' : function(e, tmpl) {
			e.preventDefault();
			console.log("Clicked submit!");
	        var email= Meteor.user().emails[0].address;
			var newMessage = {
				userName : email,
				message : tmpl.find("#chatInput").value
			};

			// clear out the old message
			tmpl.find("#chatInput").value = "";

			Meteor.call(
				"addMessage",
				newMessage,
				function (err, result) {
					if (err) {
						alert("Could not send message " + err.reason);
					}
				}
			);
		}
	};

	Template.header.collection_size = function () {
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
				Meteor.call('vote', url, 'thumbs_up');
	    }
	};

}



if (Meteor.isServer) {
	  Meteor.startup(function () {
			Meteor.methods({
				vote: function (url, field){
								new_obj = { $inc: { } };

								if(field =='thumbs_up'){
									new_obj.$inc['thumbs_up'] = 1;
									new_obj.$inc['score'] = 1;
								}else{
									new_obj.$inc['thumbs_down'] = 1;
									new_obj.$inc['score'] = -1;
								}

								Links.update( { url : url }, new_obj );
							}
			});
		});
}
