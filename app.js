/**
 * International Loan Calculator - Main JavaScript File
 * Features: 
 * - Currency support for multiple international currencies
 * - Loan term with slider and input options
 * - Interest rate with slider control
 * - Multiple loan types
 * - Amortization schedule with pagination
 * - Pie chart for payment breakdown
 * - Loan comparison feature
 * - Local storage for calculation history
 * - Multi-language support (EN, ES, FR)
 */

// Currency symbols mapping
const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'AUD': 'A$',
    'CAD': 'C$',
    'CHF': 'Fr',
    'CNY': '¥',
    'SGD': 'S$',
    'NZD': 'NZ$'
};

// i18n translations
const translations = {
    'en': {
        'header.title': 'Loan Calculator',
        'header.subtitle': 'Calculate your loan payments',
        'calculator.title': 'Loan Calculator',
        'calculator.subtitle': 'Enter your loan details to calculate monthly payments',
        'form.currency': 'Currency',
        'form.amount': 'Loan Amount',
        'form.amountHint': 'Enter the principal loan amount',
        'form.term': 'Loan Term',
        'form.years': 'Years',
        'form.months': 'Months',
        'form.rate': 'Annual Interest Rate',
        'form.rateHint': 'Annual interest rate (0.1% - 20%)',
        'form.type': 'Loan Type',
        'form.method': 'Calculation Method',
        'form.amortizing': 'Amortizing',
        'form.interestOnly': 'Interest Only',
        'btn.calculate': 'Calculate',
        'btn.reset': 'Reset',
        'result.monthly': 'Monthly Payment',
        'result.total': 'Total Payment',
        'result.interest': 'Total Interest',
        'chart.title': 'Payment Breakdown',
        'chart.principal': 'Principal',
        'chart.interest': 'Interest',
        'chart.total': 'Total',
        'schedule.title': 'Amortization Schedule',
        'schedule.subtitle': 'View detailed payment breakdown',
        'schedule.payment': 'Payment #',
        'schedule.paymentAmount': 'Payment',
        'schedule.principal': 'Principal',
        'schedule.interest': 'Interest',
        'schedule.balance': 'Remaining Balance',
        'schedule.showing': 'Showing',
        'schedule.export': 'Export CSV',
        'comparison.title': 'Loan Comparison',
        'comparison.subtitle': 'Compare different loan scenarios',
        'comparison.add': 'Add Comparison',
        'history.title': 'Calculation History',
        'history.empty': 'No calculation history yet',
        'modal.title': 'Add Comparison',
        'modal.name': 'Name this scenario',
        'modal.rate': 'Interest Rate (%)',
        'modal.term': 'Term (years)',
        'modal.cancel': 'Cancel',
        'modal.add': 'Add',
        'disclaimer': 'This tool is for reference only and does not constitute financial advice. Please consult with a qualified financial advisor before making any financial decisions.',
        'error.title': 'Please fix the following errors:',
        'error.amount': 'Please enter a valid loan amount greater than 0',
        'error.term': 'Please enter a valid loan term between 1 and 30',
        'error.rate': 'Please enter a valid interest rate between 0.1 and 20',
        'error.comparisonName': 'Please enter a name for this comparison',
        'comparison.vs': 'vs'
    },
    'es': {
        'header.title': 'Calculadora de Préstamos',
        'header.subtitle': 'Calcula tus pagos de préstamo',
        'calculator.title': 'Calculadora de Préstamos',
        'calculator.subtitle': 'Ingresa los detalles de tu préstamo para calcular los pagos mensuales',
        'form.currency': 'Moneda',
        'form.amount': 'Monto del Préstamo',
        'form.amountHint': 'Ingresa el monto principal del préstamo',
        'form.term': 'Plazo del Préstamo',
        'form.years': 'Años',
        'form.months': 'Meses',
        'form.rate': 'Tasa de Interés Anual',
        'form.rateHint': 'Tasa de interés anual (0.1% - 20%)',
        'form.type': 'Tipo de Préstamo',
        'form.method': 'Método de Cálculo',
        'form.amortizing': 'Amortizable',
        'form.interestOnly': 'Solo Interés',
        'btn.calculate': 'Calcular',
        'btn.reset': 'Reiniciar',
        'result.monthly': 'Pago Mensual',
        'result.total': 'Pago Total',
        'result.interest': 'Interés Total',
        'chart.title': 'Desglose de Pagos',
        'chart.principal': 'Principal',
        'chart.interest': 'Interés',
        'chart.total': 'Total',
        'schedule.title': 'Plan de Amortización',
        'schedule.subtitle': 'Ver desglose detallado de pagos',
        'schedule.payment': 'Pago #',
        'schedule.paymentAmount': 'Pago',
        'schedule.principal': 'Principal',
        'schedule.interest': 'Interés',
        'schedule.balance': 'Saldo Restante',
        'schedule.showing': 'Mostrando',
        'schedule.export': 'Exportar CSV',
        'comparison.title': 'Comparación de Préstamos',
        'comparison.subtitle': 'Compara diferentes escenarios de préstamos',
        'comparison.add': 'Agregar Comparación',
        'history.title': 'Historial de Cálculos',
        'history.empty': 'No hay historial de cálculos aún',
        'modal.title': 'Agregar Comparación',
        'modal.name': 'Nombre de este escenario',
        'modal.rate': 'Tasa de Interés (%)',
        'modal.term': 'Plazo (años)',
        'modal.cancel': 'Cancelar',
        'modal.add': 'Agregar',
        'disclaimer': 'Esta herramienta es solo para referencia y no constituye asesoramiento financiero. Consulte a un asesor financiero calificado antes de tomar cualquier decisión financiera.',
        'error.title': 'Por favor corrige los siguientes errores:',
        'error.amount': 'Por favor ingresa un monto de préstamo válido mayor que 0',
        'error.term': 'Por favor ingresa un plazo de préstamo válido entre 1 y 30',
        'error.rate': 'Por favor ingresa una tasa de interés válida entre 0.1 y 20',
        'error.comparisonName': 'Por favor ingresa un nombre para esta comparación',
        'comparison.vs': 'vs'
    },
    'fr': {
        'header.title': 'Calculateur de Prêts',
        'header.subtitle': 'Calculez vos paiements de prêt',
        'calculator.title': 'Calculateur de Prêts',
        'calculator.subtitle': 'Entrez les détails de votre prêt pour calculer les paiements mensuels',
        'form.currency': 'Devise',
        'form.amount': 'Montant du Prêt',
        'form.amountHint': 'Entrez le montant principal du prêt',
        'form.term': 'Durée du Prêt',
        'form.years': 'Années',
        'form.months': 'Mois',
        'form.rate': 'Taux d\'Intérêt Annuel',
        'form.rateHint': 'Taux d\'intérêt annuel (0.1% - 20%)',
        'form.type': 'Type de Prêt',
        'form.method': 'Méthode de Calcul',
        'form.amortizing': 'Amortissable',
        'form.interestOnly': 'Intérêts Seulement',
        'btn.calculate': 'Calculer',
        'btn.reset': 'Réinitialiser',
        'result.monthly': 'Paiement Mensuel',
        'result.total': 'Paiement Total',
        'result.interest': 'Intérêts Totaux',
        'chart.title': 'Détail des Paiements',
        'chart.principal': 'Principal',
        'chart.interest': 'Intérêts',
        'chart.total': 'Total',
        'schedule.title': 'Calendrier d\'Amortissement',
        'schedule.subtitle': 'Voir le détail des paiements',
        'schedule.payment': 'Paiement #',
        'schedule.paymentAmount': 'Paiement',
        'schedule.principal': 'Principal',
        'schedule.interest': 'Intérêts',
        'schedule.balance': 'Solde Restant',
        'schedule.showing': 'Affichage',
        'schedule.export': 'Exporter CSV',
        'comparison.title': 'Comparaison de Prêts',
        'comparison.subtitle': 'Comparez différents scénarios de prêt',
        'comparison.add': 'Ajouter une Comparaison',
        'history.title': 'Historique des Calculs',
        'history.empty': 'Aucun historique de calculs pour le moment',
        'modal.title': 'Ajouter une Comparaison',
        'modal.name': 'Nommez ce scénario',
        'modal.rate': 'Taux d\'Intérêt (%)',
        'modal.term': 'Durée (années)',
        'modal.cancel': 'Annuler',
        'modal.add': 'Ajouter',
        'disclaimer': 'Cet outil est à titre informatif uniquement et ne constitue pas un conseil financier. Veuillez consulter un conseiller financier qualifié avant de prendre toute décision financière.',
        'error.title': 'Veuillez corriger les erreurs suivantes:',
        'error.amount': 'Veuillez entrer un montant de prêt valide supérieur à 0',
        'error.term': 'Veuillez entrer une durée de prêt valide entre 1 et 30',
        'error.rate': 'Veuillez entrer un taux d\'intérêt valide entre 0.1 et 20',
        'error.comparisonName': 'Veuillez entrer un nom pour cette comparaison',
        'comparison.vs': 'vs'
    }
};

