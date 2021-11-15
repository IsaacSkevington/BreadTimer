class Timer{

    constructor(secs, endFunction){
        this.secs = secs;
        this.endFunction = endFunction;
    }


    static addzeros(i, n){
        let out = i.toString();
        for(var x = out.length; x < n; x++){
            out = "0" + out;
        }
        return out;
    }


    static secsToTime(secsIn){
        let s = secsIn;
        var days = Math.floor(s / (24 * 60 * 60));
        s -= days * 24 * 60 * 60;
        var hours = Math.floor(s / (60 * 60));
        s -= hours * 60 * 60;
        var minutes = Math.floor(s / 60);
        s -= minutes * 60;
        return Timer.addzeros(days, 2) + ":" + Timer.addzeros(hours, 2) + ":" + Timer.addzeros(minutes, 2) + ":" + Timer.addzeros(s, 2);
    }

    show(parent){
        let timer = document.createElement('Timer');
        timer.innerHTML = Timer.secsToTime(this.secs);
        this.displayid = IdManager.getID();
        timer.id = this.displayid;
        timer.className = "InProgress";
        document.getElementById(parent).appendChild(timer);
    }


    countdown(){
        this.secs -= 1;
        document.getElementById(this.displayid).innerHTML = Timer.secsToTime(this.secs);
        if(this.secs == 0){
            this.end();
        }
        else{
            setTimeout(()=>(this.countdown()), 1000);
        }
    }

    start(){
        setTimeout(()=>(this.countdown()), 1000)
    }

    end(){
        document.getElementById(this.displayid).className = "Complete"
        this.endFunction();
    }

    delete(){
        var elem = document.getElementById(this.displayid);
        elem.parentNode.removeChild(elem);
    }

}