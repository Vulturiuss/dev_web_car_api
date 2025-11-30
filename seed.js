const db = require('./database');

// Données de test
const sampleCars = [
  {
    brand: "Toyota",
    model: "Corolla",
    year: 2018,
    color: "Blanc",
    price: 12000,
    mileage: 60000,
    description: "Fiable, économique et très bien entretenue.",
    imageUrl: "https://images.unsplash.com/photo-1615732048173-5b1e2ea3f1c6"
  },
  {
    brand: "BMW",
    model: "3 Series",
    year: 2020,
    color: "Noir",
    price: 32000,
    mileage: 30000,
    description: "Voiture premium, moteur puissant, intérieur luxe.",
    imageUrl: "https://images.unsplash.com/photo-1615827050208-3e28bfa901d2"
  },
  {
    brand: "Mercedes",
    model: "C-Class",
    year: 2019,
    color: "Gris",
    price: 35000,
    mileage: 25000,
    description: "Modèle élégant avec options haut de gamme.",
    imageUrl: "https://images.unsplash.com/photo-1517142089942-ba376ce32a0a"
  },
  {
    brand: "Audi",
    model: "A4",
    year: 2017,
    color: "Bleu",
    price: 21000,
    mileage: 75000,
    description: "Bon état général, révisions à jour.",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
  },
  {
    brand: "Peugeot",
    model: "208",
    year: 2021,
    color: "Rouge",
    price: 16000,
    mileage: 15000,
    description: "Compacte moderne, faible consommation, idéale ville.",
    imageUrl: "https://images.unsplash.com/photo-1600718372046-6f461b9c1c1e"
  }
];

// Fonction pour insérer les données
function seedDatabase() {
  // D'abord, on vide la table
  db.run('DELETE FROM cars', (err) => {
    if (err) {
      console.error('❌ Erreur lors du vidage de la table:', err.message);
      return;
    }

    console.log('🗑️  Table vidée');

    // Puis on insère les nouvelles données
    const insertQuery = `
      INSERT INTO cars (brand, model, year, color, price, mileage, description, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let insertedCount = 0;

    sampleCars.forEach((car) => {
      db.run(
        insertQuery,
        [car.brand, car.model, car.year, car.color, car.price, car.mileage, car.description, car.imageUrl],
        (err) => {
          if (err) {
            console.error('❌ Erreur lors de l\'insertion:', err.message);
          } else {
            insertedCount++;
            console.log(`✅ Voiture insérée: ${car.brand} ${car.model}`);

            if (insertedCount === sampleCars.length) {
              console.log('\n🎉 Base de données initialisée avec succès !');
              db.close();
            }
          }
        }
      );
    });
  });
}

// Exécution du seed
seedDatabase();