// Global state
let currentLang = 'en';
let isTermInYears = true;
let selectedCalculationMethod = 'amortizing';
let comparisonScenarios = [];
let pieChart = null;
let comparisonChart = null;

// DOM Elements
const currencySelect = document.getElementById('currency');
const currencySymbol = document.getElementById('currencySymbol');
const loanAmount = document.getElementById('loanAmount');
const loanTermInput = document.getElementById('loanTermInput');
const loanTermSlider = document.getElementById('loanTermSlider');
const interestRate = document.getElementById('interestRate');
const interestRateSlider = document.getElementById('interestRateSlider');
const loanType = document.getElementById('loanType');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsSection = document.getElementById('resultsSection');
const monthlyPayment = document.getElementById('monthlyPayment');
const monthlyCurrency = document.getElementById('monthlyCurrency');
const totalPayment = document.getElementById('totalPayment');
const totalCurrency = document.getElementById('totalCurrency');
const totalInterest = document.getElementById('totalInterest');
const interestCurrency = document.getElementById('interestCurrency');
const scheduleToggle = document.getElementById('scheduleToggle');
const scheduleContent = document.getElementById('scheduleContent');
const scheduleArrow = document.getElementById('scheduleArrow');
const scheduleBody = document.getElementById('scheduleBody');
const schedulePage = document.getElementById('schedulePage');
const exportBtn = document.getElementById('exportBtn');
const errorMessages = document.getElementById('errorMessages');
const errorList = document.getElementById('errorList');
const termYearsBtn = document.getElementById('termYears');
const termMonthsBtn = document.getElementById('termMonths');
const methodAmortizingBtn = document.getElementById('method-amortizing');
const methodInterestOnlyBtn = document.getElementById('method-interest-only');
const langEnBtn = document.getElementById('lang-en');
const langEsBtn = document.getElementById('lang-es');
const langFrBtn = document.getElementById('lang-fr');
const chartPrincipal = document.getElementById('chartPrincipal');
const chartInterest = document.getElementById('chartInterest');
const chartTotal = document.getElementById('chartTotal');
const addComparisonBtn = document.getElementById('addComparisonBtn');
const comparisonModal = document.getElementById('comparisonModal');
const cancelComparisonBtn = document.getElementById('cancelComparisonBtn');
const addComparisonConfirmBtn = document.getElementById('addComparisonConfirmBtn');
const comparisonName = document.getElementById('comparisonName');
const comparisonRate = document.getElementById('comparisonRate');
const comparisonTerm = document.getElementById('comparisonTerm');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

