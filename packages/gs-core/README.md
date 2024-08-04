# Ground Station Core Servers

The ground station is made up of two typescript programs that run concurrently. The first program is an express server that handles user REST API and the second is the consistently running service in charge of UDP comms with the drone(s). 

## Ground Station Server

This is the code for the core server, which hosts the endpoints and serves the html to the user.