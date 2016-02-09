#Typr
Typr is a small script which you can use to type out a text automatically.

##How do I use the script?
After including the script in your page, you can use the `Typr.type` method to type out your text. The method accepts a maximum of 4 parameters and a minimum of 2.

##Parameters
* The first parameter is the element where you want the script to type in
* The second parameter is the message you want to have typed out.
* The third parameter can be set to `true` or `false` and determines whether you want an initial delay (by default between 200 and 500 miliseconds) before typing the message out.
* The last parameter is the callback method after the message has been typed out.

##Special combinations
You can use a couple of special character combinations in the message parameter, these are:
* `{br}` this will translate into a `<br>` tag and will be typed out as one instead of having all the characters typed out separately.
* `{number}` use this to set a delay of `number` miliseconds in the message
* `{number:number}` use this to set a random delay between `number`and `number`
* `{<}` use this to type out a backspace (thus remove a character)
* `{<:number}` this will translate into `number` backspaces

##Info
Backspaces follow each other at a rate of 10 to 50 miliseconds whereas other characters follow each other at a rate of 50 to 100 miliseconds. Furthermore, after punctuation characters (. , ; :) there is a waiting time of 50 to 200 miliseconds. With a little bit of script hacking you can easily change these intervals if you want to but the way it is set up now makes for a natural typing speed.
