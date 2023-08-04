import _ from "lodash"

const UNSUBSCRIBE_ID_SYMBOL = Symbol('UNSUBSCRIBE_ID_SYMBOL')

export interface ISubscriber<Payload = any> {
  (payload: Payload): void | boolean
}

export class Subscribable<ExtendsType = any> {
  private subscribers: {
    index?: number
    [key: number]: ISubscriber
  } = {
    index: 0,
  }

  dispatch<T extends ExtendsType = any>(event: T, context?: any) {
    let interrupted = false
    for (const key in this.subscribers) {
      if (_.isFunction(this.subscribers[key])) {
        // event['context'] = context
        _.set(event!,'content',context)
        if (this.subscribers[key](event) === false) {
          interrupted = true
        }
      }
    }
    return interrupted ? false : true
  }

  subscribe(subscriber: ISubscriber) {
    let id: number
    if (_.isFunction(subscriber)) {
      id = this.subscribers.index! + 1
      this.subscribers[id] = subscriber
      this.subscribers.index!++
    }

    const unsubscribe = () => {
      this.unsubscribe(id)
    }

    // unsubscribe[UNSUBSCRIBE_ID_SYMBOL] = id
    _.set(unsubscribe,UNSUBSCRIBE_ID_SYMBOL,id!)

    return unsubscribe
  }

  unsubscribe = (id?: number | string | (() => void)) => {
    if (id === undefined || id === null) {
      for (const key in this.subscribers) {
        this.unsubscribe(key)
      }
      return
    }
    if (!_.isFunction(id)) {
      // @ts-ignore
      delete this.subscribers[id]
    } else {
      // @ts-ignore
      delete this.subscribers[id[UNSUBSCRIBE_ID_SYMBOL]]
    }
  }
}
