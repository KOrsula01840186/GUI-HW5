// Name: Kevin Orsula
// Email: kevin_orsula@student.uml.edu

var hand = []; //Current tile on the rack
var remainingTilesArray = []; //Array for number of tile available for each letter
var totalScore = 0; //Variable to carry the totalScore of the game
var score = 0; //Variable to carry the current word score
var totaldoubleWord = 1; //Multiplier needed for double word scoring
var remainingTilesCount = 0; //Count of the remaining tiles in remainingTilesArray

const data = {"pieces": [ //Data Structure to Contain the data of the tiles
			{"letter":"A", "value":1,  "amount":9}, {"letter":"B", "value":3 , "amount":2 }, {"letter":"C", "value":3,  "amount":2},
			{"letter":"D", "value":2,  "amount":4}, {"letter":"E", "value":1 , "amount":12}, {"letter":"F", "value":4,  "amount":2},
	        {"letter":"G", "value":2,  "amount":3}, {"letter":"H", "value":4 , "amount":2 }, {"letter":"I", "value":1,  "amount":9},
			{"letter":"J", "value":8,  "amount":1}, {"letter":"K", "value":5 , "amount":1 }, {"letter":"L", "value":1,  "amount":4},
			{"letter":"M", "value":3,  "amount":2}, {"letter":"N", "value":1 , "amount":6 }, {"letter":"O", "value":1,  "amount":8},
			{"letter":"P", "value":3,  "amount":2}, {"letter":"Q", "value":10, "amount":1 }, {"letter":"R", "value":1,  "amount":6},
			{"letter":"S", "value":1,  "amount":4}, {"letter":"T", "value":1 , "amount":6 }, {"letter":"U", "value":1,  "amount":4}, 
            {"letter":"V", "value":4,  "amount":2}, {"letter":"W", "value":4 , "amount":2 }, {"letter":"X", "value":8,  "amount":1},
			{"letter":"Y", "value":4,  "amount":2}, {"letter":"Z", "value":10, "amount":1 }, {"letter":"_", "value":1,  "amount":2}], "creator":"Ramon Meza"};

