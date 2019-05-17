import React from 'react';

export default class Registries extends React.Component {

    state = { ref: null };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;

        // console.log(drizzle);
        // console.log(drizzleState);

        const contract = drizzle.contracts.TimeControl;

        //console.log(contract);

        //let drizzle know we want to watch the GetMyRegistries method
        const ref = contract.methods["GetMyRegistries"].cacheCall();

        //save the registries to local component state for later reference
        this.setState({ ref });
    }

    render() {

        //get the contract state from drizzleState
        const { TimeControl } = this.props.drizzleState.contracts;
        console.log(TimeControl);

        //using the saved registries, get the variable we're interested in
        const registries = TimeControl.GetMyRegistries[this.state.ref];

        // console.log('registries');
        // console.log(registries);

        return (
            <div className="container">
                <h3>My Registries</h3>
                <small className="text-muted">Account: {this.props.drizzleState.accounts[0]}</small>
                <table className="table">
                    <thead>
                        <tr>
                            <th>EPO</th>
                            <th>Date Time</th>
                        </tr>
                    </thead>
                    <tbody>                       
                        {registries && registries.value.map(function (registry, index) {
                            let d = new Date(0); //The 0 there is the key, which sets the date to epoch
                            d.setUTCSeconds(registry);
                            return <tr key={index}><td>{registry}</td><td>{d.toLocaleString()}</td></tr>;
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}