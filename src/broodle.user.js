// ==UserScript==
// @name         Broodle
// @namespace    https://github.com/relaxxpls/Broodle
// @version      1.0.0
// @description  Brute Force Moodle Questions!
// @author       relaxxpls
// @match        https://*/mod/quiz/attempt.php*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// Features:
// 1. Can do about 1,000 attempts in 10 mins!
// 2. Tries values from [1e-5, 1e5] with 2 significant fig accuracy
// 3. Customisable to use other ranges

;(function () {
	'use strict'
	let answerInput = document.querySelector('input[type=text].formulas_numeric')
	let checkButton = document.querySelector('input[type=submit][value=Check]')
	// Decimal range 1e-5 to 1e5
	var i = GM_getValue('broodle_i', -5)
	var j = GM_getValue('broodle_j', 0.1)
	answerInput.value = j.toPrecision(3) + 'e' + i
	j += 0.1
	if (j < 10) {
		GM_setValue('broodle_j', j)
	} else {
		j = 0.1
		i++
		GM_setValue('broodle_j', j)
		GM_setValue('broodle_i', i)
	}
	// Check current status
	let statusNode = document.querySelector('.grade')
	const status = statusNode.innerText[5] - '0'
	if (status) {
		// Reset
		GM_setValue('broodle_j', 0.1)
		GM_setValue('broodle_i', -5)
		alert('Answer = ' + j.toPrecision(3) + 'e' + i)
	} else if (i <= 5) {
		checkButton.click()
	}
})()