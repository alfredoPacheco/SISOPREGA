<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=1, user-zoom=fixed, initial-scale=1, maximum-scale=1" />
<meta name="apple-mobile-web-app-capable" content="yes"/> 
<link rel="apple-touch-icon" href="images/icon.png"/>
<script src="scripts/jquery-1.8.2/jquery.js" ></script>
<script src="scripts/browser_validation.js"></script>
<script>validateBrowserEnyoOne()</script>
<script src="scripts/enyo/framework/enyo.js"></script>
<script src="scripts/webServicesConsuming/config.js"></script>
<script src="scripts/webServicesConsuming/consumingGateway.js"></script>
<script src="scripts/maskedInput/jquery.maskedinput.js"></script>
<title>SISOPREGA</title>
</head>
<body>
	<script type="text/javascript">
	jQuery.noConflict();
	jQuery(document).ready(function() {
		enyo.create({
			kind : "sisoprega"
		}).renderInto(document.body);
	});
	</script>
</body>
</html>