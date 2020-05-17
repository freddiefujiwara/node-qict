<a name="Qict"></a>

## Qict
<p>This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT</p>

**Kind**: global class  
**Summary**: <p>set this.poolSize 20
and clean</p>.  

* [Qict](#Qict)
    * [new Qict()](#new_Qict_new)
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

<a name="new_Qict_new"></a>

### new Qict()
<p>set this.poolSize 20
and clean</p>

<a name="Qict+readFile"></a>

### qict.readFile(file) ⇒ [<code>Qict</code>](#Qict)
<p>It's simple. From argument &quot;file&quot; to this.contents</p>
<ul>
<li>
<p>Step1: Use readFileSync to read the whole contents from &quot;file&quot;</p>
</li>
<li>
<p>Step2: Make it a string.</p>
</li>
<li>
<p>Step3: Do trim().</p>
</li>
<li>
<p>Step4: Fill all string in this.contents</p>
<p>That's all</p>
</li>
</ul>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: It's simple.  
**Returns**: [<code>Qict</code>](#Qict) - <p>this This object</p>  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | <p>Target File</p> |

<a name="Qict+initialize"></a>

### qict.initialize() ⇒ [<code>Qict</code>](#Qict)
<p>initialize all parameters</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>initialize all parameters</p>.  
**Returns**: [<code>Qict</code>](#Qict) - <p>this This object</p>  
**Access**: public  
<a name="Qict+testSets"></a>

### qict.testSets() ⇒ <code>Array</code>
<p>compute test sets</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>compute test sets</p>.  
**Returns**: <code>Array</code> - <p>testSets Generated test sets</p>  
**Access**: public  
<a name="Qict+printResult"></a>

### qict.printResult(testSets)
<p>print test sets to console</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>print test sets to console</p>.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| testSets | <code>Array</code> | <p>Generated test sets</p> |

<a name="Qict+_best"></a>

### qict.\_best() ⇒ <code>Array</code>
<p>PRIVATE:select best parameter pair</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:select best parameter pair</p>.  
**Returns**: <code>Array</code> - <p>best Best pair</p>  
<a name="Qict+_ordering"></a>

### qict.\_ordering(best) ⇒ <code>Array</code>
<p>PRIVATE:order parameters</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:order parameters</p>.  
**Returns**: <code>Array</code> - <p>ordering shuffled orders</p>  

| Param | Type | Description |
| --- | --- | --- |
| best | <code>Array</code> | <p>pair</p> |

<a name="Qict+_testSet"></a>

### qict.\_testSet(best) ⇒ <code>Array</code>
<p>PRIVATE:select one test set</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:select one test set</p>.  
**Returns**: <code>Array</code> - <p>testSet one test set</p>  

| Param | Type |
| --- | --- |
| best | <code>Array</code> | 

<a name="Qict+_candidateSets"></a>

### qict.\_candidateSets(testSet) ⇒ <code>Array</code>
<p>PRIVATE:select candidate test sets</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:select candidate test sets</p>.  
**Returns**: <code>Array</code> - <p>candidateSets test sets for candidate</p>  

| Param | Type | Description |
| --- | --- | --- |
| testSet | <code>Array</code> | <p>one test set</p> |

<a name="Qict+_NumberPairsCaptured"></a>

### qict.\_NumberPairsCaptured(ts) ⇒ <code>number</code>
<p>PRIVATE:sum unused count for ts</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:sum unused count for ts</p>.  
**Returns**: <code>number</code> - <p>ans</p>  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>Array</code> | <p>Test Sets</p> |

<a name="Qict+_bestCandidate"></a>

### qict.\_bestCandidate(candidateSets) ⇒ <code>Array</code>
<p>PRIVATE:select best candidate from candidateSets</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:select best candidate from candidateSets</p>.  
**Returns**: <code>Array</code> - <p>bestCandidate best candidate from candidateSets</p>  

| Param | Type |
| --- | --- |
| candidateSets | <code>Array</code> | 

<a name="Qict+_modifyUnused"></a>

### qict.\_modifyUnused(best)
<p>PRIVATE:remove the best from unusedParis and decrease unusedCOunts</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>PRIVATE:remove the best from unusedParis and decrease unusedCOunts</p>.  

| Param | Type | Description |
| --- | --- | --- |
| best | <code>Array</code> | <p>Best test set</p> |

