const flat = sessionStorage.getItem('flat');
if (flat == null){
	window.location = "index.html";
}

var lifes = 5;

var questionCount = 1

var questionsGlobal = desordenarArray(questions);

var questionPositivas = 0;

var questionNegativas = 0;

var time = 0;

var timerInterval;

var seconds = 0;

var minutes = 0;

var hours = 0;

cargaPregunta();

cargaRespuestas(); 

cargaPictureQuestion();

verificarLifes();

function desordenarArray(array) {

  return array.sort(() => Math.random() - 0.5);

}


function cargaPregunta(){

	$('#textoPregunta').text(questionsGlobal[0].question);

}

function cargaRespuestas(){

	$('#rpta1').text(questionsGlobal[0].options[0]);
	$('#rpta2').text(questionsGlobal[0].options[1]);
	$('#rpta3').text(questionsGlobal[0].options[2]);
	$('#rpta4').text(questionsGlobal[0].options[3]);
	$('#rpta1').val(questionsGlobal[0].options[0]);
	$('#rpta2').val(questionsGlobal[0].options[1]);
	$('#rpta3').val(questionsGlobal[0].options[2]);
	$('#rpta4').val(questionsGlobal[0].options[3]);

}

function cargaPictureQuestion(){

	$("#pictureQuestionTmp").css('background-image', 'url(./img/picture' + questionsGlobal[0].num + '.jpg)');

}

function eliminarQuestion(matrix){

	 questionsGlobal = matrix.slice(1);

}

function verificaRpta(valor){

	var respuesta = "";

	if (valor == '0'){
		respuesta = $("#rpta1").val();
	}
	if (valor == '1'){
		respuesta = $("#rpta2").val();
	}
	if (valor == '2'){
		respuesta = $("#rpta3").val();
	}
	if (valor == '3'){
		respuesta = $("#rpta4").val();
	}
	if (questionsGlobal[0].answer == respuesta)
	{

		mostrarToastCorrect();
		sumaQuestionPositiva();
		
	}
	else{
		mostrarToastIncorrect();
		lifes = lifes - 1;
		sumaQuestionNegativa();
	}
	muestraBotonSiguiente();
	desabilitaRespuestas();
	mostrarRespuestaCorrecta(questionsGlobal[0].answer);
	eliminarQuestion(questionsGlobal);
	refreshLifes();
}

function sumaQuestionPositiva(){

	questionPositivas = questionPositivas + 1;

}

function sumaQuestionNegativa(){

	questionNegativas = questionNegativas + 1;

}

function sumaQuestion(){

	questionCount = questionCount + 1;

}

function actualizaNumeroQuestion(){

	$("#numQuestion").text("Pregunta " + questionCount);

}

function muestraBotonSiguiente(){

	$("#btnSiguiente").removeClass("invisible");

}

function desabilitaRespuestas(){

	$("#rpta1").prop('disabled', true);
	$("#rpta2").prop('disabled', true);
	$("#rpta3").prop('disabled', true);
	$("#rpta4").prop('disabled', true);

}

function mostrarRespuestaCorrecta(respuesta){

	if ($("#rpta1").val() == respuesta){
		$("#rpta1").addClass("correcto");
	}
	if ($("#rpta2").val() == respuesta){
		$("#rpta2").addClass("correcto");
	}
	if ($("#rpta3").val() == respuesta){
		$("#rpta3").addClass("correcto");
	}
	if ($("#rpta4").val() == respuesta){
		$("#rpta4").addClass("correcto");
	}

}


function refreshLifes(){

	if (lifes == 0){
		$("#picLifes").css('background-image', 'url(./img/lifes_0.png)');
	}
	if (lifes == 1){
		$("#picLifes").css('background-image', 'url(./img/lifes_1.png)');
	}
	if (lifes == 2){
		$("#picLifes").css('background-image', 'url(./img/lifes_2.png)');
	}
	if (lifes == 3){
		$("#picLifes").css('background-image', 'url(./img/lifes_3.png)');
	}
	if (lifes == 4){
		$("#picLifes").css('background-image', 'url(./img/lifes_4.png)');
	}
	if (lifes == 5){
		$("#picLifes").css('background-image', 'url(./img/lifes_5.png)');
	}

}

function habilitaRespuestas(){

	$("#rpta1").prop('disabled', false);
	$("#rpta2").prop('disabled', false);
	$("#rpta3").prop('disabled', false);
	$("#rpta4").prop('disabled', false);

}

function mostrarToastCorrect(){

	bootstrap.Toast.getOrCreateInstance($('#toastCorrect')).show();

}

function mostrarToastIncorrect(){

	bootstrap.Toast.getOrCreateInstance($('#toastIncorrect')).show();

}


function actualizaQuestion(){

	verificarLifes();
	cargaPregunta();
	cargaRespuestas(); 
	cargaPictureQuestion();
	habilitaRespuestas();
	ocultaSiguiente();
	limpiarMarcadoCorrecto();
	sumaQuestion();
	actualizaNumeroQuestion();

}

function verificarLifes(){

	if (lifes < 1){
		sessionStorage.setItem('lifesPublic', lifes);
		sessionStorage.setItem('questionsAnswers', questionCount);
		sessionStorage.setItem('questionsPositives', questionPositivas);
		sessionStorage.setItem('questionsNegatives', questionNegativas);
		sessionStorage.setItem('timeHoras', hours);
		sessionStorage.setItem('timeMinutos', minutes);
		sessionStorage.setItem('timeSegundos', seconds);
		window.location.href = "results.html";
	}

}

function ocultaSiguiente(){

	$("#btnSiguiente").addClass("invisible");

}


function limpiarMarcadoCorrecto(){

	$("#rpta1").removeClass("correcto");
	$("#rpta2").removeClass("correcto");
	$("#rpta3").removeClass("correcto");
	$("#rpta4").removeClass("correcto");

}



function startTimer() {
  timerInterval = setInterval(updateTimer, 1000); // Actualiza cada segundo
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }
  displayTime();
}

function displayTime() {
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  $("#timer").text("Tiempo utilizado " + formattedTime); // Suponiendo un elemento HTML con id="timer"
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  hours = 0;
  displayTime();
}

startTimer();