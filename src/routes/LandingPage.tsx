// src/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const dataStructures = [
        { name: 'Stacks', icon: '📚', link: "/stacks" },
        { name: 'Queues', icon: '🚶‍♂️', link: "/queues" },
        { name: 'Trees (BST)', icon: '🌳', link: "/trees" },
        { name: 'Graphs', icon: '📊', link: "/graphs" },
    ];

    return (
        <div className='home'>
            {/* Header Section */}
            <header>
                <h1>DSA Sandbox</h1>
                <p>Explore and visualize various data structures</p>
            </header>

            {/* Main Section */}
            <main>
                {/* Reason for the site */}
                <section>
                    <h2>Why DSA Sandbox?</h2>
                    <p>
                        DSA Sandbox is a humble initiative designed to provide a simple and interactive space for beginners to grasp the concepts of Data Structures and Algorithms (DSA). In this age where visualizing complex ideas is crucial, DSA Sandbox offers a straightforward platform to explore various data structures in an intuitive manner.                    </p>
                    <p>
                        As a solo developer behind this project, I've created DSA Sandbox to serve as a helpful tool for those looking to understand data structures through simple representations on a canvas. I welcome contributions from fellow developers to enhance and expand this resource. Feel free to explore the GitHub repository and join me in building a more comprehensive and inclusive educational tool for DSA. Together, we can make learning these concepts accessible to all.
                    </p>
                </section>

                {/* Available Data Structures */}
                <section>
                    <h2>Available Data Structures</h2>
                    <div className="icon-container">
                        {dataStructures.map((structure, index) => (
                            <Link to={structure.link} key={index}>
                                <div className="icon">
                                    {structure.icon} {structure.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer Section */}
            <footer>
                {/* Creator's Socials */}
                <div className="socials">
                    <a href="https://twitter.com/m13ha_" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href="https://github.com/m13ha" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://m13ha.hashnode.dev/" target="_blank" rel="noopener noreferrer">
                        Blog
                    </a>
                    <a href="https://www.linkedin.com/in/m13ha/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    {/* Add more social links as needed */}
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
