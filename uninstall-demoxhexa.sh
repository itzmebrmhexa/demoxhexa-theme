#!/bin/bash

###############################################################################
#                                                                             #
#              DEMO X HEXA THEME UNINSTALLER v1.0                             #
#                Safely Remove Cyberpunk Theme from Pterodactyl               #
#                      Created by: itzmebrmhexa                               #
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
PTERODACTYL_DIR="/var/www/pterodactyl"
BACKUP_DIR="/var/backups/pterodactyl-theme"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/tmp/uninstall-demoxhexa-${TIMESTAMP}.log"

# Theme files to remove
THEME_FILES=(
    "resources/scripts/demoxhexa-theme.css"
    "resources/scripts/cyber-effects.js"
    "resources/scripts/icon-mapping.js"
    "resources/scripts/assets/icons/demoxhexa-logo.svg"
    "public/assets/demoxhexa-logo.svg"
    "tailwind.config.extension.js"
)

###############################################################################
# Helper Functions
###############################################################################

print_banner() {
    clear
    echo -e "${RED}"
    cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                  DEMO X HEXA THEME UNINSTALLER                   ║
║                 Remove Theme from Pterodactyl Panel              ║
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
        exit 1
    fi
    success "Pterodactyl installation found"
}

###############################################################################
# Backup Functions
###############################################################################

