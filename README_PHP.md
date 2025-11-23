# Salary Slip Generator - PHP/jQuery Version

This is the PHP and jQuery version of the Salary Slip Generator application.

## Requirements

- PHP 7.4 or higher
- A web server (Apache, Nginx, or PHP built-in server)
- Modern web browser with JavaScript enabled

## Installation

1. Place all files in your web server directory (e.g., `htdocs`, `www`, or `public_html`)

2. The file structure should be:
   ```
   your-project/
   ├── index.php
   ├── assets/
   │   └── js/
   │       └── app.js
   └── README_PHP.md
   ```

## Running the Application

### Option 1: Using PHP Built-in Server

```bash
php -S localhost:8000
```

Then open your browser and navigate to: `http://localhost:8000`

### Option 2: Using Apache/Nginx

1. Place files in your web server directory
2. Access via: `http://localhost/your-project-folder/`

## Features

- ✅ Real-time preview of salary slip
- ✅ Logo upload (client-side, no server upload needed)
- ✅ Automatic calculations (Income, Deductions, Net Salary)
- ✅ Indonesian currency formatting
- ✅ Number to words conversion (Terbilang)
- ✅ Export to PNG using html2canvas
- ✅ Responsive design with Tailwind CSS
- ✅ All data stored client-side (no database required)

## Usage

1. Fill in the company details (name, address, period)
2. Upload company logo (optional)
3. Enter employee information
4. Input salary components (income and deductions)
5. Add additional information (place and date)
6. Preview updates automatically
7. Click "Export PNG" to download the salary slip

## Technologies Used

- **PHP**: Server-side scripting (minimal, mainly for file structure)
- **jQuery**: DOM manipulation and event handling
- **Tailwind CSS**: Styling (via CDN)
- **html2canvas**: Export functionality
- **Font Awesome**: Icons

## Differences from React Version

- No build process required
- No npm/node_modules needed
- Simpler deployment (just copy files)
- Works with any PHP-enabled web server
- All logic in jQuery instead of React hooks

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Any modern browser with JavaScript enabled

## Notes

- All data is stored client-side (in browser memory)
- Logo uploads are handled client-side using FileReader API
- No server-side processing required for basic functionality
- Export functionality requires html2canvas library (loaded via CDN)

