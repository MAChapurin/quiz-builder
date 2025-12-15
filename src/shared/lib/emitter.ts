type EventsMap = {
  "quiz-created-click": { id: string };
  "quiz-edit-click": { id: string };
  "quiz-deleted-click": { id: string };
  "quiz-open-click": { id: string };
  "add-question-click": { id: string };
  "edit-question-click": { id: string };
  "delete-question-click": { id: string };
  "quiz-practice-click": { id: string };
  "invite-token-click": { id: string };
  "attempt-filter-reset": void;
};

type EventCallback<T> = T extends void ? () => void : (data: T) => void;

export class TypedEventEmitter<E extends Record<string, unknown>> {
  private events: {
    [K in keyof E]?: EventCallback<E[K]>[];
  } = {};

  emit<K extends keyof E>(eventName: K): E[K] extends void ? void : never;
  emit<K extends keyof E>(eventName: K, data: E[K]): void;
  emit<K extends keyof E>(eventName: K, data?: E[K]): void {
    const listeners = this.events[eventName];
    if (!listeners) return;

    listeners.forEach((fn) => {
      if (data === undefined) {
        (fn as () => void)();
      } else {
        (fn as (payload: E[K]) => void)(data);
      }
    });
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
