class Hello extends React.Component {
    render() {
        return <div>hello {this.props.name}</div>;
    }
}
ReactDOM.render(<Hello name="React"/>, document.getElementById('root'));