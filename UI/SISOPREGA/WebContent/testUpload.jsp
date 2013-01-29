<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form action="PdfUploader" method="post" enctype="multipart/form-data">
		<table>
			<tr>
				<td>Select File :</td>
				<td><input name="pdfFile" type="file" /></td>
			</tr>
			<tr>
				<td>Enter Filename :</td>
				<td><input type="text" name="fileName" size="20" /></td>
			</tr>
		</table>
		<p />
		<input type="submit" value="Upload File" />
	</form>
</body>
</html>