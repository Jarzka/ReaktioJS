// Reactive value is a value which can be observed.
// If the value is changed, for whatever reason, all observer are notified asynchronously.
var createReactiveValue = function(initialValue) {
    return {
        "observers": [], // Call these functions with a new value when it has been set
        "value": initialValue,
        "set": function(newValue) {
            this.value = newValue;

            this.observers.forEach((observer) => {
                // Call observers asynchronously
                setTimeout(() => { observer(this.value) }, 0);
            })
        },
        "get": function() {
            return this.value;
        },
        "addObserver": function(observer) {
            this.observers.push(observer);
        }
    };
};

// If any of the dependant values change, sets reactive value 'value' to the result of calling 'result'
var makeReaction = function(value, dependencies, result) {
    dependencies.forEach((dependency) => {
        dependency.addObserver((newValue) => {
            var newResult = result(value, dependencies);
            value.set(newResult);
        });
    });
};

// When 'reactiveValue' is changed, calls the given 'result' function with the new value
var watchReaction = function(reactiveValue, result) {
    reactiveValue.addObserver((newValue) => {
        result(newValue);
    });
};

export { createReactiveValue, makeReaction, watchReaction };