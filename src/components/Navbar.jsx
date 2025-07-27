import { Book, FileQuestion, HelpCircle, Home, Layout, ListCheck, ListChecks, Settings, User, Search, ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import PulsLogoWhite from '/res/puls-logo-new2.png';
import PulsLogoBlack from '/res/puls-logo-new3.png';
import useDarkMode from "../hooks/useDarkMode";

import $ from 'jquery';
import { useEffect, useRef, useState } from "react";

// SVG-uri inline pentru steaguri
const FLAGS = {
  RO: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="20" height="40" x="0" y="0" fill="#002B7F"/><rect width="20" height="40" x="20" y="0" fill="#FCD116"/><rect width="20" height="40" x="40" y="0" fill="#CE1126"/></svg>
  ),
  EN: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="60" height="40" fill="#00247d"/><polygon points="0,0 60,40 60,0 0,40" fill="#fff"/><polygon points="0,0 60,40 60,0 0,40" fill="#cf142b"/><rect x="25" width="10" height="40" fill="#fff"/><rect y="15" width="60" height="10" fill="#fff"/><rect x="27" width="6" height="40" fill="#cf142b"/><rect y="17" width="60" height="6" fill="#cf142b"/></svg>
  ),
  FR: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="20" height="40" x="0" y="0" fill="#0055A4"/><rect width="20" height="40" x="20" y="0" fill="#fff"/><rect width="20" height="40" x="40" y="0" fill="#EF4135"/></svg>
  ),
  ES: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg>
  ),
  IT: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="20" height="40" x="0" y="0" fill="#008C45"/><rect width="20" height="40" x="20" y="0" fill="#fff"/><rect width="20" height="40" x="40" y="0" fill="#CD212A"/></svg>
  ),
  PT: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="24" height="40" x="0" y="0" fill="#006600"/><rect width="36" height="40" x="24" y="0" fill="#FF0000"/></svg>
  ),
  RU: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="60" height="13.33" y="0" fill="#fff"/><rect width="60" height="13.33" y="13.33" fill="#0039A6"/><rect width="60" height="13.34" y="26.66" fill="#D52B1E"/></svg>
  ),
  DE: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="60" height="13.33" y="0" fill="#000"/><rect width="60" height="13.33" y="13.33" fill="#DD0000"/><rect width="60" height="13.34" y="26.66" fill="#FFCE00"/></svg>
  ),
  NL: (
    <svg width="20" height="14" viewBox="0 0 60 40" style={{borderRadius:'2.5px'}}><rect width="60" height="13.33" y="0" fill="#21468B"/><rect width="60" height="13.33" y="13.33" fill="#fff"/><rect width="60" height="13.34" y="26.66" fill="#AE1C28"/></svg>
  ),
};

const LANGUAGES = [
    { code: 'RO', flag: FLAGS.RO, label: 'Română' },
    { code: 'EN', flag: FLAGS.EN, label: 'English' },
    { code: 'FR', flag: FLAGS.FR, label: 'Français' },
    { code: 'ES', flag: FLAGS.ES, label: 'Español' },
    { code: 'IT', flag: FLAGS.IT, label: 'Italiano' },
    { code: 'PT', flag: FLAGS.PT, label: 'Português' },
    { code: 'RU', flag: FLAGS.RU, label: 'Русский' },
    { code: 'DE', flag: FLAGS.DE, label: 'Deutsch' },
    { code: 'NL', flag: FLAGS.NL, label: 'Nederlands' },
];

