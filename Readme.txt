Can test:
1. Open a command prompt
2. cd into the directory which contains this file
3. execute:

	node app.js

4. You should see
	starting
	Express server listening on port 3000

If not, contact me.



*******************TESTING THE SERVER *****************

If you do not already have it, you can use the Postman chrome extension to test http request/responses. Available here:
https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en


Use the postman to perform a GET to test the server, test URL:
http://localhost:3000/submit?message=hello &email=foo@bar.com

Should get a success response and see logging in the command window.



******************* Stopping the server *****************
To stop the server hit ctrl-c in the command window. (Windows, Mac TBC)


******************* Available API calls *****************

1. http://localhost:3000/submit on an GET HTTP request. Returns HTML only
2. http://localhost:3000/api/submit on a POST HTTP request Returns JSON object
Both calls require two variables to work - "email" and "message" (case sensitive) as per the test above. If everything
is OK, the server will provide an HTTP status of 200. If one or more of the required parameters are missing the server
will respond, but with a 422 status code - this is a server side validation error.

The second (api) call returns the following an oject with the following properties:
message - A response message
errors - an array of strings listing all the missing fields. Only present if validation has failed/422 status.

