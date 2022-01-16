import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import "./CountDown.css";

const CountDown = (props) => {
	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			props.onComplete();
			return <></>;
		} else {
			return (
				<span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					{hours > 0 ? (
						<span className="tile">
							<span className="time">{zeroPad(hours)}</span>
							<span className="type">Hours</span>
						</span>
					) : (
						<></>
					)}
					<span className="tile">
						<span className="time">{zeroPad(minutes)}</span>
						<span className="type">Minutes</span>
					</span>
					<span className="tile">
						<span className="time">{zeroPad(seconds)}</span>
						<span className="type">Seconds</span>
					</span>
				</span>
			);
		}
	};

	return <Countdown date={props.endTime} renderer={renderer} zeroPadTime={2} />;
};

export default CountDown;