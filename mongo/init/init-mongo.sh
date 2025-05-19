#!/bin/bash

echo "📦 Initializing MongoDB data..."

mongoimport --db maple-db --collection users --file /docker-entrypoint-initdb.d/users.json --jsonArray
mongoimport --db maple-db --collection events --file /docker-entrypoint-initdb.d/events.json --jsonArray
mongoimport --db maple-db --collection rewards --file /docker-entrypoint-initdb.d/rewards.json --jsonArray
mongoimport --db maple-db --collection reward_requests --file /docker-entrypoint-initdb.d/reward_requests.json --jsonArray
mongoimport --db maple-db --collection user_event_progresses --file /docker-entrypoint-initdb.d/user_event_progresses.json --jsonArray
