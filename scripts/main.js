$(document).ready(function(){
	// Variables for the current game screen.
	var currentCorrectAnswer;
	var currentTitle;
	var currentInformation;
	var currentSource;
	var currentSentenceToVisualise;

	// Program variables.
	var totalNumScreens = 20;
	var currentScreen = 0;
	/* ************************
		Start screen = 1;
		1st info screen = 2;
		1st game screen = 3;
		2nd info screen = 4;
		2nd game screen = 5;
	************************* */

	// Game variables-
	var timesErasedInput = 0;
	var swapLettersInInput = false;



	/* ***************************************************** */
	/*                   PROGRAM FUNCTIONS                   */
	/*                                                       */
	/* ***************************************************** */	


	// Function that draws the content in the div wrapper.
   	function createElementsForScreen(screenIndex){
   		
   		var typeOfScreenToDraw = screenIndex % 2;
   		console.log("typeOfScreenToDraw = " + typeOfScreenToDraw);

   		if(typeOfScreenToDraw === 0)
   			drawGameScreen(screenIndex);
   		else
   			drawInfoScreen(screenIndex);
   	}


	// Draw the game screen.
   	function drawGameScreen(screenIndex){

   		clearElementsInWrapper();

   		//drawVisualisation3(); // Debug, avkommentera switchen nedan när du vill testa hela programmet.

   		switch (screenIndex) {
   			case 2:   				
   				drawSpacingVisual(currentSentenceToVisualise);
   				break;
		    case 4:
		        drawReversedWordsVisual(currentSentenceToVisualise);
		        break;
		    case 6: 
		    	drawVisualForString(currentSentenceToVisualise);
		        break;
		    case 8:
		        drawDQBPVisual(currentSentenceToVisualise);
		        break;
		    case 10:
		        drawJumpingLettersVisual(currentSentenceToVisualise);
		        swapLettersInInput = true;
		        break;
		    case 12:
		        drawVisualForString(currentSentenceToVisualise);
		        swapLettersInInput = false;
		        break;
		    case 14:
		        drawBackwardsVisual(currentSentenceToVisualise);
		        break;
		    case 16:
		        
		        break;
		    case 18:
		        // Final screen.
		        location.reload();

		        //UTÖKA DETTA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		        // Draw end screen med nåt simpelt, sen continue kallar location.reload
		}
   	}


   	// Init variables for the current screen.
   	function initCurrentScreen(){   		

   		// If the player has gone through every screen.
   		if(currentScreen === totalNumScreens)
   			currentScreen = 1;

   		console.log("currentScreen = " + currentScreen);

   		var tempVisualisationInfo;
   		switch (currentScreen) {
   			case 1: case 2:
		        tempVisualisationInfo = visualisation1;
		        break;
		    case 3: case 4:
		        tempVisualisationInfo = visualisation2;
		        break;
		    case 5: case 6:
		        tempVisualisationInfo = visualisation3;
		        break;
		    case 7: case 8:
		        tempVisualisationInfo = visualisation4;
		        break;
		    case 9: case 10:
		        tempVisualisationInfo = visualisation5;
		        break;
		    case 11: case 12:
		    	tempVisualisationInfo = visualisation6;
		        break;
		    case 13: case 14:
		        tempVisualisationInfo = visualisation7;
		        break;
		    case 15: case 16:
		        tempVisualisationInfo = visualisation8;
		        break;
		    case 17: case 18:
		    	tempVisualisationInfo = visualisation9;
		        break;
		    case 19:
		        // Final screen.
		}

   		currentCorrectAnswer = tempVisualisationInfo.correctAnswer;
		currentTitle = tempVisualisationInfo.title;
		currentInformation = tempVisualisationInfo.information;
		currentSource = tempVisualisationInfo.source;
		currentSentenceToVisualise = tempVisualisationInfo.sentenceToVisualise;

		console.log("initCurrentScreen has been executed!" + ", currentSentenceToVisualise = " + currentSentenceToVisualise);
   	}  	


   	// Creating all elements to add to the div wrapper.
   	function drawInfoScreen(screenIndex){
		
	    clearElementsInWrapper();
	    
	    // Title text.
	    var titleText = $("<h1></h1>"); 
	    titleText.addClass("text_h1_center grey_text title_font");
	    //titleText.text("Simulation " + screenIndex);
	    titleText.text(currentTitle);

	    var line = $("<hr>");

	    // Information text.
	    var infoText = $("<p></p>");
	    infoText.addClass("text_info info_text");	    
	    //infoText.load("/text_files/simulation" + screenIndex + ".txt");
	    infoText.text(currentInformation);

	    // Div that the button will be inside.
	    var divForButton = createContinueButton();

	    // Source text.
	    var sourceText = $("<p></p>");
	    sourceText.addClass("text_info");	    
	    //infoText.load("/text_files/simulation" + screenIndex + ".txt");
	    sourceText.text(currentSource);

	    // Add it to the DOM.
	    $("#wrapper").append(titleText, line, infoText, sourceText, divForButton); 
   	}	


	/* ***************************************************** */
	/*                      LISTENERS                        */
	/*                                                       */
	/* ***************************************************** */


	// When the game is first launched and the start button is clicked.
   	$("#start_button").click(function(){
   		incrementCurrentScreen();   
   		initCurrentScreen();		
   		createElementsForScreen(currentScreen); // Draw the information screen for the first simulation.   		
    });


    // On click listener for dynamically created buttons.
   	$("#wrapper").on("click", "button.button_continue_class", function(){
   		console.log("dynamically created continue button clicked!");
   		incrementCurrentScreen();
   		initCurrentScreen();
    	createElementsForScreen(currentScreen);
	});


   	// On click listener for submit button.
	$("#wrapper").on("click", "button.button_submit_class", function(){

		// Retrieve answer from input field.
		var retrievedAnswer = $("#input_answer").val();
		retrievedAnswer = retrievedAnswer.toLowerCase();

		console.log("retrievedAnswer = " + retrievedAnswer + ", currentCorrectAnswer = " + currentCorrectAnswer);

		// Validate answer and change the label accordingly.
		if(currentCorrectAnswer.toLowerCase() === retrievedAnswer){
			$("#input_label").html("Correct, feel free to continue");
			$("#input_label").css("color", "#70db70");
		}
		else{
			$("#input_label").html("Try again");
			$("#input_label").css("color", "#ff8080");
		}
	});


	// Listens to when backspace is pressed in the dynamically created input field.
	var numTimesDeletedChars = 0;
	$("#wrapper").on("keydown", "input.form-control", function(event){
	    const key = event.key; // const {key} = event; ES6+
	    if (key === "Backspace" || key === "Delete") {
	        //return false;
	        console.log("PRESSSSSSSSSSED");
	        numTimesDeletedChars++;
	    }
	});


	// Incredible bad code below but I'm tired and it works.
   	var startReplacingLetters = false;
   	var numLimitsReached = 0;
   	var tempStringToCompare = "";
   	// On change listener for dynamically created input field.
   	// Tries to show how it can feel like when typing.
	$("#wrapper").on("change paste keyup", "input.form-control", function(){

		if(swapLettersInInput){ // Only performs this if it is the current screen.
				var userInput = $(this).val();
			var index = (userInput.length === 0) ? 0 : userInput.length-1;

			// The limits, the words, that will be hard to spell because letters will jump around.
			// currentCorrectAnswer =  "A lot of c|oncentration is r|equired to read this s|entence because the l|etters jump around"
			var correctAnswer = currentCorrectAnswer.toLowerCase();
			var limit1 = correctAnswer.substr(0, 10); // = "a lot of c"
			var limit2 = correctAnswer.substr(10, 17); // = "oncentration is r"
			var limit3 = correctAnswer.substr(27, 21); // = "equired to read this s"
			var limit4 = correctAnswer.substr(48, 21); // = "entence because the l"
			var limit5 = correctAnswer.substr(69, 21); // = "etters jump around"

			//limits = [limit1, limit2, limit3, limit4, limit5];
			
			// TODO: refactor to a function but I'm tired and no one is going to see this anyway lol.
			// The code checks if the player has reached different stages in the answer.
			if(userInput === limit1 || userInput === limit1 + limit2[0]){
				// Reached limit, time to swap chars randomly until numTimesDeletedChars > 4
				startReplacingLetters = true;
				numLimitsReached++;
				tempStringToCompare = limit1;
				console.log("reached l1, " + tempStringToCompare);
			}
			else if(userInput === limit1 + limit2 || userInput === limit1 + limit2 + limit3[0]){
				startReplacingLetters = true;
				numLimitsReached++;
				tempStringToCompare = limit1 + limit2;
				console.log("reached l2" + tempStringToCompare);
			}
			else if(userInput === limit1 + limit2 + limit3 || userInput === limit1 + limit2 + limit3 + limit4[0]){
				startReplacingLetters = true;
				numLimitsReached++;
				tempStringToCompare = limit1 + limit2 + limit3;
				console.log("reached l3" + tempStringToCompare);
			}
			else if(userInput === limit1 + limit2 + limit3 + limit4 || userInput === limit1 + limit2 + limit3 + limit4 + limit5[0]){
				startReplacingLetters = true;
				numLimitsReached++;
				tempStringToCompare = limit1 + limit2 + limit3 + limit4;
				console.log("reached l4" + tempStringToCompare);
			}

			if(numTimesDeletedChars == 3){
				console.log("Stop swapping letters");
				numTimesDeletedChars = 0;
				startReplacingLetters = false;
			}

			// Changes chars when reached certain limits and pressed backspace under 3 times.
			var scrambledInput;
			if(startReplacingLetters && numTimesDeletedChars < 4){
				console.log("inside first if");
				if(index > tempStringToCompare.length){
					console.log("inside second if");
					var charToSwapWith;
					for(var k = userInput.length+1; k < currentCorrectAnswer.length; k++){

						if(!(isWhiteSpace(currentCorrectAnswer[k]))){
							charToSwapWith = currentCorrectAnswer[k].toLowerCase();
							break;						
						}
					}

					scrambledInput = replaceCharAt(userInput, userInput.length-1, charToSwapWith);
					console.log("charToSwapWith = " + charToSwapWith);
					$("#input_answer").val(scrambledInput);
				}
			}
		}
		
	});


	/* ***************************************************** */
	/*                   UTILITY FUNCTIONS                   */
	/*                                                       */
	/* ***************************************************** */


	// Function to increment the current screen.
    function incrementCurrentScreen(){ 
    	currentScreen++; 
    	console.log("currentScreen = " + currentScreen); 
    }


	// Function to clear the DOM, removing all previous elements.
    function clearElementsInWrapper(){$("#wrapper").empty();}


	// Check if a char is a letter.
   	function isLetter(char) {
		return !(/^[\d]$/.test(char));
	}


	// Check if a char is a white space.
	function isWhiteSpace(char){
		return /\s/.test(char);
	}

	// Reverse a string.
	function reverseString(str){
   		var reversed = '';
        for (var i = str.length - 1; i >= 0; i--) {
            reversed += str[i];
        }
        return reversed;
   	}


   	// Returns random number.
   	function getRandomNumber(start, end){
   		var randomNr = Math.floor((Math.random() * end) + start);
   		return randomNr;
   	}


   	// Function that returns a random number.
   	function getRandomInteger(min, max) {
    	return Math.floor(Math.random() * (max - min + 1) ) + min;
	}


	// Replace chars in a string.
	function replaceCharAt(str,index,chr) {
		if(index > str.length-1) return str;
		
		return str.substr(0,index) + chr + str.substr(index+1);
	}


	// Function that returns the div for a visualisation, with input argument.
   	function createDivWithVisualisation(visualisationSentence){
   		var divForVisualisation = $("<div></div>");
	    divForVisualisation.css("text-align", "center");
	    divForVisualisation.css("background-color", "#d9d9d9");
	    divForVisualisation.css("border-radius", "10px");
	    divForVisualisation.css("margin-top", "8%");

	    var visualisation = $("<h3></h3>"); 
	    visualisation.text(visualisationSentence);

	    // Add visualisation to the div.
		divForVisualisation.append(visualisation, visualisation1);

	    return divForVisualisation;
   	}


   	// Function that retuns a div.
   	function createDivForVisualisation(){
   		var divForVisualisation = $("<div></div>");
	    divForVisualisation.css("text-align", "center");
	    divForVisualisation.css("background-color", "#d9d9d9");
	    divForVisualisation.css("border-radius", "10px");
	    divForVisualisation.css("margin-top", "8%");

	    return divForVisualisation;
	}


	// Create the div for the input form.
   	function createInputForm(){

   		// Input field.
		var divForInput = $("<div style='text-align: center; margin-top: 10%; margin-bottom: 3%;'></div>");
		var line = $("<hr>");
		var label = $("<label for='answer' id='input_label' style='font-style: italic;'>Type what you think it says:</label>");
		label.addClass("grey_text");
		var inputField = $("<input type='text' class='form-control' id='input_answer' style='margin-bottom: 1%;'>");
		var submitButton = $("<button class='button_submit_class'>Submit</button>");
		submitButton.addClass("btn btn-default");

		divForInput.append(line, label, inputField, submitButton);

   		return divForInput;
   	}


	// Function to create a continue button.
	function createContinueButton(){
		// Div that the button will be inside.
	    var divForButton = $("<div></div>");
	    divForButton.addClass("div_button_continue"); // CSS class.

	    var line = $("<hr>");

	    // Button.
	    var continueButton = $("<button class='button_continue_class'></button>"); // Added class to allow a listener to be added to this dynamically created element.
		continueButton.addClass("btn btn-info");
		continueButton.text("Continue");

		// Add button to the div.
		divForButton.append(line, continueButton); 

		return divForButton;
	}

	/* ***************************************************** */
	/*            PREPARE STRING FOR VISUALISATION           */
	/*                                                       */
	/* ***************************************************** */


	// Preparation for the visual for swapping d/q and b/p.
	function prepareStringDQBPVisual(str){
		var summedString = "";

		for(var i = 0; i < str.length; i++){

			var tempCharToAdd;

			if(str[i] === "d"){
				tempCharToAdd = "q";
			}
			else if(str[i] === "q"){
				tempCharToAdd = "d";	
			} 
			else if(str[i] === "b"){
				tempCharToAdd = "p";
			} 
			else if(str[i] === "p"){
				tempCharToAdd = "b";
			}
			else{
				tempCharToAdd = str[i];
			} 

			summedString += tempCharToAdd;
		}
		return summedString;
	}


	// Preparation for the visual for reversed words.
	function prepareStringReversedWords(str){
		// Split by white space.
		var stringArray = str.split(/(\s+)/);

   		// Reverse each one.
   		var reversedWordsSummed = ""; 
   		for(var i = 0; i < stringArray.length; i++){
   			reversedWordsSummed += reverseString(stringArray[i]);
   		}	

   		return reversedWordsSummed.toLowerCase();
	}

	// Preparation for the visual for backwards and upside down.
	function prepareStringBackwardsUpsidedown(str){
		var tempString = "";

		// Take each char in the sentence, display it either normally, backwards or backwards plus upside down.
		for(var i = 0; i < str.length; i++){

			var randomNr = getRandomNumber(0, 2);
			var charToAdd = (isWhiteSpace(str[i])) ? '&nbsp;' : str[i];

			// Perform a case.
			switch (randomNr) {
	   			case 0: // Normal.
			        tempString += charToAdd;
			        break;
			    case 1: // Backwards.	
			    	if(!(charToAdd === '&nbsp;')){
			    		var reversedChar = reverseString(charToAdd); // Reverse char, required to make the letter backwards.
			        	tempString += "<backward>" + reversedChar + "</backward>";
			    	}
			    	else{
			    		tempString += "&nbsp;";
			    	}   	
			        break;
			    case 2: // Backwards and upside down.
			    	tempString += "<backward_upsidedown>" + charToAdd + "</backward_upsidedown>";
			        break;
			    case 3:
			}
		}

		var stringToVisualise = "<h3>" + tempString + "</h3>";

		return stringToVisualise;
	}

	// Preparation for visualisation 6 
	function prepareStringSpacedWrongVisual(str){

	}

	/* ***************************************************** */
	/*                    VISUALISATIONS                     */
	/*                                                       */
	/* ***************************************************** */
	// Visualisations that allow combinations, beware of the 
	// order in which they are executed:
	//   - DQ, BP
	//   - Reversed Words
	//	 - Jumping letters (Call this last)
	// 	 - Pushed together (Call this last)
	// 	 - Backwards & upside down (Call this last)

	// Functions that prepare the string in different ways.
	// för vis: 3, 6

	function drawDQBPVisual(visualisationSentence){
		drawVisualForString( prepareStringDQBPVisual(visualisationSentence) );
	}


	// Visualisation: Some words might appear backwards.
	// "The letters of some words might appear completely backwards, such as the word bird looking like drib"
	function drawReversedWordsVisual(visualisationSentence){
		drawVisualForString( prepareStringReversedWords(visualisationSentence) );
	}


	// TODO: Fixa den här kommentaren
	// Visualisation: o, e, c
   	// Visualisation: b/p, d/q
   	// "She might not be able to tell the difference between letters that look similar in shape such as o and e and c"
   	// "She might not be able to tell the difference between letters that have similar shape but different orientation, such as b and p and d and q"
   	function drawVisualForString(visualisationSentence){

   		// Div containing the visualisation.
   		var divForVisualisation = createDivWithVisualisation(visualisationSentence);
   		divForVisualisation.attr('id', 'div_for_vis');

		// Input field.
		var divForInput = createInputForm();

	   	// Continue button.
	   	var divForButton = createContinueButton();

	   	// Add it to the DOM.
	    $("#wrapper").append(divForVisualisation, divForInput, divForButton); 
   	}


	// Visualisation: jumping letters
   	// "The letters might look all jumbled up and out of order."
   	function drawJumpingLettersVisual(visualisationSentence){
   		drawVisualForString(visualisationSentence);

   		runScramble(); // Located in scramble.js.
   	}


   	// Visualisation: Pushed together.
   	// "The letters and words might look all bunched together"
   	function drawSpacingVisual(visualisationSentence){

	    // Div for visualisation.
	    var divForVisualisation = createDivForVisualisation();

	    // Create the animation for spacing.
	    var visualisation = $("<h3></h3>"); 
	    //visualisation.text("Spacing can look like this.");
	    visualisation.text(visualisationSentence)
	    visualisation.css("letter-spacing", "-5px");

	    var movement1 = function(speed){
		  visualisation.animate({"letter-spacing": "-4.7px"}, speed,function(){
		      movement2(speed)
		  });
		}

		var movement2 = function(speed){
		  visualisation.animate({"letter-spacing": "-4px"}, speed,function(){
		      movement1(speed)
		  });
		}

		movement1(18000); // Animation speed in ms.

     	// Add visualisation to the div.
		divForVisualisation.append(visualisation); 

		// Input field.
		var divForInput = createInputForm();

	   	// Continue button.
	   	var divForButton = createContinueButton();

		// Add it to the DOM.
	    $("#wrapper").append(divForVisualisation, divForInput, divForButton); 
   	}


	// Visualisation: backwards and upside down.
   	// "Some letters might appear as backwards or upside down"
   	function drawBackwardsVisual(visualisationSentence){

		var divForVisualisation = createDivForVisualisation();

		var stringToVisualise = prepareStringBackwardsUpsidedown(visualisationSentence);

		// Create a p-tag.
		var ptagWithStringToVisualise = $(stringToVisualise);

		divForVisualisation.append(ptagWithStringToVisualise);

		// Input field.
		var divForInput = createInputForm();

	   	// Continue button.
	   	var divForButton = createContinueButton();	

   		// Add it to the DOM.
	    $("#wrapper").append(divForVisualisation, divForInput, divForButton); 
   	}





   	// Kanske inte göra denna för måste ha en källa för detta.
   	// SHAKE EFFECT
	// https://stackoverflow.com/questions/18801874/how-to-shake-a-div-vertically-using-jquery-shake
	function drawVisualisation6(){

   	}

   	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   	// Hantera när man skriver input så byts bokstäver random också
   	// 


   	// TODO-LIST:
   	// - ha en källa på skrivproblem för dyslektiker
   	// - Skriv blockkommentarer eller lägg de i olika scripts
   	// - Press enter to submit answer
   	// - Komprimera visual funktionerna som alla skapar en div, input, button och lägg prepare string  funktions istället
   	// -    	// TODO: Skriv om funktionerna som är const, så man kan
   	// skicka in en sträng och tex byta bokstäver med
   	// var res = str.replace("o", "e");


   	

	// Source: https://www.dyslexia.com/question/what-dyslexics-see/
	//---------------------------------------------------------------------
	// Mål: Visa alla en och en, sen tydlig säga: 
	// "dyslektiker har olika severe dyslexi, och kan ha flera kombinationer av dessa, här kan det se ut när 1, 3, 5 tillsammans skrivs"
	// All text i programmet ska vara informationstext om dyslexi taget från någon känd dyslexi-sida med källa


	// 2. She might see text appearing to jump around on a page
	// Skriva ord med delim, som byter plats med varandra genom en random som plussar dessa separata ord till en string out += words;
	// eller gör med jquery från fiddlen här https://stackoverflow.com/questions/4822524/continuous-movement-animation-with-jquery
});


// MISC CODE


        // var sentence = $("#testText").text(); // Retrieve the text from the p-tag.
        // console.log("sentence = " + sentence);
        // console.log("sentence[1] = " + sentence[1]);

        // // Save the correct answer.
        // var answer1 = sentence;

        // // Change the text in the p-tag.
        // $("#testText").text("replaced the text");

        // $('body').html($('<div class="spinner"></div>'));
        // $("#wrapper").html($('<h2>nyligen skapat objekt</h2>'));
        // var txt1 = "<p>Text.</p>";              // Create text with HTML
	    // var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
	    // var txt3 = document.createElement("p");
	    // txt3.innerHTML = "Text.";               // Create text with DOM
	    // $("#wrapper").append(txt1, txt2, txt3);     // Append new elements	   