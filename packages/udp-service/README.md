# Ground Station Core Servers

The ground station is made up of two typescript programs that run concurrently. The first program is an express server that handles user REST API and the second is the consistently running service in charge of UDP comms with the drone(s). 

## UDP Comms Service

This is the code for the UDP listening service. It has to have its own package because it must be built indiviually to run concurrently with the core server.