/**
 * Initialize the application
 */
function init() {
    setupEventListeners();
    loadHistory();
    formatInput(loanAmount);
    formatInput(interestRate);
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Currency change
    currencySelect.addEventListener('change', updateCurrencySymbol);
    
    // Loan amount formatting
    loanAmount.addEventListener('input', handleAmountInput);
    
    // Interest rate formatting
    interestRate.addEventListener('input', handleRateInput);
    
    // Term slider and input sync
    loanTermSlider.addEventListener('input', syncTermSliderToInput);
    loanTermInput.addEventListener('input', syncTermInputToSlider);
    
    // Interest rate slider and input sync
    interestRateSlider.addEventListener('input', syncRateSliderToInput);
    interestRate.addEventListener('input', syncRateInputToSlider);
    
    // Term unit toggle
    termYearsBtn.addEventListener('click', () => setTermUnit(true));
    termMonthsBtn.addEventListener('click', () => setTermUnit(false));
    
    // Calculation method toggle
    methodAmortizingBtn.addEventListener('click', () => setCalculationMethod('amortizing'));
    methodInterestOnlyBtn.addEventListener('click', () => setCalculationMethod('interest-only'));
    
    // Language switcher
    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langEsBtn.addEventListener('click', () => setLanguage('es'));
    langFrBtn.addEventListener('click', () => setLanguage('fr'));
    
    // Calculate and reset buttons
    calculateBtn.addEventListener('click', calculateLoan);
    resetBtn.addEventListener('click', resetForm);
    
    // Schedule toggle
    scheduleToggle.addEventListener('click', toggleSchedule);
    
    // Export button
    exportBtn.addEventListener('click', exportSchedule);
    
    // Comparison buttons
    addComparisonBtn.addEventListener('click', openComparisonModal);
    cancelComparisonBtn.addEventListener('click', closeComparisonModal);
    addComparisonConfirmBtn.addEventListener('click', addComparison);
    
    // History buttons
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Enter key to calculate
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateLoan();
        }
    });
    
    // Input validation blur
    loanAmount.addEventListener('blur', validateAmount);
    loanTermInput.addEventListener('blur', validateTerm);
    interestRate.addEventListener('blur', validateRate);
}

/**
 * Update currency symbol display
 */
function updateCurrencySymbol() {
    const symbol = currencySymbols[currencySelect.value] || '$';
    currencySymbol.textContent = symbol;
}

