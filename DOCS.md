<a name="Qict"></a>

## Qict
<p>This is a node-qict class. It's a pairwise test case generator inspired by https://github.com/sylvainhalle/QICT
Overall flow is the following</p>
<ul>
<li>readFile(file)</li>
<li>initialize()</li>
<li>testSets()</li>
<li>while(this.unusedPairs.length &gt; 0)
<ul>
<li>candidateSets = _candidateSets()</li>
<li>bestCandidate = _bestCandidate(candidateSets)</li>
<li>_modifyUnused(bestCandidate)</li>
</ul>
</li>
<li>printResult(testSets)</li>
</ul>

**Kind**: global class  

* [Qict](#Qict)
    * [new Qict()](#new_Qict_new)
    * [.setFilter()](#Qict+setFilter) ⇒ [<code>Qict</code>](#Qict)
    * [.readFile(file)](#Qict+readFile) ⇒ [<code>Qict</code>](#Qict)
    * [.initialize()](#Qict+initialize) ⇒ [<code>Qict</code>](#Qict)
    * [.testSets()](#Qict+testSets) ⇒ <code>Array</code>
    * [.printResult(testSets)](#Qict+printResult)
    * [._clean()](#Qict+_clean)
    * [._parseContents()](#Qict+_parseContents)
    * [._best()](#Qict+_best) ⇒ <code>Array</code>
    * [._ordering(best)](#Qict+_ordering) ⇒ <code>Array</code>
    * [._testSet(best)](#Qict+_testSet) ⇒ <code>Array</code>
    * [._candidateSets(testSet)](#Qict+_candidateSets) ⇒ <code>Array</code>
    * [._NumberPairsCaptured(ts)](#Qict+_NumberPairsCaptured) ⇒ <code>number</code>
    * [._InvalidPairsCaptured(ts)](#Qict+_InvalidPairsCaptured) ⇒ <code>bool</code>
    * [._bestCandidate(candidateSets)](#Qict+_bestCandidate) ⇒ <code>Array</code>
    * [._modifyUnused(bestCandidate)](#Qict+_modifyUnused)
    * [._parameterValue(parameterValue)](#Qict+_parameterValue) ⇒ <code>string</code>

<a name="new_Qict_new"></a>

### new Qict()
<p>set this.poolSize = 20;
set this.filter = undefined;</p>

<a name="Qict+setFilter"></a>

### qict.setFilter() ⇒ [<code>Qict</code>](#Qict)
<p>set this.filter</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: [<code>Qict</code>](#Qict) - <p>this This object</p>  
**Params**: <code>function</code> filter  
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
**Returns**: [<code>Qict</code>](#Qict) - <p>this This object</p>  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | <p>Target File</p> |

<a name="Qict+initialize"></a>

### qict.initialize() ⇒ [<code>Qict</code>](#Qict)
<p>This method can be divided into a first half and a second half.</p>
<h4>1st Half</h4>
<p>SEE:_parseConents()</p>
<h4>2nd Half</h4>
<p>2nd half calculates combinations</p>
<p>All possible combinations of Parameter Values are listed below</p>
<table>
<thead>
<tr>
<th>unusedPairs</th>
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
<td>1</td>
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
<td>1</td>
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
<td>1</td>
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
<td>1</td>
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
<td>0</td>
<td>0</td>
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
<p>So as you can calculate easily. the number of times each Parameter Values appears is as follows</p>
<table>
<thead>
<tr>
<th></th>
<th>unusedCounts</th>
</tr>
</thead>
<tbody>
<tr>
<td>on</td>
<td>9</td>
</tr>
<tr>
<td>off</td>
<td>9</td>
</tr>
<tr>
<td>Chrome</td>
<td>7</td>
</tr>
<tr>
<td>Firefox</td>
<td>7</td>
</tr>
<tr>
<td>Opera</td>
<td>7</td>
</tr>
<tr>
<td>Lynx</td>
<td>7</td>
</tr>
<tr>
<td>Windows</td>
<td>8</td>
</tr>
<tr>
<td>Mac</td>
<td>8</td>
</tr>
<tr>
<td>Linux</td>
<td>8</td>
</tr>
<tr>
<td>Member</td>
<td>9</td>
</tr>
<tr>
<td>Guest</td>
<td>9</td>
</tr>
</tbody>
</table>
<p>calculate invalidParametersSearch if filter exists</p>
<p>For example filter.txt is the following</p>
<p>The filter implies the combination Windows x Safari and Linux x Safari are invalid</p>
<pre class="prettyprint source lang-JavaScript"><code>   (parameter1,parameterValue1,parameter2,parameterValue2) => {
     if((&quot;OS&quot; === parameter2 && parameterValue2.match(/^[WL]/) &&
           &quot;Browser&quot; === parameter1 && &quot;Safari&quot; === parameterValue1) ||
         (&quot;OS&quot; === parameter1 && parameterValue1.match(/^[WL]/) &&
          &quot;Browser&quot; === parameter2 && &quot;Safari&quot; === parameterValue2)){
       return true;
     }
     return false;
   }
</code></pre>
<p>so this.invalidPairs should be the following matrix</p>
<table>
<thead>
<tr>
<th>invalidPairs</th>
<th>on</th>
<th>off</th>
<th>Chrome</th>
<th>Firefox</th>
<th>Opera</th>
<th>Safari</th>
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
<td>off</td>
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
<td>Chrome</td>
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
<td>Firefox</td>
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
<td>Opera</td>
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
<td>Safari</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>0</td>
<td>1</td>
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>Windows</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
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
<td>0</td>
<td>0</td>
</tr>
<tr>
<td>Linux</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
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
**Returns**: [<code>Qict</code>](#Qict) - <p>this This object</p>  
**Access**: public  
<a name="Qict+testSets"></a>

### qict.testSets() ⇒ <code>Array</code>
<p>this is all combination of _candidateSets,_bestCan and _modifyUnused</p>
<p>while unusedPairs &gt; 0</p>
<ul>
<li>Step1: compute candidateSets</li>
<li>Step2: select bestCandidate</li>
<li>Step3: push Step2) to testSets</li>
<li>Step4: modify unusedPairs and unusedCounts</li>
</ul>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - <p>testSets Generated test sets</p>  
**Access**: public  
<a name="Qict+printResult"></a>

### qict.printResult(testSets)
<p>print test sets to console</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| testSets | <code>Array</code> | <p>Generated test sets</p> |

<a name="Qict+_clean"></a>

### qict.\_clean()
<p>PRIVATE:clean up all parameters</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
<a name="Qict+_parseContents"></a>

### qict.\_parseContents()
<p>it recognizes contents to parameters,parameterValues,legalValues and parameterPositions</p>
<p>so everything in this.legalValues has been replaced with numbers for ease of use.</p>
<ul>
<li>Step1: Read line by line from this.contents</li>
<li>Step2: Create a pair by splitting a line with a &quot;:&quot;</li>
<li>Step3: Push pair[0]  to this.parameters</li>
<li>Step4: Create an array by splitting the pair with &quot;,&quot;</li>
<li>Step5: Push all values to this.parameterValues</li>
<li>Step6: Create legalValues</li>
<li>Step7: Calculate parameterPositions</li>
</ul>
<p>As the result this.parameters,this.parameterValues,this.legalValues and this.parameterPositions are the following</p>
<pre class="prettyprint source lang-JavaScript"><code>this.parameters = [&quot;Switch&quot;,&quot;Browser&quot;,&quot;OS&quot;,&quot;Membership&quot;];
this.parameterValues = [&quot;on&quot;,&quot;off&quot;,&quot;Chrome&quot;,&quot;Firefox&quot;,&quot;Opera&quot;,&quot;Lynx&quot;,&quot;Windows&quot;,&quot;Mac&quot;,&quot;Linux&quot;,&quot;Member&quot;,&quot;Guest&quot;];
this.legalValues = [
 [0,1],
 [2,3,4,5],
 [6,7,8],
 [9,10]
];
this.parameterPositions = [
 0,0,
 1,1,1,1,
 2,2,2,
 3,3
];
</code></pre>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
<a name="Qict+_best"></a>

### qict.\_best() ⇒ <code>Array</code>
<p>compute the best pair of parametersValues</p>
<p>This is an algorithm that sum the unusedCount of two Parameter Values.</p>
<p>and the largest pair is selected.</p>
<pre class="prettyprint source lang-JavaScript"><code> let weight = this.unusedCounts[pair[0]] + this.unusedCounts[pair[1]];
</code></pre>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - <p>best Best pair</p>  
<a name="Qict+_ordering"></a>

### qict.\_ordering(best) ⇒ <code>Array</code>
<p>Suppose that 0 and 9 of ParameterValues, that is, &quot;on&quot; and &quot;Member&quot;, are selected.</p>
<p>Look at this.ParameterPositions</p>
<pre class="prettyprint source lang-JavaScript"><code>this.parameterPositions = [
 &quot;0&quot;,0,
 1,1,1,1,
 2,2,2,
 &quot;3&quot;,3
];
</code></pre>
<p>order should be [0,3,3rd,4th]</p>
<p>The 1st and the 2nd will be 0,3.</p>
<p>The 3rd and 4th of the second half will be chosen at random.</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - <p>ordering shuffled orders</p>  

| Param | Type | Description |
| --- | --- | --- |
| best | <code>Array</code> | <p>pair</p> |

<a name="Qict+_testSet"></a>

### qict.\_testSet(best) ⇒ <code>Array</code>
<p>The parameter value of the parameter  which selected by _best() is already determined.</p>
<p>This means that the test set that is now being selected is the following.</p>
<table>
<thead>
<tr>
<th></th>
<th>Selected Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Switch</td>
<td>on</td>
</tr>
<tr>
<td>Browser</td>
<td>?</td>
</tr>
<tr>
<td>OS</td>
<td>?</td>
</tr>
<tr>
<td>Membership</td>
<td>Member</td>
</tr>
</tbody>
</table>
<p>How can we select another parameter values from other parameters?</p>
<p>The algorithm is as follows.</p>
<p>for all for all unspecified parameter values.</p>
<ul>
<li>Step 1: Create pair of candidates, [Parameter Value, already determined parameter value]
<ul>
<li>So the first candidate should be [&quot;Chrome&quot;, &quot;on&quot;]</li>
</ul>
</li>
<li>Step2: Check unsusedCount for [&quot;Chrome&quot; ,&quot;on&quot;] or [&quot;on&quot; and &quot;Chrome&quot;] by using the unused matrix shown in the 2nd half of initialize()</li>
<li>Step3: As a result of Step2, the highest scored parameter value will be selected.</li>
</ul>
<table>
<thead>
<tr>
<th>unusedPairs</th>
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
<td><strong>1</strong></td>
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
<td><strong>0</strong></td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
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
<td>1</td>
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
<td>1</td>
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
<td>1</td>
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
<td>0</td>
<td>0</td>
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
**Returns**: <code>Array</code> - <p>testSet one test set</p>  

| Param | Type |
| --- | --- |
| best | <code>Array</code> | 

<a name="Qict+_candidateSets"></a>

### qict.\_candidateSets(testSet) ⇒ <code>Array</code>
<p>Create candidateSets from testSet created by _testSet() for size of this.pool</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - <p>candidateSets test sets for candidate</p>  

| Param | Type | Description |
| --- | --- | --- |
| testSet | <code>Array</code> | <p>one test set</p> |

<a name="Qict+_NumberPairsCaptured"></a>

### qict.\_NumberPairsCaptured(ts) ⇒ <code>number</code>
<p>Count all unused combinations(nC2) in the testSet.</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>number</code> - <p>pairsCaptured</p>  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>Array</code> | <p>Test Ses</p> |

<a name="Qict+_InvalidPairsCaptured"></a>

### qict.\_InvalidPairsCaptured(ts) ⇒ <code>bool</code>
<p>check all invalid combinations(nC2) in the testSet.</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>bool</code> - <p>found</p>  

| Param | Type | Description |
| --- | --- | --- |
| ts | <code>Array</code> | <p>Test Set</p> |

<a name="Qict+_bestCandidate"></a>

### qict.\_bestCandidate(candidateSets) ⇒ <code>Array</code>
<p>Count all unused combinations in the testSet by using _NumberPairsCaptured()</p>
<p>The candidate with the highest total will be chosen.</p>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>Array</code> - <p>bestCandidate best candidate from candidateSets</p>  

| Param | Type |
| --- | --- |
| candidateSets | <code>Array</code> | 

<a name="Qict+_modifyUnused"></a>

### qict.\_modifyUnused(bestCandidate)
<p>For example.
[&quot;on&quot;, &quot;Chrome&quot;, &quot;Windows&quot;, &quot;Member&quot; ]
If so, I'd like to see the entire combination of</p>
<ul>
<li>
<p>[&quot;on&quot;, &quot;Chrome&quot;]</p>
</li>
<li>
<p>[&quot;on&quot;, &quot;Windows&quot;]</p>
</li>
<li>
<p>[&quot;on&quot;, &quot;Member&quot;]</p>
</li>
<li>
<p>[&quot;Chrome&quot;, &quot;Windows&quot;]</p>
</li>
<li>
<p>[&quot;Chrome&quot;, &quot;Member&quot;]</p>
</li>
<li>
<p>[&quot;Windows&quot;, &quot;Member&quot;]</p>
<p>The unusedCount is decremented</p>
<p>The relevant part of unusedPairsSearch is set to 0</p>
<p>Finally the relevant pair of unusedPairs will be removed.</p>
</li>
</ul>

**Kind**: instance method of [<code>Qict</code>](#Qict)  

| Param | Type | Description |
| --- | --- | --- |
| bestCandidate | <code>Array</code> | <p>Best test set</p> |

<a name="Qict+_parameterValue"></a>

### qict.\_parameterValue(parameterValue) ⇒ <code>string</code>
<p>For example.</p>
<ul>
<li>
<ol>
<li>alias -&gt; select each randomly</li>
</ol>
</li>
<li>Win 10 | Win 8 | Win 7 -&gt;</li>
<li>
<ol start="2">
<li>no alias -&gt; return parameterValue</li>
</ol>
</li>
<li>Win 10</li>
</ul>

**Kind**: instance method of [<code>Qict</code>](#Qict)  
**Returns**: <code>string</code> - <p>parameterValue selected parameter value</p>  

| Param | Type | Description |
| --- | --- | --- |
| parameterValue | <code>string</code> | <p>a parameter value</p> |

