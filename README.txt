Name: Kevin Orsula
Email: kevin_orsula@student.uml.edu
Project: GUI HW5 - Single Line Scrabble
Github Link:
Pages Link: https://korsula01840186.github.io/GUI-HW5/

READ: When I uploaded the files to github, for some reason it no longer wants to show the black tile as having an image, even though there is one in the correct spot, and it works find on my local device.

WriteUP:
Tiles in the players hand are randomly selected from a data structure with the propper distribution of letters. Completed using Ramon Meza and Jason Downings Structure, but no json.
    const data = {"pieces": [...]}

Letters can be dragged and dropped ont the target scrabble squares. Completed.
    $( "#letterTile1" ).draggable({ revert: "invalid" }); -
    $( "#letterTile2" ).draggable({ revert: "invalid" }); |
    $( "#letterTile3" ).draggable({ revert: "invalid" }); |
	$( "#letterTile4" ).draggable({ revert: "invalid" }); | --- All of these make the letter tiles dragable and the revert is the bounce back
	$( "#letterTile5" ).draggable({ revert: "invalid" }); |
	$( "#letterTile6" ).draggable({ revert: "invalid" }); |
	$( "#letterTile7" ).draggable({ revert: "invalid" }); -
    $("#rack").droppable({     These two start the droppable areas the scrabble board tiles, and the rack
    $( ".board" ).droppable({

Program identifies which letter tile is dropped onto which square. Completed.
    Within the droppable function we find an ID that I assigned previously, so that we can identify the values of each subsequent letter tiles.
    I used https://stackoverflow.com/questions/11066497/jquery-ui-drag-droppable-with-multiple-scopes to help here
    var id = ui.draggable.attr("id");
	var index = hand.findIndex(hand => hand.id == id);
    hand[index].currentlyOn = this.id;
    $('#' + hand[index].previouslyOn).droppable('option', 'disabled', false);
	$('#' + hand[index].currentlyOn).droppable('option', 'disabled', true);

Board includes at least two bonus squares. Completed ( Implemented 4 ( 2 Double Word, 2 Double Letter )).

Score is tallied correctly, including the consideration of multipliers. Completed using many if else statements.
    Using many if statements, when function scoreCurrentWord(index, previouslyOn, nowOn){} is called it checks where the tile at the index came from, and where it goes to.
    Using this each seperate case has to be calculated.
    I use a global totaldoubleWord, that has to be calculated an change every time the score is updated.

Any number of words can be played until the player wishes to quit, start a new game, or depletes the number of tiles to draw. Completed.
The board is cleared after each round so that a new word can be played. Completed.
After a word is submitted, the game draws the users hand back up to 7 tiles. Completed.
    This function goes through all of the tiles out, and checks where they are. If they are not on the rack, (meaning they are on the board), they get updated with a new letter,
        and reformated onto the hand, with the remaining tiles from the last hand.
    for(var i = 0; i < 7; i++) {
		if(hand[i].currentlyOn != "rack") {
			var index = ramdomLetterIndex();
			var letter = data.pieces[index].letter;
			$("#" +hand[i].id).attr("src","img/" + letter + ".jpg");
		    hand[i].letter = data.pieces[index].letter;
		    hand[i].value = data.pieces[index].value;
            hand[i].previouslyOn = "rack";
		    hand[i].currentlyOn = "rack";
		}
	}
--> When it gets down to drawing the hand to less than the full 7 tiles, I had errors, so I stop the game once there are less than 7 tiles remaining in the deck.


Score is kept for the cumulitive total until a new game is started. Completed.
    I use a global totalScore variable that is updated after the submit word button is clicked, by adding on the current score which is the score for the word on the board.

Tiles can be dragged from the rack to the board, and from the board to the rack. If the tile is dropped anywhere besides these places it bounces back to the last dropped position. Completed.
    Read above with the draggable and droppables. The revert option bounces tiles back, and with both the rack and all board tiles being droppables, the letter tiles can be on either.

Tiles must be placed next to eachother after the first one is placed. Incomplete, i could not figure out how to force this.
    --Incomplete

The game can be restarted. Completed.
    The new game button

I also did not get a working version of the blank tiles working, so they currently have a score of 1 but do not change images.

Sources: I imbeded many of the sources within the code like asked, but some extra sources that I used for inspiration are:
The working example given in the assignment at http://yongcho.github.io/GUI-Programming-1/assignment9.html
https://github.com/mtaaha/Gui-hw9
https://github.com/anasahmed10/GUI-HW9
