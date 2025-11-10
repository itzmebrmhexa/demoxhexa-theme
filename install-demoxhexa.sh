#!/bin/bash

###############################################################################
#                                                                             #
#   ██████╗ ███████╗███╗   ███╗ ██████╗     ██╗  ██╗    ██╗  ██╗███████╗██╗  ██╗ █████╗     #
#   ██╔══██╗██╔════╝████╗ ████║██╔═══██╗    ╚██╗██╔╝    ██║  ██║██╔════╝╚██╗██╔╝██╔══██╗    #
#   ██║  ██║█████╗  ██╔████╔██║██║   ██║     ╚███╔╝     ███████║█████╗   ╚███╔╝ ███████║    #
#   ██║  ██║██╔══╝  ██║╚██╔╝██║██║   ██║     ██╔██╗     ██╔══██║██╔══╝   ██╔██╗ ██╔══██║    #
#   ██████╔╝███████╗██║ ╚═╝ ██║╚██████╔╝    ██╔╝ ██╗    ██║  ██║███████╗██╔╝ ██╗██║  ██║    #
#   ╚═════╝ ╚══════╝╚═╝     ╚═╝ ╚═════╝     ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    #
#                                                                             #
#                    DEMO X HEXA THEME INSTALLER v1.0                         #
#                   Cyberpunk Theme for Pterodactyl Panel                     #
#                        Created by: itzmebrmhexa                             #
#                                                                             #
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Script variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="/var/backups/pterodactyl-theme"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PTERODACTYL_DIR="/var/www/pterodactyl"
LOG_FILE="$SCRIPT_DIR/install-demoxhexa-${TIMESTAMP}.log"

# Theme files
THEME_CSS="resources/scripts/demoxhexa-theme.css"
THEME_JS="resources/scripts/cyber-effects.js"
ICON_MAP="resources/scripts/icon-mapping.js"
LOGO_SVG="resources/scripts/assets/icons/demoxhexa-logo.svg"
LOGIN_BLADE="resources/views/auth/login.blade.php"
TAILWIND_EXT="tailwind.config.extension.js"

###############################################################################
# Helper Functions
###############################################################################

print_banner() {
    clear
    echo -e "${RED}"
    cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                    DEMO X HEXA THEME INSTALLER                   ║
║              Cyberpunk Hacker Theme for Pterodactyl              ║
║                    Created by: itzmebrmhexa                      ║
╚══════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
}

log() {
    echo -e "$1" | tee -a "$LOG_FILE"
}

success() {
    log "${GREEN}[✓]${NC} $1"
}

error() {
    log "${RED}[✗]${NC} $1"
}

warning() {
    log "${YELLOW}[!]${NC} $1"
}

info() {
    log "${CYAN}[i]${NC} $1"
}

question() {
    echo -e "${MAGENTA}[?]${NC} $1"
}

divider() {
    echo -e "${BLUE}================================================================${NC}"
}

###############################################################################
# Validation Functions
###############################################################################

check_root() {
    if [[ $EUID -ne 0 ]]; then
        error "This script must be run as root or with sudo"
        exit 1
    fi
}

check_pterodactyl() {
    if [ ! -d "$PTERODACTYL_DIR" ]; then
        error "Pterodactyl installation not found at $PTERODACTYL_DIR"
        error "Please install Pterodactyl first or specify the correct path"
        exit 1
    fi
    
    if [ ! -f "$PTERODACTYL_DIR/artisan" ]; then
        error "Invalid Pterodactyl installation (artisan file not found)"
        exit 1
    fi
    
    success "Pterodactyl installation found"
}

check_dependencies() {
    local missing_deps=()
    
    for cmd in node npm yarn git; do
        if ! command -v $cmd &> /dev/null; then
            missing_deps+=("$cmd")
        fi
    done
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        error "Missing dependencies: ${missing_deps[*]}"
        error "Please install the missing dependencies first"
        exit 1
    fi
    
    success "All dependencies found"
}

