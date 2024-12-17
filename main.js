// Import Particles component
const { useState, useEffect, useRef } = React;

// React Components
const PlanCard = ({ plan }) => {
    return React.createElement('div', { className: 'plan' },
        React.createElement('h3', null, plan.name),
        React.createElement('p', { className: 'price' }, `₹${plan.price}/month`),
        React.createElement('ul', null,
            React.createElement('li', null, `CPU: ${plan.cpu}%`),
            React.createElement('li', null, `RAM: ${plan.ram}GB`),
            React.createElement('li', null, `SSD: ${plan.ssd}GB`)
        ),
        React.createElement('a', {
            href: 'https://discord.gg/hrhosting',
            target: '_blank',
            className: 'plan-button'
        }, 'Buy Now')
    );
};

const MessagePopup = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return React.createElement('div', { 
        className: `message-popup ${isVisible ? 'show' : ''}`,
        id: 'messagePopup'
    },
        React.createElement('span', {
            className: 'close-popup',
            onClick: onClose
        }, React.createElement('i', { className: 'fas fa-times' })),
        React.createElement('h3', null, 'Message Sent!'),
        React.createElement('p', null, message)
    );
};

const ContactForm = () => {
    const [formState, setFormState] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [showPopup, setShowPopup] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendEmail(formState);
            setShowPopup(true);
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setShowPopup(false), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return React.createElement('div', null,
        React.createElement('form', {
            id: 'contactForm',
            onSubmit: handleSubmit
        },
            React.createElement('input', {
                type: 'text',
                name: 'name',
                placeholder: 'Name',
                required: true,
                value: formState.name,
                onChange: handleChange
            }),
            React.createElement('input', {
                type: 'email',
                name: 'email',
                placeholder: 'Email',
                required: true,
                value: formState.email,
                onChange: handleChange
            }),
            React.createElement('textarea', {
                name: 'message',
                placeholder: 'Message',
                required: true,
                value: formState.message,
                onChange: handleChange
            }),
            React.createElement('button', {
                type: 'submit',
                id: 'sendMessage'
            }, 'Send Message')
        ),
        React.createElement(MessagePopup, {
            isVisible: showPopup,
            message: 'Thank you for contacting us. We\'ll get back to you soon!',
            onClose: () => setShowPopup(false)
        })
    );
};

// Plans data
const plans = [
    { name: 'Starter Plan', price: 99, cpu: 100, ram: 2, ssd: 10 },
    { name: 'Basic Plan', price: 149, cpu: 100, ram: 4, ssd: 20 },
    { name: 'Better Plan', price: 219, cpu: 200, ram: 6, ssd: 30 },
    { name: 'Standard Plan', price: 279, cpu: 300, ram: 8, ssd: 40 },
    { name: 'Premium Plan', price: 359, cpu: 400, ram: 12, ssd: 50 },
    { name: 'Legendary Plan', price: 429, cpu: 500, ram: 16, ssd: 80 }
];

// Render React components
document.addEventListener('DOMContentLoaded', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.prepend(root);

    ReactDOM.render(
        React.createElement(App),
        root
    );

    // Render plans
    const planContainer = document.querySelector('.plan-container');
    if (planContainer) {
        ReactDOM.render(
            plans.map(plan => React.createElement(PlanCard, { key: plan.name, plan })),
            planContainer
        );
    }

    // Render contact form
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        ReactDOM.render(
            React.createElement(ContactForm),
            contactSection
        );
    }

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleText = themeToggle.querySelector('.theme-toggle-text');
    
    // Function to toggle theme
    const toggleTheme = () => {
        const isLightMode = document.body.classList.toggle('light-mode');
        themeToggleText.textContent = isLightMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    };
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggleText.textContent = '☀️';
    }

    themeToggle.addEventListener('click', toggleTheme);
});

// Smooth scrolling and other existing functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Email sending function
async function sendEmail(data) {
    try {
        const templateParams = {
            to_email: 'hr.hosting24@gmail.com',
            from_name: data.name,
            from_email: data.email,
            message: data.message
        };

        await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            templateParams
        );
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}

// View Plans button smooth scroll
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    const plansSection = document.getElementById('plans');
    plansSection.scrollIntoView({ behavior: 'smooth' });
});

// Motion blur on scroll
let scrollTimeout;
const mainContent = document.querySelector('main');
mainContent.classList.add('motion-blur');

window.addEventListener('scroll', () => {
    if (!mainContent.classList.contains('scrolling')) {
        mainContent.classList.add('scrolling');
    }
    
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        mainContent.classList.remove('scrolling');
    }, 150);
});

// React Components
const App = () => {
    return React.createElement(
        'div',
        null,
        React.createElement(Particles),
        React.createElement('div', { className: 'content' },
            // Your existing content
        )
    );
};
