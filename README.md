# Snipz ![build](https://travis-ci.org/MadDeveloper/snipz.svg?branch=staging)

# Application

Develop with Angular 4 framework.

## Commands

**build dev:** `ng build`

**build prod:** `ng build --prod`

**start:** `ng serve`

# Elastic Search

Index firbease snippets in order to provided powerful search methods. Each time a snippet is created/updated/deleted, Elastic is notified by a worker hosted on Heroku, which listen for all child events on firebase and update Elastic documents.

Only one index is available on Elastic : firebase
Created with:

```curl
PUT firebase
{
    "settings" : {
        "index" : {
            "number_of_shards" : 5,
            "number_of_replicas" : 1
        }
    }
}
```
