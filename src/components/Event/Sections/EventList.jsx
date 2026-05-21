// src/components/Event/Sections/EventList.jsx
import { EVENT_DATA } from '../../../data/EventData';
import EventCard from '../../UI/Card/EventCard';
import FadeIn from '../../UI/FadeIn';

export default function EventList() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENT_DATA.map((event, i) => (
                <FadeIn key={event.id} delay={i * 0.1}>
                    <EventCard event={event} />
                </FadeIn>
            ))}
        </section>
    );
}