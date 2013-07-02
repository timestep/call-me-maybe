function vlineShell(serviceId) {

	this.client_ = vline.Client.create({'serviceId': serviceId});
	
	this.client_.login(serviceId, window.PROFILE, window.AUTH_TOKEN)
			.done(this.init_, this);

	// function vlineShell.prototype.init_ = function(session) {
	// this.session_ = session;
  //  	};		

  this.client_.on('add:mediaSession', onMediaSession, this);

  function onMediaSession(event) {
    var mediaSession = event.target;
    if (mediaSession.isIncoming()) {
      this.calls_.push(new MyCall(this, mediaSession));
    }
  }


	
};