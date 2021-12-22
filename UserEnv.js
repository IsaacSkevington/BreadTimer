let REQUIREMENTS = [VEGAN, NUTFREE, GLUTENFREE];
let RECIPEBOOKS = ["DefaultBook", "IsaacsBook"];
let RECIPELIST;
let RECIPEBOOK;

class User{
    constructor(){
        this.preferences = this.getPreferences();
        if(this.preferences == null){
            this.preferences = {"Requirements" : [], "Default Recipe Book" : "DefaultBook"}
            localStorage.setItem('RECIPEBOOKUSERPREFERENCES', JSON.stringify(this.preferences));
        }
    }

    setPreference(preferenceName, value){
        this.preferences[preferenceName] = value;
        localStorage.setItem('RECIPEBOOKUSERPREFERENCES', JSON.stringify(this.preferences));
    }

    getPreferences(){
        // Retrieve the object from storage
        return JSON.parse(localStorage.getItem('RECIPEBOOKUSERPREFERENCES'));
    }

    changePreferences(){
        let preferencesForm = document.createElement('form');
        preferencesForm.classList.add("PreferencesForm");

        let preferencesFormMain = document.createElement("MainPreferences");
        let preferencesLeft = document.createElement("LeftPreferences");
        let preferencesRight = document.createElement("RightPreferences");

        let requirementsHeading = document.createElement("PreferencesHeading");
        requirementsHeading.innerHTML = "Dietary Requirements";

        preferencesLeft.appendChild(requirementsHeading);
        let requirementsForm = document.createElement('Requirements');
        for(let i = 0; i < REQUIREMENTS.length; i++){

            let preferenceCheckContainer = document.createElement('PreferenceCheck')
            let preferenceCheck = document.createElement('input');
            preferenceCheck.type = 'checkbox';
            preferenceCheck.id = REQUIREMENTS[i];
            preferenceCheck.checked = contains(this.preferences["Requirements"], REQUIREMENTS[i]);

            let preferenceCheckLabel = document.createElement("label");
            preferenceCheckLabel.for = REQUIREMENTS[i];
            preferenceCheckLabel.innerHTML = REQUIREMENTS[i];

            preferenceCheckContainer.appendChild(preferenceCheckLabel);
            preferenceCheckContainer.appendChild(preferenceCheck);

            requirementsForm.appendChild(preferenceCheckContainer);
        }       

        preferencesLeft.appendChild(requirementsForm)

        let bookHeading = document.createElement("PreferencesHeading");
        bookHeading.innerHTML = "Default Recipe Book";

        preferencesRight.appendChild(bookHeading);
        let recipeBookForm = document.createElement("RecipeBooks");
        for(let i = 0; i < RECIPEBOOKS.length; i++){

            let bookRadioContainer = document.createElement('PreferenceCheck')
            let bookRadioCheck = document.createElement('input');
            bookRadioCheck.type = 'radio';
            bookRadioCheck.id = RECIPEBOOKS[i];
            bookRadioCheck.name = "BookSelector"
            bookRadioCheck.checked = this.preferences["Default Recipe Book"] ==  RECIPEBOOKS[i];

            let bookRadioLabel = document.createElement("label");
            bookRadioLabel.for = RECIPEBOOKS[i];
            bookRadioLabel.innerHTML = RECIPEBOOKS[i];

            bookRadioContainer.appendChild(bookRadioLabel);
            bookRadioContainer.appendChild(bookRadioCheck);


            recipeBookForm.appendChild(bookRadioContainer);
        }       
        preferencesRight.appendChild(recipeBookForm);


        preferencesFormMain.appendChild(preferencesLeft);
        preferencesFormMain.appendChild(preferencesRight)

        preferencesForm.appendChild(preferencesFormMain)
        let saveButton = document.createElement("input");
        saveButton.type = "submit"
        saveButton.value = "Save Changes"
        saveButton.classList.add("SaveButton");

        preferencesForm.onsubmit = ()=>{
            event.preventDefault();
            return this.savePreferences()
        }
        preferencesForm.appendChild(saveButton)
        return preferencesForm;
    }

    savePreferences(){
        let newRequirements = [];
        for(let i = 0; i < REQUIREMENTS.length; i++){
            if(document.getElementById(REQUIREMENTS[i]).checked){
                newRequirements.push(REQUIREMENTS[i]);
            }
        }
        this.setPreference("Requirements", newRequirements);
        for(let i = 0; i < RECIPEBOOKS.length; i++){
            if(document.getElementById(RECIPEBOOKS[i]).checked){
                this.setPreference("Default Recipe Book", RECIPEBOOKS[i]);
            }
        }
        RECIPEBOOK = new RecipeBook(this.preferences["Default Recipe Book"]);
        alert("Your new preferences have been set");

    }

}
let USER = new User();



