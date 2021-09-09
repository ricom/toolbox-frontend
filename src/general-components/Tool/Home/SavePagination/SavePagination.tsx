import React, {Component, ReactNode} from "react";
import {SimpleSaveResource} from "../../../Datastructures";
import {PaginationFooter} from "../../../PaginationFooter/PaginationFooter";
import {Loader} from "../../../Loader/Loader";
import {Session} from "../../../Session/Session";
import {getSaves} from "../../../API/calls/Saves";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Tool} from "../../Tool";

import './save-pagination.scss'


interface SavePaginationState {
    saves: Array<Array<SimpleSaveResource>>
    page: number
    pageCount: number
    loading: boolean
}

interface SavePaginationProps {
    tool: Tool
}

class SavePagination extends Component<SavePaginationProps, SavePaginationState> {

    constructor(props: Readonly<SavePaginationProps> | SavePaginationProps);
    constructor(props: SavePaginationProps, context: any);
    constructor(props: Readonly<SavePaginationProps> | SavePaginationProps, context?: any) {
        super(props, context);
        this.state = {
            page : 1,
            saves: new Array<Array<SimpleSaveResource>>(),
            pageCount: 1,
            loading:false
        }
    }


    shouldComponentUpdate (nextProps: Readonly<SavePaginationProps>, nextState: Readonly<SavePaginationState>, nextContext: any): boolean{
        return true;
        // return nextState.page !== this.state.page || this.checkIfSavesDiffer(nextState.saves[nextState.page], this.state.saves[nextState.page]);
    }

    checkIfSavesDiffer(oldSaves: Array<SimpleSaveResource>, newSaves: Array<SimpleSaveResource>): boolean{
        return oldSaves !== newSaves;
    }

    private pageChosenCallback = (currentPage: number) => {
        this.setState({
            page: currentPage
        }, () => {
            this.loadSavesIfNeeded(this.state.page);
        });

    };

    loadToolSaves = async (page:number = 1) => {
        if (Session.isLoggedIn()) {
            let userID = Session.currentUser?.getID() as number;

            this.setState({
                loading:true
            });
            let call = await getSaves(userID, Session.getToken(), this.props.tool.getID(), page);
            if (call.success && call.callData.data.length > 0) {
                let saves = call.callData.data;
                this.updateSaves(call.callData.meta.current_page, saves);
                this.setState({
                    pageCount: call.callData.meta.last_page,
                    loading:false
                })
            }
        }
    };


    private updateSaves(page:number, newSaves:Array<SimpleSaveResource>){
        this.setState((s) => {
            let newState = {saves:s.saves.slice()};
            newState.saves[page] = newSaves;
            return newState;
        });
    }

    private loadSavesIfNeeded(page:number = 1){
        if(this.state.saves[page] === null || this.state.saves[page] === undefined){
            this.loadToolSaves(page);
        }
    }


    componentDidMount(): void {
        this.loadToolSaves();
    }

    render(): ReactNode {
        console.log(this.state);
        console.log(!this.state.loading);
        return (
            <div>
                <Loader payload={[]} loaded={(!this.state.loading)}>

                    <ListGroup>
                        {this.state.saves[this.state.page]?.length <= 0 && (
                            <ListGroupItem>Sie haben aktuell keine Speicherstände.</ListGroupItem>
                        )}

                        {this.state.saves[this.state.page]?.map(value => {
                            let save = value;
                            return (
                                <ListGroupItem as={Link} to={this.props.tool?.getLink() + "/" + save.id}
                                               key={save.id}
                                               action>
                                    {save.name}
                                </ListGroupItem>
                            );
                        })}

                    </ListGroup>

                </Loader>
                <PaginationFooter pageCount={this.state.pageCount} pageChosen={this.pageChosenCallback} currentPage={this.state.page} disabled={this.state.loading}/>
            </div>
        );
    }


}


export {
    SavePagination
}

export type {
    SavePaginationProps,
    SavePaginationState
}