const Navbar = () => {
    const [pulsOpen, setPulsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [maiMulteOpen, setMaiMulteOpen] = useState(false);
    const dropdownRef = useRef(null);
    const maiMulteRef = useRef(null);
    const closeTimeoutRef = useRef(null);
    const navigate = useNavigate();
    const darkModeOn = useDarkMode();
    const [langMenuOpenDesktop, setLangMenuOpenDesktop] = useState(false);
    const [langMenuOpenMobile, setLangMenuOpenMobile] = useState(false);
    const langMenuRefDesktop = useRef(null);
    const langMenuRefMobile = useRef(null);
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setPulsOpen(false);
            }
            if (
                maiMulteRef.current &&
                !maiMulteRef.current.contains(event.target)
            ) {
                setMaiMulteOpen(false);
            }
            if (
                langMenuRefDesktop.current &&
                !langMenuRefDesktop.current.contains(event.target)
            ) {
                setLangMenuOpenDesktop(false);
            }
            if (
                langMenuRefMobile.current &&
                !langMenuRefMobile.current.contains(event.target)
            ) {
                setLangMenuOpenMobile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('#nav-mobile') && !event.target.closest('#burger-menu')) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Închide dropdown-ul mobil când se închide meniul mobil
    useEffect(() => {
        if (!mobileMenuOpen) setMobileDropdownOpen(false);
    }, [mobileMenuOpen]);

    // Blochează scrollbarul body-ului când meniul mobil e deschis
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Improved hover handlers with delay
    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setPulsOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setPulsOpen(false);
        }, 150); // 150ms delay before closing
    };

    const handleMaiMulteMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setMaiMulteOpen(true);
    };

    const handleMaiMulteMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setMaiMulteOpen(false);
        }, 50);
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPulsOpen((prev) => !prev);
    };

    const handleMaiMulteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMaiMulteOpen((prev) => !prev);
    };

    const handleDropdownItemClick = () => {
        setPulsOpen(false);
        setMaiMulteOpen(false);
        setMobileMenuOpen(false);
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMobileNavClick = () => {
        setMobileMenuOpen(false);
    };

    const handleMaiMulteMobileClick = () => {
        navigate('/resurse?tab=lectii');
        setMobileMenuOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            // Navigate to a search results page with the query as a URL param
            navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
            setSearchValue("");
        }
    };

    // Keep the original scroll logic untouched!
    $(document).on("scroll", () => {
        if ($(document).scrollTop() <= 100)
        {
            $('nav').css('backdrop-filter', `blur(${0.2 * ($(document).scrollTop() / 10)}px)`);
            $('nav').css('background', `linear-gradient(to bottom, rgba(0, 0, 0, ${$(document).scrollTop() / 100 * 0.74}), rgba(0, 0, 0, 0))`);
        }
        else
        {
            $('nav').css('backdrop-filter', 'blur(2px)');
            $('nav').css('background', 'linear-gradient(to bottom, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0))');
        }
    });

    useEffect(() => {
        if (!darkModeOn)
        {            
            if ($(document).scrollTop() <= 100) {
                $('nav > #nav-container > ul > li > .nav-link').css({ color: 'black' });
                $('nav #navbar-search .search-icon, nav #navbar-search .search-input').css({ color: 'black' });
                $('nav #navbar-search').css({ borderColor: 'black' });
                $('nav #dark-mode-toggle-container .toggle-parent .dark-mode-toggle').css({ color: 'black' });
                $('#logo-link img').attr('src', PulsLogoBlack);
                $('#burger-menu svg').css({ color: 'black' });
                $('nav #dark-mode-toggle-container .lang-toggle-btn, nav #dark-mode-toggle-container .lang-code').css({ color: 'black' });
            } else {
                $('nav > #nav-container > ul > li > .nav-link').css({ color: 'white' });
                $('nav #navbar-search .search-icon, nav #navbar-search .search-input').css({ color: 'white' });
                $('nav #navbar-search').css({ borderColor: 'white' });
                $('nav #dark-mode-toggle-container .toggle-parent .dark-mode-toggle').css({ color: 'white' });
                $('#logo-link img').attr('src', PulsLogoWhite);
                $('#burger-menu svg').css({ color: 'white' });
                $('nav #dark-mode-toggle-container .lang-toggle-btn, nav #dark-mode-toggle-container .lang-code').css({ color: 'white' });
            }

            console.log('Current mode: white mode');
            $(document).off("scroll.white-mode-scroll"); // To be sure
            $(document).on("scroll.white-mode-scroll", () => {
                if ($(document).scrollTop() <= 100) {
                    $('nav > #nav-container > ul > li > .nav-link').css({ color: 'black' });
                    $('nav #navbar-search .search-icon, nav #navbar-search .search-input').css({ color: 'black' });
                    $('nav #navbar-search').css({ borderColor: 'black' });
                    $('nav #dark-mode-toggle-container .toggle-parent .dark-mode-toggle').css({ color: 'black' });
                    $('#logo-link img').attr('src', PulsLogoBlack);
                    $('#burger-menu svg').css({ color: 'black' });
                    $('nav #dark-mode-toggle-container .lang-toggle-btn, nav #dark-mode-toggle-container .lang-code').css({ color: 'black' });
                } else {
                    $('nav > #nav-container > ul > li > .nav-link').css({ color: 'white' });
                    $('nav #navbar-search .search-icon, nav #navbar-search .search-input').css({ color: 'white' });
                    $('nav #navbar-search').css({ borderColor: 'white' });
                    $('nav #dark-mode-toggle-container .toggle-parent .dark-mode-toggle').css({ color: 'white' });
                    $('#logo-link img').attr('src', PulsLogoWhite);
                    $('#burger-menu svg').css({ color: 'white' });
                    $('nav #dark-mode-toggle-container .lang-toggle-btn, nav #dark-mode-toggle-container .lang-code').css({ color: 'white' });
                }
            });
        }
        else
        {
            $(document).off("scroll.white-mode-scroll");
            console.log('Current mode: dark mode');
            $('nav > #nav-container > ul > li > .nav-link').css({ color: 'white' });
            $('nav #navbar-search .search-icon, nav #navbar-search .search-input').css({ color: 'white' });
            $('nav #navbar-search').css({ borderColor: 'white' });
            $('nav #dark-mode-toggle-container .toggle-parent .dark-mode-toggle').css({ color: 'white' });
            $('#logo-link img').attr('src', PulsLogoWhite);
            $('#burger-menu svg').css({ color: 'white' });
            $('nav #dark-mode-toggle-container .lang-toggle-btn, nav #dark-mode-toggle-container .lang-code').css({ color: 'white' });
        }

        return () => {
            $(document).off("scroll.white-mode-scroll");
        }
    }, [darkModeOn]);

    return (
        <nav>
            {/* Logo */}
            <div id="logo-container">
                <Link to="/" id="logo-link">
                    <img src={darkModeOn ? PulsLogoWhite : PulsLogoBlack} alt="P.U.L.S" />
                </Link>
            </div>
            
            {/* Search Bar */}
            <form id="navbar-search" onSubmit={handleSearchSubmit}>
                <Search className="search-icon" strokeWidth={3} />
                <input
                    type="text"
                    className="search-input"
                    value={searchValue}
                    onChange={handleSearchChange}
                    // placeholder="Caută..."
                />
            </form>
            
            {/* Desktop Navigation */}
            <div id="nav-container">
                <ul id="nav-list">
                    <li>
                        <Link to="/" className="nav-link">
                            <Home className="nav-icon" />
                            <span>Acasa</span>
                        </Link>
                        <div
                            className="nav-link dropdown-toggle"
                            ref={dropdownRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleDropdownClick}
                        >
                            <span className="dropdown-toggle-content">
                                <span>P.U.L.S.</span>
                                <ChevronDown className="nav-icon" />
                            </span>
                            {pulsOpen && (
                                <div 
                                    className="dropdown-menu"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link to="/resurse/pendule" className="dropdown-item" onClick={handleDropdownItemClick}>
                                        Pendule
                                    </Link>
                                    <Link to="/resurse/unde" className="dropdown-item" onClick={handleDropdownItemClick}>
                                        Unde
                                    </Link>
                                    <Link to="/resurse/lissajous" className="dropdown-item" onClick={handleDropdownItemClick}>
                                        Lissajous
                                    </Link>
                                    <Link to="/resurse/seism" className="dropdown-item" onClick={handleDropdownItemClick}>
                                        Seisme
                                    </Link>
                                    <div
                                        className="dropdown-item mai-multe-item"
                                        ref={maiMulteRef}
                                        onMouseEnter={handleMaiMulteMouseEnter}
                                        onMouseLeave={handleMaiMulteMouseLeave}
                                        onClick={handleMaiMulteClick}
                                    >
                                        <span>Mai multe</span>
                                        <ChevronRight className="nav-icon" />
                                        {maiMulteOpen && (
                                            <div className="submenu">
                                                <Link to="/resurse/mecanica" className="submenu-item" onClick={handleDropdownItemClick}>
                                                    Mecanică
                                                </Link>
                                                <Link to="/resurse/termodinamica" className="submenu-item" onClick={handleDropdownItemClick}>
                                                    Termodinamică
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to="/probleme" className="nav-link">
                            <ListCheck className="nav-icon" />
                            <span>Probleme</span>
                        </Link>
                        <Link to="/simulari" className="nav-link">
                            <Settings className="nav-icon" />
                            <span>Simulari</span>
                        </Link>
                        <Link to="/resurse" className="nav-link">
                            <Book className="nav-icon" />
                            <span>Resurse</span>
                        </Link>
                        <Link to="/profil" className="nav-link">
                            <User className="nav-icon" />
                            <span>Profil</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu Button */}
            <div id="nav-mobile">
                <button 
                    id="burger-menu" 
                    onClick={handleMobileMenuToggle}
                    className={mobileMenuOpen ? 'active' : ''}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div id="mobile-menu" className="active">
                        {/* Buton de close */}
                        <button
                            className="mobile-menu-close"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Închide meniul"
                            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', zIndex: 1100 }}
                        >
                            <X size={32} color={darkModeOn ? '#fff' : '#222'} />
                        </button>
                        <div className="nav-list">
                            {/* Buton limbă ca prim element în listă, doar pe mobil */}
                            <div className="lang-toggle-container lang-toggle-mobile" ref={langMenuRefMobile} style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <button
                                    className="lang-toggle-btn"
                                    onClick={() => setLangMenuOpenMobile((v) => !v)}
                                    aria-label="Schimbă limba vizual"
                                    type="button"
                                    aria-expanded={langMenuOpenMobile}
                                >
                                    <span className="lang-code">{selectedLang.code}</span>
                                    <span className="lang-flag-svg">{selectedLang.flag}</span>
                                    <ChevronDown className="lang-chevron" size={16} />
                                </button>
                                {langMenuOpenMobile && (
                                    <div className="lang-dropdown" style={{ left: 0, right: 'auto', transform: 'none', top: '110%' }}>
                                        {LANGUAGES.filter(lang => lang.code !== selectedLang.code).map((lang) => (
                                            <div
                                                className="lang-dropdown-item"
                                                key={lang.code}
                                                onClick={() => { setSelectedLang(lang); setLangMenuOpenMobile(false); }}
                                            >
                                                <span className="lang-dropdown-code">{lang.code}</span>
                                                <span className="lang-flag-svg">{lang.flag}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Restul meniului mobil... */}
                            <Link to="/" className="nav-link" onClick={handleMobileNavClick}>
                                <Home className="nav-icon" />
                                <span>Acasa</span>
                            </Link>
                            
                            <div className="mobile-dropdown">
                                <div className="mobile-dropdown-header" onClick={() => setMobileDropdownOpen(v => !v)}>
                                    <span>P.U.L.S.</span>
                                    <ChevronDown className="nav-icon" style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                                </div>
                                <div className={`mobile-dropdown-content${mobileDropdownOpen ? ' open' : ''}`}>
                                    <Link to="/resurse/pendule" className="nav-link" onClick={handleMobileNavClick}>
                                        Pendule
                                    </Link>
                                    <Link to="/resurse/unde" className="nav-link" onClick={handleMobileNavClick}>
                                        Unde
                                    </Link>
                                    <Link to="/resurse/lissajous" className="nav-link" onClick={handleMobileNavClick}>
                                        Lissajous
                                    </Link>
                                    <Link to="/resurse/seism" className="nav-link" onClick={handleMobileNavClick}>
                                        Seisme
                                    </Link>
                                    <button className="nav-link" onClick={handleMaiMulteMobileClick} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                                        <span>Diverse</span>
                                    </button>
                                </div>
                            </div>
                            
                            <Link to="/probleme" className="nav-link" onClick={handleMobileNavClick}>
                                <ListCheck className="nav-icon" />
                                <span>Probleme</span>
                            </Link>
                            <Link to="/simulari" className="nav-link" onClick={handleMobileNavClick}>
                                <Settings className="nav-icon" />
                                <span>Simulari</span>
                            </Link>
                            <Link to="/resurse" className="nav-link" onClick={handleMobileNavClick}>
                                <Book className="nav-icon" />
                                <span>Resurse</span>
                            </Link>
                            <Link to="/profil" className="nav-link" onClick={handleMobileNavClick}>
                                <User className="nav-icon" />
                                <span>Profil</span>
                            </Link>
                            
                        </div>
                    </div>
                )}
            </div>
            
            {/* Dark Mode Toggle */}
            {/* În bara de sus (desktop): */}
            <div id="dark-mode-toggle-container" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <DarkModeToggle />
                <div className="lang-toggle-container lang-toggle-desktop" ref={langMenuRefDesktop}>
                    <button
                        className="lang-toggle-btn"
                        onClick={() => setLangMenuOpenDesktop((v) => !v)}
                        aria-label="Schimbă limba vizual"
                        type="button"
                        aria-expanded={langMenuOpenDesktop}
                    >
                        <span className="lang-code">{selectedLang.code}</span>
                        <span className="lang-flag-svg">{selectedLang.flag}</span>
                        <ChevronDown className="lang-chevron" size={16} />
                    </button>
                    {langMenuOpenDesktop && (
                        <div className="lang-dropdown">
                            {LANGUAGES.filter(lang => lang.code !== selectedLang.code).map((lang) => (
                                <div
                                    className="lang-dropdown-item"
                                    key={lang.code}
                                    onClick={() => { setSelectedLang(lang); setLangMenuOpenDesktop(false); }}
                                >
                                    <span className="lang-dropdown-code">{lang.code}</span>
                                    <span className="lang-flag-svg">{lang.flag}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;