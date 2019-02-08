
# nocms-cli

## TODO

* Create package nocms-api-server to reduce boilerplate within Fragments, WebApi and other API containers.
* Create nocms-build to handle bundling of js and css in web containers
* Put important config values in CLI promots
* Create config validation for common containers
* I nocms-config-client: setDefaults
* Auth

Prompts:
RabbitMQ-login
RabbitMQ-passord
TokenSecret

Command line interface for NoCMS projects.

## Installation

Install from npm: `npm i -g nocms-cli`
Run `nocms help` to get an overview of the available operations.

## Containers

A typical collection of containers for a NoCMS project would be:

| Container            | Image Name             | Description           | Type | Startup order * |
|---|---|---|---|---|
| Elasticsearch        | docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.0 | Elasticsearch database used by page and i18n. | External | 1 |
| Config API           | <namespace>_config_api | Central store for configuration values. Implemented using `nocms-config-api-server` package. | Project | 1 |
| Rabbit MQ            | rabbitmq:3.6.2-management | Message queue used for write operations | External | 1 |
| Authentication API * | <namespace>_authentication or nocms_authentication | Authentication service using Auth0 or custom implementations | NoCMS or Project | 3 |
| Authorization API *  | <namespace>_authorization or nocms_authorization | Authorization service using values from Config API or custom implementation | NoCMS or Project | 3 |
| Fragment API **      | <namespace>_fragments  | HTTP server providing HTML fragments for use with ESI includes though Varnish | Project | 2 |
| Web API *            | <namespace>_web_api    | HTTP server providing API for reading operation on data that are user specific, real-time, etc. | Project | 2 |
| Message API *        | nocms_messsage_api     | Endpoint to handle POST requests for publishing messages on the message queue. | NoCMS | 2 |
| Page                 | nocms_page             | API for providing page data | NoCMS | 3 |
| I18n API **          | nocms_i18n             | Application for handling translations and data API | NoCMS | 2 |
| Varnish              | <namespace>_varnich    | Cache and reverse proxy with ESI support. | External | 4 |
| Cloudinary           | nocms_cloudinary       | Proxy for accessing the Cloudinary service used for images | NoCMS | 3 |

 * Optional, but required for publishing.
** Optional


### * Startup order

| # | Description                                                                                          |
|===|======================================================================================================|
| 1 | These containers have other containers depending on them, and thus should start as early as possible |
| 2 | These containers are exposed through Varnish and needs to be available before Varnish starts up      |
| 3 | Other containers with no particular dependencies, and are not listed in Varnish backends             |
| 4 | Varnish                                                                                              |
