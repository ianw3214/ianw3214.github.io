---
layout: post
title: "C++ lvalues and rvalues"
date: 2017-11-26
comments: true
---

## Introduction

Back when I first started programming c++, I would commonly get errors that mentioned the terms *lvalue* and *rvalue*, but I couldn't really understand what they mean. Most of the time, the errors could be solved by tinkering with the hinted lines for a bit. However, it's still a good idea to understand what they are, which is why I've decided to dedicate a post about them.

## Definition

Before I really get into the definition, I want to give a basic intuition for the terms. The way I first thought about them is that *lvalues* represent things that would appear on the *left* side of an assignment, and *rvalues* represent things that appear on the *right* sides. For example, if I have the following assignment:

```c++
int i;
i = 10;
```

Then *i* would be an lvalue because it logically should go on the left hand side of an equation, and *10* would be an rvalue because it should go on the right hand side of the equation. Essentially, we could say we are *assigning* 10 to *i*. Now consider the following the example:

```c++
int i = 10;
20 = i;
```

This assignment wouldn't make sense because we are trying to take the value of *i* and assigning it to *20*, but 20 is a defined literal and it wouldn't make any sense at all to try to change its value. Let's look at one more example:

```c++
int i = 10;
int j = i;
```

Once again, we have *i* on the right hand side but this time we are assigning it to *j*, so we take the value of i and assign it to j, which is a valid assignment. Even though *i* was used as an lvalue in the first assignment, we are using it as an *rvalue* in this assignment, which is still a valid operation.

These examples bring us to the definition of the terms. An **lvalue** is a variable or object that occupies some location in memory, whereas an **rvalue** does not occupy a specific location in memory. In a sense, rvalues are like temporary expressions that aren't retained throughout the execution of a program.

With this definition, we can go back to explain the example code a little bit more. The first assignment works because we are taking a value of 10 and assigning it to a specific location in memory. The literal value of 10 doesn't have a specific memory address, but we don't need one anyways because we just need to take the value and assign it to something else.

Then, the second assignment fails because we are trying to assign the value of i, which is 10, to the value 20. However, there is no specific memory address that stores 20, because it as an integer literal. Therefore, when the application tries to assign the value it can't find where it should be storing the data, so it throws an error saying *error: lvalue required as left operand of assignment*.

Lastly, we can now easily see why the third assignment works because we are assigning the value 10 to the integer j, which has an address in memory. We don't care that i is used on the right hand side of the assignment because we can just find the value from the address of i.

## lvalue to rvalue conversion

The examples above tie i nicely to a point about lvalues: **All lvalues can be converted to rvalues**. In the third example, we use the integer *i* as an rvalue, taking it's value of 10 and assigning it to *j*, even though *i* is supposed to be an lvalue that holds a specific address in memory. It's pretty easy to see how this generalizes for all *lvalues*, we can just take its' value to use it as an *rvalue*.

## Expressions

We can also use a *combination* of lvalues and rvalues in an expression, but we have to keep in mind that the expression will result in an *rvalue* so we can't use it on the left side of an assignment. Take the following example:

```c++
int i = 10;
int j = 20;
i + j = 50;     // invalid  -> i + j is an rvalue
int k = i + j;  // valid    -> k is an lvalue
```

Here we are using adding i and j in an expression, which will give us an *rvalue*. When we try to assign something to *i + j*, the compiler will throw an error because we can't assign to an rvalue. When we use *i + j* properly as an *rvalue* and assign it to *k*, the compiler allows it because we are assigning the *rvalue* to an *lvalue*, which is a valid operation.

## Functions and References

<script src="https://gist.github.com/ianw3214/f413047810a0a76379054411b0a7fa14.js"></script>
<noscript>
    <pre>
        int global_int = 1;
        int foo() {
            return global_int;
        }
        int& bar() {
            return global_int;
        }
        int main() {
            foo() = 5;  // INVALID  -> foo() is an rvalue
            bar() = 5;  // VALID    -> bar() is an lvalue
            return 0;
        }
    </pre>
</noscript>

Because C++ makes *references* possible, we can get our functions to return an *lvalue* and therefore we can directly modify those values. The above function *foo* has a return type of *int*, which is an rvalue, so when we try to assign to it we will get an error. However, the function *bar* returns an *int reference*, which **is an lvalue**, so it is a valid operation to try to assign to it.

## Modifiable lvalues

Since C++ introduces the *const* keyword, we can't simply assume every *lvalue* is a valid operand on the left hand side of an assignment because it might be declared const, meaning we aren't allowed to change the value. Consider the following assignment:

```c++
const int i = 10;
i = 20;
```

Even though i is an lvalue in the above example, the assignment is still invalid because we aren't supposed to be able to change the value of i. For this reason, i is not a *modifiable lvalue* because it is declared as const. There are some other reasons an lvalue may not be modifiable, for example if it has an array type.

## Conclusion

There are a lot more nuances to the topic of lvalues and rvalues, some that I don't really even understand yet. However, a basic understanding of the terms comes a long way in helping debugging weird error messages that pop up from time to time.

As I'm still new to blogging, I would greatly appreciate any feedback/criticism. Feel free to leave a comment on this post or send me an email at [ianianw21@gmail.com](mailto:ianianw21@gmail.com).
