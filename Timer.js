class Timer{

    constructor(secs, endFunction, endSound){
        this.secs = secs;
        this.endFunction = endFunction;
        this.pauseFlag = false;
        this.endSound = endSound
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
        this.displayid = IdManager.getID();
        timer.id = this.displayid;

        let timerValue = document.createElement('TimerValue');
        this.timerdisplayid = IdManager.getID();
        timerValue.id = this.timerdisplayid;
        timerValue.innerHTML = Timer.secsToTime(this.secs);
        timerValue.className = "InProgress";


        let timerButtons = document.createElement('TimerButtons');
        timerButtons.id = IdManager.getID();
        this.playButton = new Button("Play", timerButtons.id, 'mediaButton', ()=>(this.play()));
        this.pauseButton = new Button("Pause", timerButtons.id, 'mediaButton', ()=>(this.pause()));
        this.stopButton = new Button ("Stop", timerButtons.id, 'mediaButton', ()=>(this.stop()))

        timer.appendChild(timerValue);
        timer.appendChild(timerButtons);

        

        document.getElementById(parent).appendChild(timer);
        this.pauseButton.show();
        this.stopButton.show();

    }


    countdown(){
        if(this.pauseFlag){
            return 0;
        }
        this.secs -= 1;
        document.getElementById(this.timerdisplayid).innerHTML = Timer.secsToTime(this.secs);
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
        document.getElementById(this.timerdisplayid).className = "Complete";
        let audio = new Audio(this.endSound);
        audio.play();
        this.pauseButton.hide();
        this.stopButton.hide();
        this.endFunction();
    }

    pause(){
        this.pauseFlag = true;

        this.stopButton.hide()
        this.pauseButton.hide();

        this.playButton.show();
        this.stopButton.show();

    }

    play(){
        this.pauseFlag = false;

        this.playButton.hide();
        this.stopButton.hide();

        this.pauseButton.show();
        this.stopButton.show();
        this.start();
    }

    stop(){
        this.pauseFlag = true;
        document.getElementById(this.timerdisplayid).innerHTML = Timer.secsToTime(0);
        document.getElementById(this.timerdisplayid).className = "Complete";
        this.pauseButton.hide();
        this.playButton.hide();
        this.stopButton.hide();

        this.endFunction();
    }

    delete(){
        var elem = document.getElementById(this.displayid);
        elem.parentNode.removeChild(elem);
    }

}