@extends('layouts.auth')

@section('title')
    Login
@endsection

@section('content')
<!-- Demo X Hexa Custom Login Page -->
<div class="cyber-login-container" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
    
    <!-- Matrix Rain Background Container -->
    <div id="dxh-matrix-rain-login"></div>
    
    <!-- Particle Background Canvas -->
    <canvas id="dxh-particle-canvas-login"></canvas>
    
    <!-- Hexagon Background -->
    <div id="dxh-hex-background-login"></div>
    
    <!-- Animated Background Grid -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(255, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.05) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; animation: cyber-grid-move 20s linear infinite;"></div>
    
    <!-- Login Card -->
    <div class="login-card holographic-border fade-in-up" style="position: relative; z-index: 10; max-width: 450px; width: 100%; margin: 20px; padding: 50px 40px; background: rgba(10, 10, 10, 0.95); backdrop-filter: blur(10px); border-radius: 12px; box-shadow: 0 0 50px rgba(255, 0, 0, 0.3);">
        
        <!-- Corner Decorations -->
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration top-right"></div>
        <div class="corner-decoration bottom-left"></div>
        <div class="corner-decoration bottom-right"></div>
        
        <!-- Logo Container -->
        <div class="logo-container" style="text-align: center; margin-bottom: 30px; position: relative;">
            @if(file_exists(public_path('assets/demoxhexa-logo.svg')))
                <img src="{{ asset('assets/demoxhexa-logo.svg') }}" 
                     alt="Demo X Hexa" 
                     class="cyber-logo glitch-on-hover" 
                     style="width: 120px; height: 120px; filter: drop-shadow(0 0 20px #FF0000);">
            @else
                <!-- Fallback Logo -->
                <div style="width: 120px; height: 120px; margin: 0 auto;">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="glitch-on-hover">
                        <defs>
                            <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#FF0000;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#8B0000;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" 
                                 fill="none" 
                                 stroke="url(#cyberGradient)" 
                                 stroke-width="3">
                            <animate attributeName="stroke-dasharray" 
                                     values="0,500;500,0;0,500" 
                                     dur="3s" 
                                     repeatCount="indefinite"/>
                        </polygon>
                        <text x="50" y="55" 
                              font-family="monospace" 
                              font-size="18" 
                              font-weight="bold"
                              fill="#FF0000" 
                              text-anchor="middle">DXH</text>
                    </svg>
                </div>
            @endif
            
            <!-- Glitch Overlay Effect -->
            <div class="logo-glitch-overlay" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 120px; background: rgba(255, 0, 0, 0.1); pointer-events: none; opacity: 0;"></div>
        </div>
        
        <!-- Welcome Text with Typing Effect -->
        <div style="text-align: center; margin-bottom: 35px;">
            <h1 class="welcome-text neon-pulse-text" 
                data-typing-text="ACCESS TERMINAL"
                style="font-size: 28px; color: #FF0000; text-transform: uppercase; letter-spacing: 4px; margin: 0; text-shadow: 0 0 10px #FF0000, 0 0 20px #FF0000;">
                ACCESS TERMINAL
            </h1>
            <p style="color: #666; font-size: 12px; margin-top: 10px; letter-spacing: 2px; text-transform: uppercase;">Demo X Hexa System</p>
        </div>
        
        <!-- Login Form -->
        <form method="POST" action="{{ route('auth.login') }}" class="cyber-form">
            @csrf
            
            <!-- CSRF Token Display (Optional - Remove in production) -->
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="color: #FF0000; font-size: 10px; letter-spacing: 1px;">// SECURE CONNECTION ESTABLISHED //</span>
            </div>
            
            <!-- Error Messages -->
            @if ($errors->any())
                <div class="alert alert-error glitch-effect" style="margin-bottom: 25px; padding: 15px; background: rgba(255, 0, 0, 0.1); border-left: 4px solid #FF0000; border-radius: 4px;">
                    @foreach ($errors->all() as $error)
                        <p style="color: #FF0000; margin: 0; font-size: 14px;">
                            <i class="fa-solid fa-exclamation-triangle"></i> {{ $error }}
                        </p>
                    @endforeach
                </div>
            @endif
            
            <!-- Username/Email Field -->
            <div class="form-group" style="margin-bottom: 30px; position: relative;">
                <label for="user" style="display: block; color: #FF0000; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">
                    <i class="fa-solid fa-user-shield"></i> Username / Email
                </label>
                <input type="text" 
                       id="user"
                       name="user" 
                       class="cyber-input" 
                       placeholder="ENTER USERNAME"
                       value="{{ old('user') }}"
                       required
                       autofocus
                       style="width: 100%; padding: 15px; background: rgba(26, 26, 26, 0.8); border: none; border-bottom: 2px solid #333; color: #fff; font-family: 'Share Tech Mono', monospace; font-size: 14px; transition: all 0.3s;">
                <div class="input-underline" style="position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #FF0000; transition: width 0.3s;"></div>
            </div>
            
            <!-- Password Field -->
            <div class="form-group" style="margin-bottom: 30px; position: relative;">
                <label for="password" style="display: block; color: #FF0000; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">
                    <i class="fa-solid fa-lock"></i> Password
                </label>
                <input type="password" 
                       id="password"
                       name="password" 
                       class="cyber-input" 
                       placeholder="ENTER PASSWORD"
                       required
                       style="width: 100%; padding: 15px; background: rgba(26, 26, 26, 0.8); border: none; border-bottom: 2px solid #333; color: #fff; font-family: 'Share Tech Mono', monospace; font-size: 14px; transition: all 0.3s;">
                <div class="input-underline" style="position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: #FF0000; transition: width 0.3s;"></div>
            </div>
            
            <!-- Remember Me Checkbox -->
            <div class="form-group" style="margin-bottom: 30px; display: flex; align-items: center;">
                <input type="checkbox" 
                       id="remember" 
                       name="remember" 
                       style="margin-right: 10px; width: 18px; height: 18px;">
                <label for="remember" style="color: #999; font-size: 13px; margin: 0; cursor: pointer;">
                    Remember Me
                </label>
            </div>
            
            <!-- Login Button -->
            <button type="submit" 
                    class="cyber-button neon-pulse" 
                    style="width: 100%; padding: 18px; background: linear-gradient(45deg, #8B0000, #FF0000); border: none; color: #fff; font-family: 'Share Tech Mono', monospace; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; cursor: pointer; position: relative; overflow: hidden; border-radius: 4px; box-shadow: 0 0 20px rgba(255, 0, 0, 0.5); transition: all 0.3s;">
                <span style="position: relative; z-index: 2;">
                    <i class="fa-solid fa-right-to-bracket"></i> INITIATE ACCESS
                </span>
                <div class="button-ripple" style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);"></div>
            </button>
            
            <!-- Forgot Password Link -->
            <div style="text-align: center; margin-top: 25px;">
                @if(Route::has('auth.password'))
                    <a href="{{ route('auth.password') }}" 
                       style="color: #FF0000; font-size: 13px; text-decoration: none; letter-spacing: 1px; transition: all 0.3s;">
                        <i class="fa-solid fa-key"></i> Forgot Password?
                    </a>
                @endif
            </div>
        </form>
        
        <!-- Decorative Data Streams -->
        <div class="data-stream" style="top: 20%; left: -100%;"></div>
        <div class="data-stream" style="top: 60%; left: -100%; animation-delay: 2s;"></div>
        
        <!-- Footer Text -->
        <div style="text-align: center; margin-top: 35px; padding-top: 25px; border-top: 1px solid rgba(255, 0, 0, 0.2);">
            <p style="color: #666; font-size: 11px; letter-spacing: 1px;">
                DEMO X HEXA v1.0 | CREATED BY <span style="color: #FF0000;">itzmebrmhexa</span>
            </p>
            <p style="color: #444; font-size: 10px; margin-top: 5px;">
                &copy; {{ date('Y') }} Pterodactyl Panel | Cyber Theme
            </p>
        </div>
    </div>
    
    <!-- Scanline Effect -->
    <div class="scanline" style="position: fixed; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #FF0000, transparent); opacity: 0.5; pointer-events: none; z-index: 99999;"></div>
