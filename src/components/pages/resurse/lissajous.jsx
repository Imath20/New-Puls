import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "../../Button";
import MathJaxRender from "@/components/MathJaxRender";

import lissajousImg from "/res/screenshots/Lissajous_Screenshot.png";
import lissajousImg1 from "/res/screenshots/Lissajous_Screenshot1.png";
import Layout from "../../Layout";

const LissajousPage = () => {
  const lissajousImages = [
    { src: lissajousImg, alt: "Figuri Lissajous" },
    { src: lissajousImg1, alt: "Figuri Lissajous" }
  ];

  return (
    <Layout>
      <div className="resurse-pagina min-h-screen flex flex-col">
        <div style={{ paddingTop: "110px", flex: 1, display: "flex", flexDirection: "column" }}>
          <main className="flex-grow container mx-auto px-4 py-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Figuri Lissajous</h1>
            
            <div className="max-w-4xl mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Figurile Lissajous sunt curbe complexe formate prin suprapunerea a două mișcări oscilatorii perpendiculare cu frecvențe diferite. 
                Aceste figuri fascinante au fost descoperite de Jules Antoine Lissajous în 1857 și reprezintă un exemplu excelent de sistem dinamic complex.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Studiul figurilor Lissajous este fundamental pentru înțelegerea sistemelor oscilatorii cuplate și a comportamentului lor în spațiul fazelor. 
                Aceste figuri au aplicații importante în fizică, inginerie, muzică și multe alte domenii științifice.
              </p>
              <p className="text-lg text-muted-foreground">
                În această secțiune, explorăm matematică din spatele figurilor Lissajous, proprietățile lor fascinante și aplicațiile practice 
                în diferite domenii ale științei și tehnologiei.
              </p>
            </div>

            <div className="space-y-12">
              <div className="rounded-container">
                <h2 className="text-2xl font-bold mb-4">Simulare Figuri Lissajous</h2>
                <p className="text-muted-foreground mb-6">
                  Această simulare permite observarea formării figurilor Lissajous în timp real, demonstrând cum două oscilații perpendiculare 
                  cu frecvențe diferite se combină pentru a crea curbe complexe și frumoase.
                </p>
                <p className="text-muted-foreground mb-6">
                  Figurile Lissajous sunt generate prin parametrizarea a două mișcări oscilatorii armonice simple pe axe perpendiculare. 
                  Forma figurii depinde de raportul frecvențelor și de diferența de fază între cele două oscilații.
                </p>
                <div className="image-slider h-64 md:h-80 relative flex items-center justify-center mb-8">
                  <img
                    src={lissajousImages[0].src}
                    alt={lissajousImages[0].alt}
                    className="w-full h-full object-contain mx-auto my-auto"
                  />
                </div>
                <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formule fundamentale pentru figurile Lissajous:</h3>
                    
                    <h4 className="text-lg font-semibold mb-2">1. Ecuațiile parametrice:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( x(t) = A_1 \\sin(\\omega_1 t + \\phi_1) \\)"}
                      <MathJaxRender />
                    </div>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( y(t) = A_2 \\sin(\\omega_2 t + \\phi_2) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">2. Raportul frecvențelor:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( r = \\frac{\\omega_1}{\\omega_2} = \\frac{f_1}{f_2} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">3. Diferența de fază:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\Delta\\phi = \\phi_1 - \\phi_2 \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">4. Ecuația implicită (pentru r = 1):</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\frac{x^2}{A_1^2} + \\frac{y^2}{A_2^2} - \\frac{2xy}{A_1A_2}\\cos(\\Delta\\phi) = \\sin^2(\\Delta\\phi) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">5. Perioada figurii:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( T = \\frac{2\\pi}{\\gcd(\\omega_1, \\omega_2)} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">6. Numărul de puncte de intersecție:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( N = 2\\max(n_1, n_2) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">7. Energia totală:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( E = \\frac{1}{2}m(A_1^2\\omega_1^2 + A_2^2\\omega_2^2) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">8. Momentul unghiular:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( L = m(A_1A_2\\omega_1\\omega_2\\sin(\\Delta\\phi)) \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">9. Aria figurii (pentru r = 1):</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( A = \\pi A_1A_2|\\sin(\\Delta\\phi)| \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2">10. Parametrii de forma:</h4>
                    <div className="formula-resurse text-lg font-mono mb-4">
                      {"\\( \\alpha = \\frac{A_2}{A_1}, \\quad \\beta = \\frac{\\omega_2}{\\omega_1} \\)"}
                      <MathJaxRender />
                    </div>
                    
                    <p className="text-muted-foreground mt-4">
                      Unde: A₁, A₂ sunt amplitudinile, ω₁, ω₂ sunt vitezele unghiulare, φ₁, φ₂ sunt fazele inițiale, 
                      r este raportul frecvențelor, Δφ este diferența de fază, T este perioada, N este numărul de puncte de intersecție, 
                      E este energia totală, L este momentul unghiular, A este aria figurii, α și β sunt parametrii de forma.
                    </p>
                  </div>
                  <a
                    href="/simulari/Figuri-Lissajous/grafice.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="lg">Vezi simularea</Button>
                  </a>
                </div>
              </div>

              <div className="max-w-4xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Proprietăți matematice:</h3>
                
                <h4 className="text-lg font-semibold mb-2">A. Simetria figurilor</h4>
                <p className="text-muted-foreground mb-4">
                  Figurile Lissajous prezintă simetrie față de axele de coordonate când diferența de fază este 0° sau 180°. 
                  Pentru diferențe de fază de 90° sau 270°, figura este simetrică față de origine.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">B. Stabilitatea</h4>
                <p className="text-muted-foreground mb-4">
                  Figurile Lissajous sunt stabile când raportul frecvențelor este un număr rațional. 
                  Pentru rapoarte iraționale, figura nu se închide niciodată și umple dens întreaga zonă.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">C. Complexitatea</h4>
                <p className="text-muted-foreground mb-4">
                  Complexitatea figurii crește cu numărul de puncte de intersecție, care depinde de raportul frecvențelor. 
                  Pentru rapoarte simple (1:1, 1:2, 2:3), figurile sunt mai simple și mai ușor de analizat.
                </p>
              </div>

              <div className="max-w-4xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Aplicații practice:</h3>
                
                <h4 className="text-lg font-semibold mb-2">A. Osciloscopul</h4>
                <p className="text-muted-foreground mb-4">
                  Figurile Lissajous sunt folosite în osciloscoape pentru a compara frecvențele și fazele a două semnale. 
                  Această tehnică permite măsurarea precisă a frecvențelor și a diferențelor de fază.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">B. Muzica și acustica</h4>
                <p className="text-muted-foreground mb-4">
                  În muzică, figurile Lissajous sunt folosite pentru a analiza armonicele și consonanțele. 
                  Aceste figuri oferă o reprezentare vizuală a relațiilor între frecvențele muzicale.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">C. Ingineria mecanică</h4>
                <p className="text-muted-foreground mb-4">
                  În analiza vibrațiilor, figurile Lissajous ajută la identificarea modurilor normale de oscilație 
                  și la diagnosticarea problemelor de echilibrare în mașini rotative.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">D. Fizica cuantică</h4>
                <p className="text-muted-foreground mb-4">
                  În mecanica cuantică, figurile Lissajous apar în studiul oscilatorilor cuplați și în analiza 
                  funcțiilor de undă pentru sisteme cu simetrie bidimensională.
                </p>
              </div>

              <div className="max-w-4xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Cazuri speciale:</h3>
                
                <h4 className="text-lg font-semibold mb-2">A. Raportul 1:1</h4>
                <p className="text-muted-foreground mb-4">
                  Pentru frecvențe egale, figura este o elipsă care devine cerc când amplitudinile sunt egale și faza este 90°. 
                  Pentru fază 0° sau 180°, figura devine o linie dreaptă.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">B. Raportul 1:2</h4>
                <p className="text-muted-foreground mb-4">
                  Pentru raportul 1:2, figura are forma unui "8" când faza este 0° sau 180°. 
                  Pentru faze intermediare, figura prezintă curbe mai complexe.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">C. Raportul 2:3</h4>
                <p className="text-muted-foreground mb-4">
                  Pentru raportul 2:3, figura are forma unui "∞" (infinit) când faza este 0°. 
                  Această figură este folosită ca simbol matematic pentru infinit.
                </p>
                
                <h4 className="text-lg font-semibold mb-2">D. Rapoarte iraționale</h4>
                <p className="text-muted-foreground mb-4">
                  Pentru rapoarte iraționale (cum ar fi π:1), figura nu se închide niciodată și umple dens întreaga zonă. 
                  Aceste figuri sunt exemple de sisteme ergodice.
                </p>
              </div>

              <div className="max-w-4xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Caracteristici importante:</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Figurile Lissajous sunt generate prin suprapunerea a două oscilații perpendiculare</li>
                  <li>Forma figurii depinde de raportul frecvențelor și diferența de fază</li>
                  <li>Pentru rapoarte raționale, figura este închisă și periodică</li>
                  <li>Pentru rapoarte iraționale, figura umple dens întreaga zonă</li>
                  <li>Numărul de puncte de intersecție depinde de raportul frecvențelor</li>
                  <li>Simetria figurii depinde de diferența de fază</li>
                  <li>Figurile sunt folosite în osciloscoape pentru măsurarea frecvențelor</li>
                  <li>Aplicații în muzică, acustică și analiza vibrațiilor</li>
                  <li>Studiul figurilor Lissajous este fundamental în teoria sistemelor dinamice</li>
                  <li>Aceste figuri oferă o înțelegere vizuală a oscilațiilor cuplate</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default LissajousPage;