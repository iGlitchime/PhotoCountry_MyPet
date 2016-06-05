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
        //посылаем запрос на сервер для получения данных
        sendRequest("/test/PhotoCountry/php/getmodul.php", testCallback);
    },
    workWithInfo: function (answer) {   //обрабатываем полученный json
        //определяем элемент, в который будем добавлять кноки с действиями
        var Actions = document.getElementById('actions-block');
        Actions.innerHTML = "";
        var A = '';
        for (var i = 0; i < answer.length; i++) {
            //отрисовываем кнопки действий питомца
            A += '<div class="action" id="pic_' + i + '" data-action="' + i + '"></div>';
            //записываем в массив счетчиков данные по каждому действию - айди и время ожидания
            relaxWait.push([i, answer[i].recovery_time]);

        }
        Actions.innerHTML = A; //добавляем отрисованные кнопки
        console.log(Actions); //проверяем, что сохранилось и в каком виде

        //делаем выборку для клика по всем уже отрисованным кнопкам
        var actionEls = document.querySelectorAll('.action');

        //пробегаемся по всему массиву отрисованных кнопок для определения ивента нажатия одной из них
        for (var i = 0; i < actionEls.length; i++) {
            //вешаем событие
            new Tap(actionEls[i]);
            //определяем действие по нажатию
            actionEls[i].addEventListener('tap', ActionTap, false);
        }
        //описываем действие по событию
        function ActionTap(e) {
            e.preventDefault(); //запрещает активность клика сразу на два элемента, находящиеся друг на друге (слои)
            e.stopPropagation(); //запрещает всплытие
            // проверка актуальности
            console.log("клик прошел!");
            console.log(e.target);
            console.log(e.target.dataset.action);
            console.log(answer[e.target.dataset.action]);
            //пробуем достать данные по айди (дублировали в data-set) - для добавления звезд в счетчик
            console.log(answer[e.target.dataset.action].points);
            //    прописываем добавление звезд в общий счетчик
            countAllTaps += 1 * answer[e.target.dataset.action].points;
            //console.log(countAllTaps); //проверяем сумму
            //прописываем отображение количества звезд
            document.getElementById('points').innerHTML = countAllTaps;

            //блокируем нажатие и заменяем иконку действия на иконку ожидания (часы)
            document.getElementById('pic_' + e.target.dataset.action).style.pointerEvents = "none";
            document.getElementById('pic_' + e.target.dataset.action).style.backgroundImage = "url('css/img/timer.png')"; // подставляем картинку счетчика
            //вызываем функцию таймера обратного отсчета
            askForInfo.waitingTimer(e.target.dataset.action, relaxWait[e.target.dataset.action][1]);
        }
    //}
    },
    waitingTimer: function (id, Timer) {
        //рекурсивный таймер, для отображения остаточного времени (recovery_Time) юзеру
        function RecoveryTime() {
            if (Timer > 0) {
                Timer--;
                console.log(convertSecToTime(Timer)); //проверка в консоли

                //отображение счетчика для юзера
                document.getElementById('pic_' + id).innerHTML = convertSecToTime(Timer);
                //перезапускаем счетчик каждую секунду
                setTimeout(RecoveryTime, 1000);
            } else {
                //как только счетчик заканчивается, возвращаем кнопкам действий возможность клика
                // и изначальную картинку
                document.getElementById('pic_' + id).style.pointerEvents = "auto"; //разрешаем нажатие на кнопку
                document.getElementById('pic_' + id).style.backgroundImage = "url('css/img/pic_"+ id +".png')"; //очевидно, поясняем об этом юзеру
            }
        };
        //вызываем счетчик обратного таймера
        RecoveryTime();
    }
}

//конвертация общего количество секунд
function convertSecToTime(TimerInSeconds){
    var convTime = "";
    var hours = Math.floor(TimerInSeconds / (60 * 60)), //округляем до ближайшего целого числа
        divisor_for_minutes = TimerInSeconds % (60 * 60),
        minutes = Math.floor(divisor_for_minutes / 60), //округляем до ближайшего целого числа
        divisor_for_seconds = divisor_for_minutes % 60,
        seconds = Math.ceil(divisor_for_seconds); //округляем до ближайшего целого числа

    //корректируем отображение таймера при различных условиях
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
document.addEventListener('DOMContentLoaded', ready, false);