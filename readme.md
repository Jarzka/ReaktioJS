Reaktio.js is a small library which allows you to create a value that can be observed. If the value is changed, for whatever reason, all observer are notified asynchronously. Observer can be a function or another value which is updated.

Example code:

```javascript
var a = createReactiveValue(2);
var b = createReactiveValue(1);
var c = createReactiveValue(null);

// We want c to depend on both a and b. If either a or b change, c should automatically recalculate it's value
makeReaction(c, [a, b], (c, [a, b]) => {
    return a.get() + b.get();
})

// If c is changed, for whatever reason, log it
watchReaction(c, (newC) => {
    console.log("Reaction completed: " + a.get() + " + " + b.get() + " = " + c.get());
});

// Test it by resetting a and b randomly

setInterval(() =>
{
    var newValue = Math.random();
    a.set(newValue); },
1000);

setInterval(() =>
{
    var newValue = Math.random();
    b.set(newValue); },
1300);

```