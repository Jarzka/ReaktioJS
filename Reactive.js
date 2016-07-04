// This is a simple example showing how JavaScript could support reactive programming.

createReactiveValue = function(initialValue) {
    return {
        "observers": [], // Call these functions with a new value when it has been set
        "value":initialValue,
        "set": function(newValue) {
            this.value = newValue;
            
            this.observers.forEach(function(observer) {
                // Call observers asynchronously
                setTimeout(function() { observer(this.value) }, 0);
            })
        },
        "get": function() {
            return this.value;
        },
        "addObserver": function(observer) {
            this.observers.push(observer);
        }
    };
}

// If any of the dependant values change, sets reactive value 'value' to the result of calling 'result'
makeReaction = function(value, dependencies, result) {
    dependencies.forEach(function(dependency) {
        dependency.addObserver(function(newValue) {
            var newResult = result(value, dependencies);
            value.set(newResult);
        });
    });
}


// When 'reactiveValue' is changed, calls the given 'result' function with the new value
watchReaction = function(reactiveValue, result) {
    reactiveValue.addObserver(function(newValue) {
        result(newValue);
    });
}

var a = createReactiveValue(2);
var b = createReactiveValue(1);
var c = createReactiveValue(null);

// We want c to depend on both a and b. If either a or b change, c should automatically recalculate it's value
makeReaction(c, [a, b], function(c, [a, b]) {
    return a.get() + b.get();
})

// If c is changed, for whatever reason, log it
watchReaction(c, function(newC) {
    console.log("Reaction completed: " + a.get() + " + " + b.get() + " = " + c.get());
});

// Test it by resetting a and b randomly

setInterval(function()
{
    var newValue = Math.random();
    a.set(newValue); },
1000);

setInterval(function()
{
    var newValue = Math.random();
    b.set(newValue); },
1300);


