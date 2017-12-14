---
layout: post
title: "C++ rvalue references"
date: 2017-12-08
comments: true
---

In my last post, I briefly explained lvalues and rvalues and a little bit about references. In this post, I will be talking about rvalue references. At first, the concept is quite hard to grasp because we previously defined to be an expression that doesn't allow us to take an address of a specific memory location. However, C++11 allows us to create references to r-values by using two ampersands instead of the one ampersand used to create an lvalue reference.

```c++
int x = 10;
int& x_ref = x;     // lvalue reference
int&& r_ref = 10;   // rvalue reference
```

Upon first look, the benefits of rvalue references can be hard to see. However, it is quite useful when trying to solve problems related to move semantics.

## Move Semantics

Move semantics allow us to transfer ownership of resources between different objects. Consider the following example:

<script src="https://gist.github.com/ianw3214/eb7935848b230e6f075d801c5edef5ed.js"></script>
<noscript>
    <pre>
        template&ltclass T&gt
        class dumb_pointer{
            T * ptr;
        public:
            dumb_pointer(T * ptr=nullptr) : ptr(ptr) {}
            ~dumb_pointer() {
                delete ptr;
            }
        };

        // smart pointer class with move semantics
        template&ltclass T&gt
        class smart_pointer{
            T * ptr;
        public:
            smart_pointer(T * ptr=nullptr) : ptr(ptr) {}
            ~smart_pointer() {
                delete ptr;
            }
            // copy constructor with move semantics
            smart_pointer(smart_pointer& other) {
                ptr = other.ptr;
                other.ptr = nullptr;
            }
        };

        int main() {

            {
                dumb_ptr&ltobj&gt ptr1(new obj());
                dumb_ptr&ltobj&gt ptr2(ptr1);
            }

            {
                smart_ptr&ltobj&gt ptr1(new obj());
                smart_ptr&ltobj&gt ptr2(ptr1);
            }

            return 0;

        }
    </pre>
</noscript>

The *dumb_pointer* class in the example is using the default copy constructor provided by the compiler, so when we create ptr2 by passing in ptr1 in the first code block their member *ptr* variables will point to the same object. Then, when the function goes out of scope, both of the dumb_ptr objects will try to delete the same object which will result in an error.

In the second example, the copy constructor is implemented with move semantics in mind. When the second *smart_pointer* is constructed, it sets the member *ptr* of the original smart_ptr object to nullptr, effectively transferring ownership of the object from *ptr1* to *ptr2*. Then, when both pointers go out of scope, delete gets called on the object by *ptr2*, and ptr1 calls delete on nullptr which is a safe operation.

As the above code shown, move semantics help us represent the concept of ownership a lot better, and in a lot of cases can also help with performance optimization.

## Rvalue references and move semantics

Back to the topic at hand, rvalue references allows us to create more efficient *move constructors* as opposed to traditional *copy constructors*. With the ability to differentiate between lvalue references and rvalue references, we can decide when to transfer ownership of objects or when to just straight up copy data. The separation allows for more performant code because the transfer of ownership is usually faster than straight up copying data. Consider this example:

<script src="https://gist.github.com/ianw3214/4eef306dcfc8a9b29cc8977168b1987c.js"></script>
<noscript>
    <pre>
        class ListInt{
        int * list;
        int size;
    public:
        ListInt() {}
        // copy constructor
        ListInt (const ListInt& other) {
            list = new int[other.size];
            size_ = other.size;
            memcpy (list, other.list, size * sizeof (int));
        }
        // move constructor
        ListInt (ListInt&& other) {
            list = other.list;
            size = other.size;
            other.list = nullptr;
            other.size = 0;
        }
        ~ListInt() {
            delete list;
        }
    };
    </pre>
</noscript>

In the above example I implemented a very basic integer list class with a copy constructor and move constructor. The first thing to notice is that in the move constructor we simply have 4 assignments: 2 integer assignments and 2 pointer assignments. It is easy to see that as the size of the list grows, the move constructor does not grow in time complexity because we are always just assigning the 4 variables.

In the copy constructor, we have to perform a *memcpy* to effectively copy the data without modifying the original object. This means that as the size of the list grows, the copy constructor will grow linearly in time complexity as well, becoming much less efficient than the move constructor.

With 2 constructors for the list class, we can now choose between using the copy constructor and the move constructor in our code. If we are transferring ownership, like taking a temporary list and copying it's data into another list, then we can use the move constructor because we know the original list is temporary anyways. If we really need to copy the data into two separate lists, then the copy constructor can be used when it is really necessary.

## Conclusion

Rvalue references are not an easy topic to grasp, but hopefully I was able to explain it somewhat. If there is anything I got wrong please do leave a comment or send me an e-mail.

I realize that my posts aren't very insightful, but I'm still trying to learn a lot of the language myself so a lot of this blog is really just for me to learn by teaching. Any suggestions or critisicm is greatly appreciated, please do leave a comment on this post or send me an email at [ianianw21@gmail.com](mailto:ianianw21@gmail.com).
