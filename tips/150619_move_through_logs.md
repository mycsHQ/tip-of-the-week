# Move through long Logs
`vi` | `vim` | `journalctl` | ...

## Shortcuts

* Jump to end of file: `Shift + g`
* Jump back to beginning: `gg`
* Jump to a specific line number: `line_number + Enter`
* Go to next page: `z`
* Go to previous page: `w`
* Search: `/ + keyword_to_search_for + Enter`
  * Next result: `n`
  * Previous result: `Shift + n`

## Journalctl

* All logs (`-u`):

  ```
  sudo journalctl -u system_name
  ```
* Tail (`-fu`):

  ```
  sudo journalctl -fu system_name
  ```
* Tail + # of line (`-n100`):
  
  ```
  sudo journalctl -fu system_name -n500
  ```
* Display full lines (`-l`):

  ```
  sudo journalctl -fu system_name -l
  ```

## Docker
> https://docs.docker.com/reference/commandline/cli/#logs

* `sudo docker logs [container name] | grep error`
* `sudo docker logs --tail=500 -f [container name]`
