function vlineShell(serviceId) {

	var $client, $session;

	$client = vline.Client.create({serviceId: serviceId});
	
	$client.login(serviceId).done(function(session) {
		$session = session;
		}, 
	this);
};