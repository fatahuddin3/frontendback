import React from 'react';

function FAQItem({ question, answer, isVisible, toggleVisibility }) {
    return (
        <div className="faq-item">
            <div className="question" onClick={toggleVisibility}>
                {question}
            </div>
            {isVisible && <div className="answer">{answer}</div>}
        </div>
    );
}
export default FAQItem;