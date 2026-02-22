.DEFAULT_GOAL := help
.PHONY: help
LOCAL_DOCKER_IMAGE=houseofapis/currencyapi-node
CONTAINER_NAME=currencyapi-node-sdk
WORKING_DIR=/app
PORT=7003
# Use official image so test/run work without building
DOCKER_IMAGE ?= node:24-slim
DOCKER_RUN = docker run --rm -v ${PWD}:${WORKING_DIR} -w ${WORKING_DIR} --name ${CONTAINER_NAME} -p ${PORT}:${PORT}
DOCKER_RUN_IT = docker run --rm -v ${PWD}:${WORKING_DIR} -w ${WORKING_DIR} --name ${CONTAINER_NAME} -p ${PORT}:${PORT} -it

build: ## Build docker image
	docker build -t ${LOCAL_DOCKER_IMAGE} . --no-cache

test: ## Run the tests (no build required)
	${DOCKER_RUN} ${DOCKER_IMAGE} sh -c "npm ci 2>/dev/null || npm install && npm test"

install: ## Npm install
	${DOCKER_RUN} ${DOCKER_IMAGE} npm ci 2>/dev/null || ${DOCKER_RUN} ${DOCKER_IMAGE} npm install

run: ## Run the run file (no build required)
	${DOCKER_RUN_IT} ${DOCKER_IMAGE} sh -c "npm ci 2>/dev/null || npm install && node run.js"

publish: ## Publish version (use: make publish OTP=123456 if 2FA enabled)
	docker run --rm -v ${PWD}:${WORKING_DIR} -v ${HOME}/.npmrc:/home/node/.npmrc:ro -w ${WORKING_DIR} --name ${CONTAINER_NAME} ${LOCAL_DOCKER_IMAGE} npm publish $(if ${OTP},--otp=${OTP})

deprecate: ## Deprecate all v1.x versions on npm (use: make deprecate OTP=123456 if 2FA enabled)
	docker run --rm -v ${HOME}/.npmrc:/home/node/.npmrc:ro node:24-slim npm deprecate 'currencyapi-node@<2.0.0' "The v1 API will redirect to v2 on 31 July 2026. Please upgrade to currencyapi-node@2.0.0 for v2 support and the new OHLC endpoint." $(if ${OTP},--otp=${OTP})

help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
