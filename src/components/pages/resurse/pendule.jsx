import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "../../Button";
import MathJaxRender from "@/components/MathJaxRender";

import simulatorPendulSimpluImg from "/res/screenshots/Simplu_Screenshot.png";
import simulatorPendulAmortizatImg from "/res/screenshots/Amortizat_Screenshot.png";
import simulatorGraficePendulImg from "/res/screenshots/Grafice_Pendule_Screenshot.png";
import simulatorTrasnitPendulImg from "/res/screenshots/Trasnit_Screenshot.png";

import VideoPendul from "/res/Videos/Pendul Video.mp4";
import Layout from "../../Layout";

const PendulePage = () => {
  const Images = [
    { src: simulatorGraficePendulImg, alt: "Grafice Pendul" },
    { src: simulatorPendulSimpluImg, alt: "Pendulul Simplu" },
    { src: simulatorPendulAmortizatImg, alt: "Pendulul Amortizat" },
    { src: simulatorTrasnitPendulImg, alt: "Pendulul Mecanic" },
    { src: VideoPendul, alt: "Video Pendul" }
  ];


  return (
    <Layout>
      <div className="resurse-pagina min-h-screen flex flex-col">
        <div style={{ paddingTop: "110px", flex: 1, display: "flex", flexDirection: "column" }}>
          <main className="flex-grow container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Pendule și Mișcări Oscilatorii</h1>
            
            <div className="max-w-4xl mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Pendulul este unul dintre cele mai importante sisteme oscilatorii din fizică, oferind o înțelegere fundamentală a mișcărilor periodice 
                și a principiilor care guvernează comportamentul sistemelor dinamice. Studiul pendulului a fost esențial pentru dezvoltarea 
                mecanicii clasice și a conceptelor moderne de oscilații.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Mișcările oscilatorii sunt caracterizate prin repetarea periodică a unei mișcări în timp, fiind prezente în aproape toate sistemele fizice, 
                de la pendulul simplu până la vibrațiile atomice și moleculare. Aceste mișcări sunt guvernate de forțe restauratoare 
                care tind să readucă sistemul la poziția de echilibru.
              </p>
              <p className="text-lg text-muted-foreground">
                În această secțiune, explorăm diferitele tipuri de pendule și sisteme oscilatorii, de la cazul simplu al pendulului gravitațional 
                până la sistemele complexe cu amortizare și comportament neliniar.
              </p>
            </div>

            <div className="space-y-12">
              {/* Grafice Armonice */}
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Grafice Armonice</h2>
                <p className="text-muted-foreground mb-6">
                  Mișcarea oscilatorie armonică este caracterizată printr-o oscilație periodică, care poate fi reprezentată grafic printr-o funcție sinusoidală. 
                  Această mișcare este fundamentală pentru înțelegerea tuturor sistemelor oscilatorii și a comportamentului lor în timp.
                </p>
                <p className="text-muted-foreground mb-6">
                  Când un sistem oscilator este deplasat din poziția sa de echilibru, forța restauratoare F = -kx (legea lui Hooke) îl readuce spre poziția de echilibru. 
                  Această forță generează o mișcare oscilatorie armonică, caracterizată prin ecuații matematice precise care descriu poziția, viteza și accelerația sistemului în timp.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={simulatorGraficePendulImg}
                    alt="Grafice Pendul"
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Ecuațiile mișcării oscilatorii armonice:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Legea mișcării:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( y(t) = A \\sin(\\omega t + \\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Legea vitezei:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( v(t) = \\omega A \\cos(\\omega t + \\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Legea accelerației:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( a(t) = -\\omega^2 A \\sin(\\omega t + \\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Viteza unghiulară:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\omega = \\sqrt{\\frac{k}{m}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Perioada oscilației:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( T = 2\\pi \\sqrt{\\frac{m}{k}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Frecvența:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( f = \\frac{1}{T} = \\frac{\\omega}{2\\pi} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">7. Energia totală:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( E = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2A^2 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: A este amplitudinea, {"\\(\\omega\\)"} <MathJaxRender /> viteza unghiulară, {"\\(\\phi\\)"} <MathJaxRender /> faza inițială, 
                      k este constanta elastică, m este masa, T este perioada, f este frecvența, E este energia totală.
                    </p>
                  </div>
                  <a
                    href="/simulari/Grafice-Armonice/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              {/* Pendulul simplu */}
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Pendulul gravitațional</h2>
                <p className="text-muted-foreground mb-6">
                  Pendulul gravitațional este un ansamblu format dintr-un corp punctiform de masă m, atârnat de un fir inextensibil, de masă neglijabilă și lungime l. 
                  Dacă corpul este scos din poziția de echilibru și lăsat liber, pentru unghiuri mici de deviație el va oscila liniar armonic.
                </p>
                <p className="text-muted-foreground mb-6">
                  Acest sistem oscilator este fundamental pentru înțelegerea conceptelor de perioadă, frecvență și forță de restabilire. 
                  Pendulul gravitațional a fost folosit pentru măsurarea timpului și pentru demonstrarea rotației Pământului.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={simulatorPendulSimpluImg}
                    alt="Pendulul Simplu"
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule pentru pendulul gravitațional:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Perioada de oscilație:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( T = 2\\pi \\sqrt{\\frac{l}{g}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Frecvența:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( f = \\frac{1}{2\\pi} \\sqrt{\\frac{g}{l}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Viteza unghiulară:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\omega = \\sqrt{\\frac{g}{l}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Ecuația de mișcare (pentru unghiuri mici):</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\frac{d^2\\theta}{dt^2} + \\frac{g}{l}\\theta = 0 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Soluția ecuației de mișcare:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\theta(t) = \\theta_0 \\cos(\\omega t + \\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Energia totală:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( E = mgl(1 - \\cos\\theta_0) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: l este lungimea pendulului, g este accelerația gravitațională, {"\\(\\theta\\)"} <MathJaxRender /> este unghiul de deviație, 
                      {"\\(\\theta_0\\)"} <MathJaxRender /> este amplitudinea unghiulară, {"\\(\\omega\\)"} <MathJaxRender /> este viteza unghiulară, E este energia totală.
                    </p>
                  </div>
                  <a
                    href="/simulari/Mix/Reprezentari3d.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              {/* Pendulul amortizat */}
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Pendulul amortizat</h2>
                <p className="text-muted-foreground mb-6">
                  Pendulul amortizat este un sistem oscilatoriu în care oscilațiile sunt reduse treptat datorită forțelor de frecare sau rezistență, 
                  cum ar fi aerul sau alte medii. Acest tip de pendul este important pentru înțelegerea fenomenelor reale în care energia este disipată.
                </p>
                <p className="text-muted-foreground mb-6">
                  În sistemele reale, energia oscilatorie este constant disipată prin frecare, rezistență aerodinamică sau alte mecanisme de amortizare. 
                  Acest lucru duce la o scădere graduală a amplitudinii oscilațiilor până când sistemul se oprește complet.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={simulatorPendulAmortizatImg}
                    alt="Pendulul Amortizat"
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule pentru pendulul amortizat:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Ecuația de mișcare:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( m\\frac{d^2x}{dt^2} + b\\frac{dx}{dt} + kx = 0 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Coeficientul de amortizare:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\gamma = \\frac{b}{2m} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Frecvența naturală:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\omega_0 = \\sqrt{\\frac{k}{m}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Frecvența amortizată:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\omega_d = \\sqrt{\\omega_0^2 - \\gamma^2} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Soluția pentru oscilații subamortizate:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( x(t) = A_0 e^{-\\gamma t} \\cos(\\omega_d t + \\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Decrementul logaritmic:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\delta = \\ln\\frac{A_n}{A_{n+1}} = \\gamma T_d \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">7. Factorul de calitate:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( Q = \\frac{\\omega_0}{2\\gamma} = \\frac{\\pi}{\\delta} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: m este masa, b este coeficientul de amortizare, k este constanta elastică, {"\\(\\gamma\\)"} <MathJaxRender /> este coeficientul de amortizare, 
                      {"\\(\\omega_0\\)"} <MathJaxRender /> este frecvența naturală, {"\\(\\omega_d\\)"} <MathJaxRender /> este frecvența amortizată, 
                      A₀ este amplitudinea inițială, δ este decrementul logaritmic, Q este factorul de calitate.
                    </p>
                  </div>
                  <a
                    href="/simulari/Mix/Oscilatie-amortizata.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              {/* Pendulul neliniar */}
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Pendulul simplu neliniar</h2>
                <p className="text-muted-foreground mb-6">
                  Pendulul simplu neliniar este compus dintr-o masă (punctuală) legată de un fir inextensibil, care oscilează sub acțiunea gravitației, 
                  fără a aproxima unghiul. Pentru unghiuri mari, soluția nu mai este sinusoidală, iar perioada depinde de amplitudinea oscilației.
                </p>
                <p className="text-muted-foreground mb-6">
                  Acest sistem prezintă comportament neliniar complex, inclusiv haos pentru anumite condiții inițiale. 
                  Studiul pendulului neliniar este esențial pentru înțelegerea sistemelor dinamice complexe și a fenomenelor de haos.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={simulatorTrasnitPendulImg}
                    alt="Pendulul Mecanic"
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule pentru pendulul neliniar:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Ecuația de mișcare:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\frac{d^2\\phi}{dt^2} + \\frac{g}{l} \\sin\\phi = 0 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Energia totală:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( E = \\frac{1}{2}ml^2\\left(\\frac{d\\phi}{dt}\\right)^2 + mgl(1 - \\cos\\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Perioada pentru oscilații mari:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( T = 4\\sqrt{\\frac{l}{g}}K(k) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Integrala eliptică completă:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( K(k) = \\int_0^{\\pi/2} \\frac{d\\theta}{\\sqrt{1 - k^2\\sin^2\\theta}} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Parametrul eliptic:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( k = \\sin\\frac{\\phi_0}{2} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Soluția aproximativă pentru unghiuri mari:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\phi(t) \\approx \\phi_0 \\cos(\\omega t) + \\frac{\\phi_0^3}{24} \\cos(3\\omega t) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: {"\\(\\phi\\)"} <MathJaxRender /> este unghiul de deviație, l este lungimea firului, g este accelerația gravitațională, 
                      E este energia totală, K(k) este integrala eliptică completă, k este parametrul eliptic, {"\\(\\phi_0\\)"} <MathJaxRender /> este amplitudinea unghiulară.
                    </p>
                  </div>
                  <a
                    href="/simulari/Mix/Pendul-amplitudine.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default PendulePage;
