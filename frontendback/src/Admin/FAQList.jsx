import React, { useState } from 'react';
import FAQItem from './FAQItem';

function FAQList({ faqs }) {
    const [visibleIndexes, setVisibleIndexes] = useState(Array(faqs.length).fill(false));

    const toggleVisibility = (index) => {
        const updatedIndexes = [...visibleIndexes];
        updatedIndexes[index] = !updatedIndexes[index];
        setVisibleIndexes(updatedIndexes);
    };

    return (
        <div className="faq-list">
            {faqs.map((faq, index) => (
                <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isVisible={visibleIndexes[index]}
                    toggleVisibility={() => toggleVisibility(index)}
                />
            ))}
        </div>
    );
}

export default FAQList;