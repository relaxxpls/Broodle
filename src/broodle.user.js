// ==UserScript==
// @name         Broodle
// @namespace    https://github.com/relaxxpls/Broodle
// @version      1.0.1
// @description  Brute Force Moodle Questions!
// @author       relaxxpls
// @copyright    2021, relaxxpls (https://github.com/relaxxpls)
// @license      MIT; https://raw.githubusercontent.com/relaxxpls/Broodle/main/LICENSE
// @icon         https://raw.githubusercontent.com/relaxxpls/broodle/main/docs/icon.png
// @homepageURL  https://github.com/relaxxpls/Broodle
// @supportURL   https://github.com/relaxxpls/Broodle/issues
// @match        https://*/mod/quiz/attempt.php*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

// Features:
// 1. Can do about 1,000 attempts in 10 mins!
// 2. Tries values from [1e-5, 1e5] with 2 significant fig accuracy
// 3. Customisable to use other ranges

// Set Start Values
// Eg: If you want to start at 0.1e-5
const S_D = 0.1; // Start decimal
const S_E = -5; // Start exponent

// Set End Values
// If you want to start at 9.9e5
const E_V = 9.9; // End decimal
const E_E = 5; // End exponent

// Decimal range 1e-5 to 1e5

;(function () {
	'use strict'
	let answerInput = document.querySelector('input[type=text].formulas_numeric')
	let checkButton = document.querySelector('input[type=submit][value=Check]')	
	var i = GM_getValue('broodle_i', S_D-0.1)
	var j = GM_getValue('broodle_j', S_E)
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
	}
	if (!status && i <= 5) {
		checkButton.click()
	}
})()