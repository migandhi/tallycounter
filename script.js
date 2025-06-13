document.addEventListener('DOMContentLoaded', () => {
    const addCounterBtn = document.getElementById('addCounterBtn');
    let counterId = 1; // For unique IDs if multiple counters are added

    function initializeCounter(container) {
        const countDisplay = container.querySelector('.count');
        const incrementBtn = container.querySelector('.increment');
        const decrementBtn = container.querySelector('.decrement');
        const resetBtn = container.querySelector('.reset-counter');
        const startValueInput = container.querySelector('.start-value-input');
        const setStartValueBtn = container.querySelector('.set-start-value');
        const counterNameInput = container.querySelector('.counter-name-input');
        const setCounterNameBtn = container.querySelector('.set-counter-name');
        const counterNameDisplay = container.querySelector('.counter-name-display');
        const closeBtn = container.querySelector('.close-btn');

        let count = 0;

        function updateDisplay() {
            countDisplay.textContent = count;
        }

        incrementBtn.addEventListener('click', () => {
            count++;
            updateDisplay();
        });

        decrementBtn.addEventListener('click', () => {
            if (count > 0) { // Optional: prevent negative counts
                count--;
                updateDisplay();
            }
        });

        resetBtn.addEventListener('click', () => {
            count = 0;
            startValueInput.value = ''; // Clear start value input
            updateDisplay();
        });

        setStartValueBtn.addEventListener('click', () => {
            const newStartValue = parseInt(startValueInput.value, 10);
            if (!isNaN(newStartValue)) {
                count = newStartValue;
                updateDisplay();
            }
            startValueInput.value = ''; // Clear input after setting
        });

        setCounterNameBtn.addEventListener('click', () => {
            const newName = counterNameInput.value.trim();
            if (newName) {
                container.querySelector('.counter-title').textContent = newName;
                counterNameDisplay.value = newName; // Update the readonly display
            }
            counterNameInput.value = ''; // Clear input after setting
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                container.remove();
            });
        }

        updateDisplay(); // Initial display update
    }

    // Initialize the first counter
    const initialCounter = document.getElementById('tallyCounter1');
    if (initialCounter) {
        initializeCounter(initialCounter);
    }

    // --- Logic for "ADD COUNTER" button ---
    addCounterBtn.addEventListener('click', () => {
        counterId++;
        const newCounterId = `tallyCounter${counterId}`;

        const newCounterHTML = `
            <div class="counter-header">
                <span class="counter-title">Tally Counter ${counterId}</span>
                <button class="close-btn" data-target="${newCounterId}">×</button>
            </div>
            <div class="counter-display">
                <input type="text" class="counter-name-display" value="Tally Counter ${counterId}" readonly>
                <span class="count">0</span>
            </div>
            <div class="counter-controls">
                <button class="control-btn decrement">-</button>
                <button class="control-btn increment">+</button>
            </div>
            <div class="counter-settings">
                <button class="setting-btn reset-counter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                      </svg>
                     RESET COUNTER
                </button>
                <div class="setting-input-group">
                    <input type="number" class="start-value-input" placeholder="0">
                    <button class="setting-btn set-start-value">SET START VALUE</button>
                </div>
                <div class="setting-input-group">
                    <input type="text" class="counter-name-input" placeholder="Counter Name">
                    <button class="setting-btn set-counter-name">SET COUNTER NAME</button>
                </div>
            </div>
        `;

        const newCounterDiv = document.createElement('div');
        newCounterDiv.classList.add('counter-container');
        newCounterDiv.id = newCounterId;
        newCounterDiv.innerHTML = newCounterHTML;

        document.body.appendChild(newCounterDiv);
        initializeCounter(newCounterDiv); // Initialize the new counter
    });
});