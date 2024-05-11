// eslint-disable-next-line no-unused-vars
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-sm">Hansraj Singh Tomar, Frontend developer more than 1 year of experience.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm">Indore,  Madhya Pradesh</p>
                        <p className="text-sm">Phone: +91 8085649497</p>
                        <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" target='_blank' className="text-sm hover:text-indigo-600 hover:underline">Email: tomarhansraj033@gmail.com</a>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                        <ul className="flex space-x-4">
                            <li><a href="https://github.com/Hansraj-singh-tomar" target='_blank' className="text-sm hover:text-indigo-600 hover:underline">Github</a></li>
                            <li><a href="https://www.linkedin.com/in/hansraj-singh-tomar/" target='_blank' className="text-sm hover:text-indigo-600 hover:underline">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Other Projects</h3>
                        <a href="https://we-tube-sigma.vercel.app/" className='block cursor-pointer hover:text-indigo-600 hover:underline' target='_blank'>YouTube Clone</a>
                        <a href="https://brand-e-commercee.netlify.app/" className='block cursor-pointer hover:text-indigo-600 hover:underline' target='_blank'>E-Commerce</a>
                        <a href="https://sketchbook-orpin.vercel.app/" className='block cursor-pointer hover:text-indigo-600 hover:underline' target='_blank'>Sketchbook</a>
                    </div>
                </div>
                <div className="mt-8 text-sm text-center">
                    <p>&copy; 2023 Blog App. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
