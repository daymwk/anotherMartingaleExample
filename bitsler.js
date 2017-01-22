/**

Bitsler dice gambling bot
Degressive martingale

/!\ You can't beat the house ! You will loose everything ! 
For educational purposes only

  __  __           _        _             _____                        
 |  \/  |         | |      | |           |  __ \                       
 | \  / | __ _  __| | ___  | |__  _   _  | |  | | __ _ _   _ _ __ ___  
 | |\/| |/ _` |/ _` |/ _ \ | '_ \| | | | | |  | |/ _` | | | | '_ ` _ \ 
 | |  | | (_| | (_| |  __/ | |_) | |_| | | |__| | (_| | |_| | | | | | |
 |_|  |_|\__,_|\__,_|\___| |_.__/ \__, | |_____/ \__,_|\__, |_| |_| |_|
                                   __/ |                __/ |          
                                  |___/                |___/ 

**/

/** 
Multiply bet amount
@param Float coeff - the coefficient multiplied
*/

var initialBet = 0.00001; // Initial bet value. Change it to what fits the best  

function multiplyBet(coeff){
	$("#amount").val(parseFloat($("#amount").val())*coeff);
}

/** Return to bet amount
@param Float bet - the bet amount
*/
function returnToBaseBet(bet){
	$("#amount").val(bet);
}

/** 
Rolls the dice
*/
function roll(){
	$("#btn-bet-dice").click();
}

/** 
Instanciates bet
@param Float value - the base value
*/
function initScript(value){
		$("#amount").val(value);

}


initScript(initialBet);

var bet = parseFloat($("#amount").val()); // Stocking current bet value
var nbLoose = 0; // Setting number of looses to zero
var totalProfit = 0; // Total profit made

// Restarts the sequence every 2000ms
setInterval(function() {

// Switching number of looses and reduces the bet amount in %, to prevent huge loss
	switch(nbLoose) {
    case 5:
		multiplyBet(0.3); // Next bet will be 30% of last bet
        break;
    case 6:
		multiplyBet(0.1); // Next bet will be 10% of last bet
        break;
    case 7:
        console.log('Maximum looses reached. Returning to base bet\n');
		returnToBaseBet(bet); // Reseting bet
		nbLoose = 0; // Reseting looses
        break;
}

		console.log('Rolling...\n');

	// Waiting 500ms after rolling the dice in case of lag
	setTimeout(function(){
		roll();
	},500);

// Waiting for the page to be fully loaded
$(document).ready(function(){

	var profit = $('#history-my-bets-dice tr').first().find('td:last').text(); // Getting current profit
	
	// if loose
	if(profit.includes('-')){
		nbLoose++; // Increment looses
		multiplyBet(2); // Multiplying bet twice
		console.log('Profit: ' + profit + '. nbLoose = ' + nbLoose + '\n');
	}
	// if win
	else{
		nbLoose = 0; // Reseting looses
		console.log('Profit: ' + profit + '. Bet returned to ' + bet + '\n');
		returnToBaseBet(bet); // Reseting bet
	}

	totalProfit += parseFloat(profit); // Increases current profit to total profit
	console.log('Total profit: ' +  totalProfit + '\n');
});


}, 2000);