/**
 * Format input with thousands separator
 */
function formatInput(input) {
    let value = input.value.replace(/[^\d.]/g, '');
    if (value.includes('.')) {
        const parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        value = parts.join('.');
    } else {
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    input.value = value;
}

/**
 * Handle loan amount input
 */
function handleAmountInput(e) {
    const input = e.target;
    formatInput(input);
    validateAmount(input);
}

/**
 * Handle interest rate input
 */
function handleRateInput(e) {
    const input = e.target;
    let value = input.value.replace(/[^\d.]/g, '');
    
    // Limit to 2 decimal places
    if (value.includes('.')) {
        const parts = value.split('.');
        if (parts[1].length > 2) {
            parts[1] = parts[1].substring(0, 2);
        }
        value = parts.join('.');
    }
    input.value = value;
    validateRate(input);
}

/**
 * Sync term slider to input
 */
function syncTermSliderToInput() {
    loanTermInput.value = loanTermSlider.value;
    validateTerm(loanTermInput);
}

/**
 * Sync term input to slider
 */
function syncTermInputToSlider() {
    const value = parseInt(loanTermInput.value) || 1;
    const clamped = Math.max(1, Math.min(30, value));
    loanTermInput.value = clamped;
    loanTermSlider.value = clamped;
    validateTerm(loanTermInput);
}

/**
 * Sync rate slider to input
 */
function syncRateSliderToInput() {
    interestRate.value = parseFloat(interestRateSlider.value).toFixed(1);
}

/**
 * Sync rate input to slider
 */
function syncRateInputToSlider() {
    const value = parseFloat(interestRate.value) || 0.1;
    const clamped = Math.max(0.1, Math.min(20, value));
    interestRate.value = clamped.toFixed(1);
    interestRateSlider.value = clamped;
}

/**
 * Set term unit (years/months)
 */
function setTermUnit(years) {
    isTermInYears = years;
    
    if (years) {
        termYearsBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
        termYearsBtn.classList.remove('bg-gray-100', 'text-gray-600');
        termMonthsBtn.classList.remove('bg-primary-100', 'text-primary-700', 'active');
        termMonthsBtn.classList.add('bg-gray-100', 'text-gray-600');
        // Convert months to years if needed
        if (parseInt(loanTermInput.value) > 30) {
            loanTermInput.value = Math.round(parseInt(loanTermInput.value) / 12);
            loanTermSlider.value = loanTermInput.value;
        }
        loanTermSlider.max = 30;
    } else {
        termMonthsBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
        termMonthsBtn.classList.remove('bg-gray-100', 'text-gray-600');
        termYearsBtn.classList.remove('bg-primary-100', 'text-primary-700', 'active');
        termYearsBtn.classList.add('bg-gray-100', 'text-gray-600');
        // Convert years to months
        loanTermInput.value = parseInt(loanTermInput.value) * 12;
        loanTermSlider.value = loanTermInput.value;
        loanTermSlider.max = 360;
    }
}

/**
 * Set calculation method
 */
function setCalculationMethod(method) {
    selectedCalculationMethod = method;
    
    if (method === 'amortizing') {
        methodAmortizingBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
        methodAmortizingBtn.classList.remove('bg-gray-100', 'text-gray-600');
        methodInterestOnlyBtn.classList.remove('bg-primary-100', 'text-primary-700', 'active');
        methodInterestOnlyBtn.classList.add('bg-gray-100', 'text-gray-600');
    } else {
        methodInterestOnlyBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
        methodInterestOnlyBtn.classList.remove('bg-gray-100', 'text-gray-600');
        methodAmortizingBtn.classList.remove('bg-primary-100', 'text-primary-700', 'active');
        methodAmortizingBtn.classList.add('bg-gray-100', 'text-gray-600');
    }
}

/**
 * Set language
 */
function setLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    [langEnBtn, langEsBtn, langFrBtn].forEach(btn => {
        btn.classList.remove('bg-primary-100', 'text-primary-700', 'active');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    if (lang === 'en') langEnBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
    else if (lang === 'es') langEsBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
    else if (lang === 'fr') langFrBtn.classList.add('bg-primary-100', 'text-primary-700', 'active');
    
    // Update all translated elements
    updateLanguage();
}

/**
 * Update all translated elements on the page
 */
function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Update page title
    document.title = translations[currentLang]['header.title'];
}

/**
 * Validate loan amount
 */
function validateAmount(input) {
    const value = parseFloat(input.value.replace(/,/g, ''));
    
    if (!value || value <= 0) {
        input.classList.add('error-border');
        return false;
    }
    
    input.classList.remove('error-border');
    input.classList.add('success-border');
    return true;
}

/**
 * Validate loan term
 */
function validateTerm(input) {
    const value = parseInt(input.value);
    const max = isTermInYears ? 30 : 360;
    
    if (!value || value < 1 || value > max) {
        input.classList.add('error-border');
        return false;
    }
    
    input.classList.remove('error-border');
    input.classList.add('success-border');
    return true;
}

/**
 * Validate interest rate
 */
function validateRate(input) {
    const value = parseFloat(input.value);
    
    if (!value || value < 0.1 || value > 20) {
        input.classList.add('error-border');
        return false;
    }
    
    input.classList.remove('error-border');
    input.classList.add('success-border');
    return true;
}

/**
 * Show errors
 */
function showErrors(errors) {
    errorList.innerHTML = '';
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = translations[currentLang][error] || error;
        errorList.appendChild(li);
    });
    errorMessages.classList.remove('hidden');
    errorMessages.classList.add('animate-fade-in');
}

