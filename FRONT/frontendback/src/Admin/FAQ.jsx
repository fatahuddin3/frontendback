import React from 'react';
import FAQList from './FAQList';

function FAQ() {
    const faqs = [
        {
            question: "Do the rooms at Sheraton Dhaka have a work space?",
            answer: "Yes, rooms at Sheraton Dhaka have a desk for working."
        },
        {
            question: "What is the largest occupancy room offered at Sheraton Dhaka?",
            answer: "The largest occupancy room at Sheraton Dhaka is the Podium Twin with a maximum occupancy of 3."
        },
        {
            question: "Are rollaway beds permitted in any of the rooms at Sheraton Dhaka?",
            answer: "Yes, all rooms at Sheraton Dhaka permit rollaway beds. Please see room-specific information for policy and pricing details."
        },
        {
            question: "Do the rooms at Sheraton Dhaka have fridges?",
            answer: "Yes, rooms at Sheraton Dhaka have a Mini fridge."
        },
        {
            question: "Do the rooms at Sheraton Dhaka have coffee/tea makers?",
            answer: "Yes, rooms at Sheraton Dhaka have coffee/tea makers."
        },
        {
            question: "Do the rooms at Sheraton Dhaka have hair dryers?",
            answer: "Yes, rooms at Sheraton Dhaka have hair dryers."
        }
        ,
    ];

    return (
        <div className="App">
            <h1>Sheraton Dhaka FAQ</h1>
            <FAQList faqs={faqs} />
        </div>
    );
}
export default FAQ;
