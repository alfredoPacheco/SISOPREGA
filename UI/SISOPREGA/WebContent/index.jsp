<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<script src="scripts/jquery-1.8.2/jquery.js" ></script>
<script src="scripts/enyo/framework/enyo.js"></script>
<script src="scripts/webServicesConsuming/config.js"></script>
<script src="scripts/webServicesConsuming/consumingGateway.js"></script>
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