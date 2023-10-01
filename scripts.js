document.getElementById("addButton").addEventListener("click", function() {
    document.getElementById("addModal").style.display = "block";
});

document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById("addModal").style.display = "none";
});

document.getElementById("addForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const card = createCard();
    insertCardInOrder(card);
    this.reset();
    document.getElementById("addModal").style.display = "none";
});

function createCard() {
    const card = document.createElement("div");
    card.className = "card";
    
    const briefInfo = document.createElement("div");
    briefInfo.className = "brief-info";
    briefInfo.innerHTML = `
        <strong>${document.getElementById("appointmentDate").value} - ${document.getElementById("appointmentTime").value}</strong>
        <p>${document.getElementById("name").value}</p>
        <p>${document.getElementById("phone").value}</p>
    `;
    card.appendChild(briefInfo);
    
    const fullInfo = document.createElement("div");
    fullInfo.className = "full-info";
    fullInfo.style.display = "none"; // Escondendo inicialmente
    fullInfo.innerHTML = `
        <p><strong>Data de Nascimento:</strong> ${document.getElementById("birthdate").value}</p>
        <p><strong>CPF: </strong>${document.getElementById("cpf").value}</p>
        <p><strong>Cidade:</strong> ${document.getElementById("city").value}</p>
        <p><strong>Rua:</strong> ${document.getElementById("street").value}</p>
    `;
    card.appendChild(fullInfo);
    
    card.addEventListener("click", function() {
        if (fullInfo.style.display === "none") {
            fullInfo.style.display = "block";
        } else {
            fullInfo.style.display = "none";
        }
    });
    
    const rightSide = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.display = "none"; // Inicialmente oculto
    checkbox.addEventListener("click", function(event) {
        const shouldRemove = window.confirm("Deseja remover este agendamento?");
        if (shouldRemove) {
            card.remove();
        } else {
            // Se o usuário clicar em "Cancelar", desmarcamos o checkbox
            event.preventDefault();
        }
    });
    rightSide.appendChild(checkbox);
    card.appendChild(rightSide);

    card.addEventListener("click", function() {
        // Mostrar o checkbox ao clicar no card
        checkbox.style.display = "block";
        
        // ... [restante do código para mostrar/ocultar informações completas]
    });

    // ... [restante do código]

    return card;
    
}

function insertCardInOrder(card) {
    const cards = document.querySelectorAll("#cardsContainer .card");
    if (cards.length === 0) {
        document.getElementById("cardsContainer").appendChild(card);
        return;
    }

    let inserted = false;
    cards.forEach(existingCard => {
        if (!inserted && (card.dataset.date < existingCard.dataset.date || 
            (card.dataset.date === existingCard.dataset.date && card.dataset.time < existingCard.dataset.time))) {
            existingCard.before(card);
            inserted = true;
        }
    });

    if (!inserted) {
        document.getElementById("cardsContainer").appendChild(card);
    }
}

// ... [restante do código anterior]

checkbox.addEventListener("click", function(event) {
    const shouldRemove = window.confirm("Deseja remover este agendamento?");
    if (shouldRemove) {
        card.remove();
    } else {
        // Se o usuário clicar em "Cancelar", desmarcamos o checkbox
        event.preventDefault();
    }
});

// ... [restante do código anterior]
