import React, {PropTypes, Component} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Fluxible from 'fluxible';
import IncrementStore from './stores/incrementStore';
// native fluxible-addons-react package does not word due to batchedUpdatePlugin export
import {connectToStores, provideContext} from './vendor/custom-fluxible-addons-react';
import {increment, decrement} from './actions/incrementActions';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        flex: 1,
        width: 50,
        textAlign: 'center'
    },
    info: {
        flex: 1
    },
    counter: {
        height: 50,
        flexDirection: 'row'
    }
});


class App extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired
    };

    static contextTypes = {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired
    };

    handleIncBtnClick = this.handleIncBtnClick.bind(this);
    handleDecBtnClick = this.handleDecBtnClick.bind(this);

    handleIncBtnClick() {
        this.context.executeAction(increment);
    }

    handleDecBtnClick() {
        this.context.executeAction(decrement);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    This is example application of Fluxible integration with React Native!
                </Text>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={this.handleDecBtnClick}>
                        <Text style={styles.button}>
                            -
                        </Text>
                    </TouchableOpacity>
                        <Text style={styles.info}>
                            Counter: {this.props.count}
                        </Text>
                    <TouchableOpacity onPress={this.handleIncBtnClick}>
                        <Text style={styles.button}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

App = provideContext(connectToStores(App, [IncrementStore], (context) => ({
        count: context.getStore(IncrementStore).getState().count
    })));

const app = new Fluxible({
    component: App,
    stores: [IncrementStore]
});

const context = app.createContext();
const componentContext = context.getComponentContext();

export default React.createElement(context.getComponent(), {context: componentContext});
