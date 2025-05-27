export const problemeData = [
  {
    id: '1',
    index: 1,
    titlu: 'Viteza undei P (Seism)',
    descriere: 'Calculul vitezei undelor primare în timpul unui seism',
    categorie: 'seisme',
    dificultate: 'usoare',
    cerinte: ['Calculează viteza', 'Determină timpul de propagare'],
    subpuncte: [
      {
        id: '1a',
        cerinta: 'Calculează viteza undei P știind că distanța este 150 km și timpul de propagare este 25 s',
        punctaj: 3
      },
      {
        id: '1b',
        cerinta: 'Determină timpul necesar pentru a parcurge 200 km',
        punctaj: 2
      }
    ],
    punctajTotal: 5,
    continut: 'Pentru undele seismice P (primare), viteza se calculează folosind formula v = d/t, unde d este distanța parcursă și t este timpul de propagare.',
    formule: ['v = d/t', 't = d/v'],
    date: {
      distanta: 150,
      timp: 25,
      unitate_viteza: 'km/s'
    }
  },
  {
    id: '2',
    index: 2,
    titlu: 'Viteza undei S (Seism)',
    descriere: 'Calculul vitezei undelor secundare în timpul unui seism',
    categorie: 'seisme',
    dificultate: 'usoare',
    cerinte: ['Calculează viteza', 'Compară cu undele P'],
    subpuncte: [
      {
        id: '2a',
        cerinta: 'Calculează viteza undei S pentru aceeași distanță de 150 km parcursă în 45 s',
        punctaj: 3
      },
      {
        id: '2b',
        cerinta: 'Compară vitezele undelor P și S și explică diferența',
        punctaj: 4
      }
    ],
    punctajTotal: 7,
    continut: 'Undele S (secundare) se propagă mai lent decât undele P. Această diferență de viteză permite determinarea distanței până la epicentrul seismului.',
    formule: ['v_S = d/t_S', 'Δt = t_S - t_P'],
    date: {
      distanta: 150,
      timp_S: 45,
      timp_P: 25
    }
  },
  // ... restul obiectelor la fel, fără modificări
];
