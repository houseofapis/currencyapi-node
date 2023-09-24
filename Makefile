.DEFAULT_GOAL := help
.PHONY: help
LOCAL_DOCKER_IMAGE=houseofapis/currencyapi-node
CONTAINER_NAME=currencyapi-node
WORKING_DIR=/application
PORT=7003
DOCKER_COMMAND=docker run --rm -v ${PWD}:${WORKING_DIR} -w ${WORKING_DIR} --name ${CONTAINER_NAME} -p ${PORT}:${PORT} -it ${LOCAL_DOCKER_IMAGE}

build: ## Build docker image
	docker build -t ${LOCAL_DOCKER_IMAGE} . --no-cache

test: ## Run the tests
	${DOCKER_COMMAND} npm test

install: ## Npm install
	${DOCKER_COMMAND} npm i

run: ## Run test file
	${DOCKER_COMMAND} node run.js

help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
