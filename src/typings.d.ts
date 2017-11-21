/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* Firebase module definition */
declare module firebase {
    interface Query {
        orderByKey?: boolean
        orderByChild?: string
        orderByValue?: string
        equalTo?: any
        startAt?: string
        endAt?: string
        limitToFirst?: number
        limitToLast?: number
    }
}
