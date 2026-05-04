// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    const systemVal = document.getElementById('systemVal');
    const kursSektion = document.getElementById('kurs-sektion');
    const valavkursGy11 = document.getElementById('valavkurs-gy11');
    const valavkursGy25 = document.getElementById('valavkurs-gy25');
    const kursValGy11 = document.getElementById('kursVal-gy11');
    const kursValGy25 = document.getElementById('kursVal-gy25');
    const betygSektion = document.getElementById('betyg-sektion');
    const dynamiskRubrik = document.getElementById('rubrik');

    // Skapa en container för att visa krav (om den saknas)
    let kravContainer = document.getElementById('krav-container');
    if (!kravContainer) {
        kravContainer = document.createElement('div');
        kravContainer.id = 'krav-container';
        kravContainer.className = 'krav';
        betygSektion.insertAdjacentElement('afterend', kravContainer);
    }

    const kriterier = {
        sam1b: {
            E: 'Sam1b E: Grundläggande kunskaper och förståelse.',
            C: 'Sam1b C: God förmåga att analysera och förklara.',
            A: 'Sam1b A: Mycket god förmåga och självständigt resonemang.'
        },
        sam2: {
            E: 'Sam2 E: Grundläggande kunskaper för Samhällskunskap 2.',
            C: 'Sam2 C: Utvecklade kunskaper och resonemang.',
            A: 'Sam2 A: Välutvecklade och självständiga analyser.'
        },
        sam3: {
            E: 'Sam3 E: Grundläggande kunskaper för Samhällskunskap 3.',
            C: 'Sam3 C: Utvecklade kunskaper och resonemang.',
            A: 'Sam3 A: Välutvecklade och självständiga analyser.'
        },
        sam_n1: {
            E: 'Nivå1 E: Grundläggande nivå 1.',
            C: 'Nivå1 C: Utvecklad nivå 1.',
            A: 'Nivå1 A: Välutvecklad nivå 1.'
        },
        sam_n2: {
            E: 'Nivå2 E: Grundläggande nivå 2.',
            C: 'Nivå2 C: Utvecklad nivå 2.',
            A: 'Nivå2 A: Välutvecklad nivå 2.'
        },

          sam_n3: {
            E: 'Nivå3 E: Grundläggande nivå 3.',
            C: 'Nivå3 C: Utvecklad nivå 3.',
            A: 'Nivå3 A: Välutvecklad nivå 3.'
        },
    };

    // Exponera funktioner globalt så de fungerar med dina inline-onchange/onclick
    window.bytSystem = function bytSystem() {
        const v = systemVal.value;
        // Nollställ
        kravContainer.innerHTML = '';
        kursValGy11.value = '';
        kursValGy25.value = '';

        if (!v) {
            kursSektion.classList.add('gömd');
            valavkursGy11.classList.add('gömd');
            valavkursGy25.classList.add('gömd');
            betygSektion.classList.add('gömd');
            return;
        }

        kursSektion.classList.remove('gömd');
        if (v === 'gy11') {
            valavkursGy11.classList.remove('gömd');
            valavkursGy25.classList.add('gömd');
            dynamiskRubrik.textContent = 'Välj din kurs (Gy11)';
        } else {
            valavkursGy25.classList.remove('gömd');
            valavkursGy11.classList.add('gömd');
            dynamiskRubrik.textContent = 'Välj din nivå (Gy25)';
        }

        betygSektion.classList.add('gömd'); // visa först när kurs valts
    };

    window.visaKnappar = function visaKnappar() {
        const kurs = getSelectedCourse();
        kravContainer.innerHTML = '';
        if (kurs) {
            betygSektion.classList.remove('gömd');
        } else {
            betygSektion.classList.add('gömd');
        }
    };

    window.visaKrav = function visaKrav(betyg) {
        const kurs = getSelectedCourse();
        if (!kurs) return;
        const text = (kriterier[kurs] && kriterier[kurs][betyg]) ? kriterier[kurs][betyg] : 'Inga krav hittades för denna kurs/betyg.';
        kravContainer.innerHTML = `<h4>${getCourseLabel(kurs)} — Betyg ${betyg}</h4><p>${text}</p>`;
    };

    function getSelectedCourse() {
        return systemVal.value === 'gy11' ? kursValGy11.value : kursValGy25.value;
    }

    function getCourseLabel(key) {
        const map = {
            sam1b: 'Samhällskunskap 1b',
            sam2: 'Samhällskunskap 2',
            sam_n1: 'Samhällskunskap nivå 1',
            sam_n2: 'Samhällskunskap nivå 2'
        };
        return map[key] || key;
    }
    
});