function scoreCurrentWord(index, previouslyOn, nowOn) { //Function used to update the surrent score
    if(previouslyOn == "rack") { //If the tile came from the rack
        if(nowOn == "doubleWord1" || nowOn == "doubleWord2") { //If the tile is now on a doubleWord
            score = score / totaldoubleWord;
            score = score + hand[index].value;
            totaldoubleWord = totaldoubleWord * 2;
            score = score * totaldoubleWord;
        } else if( nowOn == "doubleLetter1" || nowOn == "doubleLetter2") { //If the tile is now on a doubleLetter
            score = score / totaldoubleWord;
            score = score + hand[index].value * 2;
            score = score * totaldoubleWord;
        } else if( nowOn == "rack") { //Nothing Happens Here
        } else { //Id the tile is now in a regularLetter
            score = score / totaldoubleWord;
            score = score + hand[index].value;
            score = score * totaldoubleWord;
        }
    } else if(previouslyOn == "doubleWord1" || previouslyOn == "doubleWord2") { //If the tile came from a doubleWord
        if(nowOn == "doubleLetter1" || nowOn == "doubleLetter2") { //If the tile is now on a doubleLetter
            score = score / totaldoubleWord;
            score = score - hand[index].value;
            score = score + hand[index].value * 2;
            totaldoubleWord = totaldoubleWord / 2;
            score = score * totaldoubleWord;
        } else if(nowOn == "rack") { //If the tile is now on the rack
            score = score / totaldoubleWord;
            score = score - hand[index].value;
            totaldoubleWord = totaldoubleWord / 2;
            score = score * totaldoubleWord;
        } else { //If the tile is now on a regularLetter
            score = score / totaldoubleWord;
            totaldoubleWord = totaldoubleWord / 2;
            score = score * totaldoubleWord;
        }
    } else if(previouslyOn == "doubleLetter1" || previouslyOn == "doubleLetter2") { //If the tile came from a doubleLetter
        if(nowOn == "doubleWord1" || nowOn == "doubleWord2") { //If the tile is now on a doubleWord
            score = score / totaldoubleWord;
            score = score - hand[index].value * 2;
            score = score + hand[index].value;
            totaldoubleWord = totaldoubleWord * 2;
            score = score * totaldoubleWord;
        } else if( nowOn == "rack") { //If the tile is now on the rack
            score = score / totaldoubleWord;
            score = score - hand[index].value * 2;
            score = score * totaldoubleWord;
        } else { //If the tile is now on a regularLetter
            score = score / totaldoubleWord;
            score = score - hand[index].value * 2;
            score = score + hand[index].value;
            score = score * totaldoubleWord;
        }
    } else { //If the tile came from a regularLetter 
        if( nowOn == "doubleWord1" || nowOn == "doubleWord2") { //If the tile is now on a doubleWord
            score = score / totaldoubleWord;
            totaldoubleWord = totaldoubleWord * 2;
            score = score * totaldoubleWord;
        } else if( nowOn == "doubleLetter1" || nowOn == "doubleLetter2") { //If the tile is now on a doubleLetter
            score = score / totaldoubleWord;
            score = score - hand[index].value;
            score = score + hand[index].value * 2;
            score = score * totaldoubleWord;
        } else if(nowOn == "rack") { //If the tile is now on the rack
            score = score / totaldoubleWord;
            score = score - hand[index].value;
            score = score * totaldoubleWord;
        } else { //If the tile is now on a regularLetter
            //Nothing Happens Here
        }
    }
}
$(document).ready(function(){ //What happens once the document loads
    startGame();
});
function startGame() { //Function that starts the game
    resetRemainingTilesArray(); //Resets the remainingtiles amount array
    totaldoubleWord = 1; //Updates the variables
    score = 0;
    totalScore = 0;
	createLetterTiles(); //Creates the 7 starting letter tiles
    $("#currentWordScore").text("Current Word Score:" + score); //Updates the word score to the screen
    $("#totalScore").text("Total Score:" + totalScore); //Updates the total score to the screen
    makeGameBoard();

    $( "#letterTile1" ).draggable({ revert: "invalid" }); //makes all of the letter tiles draggable, and will snap them back to position if not in a droppable
    $( "#letterTile2" ).draggable({ revert: "invalid" });
    $( "#letterTile3" ).draggable({ revert: "invalid" });
	$( "#letterTile4" ).draggable({ revert: "invalid" });
	$( "#letterTile5" ).draggable({ revert: "invalid" });
	$( "#letterTile6" ).draggable({ revert: "invalid" });
	$( "#letterTile7" ).draggable({ revert: "invalid" });

    //https://stackoverflow.com/questions/11066497/jquery-ui-drag-droppable-with-multiple-scopes
    //https://jqueryui.com/droppable/#revert
    //https://jqueryui.com/droppable/
    //I could not get these working by myself, so the above links are the two that I used, thati could find again when I was writing these comments
	$("#rack").droppable({ //The droppable function for the rack
        activate: function() { //Highlights the border if the place is droppable
            $(".board").css("border", "2px solid blue");
            $("#rack").css("border", "2px solid blue");
        }, 
	    drop: function( event, ui ) { //What happens when a droppable object is dropped there
            $(".board").css("border", "2px solid black");
            $("#rack").css("border", "0px");

			var id = ui.draggable.attr("id"); //Gets the id of the dropped object
			var index = hand.findIndex(hand => hand.id == id);
            hand[index].currentlyOn = this.id;
			$('#' + hand[index].previouslyOn).droppable('option', 'disabled', false);

            scoreCurrentWord(index, hand[index].previouslyOn, hand[index].currentlyOn); //Updates the score
            hand[index].previouslyOn = hand[index].currentlyOn;
            $("#currentWordScore").text("Current Word Score: " + score);
		}
	});
    $( ".board" ).droppable({ //The droppable function for the game board
        activate: function() { //Highlights the border if the place is droppable
            $(".board").css("border", "2px solid blue");
            $("#rack").css("border", "2px solid blue");
        }, 
		drop: function( event, ui ) { //What happens when a droppable object is dropped there
            $(".board").css("border", "2px solid black");
            $("#rack").css("border", "0px");
            $(this).css("border", "2px solid green");

			var id = ui.draggable.attr("id"); //Gets the id of the dropped object
			var index = hand.findIndex(hand => hand.id == id);
		    hand[index].currentlyOn = this.id;
			$('#' + hand[index].previouslyOn).droppable('option', 'disabled', false);
			$('#' + hand[index].currentlyOn).droppable('option', 'disabled', true);

            scoreCurrentWord(index, hand[index].previouslyOn, hand[index].currentlyOn); //Updates the score
		    hand[index].previouslyOn = hand[index].currentlyOn;
            $("#currentWordScore").text("Current Word Score: " + score);
		}
	});
}