check_theme_files() {
    local missing_files=()
    
    for file in "$THEME_CSS" "$THEME_JS" "$ICON_MAP" "$LOGO_SVG" "$LOGIN_BLADE"; do
        if [ ! -f "$SCRIPT_DIR/$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -ne 0 ]; then
        error "Missing theme files:"
        for file in "${missing_files[@]}"; do
            error "  - $file"
        done
        exit 1
    fi
    
    success "All theme files present"
}

###############################################################################
# Backup Functions
###############################################################################

create_backup() {
    info "Creating backup of existing files..."
    
    # Create backup directory
    mkdir -p "$BACKUP_DIR/backup-${TIMESTAMP}"
    
    # Backup files that will be modified
    if [ -f "$PTERODACTYL_DIR/$LOGIN_BLADE" ]; then
        cp -p "$PTERODACTYL_DIR/$LOGIN_BLADE" "$BACKUP_DIR/backup-${TIMESTAMP}/" 2>/dev/null || true
    fi
    
    if [ -f "$PTERODACTYL_DIR/tailwind.config.js" ]; then
        cp -p "$PTERODACTYL_DIR/tailwind.config.js" "$BACKUP_DIR/backup-${TIMESTAMP}/" 2>/dev/null || true
    fi
    
    if [ -f "$PTERODACTYL_DIR/resources/scripts/index.tsx" ]; then
        cp -p "$PTERODACTYL_DIR/resources/scripts/index.tsx" "$BACKUP_DIR/backup-${TIMESTAMP}/" 2>/dev/null || true
    fi
    
    if [ -f "$PTERODACTYL_DIR/resources/scripts/index.ts" ]; then
        cp -p "$PTERODACTYL_DIR/resources/scripts/index.ts" "$BACKUP_DIR/backup-${TIMESTAMP}/" 2>/dev/null || true
    fi
    
    # Create backup info file
    cat > "$BACKUP_DIR/backup-${TIMESTAMP}/BACKUP_INFO.txt" << EOF
Backup Created: $(date)
Pterodactyl Directory: $PTERODACTYL_DIR
Theme: Demo X Hexa v1.0
Created by: itzmebrmhexa

To restore this backup, run:
sudo bash uninstall-demoxhexa.sh --restore backup-${TIMESTAMP}
EOF
    
    success "Backup created at $BACKUP_DIR/backup-${TIMESTAMP}"
}

###############################################################################
# Installation Functions
###############################################################################

install_theme_files() {
    info "Installing theme files..."
    
    # Copy CSS theme file
    cp "$SCRIPT_DIR/$THEME_CSS" "$PTERODACTYL_DIR/$THEME_CSS"
    success "Installed: demoxhexa-theme.css"
    
    # Copy JavaScript effects
    cp "$SCRIPT_DIR/$THEME_JS" "$PTERODACTYL_DIR/$THEME_JS"
    success "Installed: cyber-effects.js"
    
    # Copy icon mapping
    cp "$SCRIPT_DIR/$ICON_MAP" "$PTERODACTYL_DIR/$ICON_MAP"
    success "Installed: icon-mapping.js"
    
    # Create assets directory if not exists
    mkdir -p "$PTERODACTYL_DIR/resources/scripts/assets/icons"
    
    # Copy logo
    cp "$SCRIPT_DIR/$LOGO_SVG" "$PTERODACTYL_DIR/$LOGO_SVG"
    success "Installed: demoxhexa-logo.svg"
    
    # Copy login page
    mkdir -p "$PTERODACTYL_DIR/resources/views/auth"
    cp "$SCRIPT_DIR/$LOGIN_BLADE" "$PTERODACTYL_DIR/$LOGIN_BLADE"
    success "Installed: login.blade.php"
}

patch_app_entry() {
    info "Patching application entry point..."
    
    # Find main entry point (usually index.tsx or index.ts)
    local entry_file=""
    if [ -f "$PTERODACTYL_DIR/resources/scripts/index.tsx" ]; then
        entry_file="$PTERODACTYL_DIR/resources/scripts/index.tsx"
    elif [ -f "$PTERODACTYL_DIR/resources/scripts/index.ts" ]; then
        entry_file="$PTERODACTYL_DIR/resources/scripts/index.ts"
    else
        warning "Could not find main entry point (index.tsx/index.ts)"
        warning "You will need to manually import the theme files"
        return 1
    fi
    
    # Check if already patched
    if grep -q "demoxhexa-theme.css" "$entry_file"; then
        warning "Entry point already patched, skipping..."
        return 0
    fi
    
    # Add imports at the beginning of the file
    local import_block="// Demo X Hexa Theme Imports
import './demoxhexa-theme.css';
import './cyber-effects.js';
import './icon-mapping.js';

"
    
    # Create temporary file with imports
    echo "$import_block" > /tmp/demoxhexa-temp.txt
    cat "$entry_file" >> /tmp/demoxhexa-temp.txt
    mv /tmp/demoxhexa-temp.txt "$entry_file"
    
    success "Patched application entry point"
}

update_tailwind_config() {
    info "Updating Tailwind configuration..."
    
    if [ ! -f "$PTERODACTYL_DIR/tailwind.config.js" ]; then
        warning "tailwind.config.js not found, skipping..."
        info "Please manually merge tailwind.config.extension.js if needed"
        return 1
    fi
    
    # Copy extension file for reference
    cp "$SCRIPT_DIR/$TAILWIND_EXT" "$PTERODACTYL_DIR/"
    
    info "Tailwind extension saved to: $PTERODACTYL_DIR/$TAILWIND_EXT"
    info "Please manually merge the Tailwind config or replace your existing one"
    warning "Automatic Tailwind config merging not implemented to prevent conflicts"
}

copy_logo_to_public() {
    info "Copying logo to public assets..."
    
    mkdir -p "$PTERODACTYL_DIR/public/assets"
    cp "$SCRIPT_DIR/$LOGO_SVG" "$PTERODACTYL_DIR/public/assets/demoxhexa-logo.svg"
    
    success "Logo copied to public/assets/"
}

set_permissions() {
    info "Setting proper permissions..."
    
    cd "$PTERODACTYL_DIR"
    
    # Set ownership (usually www-data or nginx)
    if id "www-data" &>/dev/null; then
        chown -R www-data:www-data "$PTERODACTYL_DIR"
        success "Ownership set to www-data"
    elif id "nginx" &>/dev/null; then
        chown -R nginx:nginx "$PTERODACTYL_DIR"
        success "Ownership set to nginx"
    else
        warning "Could not determine web server user, please set ownership manually"
    fi
    
    # Set permissions
    find "$PTERODACTYL_DIR" -type f -exec chmod 644 {} \;
    find "$PTERODACTYL_DIR" -type d -exec chmod 755 {} \;
    
    success "Permissions set"
}

build_assets() {
    info "Building panel assets..."
    divider
    
    cd "$PTERODACTYL_DIR"
    
    # Install/update dependencies
    info "Installing dependencies (this may take a few minutes)..."
    if command -v yarn &> /dev/null; then
        yarn install --frozen-lockfile 2>&1 | tee -a "$LOG_FILE" || {
            error "Failed to install dependencies with yarn"
            exit 1
        }
        
        info "Building production assets..."
        yarn build:production 2>&1 | tee -a "$LOG_FILE" || {
            error "Failed to build assets"
            exit 1
        }
    else
        npm install 2>&1 | tee -a "$LOG_FILE" || {
            error "Failed to install dependencies with npm"
            exit 1
        }
        
        info "Building production assets..."
        npm run build 2>&1 | tee -a "$LOG_FILE" || {
            error "Failed to build assets"
            exit 1
        }
    fi
    
    divider
    success "Assets built successfully"
}

clear_cache() {
    info "Clearing application cache..."
    
    cd "$PTERODACTYL_DIR"
    
    php artisan view:clear
    php artisan config:clear
    php artisan cache:clear
    php artisan route:clear
    
    success "Cache cleared"
}

###############################################################################
# Main Installation Flow
###############################################################################

main() {
    print_banner
    
    log "Installation started at $(date)"
    log "Log file: $LOG_FILE"
    divider
    
    # Pre-installation checks
    info "Running pre-installation checks..."
    check_root
    check_pterodactyl
    check_dependencies
    check_theme_files
    divider
    
    # Confirm installation
    echo ""
    question "This will install Demo X Hexa theme on your Pterodactyl panel."
    question "Pterodactyl directory: ${BOLD}$PTERODACTYL_DIR${NC}"
    echo ""
    read -p "Continue with installation? (yes/no): " -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        warning "Installation cancelled by user"
        exit 0
    fi
    
    divider
    
    # Create backup
    create_backup
    divider
    
    # Install theme
    install_theme_files
    divider
    
    # Patch files
    patch_app_entry
    divider
    
    # Update configs
    update_tailwind_config
    divider
    
    # Copy assets
    copy_logo_to_public
    divider
    
    # Build
    build_assets
    divider
    
    # Cleanup
    set_permissions
    clear_cache
    divider
    
    # Success message
    echo ""
    echo -e "${GREEN}${BOLD}"
    cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                   INSTALLATION SUCCESSFUL!                       ║
╚══════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    success "Demo X Hexa theme has been installed successfully!"
    echo ""
    info "What's next:"
    echo "  1. Clear your browser cache (Ctrl+Shift+Del)"
    echo "  2. Visit your Pterodactyl panel"
    echo "  3. Enjoy the cyber-themed experience!"
    echo ""
    info "Backup location: $BACKUP_DIR/backup-${TIMESTAMP}"
    info "To uninstall: sudo bash uninstall-demoxhexa.sh"
    echo ""
    warning "If you have Font Awesome Pro, add your kit code to the main layout"
    echo ""
    
    log "Installation completed at $(date)"
}

###############################################################################
# Error Handler
###############################################################################

error_handler() {
    echo ""
    error "Installation failed!"
    error "Check the log file for details: $LOG_FILE"
    echo ""
    warning "To restore backup, run:"
    echo "  sudo bash uninstall-demoxhexa.sh --restore backup-${TIMESTAMP}"
    exit 1
}

trap error_handler ERR

###############################################################################
# Run Installation
###############################################################################

main "$@"