</div>

<!-- Custom Login Page Styles -->
<style>
    /* Input Focus Effects */
    .cyber-input:focus {
        outline: none !important;
        border-bottom-color: #FF0000 !important;
        background: rgba(26, 26, 26, 1) !important;
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.3) !important;
    }
    
    .cyber-input:focus + .input-underline {
        width: 100% !important;
    }
    
    /* Button Hover Effects */
    .cyber-button:hover {
        box-shadow: 0 0 40px rgba(255, 0, 0, 0.8) !important;
        transform: translateY(-2px) !important;
    }
    
    .cyber-button:hover .button-ripple {
        left: 100% !important;
        transition: left 0.6s ease !important;
    }
    
    .cyber-button:active {
        transform: scale(0.98) !important;
    }
    
    /* Link Hover Effects */
    .cyber-form a:hover {
        text-shadow: 0 0 10px #FF0000 !important;
        letter-spacing: 2px !important;
    }
    
    /* Logo Animation */
    .cyber-logo:hover {
        filter: drop-shadow(0 0 30px #FF0000) !important;
        transform: scale(1.05) rotate(5deg) !important;
    }
    
    /* Card Animation on Load */
    @keyframes card-entrance {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .login-card {
        animation: card-entrance 0.6s ease-out;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .login-card {
            padding: 40px 30px !important;
            margin: 15px !important;
        }
        
        .welcome-text {
            font-size: 24px !important;
        }
        
        .cyber-logo, .cyber-logo svg {
            width: 100px !important;
            height: 100px !important;
        }
    }
    
    /* Loading State (Optional) */
    .cyber-button.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 20px;
        width: 16px;
        height: 16px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
</style>

<!-- Custom Login Page Scripts -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Input underline animation
        const inputs = document.querySelectorAll('.cyber-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const underline = this.nextElementSibling;
                if (underline && underline.classList.contains('input-underline')) {
                    underline.style.width = '100%';
                }
            });
            
            input.addEventListener('blur', function() {
                const underline = this.nextElementSibling;
                if (underline && underline.classList.contains('input-underline')) {
                    underline.style.width = '0';
                }
            });
        });
        
        // Form submission loading state
        const form = document.querySelector('.cyber-form');
        const submitButton = document.querySelector('.cyber-button');
        
        if (form && submitButton) {
            form.addEventListener('submit', function() {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
            });
        }
        
        // Logo glitch effect on hover
        const logo = document.querySelector('.cyber-logo');
        const glitchOverlay = document.querySelector('.logo-glitch-overlay');
        
        if (logo && glitchOverlay) {
            logo.addEventListener('mouseenter', function() {
                let glitchCount = 0;
                const glitchInterval = setInterval(() => {
                    glitchOverlay.style.opacity = Math.random();
                    glitchOverlay.style.transform = `translateX(${Math.random() * 10 - 5}px) translateY(${Math.random() * 10 - 5}px)`;
                    glitchCount++;
                    if (glitchCount > 10) {
                        clearInterval(glitchInterval);
                        glitchOverlay.style.opacity = '0';
                    }
                }, 50);
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+L to focus username field
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                document.getElementById('user').focus();
            }
        });
        
        console.log('%c[DEMO X HEXA] Login page initialized', 'color: #FF0000; font-weight: bold;');
    });
</script>
@endsection
