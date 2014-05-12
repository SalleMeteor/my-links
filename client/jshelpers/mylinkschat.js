   	Template.chatTemplate.messages = function() {
		return Messages.find();
	};

	Template.chatTemplate.events = {
		'submit' : function(e, tmpl) {
			e.preventDefault();
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
