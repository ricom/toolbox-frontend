import React from "react";
import {CardComponent, CardComponentFields} from "../../../../../general-components/CardComponent/CardComponent";
import {Accordion} from "react-bootstrap";
import {NumberCounter} from "../../../../../general-components/Counter/NumberCounter";
import {RomanNumeralsCounter} from "../../../../../general-components/Counter/RomanNumeralsCounter";
import {LowerABCCounter} from "../../../../../general-components/Counter/LowerABCCounter";
import {UpperABCCounter} from "../../../../../general-components/Counter/UpperABCCounter";
import {isDesktop} from "../../../../../general-components/Desktop";
import {
    shallowCompareStepProps,
    Step,
    StepProp
} from "../../../../../general-components/Tool/SteppableTool/StepComponent/Step/Step";
import {SWOTAnalysisValues} from "../../SWOTAnalysis";
import {SWOTFactors} from "./SWOTFactors";
import {showErrorPage} from "../../../../../index";
import {
    IUIErrorContext,
    UIErrorContext
} from "../../../../../general-components/Contexts/UIErrorContext/UIErrorContext";
import {FooterContext} from "../../../../../general-components/Contexts/FooterContextComponent";
import {compareWithoutFunctions} from "../../../../../general-components/ComponentUtils";
import {UIErrorBanner} from "../../../../../general-components/Error/UIErrors/UIErrorBannerComponent/UIErrorBanner";


export interface SwotFactorsValues {
    factors: {
        chances: CardComponentFields
        risks: CardComponentFields
        strengths: CardComponentFields
        weaknesses: CardComponentFields
    }
}

interface SWOTFactorsState {

}

export class SWOTFactorsComponent extends Step<SWOTAnalysisValues, SWOTFactorsState> {


    constructor(props: StepProp<SWOTAnalysisValues>, context: any) {
        super(props, context);
    }


    shouldComponentUpdate(nextProps: Readonly<StepProp<SWOTAnalysisValues>>, nextState: Readonly<SWOTFactorsState>, nextContext: IUIErrorContext): boolean {
        let shouldUpdate: boolean;
        shouldUpdate = !shallowCompareStepProps(this.props, nextProps);
        if (!shouldUpdate) {
            const oldSave = this.props.save;
            const newSave = nextProps.save;
            if (oldSave.data["swot-factors"] !== newSave.data["swot-factors"]) {
                shouldUpdate = true;
            }
        }
        return shouldUpdate;
    }

    private applyCardComponentChanges(type: "strengths" | "weaknesses" | "chances" | "risks", values: CardComponentFields) {
        this.props.saveController.onChanged(save => {
            const data = save.data["swot-factors"];
            if (data !== undefined) {
                switch (type) {
                    case "strengths":
                        data.factors.strengths = values;
                        break;
                    case "weaknesses":
                        data.factors.weaknesses = values;
                        break;
                    case "chances":
                        data.factors.chances = values;
                        break;
                    case "risks":
                        data.factors.risks = values;
                }
            }
        });
    }

    private strengthsChanged = this.applyCardComponentChanges.bind(this, "strengths");
    private weaknessesChanged = this.applyCardComponentChanges.bind(this, "weaknesses");
    private chancesChanged = this.applyCardComponentChanges.bind(this, "chances");
    private risksChanged = this.applyCardComponentChanges.bind(this, "risks");

    build(): JSX.Element {
        const min = SWOTFactors.min;
        const max = SWOTFactors.max;
        let activeKey = "view";

        let values = this.props.save.data["swot-factors"]?.factors;
        if (values !== undefined) {
            return (
                <div className={"swot-factors"}>
                    <Accordion flush={true} activeKey={this.props.validationFailed ? activeKey : undefined}
                               defaultActiveKey={isDesktop() ? "strengths" : undefined}>
                        <Accordion.Item eventKey={this.props.validationFailed ? activeKey : "strengths"}>
                            <Accordion.Header>{SWOTFactors.strengthsCounter.get(1) + "-" + SWOTFactors.strengthsCounter.get(max)} -
                                Stärken (Interne Faktoren)</Accordion.Header>
                            <Accordion.Body>
                                <CardComponent required={false}
                                               values={values.strengths}
                                               counter={SWOTFactors.strengthsCounter}
                                               name={"strengths"}
                                               disabled={this.props.disabled}
                                               min={min}
                                               max={max}
                                               onChanged={this.strengthsChanged}/>
                                <UIErrorBanner id={"strengthsError"}/>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey={this.props.validationFailed ? activeKey : "weaknesses"}>
                            <Accordion.Header>{SWOTFactors.weaknessesCounter.get(1) + "-" + SWOTFactors.weaknessesCounter.get(max)} -
                                Schwächen (Interne Faktoren)</Accordion.Header>
                            <Accordion.Body>
                                <CardComponent required={false}
                                               values={values.weaknesses}
                                               counter={SWOTFactors.weaknessesCounter}
                                               name={"weaknesses"}
                                               disabled={this.props.disabled}
                                               min={min}
                                               max={max}
                                               onChanged={this.weaknessesChanged}/>
                                <UIErrorBanner id={"weaknessesError"}/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={this.props.validationFailed ? activeKey : "chances"}>
                            <Accordion.Header>{SWOTFactors.chancesCounter.get(1) + "-" + SWOTFactors.chancesCounter.get(max)} -
                                Chancen (Externe Faktoren)</Accordion.Header>
                            <Accordion.Body>
                                <CardComponent required={false}
                                               values={values.chances}
                                               counter={SWOTFactors.chancesCounter}
                                               name={"chances"}
                                               disabled={this.props.disabled}
                                               min={min}
                                               max={max}
                                               onChanged={this.chancesChanged}/>
                                <UIErrorBanner id={"chancesError"}/>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey={this.props.validationFailed ? activeKey : "risks"}>
                            <Accordion.Header>{SWOTFactors.risksCounter.get(1) + "-" + SWOTFactors.risksCounter.get(max)} -
                                Risiken (Externe Faktoren)</Accordion.Header>
                            <Accordion.Body>
                                <CardComponent required={false}
                                               values={values.risks}
                                               counter={SWOTFactors.risksCounter}
                                               name={"risks"}
                                               disabled={this.props.disabled}
                                               min={min}
                                               max={max}
                                               onChanged={this.risksChanged}/>
                                <UIErrorBanner id={"risksError"}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                </div>
            );
        }

        showErrorPage(404);
        return <p>"ERROR"</p>;


    }

}
