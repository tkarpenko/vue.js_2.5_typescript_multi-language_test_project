import _Vue from 'vue';

/**
 * Global queue with an array, that contains links to functions
 * which should be executed no longer then 4ms per each browser's
 * repaint. This goal is achived with requestAnimationFrame function
 */
class ProcessQueue {
    private isRAF = false;
    private tasks: any = [];

    /**
     * Check the existence of a requestAnimationFrame and cancelAnimationFrame functions.
     * If they are not exist then simulate them by using polyfill from here
     * https://gist.github.com/geddski/1649729
     */
    constructor() {
        let lastTime = 0;
        const vendors = ['ms', 'moz', 'webkit', 'o'];
        for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = (window as any)[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = (window as any)[vendors[x] + 'CancelAnimationFrame']
                                        || (window as any)[vendors[x] + 'RequestCancelAnimationFrame'];
        }

        if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
            (window as any).requestAnimationFrame = (callback: any, element: any) => {
                const currTime = new Date().getTime();
                const timeToCall = Math.max(0, 16 - (currTime - lastTime));
                const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = (id) => clearTimeout(id);
        }
    }
    /**
     * save a link of a function with binded context
     * @param taskLink
     */
    public add(taskLink: any) {
        this.tasks.push(taskLink);
        this.processIteration();
    }

    /**
     * If the previous requestAnimationFrame's callback is finished
     * then start to execute the new portion of tasks
     */
    public processIteration() {
        if (this.isRAF) { return; }
        this.isRAF = true;
        requestAnimationFrame(this.processEvents.bind(this));
    }

    /**
     * Exec task by task while the time from the begining of an execution of the current
     * requestAnimationFrame's callback is not exceed 4ms
     * @param start
     */
    public processEvents(start: number) {
        let end;
        let task;
        do {
            task = this.tasks.shift();
            task();
            end = performance.now();
        } while (this.tasks.length > 0 && end - start < 3);
        this.isRAF = false;
        if (this.tasks.length > 0) {
            this.processIteration();
        }
    }
}

export const processQueue = new ProcessQueue();

/**
 * Make a QueuePlugin a global-level Vue method
 * @param Vue
 * @param options
 */
export function QueuePlugin(Vue: typeof _Vue, options?: any): void {
      Vue.prototype.$queue = processQueue;
}
