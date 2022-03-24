const getForecast = function(location){
    fetch(`/weather?address=${location}`)
        .then((response)=>{
            response.json().
                then((data)=>{
                    if(data.error){
                        messageOne.style.color = '#ff0000';
                        messageOne.textContent = data.error;
                    }else{
                        messageOne.textContent = data.location;
                        messageTwo.textContent = data.forecast;
                    }
                })   
        });
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;

    messageOne.style.color = '#333333';
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    getForecast(location);

});