/**
 * Hide errors
 */
function hideErrors() {
    errorMessages.classList.add('hidden');
}

/**
 * Validate all inputs
 */
function validateInputs() {
    const errors = [];
    
    // Validate amount
    const amount = parseFloat(loanAmount.value.replace(/,/g, ''));
    if (!amount || amount <= 0) {
        loanAmount.classList.add('error-border');
        errors.push('error.amount');
    } else {
        loanAmount.classList.remove('error-border');
    }
    
    // Validate term
    const term = parseInt(loanTermInput.value);
    const maxTerm = isTermInYears ? 30 : 360;
    if (!term || term < 1 || term > maxTerm) {
        loanTermInput.classList.add('error-border');
        errors.push('error.term');
    } else {
        loanTermInput.classList.remove('error-border');
    }
    
    // Validate rate
    const rate = parseFloat(interestRate.value);
    if (!rate || rate < 0.1 || rate > 20) {
        interestRate.classList.add('error-border');
        errors.push('error.rate');
    } else {
        interestRate.classList.remove('error-border');
    }
    
    if (errors.length > 0) {
        showErrors(errors);
        return false;
    }
    
    hideErrors();
    return true;
}

/**
 * Format currency for display
 */
function formatCurrency(value, currency) {
    const symbol = currencySymbols[currency] || '$';
    return symbol + value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Calculate loan using amortizing method
 */
function calculateAmortizingLoan(principal, monthlyRate, months) {
    // Standard amortizing loan formula
    const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    
    const schedule = [];
    let remainingBalance = principal;
    
    for (let i = 1; i <= months; i++) {
        const interest = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interest;
        remainingBalance -= principalPayment;
        
        if (remainingBalance < 0) remainingBalance = 0;
        
        schedule.push({
            payment: i,
            paymentAmount: monthlyPayment,
            principal: principalPayment,
            interest: interest,
            balance: remainingBalance
        });
    }
    
    return { monthlyPayment, schedule };
}

/**
 * Calculate loan using interest-only method
 */
function calculateInterestOnlyLoan(principal, monthlyRate, months) {
    const monthlyPayment = principal * monthlyRate;
    
    const schedule = [];
    let remainingBalance = principal;
    
    for (let i = 1; i <= months; i++) {
        const interest = remainingBalance * monthlyRate;
        
        schedule.push({
            payment: i,
            paymentAmount: monthlyPayment,
            principal: 0,
            interest: interest,
            balance: remainingBalance
        });
    }
    
    return { monthlyPayment, schedule };
}

/**
 * Calculate balloon loan
 */
function calculateBalloonLoan(principal, monthlyRate, months) {
    // Balloon: smaller payments for most of term, large final payment
    const balloonTerm = Math.floor(months * 0.8);
    const smallPayment = principal * monthlyRate * 0.6;
    
    const schedule = [];
    let remainingBalance = principal;
    
    for (let i = 1; i <= months; i++) {
        const interest = remainingBalance * monthlyRate;
        let principalPayment, paymentAmount;
        
        if (i < balloonTerm) {
            principalPayment = smallPayment - interest;
            paymentAmount = smallPayment;
        } else if (i === months) {
            principalPayment = remainingBalance;
            paymentAmount = remainingBalance + interest;
        } else {
            principalPayment = smallPayment - interest;
            paymentAmount = smallPayment;
        }
        
        remainingBalance -= principalPayment;
        if (remainingBalance < 0) remainingBalance = 0;
        
        schedule.push({
            payment: i,
            paymentAmount: paymentAmount,
            principal: principalPayment,
            interest: interest,
            balance: remainingBalance
        });
    }
    
    return { monthlyPayment: smallPayment, schedule };
}

/**
 * Calculate graduated payment loan
 */
function calculateGraduatedLoan(principal, monthlyRate, months) {
    // Graduated: payments increase over time
    const initialPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)) * 0.7;
    const increaseRate = 0.05; // 5% increase each year
    const reviewsPerYear = 1;
    
    const schedule = [];
    let remainingBalance = principal;
    let currentPayment = initialPayment;
    let reviewCounter = 0;
    
    for (let i = 1; i <= months; i++) {
        // Increase payment annually
        reviewCounter++;
        if (reviewCounter >= 12 / reviewsPerYear && i < months) {
            currentPayment *= (1 + increaseRate);
            reviewCounter = 0;
        }
        
        const interest = remainingBalance * monthlyRate;
        const principalPayment = Math.min(currentPayment - interest, remainingBalance);
        const paymentAmount = principalPayment + interest;
        
        remainingBalance -= principalPayment;
        if (remainingBalance < 0) remainingBalance = 0;
        
        schedule.push({
            payment: i,
            paymentAmount: paymentAmount,
            principal: principalPayment,
            interest: interest,
            balance: remainingBalance
        });
        
        // Final payment covers remaining balance
        if (remainingBalance < 0.01 && i < months) {
            break;
        }
    }
    
    return { monthlyPayment: initialPayment, schedule };
}

