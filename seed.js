const db = require('./database');

// Données de test
// gith

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