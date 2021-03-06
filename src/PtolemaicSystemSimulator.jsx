import React from 'react';
import { PlanetTypes } from './enums.jsx';
import OrbitView from './OrbitView.jsx';
import PlanetaryParameters from './PlanetaryParameters.jsx';
import ControlsAndSettings from './ControlsAndSettings.jsx';
import ZodiacStrip from './ZodiacStrip.jsx';
import TargetPlanetPhase from "./TargetPlanetPhase";
import Timer from './Timer.jsx';
import TitleBar from './TitleBar.jsx';

export default class PtolemaicSystemSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.orbitViewRef = React.createRef();
        this.state = {
            planetaryParameters: {
                epicycleSize: 0.72,
                eccentricity: 0.02,
                motionRate: 1.60,
                apogeeAngle: 46.2,
                planetType: PlanetTypes.INFERIOR,
            },
            controls: {
                isAnimationEnabled: false,
                animationRate: 0.2,
                showDeferent: true,
                showEpicycle: true,
                showPlanetVector: false,
                showEquantVector: false,
                showEarthSunLine: false,
                showEpicyclePlanetLine: false,
                showEccentricDeferentLine: false,
                showElongationAngle: false,
                pathDuration: 0.2
            },
            longitudes: {
                sun_longitude: 0,
                ecliptic_longitude: 0,
                elongationAngle: 0,
                size: 275,
                obsAngleTarget: 0,
                sunAngleTarget: 0,
            },
            time: 0,
            reset: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <TitleBar 
                    onResetClick={this.handleResetButtonClick.bind(this)} 
                />
                <div className="wrapper">
                    <div className="box leftBox">
                        <OrbitView
                            className = "OrbitView"
                            planetaryParameters={this.state.planetaryParameters}
                            controls={this.state.controls}
                            longitudes={this.state.longitudes}
                            onLongitudeChange={this.handleNewLongitudes.bind(this)}
                            onTimeChange={this.handleNewTime.bind(this)}
                            ref={this.orbitViewRef}
                        />

                        <TargetPlanetPhase
                            // className="ZodiacStrip"
                            longitudes={this.state.longitudes}
                            planetType={this.state.planetaryParameters.planetType}
                        />

                        {/*<ZodiacStrip*/}
                        {/*    className="ZodiacStrip"*/}
                        {/*    longitudes={this.state.longitudes}*/}
                        {/*    planetType={this.state.planetaryParameters.planetType}*/}
                        {/*/>*/}
                    </div>
                    <div className="box rightBox">
                        <div className="controlSection">
                            <PlanetaryParameters
                                params={this.state.planetaryParameters}
                                onChange={this.handleNewPlantearyParameters.bind(this)}
                            />
                        </div>
                        <div className="controlSection">
                            <ControlsAndSettings
                                controls = {this.state.controls}
                                onChange = {this.handleNewControlSettings.bind(this)}
                            />
                        </div>
                        <div className="controlSection">
                            <Timer time = {this.state.time} />
                        </div>
                        <div className="transparentControlSection">
                            <div id="survey">
                                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=n7L3RQCxQUyAT7NBighZStjAWTIFlutChq8ZZEGLLMdUNkcwRjE1SVFROVBLMFFMR0hYV0ZMM0hFNS4u"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    <button
                                        type="button"
                                        id="feedbackButton"
                                        className="btn btn-warning"
                                    >
                                        Give us feedback!
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleNewPlantearyParameters(newParams) {
        this.setState({ planetaryParameters: newParams });
    }

    handleNewControlSettings(newSettings) {
        this.setState({ controls: newSettings });
    }

    handleNewLongitudes(newLongitudes) {
        this.setState({ longitudes: newLongitudes })
    }

    handleNewTime(newTime) {
        this.setState({ time: newTime })
    }

    handleResetButtonClick() {
        this.setState({ 
            controls: {
                ...this.state.controls,
                isAnimationEnabled: false,
            }
        });
        this.orbitViewRef.current.reset();
    }
}
