Meteor.startup(function () {
	Meteor.methods({
		vote: function (url, field){
			//creo new object
			new_obj = { $inc: { } };
			//actualitzo new object
			if(field =='thumbs_up'){
				new_obj.$inc['thumbs_up'] = 1;
				new_obj.$inc['score'] = 1;
			}else{
				new_obj.$inc['thumbs_down'] = 1;
				new_obj.$inc['score'] = -1;
			}
			//Updatejo el new object
			Links.update( { url : url }, new_obj );
			}
	});
});

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