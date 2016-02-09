var Typr = {
    /*
        Special method charactercombinations
        -   {br} line break
        -   {number} miliseconds to wait
        -   {number:number} miliseconds to wait between
        -   {<} backspace
        
        Default waiting time at start is between 200 and 500 miliseconds
        Default waiting time is between 50 and 100 miliseconds
        Default waiting time after punctuation is between 200 and 500 miliseconds
        Default backspace waiting time is between 10 and 50 miliseconds
    */
    punctuation:[ ".", ",", ";", ":" ],
    random: function(min, max) {
        return (Math.random()*(max-min))+min;  
    },
    type: function(el, msg, start, callback) {
        var wait = Typr.random(50,100);
        if((typeof start == 'undefined')
           ||((typeof start == "boolean")&&(start==true))
           ||((typeof start == "string")&&(Typr.punctuation.indexOf(start)>-1))) {
            //start = true -> wait
            wait = Typr.random(200, 500);
            //explode message
            var rx_backspace = /({<:)(\d+)(})/;
            var found = msg.match(rx_backspace);
            while(found != null) {
                var ns = "";
                var n = parseInt(found[2]);
                for(var i = 0; i < n; i++) { ns+="{<}"; }
                msg = msg.replace(rx_backspace, ns);
                found = msg.match(rx_backspace);
            }
        }
        //check for next character
        var rx0 = /^(\d+)$/;
        var rx1 = /^(\d+)(:)(\d+)$/;
        var next = msg.substring(0,1);
        if(next=="{") {
            //chekc for special char
            var valid = true;
            var idx = msg.indexOf("}");
            var seq = msg.substring(1, idx);
            if(seq=="br") { next = "<br>"; }
            else if(seq=="<") {
                next = "{<}";
                if(start=="{<}") { wait = Typr.random(10,50); }
            } else if (rx0.test(seq)) {
                //set wait time
                wait = parseInt(seq.match(rx0)[1]);
                next = "";
            } else if(rx1.test(seq)) {
                var mx = seq.match(rx1);
                wait = Typr.random(parseInt(mx[1]), parseInt(mx[3]));
                next = "";
            } else { valid = false; }
            if(valid==true) {
                //consume characters
                msg = msg.substring(idx+1);
            }
        } else { msg = msg.substring(1); }
        //wait and type out
        setTimeout(function() {
            if(next=="{<}") { el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1); }
            else { el.innerHTML += next; }
            //execute next
            if(msg.length>0) { Typr.type(el, msg, (next=="<br>") ? true : next, callback); }
            else { callback.call(); }
        }, wait);
    }
};