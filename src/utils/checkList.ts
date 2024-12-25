
/**
 * Converts Price String into Number 
 * "$400,000" --> 400000
 * @param {string} price - Price String.
 * @returns {number} Returns equivalent number for price.
 */
function getPrice(price:string): number{
    const digits = price.substring(1).split(",").join("");
    return Number(digits);
}


/**
 * Evaluate the Checlists Valuation Fee Paid: 
 * 1. isValuationFeePaid should be true.
 * 2. UK Resident: isUkResident should be true.
 * 3. Risk Rating Medium: riskRating should be "Medium".
 * 4. LTV Below 60%: Calculate Loan-to-Value as (Loan Required / Purchase Price) * 100 and ensure it is less than 60%..
 * @param {any} data - The data fetched from API.
 * @returns { isValuationFeePaid: boolean, isUkResident: boolean, riskRating: string, loanToValue: number } Returns Results.
 */

export const checkList = (data:any):{isValuationFeePaid: boolean, isUkResident: boolean, riskRating: string, loanToValue: number}=>{

    const loanRequired = getPrice(data.mortgage.loanRequired);
    const purchasePrice = getPrice(data.mortgage.purchasePrice);
    
    return {
       isValuationFeePaid: data.isValuationFeePaid as boolean, 
       isUkResident: data.isUkResident as boolean, 
       riskRating: data.riskRating as string, 
       loanToValue: (loanRequired/purchasePrice)*100
    }
}