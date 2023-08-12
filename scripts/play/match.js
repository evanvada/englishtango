

class MatchQuestion {
	constructor(text, sub_text, solution) {
		this.wrongs = 0
		this.rights = 0
		this.text = text
		this.sub_text = sub_text
		this.solution = solution
	}
}


let match_state = null
let match_score = 0
let match_questions = []
let match_answered_questions = []


function startMatch() {
	match_score = 0
	match_questions = []
	match_answered_questions = []
	match_questions = generateMatchQuestions(banks_selected)
	// start a match only if there are questions to ask
	if (match_questions.length < 1) {
		window.location.href = '/'
	} else {
		big_displayE.style.display = "block";
		small_displayE.style.display = "block";
		showQuestion()
	}
}


function generateMatchQuestions(banks_selected) {
	let match_questions = []
	// for each selected bank
	for (let i = 0; i < banks_selected.length; i++) {
		// get the bank that we want by iterating since we're not using a dictionnary
		let bank = word_banks.filter(bank => bank.name == banks_selected[i])[0].items;
		// generate questions depending on "Tenses Option"
		for (let j = 0; j < bank.length; j++) {
			switch (selected_tenses_option) {
				case "all":
					match_questions.push(new MatchQuestion(bank[j].fr, "Infinitif", bank[j].inf))
					match_questions.push(new MatchQuestion(bank[j].fr, "Passé Simple", bank[j].ps))
					match_questions.push(new MatchQuestion(bank[j].fr, "Participe Passé", bank[j].pp))
					break;
				case "infinitive":
					match_questions.push(new MatchQuestion(bank[j].fr, "Infinitif", bank[j].inf))
					break;
				case "past_simple":
					match_questions.push(new MatchQuestion(bank[j].fr, "Passé Simple", bank[j].ps))
					break;
				case "past_participle":
					match_questions.push(new MatchQuestion(bank[j].fr, "Participe Passé", bank[j].pp))
					break;
			}
		}
	}
	shuffleArray(match_questions)
	return match_questions
}


function verifyAnswer() {
	match_questions[0].answer = answer_inputE.value
	answer_inputE.value = ""
	// RIGHT
	if (match_questions[0].answer == match_questions[0].solution) {
		// feedback
		playASound(ding_sounds, general_volume)
		for (var i = 0; i < randomInt(50,300); i++) {
			glitters.push(new Glitter(0, answer_inputE.getBoundingClientRect().top+answer_inputE.getBoundingClientRect().height/2-canvas.height/2));
		}
		// update depending on "Responses Option"
		match_questions[0].rights += 1
		if (selected_responses_option == "repeat_question") {
			if (match_questions[0].wrongs == 0) { match_score += 1 }
			match_answered_questions.push(match_questions.shift());
		} else if (selected_responses_option == "one_chance") {
			match_score += 1
			match_answered_questions.push(match_questions.shift());
		}
		// show info of next question
		showQuestion()
	// WRONG
	} else {
		// feedback
		playASound(dont, general_volume, 0.5+Math.random()*0.5)
		shake = 10
		// show correction of this question
		showCorrection()
		// update depending on "Responses Option"
		match_questions[0].wrongs += 1
		if (selected_responses_option == "repeat_question") {
			var item = match_questions.shift()
			match_questions.splice(randomInt(0, match_questions.length-1), 0, item)
		} else if (selected_responses_option == "one_chance") {
			match_answered_questions.push(match_questions.shift());
		}
	}
}


function showQuestion() {
	// check if ther's still questions
	if (match_questions.length > 0) {
		match_state = "question"

		// show & hide elements
		answer_inputE.style.display = "inline";
		checkAnswer_buttonE.style.display = "inline";
		correction_outputE.style.display = "none";
		nextQuestion_buttonE.style.display = "none";

		// focus & update question asked
		answer_inputE.focus();
		big_displayE.innerHTML = match_questions[0].text
		small_displayE.innerHTML = match_questions[0].sub_text
	// end if there's no more
	} else {
		showGameOver()
	}
}


