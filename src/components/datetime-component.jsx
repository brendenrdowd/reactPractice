import { useEffect } from 'react';
import {React, useState} from 'react';
import Flipclock from "react-simple-flipclock";

const DatetimeComponent = () => {
  // const [time,setTime] = useState('');
  const [myDate,setMyDate] = useState('')
  useEffect(()=>{
    createDateObj();
  })

  const createDateObj = () =>{
    const d = new Date();
    const dateTimeString = d.toLocaleString('default', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    
    setMyDate(dateTimeString)
  }

  // Digital Clock Variables and Functions
  var hoursContainer = document.querySelector('.hours')
  var minutesContainer = document.querySelector('.minutes')
  var secondsContainer = document.querySelector('.seconds')
  var tickElements = Array.from(document.querySelectorAll('.tick'))

  var last = new Date(0)
  last.setUTCHours(-1)

  var tickState = true

  function updateTime () {
    var now = new Date
    
    var lastHours = last.toLocaleString('default', {
      hour: 'numeric',  hour12: true})
    var nowHours = now.toLocaleString('default', {
      hour: 'numeric',  hour12: true})
    if (lastHours !== nowHours) {
      updateContainer(hoursContainer, nowHours)
    }
    
    var lastMinutes = last.getMinutes().toString()
    var nowMinutes = now.getMinutes().toString()
    if (lastMinutes !== nowMinutes) {
      updateContainer(minutesContainer, nowMinutes)
    }
    
    last = now
  }

  function tick () {
    tickElements.forEach(t => t.classList.toggle('tick-hidden'))
  }

  function updateContainer (container, newTime) {
    var time = newTime.split('')
    
    if (time.length === 1) {
      time.unshift('0')
    }
    
    
    var first = container.firstElementChild
    if (first.lastElementChild.textContent !== time[0]) {
      updateNumber(first, time[0])
    }
    
    var last = container.lastElementChild
    if (last.lastElementChild.textContent !== time[1]) {
      updateNumber(last, time[1])
    }
  }

  function updateNumber (element, number) {
    var second = element.lastElementChild.cloneNode(true)
    second.textContent = number
    
    element.appendChild(second)
    element.classList.add('move')

    setTimeout(function () {
      element.classList.remove('move')
    }, 990)
    setTimeout(function () {
      element.removeChild(element.firstElementChild)
    }, 990)
  }

  setInterval(updateTime, 100)

  return (
    <div>
      <h1>Today is {myDate} </h1>
      {/* Add digital Clock */}
      <div class="clock">
  <div class="hours">
    <div class="first">
      <div class="number">0</div>
    </div>
    <div class="second">
      <div class="number">0</div>
    </div>
  </div>
  <div class="tick">:</div>
  <div class="minutes">
    <div class="first">
      <div class="number">0</div>
    </div>
    <div class="second">
      <div class="number">0</div>
    </div>
  </div>
  <div class="tick">:</div>
  <div class="seconds">
    <div class="first">
      <div class="number">0</div>
    </div>
    <div class="second infinite">
      <div class="number">0</div>
    </div>
  </div>
</div>    </div>
  );
};

export default DatetimeComponent;