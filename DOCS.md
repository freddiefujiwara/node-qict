<a name="Qict"></a>

## Qict
This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT

**Kind**: global class  

* [Qict](#Qict)
    * [.readFile(file)](#Qict+readFile) ⇒ [<code>Qict</code>](#Qict)
    * [.initialize()](#Qict+initialize) ⇒ [<code>Qict</code>](#Qict)
    * [.testSets()](#Qict+testSets) ⇒ <code>object</code>
    * [.printResult(testSets)](#Qict+printResult)

<a name="Qict+readFile"></a>

### qict.readFile(file) ⇒ [<code>Qict</code>](#Qict)
store content from file

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: [<code>Qict</code>](#Qict) - this This object  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Target File |

<a name="Qict+initialize"></a>

### qict.initialize() ⇒ [<code>Qict</code>](#Qict)
initialize all parameters

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: [<code>Qict</code>](#Qict) - this This object  
**Access**: public  
<a name="Qict+testSets"></a>

### qict.testSets() ⇒ <code>object</code>
compute test sets

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>object</code> - testSets Generated test sets  
**Access**: public  
<a name="Qict+printResult"></a>

### qict.printResult(testSets)
print test sets to console

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| testSets | <code>object</code> | Generated test sets |

