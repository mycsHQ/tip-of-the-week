# Using [Dash](https://itunes.apple.com/de/app/dash-api-docs-snippets/id458034879?l=en&mt=12) to store and manage snippets

> Dash is an API Documentation Browser and Code Snippet Manager. Dash stores snippets of code and instantly searches offline documentation sets for 150+ APIs (for a full list, see below). You can even generate your own docsets or request docsets to be included.

Dash is great to manage Snippets that you have to use over and over again. You can categorise them by tags and quickly search for them.

![image](https://cloud.githubusercontent.com/assets/352146/7676568/504f7db4-fd45-11e4-89cb-0510accc8993.png)

---

## Ideal setup

1. Launch the app on login
2. Define a shortcut, ie. `cmd + ``
3. Activate: `Dismmiss main window when I activate a different app`

![image](https://cloud.githubusercontent.com/assets/352146/7676586/75a7c058-fd45-11e4-9551-2af358d1f061.png)

---

## Useful Snippets

#### Coffeescript
* `for` loops
```coffee
for key of obj
for key, value of obj
for own key, value of obj # Avoid going up in the prototype chain
```

---

#### CSS
* See how content fits into containers
```coffee
* { background-color: rgba(255,0,0,.2); }
* * { background-color: rgba(0,255,0,.2); }
* * * { background-color: rgba(0,0,255,.2); }
* * * * { background-color: rgba(255,0,255,.2); }
* * * * * { background-color: rgba(0,255,255,.2); }
* * * * * * { background-color: rgba(255,255,0,.2); }
```

---

#### Docker
* Check running containers
```coffee
# All containers
sudo docker images

# See used images
sudo docker ps -a
```

* View logs
```coffee
# https://docs.docker.com/reference/commandline/cli/#logs

sudo docker logs [container name] | grep error
sudo docker logs --tail=500 -f [container name]
```

* Remove container
```coffee
sudo docker rmi [container ID]
```

---

#### Git
* View unpushed commits
```coffee
git log origin/master..HEAD
```
* Stash
```coffee
git stash save "my_stashed_stuff_name"

git stash list
git stash apply stash@{n}
git stash pop stash@{n}     # Apply and remove from list
```

* Undo last `add` (before commit)
```coffee
git reset HEAD --
```

---

#### Mac
* Run local server
```coffee
# Go into the desire folder and run
python -m SimpleHTTPServer 8001
```

* Split CSV file into many small ones
```coffee
split -l [max lines] [filename.csv] [prefix: new-]
```

---

#### Redis
* Start locally
```
redis-server /usr/local/etc/redis.conf
```

---

#### Unix
* Check HDD space
```coffee
df -H

# Sort by biggest files
du -h | sort -rh

# or
du -a -h --max-depth=1 | sort -hr
```

* GZIP
```coffee
# Folders
tar -zcvf new_filename.tar.gz folder_name

# Compress file
tar zcf dumpfilename.tar.gz dumpfilename.sql

# Extract file
tar zxf dumpfilename.tar.gz
gzip -d dumpfilename.gz
```

* Symbolic link (Symlink)
```coffee
ln -s /path/to/file_or_folder /path[optional]/name_for_symlink
```

* SCP (up/download files)
```coffee
# Upload
scp /your/file user@host:/where/to/put/it

# Download
scp user@host:/desired/file ~/where/to/save/it

# Recursive + key
scp -rp -i ~/.ssh/mykey /your/file user@host:/where/to/put/it
```

* [Multitail](http://www.vanheusden.com/multitail/)
```coffee
# Install (Mac)
brew install Multitail

# Run
multitail -l 'ssh user@host1 "sudo [command to be run on the sever]"' -l 'ssh user@host2 "[another command to be run on the sever]"'
```