/**
 * Main loan calculation function
 */
function calculateLoan() {
    if (!validateInputs()) return;
    
    // Get input values
    const principal = parseFloat(loanAmount.value.replace(/,/g, ''));
    let term = parseInt(loanTermInput.value);
    const annualRate = parseFloat(interestRate.value);
    const currency = currencySelect.value;
    const loanTypeValue = loanType.value;
    
    // Convert term to months
    if (isTermInYears) {
        term = term * 12;
    }
    
    // Monthly rate
    const monthlyRate = annualRate / 100 / 12;
    
    // Calculate based on loan type and method
    let result;
    
    if (loanTypeValue === 'balloon') {
        result = calculateBalloonLoan(principal, monthlyRate, term);
    } else if (loanTypeValue === 'graduated') {
        result = calculateGraduatedLoan(principal, monthlyRate, term);
    } else if (selectedCalculationMethod === 'interest-only' || loanTypeValue === 'interest-only') {
        result = calculateInterestOnlyLoan(principal, monthlyRate, term);
    } else {
        result = calculateAmortizingLoan(principal, monthlyRate, term);
    }
    
    const { monthlyPaymentAmount, schedule } = result;
    
    // Calculate totals
    const totalPay = schedule.reduce((sum, p) => sum + p.paymentAmount, 0);
    const totalInt = schedule.reduce((sum, p) => sum + p.interest, 0);
    
    // Update UI with results
    updateResults(monthlyPaymentAmount, totalPay, totalInt, principal, currency);
    updateScheduleTable(schedule, currency);
    updateChart(principal, totalInt, currency);
    
    // Reset comparison scenarios
    comparisonScenarios = [];
    updateComparisonChart();
    
    // Save to history
    saveToHistory({
        amount: principal,
        currency: currency,
        term: isTermInYears ? term / 12 : term,
        termUnit: isTermInYears ? 'years' : 'months',
        rate: annualRate,
        monthlyPayment: monthlyPaymentAmount,
        totalPayment: totalPay,
        totalInterest: totalInt,
        timestamp: Date.now()
    });
    
    // Show results section with animation
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('animate-fade-in');
}

/**
 * Update results display
 */
function updateResults(monthly, total, interest, principal, currency) {
    const symbol = currencySymbols[currency];
    
    monthlyCurrency.textContent = symbol;
    monthlyPayment.textContent = monthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    totalCurrency.textContent = symbol;
    totalPayment.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    interestCurrency.textContent = symbol;
    totalInterest.textContent = interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Update schedule table
 */
function updateScheduleTable(schedule, currency) {
    const pageSize = 12;
    const totalPages = Math.ceil(schedule.length / pageSize);
    
    // Update page selector
    schedulePage.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${(i - 1) * pageSize + 1} - ${Math.min(i * pageSize, schedule.length)} of ${schedule.length}`;
        schedulePage.appendChild(option);
    }
    
    // Show first page
    renderSchedulePage(schedule, 0, pageSize, currency);
    
    // Page change event
    schedulePage.removeEventListener('change', schedulePageChange);
    schedulePage.addEventListener('change', () => {
        const page = parseInt(schedulePage.value) - 1;
        renderSchedulePage(schedule, page * pageSize, pageSize, currency);
    });
}

/**
 * Render specific page of schedule
 */
function renderSchedulePage(schedule, start, count, currency) {
    scheduleBody.innerHTML = '';
    const end = Math.min(start + count, schedule.length);
    
    for (let i = start; i < end; i++) {
        const p = schedule[i];
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${p.payment}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">${formatCurrency(p.paymentAmount, currency)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">${formatCurrency(p.principal, currency)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${formatCurrency(p.interest, currency)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 text-right font-medium">${formatCurrency(p.balance, currency)}</td>
        `;
        
        scheduleBody.appendChild(row);
    }
}

