type EventsMap = {
  "quiz-created-click": { id: string };
  "quiz-edit-click": { id: string };
  "quiz-deleted-click": { id: string };
  "quiz-open-click": { id: string };
  "add-question-click": { id: string };
  "edit-question-click": { id: string };
  "delete-question-click": { id: string };
};

type EventCallback<T> = (data: T) => void;

export class TypedEventEmitter<E extends Record<string, unknown>> {
  private events: {
    [K in keyof E]?: EventCallback<E[K]>[];
  } = {};

  emit<K extends keyof E>(eventName: K, data: E[K]): void {
    const listeners = this.events[eventName];
    if (!listeners) return;

    [...listeners].forEach((fn) => fn(data));
  }

  subscribe<K extends keyof E>(
    eventName: K,
    fn: EventCallback<E[K]>,
  ): () => void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName]!.push(fn);

    return () => {
      this.events[eventName] = this.events[eventName]!.filter(
        (eventFn) => eventFn !== fn,
      );
    };
  }
}

export const emitter = new TypedEventEmitter<EventsMap>();
