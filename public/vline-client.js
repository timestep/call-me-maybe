function vlineShell(serviceId) {

	this.client_ = vline.Client.create({'serviceId': serviceId});
	
	this.client_.login(serviceId, window.PROFILE, window.AUTH_TOKEN)
			.done(function(session) {
        this.session_ = session;
        remoteUserId = this.session_.mb;
        console.log(remoteUserId);
        
      ,this);
  });

};

function connection(remoteUserId){
  this.session_.getPerson(remoteUserId).done(function(person) {
    console.log('YOLO');
    person.postMessage("Hello there");
  };
};