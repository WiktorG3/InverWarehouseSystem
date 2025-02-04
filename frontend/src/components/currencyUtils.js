const currencyRates = {
    USD: 1,
    EUR: 0.95,
    PLN: 4.0,
};

/**
 * @param {number} value - Kwota w bazowej walucie (USD).
 * @returns {string} - Sformatowana kwota w wybranej walucie.
 * */

export function formatCurrency(value) {
    const selectedCurrency = localStorage.getItem('currency') || 'USD';
    const rate = currencyRates[selectedCurrency] || 1;
    const convertedValue = value * rate;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency,
    }).format(convertedValue);
}
