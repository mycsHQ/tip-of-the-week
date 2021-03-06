# debugging with circleci

> So, your circleci build is failing and you don't know why?

## What logs are available?

Right after starting the container of your api, we run a `docker logs`, where we display the logs right after starting the app. You can see here if the application started succesfuly or not.  
We also run a `curl http://localhost/healthcheck`. This will show us if the connexion to the DB was successful (`database: healthy: true`).  
After running the tests, we also display a `docker logs`, where you can see if your tests targeted your application. If you don't see anything in the logs, you may have a problem with your setup (tests don't run on localhost?).  

If even with these logs, you don't have a clue, here're a few solutions.

## First attempt: run without cache

An old dependency may be cached. Try to rebuild using the `without cache` option. (top right)

## Second attempt: ssh into the instance

Rerun your build with the option `with ssh`.  
![Build with SSH](https://github.com/mycsHQ/tip-of-the-week/blob/master/images/circleci-build-ssh-button.png?raw=true)  
After a few seconds, the SSH info should be displayed:  
![ssh infos](https://github.com/mycsHQ/tip-of-the-week/blob/master/images/circleci-sshinfos.png?raw=true)

_**NB:** Only the user who started the build has access to this instance._

**Work in progress**
