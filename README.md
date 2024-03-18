## Hiraishin

Fly wherever you want!

### Description

Hiraishin is a CLI command that works in bash to make you move faster between your directories.

You mark the directories that you want to move faster, and the program maintains a JSON "database" that stores the number of times you went to this directory using the Hiraishin command to get an optimized search.

Is not necessary to type the whole directory name, this program uses the [Dice Algorithm](https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Dice%27s_coefficient) to get string similarity that gets the best destiny from a given string.

### Autojump

This command works in a very similar way to [autojump](https://github.com/wting/autojump). I had this idea before knowing the existence of autojump, but I keep working to study a little more about JavaScript and Node.js.

## Usage

1. Go to the directory that you want to mark and run:
```
h -a
```
This will mark the directory and make possible to jump from any other place.

2. To fly for a directory, run:
```
h "directory name"
```
3. You can see all the directories added and its weight by running:
```
h -p
```
That will return something like:
```
6: /home/gust/hiraishin/src
4: /home/gust/bar/foo

Total weight: 10
Total entries: 2
Total keys: 2
```