function showCorrection() {
	match_state = "correction"

	// show & hide elements
	answer_inputE.style.display = "none";
	checkAnswer_buttonE.style.display = "none";
	correction_outputE.style.display = "inline";
	nextQuestion_buttonE.style.display = "inline";

	// here will be the correction
	var correctionHTML = "";

	// correction algorithm
	var last_cc = 0
	for (var ac = 0; ac < match_questions[0].answer.length; ac++) {
		// get remaining characters
		var sliced_solution = match_questions[0].solution.slice(last_cc)
		// check if there's a corresponding char
		var cc = sliced_solution.indexOf(match_questions[0].answer[ac]);
		// if corresponding character found
		if (cc >= 0) {
			// display missed characters in between
			if (cc > 0) {
				correctionHTML += '<span style="color:#e80">'
				correctionHTML += sliced_solution.slice(0, cc)
				correctionHTML += '</span>'
			}
			// then display the character as right
			correctionHTML += '<span style="color:#0af">'
			correctionHTML += match_questions[0].answer[ac]
			correctionHTML += "</span>"
			last_cc += cc+1
		// else display the character as wrong
		} else {
			correctionHTML += '<strike style="color:#700"><span style="color:#700">'
			correctionHTML += match_questions[0].answer[ac]
			correctionHTML += '</span></strike>'
		}
	}
	// display the last missed characters
	if (last_cc < match_questions[0].solution.length) {
		correctionHTML += '<span style="color:#e80">'
		correctionHTML += match_questions[0].solution.slice(last_cc)
		correctionHTML += '</span>'
	}
	
	// show correction
	correction_outputE.innerHTML = correctionHTML;
}


function showGameOver() {
	match_state = "gameover";
	
	// make the canvas usable
	canvas.style.pointerEvents = "auto";

	// show & hide elements
	answer_inputE.style.display = "none";
	checkAnswer_buttonE.style.display = "none";
	correction_outputE.style.display = "none";
	nextQuestion_buttonE.style.display = "none";
	big_displayE.innerHTML = "Score : "+match_score+"/"+match_answered_questions.length;
	small_displayE.innerHTML = "Appuyez sur Échap pour continuer...";

	// different outputs depending on the score
	if (match_score/match_answered_questions.length < 0.4) {
		playASound(simple_lost, general_volume)
	} else if (match_score/match_answered_questions.length == 1) {
		playASound(cheers, general_volume);
		playASound(simple_win, general_volume);
		small_displayE.innerHTML = "CLIQUE SUR L'ÉCRAN !";
	} else if (match_score/match_answered_questions.length >= 0.8) {
		playASound(simple_win, general_volume);
	}
}


function matchUpdate() {

	// go to the next state when Enter pressed
	if (key["Enter"] && !last_key["Enter"]) {
		if (match_state == "question") {
			checkAnswer()
		} else if (match_state == "correction") {
			nextQuestion()
		}
	}
	// quit by going to the main page when Escape pressed
	if (key["Escape"] && !last_key["Escape"]) {
		window.location.href = '/'
	}

	// spawn flyingEmojis depending on the score
	if (match_state == "gameover") {
		if (match_score/match_answered_questions.length == 1) {
			if (randomInt(1,6) == 1) {
				emojis.push(new FlyingEmoji(randomFloat(-canvas.width/2, canvas.width/2), randomFloat(-canvas.height/2, canvas.height/2)));
			}
			// spawn glitter when mouse clicked
			if (mouse.left && !last_mouse.left) {
				playASound(explosion_sounds, general_volume*0.5, 0.5+Math.random()*0.5)
				let pos_x = mouse.x-canvas.width/2
				let pos_y = mouse.y-canvas.height/2
				for (let i = 0; i < randomInt(50,100); i++) {
					glitters.push(new Glitter(pos_x, pos_y));
				}
			}
		} else if (match_score/match_answered_questions.length >= 0.8) {
			if (randomInt(1,16) == 1) {
				emojis.push(new FlyingEmoji(randomFloat(-canvas.width/2, canvas.width/2), randomFloat(-canvas.height/2, canvas.height/2)));
			}
		}
	}
}

