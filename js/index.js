// Memory Game
// © 2017 Chris Allen
// License - Harris Media: Roger Wicker For Senator
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy!
// Follow me on github [ChristopherAllen777]

(function(){ 
	
	var Memory = {
		// Setting up for gameplay
		init: function(cards){
			this.$game = $(".game");
			this.$start = $(".start");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.$startbutton = $(".startbutton");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
			// this.showStart(); 
		},
		// function for shuffling cards
		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},
		// function that builds out the visible html of the game.
		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     		this.guess = null;
		},
		// on 'click' event delegations for game play
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$startbutton.on("click", $.proxy(this.reset, this));
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 1100);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		// function called when all cards are matched. User wins and shows end modal for socials and to play again.
		win: function(){
			this.paused = true;
			this.hideStart();
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		// start modal used if developer wants a message displayed with start button
		showStart: function(){
			this.$overlay.show();
			this.$start.fadeIn("slow");
		},

		hideStart: function(){
			this.$overlay.hide();
			this.$start.hide();
		},
		// Modal shows when user wins. Gives links to socials and can share game via Facebook Share button plug in.
		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},
		// resets the game by hidding the end modal and shuffling cards to beggining setup function.
		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		// Correct HTML build function()
		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /> '+ v.name +'</div>\
				<div class="back"><img src="assets/crawl.png"\
				alt="Roger Wicker Logo" /></div></div>\
				</div>';
			});
			return frag;
		}
	};// var Memory = {} end tag


	// cards Array for gameplay cards.
	var cards = [

		// Uhuru 1
		{
			name: "Served 12 Million Kenyans At Huduma Centers",
			img: "assets/uhuru1.png",
			id: 1,
		},
		// Uhuru 2
		{
			name: "Gave An Additional 2,387,739 Citizens To NHIF Benefits",
			img: "assets/uhuru2.png",
			id: 2
		},
		// Uhuru 3
		{
			name: "Connected an Additional 2.1 Million People In Rural Areas to Safe Water",
			img: "assets/uhuru3.png",
			id: 3
		},
		// Odinga 1
		{
			name: "Was Called “Morally Bankrupt” By A Former Aide",
			img: "assets/odinga1.png",
			id: 4
		}, 
		// Odinga 2
		{   
			name: "Deploys Hitmen To Intimidate Opposing Voters",
			img: "assets/odinga2.png",
			id: 5
		},
		// Odinga 3
		{
			name: "Has Never Held A Peaceful Election",
			img: "assets/odinga3.png",
			id: 6
		},
	];
	// Function called to start the entire game
	Memory.init(cards);
})();