
function vlineShell(serviceId) {

  this.calls_ = [];

	this.client_ = vline.Client.create({
    'serviceId': serviceId,
    ui:true,
    uiVideoPanel:'#video-wrapper'
  });
	this.client_.login(serviceId, window.PROFILE, window.AUTH_TOKEN)
		.done(function(session) {
      this.session_ = session;
      console.log(this.session_.mb);

      // this.client_.on('add:mediaSession', this.onMediaSession, this)
      // this.client_.on('recv:im', this.onMessage_, this);

      
    }, this);
};

vlineShell.prototype.onMediaSession = function(event){
  var mediaSession = event.target;
    if (mediaSession.isIncoming()) {
      this.calls_.push(new MyCall(this, mediaSession));
  };
};

vlineShell.prototype.call = function(userId) {
  this.session_.getPerson(userId).done(function(person) {
      this.calls_.push(new MyCall(this, person.startMedia()));
      person.release();
    }, this);
  // constructor of two-party call controller
};


function MyCall(app, mediaSession) {

  this.media1 = mediaSession;

  mediaSession.
    on('enterState:pending', onEnterPending).
    on('exitState:pending', onExitPending).
    on('enterState:incoming', onEnterIncoming).
    // on('exitState:incoming', app.hideNotification, app).
    on('enterState:outgoing', onEnterOutgoing).
    // on('exitState:outgoing', app.hideMessage, app).
    on('enterState:connecting', onEnterConnecting).
    // on('exitState:connecting', app.hideMessage, app).
    on('enterState:active', onEnterActive).
    on('mediaSession:addLocalStream mediaSession:addRemoteStream', function(event) {
      var stream = event.stream;

      // guard against adding a local video stream twice if it is attached to two media sessions
      if ($('#' + stream.getId()).length) {
        return;
      }

      // create video or audio element
      var elem = $(event.stream.createMediaElement());
      elem.prop('id', stream.getId());

      $('#video-wrapper').append(elem);
    }).
    on('mediaSession:removeLocalStream mediaSession:removeRemoteStream', function(event) {
      $('#' + event.stream.getId()).remove();
    });
    // on('exitState:active', app.hideCallUi, app);



  function onEnterPending() {
    console.log("Click 'allow' to start call ^^^");
  }

  function onExitPending() {
    console.log("Exit Pending State");
  }

  function onEnterIncoming() {
    console.log(
      'Incoming call from ' + mediaSession.getDisplayName() + '...',
      mediaSession.getThumbnailUrl());
    mediaSession.start();
  }
  function onEnterOutgoing() {
    console.log(
     'Calling ' + mediaSession.getDisplayName() + '...',
      mediaSession.getThumbnailUrl());
  }
  function onEnterConnecting() {
    console.log('Connecting...');
  }
  function onEnterActive() {
    addMediaSession_(mediaSession);
  }

};

// end the call  
MyCall.prototype.end = function() {
  this.mediaSession_.stop();
};



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

