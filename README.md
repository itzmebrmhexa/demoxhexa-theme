# 🔴 DEMO X HEXA Theme for Pterodactyl Panel

![Version](https://img.shields.io/badge/version-1.0-red.svg)
![License](https://img.shields.io/badge/license-MIT-red.svg)
![Pterodactyl](https://img.shields.io/badge/pterodactyl-v1.x-red.svg)

> **A stunning cyberpunk hacker-themed modification for Pterodactyl Panel with 100+ animations, custom icons, and an immersive red/black aesthetic.**

Created by **[itzmebrmhexa](https://github.com/itzmebrmhexa)** 🚀

---

## 📸 Features

### 🎨 Visual Design
- **Red/Black Hacker Aesthetic** - Deep blacks (#000000, #0a0a0a, #1a1a1a) with vibrant red accents (#FF0000, #DC143C, #8B0000)
- **Cyberpunk Style** - Glitch effects, circuit patterns, matrix elements, and holographic accents
- **100+ CSS Animations** - Entrance animations, hover effects, loading states, glitch effects, and more
- **Custom Login Page** - Beautiful cyber-themed login with animated elements
- **Holographic Borders** - Animated gradient borders on cards and panels
- **Matrix Rain Background** - Falling code effect in the background
- **Particle System** - Interconnected floating particles
- **Scanline Effect** - Retro CRT monitor scanlines

### 🚀 Technical Features
- **Direct Theme Modification** - Integrates directly into Pterodactyl for maximum control
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Custom Icons** - 100+ Font Awesome Pro icon mappings with cyber theme
- **Tailwind CSS Extensions** - Custom color palette and utility classes
- **Performance Optimized** - Smooth 60fps animations
- **Easy Installation** - Automated bash script installer
- **Safe Uninstall** - Automatic backup and restore functionality

### ✨ Interactive Effects
- **Neon Glow Effects** - Pulsing neon lights on interactive elements
- **Button Ripples** - Material design-inspired ripple effects
- **Typing Animations** - Typewriter effect for text
- **Hover Transformations** - Smooth transitions on hover
- **Corner Decorations** - Cyber-style corner brackets on cards
- **Data Streams** - Animated data flow lines
- **Glitch Overlays** - Random glitch effects on elements

---

## 📋 Requirements

Before installing Demo X Hexa, ensure you have:

- ✅ Pterodactyl Panel v1.x installed
- ✅ Root or sudo access to your server
- ✅ Node.js (v16+) and npm/yarn
- ✅ Git
- ✅ PHP 8.0+ (already required by Pterodactyl)

---

## 🚀 Installation

### Step 1: Download the Theme

```bash
# Clone or download this repository
cd /tmp
git clone https://github.com/itzmebrmhexa/demoxhexa-theme.git
cd demoxhexa-theme

# Or if you have a ZIP file:
unzip demoxhexa-theme.zip
cd demoxhexa-theme
```

### Step 2: Run the Installer

```bash
# Make the installer executable
chmod +x install-demoxhexa.sh

# Run the installer with sudo
sudo bash install-demoxhexa.sh
```

### Step 3: Follow the Prompts

The installer will:
1. ✅ Check your system requirements
2. ✅ Verify Pterodactyl installation
3. ✅ Create automatic backups
4. ✅ Install theme files
5. ✅ Patch application entry points
6. ✅ Build production assets
7. ✅ Clear caches

### Step 4: Clear Browser Cache

After installation:
1. Press `Ctrl + Shift + Delete` (or `Cmd + Shift + Delete` on Mac)
2. Clear your browser cache
3. Reload your Pterodactyl panel

---

## 📁 File Structure

```
demoxhexa-theme/
├── resources/
│   ├── scripts/
│   │   ├── demoxhexa-theme.css       # Main CSS theme (100+ animations)
│   │   ├── cyber-effects.js          # JavaScript effects
│   │   ├── icon-mapping.js           # Font Awesome icon mappings
│   │   └── assets/
│   │       └── icons/
│   │           └── demoxhexa-logo.svg # Custom animated logo
│   └── views/
│       └── auth/
│           └── login.blade.php       # Custom login page
├── install-demoxhexa.sh              # Automated installer
├── uninstall-demoxhexa.sh            # Automated uninstaller
├── tailwind.config.extension.js      # Tailwind config additions
└── README.md                         # This file
```

---

## 🎨 Customization

### Changing Colors

Edit `resources/scripts/demoxhexa-theme.css` and modify the CSS variables:

```css
:root {
  /* Change these values to your preferred colors */
  --cyber-red-primary: #FF0000;      /* Main red color */
  --cyber-red-secondary: #DC143C;    /* Secondary red */
  --cyber-red-dark: #8B0000;         /* Dark red */
  
  --cyber-black-primary: #000000;    /* Pure black background */
  --cyber-black-secondary: #0a0a0a;  /* Slightly lighter black */
}
```

### Disabling Effects

Edit `resources/scripts/cyber-effects.js` configuration:

```javascript
const CONFIG = {
  matrixRain: { enabled: true },      // Matrix rain effect
  particles: { enabled: true },       // Particle system
  glitchEffects: { enabled: true },   // Random glitches
  hexBackground: { enabled: true },   // Floating hexagons
  scanline: { enabled: true },        // Scanline effect
};
```

### Adding Font Awesome Pro

If you have Font Awesome Pro, add your kit code to the main layout:

**Edit:** `/var/www/pterodactyl/resources/views/templates/wrapper.blade.php`

```html
<head>
    <!-- Add your Font Awesome Pro kit -->
    <script src="https://kit.fontawesome.com/YOUR_KIT_CODE.js" crossorigin="anonymous"></script>
</head>
```

---

## 🔧 Troubleshooting

### Theme Not Showing After Installation

1. **Clear browser cache completely**
   ```
   Ctrl + Shift + Delete → Clear All Data
   ```

2. **Rebuild assets manually**
   ```bash
   cd /var/www/pterodactyl
   yarn build:production
   # or
   npm run build
   ```

3. **Clear Laravel cache**
   ```bash
   cd /var/www/pterodactyl
   php artisan view:clear
   php artisan config:clear
   php artisan cache:clear
   ```

### Installation Fails

1. **Check permissions**
   ```bash
   sudo chown -R www-data:www-data /var/www/pterodactyl
   # or for nginx
   sudo chown -R nginx:nginx /var/www/pterodactyl
   ```

2. **Check Node.js version**
   ```bash
   node --version  # Should be v16 or higher
   ```

3. **Check installation log**
   ```bash
   cat install-demoxhexa-*.log
   ```

### Login Page Shows Errors

1. **Restore backup**
   ```bash
   sudo bash uninstall-demoxhexa.sh --list-backups
   sudo bash uninstall-demoxhexa.sh --restore backup-XXXXXX
   ```

2. **Verify Blade syntax**
   Check `/var/www/pterodactyl/resources/views/auth/login.blade.php` for syntax errors

### Animations Too Intense

Reduce animation intensity by editing `cyber-effects.js`:

```javascript
// Reduce particle count
particles: { count: 50 },  // Default is 100

// Reduce matrix rain columns
matrixRain: { columns: 25 },  // Default is 50

// Increase glitch frequency (less frequent)
glitchEffects: { frequency: 10000 },  // Default is 5000ms
```

---

## 🗑️ Uninstallation

### Complete Removal

```bash
cd demoxhexa-theme
sudo bash uninstall-demoxhexa.sh
```

The uninstaller will:
- ❌ Remove all theme files
- ❌ Restore original files from backup
- ❌ Rebuild assets
- ❌ Clear caches

### Restore Specific Backup

```bash
# List available backups
sudo bash uninstall-demoxhexa.sh --list-backups

# Restore specific backup
sudo bash uninstall-demoxhexa.sh --restore backup-20240101_120000
```

### Manual Removal

If the uninstaller fails:

```bash
cd /var/www/pterodactyl

# Remove theme files
rm -f resources/scripts/demoxhexa-theme.css
rm -f resources/scripts/cyber-effects.js
rm -f resources/scripts/icon-mapping.js
rm -f resources/scripts/assets/icons/demoxhexa-logo.svg
rm -f public/assets/demoxhexa-logo.svg
rm -f tailwind.config.extension.js

# Remove imports from index.tsx/index.ts
# Edit the file and remove lines containing:
# - demoxhexa-theme.css
# - cyber-effects.js
# - icon-mapping.js

# Rebuild
yarn build:production
php artisan view:clear
php artisan cache:clear
```

---

## 📚 Animation Classes

Demo X Hexa includes 100+ animation classes you can use:

### Entrance Animations
```html
<div class="fade-in">Fades in</div>
<div class="fade-in-up">Fades in from bottom</div>
<div class="fade-in-down">Fades in from top</div>
<div class="slide-in-left">Slides in from left</div>
<div class="zoom-in">Zooms in</div>
<div class="bounce-in">Bounces in</div>
```

### Continuous Animations
```html
<div class="neon-pulse">Pulsing neon glow</div>
<div class="glitch-effect">Glitch effect</div>
<div class="rotate-continuous">Continuous rotation</div>
<div class="bounce">Bouncing animation</div>
<div class="pulse">Pulsing opacity</div>
```

### Hover Effects
```html
<button class="hover-glow">Glows on hover</button>
<button class="hover-lift">Lifts on hover</button>
<button class="glitch-on-hover">Glitches on hover</button>
```

### Special Effects
```html
<div class="holographic-border">Holographic border</div>
<div class="matrix-rain">Matrix rain effect</div>
<div class="data-stream">Data stream animation</div>
```

---

## 🎯 Use Cases

Perfect for:
- 🎮 **Gaming Server Panels** - Matches gaming/tech aesthetic
- 🔐 **Private Servers** - Professional hacker look
- 💻 **Development Environments** - Cyberpunk coding vibe
- 🚀 **Tech Communities** - Modern and eye-catching
- 🎨 **Portfolio Showcases** - Unique visual identity

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🐛 **Report Bugs** - Open an issue with details
2. 💡 **Suggest Features** - Share your ideas
3. 🔧 **Submit Pull Requests** - Fix bugs or add features
4. 📖 **Improve Documentation** - Help others understand
5. ⭐ **Star the Repo** - Show your support

---

## 📝 License

This theme is released under the **MIT License**.

```
MIT License

Copyright (c) 2024 itzmebrmhexa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Credits

- **Created by:** [itzmebrmhexa](https://github.com/itzmebrmhexa)
- **For:** Pterodactyl Panel
- **Inspired by:** Cyberpunk aesthetics, hacker culture, and neon-lit futures
- **Icons:** Font Awesome (Pro recommended)
- **Fonts:** Share Tech Mono, Courier New

---

## 📞 Support

Need help? Here's how to get support:

- 📧 **GitHub Issues:** [Open an issue](https://github.com/itzmebrmhexa/demoxhexa-theme/issues)
- 💬 **Discord:** Join Pterodactyl Discord and mention Demo X Hexa
- 📖 **Documentation:** Read this README thoroughly
- 🔍 **Search:** Check existing issues first

---

## 🔮 Roadmap

Planned features for future versions:

- [ ] Dark/Light mode toggle
- [ ] Multiple color schemes (blue, green, purple)
- [ ] Additional page templates
- [ ] Admin panel theme extension
- [ ] Custom dashboard widgets
- [ ] Sound effects (optional)
- [ ] More animation presets
- [ ] Theme customizer UI

---

## ⚠️ Disclaimer

This theme modifies your Pterodactyl Panel's appearance and some functionality. While thoroughly tested, use at your own risk. Always:

- ✅ Backup your panel before installation
- ✅ Test on a staging environment first
- ✅ Keep backups of original files
- ✅ Read the documentation completely

**Not affiliated with Pterodactyl Software.** This is an independent theme modification.

---

## 🌟 Showcase

Using Demo X Hexa on your panel? Share a screenshot!

Tweet with `#DemoXHexa` and tag `@itzmebrmhexa` to be featured here.

---

## 📊 Stats

- **CSS Lines:** ~3000+
- **Animations:** 100+
- **Color Variables:** 20+
- **Icon Mappings:** 100+
- **Installation Time:** ~5 minutes
- **Supported Pterodactyl:** v1.x

---

<div align="center">

## ❤️ Made with passion for the Pterodactyl community

### If you love this theme, give it a ⭐!

**[⬆ Back to Top](#-demo-x-hexa-theme-for-pterodactyl-panel)**

---

**Demo X Hexa v1.0** | Created by **itzmebrmhexa** | © 2024

🔴 Hack the Planet 🔴

</div>
