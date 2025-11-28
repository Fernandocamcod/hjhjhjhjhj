// --- 1. Base de Datos de Preguntas ---
const questions = [
    {
        question: "¿Cuál es la unidad básica de la vida?",
        options: ["Tejido", "Órgano", "Célula", "Molécula"],
        answer: "Célula"
    },
    {
        question: "¿Qué orgánulo es responsable de la fotosíntesis en las plantas?",
        options: ["Mitocondria", "Núcleo", "Ribosoma", "Cloroplasto"],
        answer: "Cloroplasto"
    },
    {
        question: "¿Qué biomolécula almacena la información genética?",
        options: ["Proteína", "Lípido", "ADN", "Carbohidrato"],
        answer: "ADN"
    },
    {
        question: "¿Cuál es el proceso por el que una célula se divide en dos células hijas idénticas?",
        options: ["Meiosis", "Mitosis", "Fecundación", "Diferenciación"],
        answer: "Mitosis"
    },
    {
        question: "¿Qué gas es liberado por las plantas durante la fotosíntesis?",
        options: ["Dióxido de carbono", "Nitrógeno", "Oxígeno", "Metano"],
        answer: "Oxígeno"
    },
    {
        question: "Los animales son organismos: ",
        options: ["Autótrofos", "Quimiótrofos", "Heterótrofos", "Fotótrofos"],
        answer: "Heterótrofos"
    },
    {
        question: "¿Qué estructuras proteicas aceleran las reacciones químicas en los seres vivos?",
        options: ["Hormonas", "Lípidos", "Ácidos nucleicos", "Enzimas"],
        answer: "Enzimas"
    },
    {
        question: "¿Dónde se encuentra el pigmento hemoglobina?",
        options: ["Glóbulos Blancos", "Plaquetas", "Plasma", "Glóbulos Rojos"],
        answer: "Glóbulos Rojos"
    },
    {
        question: "El estudio de los hongos se denomina:",
        options: ["Ficología", "Briología", "Micología", "Virología"],
        answer: "Micología"
    },
    {
        question: "¿Qué tipo de célula NO tiene un núcleo definido?",
        options: ["Eucariota", "Procariota", "Neurona", "Fúngica"],
        answer: "Procariota"
    }
];

// --- 2. Variables de Estado del Juego ---
let currentQuestionIndex = 0;
let score = 0;
let incorrectAnswers = []; // Para almacenar las preguntas fallidas

// --- 3. Referencias del DOM (Elementos HTML) ---
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const scoreDisplay = document.getElementById('score');
const questionCountDisplay = document.getElementById('question-count');
const resultsModal = document.getElementById('results-modal');
const finalScoreDisplay = resultsModal.querySelector('.final-score');
const incorrectQuestionsList = document.getElementById('incorrect-questions');
const restartButton = document.getElementById('restart-button');

// --- 4. Funciones del Juego ---

/** Inicia el juego y muestra el contenedor de preguntas. */
function startGame() {
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    incorrectAnswers = [];
    updateScoreDisplay();
    loadQuestion();
}

/** Carga y muestra la pregunta actual en la interfaz. */
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQ = questions[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    optionsContainer.innerHTML = ''; // Limpiar opciones anteriores
    nextButton.classList.add('hidden'); // Ocultar el botón Siguiente

    // Actualizar contador de pregunta
    questionCountDisplay.textContent = `Pregunta: ${currentQuestionIndex + 1}/${questions.length}`;

    // Crear botones para cada opción
    currentQ.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(button, option, currentQ.answer, currentQ.question, currentQ.options));
        optionsContainer.appendChild(button);
    });
}

/** Verifica la respuesta seleccionada por el usuario. */
function checkAnswer(selectedButton, selectedAnswer, correctAnswer, questionText, allOptions) {
    // 1. Deshabilitar todas las opciones para evitar múltiples clics
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.add('disabled');
    });

    // 2. Marcar la opción seleccionada
    selectedButton.classList.add('selected');

    // 3. Evaluar la respuesta
    if (selectedAnswer === correctAnswer) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        // Agregar la pregunta incorrecta al registro
        incorrectAnswers.push({
            question: questionText,
            selected: selectedAnswer,
            correct: correctAnswer
        });
        // Resaltar la respuesta correcta
        allOptions.forEach(option => {
            if (option === correctAnswer) {
                // Encontrar el botón de la respuesta correcta y marcarlo
                Array.from(optionsContainer.children).find(btn => btn.textContent === option).classList.add('correct');
            }
        });
    }

    updateScoreDisplay();
    nextButton.classList.remove('hidden');
}

/** Actualiza la visualización del puntaje. */
function updateScoreDisplay() {
    scoreDisplay.textContent = `Puntaje: ${score}`;
}

/** Pasa a la siguiente pregunta. */
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

/** Muestra la ventana modal de resultados. */
function showResults() {
    gameContainer.classList.add('hidden');
    
    // Rellenar los resultados
    finalScoreDisplay.textContent = `Puntaje Final: ${score} de ${questions.length}`;
    incorrectQuestionsList.innerHTML = '';

    if (incorrectAnswers.length === 0) {
        const li = document.createElement('li');
        li.textContent = "¡✅ Excelente! Todas las respuestas fueron correctas.";
        li.style.color = 'var(--success-color)';
        incorrectQuestionsList.appendChild(li);
    } else {
        incorrectAnswers.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>P:</strong> ${item.question}<br>
                            &nbsp;&nbsp;&nbsp;Tu Respuesta: ${item.selected}<br>
                            &nbsp;&nbsp;&nbsp;Correcta: ${item.correct}`;
            incorrectQuestionsList.appendChild(li);
        });
    }

    resultsModal.classList.remove('hidden');
}

/** Reinicia el juego. */
function restartGame() {
    resultsModal.classList.add('hidden');
    startScreen.classList.remove('hidden');
    // La función startGame() manejará el reinicio de variables
}

// --- 5. Event Listeners (Controladores de Eventos) ---

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartGame);