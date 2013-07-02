function vlineShell(serviceId) {
	this.client_ = vline.Client.create({'serviceId': serviceId});
	
	this.client_.login(serviceId, window.PROFILE, window.AUTH_TOKEN)
		.done(function(session) {
      this.session_ = session;
      console.log(remoteUserId);
      vline.client_.on('recv:im', this.onMessage_, this);
        
    }, this);

	// this.client_.on('add:mediaSession', onMediaSession, this);

 //  function onMediaSession(event) {
 //    var mediaSession = event.target;
 //    if (mediaSession.isIncoming()) {
 //      this.calls_.push(new MyCall(this, mediaSession));
 //    }
 //  };

 //  person.startMedia();
	
};

vlineShell.prototype.onMessage_ = function(event) {
  var msg = event.message,
      sender = msg.getSender();
  this.showAlert(sender.getDisplayName(),
                 sender.getThumbnailUrl(),
                 msg.getBody());
};

vlineShell.prototype.sendMessage_= function(userId){
  session_ .getPerson(userId).done(function(person){
    person.postMessage("Yo");
  })
};