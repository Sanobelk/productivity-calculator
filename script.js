"use strict";


let user_hour_select = document.querySelectorAll('.hour_selection');
let user_minute_select = document.querySelectorAll('.minute_selection');
let saved_history = window.localStorage;

document.getElementById('save').addEventListener('click',function(){
    saveData();
})
document.getElementById('load').addEventListener('click',function(){
    loadData();
})

let now_buttons = document.querySelectorAll('.now');

now_buttons.forEach(element => {
    element.addEventListener('click',function(){
        setTimeNow(element);
    })
});


user_hour_select.forEach(element =>{
    element.addEventListener('click',function(){
        expand_selection(element);
    });
});

user_minute_select.forEach(element =>{
    element.addEventListener('click',function(){
        expand_selection(element);
    });
});

function expand_selection(element){

    //if selection is an hour input
    if(element.classList.contains('hour_selection')){
        if(element.classList.contains('expand')){
            return;
        }else{
            console.log('expand added');
            element.classList.add('expand');
            for (let i = 2; i <= 12; i++){
                let temp = document.createElement('option');
                let temp_id = element.getAttribute('id');
                temp.setAttribute('id',`${temp_id}_${i}`);
                if(i < 10){
                    temp.innerHTML = `0${i}`;
                }else{
                temp.innerHTML = i;
                }
                element.append(temp);
            }
        }
    //if selection is a minute input
    } else {
        if(element.classList.contains('expand')){
            return;
        }else{
            console.log('expand added');
            element.classList.add('expand');
            for (let i = 1; i <= 59; i++){
                let temp = document.createElement('option');
                let temp_id = element.getAttribute('id');
                temp.setAttribute('id',`${temp_id}_${i}`);
                if(i < 10){
                    temp.innerHTML = `0${i}`;
                }else{
                temp.innerHTML = i;
                }
                element.append(temp);
            }
        }
    }
}

function getTimeDifference(){
    let start_hour = +document.getElementById('start_hours').value;
    let start_minutes = +document.getElementById('start_minutes').value;
    let start_ampm = document.getElementById('start_ampm').value;
    let end_hour = +document.getElementById('end_hours').value;
    let end_minutes = +document.getElementById('end_minutes').value;
    let end_ampm = document.getElementById('end_ampm').value;
    //console.log(`
    //Start Time : ${start_hour} : ${start_minutes} ${start_ampm}\n
    //End Time: ${end_hour} : ${end_minutes} ${end_ampm};`);

    let start_time = new Date();
    if(start_ampm == 'PM'){
        start_hour+=12;
        
    }
    start_time.setHours(start_hour);
    start_time.setMinutes(start_minutes);
    start_time.setSeconds(0);

    let end_time = new Date();
    if(end_ampm == 'PM'){
        end_hour+=12;
    }
    end_time.setHours(end_hour);
    end_time.setMinutes(end_minutes);
    end_time.setSeconds(0);

    let date = new Date();
    date.setHours(end_time.getHours() - start_time.getHours());
    date.setMinutes(end_time.getMinutes() - start_time.getMinutes());
    date.setSeconds(0);
    return date;
}