/**
 * Handle schedule page change
 */
function schedulePageChange() {
    // This is handled inline in updateScheduleTable
}

/**
 * Update pie chart
 */
function updateChart(principal, interest, currency) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    const symbol = currencySymbols[currency];
    
    // Destroy old chart if exists
    if (pieChart) {
        pieChart.destroy();
    }
    
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [translations[currentLang]['chart.principal'], translations[currentLang]['chart.interest']],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#3b82f6', '#f59e0b'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
    
    // Update chart values
    chartPrincipal.textContent = formatCurrency(principal, currency);
    chartInterest.textContent = formatCurrency(interest, currency);
    chartTotal.textContent = formatCurrency(principal + interest, currency);
}

/**
 * Toggle schedule visibility
 */
function toggleSchedule() {
    scheduleContent.classList.toggle('hidden');
    scheduleArrow.classList.toggle('rotate-180');
}

/**
 * Export schedule to CSV
 */
function exportSchedule() {
    const schedule = generateScheduleForExport();
    const currency = currencySelect.value;
    
    let csv = 'Payment #,Payment,Principal,Interest,Remaining Balance\n';
    schedule.forEach(p => {
        csv += `${p.payment},${p.paymentAmount.toFixed(2)},${p.principal.toFixed(2)},${p.interest.toFixed(2)},${p.balance.toFixed(2)}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `loan-amortization-${currency}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Generate schedule for export (used in multiple places)
 */
function generateScheduleForExport() {
    const principal = parseFloat(loanAmount.value.replace(/,/g, ''));
    let term = parseInt(loanTermInput.value);
    const annualRate = parseFloat(interestRate.value);
    
    if (isTermInYears) {
        term = term * 12;
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const loanTypeValue = loanType.value;
    
    let result;
    
    if (loanTypeValue === 'balloon') {
        result = calculateBalloonLoan(principal, monthlyRate, term);
    } else if (loanTypeValue === 'graduated') {
        result = calculateGraduatedLoan(principal, monthlyRate, term);
    } else if (selectedCalculationMethod === 'interest-only' || loanTypeValue === 'interest-only') {
        result = calculateInterestOnlyLoan(principal, monthlyRate, term);
    } else {
        result = calculateAmortizingLoan(principal, monthlyRate, term);
    }
    
    return result.schedule;
}

/**
 * Open comparison modal
 */
function openComparisonModal() {
    comparisonModal.classList.remove('hidden');
    comparisonModal.classList.add('animate-fade-in');
}

/**
 * Close comparison modal
 */
function closeComparisonModal() {
    comparisonModal.classList.add('hidden');
    comparisonName.value = '';
}

/**
 * Add comparison scenario
 */
function addComparison() {
    const name = comparisonName.value.trim();
    const rate = parseFloat(comparisonRate.value);
    const term = parseInt(comparisonTerm.value);
    
    if (!name) {
        alert(translations[currentLang]['error.comparisonName']);
        return;
    }
    
    const principal = parseFloat(loanAmount.value.replace(/,/g, ''));
    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    
    const result = calculateAmortizingLoan(principal, monthlyRate, months);
    
    comparisonScenarios.push({
        name,
        rate,
        term,
        monthlyPayment: result.monthlyPayment,
        totalPayment: result.schedule.reduce((sum, p) => sum + p.paymentAmount, 0),
        totalInterest: result.schedule.reduce((sum, p) => sum + p.interest, 0)
    });
    
    // Limit to 3 comparisons
    if (comparisonScenarios.length > 3) {
        comparisonScenarios.shift();
    }
    
    updateComparisonChart();
    closeComparisonModal();
}

/**
 * Update comparison chart
 */
function updateComparisonChart() {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    const currency = currencySelect.value;
    
    // Destroy old chart if exists
    if (comparisonChart) {
        comparisonChart.destroy();
    }
    
    // Add current scenario
    const principal = parseFloat(loanAmount.value.replace(/,/g, ''));
    const currentRate = parseFloat(interestRate.value);
    const currentTerm = isTermInYears ? parseInt(loanTermInput.value) : parseInt(loanTermInput.value) / 12;
    const currentMonthlyRate = currentRate / 100 / 12;
    const currentMonths = isTermInYears ? parseInt(loanTermInput.value) * 12 : parseInt(loanTermInput.value);
    
    const currentResult = calculateAmortizingLoan(principal, currentMonthlyRate, currentMonths);
    
    const allScenarios = [{
        name: translations[currentLang]['comparison.vs'] + ' Current',
        rate: currentRate,
        term: currentTerm,
        monthlyPayment: currentResult.monthlyPayment,
        totalPayment: currentResult.schedule.reduce((sum, p) => sum + p.paymentAmount, 0),
        totalInterest: currentResult.schedule.reduce((sum, p) => sum + p.interest, 0)
    }, ...comparisonScenarios];
    
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    
    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: allScenarios.map(s => s.name),
            datasets: [{
                label: translations[currentLang]['result.monthly'],
                data: allScenarios.map(s => s.monthlyPayment),
                backgroundColor: colors.slice(0, allScenarios.length),
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return formatCurrency(context.raw, currency);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => formatCurrency(value, currency)
                    }
                }
            }
        }
    });
}

