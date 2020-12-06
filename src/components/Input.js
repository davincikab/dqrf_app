import React from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';

import Typography from "./Text";
import Block from './Block';

import * as theme from '../constants/theme';


export default class Input extends React.Component {
    state = {
        toggleSecure: false
      };
    
      renderLabel() {
        const { label, error } = this.props;
    
        return (
          <Block flex={false}>
            {label ? (
              < Typography gray2={!error} accent={error}>
                {label}
              </ Typography>
            ) : null}
          </Block>
        );
    }
    

    render() {
        const { email, phone, number, secure, error, style, ...props } = this.props;

        const { toggleSecure } = this.state;
        const isSecure = toggleSecure ? false : secure;

        const inputStyles = [
            styles.input,
            error && { borderColor: theme.colors.accent },
            style
        ];

        const inputType = email
        ? "email-address"
        : number
        ? "numeric"
        : phone
        ? "phone-pad"
        : "default";

        return (
        <Block flex={false} margin={[5, 0]}>
            {this.renderLabel()}
            <TextInput
                style={inputStyles}
                secureTextEntry={isSecure}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={inputType}
                {...props}
            />
            {/* {this.renderToggle()}
            {this.renderRight()} */}
        </Block>
        )
    }
}

const styles = StyleSheet.create({
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.gray,
      borderRadius: theme.sizes.radius,
      fontSize: theme.sizes.font,
      fontWeight: "500",
      color: theme.colors.black,
      height: theme.sizes.base * 3
    },
    toggle: {
      position: "absolute",
      alignItems: "flex-end",
      width: theme.sizes.base * 2,
      height: theme.sizes.base * 2,
      top: theme.sizes.base,
      right: 0
    }
  });
  