# 🚀 Quick Installation Guide

## Prerequisites

- ✅ Pterodactyl Panel v1.x installed
- ✅ Root/sudo access
- ✅ Node.js v16+ and npm/yarn
- ✅ Git

## Installation Steps

### 1. Download Theme

```bash
cd /tmp
wget https://github.com/itzmebrmhexa/demoxhexa-theme/archive/main.zip
unzip main.zip
cd demoxhexa-theme-main
```

Or clone:

```bash
git clone https://github.com/itzmebrmhexa/demoxhexa-theme.git
cd demoxhexa-theme
```

### 2. Run Installer

```bash
chmod +x install-demoxhexa.sh
sudo bash install-demoxhexa.sh
```

### 3. Clear Browser Cache

Press `Ctrl + Shift + Delete` and clear all cache.

### 4. Reload Panel

Visit your Pterodactyl panel and enjoy! 🎉

---

## Uninstallation

```bash
sudo bash uninstall-demoxhexa.sh
```

---

## Troubleshooting

### Theme not showing?

1. Clear browser cache completely
2. Rebuild assets:
   ```bash
   cd /var/www/pterodactyl
   yarn build:production
   ```
3. Clear Laravel cache:
   ```bash
   php artisan view:clear
   php artisan cache:clear
   ```

### Installation failed?

Check the log file:
```bash
cat install-demoxhexa-*.log
```

### Need to restore backup?

```bash
sudo bash uninstall-demoxhexa.sh --list-backups
sudo bash uninstall-demoxhexa.sh --restore backup-XXXXXX
```

---

## Custom Pterodactyl Directory

If Pterodactyl is not in `/var/www/pterodactyl`, edit the installer:

```bash
nano install-demoxhexa.sh
# Change: PTERODACTYL_DIR="/var/www/pterodactyl"
# To your directory
```

---

## Manual Installation (Advanced)

If the automated installer doesn't work:

1. Copy theme files:
   ```bash
   cp resources/scripts/*.css /var/www/pterodactyl/resources/scripts/
   cp resources/scripts/*.js /var/www/pterodactyl/resources/scripts/
   cp resources/views/auth/login.blade.php /var/www/pterodactyl/resources/views/auth/
   ```

2. Add imports to `/var/www/pterodactyl/resources/scripts/index.tsx`:
   ```typescript
   import './demoxhexa-theme.css';
   import './cyber-effects.js';
   import './icon-mapping.js';
   ```

3. Build assets:
   ```bash
   cd /var/www/pterodactyl
   yarn build:production
   ```

4. Clear cache:
   ```bash
   php artisan view:clear
   php artisan cache:clear
   ```

---

## Support

- 📧 GitHub Issues: https://github.com/itzmebrmhexa/demoxhexa-theme/issues
- 📖 Full Documentation: See README.md

---

**Demo X Hexa v1.0** | Created by **itzmebrmhexa**