/**
 * Save calculation to history
 */
function saveToHistory(data) {
    const history = getHistory();
    history.unshift(data);
    
    // Keep only last 10 entries
    if (history.length > 10) {
        history.pop();
    }
    
    localStorage.setItem('loanCalculatorHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

/**
 * Get history from localStorage
 */
function getHistory() {
    const stored = localStorage.getItem('loanCalculatorHistory');
    return stored ? JSON.parse(stored) : [];
}

/**
 * Load history on init
 */
function loadHistory() {
    updateHistoryDisplay();
}

/**
 * Update history display
 */
function updateHistoryDisplay() {
    const history = getHistory();
    
    if (history.length === 0) {
        historyList.innerHTML = `
            <div class="text-center py-8 text-gray-400">
                <i class="fa fa-history text-4xl mb-2"></i>
                <p>${translations[currentLang]['history.empty']}</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = history.map((item, index) => {
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString(currentLang, { month: 'short', day: 'numeric', year: 'numeric' });
        const timeStr = date.toLocaleTimeString(currentLang, { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                    <div class="flex items-center space-x-2">
                        <span class="font-medium text-gray-800">${currencySymbols[item.currency]}${item.amount.toLocaleString()}</span>
                        <span class="text-gray-400 text-sm">@ ${item.rate}%</span>
                        <span class="text-gray-400 text-sm">for ${item.term} ${item.termUnit}</span>
                    </div>
                    <div class="flex items-center space-x-4 mt-1">
                        <span class="text-sm text-gray-500">${translations[currentLang]['result.monthly']}: ${currencySymbols[item.currency]}${item.monthlyPayment.toLocaleString()}</span>
                        <span class="text-sm text-gray-400">|</span>
                        <span class="text-sm text-gray-400">${dateStr} ${timeStr}</span>
                    </div>
                </div>
                <button onclick="loadHistoryItem(${index})" class="text-primary-600 hover:text-primary-700">
                    <i class="fa fa-repeat"></i>
                </button>
            </div>
        `;
    }).join('');
}

/**
 * Load a history item
 */
function loadHistoryItem(index) {
    const history = getHistory();
    const item = history[index];
    
    // Update form values
    loanAmount.value = item.amount.toLocaleString();
    currencySelect.value = item.currency;
    updateCurrencySymbol();
    
    if (item.termUnit === 'years') {
        setTermUnit(true);
        loanTermInput.value = item.term;
        loanTermSlider.value = item.term;
    } else {
        setTermUnit(false);
        loanTermInput.value = item.term;
        loanTermSlider.value = item.term;
    }
    
    interestRate.value = item.rate.toFixed(1);
    interestRateSlider.value = item.rate;
    
    // Calculate to update results
    calculateLoan();
}

/**
 * Clear history
 */
function clearHistory() {
    if (confirm(translations[currentLang]['history.empty'])) {
        localStorage.removeItem('loanCalculatorHistory');
        updateHistoryDisplay();
    }
}

/**
 * Reset form
 */
function resetForm() {
    loanAmount.value = '';
    loanTermInput.value = '30';
    loanTermSlider.value = '30';
    interestRate.value = '4.50';
    interestRateSlider.value = '4.5';
    currencySelect.value = 'USD';
    updateCurrencySymbol();
    loanType.value = 'fixed';
    
    setTermUnit(true);
    setCalculationMethod('amortizing');
    
    // Clear validation classes
    [loanAmount, loanTermInput, interestRate].forEach(input => {
        input.classList.remove('error-border', 'success-border');
    });
    
    // Hide results
    resultsSection.classList.add('hidden');
    hideErrors();
    
    // Clear comparisons
    comparisonScenarios = [];
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);