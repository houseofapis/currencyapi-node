.DEFAULT_GOAL := help
.PHONY: help
LOCAL_DOCKER_IMAGE=houseofapis/currencyapi-node
CONTAINER_NAME=currencyapi-node-sdk
WORKING_DIR=/application
PORT=7003
DOCKER_COMMAND=docker run --rm -v ${PWD}:${WORKING_DIR} -w ${WORKING_DIR} --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${LOCAL_DOCKER_IMAGE}
DOCKER_COMMAND_INTERACTIVE=docker run --rm -v ${PWD}:${WORKING_DIR} -w ${WORKING_DIR} --name ${CONTAINER_NAME} -p ${PORT}:${PORT} -it ${LOCAL_DOCKER_IMAGE}

build: ## Build docker image
	docker build -t ${LOCAL_DOCKER_IMAGE} . --no-cache

test: ## Run the tests
	${DOCKER_COMMAND} npm test

install: ## Npm install
	${DOCKER_COMMAND} npm i

run: ## Run test file
	${DOCKER_COMMAND_INTERACTIVE} node run.js

publish: ## Publish version (use: make publish OTP=123456 if 2FA enabled)
	docker run --rm -v ${PWD}:${WORKING_DIR} -v ${HOME}/.npmrc:/home/node/.npmrc:ro -w ${WORKING_DIR} --name ${CONTAINER_NAME} ${LOCAL_DOCKER_IMAGE} npm publish $(if ${OTP},--otp=${OTP})

deprecate: ## Deprecate all v1.x versions on npm (use: make deprecate OTP=123456 if 2FA enabled)
	docker run --rm -v ${HOME}/.npmrc:/home/node/.npmrc:ro node:24-slim npm deprecate 'currencyapi-node@<2.0.0' "The v1 API will redirect to v2 on 31 July 2026. Please upgrade to currencyapi-node@2.0.0 for v2 support and the new OHLC endpoint." $(if ${OTP},--otp=${OTP})

help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