$("#newGame").click(function() { //Event listener for the new game button
    $('.board').droppable('option', 'disabled', false);
	for(var index = 0; index < hand.length; index++) hand[index].previouslyOn = "rack";
    startGame();
})
$("#submitWord").click(function() { //Event Listener for submit word button
    $('.board').droppable('option', 'disabled', false); //Updates the variables needed to start a new word
    $('.board').css( "border", "2px solid black" );
    $("#rack").css("border", "0px");
    totalScore = totalScore + score; //Refreshes the viewed text
    totaldoubleWord = 1;
    $("#totalScore").text("Total Score: " + totalScore);
	score = 0;
    $("#currentWordScore").text("Current Word Score: " + score);

    if(remainingTilesCount <= 7) { //Checks if we are out of tiles
        $("#remainingtiles2").text("Remaining tiles: You Are Out Of tiles. Please Click Reset.")
		return;
	}
	for(var i = 0; i < 7; i++) { //Refills the rack with more letter tiles depending on if they are not on the rack
		if(hand[i].currentlyOn != "rack") {
			var index = ramdomLetterIndex();
			var letter = data.pieces[index].letter;
			$("#" +hand[i].id).attr("src","img/" + letter + ".jpg");
		    hand[i].letter = data.pieces[index].letter;
		    hand[i].value = data.pieces[index].value;
            hand[i].previouslyOn = "rack";
		    hand[i].currentlyOn = "rack";
            //$("#" +hand[i].id).css("left", (10+96*i));
		}
        $("#" +hand[i].id).css("left", (10+96*i)); //Reorganizes the tiles on the rack
        $("#" +hand[i].id).css("top", $("#rack").position().top + 2);
	}

    printRemainingTiles(); //print out the new letter distribution
})

function createLetterTiles(){ //Creates the letter tiles needed for the game
    //$("#debug").text("Got to the createLetterTiles function.");
    $(".letterTile" ).each(function( index, element ) {
        var randIndex = ramdomLetterIndex();
        var letter = data.pieces[randIndex].letter;
        var value = data.pieces[randIndex].value;
        hand[index] = new maketile(($(element).attr("id")), letter, value, "rack", "rack");
        $( element ).css("left", (10+96*index));
        $( element ).css("top", $("#rack").position().top + 2);
        $(element).attr("src","img/" + letter + ".jpg");
    });
    printRemainingTiles();
}

function makeGameBoard() { //Creates the game board tiles and updates the background images.
    $( ".board" ).each(function( index, element ) {
        if($( this ).is("#doubleLetter1")  || $( this ).is("#doubleLetter2")) $(element).attr("src", "img/doubleLetter.png");
        else if($( this ).is( "#doubleWord1" ) || $( this ).is( "#doubleWord2" )) $(element).attr("src","img/doubleWord.png");
        else $(element).attr("src","img/regularLetter.png");
    });
}
function resetRemainingTilesArray() { //Resets the remaining tiles amount array
    remainingTilesCount = 0;
    for(var i = 0; i < 27; i++) {
        remainingTilesArray[i] = data.pieces[i].amount;
        remainingTilesCount += data.pieces[i].amount;
    }
}
function ramdomLetterIndex() { //Function used to get a random index of a letter that still had tiles ramaining
    var x = 1;
    while(x > 0) {
        var y = Math.floor(Math.random()*27);
        if( remainingTilesArray[y] == 0 ) x = 1;
        else x = 0;
    }
    remainingTilesArray[y] = remainingTilesArray[y] - 1;
    remainingTilesCount--;
    return y;

}

function maketile(id, letter, value, currentlyOn, previouslyOn) { //Function used to update the key values of a specific tile
    this.letter = letter;
    this.id = id;
    this.value = value;
    this.currentlyOn = currentlyOn;
    this.previouslyOn = previouslyOn;
} 

function printRemainingTiles() { //Function used to print out the remaining tiles
    //$("#debug").text("Got to the printRemainingTiles function.");
    var output = "Remaining tile: ";
    for(var i = 0; i < 27; i++) output = output + " " + data.pieces[i].letter + " : " + remainingTilesArray[i] + "|";
    $("#remainingTiles2").text(output);
}