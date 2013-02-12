<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form action="https://api.clickatell.com/http/sendmsg" method="get">
		User: <input type="text" name="user"/><br/>
		Password: <input type="text" name="password"/><br/>
		api_id:<input type="text" name="api_id"/><br/>
		from: <input type="text" name="from"/><br/>
		MO: <input type="text" name="mo" value="1"/><br/>
		to: <input type="text" name="to"/><br/>
		message: <textarea rows="5" cols="15" name="text"></textarea><br/>
		<input type="submit"/>
	</form>
</body>
</html>