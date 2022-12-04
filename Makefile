#!make
.PHONY: default cleanup clean build up down test install audit audit-fix prettier lint precommit

export BUILD_VERSION ?= local

default: build up
	open http://localhost:3000

cleanup:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose down -v --rmi all --remove-orphans

clean:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose down -v --remove-orphans

build:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose build

up:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose up -d

logs:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose logs -f

down:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose down

test:
	BUILD_VERSION=$(BUILD_VERSION) docker-compose run -T --rm --entrypoint "bash -c" dashboard "yarn test:ci"


install:
	cd dashboard && yarn install

audit: install
	cd dashboard && yarn audit

audit-fix: install
	cd dashboard && npx yarn-audit-fix && yarn audit

prettier: install
	cd dashboard && yarn prettier

lint: install
	cd dashboard && yarn lint

test-local:
	cd dashboard && yarn test:ci

precommit: audit-fix prettier lint test-local
