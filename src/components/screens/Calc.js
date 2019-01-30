import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import CalcButton from "../presentation/CalcButton";

class Calc extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      pendingOperation: null,
      firstOperand: ""
    };
    this.validkeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "+",
      "-",
      "/",
      "*",
      "=",
      "C" // not number cuz Text input Get Only String
    ];
    // this.handelInput = this.handelInput.bind(this);
    // this.handelButtonInput = this.handelButtonInput.bind(this);
  }

  handelInput(text) {
    // only number
    this.setState({
      inputText: text
    });
  }

  handelButtonInput(text) {
    if (["+", "-", "*", "/"].indexOf(text) > -1) {
      this.setState({
        pendingOperation: text,
        firstOperand: this.state.inputText,
        inputText: ""
      });
      return;
    } else if (text === "=") {
      this.calculate(text);
      return;
    } else if (text === "C") {
      this.setState({
        inputText: "",
        pendingOperation: null,
        firstOperand: ""
      });
    } else {
      this.setState({
        inputText: this.state.inputText + text
      });
    }
  }

  calculate(secondOperand) {
    let result = null;

    switch (this.state.pendingOperation) {
      case "+":
        result = Number(this.state.firstOperand) + Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ""
        });
        return;
      case "-":
        result = Number(this.state.firstOperand) - Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ""
        });
        return;
      case "*":
        result = Number(this.state.firstOperand) * Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ""
        });
        return;
      case "/":
        result = Number(this.state.firstOperand) / Number(this.state.inputText);
        result = result.toString();
        this.setState({
          inputText: result,
          pendingOperation: null,
          firstOperand: ""
        });
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <View style={styles.body}>
        <TextInput
          onChangeText={this.handelInput.bind(this)}
          value={this.state.inputText}
          style={styles.btnInput}
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          {this.validkeys.map((key, i) => {
            if (i % 2 != 0) {
              return;
            }
            return (
              <View style={styles.row}>
                <CalcButton
                  handelButtonInput={this.handelButtonInput.bind(this)}
                  value={this.validkeys[i]}
                />
                <CalcButton
                  handelButtonInput={this.handelButtonInput.bind(this)}
                  value={this.validkeys[i + 1]}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "rgb(217,217,217)"
  },
  btnInput: {
    backgroundColor: "rgb(41,41,41)",
    height: 130,
    width: 100 + "%",
    color: "#FFF",
    fontSize: 48,
    textAlign: "right"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  }
});

export default Calc;
