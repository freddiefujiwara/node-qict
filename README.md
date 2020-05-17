[![npm version](https://badge.fury.io/js/qict.svg)](https://badge.fury.io/js/qict) ![Node.js CI](https://github.com/freddiefujiwara/node-qict/workflows/Node.js%20CI/badge.svg)
# node-qict
A pairwise test case generator implements from https://github.com/sylvainhalle/QICT

Try on your browser https://freddiefujiwara.github.io/node-qict/#go

# install
``` shell
$ npm i -g qict
```

# usage
## sample data
```shell
$ cat   __tests__/testData.txt
Switch: on, off
Browser: Chrome, Firefox, Opera, Lynx
OS: Windows, Mac, Linux
Membership: Member, Guest
```
## sample result
```shell
$ qict __tests__/testData.txt
- There are 4 parameters
- There are 11 parameter values
- Parameter values:
  on off Chrome Firefox Opera Lynx Windows Mac Linux Member Guest
- Legal values internal representation:
  * Parameter0: 0 1
  * Parameter1: 2 3 4 5
  * Parameter2: 6 7 8
  * Parameter3: 9 10
- There are 44 pairs
Result test sets:

  0     on  Chrome Windows  Member
  1    off Firefox Windows   Guest
  2    off   Opera     Mac  Member
  3     on    Lynx   Linux   Guest
  4     on  Chrome     Mac   Guest
  5     on Firefox   Linux  Member
  6    off    Lynx Windows  Member
  7     on   Opera   Linux   Guest
  8     on Firefox     Mac  Member
  9    off  Chrome   Linux  Member
 10     on   Opera Windows  Member
 11     on    Lynx     Mac  Member

End
```

{% include form.html %}
