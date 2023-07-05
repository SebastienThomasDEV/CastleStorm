export function debounce(cb, interval, immediate) {
    let timeout;

    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) cb.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, interval);

        if (callNow) cb.apply(context, args);
    };
}

export function keyDownListener(event, keyPresses) {
    keyPresses[event.key] = true;
}
export function keyUpListener(event, keyPresses) {
    keyPresses[event.key] = false;
}


