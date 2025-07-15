$(document).ready(function() {
	const lifesGlobal = sessionStorage.getItem('lifesPublic');
	const questionsAnswerGlobal = sessionStorage.getItem('questionsAnswers');
	const questionPositiveGlobal = sessionStorage.getItem('questionsPositives');
	const questionNegativeGlobal = sessionStorage.getItem('questionsNegatives');
	const questionHoraGlobal = sessionStorage.getItem('timeHoras');
	const questionMinutosGlobal = sessionStorage.getItem('timeMinutos');
	const questionSegundosGlobal = sessionStorage.getItem('timeSegundos');
	if (lifesGlobal == null || questionsAnswerGlobal == null || questionPositiveGlobal == null || questionNegativeGlobal == null){
		window.location = "index.html";
	}
	$("#vidasRestantes").text(lifesGlobal + " vidas restantes.");
	if (questionPositiveGlobal == 1){
		$("#cantRespuestasCorrectas").text(questionPositiveGlobal + " respuesta correcta.");
	}
	else{
		$("#cantRespuestasCorrectas").text(questionPositiveGlobal + " respuestas correctas.");
	}
	if (questionNegativeGlobal == 1){
		$("#cantRespuestasIncorrectas").text(questionNegativeGlobal + " respuesta incorrecta.");
	}
	else{
		$("#cantRespuestasIncorrectas").text(questionNegativeGlobal + " respuestas incorrectas.");
	}
	$("#textoPregunta").text("Respondiste "+questionsAnswerGlobal+" preguntas de 100 posibles.")

	$("#textoTiempo").text("Demoraste "+questionMinutosGlobal+" minutos y "+questionSegundosGlobal+" segundos.");
});

