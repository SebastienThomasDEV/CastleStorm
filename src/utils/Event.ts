export class Event {

    public static debounce(func: Function, wait: number, immediate: boolean): Function {
        let timeout: any;
        return function () {
            // @ts-ignore
            const context = this as Function, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

}
