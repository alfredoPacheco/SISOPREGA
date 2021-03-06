<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<meta http-equiv="Content-Type"
	content="application/xhtml+xml; charset=UTF-8" />
<meta name="viewport"
	content="width=1, initial-scale=1, maximum-scale=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="images/icon.png" />
<script src="../SISOPREGA_WEB_LIB/scripts/jquery-1.8.2/jquery.js"></script>
<script src="../SISOPREGA_WEB_LIB/scripts/browser_validation.js"></script>
<script>validateBrowserEnyoOne()</script>
<script src="../SISOPREGA_WEB_LIB/scripts/enyo/framework/enyo.js"></script>
<script
	src="../SISOPREGA_WEB_LIB/scripts/webServicesConsuming/config.js"></script>
<script
	src="../SISOPREGA_WEB_LIB/scripts/webServicesConsuming/consumingGateway.js"></script>
<script
	src="../SISOPREGA_WEB_LIB/scripts/maskedInput/jquery.maskedinput.js"></script>
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