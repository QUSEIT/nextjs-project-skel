.PHONY: default up stop restart down install lint migrate db

# Make sure the local file with docker-compose overrides exist.
# $(shell ! test -e \.\/.docker\/docker-compose\.override\.yml && cat \.\/.docker\/docker-compose\.override\.default\.yml > \.\/.docker\/docker-compose\.override\.yml)

# Create a .env file if not exists and include default env variables.
# $(shell ! test -e \.env && cat \.env.default > \.env)

# Make all variables from the file available here.
include .env

# Defines colors for echo, eg: @echo "${GREEN}Hello World${COLOR_END}". More colors: https://stackoverflow.com/a/43670199/3090657
# @echo "Build and run containers..."
	# docker-compose up -d  --remove-orphans
	# @echo "Starting the project..."
	# cd ./.docker/

default: up

up:
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
	@echo "Create web image and installing node depend... image_name => quseit_nextjs"
	docker build -t quseit_nextjs -f ./application/Dockerfile ./application


start:
	@echo "start run nextjs...😜"
	docker-compose -f .docker/docker-compose.yml run start

lint:
	@echo "Checking coding styles..."
	docker-compose -f .docker/docker-compose.yml run node yarn eslint --fix

migrate:
	@echo "Making migrate..."
	docker-compose -f .docker/docker-compose.yml run node npm run knex

db:
	@echo "Entering database..."
	docker exec -ti quseit_db psql -U postgres

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
