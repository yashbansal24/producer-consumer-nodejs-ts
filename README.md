 Publishing service specification:
  - Will be activated by CLI, accepting a city name from the list of cities
  - Will query the StreetsService for all streets of that city
  - Will publish to the queuing platform the streets it needs to insert

Consuming service specification:
  - Will consume from the messaging queue
  - Will persist the streets data to the selected database

The persisted streets need to contain all data from the api
---
## Provided dependencies:
 Provided is a docker-compose file which contains all of the dependencies that you will need to complete the assignment.\
 **You do not need to lift all of the services**, you can choose which you need as listed in the assignment specification.
 ### The docker-compose exposes the following services:
  - mongoDB
  	- No-sql database, Version - 4.2
	- exposed on localhost port  27017
	- Can be connected to with robo3t/ studio 3t with no need for authentication - https://robomongo.org/
  - Singlestore (formerly memsql)
  	- ANSI SQL compliant and MySQL wire protocol compatible SQL database
	- exposed on port 3306
	- UI studio is exposed on port 8012
		- Authentication:
			- Username: root
			- Password: Password1
 - RabbitMQ
	- backend exposed on port 5672
	- management UI exposed on port 15672
		- Authentication:
			- Username: guest
			- Password: guest
 - Redpanda
	- Fully Kafka-api compatible data streaming platform
	- Kafka broker exposed on port 9092
	- UI exposed on port 8014 with no need for authentication

## Steps
<pre> 
docker compose -f docker-compose up
npm i
npx generate prisma
ts-node src/main.ts Itamar
</pre>