document.getElementById('submit').addEventListener('click',function(){
    let time = getTimeDifference();
    let total_productive_hours = document.getElementById('total_productive_hours');
    let total_productive_minutes = document.getElementById('total_productive_minutes');
    let total_unproductive_hours = document.getElementById('total_unproductive_hours');
    let total_unproductive_minutes = document.getElementById('total_unproductive_minutes');
    let total_hours = document.getElementById('total_time_hours');
    let total_minutes = document.getElementById('total_time_minutes');

    if(document.getElementById('activity').value == ''){
        document.getElementById('activity_error').innerHTML = 'Error: Task Required';
        setTimeout(() =>{
            document.getElementById('activity_error').innerHTML = '*';
        },3000);
        return;
    }

    //Productive Time Counted
    if(document.getElementById('radio_productive').checked){
        total_productive_hours.innerHTML = +total_productive_hours.innerHTML + time.getHours();
        total_productive_minutes.innerHTML = +total_productive_minutes.innerHTML + time.getMinutes();
        if(total_productive_minutes.innerHTML >= 60){
            total_productive_hours.innerHTML = +total_productive_hours.innerHTML+ 1;
            total_productive_minutes.innerHTML = +total_productive_minutes.innerHTML - 60;
        }

    }

    //Unproductive Time Counted
    if(document.getElementById('radio_unproductive').checked){
        total_unproductive_hours.innerHTML = +total_unproductive_hours.innerHTML + time.getHours();
        total_unproductive_minutes.innerHTML = +total_unproductive_minutes.innerHTML + time.getMinutes();
        if(total_unproductive_minutes.innerHTML >= 60){
            total_unproductive_hours.innerHTML = +total_unproductive_hours.innerHTML+ 1;
            total_unproductive_minutes.innerHTML = +total_unproductive_minutes.innerHTML - 60;
        }

    }

    //Total Time Counted
    total_hours.innerHTML = +total_hours.innerHTML + time.getHours();
    total_minutes.innerHTML = +total_minutes.innerHTML + time.getMinutes();
    if(total_minutes.innerHTML >= 60){
        total_hours.innerHTML =+total_hours.innerHTML + 1;
        total_minutes.innerHTML =+total_minutes.innerHTML -60;
    }

    addEntryToList(time);

    if(isDayFinished()){
        document.getElementById('submit').disabled = true;
    };
    checkProductivity();
})

function addEntryToList(time){
    let temp = document.createElement('li');
    let activity = document.getElementById('activity').value;
    let productivity;
    if(document.getElementById('radio_productive').checked){
        productivity = "<span class='productive'>PRODUCTIVE</span>";
    }else{
        productivity = "<span class='unproductive'>UNPRODUCTIVE</span>";
    }
    temp.innerHTML = `<span class="history_item"> ${activity} : ${productivity} : ${time.getHours()} hours, ${time.getMinutes()} minutes.`;
    document.getElementById('list').insertAdjacentHTML('beforeend',temp.outerHTML);
}

function isDayFinished(){
     if(document.getElementById('total_time_hours').innerHTML >= 24){
        return true;
    }
}

function checkProductivity(){
    let total_time = document.getElementById('total_time');
    let total_productive_hours = document.getElementById('total_productive_hours').innerHTML;
    let total_productive_minutes = document.getElementById('total_productive_minutes').innerHTML;
    let total_unproductive_hours = document.getElementById('total_unproductive_hours').innerHTML;
    let total_unproductive_minutes = document.getElementById('total_unproductive_minutes').innerHTML;

    if(+total_productive_hours > +total_unproductive_hours){
        total_time.style.color="green";
    }else if(+total_productive_hours < +total_unproductive_hours){
        total_time.style.color="red";
    }else if(+total_productive_hours == +total_unproductive_hours && +total_productive_minutes > +total_unproductive_minutes){
        total_time.style.color="green";
    }else if(+total_productive_hours == +total_unproductive_hours && +total_productive_minutes < +total_unproductive_minutes){
        total_time.style.color="red";
    }else{
        total_time.style.color="black";
    }
    console.log(`Total Productive Hours: ${total_productive_hours}\nTotal Unproductive_hours: ${total_unproductive_hours}`);
}

function saveData(){
    saved_history.setItem('history',document.getElementById('list').innerHTML); //could be an array instead, but saving the text will do for now.

    //remove the data.
    let list_items = document.querySelectorAll('li');
    list_items.forEach(element => {
        element.remove();
    });
}

function loadData(){
    document.getElementById('list').innerHTML = saved_history.getItem('history');
}

function setTimeNow(element){
    let date = new Date();
    if(element.getAttribute('id') == 'now_start'){
        expand_selection(document.getElementById('start_hours'));
        expand_selection(document.getElementById('start_minutes'));
        document.getElementById('start_hours').value = date.getHours();
        document.getElementById('start_minutes').value = date.getMinutes();
        if(date.getHours() >= 12){
            document.getElementById('start_ampm').value = 'PM';
    }
    }else{
        expand_selection(document.getElementById('end_hours'));
        expand_selection(document.getElementById('end_minutes'));
        document.getElementById('end_hours').value = date.getHours();
        document.getElementById('end_minutes').value=date.getMinutes();
        if(date.getHours() >= 12){
            document.getElementById('end_ampm').value = 'PM';
        }
    }
}