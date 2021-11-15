class IdManager{
    static currentID = 0;


    static getID(){
        IdManager.currentID++;
        return IdManager.currentID.toString();
    }
}