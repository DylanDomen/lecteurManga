<%@ page pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Test</title>
    </head>
    <body>

        <c:if test="${ !empty nom }"><p><c:out value="Bonjour, vous vous appelez ${ nom }" /></p></c:if>
        <c:if test="${ !empty nom }"><p><c:out value="${ nom2 }(${ nom })" /></p></c:if>

        
        <img src="./${ nom }">
      
        
    </body>
</html>