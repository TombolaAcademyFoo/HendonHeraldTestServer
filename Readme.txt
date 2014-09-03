Can test:
1. Open a command prompt
2. cd into the directory which contains this file
3. execute:

	node app.jh

4. You should see
	starting
	Express server listening on port 3000

Use the postman chrome extension to perform a GET to test the server, test URL:

http://localhost:3000/submit?message=hello &email=foo@bar.com

Should get a success response and see logging in the command window.
To stop the server hit ctrl-c in the command window. (Windows, Mac TBC)