[![npm version](https://badge.fury.io/js/qict.svg)](https://badge.fury.io/js/qict) ![Node.js CI](https://github.com/freddiefujiwara/node-qict/workflows/Node.js%20CI/badge.svg)
# node-qict
A pairwise test case generator implements from https://github.com/sylvainhalle/QICT

Try on your browser https://freddiefujiwara.github.io/node-qict/#go

# install
``` shell
$ npm i -g node-qict
```

# usage
## sample data
```shell
$ cat   __tests__/testData.txt
Switch: on, off        
Browser: Chrome, Firefox, Safari, Opera
OS: Windows, Mac, Linux
Membership: Member, Guest
```
## sample result
```shell
$ qict __tests__/testData.txt
- There are 4 parameters                                             
- There are 11 parameter values
- Parameter values
  on off Chrome Firefox Safari Opera Windows Mac Linux Member Guest
- Legal values internal representation:       
  * Parameter0: 0 1                                   
  * Parameter1: 2 3 4 5
  * Parameter2: 6 7 8                                                    
  * Parameter3: 9 10                                                    
- There are 44 pairs                                                      
Result test sets:                                                        
  0          on  Chrome Windows  Member                                    
  1         off  Chrome     Mac   Guest                                   
  2          on Firefox   Linux   Guest                                    
  3         off  Safari   Linux  Member                                    
  4         off   Opera Windows   Guest                                   
  5          on Firefox     Mac  Member                                   
  6          on  Safari Windows   Guest                                    
  7          on   Opera     Mac  Member                                    
  8          on  Chrome   Linux  Member                                    
  9         off Firefox Windows  Member                                    
 10          on  Safari     Mac  Member                                    
 11          on   Opera   Linux  Member                                   
End                                          
```

{% include form.html %}
