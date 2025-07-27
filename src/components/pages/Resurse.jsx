import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import MathJaxRender from "@/components/MathJaxRender";
import Video1 from "/res/Videos/Pendul Video.mp4";
import Video2 from "/res/Videos/Frecventa Undelor Video.mp4";
import Video3 from "/res/Videos/Unde Videoclip.mp4";
import Video4 from "/res/Videos/Front Unda 1.mp4";
import Video5 from "/res/Videos/Front Unda 2.mp4";
import Video6 from "/res/Videos/Lissajous-Video-1.mp4";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ResursePage = () => {

  const ResurseVideos = [
    { src: Video1, alt: "Video Pendul" },
    { src: Video2, alt: "Video Frecvența Undelor" },
    { src: Video3, alt: "Video Unde" },
    { src: Video4, alt: "Video Front Undă 1" },
    { src: Video5, alt: "Video Front Undă 2" },
    { src: Video6, alt: "Video Lissajous" },
  ];

  const [loadedSections, setLoadedSections] = useState({
    mecanica: false,
    termodinamica: false,
    seism: false,
    unde: false,
    prisma: false,
    pendule: false,
    lissajous: false
  });

  const [expandedSections, setExpandedSections] = useState({
    mecanica: false,
    termodinamica: false,
    seism: false,
    unde: false,
    prisma: false,
    pendule: false,
    lissajous: false
  });

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("formule");

  useEffect(() => {
    // Verifică dacă există parametrul tab în URL
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      window.MathJax.typeset()
    }
  }, []);

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
    
    // Dacă secțiunea nu este încărcată, o încarcă
    if (!loadedSections[sectionName]) {
      setLoadedSections(prev => ({
        ...prev,
        [sectionName]: true
      }));
      
      // Delay foarte scurt pentru MathJax
      setTimeout(() => {
        if (typeof window?.MathJax !== "undefined") {
          window.MathJax.typeset()
        }
      }, 10);
    }
  };

  const FormulaCard = ({ title, formula, sectionName }) => {
    const isLoaded = loadedSections[sectionName];
    
    return (
      <div className="formula-card">
        <div className="font-semibold mb-2">{title}</div>
        <div className="text-lg font-mono">
          {isLoaded ? (
            <>
              {formula}
              <MathJaxRender />
            </>
          ) : (
            <div className="text-gray-400 italic">Încărcare formulă...</div>
          )}
        </div>
      </div>
    );
  };

  const SectionFormulas = ({ sectionName, formulas, title }) => {
    const isExpanded = expandedSections[sectionName];
    const isLoaded = loadedSections[sectionName];
    
    return (
      <div className="mb-6">
        <div 
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
          onClick={() => toggleSection(sectionName)}
        >
          <h3 className="resurse-section-subtitle mb-0 flex items-center gap-1">
            {title}
            <svg 
              className={`w-2 h-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ maxWidth: '12px', maxHeight: '12px', marginLeft: '4px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 15l7-7 7 7" />
            </svg>
          </h3>
        </div>
        
        {isExpanded && (
          <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
            <div className="formula-grid mb-4">
              {formulas.map((formula, index) => (
                <FormulaCard
                  key={index}
                  title={formula.title}
                  formula={formula.formula}
                  sectionName={sectionName}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const mecanicaFormulas = [
    { title: "Legea mișcării oscilatorii pe OX", formula: "\\( x(t) = A \\sin(\\omega t + \\phi) \\)" },
    { title: "Legea vitezei oscilatorii", formula: "\\( v(t) = \\omega A \\cos(\\omega t + \\phi) \\)" },
    { title: "Legea accelerației oscilatorii", formula: "\\( a(t) = -\\omega^2 A \\sin(\\omega t + \\phi) \\)" },
    { title: "Viteza unghiulară", formula: "\\( \\omega = \\sqrt{\\frac{k}{m}} \\)" },
    { title: "Perioada oscilației", formula: "\\( T = 2\\pi \\sqrt{\\frac{m}{k}} \\)" },
    { title: "Conservarea impulsului", formula: "\\( m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} \\)" },
    { title: "Coeficientul de restituire", formula: "\\( e = \\frac{v_{2f} - v_{1f}}{v_{1i} - v_{2i}} \\)" },
    { title: "Forța pe plan înclinat", formula: "\\( F_{||} = mg \\sin(\\alpha) \\)" },
    { title: "Accelerația pe plan înclinat", formula: "\\( a = g(\\sin(\\alpha) - \\mu \\cos(\\alpha)) \\)" }
  ];

  const termodinamicaFormulas = [
    { title: "Prima lege a termodinamicii", formula: "\\( \\Delta U = Q - L \\)" },
    { title: "Ecuația de stare pentru gazul ideal", formula: "\\( pV = nRT \\)" },
    { title: "Entropia (Boltzmann)", formula: "\\( S = k_B \\ln \\Omega \\)" },
    { title: "A doua lege a termodinamicii", formula: "\\( \\Delta S \\geq \\frac{Q}{T} \\)" },
    { title: "Energia internă pentru gazul ideal", formula: "\\( U = \\frac{f}{2}nRT \\)" },
    { title: "Lucrul mecanic în procese reversibile", formula: "\\( L = \\int_{V_1}^{V_2} p \\, dV \\)" },
    { title: "Căldura specifică la volum constant", formula: "\\( C_V = \\left(\\frac{\\partial U}{\\partial T}\\right)_V \\)" },
    { title: "Entalpia", formula: "\\( H = U + pV \\)" },
    { title: "Energia liberă Helmholtz", formula: "\\( F = U - TS \\)" },
    { title: "Energia liberă Gibbs", formula: "\\( G = H - TS \\)" },
    { title: "Eficiența motorului Carnot", formula: "\\( \\eta = 1 - \\frac{T_C}{T_H} \\)" }
  ];

  const seismFormulas = [
    { title: "Viteza undei P (Seism)", formula: "\\( v_P = \\sqrt{\\frac{K + \\frac{4}{3}G}{\\rho}} \\)" },
    { title: "Viteza undei S (Seism)", formula: "\\( v_S = \\sqrt{\\frac{G}{\\rho}} \\)" },
    { title: "Magnitudinea Richter", formula: "\\( M_L = \\log_{10} A - \\log_{10} A_0 \\)" },
    { title: "Magnitudinea moment seismic", formula: "\\( M_w = \\frac{2}{3} \\log_{10} M_0 - 10.7 \\)" },
    { title: "Momentul seismic", formula: "\\( M_0 = \\mu A D \\)" },
    { title: "Energia seismică eliberată", formula: "\\( E = 10^{1.5M + 4.8} \\)" }
  ];

  const undeFormulas = [
    { title: "Formula generală a undelor", formula: "\\( v = \\lambda \\cdot f \\)" },
    { title: "Viteza de propagare", formula: "\\( v = \\sqrt{\\frac{T}{\\mu}} \\)" },
    { title: "Ecuația undei progresive", formula: "\\( y(x,t) = A \\sin(kx - \\omega t + \\phi) \\)" },
    { title: "Numărul de undă", formula: "\\( k = \\frac{2\\pi}{\\lambda} \\)" },
    { title: "Energia undei", formula: "\\( E = \\frac{1}{2}\\mu A^2\\omega^2 \\)" },
    { title: "Intensitatea undei", formula: "\\( I = \\frac{P}{A} = \\frac{1}{2}\\rho v A^2\\omega^2 \\)" }
  ];

  const prismaFormulas = [
    { title: "Legea refracției (Snell)", formula: "\\( n_1 \\sin(\\theta_1) = n_2 \\sin(\\theta_2) \\)" },
    { title: "Unghiul de deviație în prismă", formula: "\\( \\delta = (\\theta_1 + \\theta_2') - A \\)" },
    { title: "Indicele de refracție", formula: "\\( n = n(\\lambda) \\)" },
    { title: "Formula Cauchy pentru dispersie", formula: "\\( n(\\lambda) = A + \\frac{B}{\\lambda^2} + \\frac{C}{\\lambda^4} \\)" },
    { title: "Unghiul de deviație minimă", formula: "\\( \\delta_{min} = 2\\arcsin(n\\sin\\frac{A}{2}) - A \\)" },
    { title: "Puterea de dispersie", formula: "\\( P = \\frac{n_F - n_C}{n_D - 1} \\)" }
  ];

  const penduleFormulas = [
    { title: "Legea mișcării oscilatorii", formula: "\\( y(t) = A \\sin(\\omega t + \\phi) \\)" },
    { title: "Legea vitezei", formula: "\\( v(t) = \\omega A \\cos(\\omega t + \\phi) \\)" },
    { title: "Legea accelerației", formula: "\\( a(t) = -\\omega^2 A \\sin(\\omega t + \\phi) \\)" },
    { title: "Perioada pendulului gravitațional", formula: "\\( T = 2\\pi \\sqrt{\\frac{l}{g}} \\)" },
    { title: "Ecuația pendulului amortizat", formula: "\\( m\\frac{d^2x}{dt^2} + b\\frac{dx}{dt} + kx = 0 \\)" },
    { title: "Coeficientul de amortizare", formula: "\\( \\gamma = \\frac{b}{2m} \\)" },
    { title: "Frecvența amortizată", formula: "\\( \\omega_d = \\sqrt{\\omega_0^2 - \\gamma^2} \\)" },
    { title: "Decrementul logaritmic", formula: "\\( \\delta = \\ln\\frac{A_n}{A_{n+1}} = \\gamma T_d \\)" },
    { title: "Factorul de calitate", formula: "\\( Q = \\frac{\\omega_0}{2\\gamma} = \\frac{\\pi}{\\delta} \\)" },
    { title: "Ecuația pendulului simplu neliniar", formula: "\\( \\frac{d^2\\phi}{dt^2} + \\frac{g}{l} \\sin\\phi = 0 \\)" },
    { title: "Perioada pentru oscilații mari", formula: "\\( T = 4\\sqrt{\\frac{l}{g}}K(k) \\)" }
  ];

  const lissajousFormulas = [
    { title: "Ecuația parametrică x", formula: "\\( x(t) = A_1 \\sin(\\omega_1 t + \\phi_1) \\)" },
    { title: "Ecuația parametrică y", formula: "\\( y(t) = A_2 \\sin(\\omega_2 t + \\phi_2) \\)" },
    { title: "Raportul frecvențelor", formula: "\\( r = \\frac{\\omega_1}{\\omega_2} = \\frac{f_1}{f_2} \\)" },
    { title: "Diferența de fază", formula: "\\( \\Delta\\phi = \\phi_1 - \\phi_2 \\)" },
    { title: "Ecuația implicită (r = 1)", formula: "\\( \\frac{x^2}{A_1^2} + \\frac{y^2}{A_2^2} - \\frac{2xy}{A_1A_2}\\cos(\\Delta\\phi) = \\sin^2(\\Delta\\phi) \\)" },
    { title: "Perioada figurii", formula: "\\( T = \\frac{2\\pi}{\\gcd(\\omega_1, \\omega_2)} \\)" },
    { title: "Energia totală", formula: "\\( E = \\frac{1}{2}m(A_1^2\\omega_1^2 + A_2^2\\omega_2^2) \\)" },
    { title: "Aria figurii (r = 1)", formula: "\\( A = \\pi A_1A_2|\\sin(\\Delta\\phi)| \\)" }
  ];

  return (
    <Layout>
      <div className="resurse-page page-section">
        <main>
          <h1 className="resurse-title">Resurse</h1>

          <div className="resurse-description">
            <p>
              Accesează materiale educaționale pentru studiul fizicii, categorizate după nivelul de dificultate și tipul de conținut.
            </p>
          </div>

          <Tabs defaultValue="formule" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger key="formule" value="formule">Formule</TabsTrigger>
              <TabsTrigger key="lectii" value="lectii">Lecții</TabsTrigger>
              <TabsTrigger key="experimente" value="experimente">Experimente</TabsTrigger>
              <TabsTrigger key="bibliografie" value="bibliografie">Bibliografie</TabsTrigger>
            </TabsList>

            <TabsContent key="formule" value="formule">
              <div className="rounded-container">
                <h2 className="resurse-section-title">Formule esențiale în fizică</h2>
                <p className="text-muted-foreground mb-4">
                  Apasă pe titlurile de mai jos pentru a deschide formulele din fiecare secțiune.
                </p>

                <SectionFormulas 
                  sectionName="mecanica" 
                  formulas={mecanicaFormulas} 
                  title="Mecanică" 
                />

                <SectionFormulas 
                  sectionName="termodinamica" 
                  formulas={termodinamicaFormulas} 
                  title="Termodinamică" 
                />

                <SectionFormulas 
                  sectionName="seism" 
                  formulas={seismFormulas} 
                  title="Seism" 
                />

                <SectionFormulas 
                  sectionName="unde" 
                  formulas={undeFormulas} 
                  title="Unde" 
                />

                <SectionFormulas 
                  sectionName="prisma" 
                  formulas={prismaFormulas} 
                  title="Prisma" 
                />

                <SectionFormulas 
                  sectionName="pendule" 
                  formulas={penduleFormulas} 
                  title="Pendule" 
                />

                <SectionFormulas 
                  sectionName="lissajous" 
                  formulas={lissajousFormulas} 
                  title="Lissajous" 
                />
              </div>
            </TabsContent>

            {/* Lecții de fizică */}
            <TabsContent key="lectii" value="lectii">
              <div className="rounded-container">
                <h2 className="resurse-section-title">Lecții de fizică</h2>
                <div className="formula-grid">
                  <div className="formula-card">
                    <h3 className="text-xl font-semibold mb-2">Pendule</h3>
                    <p className="text-muted-foreground mb-2">
                      Descoperă mișcarea oscilatorie, formulele și simulări pentru pendulul simplu, amortizat și neliniar.
                    </p>
                    <Link to="/resurse/pendule" className="resurse-link">Citește lecția</Link>
                  </div>
                  <div className="formula-card">
                    <h3 className="text-xl font-semibold mb-2">Unde</h3>
                    <p className="text-muted-foreground mb-2">
                      Află despre propagarea undelor mecanice și electromagnetice, tipuri de unde și simulări interactive.
                    </p>
                    <Link to="/resurse/unde" className="resurse-link">Citește lecția</Link>
                  </div>
                  <div className="formula-card">
                    <h3 className="text-xl font-semibold mb-2">Figuri Lissajous</h3>
                    <p className="text-muted-foreground mb-2">
                      Explorează curbele Lissajous, ecuațiile parametrice și aplicațiile lor în fizică.
                    </p>
                    <Link to="/resurse/lissajous" className="resurse-link">Citește lecția</Link>
                  </div>
                  <div className="formula-card">
                    <h3 className="text-xl font-semibold mb-2">Seisme</h3>
                    <p className="text-muted-foreground mb-2">
                      Învață despre cutremure, unde seismice, propagare și vizualizări interactive.
                    </p>
                    <Link to="/resurse/seism" className="resurse-link">Citește lecția</Link>
                  </div>
                  <div className="formula-card">
                    <h3 className="text-xl font-semibold mb-2">Termodinamica</h3>
                    <p className="text-muted-foreground mb-2">
                      Învață despre termodinamică, principiile și aplicațiile ei în fizică.
                    </p>
                    <Link to="/resurse/termodinamica" className="resurse-link">Citește lecția</Link>
                  </div>
                  <div className="formula-card">
                    <h3 className="text-xl font-semibold mb-2">Mecanica</h3>
                    <p className="text-muted-foreground mb-2">
                      Învață despre mecanică, principiile și aplicațiile ei în fizică.
                    </p>
                    <Link to="/resurse/mecanica" className="resurse-link">Citește lecția</Link>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experimente practice */}
            <TabsContent key="experimente" value="experimente">
              <div className="rounded-container">
                <h2 className="resurse-section-title">Experimente practice</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Vizualizează experimente video pentru a înțelege mai bine fenomenele fizice prezentate.
                </p>
                <div className="experimente-video-grid">
                  <div className="experiment-card">
                    <h3 className="experiment-title">Oscilaţii armonice</h3>
                    <p className="experiment-desc">
                      Observă cum se comportă un pendul simplu în mișcare oscilatorie.
                    </p>
                    <video
                      src={ResurseVideos[0].src}
                      alt={ResurseVideos[0].alt}
                      controls
                      className="experiment-video"
                      title="Pendulul simplu (experiment video)"
                    />
                  </div>
                  <div className="experiment-card">
                    <h3 className="experiment-title">Unde Stationare in coarda vibranta</h3>
                    <p className="experiment-desc">
                      Explorează formarea undelor stationare într-o coardă vibrată.
                    </p>
                    <video
                      src={ResurseVideos[1].src}
                      alt={ResurseVideos[1].alt}
                      controls
                      className="experiment-video"
                      title="Legea lui Ohm (experiment video)"
                    />
                  </div>
                  <div className="experiment-card">
                    <h3 className="experiment-title">Tub sonor - frecvenţa fundamentală</h3>
                    <p className="experiment-desc">
                      Demonstrează cum se formează undele sonore într-un tub și cum se determină frecvența fundamentală.
                    </p>
                    <video
                      src={ResurseVideos[2].src}
                      alt={ResurseVideos[2].alt}
                      controls
                      className="experiment-video"
                      title="Spectre de lumină (experiment video)"
                    />
                  </div>
                  <div className="experiment-card">
                    <h3 className="experiment-title">Frontul de Unda</h3>
                    <p className="experiment-desc">
                      Observă cum se propagă frontul de undă în apa.
                    </p>
                    <video
                      src={ResurseVideos[3].src}
                      alt={ResurseVideos[3].alt}
                      controls
                      className="experiment-video"
                      title="Experiment suplimentar"
                    />
                  </div>
                  <div className="experiment-card">
                    <h3 className="experiment-title">Frontul de Unda</h3>
                    <p className="experiment-desc">
                      Observă cum se propagă frontul de undă în apa.
                    </p>
                    <video
                      src={ResurseVideos[4].src}
                      alt={ResurseVideos[4].alt}
                      controls
                      className="experiment-video"
                      title="Experiment suplimentar"
                    />
                  </div>
                  <div className="experiment-card">
                    <h3 className="experiment-title">Figuri Lissajous</h3>
                    <p className="experiment-desc">
                      Explorează cum se formează figurile Lissajous prin oscilații perpendiculare.
                    </p>
                    <video
                      src={ResurseVideos[5].src}
                      alt={ResurseVideos[5].alt}
                      controls
                      className="experiment-video"
                      title="Experiment suplimentar"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent key="bibliografie" value="bibliografie">
              <div className="rounded-container">
                <h2 className="resurse-section-title">Bibliografie recomandată</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="resurse-section-subtitle">Manuale</h3>
                    <ul className="resurse-list space-y-2">
                      <li>
                        <strong>Fizică manual pentru clasa a XI-a</strong>, Autori: Cleopatra Gherbanovschi , Nicolae Gherbanovschi.
                      </li>
                      <li>
                        <strong>Fizică manual pentru clasa a XI-a (M1/M2)" </strong>, Autori: Cristian Păun, Marius Burtea.
                      </li>
                      <li>
                        <strong>Culegere de probleme de fizică. Clasa a XI-a</strong>, Autor: Florin Grigore, Editura Paralela 45
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="resurse-section-subtitle">Cărți pentru aprofundare</h3>
                    <ul className="resurse-list space-y-2">
                      <li>
                        <strong>Fizica povestită</strong>, Autor: Cristian Presură
                      </li>
                      <li>
                        <strong>Principia Mathematica</strong>, Autor: Isaac Newton
                      </li>
                      <li>
                        <strong>Șase lecții ușoare</strong>, Autor: Richard Feynman
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="resurse-section-subtitle">Resurse online</h3>
                    <ul className="resurse-list space-y-2">
                      <li>
                        <a href="https://www.khanacademy.org" className="resurse-link">
                          Khan Academy - Fizică
                        </a>
                      </li>
                      <li>
                        <a href="https://phet.colorado.edu" className="resurse-link">
                          PhET Interactive Simulations
                        </a>
                      </li>
                      <li>
                        <a href="https://www.physics.org" className="resurse-link">
                          Physics.org
                        </a>
                      </li>
                      <li>
                        <a href="https://manuale.edu.ro/" className="resurse-link">
                          Manuale.edu.ro - Resurse educaționale
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Layout>
  );
};

export default ResursePage;
