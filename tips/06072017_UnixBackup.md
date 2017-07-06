## Unix backup solution [Mackup](https://github.com/lra/mackup)

With [Mackup](https://github.com/lra/mackup) it is possible to have a backup of your application settings in the cloud storage of your [choice](https://github.com/lra/mackup/blob/master/README.md#supported-storages) (dropbox, github ...)
All details you can find in the [README](https://github.com/lra/mackup/blob/master/README.md).

* `mackup backup` Copy over your application settings files (some are setup [default](https://github.com/lra/mackup/blob/master/README.md#supported-applications) and you can specify all [files/directories](https://github.com/lra/mackup/tree/master/doc#add-support-for-an-application-or-any-file-or-directory) you want) to the destination (storage) and symlink them back to the original location.
* `mackup restore` On a new mac or linux system create symlinks from the files stored in the cloud storage
* `mackup uninstall` revert changes

## Export/update installed application, packages etc.

You can use the script below as a guide to create lists of all your installed applications, packages editor plugins/extensions etc to have the option to install them through a small bash script if needed on a new machine.

Command line tools used in backup/update script:
- [mas](https://github.com/mas-cli/mas) (cli for mac appstore)
- [brew](https://github.com/Homebrew/brew) (mac package manager)
- [brew cask](http://gillesfabio.github.io/homebrew-cask-homepage/) (mac apps manager)
- apm (atom cli)
- code (visual studio code) cli
- npm/pip/pip3

```bash
#!/bin/sh
# script runs mackup backup and additional backups
echo "###### running autom_update_backup.sh ######";

homedir="/Users/foobar"
serialno=`/usr/sbin/system_profiler SPHardwareDataType | /usr/bin/awk '/Serial/ {print $4}'`
backupPath="$homedir/Dropbox/Mackup/"
fullPath="$backupPath/$serialno/"

mkdir -p $fullPath

# HOMEBREW
echo "###### running brew tasks...";
/usr/local/bin/brew update;
/usr/local/bin/brew upgrade;
/usr/local/bin/brew prune;
/usr/local/bin/brew cleanup -s;
/usr/local/bin/brew doctor;
/usr/local/bin/brew missing;
/usr/local/bin/brew list > $fullPath/brew.apps.txt;

# BREW CASK
echo "###### running brew cask tasks...";
/usr/local/bin/brew cask cleanup;
/usr/local/bin/brew cask list > $fullPath/brewcask.apps.txt;

# NODE && NPM && YARN
echo "###### running npm/yarn tasks...";
/usr/local/bin/npm list -g --depth=0 --json > $fullPath/npm.global.txt;
/usr/local/bin/yarn global list -g --depth=0 > $fullPath/yarn.global.txt;

# PYTHON & PIP
echo "###### running brew cask tasks...";
/usr/local/bin/pip list --format=columns > $fullPath/pip.packages.txt;
/usr/local/bin/pip3 list --format=columns > $fullPath/pip3.packages.txt;

# ATOM
echo "###### running atom tasks...";
/usr/local/bin/apm update -c false;
/usr/local/bin/apm list --installed --bare > $fullPath/atom.packages.txt;

# MAS
echo "###### running mas tasks...";
/usr/local/bin/mas upgrade;
/usr/local/bin/mas list > $fullPath/mas.packages.txt;

# Visual Studio Code
echo "###### running code tasks...";
/usr/local/bin/code --list-extensions > $fullPath/vsc.packages.txt;

echo "###### running mackup tasks...";
/usr/local/bin/mackup backup;

echo "###### autom_update_backup.sh finished ######";

```

> example of an install script (very rudimentary)
```bash
#!/bin/bash
BREW=brew.list.txt
BREWCASK=brewcask.list.txt
MAS=mas.list.txt
VSC=vsc.list.txt
ATOM=atom.list.txt

while read p; do brew install $p; done < $BREW;
while read p; do brew cask install $p; done < $BREWCASK;
while read p; do mas install "$(echo $p | head -n1 | awk '{print $1;}')"; done < $MAS;
while read p; do code --install-extension $p; done < $VSC;
apm install --packages-file $ATOM;
mackup restore;
```

# EXTRA
Chrome extension [OctoTree](https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc)

Tree directory view of github repos