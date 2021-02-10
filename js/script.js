$( document ).ready(function() {
	
	// Precursor --
	// Looking back I should've just used a form, and a lot of this code could and would be cleaner.
	// That said, apparently I forgot they existed awww yeah
	
	// VARIABLES
	
	var questions = new Array;
	var answers = new Array;
	var answerScores = new Array;
	var finalScore = 0;
	
	console.log("Scripts are linked!");
	
	// FULLPAGE.JS SETUP
	
	$('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		keyboardScrolling: false,
		controlArrows: false,
		// handle animations for scrolling
		onLeave: function(index,nextIndex){
			// section animations
			// loading screen animations
			if(nextIndex == 8 ) {
				
				// slide picture in
				$("#resultAndFinish img").delay(500).addClass("animated slideInRight");
				
				// pretend to load
				$("#resultAndFinish h1").animate({
					opacity: 1
				  }, 1000, function() {
					$("#resultAndFinish h1").addClass("animated pulse infinite");
				  });
				
				// wait for timer then load results with effects and etc
				setTimeout(
					function() 
					{
						$("#resultAndFinish h1").removeClass("infinite").addClass("animated fadeOut");
						$("#resultAndFinish img").removeClass("animated slideInRight").addClass("animated slideOutRight");
						calculateResult();
				}, 5000);		
			}
		}
	});
	
	// prevent user scrolling
	$.fn.fullpage.setAllowScrolling(false);
	$.fn.fullpage.setAllowScrolling(false);
	
	$("#wrapper").fadeIn();
	
	// NAVIGATION AND SCROLLING
	
	// move to rules section
	// and start generating quiz content
	$("#introScreen > div > div > div.eleven.columns > div > button").click(function() {
		$.fn.fullpage.moveSectionDown();
		$("#rulesAndAbout img").addClass("animated slideInRight");
		generateQuiz();
		populateQuiz();
	});
	
	// move to quiz section
	$("#rulesAndAbout > div > div > div.six.columns > button").click(function() {
		$.fn.fullpage.moveSectionDown();
		$("#rulesAndAbout img").addClass("animated slideOutRight");
	});
	
	// quiz handling based on user clicks
	// if user clicks THIS button, then add THAT number to score
	$(".quizSection input[type='button']").click(function() {
		$.fn.fullpage.moveSectionDown();
		finalScore = finalScore + parseInt(answerScores[$(".quizSection input[type='button']").index(this)]);
	});
	
	// STYLING SCRIPTS
	
	// On hover, change button visuals
	$(".button").hover(
		function() {
			$( this ).addClass("button-primary");
		}, function() {
			$( this ).removeClass("button-primary");
		}
	);
	
	// AUDIO CONTROLS
	// Use toggle to play/pause when
	// play button is clicked
	var audioToggle = 0;
	
	$("#playBtn").click(function() {
		if (audioToggle == 0) {
			$("#player").get(0).play();
			$("#playBtn").html("<i class='fas fa-pause'></i>");
			audioToggle = 1;
		} else {
			$("#player").get(0).pause();
			$("#playBtn").html("<i class='fas fa-play'></i");
			audioToggle = 0;
		}
	});
	
	function generateQuiz() {
		
		// container for all questions and related answers
		// don't take the points assigned too seriously
		var questionSet = {
			quest1: 
				{
				question: "You and Stacy down the street have been engaged in guerilla wifefare ever since she moved in, and now you believe she stole your seafoam green kitchen aid during your last open house. At the moment, you have no proof of her transgression. You also have no kitchen aid. What do you do?",
				answer1: 2+"Proof or no proof, you know Stacy did it. In the dark of night, you'll interrogate her and get your answers... or else. Sea foam is your favorite color, after all.",
				answer2: 3+"It's time to let bygones be bygones. Ordering a triple A ruby red kitchen aid master 2.0, you throw another open house. As everyone compliments your baking, you'll thank Stacy for her help.",
				answer3: 1+"You don't have the time of day to stress over Stacy's trivial pursuits. Besides, you'll get another kitchen aid when her husband buys your secret anniversary."
				},
			quest2:
			{
				question: "After a long haul at the supermarket, you've finally arrived at the queue. You're just about to put up some of your groceries when an elderly woman todders past you and shuffles her stock onto the belt. She only has a few things, but you clearly there first. What do you do?",
				answer1: 2+"Make a big show of removing her items from the belt and tossing them behind you. If she makes a fuss, you'll assume she can't see you. It's tough being old.",
				answer2: 3+"If there's one thing you can't stand, it's people who can't follow social rules! You'll see how well she todders after she meets your volkswagen. You'll use your blinker, of course.",
				answer3: 1+"Nothing. It doesn't matter; she only has a few items and only a few years left to live anyway."
			},
			quest3:
			{
				question: "Your spouse's boss is coming over for dinner tonight, and it goes without saying that everything must be perfect. How do you ensure your spouse's next promotion? What do you rely on?",
				answer1: 1+"Nothing makes a company dinner more memorable than vintage drinks. Even if you have to rob the local winery, you're going to serve the best.",
				answer2: 2+"Get the kids involved! Little Timmy has been experimenting with an odd brews that temper social behaviors, and after drugging the milkman, you know they'd work in your favor.",
				answer3: 3+"Why change perfection? Your meatloaf is going to steal the show as it always does. You have your pact with Cthulthu to thank for that."
			},
			quest4:
			{
				question: "Tomorrow is Susie Q's 5th birthday, and the party will involve unicorns, princesses, and, of course, radioactive playdoh. The first two were quite easy to obtain, but it seems the last is more elusive. You could use a substitute, but you know Susie Q has a keen eye for hazardous materials. What do you do?",
				answer1: 3+"Time for some good old DYI. If you make some phone calls, you're sure to have the stuff in the morning. You'll just have to wake up a bit earlier for the assembling process.",
				answer2: 2+"Just because it's a substitute doesn't mean you have to sacrifice quality. You'll get Susie Q something else, but make sure it's just as dangerous.",
				answer3: 1+"What, are you the type to celebrate a kindergarten graduation? You think Susie Q could stand to be more realistic. A barbie knife set is the most she can expect."
			},
			quest5:
			{
				question: "Tonight is the grand finale of the Bachelor, one of your favorite catty dramas. Unfortunately, your in-laws also decided that tonight was the perfect time to show up uninvited, like always. What do you do?",
				answer1: 2+"Being the smart woman you are, you already invested in recording software for your TV programming. It sucks to wait, but you'll gladly use the show to decompress after entertaining your folks.",
				answer2: 1+"Your mother-in-law could use a hobby, and maybe a new dream husband. Using the time from their arrival to the finale itself, you're going to speedrun the series and get her just as invested. Your father-in-law will probably fall asleep, anyway.",
				answer3: 3+"Oh *cough* no. It seems you've suddenly come down with a cold. 'It's probably from my volunteer work at the childrens crafts group,' you tell your in-laws before locking yourself away in the master bedroom."
			},
			quest6:
			{
				question: "It's been awhile since the last family outing, and you can tell everyone is getting antsy from the doldrums of everyday life. A long weekend is coming up, and there's time to plan one. Where do you go?",
				answer1: 1+"The Zoo. A timeless classic, nothing says family bonding like enjoying the presence of exotic and often deadly animals.",
				answer2: 2+"A Theme Park. Entertaining for the entire family, you're sure to have fun yourself as long as you pack your child leashes.",
				answer3: 1+"Camping. Your kids are still young enough to enjoy nature, and it gives you the moral highground of boasting rights at the next PTA meeting."
			},
			quest7:
			{
				question: "Congrats! You're suddenly the richest person on the planet after the untimely death of your spouse. With the kids' bonds already set up in the will, the rest of the money is effectively yours. How will you spend your newfound riches?",
				answer1: 2+"Smartly. After making sure you're set up to retire and live off a healthy sum, you're going to go on a vacation. There's a margarita or two you'll dedicate to your dearly deceased.",
				answer2: 1+"Extravagantly. A life of riches has always been your way, and that's not going to change anytime soon. First you'll need a new bottle of perfume for wooing, however.",
				answer3: 3+"Quietly. You may now be the richest, but nobody else needs to know. One private funeral later, and you're moving to the coast with the kids. You will not miss your in-laws."
			},
			quest8:
			{
				question: "Little Timmy has been begging for a pet for months, and after bringing home the latest swamp monster, you've decided it's time to visit the pound and make it official. The question is, what pet(s) do you allow?",
				answer1: 1+"The sky's the limit. Although chattery, birds will make the perfect addition to your home. You see, Little Timmy's room is on the other side, and out of your hair.",
				answer2: 3+"Man's Best Friend. A permanently transformed werewolf wasn't your first option, but after it eats the nosy neighbor down the lane, you find it quite endearing.",
				answer3: 2+"A witch's familiar. Cats are smart, clean, and... not Little Timmy's pet. If you have to clean the litterbox, your new feline is yours and yours alone."
			}
		};
		
		// Do some math to obtain random number
		// Obtain five questions total using said number
		var min = 1;
		var max = 8;
		var questionGrab = [];
		while (questionGrab.length < 5) {
			var random = Math.floor(Math.random() * (max - min + 1)) + min;
			var check = questionGrab.includes(random);
			if (check == false) {
				questionGrab.push(random);
			}
		}
		
		// set questions and answers
		// these will then be used to populate the quiz
		questions[0] = questionSet['quest'+questionGrab[0]]["question"];
		questions[1] = questionSet['quest'+questionGrab[1]]["question"];
		questions[2] = questionSet['quest'+questionGrab[2]]["question"];
		questions[3] = questionSet['quest'+questionGrab[3]]["question"];
		questions[4] = questionSet['quest'+questionGrab[4]]["question"];
		answers = {
			q1:
			{
				a0: questionSet['quest'+questionGrab[0]]["answer1"],
				a1: questionSet['quest'+questionGrab[0]]["answer2"],
				a2: questionSet['quest'+questionGrab[0]]["answer3"]
			},
			q2:
			{
				a0: questionSet['quest'+questionGrab[1]]["answer1"],
				a1: questionSet['quest'+questionGrab[1]]["answer2"],
				a2: questionSet['quest'+questionGrab[1]]["answer3"]
			},
			q3:
			{
				a0: questionSet['quest'+questionGrab[2]]["answer1"],
				a1: questionSet['quest'+questionGrab[2]]["answer2"],
				a2: questionSet['quest'+questionGrab[2]]["answer3"]
			},
			q4:
			{
				a0: questionSet['quest'+questionGrab[3]]["answer1"],
				a1: questionSet['quest'+questionGrab[3]]["answer2"],
				a2: questionSet['quest'+questionGrab[3]]["answer3"]
			},
			q5:
			{
				a0: questionSet['quest'+questionGrab[4]]["answer1"],
				a1: questionSet['quest'+questionGrab[4]]["answer2"],
				a2: questionSet['quest'+questionGrab[4]]["answer3"]
			}
		};
		
		for (var i = 0; i < 3; i++){
			answerScores.push(answers["q1"]["a"+i].charAt(0));
			answerScores.push(answers["q2"]["a"+i].charAt(0));
			answerScores.push(answers["q3"]["a"+i].charAt(0));
			answerScores.push(answers["q4"]["a"+i].charAt(0));
			answerScores.push(answers["q5"]["a"+i].charAt(0));
		}
	};
	
	//dynamically adds content to sections based on the random generation done earlier
	function populateQuiz() {
		// questions
		$("#questionOne .container h4").text(questions[0]);
		$("#questionTwo .container h4").text(questions[1]);
		$("#questionThree .container h4").text(questions[2]);
		$("#questionFour .container h4").text(questions[3]);
		$("#questionFive .container h4").text(questions[4]);
		// answers
		for (var i = 0; i < 3; i++) {
			$("#questionOne .container p").eq(i).text(answers["q1"]["a"+i].slice(1));
			$("#questionTwo .container p").eq(i).text(answers["q2"]["a"+i].slice(1));
			$("#questionThree .container p").eq(i).text(answers["q3"]["a"+i].slice(1));
			$("#questionFour .container p").eq(i).text(answers["q4"]["a"+i].slice(1));
			$("#questionFive .container p").eq(i).text(answers["q5"]["a"+i].slice(1));
		}
	};
	
	// after five questions are answered, move to final section and calculate results
	function calculateResult() {
		$.fn.fullpage.moveSectionDown();
		// Change result content based on final score
		var x = finalScore;
		switch(true) {
			case (x < 5):
				console.log("debra");
				$("#end img").attr("src" , "assets/needsBeGone.jpg");
				$("#end h3").append(" Debra");
				$("#end p").text("Known for best orchestrating the perfect nuclear family unit. You know what works, and what doesn't, and while people wonder how you manage to do it all, it's none of their business-- nightly sacrifices to Cthulthu included.");
				break;
			case (x < 10):
				console.log("cheryl");
				$("#end img").attr("src" , "assets/houseKeeping.jpg");
				$("#end h3").append(" Cheryl");
				$("#end p").text("Often mistaken for a movie star, you're a classy woman who is always looking for the next big thing, like a replacement for your newly deceased formerly rich spouse. Regardless of what people think, your step-children love you and their undeniably thralled butlers.");
				break;
			case (x < 15):
				console.log("nancy");
				$("#end img").attr("src" , "assets/hopesAndDreams.jpg");
				$("#end h3").append(" Nancy");
				$("#end p").text("A pageant queen whose Golden Years never end. You're about as rare as they come, and you make sure others know it. After all, just by being in your presence seems to fill their lives with riches and joy, and it's all thanks to you.");
			break;
			default:
			// code block
		}
	};
});