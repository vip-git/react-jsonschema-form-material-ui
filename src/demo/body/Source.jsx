import React from "react";
import classNames from "classnames";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"; // eslint-disable-line
import Valid from "@material-ui/icons/CheckCircle";
import Invalid from "@material-ui/icons/HighlightOff";
import { withStyles } from "@material-ui/core/styles";
import sourceStyles from "./editor-styles";

const cmOptions = {
  mode: { name: "javascript", json: true },
  theme: "material",
  smartIndent: true,
  lineNumbers: true,
  lineWrapping: true,
  readOnly: false
};

const isValid = value => {
  let obj;
  try {
    obj = JSON.parse(value);
  } catch (e) {
    return false;
  }
  return obj;
};

class Source extends React.Component {
  constructor(props) {
    super(props);
    const source = JSON.stringify(this.props.source, null, 2);
    this.state = {
      source,
      valid: isValid(source)
    };
  }
  componentWillReceiveProps = nextProps => {
    const source = JSON.stringify(nextProps.source, null, 2);
    this.setState({
      source,
      valid: isValid(source)
    });
  };
  onChange = (editor, data, value) => {
    this.setState({ source: value });
  };
  onBeforeChange = (editor, data, value) => {
    const { onChange } = this.props;
    const parsed = isValid(value);

    this.setState({
      valid: parsed,
      source: value
    });
    if (parsed && onChange) {
      onChange(parsed);
    }
  };
  render() {
    const { source, valid } = this.state;
    const { classes, title } = this.props;
    const Icon = valid ? Valid : Invalid;
    return (
      <div className={classes.root}>
        <div className={classNames(classes.ctr, { [classes.invalid]: !valid })}>
          <div>
            {/* <Icon fontSize className={classes.icon} /> */}
            <div className={classes.title}>
              <p>{title}</p>
            </div>
          </div>
          <div className={classes.source}>
            {/* <CodeMirror
              value={source}
              onChange={this.onChange}
              onBeforeChange={this.onBeforeChange}
              options={cmOptions}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(sourceStyles)(Source);
