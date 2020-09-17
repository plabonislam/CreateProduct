import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { fabric } from "fabric";


class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    width: 600,
    height: 400,
  };

  state = {
    canvas: null,
  };

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c);
    console.log(canvas);
    this.setState({ canvas });
  }

  


  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      });
    });
    const { width, height } = this.props;
    return (
      <Fragment>
        <canvas
          ref={(c) => (this.c = c)}
          width={width}
          height={height}
          style={{ border: "5px solid green" }}
        />
      </Fragment>
    );
  }
}

export default DesignCanvas;
