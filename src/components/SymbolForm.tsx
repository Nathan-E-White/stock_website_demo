import * as React                                  from "react";
import {ChangeEvent, Component}                    from "react";
import {Button, Form, Container, Input, FormGroup} from "semantic-ui-react";


interface ISymbolFormProps {
    onSymbolChange: any;
    onSymbolSubmit: any;
    symbol: string;
    submittedSymbol: string;
}

interface ISymbolFormState {
}

class SymbolForm extends Component<ISymbolFormProps, ISymbolFormState> {

    constructor (props: ISymbolFormProps) {
        super (props);
        this.handleChange = this.handleChange.bind (this);
        this.handleSubmit = this.handleSubmit.bind (this);
    }

    handleChange = (e: ChangeEvent, data: Object) => {
        this.props.onSymbolChange(e, data);
    };


    handleSubmit = (e: any) => {
        this.props.onSymbolSubmit (e.target.value);
    };

    render () {

        const symbol = this.props.symbol;
        const submittedSymbol = this.props.submittedSymbol;

        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input
                                placeholder="Beep"
                                onChange={this.handleChange}
                                value={this.props.submittedSymbol}
                            />
                            <Button
                                content="Submit"
                            />
                        </FormGroup>
                    </Form>
                </Container>
                <strong>onChange:</strong>
                <pre>{JSON.stringify ({symbol}, null, 2)}</pre>
                <strong>OnSubmit:</strong>
                <pre>{JSON.stringify ({submittedSymbol}, null, 2)}</pre>
            </div>
        );
    }
}

// noinspection JSUnusedGlobalSymbols
export default SymbolForm;
