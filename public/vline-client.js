
function vlineShell(serviceId) {
	this.client_ = vline.Client.create({'serviceId': serviceId});
	
	this.client_.login(serviceId, window.PROFILE, window.AUTH_TOKEN)
		.done(function(session) {
      this.session_ = session;
      console.log(vlineState.session_.mb);
      vlineState.client_.on('add:mediaSession', onMediaSession, this)
      vlineState.client_.on('recv:im', this.onMessage_, this);

      function onMediaSession(event) {
        var mediaSession = event.target;
        if (mediaSession.isIncoming()) {
          this.calls_.push(new MyCall(this, mediaSession));
        }
      }
    }, this);
};


// vlineShell.prototype.call = function(userId) {
//  this.session_.getPerson(userId).
//     done(function(person) {
//       this.calls_.push(new MyCall(this, person.startMedia());
//       // person.release();
//     }, this);
  // constructor of two-party call controller
  function MyCall(app, mediaSession) {

    mediaSession.
      on('enterState:pending', onEnterPending).
      on('exitState:pending', app.hideModal, app).
      on('enterState:incoming', onEnterIncoming).
      on('exitState:incoming', app.hideNotification, app).
      on('enterState:outgoing', onEnterOutgoing).
      on('exitState:outgoing', app.hideMessage, app).
      on('enterState:connecting', onEnterConnecting).
      on('exitState:connecting', app.hideMessage, app).
      on('enterState:active', onEnterActive).
      on('exitState:active', app.hideCallUi, app);

    function onEnterPending() {
      app.showModal("Click 'allow' to start call ^^^");
    }
    function onEnterIncoming() {
      app.showNotification(
        'Incoming call from ' + mediaSession.getDisplayName() + '...',
        mediaSession.getThumbnailUrl());
    }
    function onEnterOutgoing() {
      app.showMessage(
       'Calling ' + mediaSession.getDisplayName() + '...',
        mediaSession.getThumbnailUrl());
    }
    function onEnterConnecting() {
      app.showMessage('Connecting...');
    }
    function onEnterActive() {
      app.showCallUi(mediaSession);
    }
  }

  // end the call  
  MyCall.prototype.end = function() {
    this.mediaSession_.stop();
  };
// };




vlineShell.prototype.onMessage_ = function(event) {
  var msg = event.message,
      sender = msg.getSender();
  window.alert(sender.getDisplayName(),
                 sender.getThumbnailUrl(),
                 msg.getBody());
};

vlineShell.prototype.sendMessage_= function(userId){
  vline.session_.getPerson(userId).done(function(person){
    person.postMessage("Yo");
  })
};
