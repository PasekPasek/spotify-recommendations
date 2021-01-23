DOCKER_COMPOSE  := docker-compose
DOCKER_COMPOSE_DEV  := $(DOCKER_COMPOSE) -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD  := $(DOCKER_COMPOSE) -f docker-compose.prod.yml

docker-build-dev: 
	$(DOCKER_COMPOSE_DEV) build

start-dev: docker-build-dev
	$(DOCKER_COMPOSE_DEV) up

stop-dev: 
	$(DOCKER_COMPOSE_DEV) down --remove-orphans

docker-build-prod: 
	$(DOCKER_COMPOSE_PROD) build

start-prod: docker-build-prod
	$(DOCKER_COMPOSE_PROD) up

stop-prod: 
	$(DOCKER_COMPOSE_PROD) down --remove-orphans