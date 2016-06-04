/**
 * Created by IATS on 03.06.16.
 */
"use strict";
/* ключает новый синтаксис */
var countAllTaps = 0;
var ANSWER;
var clickpropagate;
var relaxWait;

function ready() {
    askForInfo.GetFromServer(); //запрашиваем с сервера массив объектов.
    document.getElementById('points').innerHTML = "start";
}

var askForInfo = {
    GetFromServer: function () {
        sendRequest("/test/PhotoCountry/php/getmodul.php", testCallback);
    },
    workWithInfo: function (answer) {   //обрабатываем полученный json
        //определяем элемент, в который будем добавлять кноки с действиями
        var Actions = document.getElementById('actions-block');
        Actions.innerHTML = "";
        var A = '';
        for (var i = 0; i < answer.length; i++) {
            console.log(answer[i]);
            //отправляем на отрисовку кнопки и заголовок
            A += askForInfo.DrawActions(i, answer[i].title);

        }
        Actions.innerHTML = A; //добавляем отрисованные кнопки
        console.log(Actions); //проверяем, что сохранилось и в каком виде

        //делаем выборку для клика по всем уже отрисованным кнопкам
        var actionEls = document.querySelectorAll('.action');

        //пробегаемся по всем кнопкам отрисованными по массиву
        for (var i = 0; i < actionEls.length; i++) {
            //вешаем событие
            new Tap(actionEls[i]);
            actionEls[i].addEventListener('tap', ActionTap, false);
        }
        //описываем действие по событию
        function ActionTap(e) {
            e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
            e.stopPropagation(); //запрещает всплытие
            // проверка актуальности
            console.log("клик прошел!");
            //if(clickpropagate = true){
            //пробуем достать из локСтора данные  по айди - для добавления звезд в счетчик
            console.log(answer[e.target.dataset.action].points);
            //    прописываем добавление звезд в общий счетчик
            countAllTaps += 1 * answer[e.target.dataset.action].points;
            console.log(countAllTaps); //проверяем сумму
            //прописываем отображение количества звезд
            document.getElementById('points').innerHTML = countAllTaps;

            ////блокируем нажатие
            document.getElementById('pic_' + e.target.dataset.action).style.pointerEvents = "none";
            document.getElementById('pic_' + e.target.dataset.action).style.opacity = "0.2";
            document.getElementById('pic_' + e.target.dataset.action).innerHTML = 'Timer';
            askForInfo.ActionsAfterTimer(e.target.dataset.action);
            //askForInfo.waitingTimer(e.target.dataset.action,answer[e.target.dataset.action].recovery_time);
            //запускаем таймер
            //startCountdown(e.target.dataset.action);
            //}
        }
    },
    DrawActions: function (id, title) {
        //return '<div class="action" id="pic_'+ id +'" data -action="'+ id +'"><div class="timer'+ id +'">' + title + '</div></div>';
        var Div = '<div class="action" id="pic_' + id + '" data-action="' + id + '">' + title + '</div>';
        return Div;

    },
    ActionsAfterTimer: function (id) {
        //получаем время для таймера  из ЛокСтора
        //var Timer = (JSON.parse(localStorage.getItem("actionsData")))[id].recovery_time;
        var Timer = 5;

        console.log("таймер запущен по " + id);
        //ShowTimer(id);
        setTimeout(function(){
            console.log("а где счетчик?!!" + id);
            console.log("активируй картинку и нажатия!" + id);
            document.getElementById('pic_' + id).style.pointerEvents = "auto"; //разрешаем нажатие на кнопку
            document.getElementById('pic_' + id).style.opacity = "1"; //очевидно, поясняем об этом юзеру
        }, Timer*1000);
        console.log(Timer + " -  по айди" + id);
    //},
    //waitingTimer: function (id, Timer) {
    //    relaxWait = Timer * 1000;
    //    function RecoveryTime() {
    //        //relaxWait = Timer * 1000;
    //        if ((relaxWait - 1000) >= 0) {
    //            relaxWait = relaxWait - 1000;
    //
    //            console.log(relaxWait);
    //            setTimeout(RecoveryTime, 1000);
    //        }
    //    }
    }
}
//    прописываем вызов таймера
//    прописываем активацию кнопки
//    отрисовываем таймер


document.addEventListener('DOMContentLoaded', ready, false);