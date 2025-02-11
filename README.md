# CTA Block for WordPress

A customizable Call-to-Action block for WordPress Gutenberg editor. This block provides an elegant way to create compelling call-to-action sections with customizable content, styling, and hover effects.

## Features

- Full-width and wide-width alignment support
- Customizable background colors and gradients
- Custom button hover effects
- Responsive layout with three-column structure
- Built-in spacing controls
- Pre-configured template with:
  - Centered content layout
  - Customizable heading and paragraph
  - Stylized button with hover effects
  - Adjustable spacer blocks

## Installation

### Option 1: Composer (Recommended)

1. Add the repository to your `composer.json`:
```json
{
    "require": {
        "imagewize/cta-block": "^0.1.0"
    }
}
```

2. Install via Composer:
```bash
composer require imagewize/cta-block
```

### Option 2: Manual Installation

1. Copy the plugin files to your `/wp-content/mu-plugins/cta-block` directory
2. The block will be automatically loaded as it's in the mu-plugins directory
3. The CTA Block will appear in the block inserter under the 'Text' category

## Development Setup

### Prerequisites

- Node.js and npm installed
- WordPress development environment
- `@wordpress/scripts` package

### Getting Started

1. Clone the repository
2. Install dependencies:
