vcl 4.0;
import std;

backend default {
  .host = "main-web-server";
  .port = "3000";
}

backend authentication_api {
  .host = "authentication-api";
  .port = "3000";
}

backend people_admin {
  .host = "people-admin";
  .port = "3000";
}

backend smiles_admin {
  .host = "smiles-admin";
  .port = "3000";
}

backend miles_camp {
  .host = "miles-camp";
  .port = "3000";
}

backend miles_camp_admin {
  .host = "miles-camp-admin";
  .port = "3000";
}

backend i18n {
  .host = "i18n-api";
  .port = "3000";
}

backend fragment_api {
  .host = "fragment-api";
  .port = "3000";
}

backend message_api {
  .host = "message-api";
  .port = "3000";
}

backend widget_api {
  .host = "widget-api";
  .port = "3000";
}

acl banners {
  "page-service";
  "main-web-server";
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

  if (req.http.X-Forwarded-For) {
    set req.http.X-Client-IP = req.http.X-Forwarded-For + ", " + regsub(client.ip, ":.*", "");
    unset req.http.X-Forwarded-For;
  } else {
    set req.http.X-Client-IP = regsub(client.ip, ":.*", "");
  }

  if (req.url ~ "^/message") {
    set req.backend_hint = message_api;

  }else if (req.url ~ "^/fragments/") {
    set req.backend_hint = fragment_api;

  }else if (req.url ~ "^/applications/people-admin") {
    set req.backend_hint = people_admin;

  }else if (req.url ~ "^/applications/smiles-admin") {
    set req.backend_hint = smiles_admin;

  }else if (req.url ~ "^/camp-admin") {
    set req.backend_hint = miles_camp_admin;

  }else if (req.url ~ "^/camp") {
    set req.backend_hint = miles_camp;

  }
  else if (req.url ~ "^/applications/i18n") {
    set req.backend_hint = i18n;

  }else if (req.url ~ "^/api/login") {
    set req.backend_hint = authentication_api;
  }else if (req.url ~ "^/api/logout") {
    set req.backend_hint = authentication_api;

  }else if (req.url ~ "^/widgets/") {
    set req.backend_hint = widget_api;

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
  if(bereq.backend == default || bereq.backend == fragment_api){
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
