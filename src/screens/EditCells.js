import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Input from '../components/Input';
import Block from '../components/Block';
import Button from '../components/Button';
import Typography from '../components/Text';
import { theme, profile } from '../constants';


export default class EditCell extends React.Component {
    state = {
        name:'',
        phone_number:'',
        email:'',
        loading:false,
        errors:[],
        text:'Add'
    }

    handleSubmit = () => {

    }

    componentDidMount() {
        const { route : { params }} = this.props;
        if(params) {
            this.setState({
                ...params.cell,
                text:'Update'
            })
        }

    }

    render() {
        const { name, phone_number, email, loading, errors, text } = this.state;
        const hasError = (key) =>  errors.includes(key);
        return (
            <Block style={styles.container} color={theme.colors.white}>
                <Typography center h3>{text} Cell</Typography>
                <Block padding={[5, 8]}>
                    <Input 
                        email
                        label={"Email"}
                        error={hasError('Email')}
                        value={email}
                        style={styles.input}
                        onChangeText={text => this.setState({email:text, errors:[]})}
                    />
                    <Input 
                        email
                        label={"Name"}
                        error={hasError('Name')}
                        value={name}
                        style={styles.input}
                        onChangeText={text => this.setState({name:text, errors:[]})}
                    />
                    <Input 
                        label={"Phone Number"}
                        error={hasError('Phone Number')}
                        value={phone_number}
                        style={styles.input}
                        onChangeText={text => this.setState({phone_number:text, errors:[]})}
                    />

                    <Button color={theme.colors.primary} onPress={this.handleSubmit}>
                        { loading && <ActivityIndicator size="small" color={theme.colors.white} />}
                        {!loading && 
                            <Typography center white>
                                Update
                            </Typography>
                        }
                    </Button>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:8
    },
    input:{
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0
    },
})