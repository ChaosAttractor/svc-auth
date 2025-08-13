#!/usr/bin/env make

## Default shell
SHELL = /bin/sh

## Default command
.DEFAULT_GOAL := help

# --- [ Help ] ---------------------------------------------------------------------------------------------------------
## Displays help
help:
	@echo '+----------------------------+'
	@echo '| List of available commands |'
	@echo '+----------------------------+'
	@awk 'BEGIN {FS = ":"} /^##.*?/ {printf "\n%s", $$1} /^[a-zA-Z_-]+:/ {printf ":%s\n", $$1} /^# ---/ {printf "\n%s\n", $$1}' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":"} /^##.*?:/ {print $$2, $$1} /\[.*?\]/ {print}' | \
	sed 's/# -* \(.*\) -*/\1/' | \
	awk 'BEGIN {FS = "##"} /^[a-zA-Z_-]+/ {printf " \033[1;1m%-38s\033[0m\t- %s\n", $$1, $$2} /\[.*?\]/ {printf "\n\033[1;1m%s\033[0m\n", $$1}'

# --- [ Base ] ---------------------------------------------------------------------------------------------------------
## Initializes the project
init:
	cd ./app && npm i

## Builds the project
build:
	cd ./app && npm run build
