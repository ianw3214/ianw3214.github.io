---
layout: post
title: "LR Parsing"
date: 2022-07-24
comments: true
tags: post
---

They say the best way to learn is to teach, so I'll test my understanding of LR parsing by trying to explain it! I'm currently making my way through the dragon book and starting to run into a few walls, so I figured writing about it a bit should be helpful!

Let's begin with trying to figure out what LR parsing is. The **L** stands for the left to right scanning of an input string, and the **R** means that the parser constructs a *rightmost derivation* in reverse. Now, that begs the question - what is a rightmost derivation? A derivation is the process of rewriting a string by replacing a nonterminal of the string with a production on the right side of the nonterminal. Then, a rightmost derivation means replacing the rightmost terminal with its right side production. Since LR parsing is a *bottom-up* parsing method, meaning that the construction of the parse tree starts with the leaves (terminals), the derivation is constructed in reverse as we replace the symbols in the input string with corresponding nonterminals. Technically, the full name of the parsing technique is called **LR(k) parsing**, where the k stands for the number if input symbols in the *lookahead*, but we can assume that k is 1 when not specified.

LR Parsing works similarly to *shift-reduce* parsing, where an input string is iteratively reduced by replacing a substring matching the right side of a production with its corresponding nonterminal until the start symbol of the grammar is reached. The shift-reduce parser works by iteratively applying either a shift or a reduce at each step of its parsing:

- A **shift** step will shift a character from the input to a stack keeping track of the current parse
- A **reduce** step will apply a grammar rule to a certain number of symbols on top of the stack

The difference between LR parsing and shift-reduce parsing is the use of states - LR parsing stores states as well as symbols on its stack to help facilitate parsing. The algorithm then works off of two main parts: an **action** table that decides to either shift or reduce, and a **goto** table that decides what state to push onto the stack next. There are different types of LR parsers, but most work the same way using action and goto tables, the differences come in the way that these tables are constructed based on the grammars.

## SLR Parsers

SLR Parsing stands for simple LR parsing, and is the most basic but least powerful method of LR parsing. Before diving into the construction of the two tables for SLR parsing, there are a few definitions that will help.

An **LR(0) item** (just item for short) is a production with a dot at some position on the right side. For example, A -> X·Y is an item based off of the production A -> XY. Intuitively, the left side of a dot stands for how much of the production has been 'seen' by the parser so far.

An **augmented grammar** is simply the grammar G with a new start symbol S' and the additional production of S' -> S. This production helps to indicate when the parsing is finished, as the input can be accepted when the parser is about to reduce S' -> S.

The **closure** of a set of items I is constructed by two rules:
- Initially, every item in I is added to *closure(I)*
- If A -> a·Bw in *closure(I)* and B -> y is a production, then add the item B -> ·y to I if it is not already in I.
Intuitively, if an item is in a closure, it means we expect it to be possible to see the item next from the input. For example, if A -> a·Bw in *closure(I)* and B -> y is a production, then B -> ·y being in the closure means that it is possible for this production will be used next by the input.

The **goto** function is defined over a set of items *I* and a grammar symbol *X*, and is defined to be the closure of the set of all items [A -> aX·B] such that [A -> a·XB] is in I. This essentially means that if I is the set of items that are valid for some viable prefix y, then *goto(I, X)* is the set of items that are valid for the viable prefix yX. Another way to think about it is that we have finished reducing X and are moving on to parse the next part of the string.

With the definition of **closure** and **goto**, we can construct a collection of sets of **LR(0)** items for an augmented grammar G'. These sets of items will be represented by states when used by the parser. The algorithm is as follows:

```
fn items(G'):
C := { Closure( {[S' -> ·S]} ) }
for each set of items I in C and each grammar symbol X:
    if goto(I, X) is not empty and not in C:
        add goto(I, X) to C
// end when no more sets of items can be added to C
```

With the generated sets here, we can construct a SLR parser with SLR parsing table functions *action* and *goto* for augmented grammar G' using the steps:

1. Construct the states *S0, S1, ... Sn* based on the previous LR(0) items construction algorithm. 
2. Determine parsing actions for state *i* based on these rules:
  - If [A -> w·aB] is in *Si* and *goto(Si, a) = Sj* where *a* is a terminal, then set *action[i, a]* to **shift j**. 
    - This effectively means the input is 'read' so we shift *a* to the top of the stack and go to state *j* to try and parse *B*
  - If [A -> a·] is in *Si*, then set *action[i, a]* to **reduce A -> a** for all *a* in **FOLLOW(A)** (A may not be S')
    - FOLLOW stands for the follow set of A, the set of terminals that may potentially be seen following a production
    - Intuitively, this means that the production has been used and we should try to parse whatever can possible follow the production that was just seen
  - If [S' -> S·] is in *Si*, then set *action[i, $]* to **accept**
3. The goto transitions for state i are constructed for all nonterminals A using the rule:
  - if *goto(Si, A) = Sj*, then *goto[i, A] = j*
    - This rule simply relays the information of the set of items representing the states directly into the goto table,\
4. All entries not defined by the previous rules are marked as **error**
5. The initial state of the parser is the one constructed from the set of items containing [S' -> ·S]

If there are any conflicting actions generated by the specified rules, the grammar is said not to be *SLR(1)*, which simply means that the grammar cannot be parsed by a SLR(1) parser. The algorithm will fail to produce a parser in this case.

I won't dive into an example here since it seems like a pain to do with markdown. It is definitely useful to go through a few examples of this by hand, I'm following the examples in the dragon book but there are many resources online too! [(The wiki is a good starting place)](https://en.wikipedia.org/wiki/Simple_LR_parser)

## Canonical LR parsers

In the SLR method, it is possible for an invalid reduction to be inserted into the action table - this is because the follow set has no context of what has been seen by the parser (I think? not sure...) The states can be modified to include more information to avoid invalid reductions, this is done by adding an extra component to the items. Instead of just storing a production with a dot, the items now also store a terminal symbol as a second component. This item is called a **LR(1)** item, where the 1 refers to the length of the *lookahead* of the item. These items can be written in the form [A -> a·B, a]; Then, items of the form [A -> a·, a] will call for a reduction by A -> a only if the next input symbol is a.

The closure operation on a set of items I is then redefined based on the extra component in the item:
- If [A -> a·Bw, x] in *closure(I)* and B -> y is a production
  - For each terminal b in **FIRST(Bw)**: add the item [B -> ·y, b] to I if it is not already in I.
The intuition behind closure was to expand the item to all items that can possibly be seen by the next input, and now the extra information encoding the input symbol that would result in a certain production is added to the set of items

The goto operation on a set of items I with symbol X is mostly unchanged, it is still defined as the closure of the set of all items [A -> aX·B, a] such that [A -> a·XB, a] is in I; Since the goto table is only consulted when a reduce happens, there is no advance in the input symbol and so the second component of the items in the set will not change via a goto step.

Lastly, the construction of the canonical LR parsing table only differs in the construction of the action table; The actions for state *i* are now determined with new rules using the second components of the items:
- If [A -> w·aB, b] is in *Si* and *goto(Si, a) = Sj* where *a* is a terminal, then set *action[i, a]* to **shift j**. 
  - This still means the input is 'read' so we shift *a* to the top of the stack and go to state *j* to try and parse *B*
- If [A -> a·, b] is in *Si*, then set *action[i, b]* to **reduce A -> a** (A may not be S')
  - This is the biggest change from the SLR parser, where we only reduce the production if the proper matching input symbol is found
- If [S' -> S·, $] is in *Si*
  - then set *action[i, $]* to **accept**

Similar to SLR parsing, if there are any conflicting actions generated by the rules, the grammar is said not to be *LR(1)* and the algorithm will fail to produce a parser in this case.

The reason why canonical LR parsers won't reduce invalid reductions is the fact that the closure operation looks at the first set of the next production. This means that during the reduce step when the next input symbol matches the second component of an item, it means that the previous production has already determined that the chosen production will be valid - effectievly the context of the parent production is being preserved (I think...)