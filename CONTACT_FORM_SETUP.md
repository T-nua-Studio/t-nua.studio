# Contact Form Integration Options

## Option 1: Formspree (Recommended - Free)

1. Go to [Formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint URL
5. Update the form action in `index.html`:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="hidden" name="_subject" value="New contact from T-NUA Studio website">
    <input type="hidden" name="_next" value="https://www.t-nua.studio/thank-you.html">
    <!-- rest of your form fields -->
</form>
```

## Option 2: Netlify Forms (If hosting on Netlify)

Add `netlify` attribute to your form:

```html
<form class="contact-form" netlify>
    <input type="hidden" name="form-name" value="contact">
    <!-- rest of your form fields -->
</form>
```

## Option 3: EmailJS (Client-side)

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Add their JavaScript library
3. Configure email templates
4. Update the JavaScript to use EmailJS API

## Option 4: Custom Backend

For more control, you can create a simple backend using:
- Node.js + Express
- Python + Flask
- PHP
- Serverless functions (Vercel, Netlify Functions)

## Recommended: Formspree Setup

Here's the updated form code for Formspree:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="hidden" name="_subject" value="New inquiry from T-NUA Studio">
    <div class="form-group">
        <input type="text" name="name" placeholder="Your Name" required>
    </div>
    <div class="form-group">
        <input type="email" name="email" placeholder="Your Email" required>
    </div>
    <div class="form-group">
        <input type="text" name="project_type" placeholder="Project Type">
    </div>
    <div class="form-group">
        <textarea name="message" placeholder="Tell us about your project" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

This will send emails directly to your inbox without any backend setup!
