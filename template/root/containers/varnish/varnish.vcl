vcl 4.0;
import std;

backend default {
  .host = "web";
  .port = "3000";
}

backend authentication_api {
  .host = "nocms-authentication-api";
  .port = "3000";
}

backend i18n {
  .host = "i18n-api";
  .port = "3000";
}

backend fragments {
  .host = "fragments";
  .port = "3000";
}

backend message_api {
  .host = "message-api";
  .port = "3000";
}

backend web_api {
  .host = "web-api";
  .port = "3000";
}

acl banners {
  "page-service";
  "web";
}

sub vcl_recv {
  if (req.http.x-ban == "cache") {
    if (!client.ip ~ banners) {
      return (synth(405));
    }
    if (req.url == "/clear_entire_cache") {
      ban("req.url ~ /");
      return(synth(200, "Cache cleared"));
    }
    ban("req.url ~ (" + req.http.x-ban-url + ")");
    return(synth(200, "Ban added"));
  }


  if (req.http.Cookie) {
    set req.http.Cookie = ";" + req.http.Cookie;
    set req.http.Cookie = regsuball(req.http.Cookie, "; +", ";");
    set req.http.Cookie = regsuball(req.http.Cookie, ";(nocms-authenticated|nocms-authenticated-refresh)=", "; \1=");
    set req.http.Cookie = regsuball(req.http.Cookie, ";[^ ][^;]*", "");
    set req.http.Cookie = regsuball(req.http.Cookie, "^[; ]+|[; ]+$", ""); #"

    if (req.http.Cookie == "") {
        unset req.http.Cookie;
    }
  }

  if (req.url ~ "^/message") {
    set req.backend_hint = message_api;

  }else if (req.url ~ "^/fragments/") {
    set req.backend_hint = fragments;

  }
  else if (req.url ~ "^/applications/i18n") {
    set req.backend_hint = i18n;

  }else if (req.url ~ "^/api/(login|logout)") {
    set req.backend_hint = authentication_api;

  }else if (req.url ~ "^/api/") {
    set req.backend_hint = web_api;

  } else {
    set req.backend_hint = default;
  }

  if (req.url ~ "^/?pageId=") {
      return (pass);
  }
  if (req.method != "GET" && req.method != "HEAD") {
      return (pass);
  }
  if (req.http.Authorization || req.http.Cookie) {
      return (pass);
  }

  return (hash);
}

sub vcl_backend_fetch {
  set bereq.http.X-Correlation-Id = bereq.xid;
}

sub vcl_backend_response {
  // Enable seperation between text/html and application/json responses
  set beresp.http.Vary = "Accept, Host";
  set beresp.ttl = 600s;
  if(beresp.status != 200 && beresp.status != 404 && beresp.status != 301){
    set beresp.ttl = 0s;
  }
  // Enable ESI processing
  if(bereq.backend == default || bereq.backend == fragments){
    set beresp.do_esi = true;
  }

  // Enable gzip
  if (bereq.url ~ "\.(jpg|png|gif|gz|tgz|bz2|tbz|mp3|ogg|swf)$") {
    set beresp.do_gzip = false;
  }
  else {
    set beresp.do_gzip = true;
    set beresp.http.X-Cache = "ZIP";
  }

  return (deliver);
}

sub vcl_deliver {
  unset resp.http.Via;
  unset resp.http.X-Powered-By;
  unset resp.http.X-Varnish;
}

sub vcl_backend_error {
  set beresp.http.Content-Type = "text/html; charset=utf-8";
  synthetic(std.fileread("/config/errors/error.html"));
  return (deliver);
}
