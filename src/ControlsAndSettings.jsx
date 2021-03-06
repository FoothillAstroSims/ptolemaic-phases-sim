import React from 'react';
import PropTypes from 'prop-types';

export default class ControlsAndSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let buttonValue = this.props.controls.isAnimationEnabled ? "Pause Animation" : "Start Animation";
        const CheckBox = (name, displayName) => {
            let classNamePostfix = this.props.controls[name] ? `checked` : `unchecked`;
            return (
                <div>
                    <div className={`CheckboxWrap_${classNamePostfix}`}>
                        <input
                            type="checkbox"
                            name={name}
                            id={name}
                            checked={this.props.controls[name]}
                            onChange={this.handleCheckbox.bind(this)}
                            className="custom-control-input"
                        />
                        <label htmlFor={name} className="CheckBoxLabel custom-control-label">{displayName}</label>
                    </div>
                </div>
            );
        }
        return (
            <React.Fragment>
                <h2>Controls and Settings</h2>
                <input
                    className="btn btn-primary"
                    type="button"
                    value={buttonValue}
                    onClick={this.handleButtonClick.bind(this)}
                />
                <p></p>
                <label htmlFor="animationRate">Animation Rate</label>
                &nbsp;&nbsp;
                <input
                    name="animationRate"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={this.props.controls.animationRate}
                    onChange={this.handleSliderChange.bind(this)}
                />
                <div className="custom-control custom-checkbox">
                    {CheckBox("showDeferent", "Show Deferent")}
                    {CheckBox("showEpicycle", "Show Epicycle")}
                    {/*{CheckBox("showPlanetVector", "Show Planet Vector")}*/}
                    {/*{CheckBox("showEquantVector", "Show Equant Vector")}*/}
                    {/*{CheckBox("showEarthSunLine", "Show Earth-Sun Line")}*/}
                    {/*{CheckBox("showEpicyclePlanetLine", "Show Epicycle Planet Line")}*/}
                    {/*{CheckBox("showEccentricDeferentLine", "Show Eccentric-Deferent Line")}*/}
                    {/*{CheckBox("showElongationAngle", "Show Elongation Angle")}*/}
                </div>
                <p></p>
                <label htmlFor="pathDuration">Path Duration</label>
                &nbsp;&nbsp;
                <input
                    name="pathDuration"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={this.props.controls.pathDuration}
                    onChange={this.handleSliderChange.bind(this)}
                />
            </React.Fragment>
        );
    }

    handleButtonClick() {
        this.props.onChange({
            ...this.props.controls,
            isAnimationEnabled: !this.props.controls.isAnimationEnabled
        });
    }

    handleSliderChange(event) {
        this.props.onChange({
            ...this.props.controls,
            [event.target.name]: Number.parseFloat(event.target.value)
        });
    }

    handleCheckbox(event) {
        this.props.onChange({
            ...this.props.controls,
            [event.target.name]: event.target.checked
        })
    }
}

ControlsAndSettings.propTypes = {
    controls: PropTypes.exact({
        isAnimationEnabled:        PropTypes.bool.isRequired,
        animationRate:             PropTypes.number.isRequired,
        showDeferent:              PropTypes.bool.isRequired,
        showEpicycle:              PropTypes.bool.isRequired,
        showPlanetVector:          PropTypes.bool.isRequired,
        showEquantVector:          PropTypes.bool.isRequired,
        showEarthSunLine:          PropTypes.bool.isRequired,
        showEpicyclePlanetLine:    PropTypes.bool.isRequired,
        showEccentricDeferentLine: PropTypes.bool.isRequired,
        showElongationAngle: PropTypes.bool.isRequired,
        pathDuration:              PropTypes.number.isRequired
    }).isRequired,
    onChange: PropTypes.func.isRequired
}
