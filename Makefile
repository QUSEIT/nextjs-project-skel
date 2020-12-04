.PHONY: default up stop restart down install lint migrate db

# Make sure the local file with docker-compose overrides exist.
$(shell ! test -e \.\/.docker\/docker-compose\.override\.yml && cat \.\/.docker\/docker-compose\.override\.default\.yml > \.\/.docker\/docker-compose\.override\.yml)

# Create a .env file if not exists and include default env variables.
$(shell ! test -e \.env && cat \.env.default > \.env)

# Make all variables from the file available here.
include .env

default: up

up:
	@echo "After running..."
	@echo "localhost:8080 or quseit_web.docker.localhost to web page"
	docker-compose -f .docker/docker-compose.yml up

stop:
	@echo "Stopping containers..."
	docker-compose -f .docker/docker-compose.yml stop

restart:
	@echo "Restarting containers..."
	$(MAKE) -s down
	$(MAKE) -s up

down:
	@echo "Removing network & containers..."
	docker-compose -f .docker/docker-compose.yml down -v --remove-orphans

install:
	@echo "Create web image and installing node-next depend... image_name => quseit_nextjs"
	docker build -t quseit_nextjs -f ./application/Dockerfile ./application

lint:
	@echo "Checking coding styles..."
	docker-compose -f .docker/docker-compose.yml run node-next yarn eslint --fix

migrate:
	@echo "Making migrate..."
	docker-compose -f .docker/docker-compose.yml run node-next yarn run knex

db:
	@echo "Entering database..."
	docker exec -ti quseit_db psql -U postgres

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
