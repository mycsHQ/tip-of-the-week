## git workflow

This workflow is only a proposal and needs to be improve over time.  
Any feedback is highly appreciated.

1.  Create your branch and build your feature
  * git checkout -b my_feature_branch
  * ... make your changes
  * git add . && git commit -m "My commit message"
  * git push origin my_feature_branch  
2. From time to time, get in sync with master
  * git fetch origin
  * git rebase origin/master
3. keep working on your branch
  * ... make your changes
  * git add . && git commit -m "My commit message"
  * git push origin my_feature_branch
4. Create your PR on github
5. when your PR has been approved, you can squash all your commits  
  * git rebase -i HEAD~3 (3 being the number of commits you want to squash)
  * Please use the Jira ticket number at the beginning of the commit comment:
    * `MYCS-2098 Some awesome feature`
6. now, you can merge to master
  * git checkout master
  * git merge --ff-only my_feature_branch
  * git push origin master


## tips
* the commit SHA can be found in the `commits` page on github by clicking on the `Copy the full SHA` button (cf [screenshot](https://github.com/mycsHQ/tip-of-the-week/blob/master/images/get-full-commit-sha.png?raw=true))

* Use [git-extras](https://github.com/tj/git-extras) to have more useful git commands like:
    * [git pr](https://github.com/tj/git-extras/blob/master/Commands.md#git-pr)
    * [git squash](https://github.com/tj/git-extras/blob/master/Commands.md#git-squash)
    * [many more](https://github.com/tj/git-extras/blob/master/Commands.md)

* Use [`gitx`](https://rowanj.github.io/gitx/) (rowanj's fork) to have a GUI to see the commits, the branches, ... Enable `terminate usage` to be able to call `gitx` in your terminal in any git repo you have. (cf [screenshot](https://github.com/mycsHQ/tip-of-the-week/blob/master/images/gitx-terminal-usage.png?raw=true))


## resources
- https://www.atlassian.com/git/tutorials/merging-vs-rebasing/workflow-walkthrough
- http://rypress.com/tutorials/git/index
- http://www.git-tower.com/learn/git/ebook/command-line/advanced-topics/rebase
