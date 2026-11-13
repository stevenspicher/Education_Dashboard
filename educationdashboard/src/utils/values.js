//// Shared helpers for reading values out of the imported report card data.
//// The state marks suppressed / unavailable values with "*".

export const NOT_REPORTED = "Not reported";

export const isReported = (value) =>
    value !== undefined && value !== null && value !== "" && value !== "*" && !Number.isNaN(Number(value));

//// Returns the value as a number, or null when it was not reported
export const num = (value) => (isReported(value) ? Number(value) : null);

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export const formatDollars = (value) => (isReported(value) ? USDollar.format(value) : NOT_REPORTED);

export const formatPercent = (value) => (isReported(value) ? value + "%" : NOT_REPORTED);

//// Single source for teacher salary so the table, cards and map all agree:
//// current year when reported, otherwise the prior year (flagged).
export const getSalary = (school) => {
    const current = num(school?.avgTeacherSalaryCurrYr);
    if (current) return {value: current, priorYear: false};
    const prior = num(school?.avgTeacherSalaryLastYr);
    if (prior) return {value: prior, priorYear: true};
    return {value: null, priorYear: false};
};

export const formatSalary = (school) => {
    const salary = getSalary(school);
    if (salary.value === null) return NOT_REPORTED;
    return formatDollars(salary.value) + (salary.priorYear ? " (prior year)" : "");
};
