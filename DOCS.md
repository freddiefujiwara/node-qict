<a name="Qict"></a>

## Qict
<p>This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT</p>

**Kind**: global class  
**Summary**: <p>set this.poolSize 20 and clean
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
<p>set this.poolSize 20 and clean
and clean</p>

<a name="Qict+readFile"></a>

### qict.readFile(file) ⇒ [<code>Qict</code>](#Qict)
<p>When you want to output the pairwise of the folloing Parameters and Parameter Values</p>
<p>The format of the input file should be as follows.</p>
<table>
<thead>
<tr>
<th style="text-align:center">Parameter</th>
<th style="text-align:center">Parameter Values</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Switch</td>
<td style="text-align:center">on,off</td>
</tr>
<tr>
<td style="text-align:center">Browser</td>
<td style="text-align:center">Chrome, Firefox, Opera, Lynx</td>
</tr>
<tr>
<td style="text-align:center">OS</td>
<td style="text-align:center">Windows, Mac, Linux</td>
</tr>
<tr>
<td style="text-align:center">Membership</td>
<td style="text-align:center">Member, Guest</td>
</tr>
</tbody>
</table>
<pre class="prettyprint source lang-shell"><code>$ cat   __tests__/testData.txt
Switch: on, off
Browser: Chrome, Firefox, Opera, Lynx
OS: Windows, Mac, Linux
Membership: Member, Guest
</code></pre>
<p>The delimiter between Parameters and Parameter Values should be &quot;:&quot;</p>
<p>and also Parameter Values is &quot;,&quot;</p>
<p>Logic is super simple. From argument &quot;file&quot; to this.contents</p>
<ul>
<li>Step1: Use readFileSync to read the whole contents from &quot;file&quot;</li>
<li>Step2: Make it a string.</li>
<li>Step3: Do trim().</li>
<li>Step4: Fill all string in this.contents</li>
</ul>
<p>That's all</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: <p>When you want to output the pairwise of the folloing Parameters and Parameter Values</p>
<p>The format of the input file should be as follows.</p>  
**Returns**: [<code>Qict</code>](#Qict) - <p>this This object</p>  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | <p>Target File</p> |

<a name="Qict+initialize"></a>

### qict.initialize() ⇒ [<code>Qict</code>](#Qict)
<p>This method can be divided into a first half and a second half.</p>
<h4>1st Half</h4>
<p>1st half recognizes contents to parameters,parameterValues and legalValues</p>
<p>so everything in this.legalValues has been replaced with numbers for ease of use.</p>
<ul>
<li>Step1: Read line by line from this.contents</li>
<li>Step2: Create a pair by splitting a line with a &quot;:&quot;</li>
<li>Step3: Push pair[0]  to this.parameters</li>
<li>Step4: Create an array by splitting the pair with &quot;,&quot;</li>
<li>Step5: Push all values to this.parameterValues</li>
<li>Step6: create legalValues</li>
</ul>
<p>As the result this.parameters,this.parameterValues and this.legalValues are the following</p>
<pre class="prettyprint source lang-JavaScript"><code>this.parameters = [&quot;Switch&quot;,&quot;Browser&quot;,&quot;OS&quot;,&quot;Membership&quot;];
this.parameterValues = [&quot;on&quot;,&quot;off&quot;,&quot;Chrome&quot;,&quot;Firefox&quot;,&quot;Opera&quot;,&quot;Lynx&quot;,&quot;Windows&quot;,&quot;Mac&quot;,&quot;Linux&quot;,&quot;Member&quot;,&quot;Guest&quot;];
this.legalValues = [
 [0,1],
 [2,3,4,5],
 [6,7,8],
 [9,10]
];
</code></pre>
<h4>2nd Half</h4>
<table>
<thead>
<tr>
<th></th>
<th>on</th>
<th>off</th>
<th>Chrome</th>
<th>Firefox</th>
<th>Opera</th>
<th>Lynx</th>
<th>Windows</th>
<th>Mac</th>
<th>Linux</th>
<th>Member</th>
<th>Guest</th>
</tr>
</thead>
<tbody>
<tr>
<td>on</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>off</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Chrome</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Firefox</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Opera</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Lynx</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Windows</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Mac</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Linux</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>Member</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>Guest</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
</tr>
</tbody>
</table>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Summary**: This method can be divided into a first half and a second half.  
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

