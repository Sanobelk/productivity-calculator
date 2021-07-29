#Productivity Calculator 
Consistently Under Construction!

##What is it exactly?

A simple time management calculator / list generator I coded to track my daily activities. 

Let me explain.

For the past few months, everyday, I have written down what I've done and for how long (or at least, I've tried to). This list is stored in a plain text file labeled *'month-day-year'*. 

I do this to see how my time is spent throughout the day, and how I can better utilize it. Whether it's coding, having lunch, or running out to the store, I track it. Everything is written down. Basically, at the end of the day, I want to see if my day was productive. If I've spent more time being productive than not, I call that day a success.

##How Did I Track It Before?

Simple. I will explain. I write down my start time for an activity, then when I'm done, I'd visit https://www.calculator.net/time-duration-calculator.html and calculate the time spent. I'd then record it next to the entry. Rinse and repeat.

<table>
    <tr>
    <th>Start Time</th>
    <th>End Time</th>
    <th>AM/PM</th>
    <th>Productive/Unproductive</th>
    <th>Activity</th>
    <th>Time Spent</th>
    </tr>
    <tr>
        <td>9:00</td>
        <td>10:00</td>
        <td>AM</td>
        <td>+++++</td>
        <td>Learn HTML Tables</td>
        <td>1H
    </tr>
    <tr>
        <td>10:00</td>
        <td>10:30</td>
        <td>AM</td>
        <td>/////</td>
        <td>Break</td>
        <td>30M
    </tr>

</table>

+++++ = Productive
///// = Unproductive

After my day is complete, I would head over to https://www.calculator.net/time-calculator.html
and manually enter every entry's time spent. I would then take the sum of Productive and Unproductive activities and compare them. If I spent more time being productive than unproductive, that day was productive for me, to an extent.

##What Does The App Do For me?

The app keeps me from visiting those two links and having to manually sum up all of the productive / unproductive activities of the day. With this app, I can also save my daily list of tasks and retrieve them if need be through local storage.

##To-Do

* [ ] Update Visual Appearance
* [ ] Refactor list into table
* [ ] Refactor localStorage data storing method to object based on days
* [ ] Allow users to load / export activity list by day
