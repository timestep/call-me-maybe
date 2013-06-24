function vlineShell(serviceId) {

	var $client, $session;
	var self = this;

	$client = vline.Client.create({serviceId: serviceId});
	
	// if we have a saved session, use it
	if ($client.isLoggedIn()) {
		$session = $client.getDefaultSession();
	};
	
	function logoutCmd() {
		$session = null;
		return $client.logout();
	};

	
	var userId = $session.getLocalPersonId();
	$session.startMedia(userId);

	

};