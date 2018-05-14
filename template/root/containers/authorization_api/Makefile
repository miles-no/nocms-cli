CONTAINER_NAME := authorization_api
EXTERNAL_PORT := 3204
CONTAINER_PORT := 3000
CONTAINER_NETWORK=nocms
CONTAINER_IP := 192.168.4.204

build:
	docker build -t $(CONTAINER_NAME) .

build_dev:
	docker build -f Dockerfile.dev -t $(CONTAINER_NAME)_dev .

run:
	docker run -d \
	--net $(CONTAINER_NETWORK) \
  -e CONFIG_API_HOST="http://config_api_dev:3000" \
  -e CRYPTEX_KEYSOURCE_PLAINTEXT_KEY=$(CRYPTEX_KEYSOURCE_PLAINTEXT_KEY) \
	-v $(CURDIR)/app:/usr/src/app \
	-v $(CURDIR)/logs:/log \
	--name $(CONTAINER_NAME)_dev \
	$(CONTAINER_NAME)_dev

start:
	docker run -d \
	--net $(CONTAINER_NETWORK) \
  -e CONFIG_API_HOST="http://config_api:3000" \
  -e CRYPTEX_KEYSOURCE_PLAINTEXT_KEY=$(CRYPTEX_KEYSOURCE_PLAINTEXT_KEY) \
	--name $(CONTAINER_NAME) \
	139.162.190.101/$(CONTAINER_NAME)

open:
	docker run -itv $(CURDIR)/app:/usr/src/app --name $(CONTAINER_NAME)_dev $(CONTAINER_NAME)_dev sh

stop:
	-docker rm -f $(CONTAINER_NAME)
	-docker rm -f $(CONTAINER_NAME)_dev

update:
	cd app/node_modules && rm -Rf nocms*
	cd app && npm i

apply:
	j2 k8s/minikube.yml | kubectl apply -f -
