

import {
    StepDataHandler,
    StepDefinition,

} from "../../../../../general-components/Tool/SteppableTool/StepComponent/StepComponent";
import {PersonaAnalysisValues} from "../../PersonaAnalysis";
import {UpdateImgActionsValues , UploadImgInfoValues} from "../../steps/SWOTAlternativeActions/UpdateImgActionsValuesComponent";
import {StepProp} from "../../../../../general-components/Tool/SteppableTool/StepComponent/Step/Step";
import {UIError} from "../../../../../general-components/Error/UIErrors/UIError";
import { PersonaShowComponent } from "./PersonaShowComponent";

export class PersonaShow implements StepDefinition<PersonaAnalysisValues>, StepDataHandler<PersonaAnalysisValues>  {

    form: React.FunctionComponent<StepProp<PersonaAnalysisValues>> | React.ComponentClass<StepProp<PersonaAnalysisValues>>;
    id: string;
    title: string;
    dataHandler: StepDataHandler<PersonaAnalysisValues>;


    constructor() {
        this.id = "Profibild hochladen";
        this.title = "3. persona show";
        this.form = PersonaShowComponent;
        this.dataHandler = this;
       
    }

    
    isUnlocked = (data: PersonaAnalysisValues): boolean =>    data["persona-factors"]?.factors.art_der_Erkrankung!==undefined && data["persona-factors"]?.factors.qualifikation.length>0;

    fillFromPreviousValues = (data: PersonaAnalysisValues): PersonaAnalysisValues => this.deleteData(data);

    deleteData(data: PersonaAnalysisValues): PersonaAnalysisValues {
       
        return data;
    }

    validateData(data: PersonaAnalysisValues): UIError[] {
        const errors = Array<UIError>();
        return errors;
    }
}