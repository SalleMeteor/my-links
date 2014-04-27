Links = new Meteor.Collection("links");
Messages = new Meteor.Collection("messages");




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