list_backups() {
    if [ ! -d "$BACKUP_DIR" ]; then
        warning "No backups found"
        return 1
    fi
    
    info "Available backups:"
    local backups=($(ls -1t "$BACKUP_DIR" | grep "backup-"))
    
    if [ ${#backups[@]} -eq 0 ]; then
        warning "No backups found"
        return 1
    fi
    
    local i=1
    for backup in "${backups[@]}"; do
        echo "  $i) $backup"
        if [ -f "$BACKUP_DIR/$backup/BACKUP_INFO.txt" ]; then
            echo "     $(head -n 1 "$BACKUP_DIR/$backup/BACKUP_INFO.txt")"
        fi
        ((i++))
    done
    
    return 0
}

restore_backup() {
    local backup_name="$1"
    
    if [ -z "$backup_name" ]; then
        error "No backup specified"
        return 1
    fi
    
    local backup_path="$BACKUP_DIR/$backup_name"
    
    if [ ! -d "$backup_path" ]; then
        error "Backup not found: $backup_name"
        return 1
    fi
    
    info "Restoring backup: $backup_name"
    
    # Restore login page
    if [ -f "$backup_path/login.blade.php" ]; then
        cp -p "$backup_path/login.blade.php" "$PTERODACTYL_DIR/resources/views/auth/login.blade.php"
        success "Restored: login.blade.php"
    fi
    
    # Restore tailwind config
    if [ -f "$backup_path/tailwind.config.js" ]; then
        cp -p "$backup_path/tailwind.config.js" "$PTERODACTYL_DIR/tailwind.config.js"
        success "Restored: tailwind.config.js"
    fi
    
    # Restore app entry point
    if [ -f "$backup_path/index.tsx" ]; then
        cp -p "$backup_path/index.tsx" "$PTERODACTYL_DIR/resources/scripts/index.tsx"
        success "Restored: index.tsx"
    elif [ -f "$backup_path/index.ts" ]; then
        cp -p "$backup_path/index.ts" "$PTERODACTYL_DIR/resources/scripts/index.ts"
        success "Restored: index.ts"
    fi
    
    success "Backup restored successfully"
}

###############################################################################
# Uninstall Functions
###############################################################################

remove_theme_files() {
    info "Removing theme files..."
    
    local removed=0
    local not_found=0
    
    for file in "${THEME_FILES[@]}"; do
        if [ -f "$PTERODACTYL_DIR/$file" ]; then
            rm -f "$PTERODACTYL_DIR/$file"
            success "Removed: $file"
            ((removed++))
        else
            warning "Not found: $file"
            ((not_found++))
        fi
    done
    
    info "Removed $removed files, $not_found not found"
}

unpatch_app_entry() {
    info "Removing theme imports from app entry point..."
    
    # Find main entry point
    local entry_file=""
    if [ -f "$PTERODACTYL_DIR/resources/scripts/index.tsx" ]; then
        entry_file="$PTERODACTYL_DIR/resources/scripts/index.tsx"
    elif [ -f "$PTERODACTYL_DIR/resources/scripts/index.ts" ]; then
        entry_file="$PTERODACTYL_DIR/resources/scripts/index.ts"
    else
        warning "Could not find main entry point"
        return 1
    fi
    
    # Remove theme imports
    sed -i '/demoxhexa-theme\.css/d' "$entry_file"
    sed -i '/cyber-effects\.js/d' "$entry_file"
    sed -i '/icon-mapping\.js/d' "$entry_file"
    sed -i '/Demo X Hexa Theme Imports/d' "$entry_file"
    
    # Remove empty lines at the beginning
    sed -i '/./,$!d' "$entry_file"
    
    success "Removed theme imports"
}

restore_default_login() {
    info "Checking for default login page backup..."
    
    # Try to find most recent backup
    if [ -d "$BACKUP_DIR" ]; then
        local latest_backup=$(ls -1t "$BACKUP_DIR" | grep "backup-" | head -n 1)
        if [ -n "$latest_backup" ] && [ -f "$BACKUP_DIR/$latest_backup/login.blade.php" ]; then
            cp -p "$BACKUP_DIR/$latest_backup/login.blade.php" "$PTERODACTYL_DIR/resources/views/auth/login.blade.php"
            success "Restored original login page from backup"
            return 0
        fi
    fi
    
    warning "No backup found for login page"
    warning "You may need to manually restore or rebuild Pterodactyl"
}

rebuild_assets() {
    info "Rebuilding panel assets..."
    divider
    
    cd "$PTERODACTYL_DIR"
    
    if command -v yarn &> /dev/null; then
        yarn build:production 2>&1 | tee -a "$LOG_FILE"
    else
        npm run build 2>&1 | tee -a "$LOG_FILE"
    fi
    
    divider
    success "Assets rebuilt"
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
# Main Uninstall Flow
###############################################################################

uninstall_theme() {
    print_banner
    
    log "Uninstallation started at $(date)"
    log "Log file: $LOG_FILE"
    divider
    
    # Checks
    info "Running pre-uninstall checks..."
    check_root
    check_pterodactyl
    divider
    
    # Show backups
    echo ""
    list_backups
    echo ""
    divider
    
    # Confirm
    echo ""
    question "This will remove Demo X Hexa theme from your Pterodactyl panel."
    question "Pterodactyl directory: ${BOLD}$PTERODACTYL_DIR${NC}"
    echo ""
    read -p "Continue with uninstallation? (yes/no): " -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        warning "Uninstallation cancelled by user"
        exit 0
    fi
    
    divider
    
    # Remove files
    remove_theme_files
    divider
    
    # Unpatch
    unpatch_app_entry
    divider
    
    # Restore login
    restore_default_login
    divider
    
    # Rebuild
    rebuild_assets
    divider
    
    # Clear cache
    clear_cache
    divider
    
    # Success
    echo ""
    echo -e "${GREEN}${BOLD}"
    cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                   UNINSTALLATION SUCCESSFUL!                     ║
╚══════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"
    
    success "Demo X Hexa theme has been removed"
    echo ""
    info "What's next:"
    echo "  1. Clear your browser cache (Ctrl+Shift+Del)"
    echo "  2. Visit your Pterodactyl panel"
    echo "  3. Default theme should be restored"
    echo ""
    info "Backups are still available at: $BACKUP_DIR"
    info "To restore a backup, run: sudo bash uninstall-demoxhexa.sh --restore <backup-name>"
    echo ""
    
    log "Uninstallation completed at $(date)"
}

restore_from_backup() {
    print_banner
    
    # List available backups
    list_backups || {
        error "No backups available"
        exit 1
    }
    
    echo ""
    read -p "Enter backup name to restore: " backup_name
    
    if [ -z "$backup_name" ]; then
        error "No backup name provided"
        exit 1
    fi
    
    divider
    restore_backup "$backup_name"
    divider
    rebuild_assets
    divider
    clear_cache
    divider
    
    success "Backup restored successfully!"
    info "Clear your browser cache and refresh the panel"
}

###############################################################################
# Command Line Arguments
###############################################################################

show_help() {
    cat << EOF
Demo X Hexa Theme Uninstaller

Usage: sudo bash uninstall-demoxhexa.sh [OPTIONS]

OPTIONS:
    --restore <backup>    Restore specific backup
    --list-backups        List all available backups
    -h, --help           Show this help message

EXAMPLES:
    sudo bash uninstall-demoxhexa.sh
    sudo bash uninstall-demoxhexa.sh --restore backup-20240101_120000
    sudo bash uninstall-demoxhexa.sh --list-backups

EOF
}

###############################################################################
# Main Entry Point
###############################################################################

case "${1:-}" in
    --restore)
        if [ -z "$2" ]; then
            restore_from_backup
        else
            print_banner
            restore_backup "$2"
            rebuild_assets
            clear_cache
            success "Backup restored!"
        fi
        ;;
    --list-backups)
        print_banner
        list_backups
        ;;
    -h|--help)
        show_help
        ;;
    *)
        uninstall_theme
        ;;
esac
