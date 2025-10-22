// Variables globales
        let currentMode = 'individuel';
        let nombreSacs = 0;
        let sacsPoids = [];
        let prixParKilo = 0;
        let nombrePersonnes = 0;
        let personnesData = [];

        // Fonction pour changer de mode
        function setMode(mode) {
            currentMode = mode;
            
            // Mise à jour des boutons
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Affichage des sections appropriées
            if (mode === 'cooperative') {
                document.getElementById('cooperativeMode').style.display = 'block';
                document.getElementById('individuelMode').style.display = 'none';
            } else {
                document.getElementById('cooperativeMode').style.display = 'none';
                document.getElementById('individuelMode').style.display = 'block';
            }
            
            // Réinitialiser
            reinitialiser();
        }

        // Écouteurs d'événements pour le mode individuel
        document.getElementById('nombreSacs').addEventListener('input', function() {
            nombreSacs = parseInt(this.value) || 0;
            
            if (nombreSacs > 0 && nombreSacs <= 100) {
                genererChampsSacs();
                document.getElementById('sacsContainer').style.display = 'block';
                document.getElementById('prixGroup').style.display = 'block';
                hideMessage();
            } else if (nombreSacs > 100) {
                showError('Le nombre de sacs ne peut pas dépasser 100.');
                document.getElementById('sacsContainer').style.display = 'none';
                document.getElementById('prixGroup').style.display = 'none';
                document.getElementById('buttonGroup').style.display = 'none';
            } else {
                document.getElementById('sacsContainer').style.display = 'none';
                document.getElementById('prixGroup').style.display = 'none';
                document.getElementById('buttonGroup').style.display = 'none';
                document.getElementById('resultsSection').style.display = 'none';
            }
        });

        // Écouteur d'événement pour le mode coopérative
        document.getElementById('nombrePersonnes').addEventListener('input', function() {
            nombrePersonnes = parseInt(this.value) || 0;
            
            if (nombrePersonnes > 0 && nombrePersonnes <= 50) {
                genererChampsPersonnes();
                document.getElementById('personnesContainer').style.display = 'block';
                document.getElementById('prixGroup').style.display = 'block';
                hideMessage();
            } else if (nombrePersonnes > 50) {
                showError('Le nombre de membres ne peut pas dépasser 50.');
                document.getElementById('personnesContainer').style.display = 'none';
                document.getElementById('prixGroup').style.display = 'none';
                document.getElementById('buttonGroup').style.display = 'none';
            } else {
                document.getElementById('personnesContainer').style.display = 'none';
                document.getElementById('prixGroup').style.display = 'none';
                document.getElementById('buttonGroup').style.display = 'none';
                document.getElementById('resultsSection').style.display = 'none';
            }
        });

        // Écouteur d'événement pour le prix
        document.getElementById('prixKilo').addEventListener('input', function() {
            prixParKilo = parseFloat(this.value) || 0;
            verifierFormulaire();
        });

        // Fonction pour générer les champs de saisie des poids (mode individuel)
        function genererChampsSacs() {
            const sacsList = document.getElementById('sacsList');
            sacsList.innerHTML = '';
            sacsPoids = [];

            for (let i = 1; i <= nombreSacs; i++) {
                const sacItem = document.createElement('div');
                sacItem.className = 'sac-item';
                sacItem.innerHTML = `
                    <label for="sac${i}">Sac ${i} :</label>
                    <input type="number" id="sac${i}" min="0" step="0.01" placeholder="Poids en kg" 
                           oninput="updatePoids(${i-1}, this.value)">
                `;
                sacsList.appendChild(sacItem);
                sacsPoids.push(0);
            }
        }

        // Fonction pour générer les champs pour les personnes (mode coopérative)
        function genererChampsPersonnes() {
            const personnesContainer = document.getElementById('personnesContainer');
            personnesContainer.innerHTML = '';
            personnesData = [];

            for (let i = 1; i <= nombrePersonnes; i++) {
                const personneSection = document.createElement('div');
                personneSection.className = 'personne-section';
                personneSection.innerHTML = `
                    <div class="personne-header">
                        👤 Membre ${i}
                    </div>
                    <div class="personne-content">
                        <div class="input-group">
                            <label for="nombreSacs${i}">Nombre de sacs :</label>
                            <input type="number" id="nombreSacs${i}" min="0" max="50" 
                                   placeholder="Nombre de sacs" 
                                   oninput="updatePersonneSacs(${i-1}, this.value)">
                        </div>
                        <div class="sacs-container" id="sacsPersonne${i}" style="display: none;">
                            <div id="sacsListPersonne${i}"></div>
                        </div>
                    </div>
                `;
                personnesContainer.appendChild(personneSection);
                personnesData.push({
                    nombreSacs: 0,
                    poids: []
                });
            }
        }

        // Fonction pour mettre à jour le nombre de sacs d'une personne
        function updatePersonneSacs(personneIndex, value) {
            const nombreSacsPersonne = parseInt(value) || 0;
            personnesData[personneIndex].nombreSacs = nombreSacsPersonne;
            personnesData[personneIndex].poids = [];

            const sacsContainer = document.getElementById(`sacsPersonne${personneIndex + 1}`);
            const sacsList = document.getElementById(`sacsListPersonne${personneIndex + 1}`);

            if (nombreSacsPersonne > 0) {
                sacsList.innerHTML = '';
                for (let i = 1; i <= nombreSacsPersonne; i++) {
                    const sacItem = document.createElement('div');
                    sacItem.className = 'sac-item';
                    sacItem.innerHTML = `
                        <label>Sac ${i} :</label>
                        <input type="number" min="0" step="0.01" placeholder="Poids en kg" 
                               oninput="updatePersonnePoids(${personneIndex}, ${i-1}, this.value)">
                    `;
                    sacsList.appendChild(sacItem);
                    personnesData[personneIndex].poids.push(0);
                }
                sacsContainer.style.display = 'block';
            } else {
                sacsContainer.style.display = 'none';
            }
            
            verifierFormulaire();
        }

        // Fonction pour mettre à jour le poids d'un sac d'une personne
        function updatePersonnePoids(personneIndex, sacIndex, value) {
            personnesData[personneIndex].poids[sacIndex] = parseFloat(value) || 0;
            verifierFormulaire();
        }

        // Fonction pour mettre à jour le poids d'un sac (mode individuel)
        function updatePoids(index, value) {
            sacsPoids[index] = parseFloat(value) || 0;
            verifierFormulaire();
        }

        // Fonction pour vérifier si le formulaire est complet
        function verifierFormulaire() {
            let formulaireComplet = false;
            const prixSaisi = prixParKilo > 0;

            if (currentMode === 'individuel') {
                const tousPoidsSaisis = sacsPoids.length > 0 && sacsPoids.every(poids => poids > 0);
                formulaireComplet = tousPoidsSaisis && prixSaisi;
            } else if (currentMode === 'cooperative') {
                const toutesPersonnesCompletes = personnesData.length > 0 && 
                    personnesData.every(personne => 
                        personne.nombreSacs > 0 && 
                        personne.poids.length === personne.nombreSacs &&
                        personne.poids.every(poids => poids > 0)
                    );
                formulaireComplet = toutesPersonnesCompletes && prixSaisi;
            }

            document.getElementById('buttonGroup').style.display = formulaireComplet ? 'block' : 'none';
        }

        // Fonction principale de calcul
        function calculerTotal() {
            try {
                if (currentMode === 'individuel') {
                    calculerIndividuel();
                } else {
                    calculerCooperative();
                }
                showSuccess('Calculs effectués avec succès !');
            } catch (error) {
                showError('Une erreur est survenue lors du calcul. Veuillez réessayer.');
                console.error('Erreur de calcul:', error);
            }
        }

        // Calcul pour mode individuel
        function calculerIndividuel() {
            if (nombreSacs <= 0 || sacsPoids.some(poids => poids <= 0) || prixParKilo <= 0) {
                showError('Veuillez remplir tous les champs correctement.');
                return;
            }

            const poidsTotal = sacsPoids.reduce((total, poids) => total + poids, 0);
            const prixTotal = poidsTotal * prixParKilo;

            afficherResultatsIndividuel(poidsTotal, prixTotal);
        }

        // Calcul pour mode coopérative
        function calculerCooperative() {
            if (nombrePersonnes <= 0 || prixParKilo <= 0) {
                showError('Veuillez remplir tous les champs correctement.');
                return;
            }

            let poidsGrandTotal = 0;
            let prixGrandTotal = 0;
            const resultatsPersonnes = [];

            personnesData.forEach((personne, index) => {
                if (personne.nombreSacs > 0 && personne.poids.length > 0) {
                    const poidsPersonne = personne.poids.reduce((total, poids) => total + poids, 0);
                    const prixPersonne = poidsPersonne * prixParKilo;
                    
                    resultatsPersonnes.push({
                        index: index + 1,
                        nombreSacs: personne.nombreSacs,
                        poids: personne.poids,
                        poidsTotal: poidsPersonne,
                        prixTotal: prixPersonne
                    });
                    
                    poidsGrandTotal += poidsPersonne;
                    prixGrandTotal += prixPersonne;
                }
            });

            afficherResultatsCooperative(resultatsPersonnes, poidsGrandTotal, prixGrandTotal);
        }

        // Affichage des résultats individuels
        function afficherResultatsIndividuel(poidsTotal, prixTotal) {
            const resultsList = document.getElementById('resultsList');
            resultsList.innerHTML = '';

            // Détail par sac
            sacsPoids.forEach((poids, index) => {
                const prixSac = poids * prixParKilo;
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <span>Sac ${index + 1} (${poids.toFixed(2)} kg)</span>
                    <span class="result-value">${prixSac.toLocaleString('fr-FR')} FCFA</span>
                `;
                resultsList.appendChild(resultItem);
            });

            // Totaux
            const poidsItem = document.createElement('div');
            poidsItem.className = 'result-item';
            poidsItem.innerHTML = `
                <span>Poids total</span>
                <span class="result-value">${poidsTotal.toFixed(2)} kg</span>
            `;
            resultsList.appendChild(poidsItem);

            const totalItem = document.createElement('div');
            totalItem.className = 'result-item grand-total';
            totalItem.innerHTML = `💰 TOTAL : ${prixTotal.toLocaleString('fr-FR')} FCFA`;
            resultsList.appendChild(totalItem);

            document.getElementById('resultsSection').style.display = 'block';
            document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
        }

        // Affichage des résultats coopérative
        function afficherResultatsCooperative(resultatsPersonnes, poidsGrandTotal, prixGrandTotal) {
            const resultsList = document.getElementById('resultsList');
            resultsList.innerHTML = '';

            // Résultats par personne
            resultatsPersonnes.forEach(personne => {
                const personneDiv = document.createElement('div');
                personneDiv.className = 'personne-result';
                
                let detailSacs = '';
                personne.poids.forEach((poids, index) => {
                    const prixSac = poids * prixParKilo;
                    detailSacs += `
                        <div class="result-item">
                            <span>Sac ${index + 1} (${poids.toFixed(2)} kg)</span>
                            <span class="result-value">${prixSac.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                    `;
                });

                personneDiv.innerHTML = `
                    <div class="personne-result-header">
                        👤 Membre ${personne.index} - ${personne.nombreSacs} sac(s)
                    </div>
                    <div class="personne-result-content">
                        ${detailSacs}
                        <div class="result-item">
                            <span><strong>Poids total membre ${personne.index}</strong></span>
                            <span class="result-value"><strong>${personne.poidsTotal.toFixed(2)} kg</strong></span>
                        </div>
                        <div class="result-item">
                            <span><strong>Total membre ${personne.index}</strong></span>
                            <span class="total-value">${personne.prixTotal.toLocaleString('fr-FR')} FCFA</span>
                        </div>
                    </div>
                `;
                resultsList.appendChild(personneDiv);
            });

            // Grand total coopérative
            const grandTotalDiv = document.createElement('div');
            grandTotalDiv.className = 'grand-total';
            grandTotalDiv.innerHTML = `
                <div>🏢 TOTAL COOPÉRATIVE</div>
                <div>Poids total : ${poidsGrandTotal.toFixed(2)} kg</div>
                <div>Prix total : ${prixGrandTotal.toLocaleString('fr-FR')} FCFA</div>
            `;
            resultsList.appendChild(grandTotalDiv);

            document.getElementById('resultsSection').style.display = 'block';
            document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
        }

        // Fonctions pour afficher les messages
        function showError(message) {
            const errorDiv = document.getElementById('errorMessage');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
        }

        function showSuccess(message) {
            const successDiv = document.getElementById('successMessage');
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
        }

        function hideMessage() {
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('successMessage').style.display = 'none';
        }

        // Fonction pour réinitialiser le formulaire
        function reinitialiser() {
            // Réinitialiser les champs communs
            document.getElementById('prixKilo').value = '';
            document.getElementById('prixGroup').style.display = 'none';
            document.getElementById('buttonGroup').style.display = 'none';
            document.getElementById('resultsSection').style.display = 'none';
            
            // Réinitialiser selon le mode
            if (currentMode === 'individuel') {
                document.getElementById('nombreSacs').value = '';
                document.getElementById('sacsContainer').style.display = 'none';
                nombreSacs = 0;
                sacsPoids = [];
            } else {
                document.getElementById('nombrePersonnes').value = '';
                document.getElementById('personnesContainer').style.display = 'none';
                nombrePersonnes = 0;
                personnesData = [];
            }
            
            prixParKilo = 0;
            hideMessage();
        }
