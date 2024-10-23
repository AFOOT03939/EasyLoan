document.addEventListener('DOMContentLoaded', function() {
    const startTutorialBtn = document.getElementById('startTutorial');
    const selectElement = document.getElementById('frequency');
    const loanTermInput = document.getElementById('loanTerm');
    const loanAmountInput = document.getElementById('loanAmount');
    const loanForm = document.getElementById('loanForm');
    let termAmount;
    let finalAmount;
    let rate = 0;

    startTutorialBtn.addEventListener('click', function() {
        introJs().setOptions({
            steps: [
                {
                    element: document.querySelector('[data-step="1"]'),
                    intro: "Aquí ingresa el monto total del préstamo que desea solicitar."
                },
                {
                    element: document.querySelector('[data-step="2"]'),
                    intro: "Este es el porcentaje de interés aplicable a su préstamo."
                },
                {
                    element: document.querySelector('[data-step="3"]'),
                    intro: "Seleccione el tipo de plazo de los pagos (semanal, quincenal o mensual)."
                },
                {
                    element: document.querySelector('[data-step="4"]'),
                    intro: "Ingrese la duración del préstamo según su elección anterior"
                },
                {
                    element: document.querySelector('[data-step="5"]'),
                    intro: "Aquí se mostrará el pago por cada período según su selección."
                },
                {
                    element: document.querySelector('[data-step="6"]'),
                    intro: "Aquí se mostrará el pago total dependiendo de los plazos y el monto inicial."
                },
                {
                    element: document.querySelector('[data-step="7"]'),
                    intro: "Haga clic aquí para calcular su préstamo basado en la información proporcionada."
                }
            ]
        }).start();
    });

    function InterestRateC(divider) {
        const anualInterestRate = 0.15; 
        return anualInterestRate / divider;
    }

    function CalculateQuote(P, r, n) {
        const cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return cuota;
    }

    function updateLoanTermLimits() {
        let minTerm, maxTerm;
        
        switch (selectElement.value) {
            case 'Mensual':
                minTerm = 3;
                maxTerm = 16;
                break;
            case 'Quincenal':
                minTerm = 4;
                maxTerm = 40;
                break;
            case 'Semanal':
                minTerm = 6;
                maxTerm = 52;
                break;
            default:
                minTerm = 1;
                maxTerm = 100;
        }
        
        loanTermInput.min = minTerm;
        loanTermInput.max = maxTerm;
        
        const currentValue = parseInt(loanTermInput.value, 10);
        if (isNaN(currentValue) || currentValue < minTerm || currentValue > maxTerm) {
            loanTermInput.value = minTerm;
        }
        
        const helpText = `Seleccione un plazo entre ${minTerm} y ${maxTerm} ${selectElement.options[selectElement.selectedIndex].text.toLowerCase()}.`;
        loanTermInput.title = helpText;
        
        validateLoanTerm();
    }

    function validateLoanTerm() {
        const currentValue = parseInt(loanTermInput.value, 10);
        const minTerm = parseInt(loanTermInput.min, 10);
        const maxTerm = parseInt(loanTermInput.max, 10);
        
        if (isNaN(currentValue) || currentValue < minTerm || currentValue > maxTerm) {
            loanTermInput.setCustomValidity(`Por favor, ingrese un valor entre ${minTerm} y ${maxTerm}.`);
        } else {
            loanTermInput.setCustomValidity('');
        }
    }

    function validateLoanAmount() {
        const amount = parseFloat(loanAmountInput.value);
        if (isNaN(amount) || amount < 2500 || amount > 50000) {
            loanAmountInput.setCustomValidity('Por favor, ingrese un monto entre $2,500 y $50,000.');
        } else {
            loanAmountInput.setCustomValidity('');
        }
    }

    selectElement.addEventListener('change', function() {
        const selectedValue = selectElement.value;
        let divider = 0;

        switch (selectedValue) {
            case 'Mensual':
                divider = 12;
                break;
            case 'Quincenal':
                divider = 24;
                break;
            case 'Semanal':
                divider = 52;
                break;
        }

        rate = InterestRateC(divider);
        console.log('Tasa de interés por periodo: ', rate);

        updateLoanTermLimits();
    });

    loanTermInput.addEventListener('input', validateLoanTerm);
    loanAmountInput.addEventListener('input', validateLoanAmount);

    loanForm.addEventListener('submit', function(event) {
        event.preventDefault();

        validateLoanTerm();
        validateLoanAmount();

        if (!loanForm.checkValidity()) {
            loanForm.reportValidity();
            return;
        }

        const amount = parseFloat(loanAmountInput.value);
        const timeLimit = parseInt(loanTermInput.value, 10);
        const frequency = selectElement.value;

        let periods;
        switch (frequency) {
            case 'Mensual':
                periods = timeLimit;
                break;
            case 'Quincenal':
                periods = timeLimit * 2;
                break;
            case 'Semanal':
                periods = timeLimit * 4;
                break;
        }

        const quote = CalculateQuote(amount, rate, periods);
        const totalPayment = quote * periods;
        termAmount = quote;
        finalAmount = totalPayment;

        document.getElementById('termAmount').value = quote.toFixed(2);
        document.getElementById('totalPayment').value = totalPayment.toFixed(2);

        console.log('Cuota:', quote);
        console.log('Pago total:', totalPayment);
    });

    rate = InterestRateC(12);
    updateLoanTermLimits();
    validateLoanAmount();


    const confirmBtn = document.getElementById('confirmBtn');

    confirmBtn.addEventListener('click', function() {
        
        // Promesa para esperar a que termAmount tenga un valor definido
        new Promise((resolve) => {
            if (termAmount && finalAmount) {
                resolve();
            } else {
                // Si termAmount no está definido, espera un momento y verifica nuevamente para continuar
                const interval = setInterval(() => {
                    if (termAmount && finalAmount) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100); // Comprueba cada 100 ms
            }
        }).then(() => {
            const amount = loanAmountInput.value;
            const frequency = selectElement.value;
            const term = loanTermInput.value;
            // creación del botón de continuar
            const container = document.getElementById('results-container');
            let proceedContainer = document.getElementById('proceed');
            proceedContainer.innerHTML += `<button type="submit" id="proceedBtn" class="btn btn-success btn-lg">Continuar</button>`;
            let proceedBtn = document.getElementById('proceedBtn');
            proceedBtn.addEventListener('click', function() {
                new Promise((resolve) => {
                    if (proceedContainer) {
                        resolve();
                    } else {
                        // Si termAmount no está definido, espera un momento y verifica nuevamente para continuar
                        const interval = setInterval(() => {
                            if (proceedContainer) {
                                clearInterval(interval);
                                resolve();
                            }
                        }, 100); // Comprueba cada 100 ms
                    }
                }).then(() => {
                    container.scrollIntoView({ behavior: 'smooth' });
                });
            })
            container.innerHTML = `
            <div class="card shadow">
                <div class="card-body">
                <h2 class="section-title text-center mb-4">Confirmación del préstamo</h2>
                <div class="row">
                    <div class="col-md-6 mb-3 mb-md-0">
                    <div class="info-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <span class="fw-bold">Monto del préstamo:</span>
                        <span>$${amount}</span>
                    </div>
                    <div class="info-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <span class="fw-bold">Tipo de plazo:</span>
                        <span>${frequency}</span>
                    </div>
                    <div class="info-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <span class="fw-bold">Pago por plazo:</span>
                        <span>$${termAmount.toFixed(2)}</span>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="info-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <span class="fw-bold">Tasa de interés:</span>
                        <span>${(rate * 100).toFixed(2)}%</span>
                    </div>
                    <div class="info-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <span class="fw-bold">Plazo:</span>
                        <span>${term}</span>
                    </div>
                    <div class="info-item">
                        <i class="bi bi-check-circle-fill text-success me-2"></i>
                        <span class="fw-bold">Pago total:</span>
                        <span>$${finalAmount.toFixed(2)}</span>
                    </div>
                    </div>
                </div>
                <div class="text-center mt-4">
                    <button id="accept-loan" class="btn btn-primary btn-lg w-100">Aceptar préstamo</button>
                </div>
                </div>
            </div>
            `;
        const acceptLoanBtn = document.getElementById('accept-loan');
        acceptLoanBtn.addEventListener('click', function() {
            alert('Préstamo aceptado');
        });
    });
});
});
