# TechVerse by Sher - Portfolio Website

This is a modern personal portfolio website for Sher Rahman. It presents services, skills, projects, contact details, and hiring options in a responsive single-page layout built with HTML, CSS, and JavaScript.

## Live Preview

- Portfolio: https://sherwarfare0513.github.io/portfolio/

## Project Overview

The website is designed to showcase Sher Rahman's work as a Full Stack Web Developer and Digital Solutions Specialist. It includes a professional hero section, service cards, animated skill progress bars, project showcase, about section, contact section, and interactive modals for hiring and viewing project links.

## Main Features

- Responsive single-page portfolio layout
- Sticky navigation bar with mobile hamburger menu
- React-powered navbar rendering with static fallback
- Smooth scrolling between sections
- Animated hero section and staged reveal effects
- Services section for development, SEO, design, database, video editing, and software solutions
- Skills section with animated progress bars
- Project showcase with linked work references
- About section with highlights and stats
- Contact section with email, phone, social links, and contact form UI
- `Hire Me` modal with two options:
  - Direct email sending through `FormSubmit`
  - WhatsApp chat opening with prefilled project details
- `View My Work` modal with quick project links
- Scroll-to-top button
- Newsletter subscription UI feedback

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- React 18 UMD build for the navbar
- Font Awesome for icons
- FormSubmit for static-form email delivery

## Website Sections

- `Home`
- `Services`
- `Skills`
- `Projects`
- `About`
- `Contact`
- Footer with quick links, social links, and newsletter box

## File Structure

```text
portfolio/
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
`-- .github/
    `-- copilot-instructions.md
```

## How To Run Locally

Because this is a static website, no build step is required.

1. Clone or download the repository.
2. Open the project folder.
3. Run `index.html` directly in your browser.

You can also use a local server for a better development experience. Example:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Customization Guide

You can easily personalize the website by editing these files:

### `index.html`

Update:

- Name, title, and hero text
- Services content
- Skills labels and percentages
- Project cards
- About section text and stats
- Contact details
- Social media links
- Footer content

### `styles.css`

Update:

- Color palette
- Layout spacing
- Typography
- Card styling
- Button styles
- Modal styles
- Responsive behavior
- Animation appearance

### `script.js`

Update:

- Navbar behavior
- Scroll animations
- Progress bar animations
- Hire modal logic
- Work links modal logic
- Newsletter interaction
- Email and WhatsApp hire flow

## Hire Form Behavior

The `Hire Me` modal supports two methods:

### Email Direct

- Uses `https://formsubmit.co/ajax/sherwarfare0513@gmail.com`
- Sends the submitted project request to `sherwarfare0513@gmail.com`
- If direct sending fails, it falls back to opening the user's email app with a `mailto:` link

### WhatsApp

- Opens a WhatsApp chat using `wa.me`
- Prefills the message with the user's name, email, project title, and project details
- Requires the user to manually send the message inside WhatsApp

## External Dependencies

The project loads some resources from CDNs and external services:

- Font Awesome CDN
- React CDN
- ReactDOM CDN
- Unsplash hosted images
- FormSubmit email service
- WhatsApp link handling

An internet connection is needed for those external resources to work properly.

## Deployment

This project is suitable for static hosting platforms such as:

- GitHub Pages
- Netlify
- Vercel
- Any standard shared hosting with static file support

For GitHub Pages, upload the project and publish the repository root containing `index.html`.

## Important Notes

- The contact form shown in the contact section is currently UI-only and does not submit to a backend
- The hire form is the working lead-capture flow
- Some images are loaded from external URLs, so they depend on network access
- The navbar uses React from CDN, but the site does not require a bundler or framework setup

## Best For

This portfolio template is useful for:

- Web developers
- Freelancers
- Designers
- Digital marketers
- Software service providers
- Personal branding websites

## Future Improvements

- Connect the main contact form to email or backend storage
- Replace external images with local optimized assets
- Add project detail pages
- Improve SEO with Open Graph and structured metadata
- Add form validation messages in the UI
- Add dark mode if needed
- Add analytics and performance tracking

## Author

Sher Rahman

- GitHub: https://github.com/sherwarfare0513
- Instagram: https://www.instagram.com/sherwarfare
- LinkedIn: https://www.linkedin.com/in/sher-rahman-9a8232381

## License

This project is available for personal use and customization. Add your preferred license if you want to make usage terms explicit.
