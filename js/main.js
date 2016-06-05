/**
 * Created by IATS on 03.06.16.
 */
"use strict";
/* ключает новый синтаксис */
var countAllTaps;
var ANSWER;
var relaxWait = [];

function ready() {
    askForInfo.GetFromServer(); //запрашиваем с сервера массив объектов.
}

var askForInfo = {
    GetFromServer: function () {
        sendRequest("/test/PhotoCountry/php/getmodul.php", testCallback);
    },
    workWithInfo: function (answer) {   //обрабатываем полученный json
        //определяем элемент, в который будем добавлять кноки с действиями
        var Actions = document.getElementById('actions-block');
        //document.getElementById('points').innerHTML = "START";
        Actions.innerHTML = "";
        var A = '';
        for (var i = 0; i < answer.length; i++) {
            //console.log(answer[i]);
            //отправляем на отрисовку кнопки и заголовок
            //A += '<div class="action" id="pic_' + i + '" data-action="' + i + '"><div class="timer' + i + '">' + answer[i].title + '</div></div>';
            A += '<div class="action" id="pic_' + i + '" data-action="' + i + '"></div>';

            console.log("data-action= " + i);
            relaxWait.push([i, answer[i].recovery_time]);

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
            console.log(e);
            console.log(e.target);
            console.log(e.target.dataset);
            console.log(e.target.dataset.action);
            console.log(answer[e.target.dataset.action]);
            //пробуем достать данные по айди (дублировали в data-set) - для добавления звезд в счетчик
            console.log(answer[e.target.dataset.action].points);
            //    прописываем добавление звезд в общий счетчик
            countAllTaps += 1 * answer[e.target.dataset.action].points;
            //console.log(countAllTaps); //проверяем сумму
            //прописываем отображение количества звезд
            document.getElementById('points').innerHTML = countAllTaps;

            ////блокируем нажатие
            document.getElementById('pic_' + e.target.dataset.action).style.pointerEvents = "none";
            document.getElementById('pic_' + e.target.dataset.action).style.backgroundImage = "url('css/img/timer.png')"; // подставляем картинку счетчика
            askForInfo.waitingTimer(e.target.dataset.action, relaxWait[e.target.dataset.action][1]);
        }
    //}
    },
    waitingTimer: function (id, Timer) {
        //Timer;
        function RecoveryTime() {
            if (Timer > 0) {
                Timer--;
                console.log(convertSecToTime(Timer));
                document.getElementById('pic_' + id).innerHTML = convertSecToTime(Timer);
                setTimeout(RecoveryTime, 1000);
            } else {
                document.getElementById('pic_' + id).style.pointerEvents = "auto"; //разрешаем нажатие на кнопку
                document.getElementById('pic_' + id).style.backgroundImage = "url('css/img/pic_"+ id +".png')"; //очевидно, поясняем об этом юзеру
            }
        };
        RecoveryTime();
    }
}

function convertSecToTime(TimerInSeconds){
    var convTime = "";
    var hours = Math.floor(TimerInSeconds / (60 * 60)),
        divisor_for_minutes = TimerInSeconds % (60 * 60),
        minutes = Math.floor(divisor_for_minutes / 60),
        divisor_for_seconds = divisor_for_minutes % 60,
        seconds = Math.ceil(divisor_for_seconds);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if(hours <=0){
        convTime = minutes + ":" + seconds;
    } else if(hours <=0 && minutes <= 0){
        convTime = seconds;
    } else if(hours <=0 && minutes <= 0 && seconds <= 0){
        convTime = "0";
    }else {
        convTime = hours + ":" + minutes + ":" + seconds;
    }
    return convTime;
}

//осталось:
//    прописываем вызов таймера
//    прописываем активацию кнопки
//    отрисовываем таймер


document.addEventListener('DOMContentLoaded', ready, false);