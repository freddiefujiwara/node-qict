<a name="Qict"></a>

## Qict
This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT

**Kind**: global class  

* [Qict](#Qict)
    * [.readFile(file)](#Qict+readFile) ⇒ [<code>Qict</code>](#Qict)
    * [.initialize()](#Qict+initialize) ⇒ [<code>Qict</code>](#Qict)
    * [.testSets()](#Qict+testSets) ⇒ <code>Array</code>
    * [.printResult(testSets)](#Qict+printResult)
    * [._best()](#Qict+_best) ⇒ <code>Array</code>
    * [._ordering(best)](#Qict+_ordering) ⇒ <code>Array</code>
    * [._testSet(best)](#Qict+_testSet) ⇒ <code>Array</code>
    * [._candidateSets(testSet)](#Qict+_candidateSets) ⇒ <code>Array</code>
    * [._NumberPairsCaptured(ts)](#Qict+_NumberPairsCaptured) ⇒ <code>number</code>
    * [._bestCandidate(candidateSets)](#Qict+_bestCandidate) ⇒ <code>Array</code>
    * [._modifyUnused(best)](#Qict+_modifyUnused)

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

### qict.testSets() ⇒ <code>Array</code>
compute test sets

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - testSets Generated test sets  
**Access**: public  
<a name="Qict+printResult"></a>

### qict.printResult(testSets)
print test sets to console

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| testSets | <code>object</code> | Generated test sets |

<a name="Qict+_best"></a>

### qict.\_best() ⇒ <code>Array</code>
PRIVATE:select best parameter pair

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - best Best pair  
<a name="Qict+_ordering"></a>

### qict.\_ordering(best) ⇒ <code>Array</code>
PRIVATE:order parameters

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - ordering shuffled orders  

| Param | Type | Description |
| --- | --- | --- |
| best | <code>object</code> | pair |

<a name="Qict+_testSet"></a>

### qict.\_testSet(best) ⇒ <code>Array</code>
PRIVATE:select one test set

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - testSet one test set  

| Param | Type |
| --- | --- |
| best | <code>object</code> | 

<a name="Qict+_candidateSets"></a>

### qict.\_candidateSets(testSet) ⇒ <code>Array</code>
PRIVATE:select candidate test sets

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - candidateSets test sets for candidate  

| Param | Type | Description |
| --- | --- | --- |
| testSet | <code>Array</code> | one test set |

<a name="Qict+_NumberPairsCaptured"></a>

### qict.\_NumberPairsCaptured(ts) ⇒ <code>number</code>
PRIVATE:sum unused count for ts

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>number</code> - ans  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>object</code> | Test Sets |

<a name="Qict+_bestCandidate"></a>

### qict.\_bestCandidate(candidateSets) ⇒ <code>Array</code>
PRIVATE:select best candidate from candidateSets

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - bestCandidate best candidate from candidateSets  

| Param | Type |
| --- | --- |
| candidateSets | <code>Array</code> | 

<a name="Qict+_modifyUnused"></a>

### qict.\_modifyUnused(best)
PRIVATE:remove the best from unusedParis and decrease unusedCOunts

**Kind**: instance method of [<code>Qict</code>](#Qict)  

| Param | Type | Description |
| --- | --- | --- |
| best | <code>object</code> | Best test set |

