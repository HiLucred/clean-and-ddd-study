import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { Entity } from './entity'

export class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  protected clearEvents() {
    this._domainEvents = []
  }
}
