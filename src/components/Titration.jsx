import React, { useState } from 'react';

const Titration = () => {
	// Basic state management
	const [isAnimating, setIsAnimating] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [solutionColor, setSolutionColor] = useState('clear');

	// Handler functions
	const handleReset = () => {
		setIsAnimating(false);
		setIsExpanded(false);
		setFeedback(null);
		setCurrentStep(1);
		setSolutionColor('clear');
	};

	const handleStart = () => {
		setIsAnimating(true);
		setIsExpanded(true);
		setFeedback(null);
	};

	return (
		<div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
			<style>
				{`
					.reset-button {
						background-color: #00783E;
						color: white;
						border: none;
						border-radius: 0.25rem;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 0.75rem;
						transition: background-color 0.2s;
						margin-left: auto;
						font-family: system-ui, -apple-system, sans-serif;
						font-weight: bold;
						padding: 0.25rem 0.5rem;
						line-height: 1;
					}
					.reset-button:hover {
						background-color: #006633;
					}
					.erlenmeyer-flask {
						position: absolute;
						bottom: 20px;
						left: 20px;
						width: 160px;
						height: 200px;
					}

					.erlenmeyer-neck {
						width: 48.5px;
						height: 30px;
						border: 4px solid #333;
						border-bottom: none;
						border-top: none;
						margin: 0 auto;
						position: relative;
						z-index: 1;
					}

					.erlenmeyer-body {
						position: relative;
						width: 160px;
						height: 160px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 20px 0;
						margin-top: -1px;
					}

					.flask-outline {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border: none;
					}

					.flask-side-left {
						position: absolute;
						top: 0;
						left: 35%;
						width: 4px;
						height: 82%;
						background: #333;
						transform: skew(-17.73deg);
						transform-origin: top;
						border-radius: 0px 1px 0px 0px;
					}

					.flask-side-right {
						position: absolute;
						top: 0;
						right: 35%;
						width: 4px;
						height: 82%;
						background: #333;
						transform: skew(17.73deg);
						transform-origin: top;
						border-radius: 0px 0px 1px 0px;
					}

					.flask-bottom {
						position: absolute;
						bottom: 10px;
						left: 20%;
						width: 60%;
						height: 4px;
						background: #333;
						border-radius: 2px;
					}

					.flask-curve-left {
						position: absolute;
						bottom: 10px;
						left: 9%;
						width: 20px;
						height: 20px;
						border: 4px solid #333;
						border-right: none;
						border-top: none;
						border-radius: 0 0 0 20px;
					}

					.flask-curve-right {
						position: absolute;
						bottom: 10px;
						right: 9%;
						width: 20px;
						height: 20px;
						border: 4px solid #333;
						border-left: none;
						border-top: none;
						border-radius: 0 0 20px 0;
					}

					@keyframes waveMotion {
						0% {
							clip-path: polygon(
								15% 50%,    /* Left dip */
								17.5% 49%,  /* Left rise */
								50% 51%,    /* Middle dip */
								82.5% 49%,  /* Right rise */
								85% 50%,    /* Right dip */
								100% 95%,   /* Bottom right */
								90% 100%,   /* Curve point */
								10% 100%,   /* Curve point */
								0% 95%      /* Bottom left */
							);
						}
						50% {
							clip-path: polygon(
								15% 51%,    /* Left rise */
								17.5% 50%,  /* Left dip */
								50% 49%,    /* Middle rise */
								82.5% 50%,  /* Right dip */
								85% 51%,    /* Right rise */
								100% 95%,   /* Bottom right */
								90% 100%,   /* Curve point */
								10% 100%,   /* Curve point */
								0% 95%      /* Bottom left */
							);
						}
						100% {
							clip-path: polygon(
								15% 50%,    /* Back to start */
								17.5% 49%,
								50% 51%,
								82.5% 49%,
								85% 50%,
								100% 95%,
								90% 100%,
								10% 100%,
								0% 95%
							);
						}
					}

					.flask-liquid {
						position: absolute;
						bottom: 18px;
						left: 15%;
						width: 70%;
						height: 82%;
						transition: background-color 0.5s;
						border-radius: 0 0 20px 20px;
						background-color: rgba(255, 205, 210, 0.5);
						animation: waveMotion 2s ease-in-out infinite;
						overflow: hidden;  /* Important to contain the waves */
					}

					.waves {
						position: absolute;
						top: 43%;  /* Position at the liquid surface */
						left: 0;
						width: 100%;
						height: 10px;
						transform: scale(0.5);  /* Adjust scale to fit flask */
					}

					.parallax > use {
						animation: move-forever 3s cubic-bezier(.55,.5,.45,.5) infinite;
					}

					.parallax > use:nth-child(1) {
						animation-delay: -2s;
						animation-duration: 4s;
						opacity: 0.7;
					}

					.parallax > use:nth-child(2) {
						animation-delay: -3s;
						animation-duration: 5s;
						opacity: 0.5;
					}

					.parallax > use:nth-child(3) {
						animation-delay: -4s;
						animation-duration: 6s;
						opacity: 0.3;
					}

					.parallax > use:nth-child(4) {
						animation-delay: -5s;
						animation-duration: 7s;
					}

					@keyframes move-forever {
						0% {
							transform: translate3d(-90px,0,0);
						}
						100% { 
							transform: translate3d(85px,0,0);
						}
					}

					.measurement-lines {
						position: absolute;
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 20px 0;
						pointer-events: none;
					}

					.measurement-line {
						width: 40%;
						height: 1px;
						background: #333;
						position: relative;
						margin-left: 20%;
					}

					.measurement-line::after {
						content: attr(data-value);
						position: absolute;
						left: 105%;
						top: -10px;
						font-size: 12px;
						color: #333;
					}

					.burette {
						position: absolute;
						top: 20px;
						left: 50%;
						transform: translateX(-50%);
						height: 200px;
						width: 30px;
						display: flex;
						flex-direction: column;
						align-items: center;
					}

					.burette-body {
						width: 20px;
						height: 140px;
						border: 4px solid #333;
						border-radius: 4px 4px 0 0;
						border-bottom: none;
						position: relative;
						background: white;
						overflow: hidden;
					}

					.burette-liquid {
						position: absolute;
						bottom: -20px;
						left: 0;
						width: 100%;
						height: 80%;
						background-color: rgba(173, 216, 230, 0.8);
						transition: height 0.5s ease;
					}

					.stopcock {
						position: relative;
						width: 30px;
						height: 40px;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.stopcock-horizontal {
						width: 30px;
						height: 4px;
						background: #333;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}

					.stopcock-valve {
						width: 12px;
						height: 12px;
						background: #333;
						border-radius: 50%;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}

					.stopcock-tip {
						width: 4px;
						height: 20px;
						background: #333;
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
					}

					.burette-thin-section {
						width: 12px;
						height: 50px;
						border: 4px solid #333;
						border-top: none;
						border-radius: 0 0 4px 4px;
						position: relative;
						background: white;
						margin: 0 auto;
						margin-top: -4px;
					}
				`}
			</style>
			<div className="p-4">
				{/* Title and Reset Button */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-[#00783E] text-sm font-medium select-none">Titration Simulator</h2>
					<button 
						className="reset-button"
						onClick={handleReset}
						title="Reset interactive"
					>
						Reset
					</button>
				</div>

				<div className="space-y-4">
					{/* Main interactive container */}
					<div className="w-[400px] h-[400px] mx-auto bg-white border border-[#00783E]/30 rounded-md overflow-hidden relative p-4">
						<div className="relative h-full">
							{/* Add Burette */}
							<div className="burette">
								<div className="burette-body">
									<div className="burette-liquid" />
								</div>
								<div className="burette-thin-section" />
								<div className="stopcock">
									<div className="stopcock-horizontal" />
									<div className="stopcock-valve" />
									<div className="stopcock-tip" />
								</div>
							</div>
							
							{/* Existing Erlenmeyer Flask */}
							<div className="erlenmeyer-flask">
								<div className="erlenmeyer-neck" />
								<div className="erlenmeyer-body">
									<div className="flask-outline">
										<div className="flask-side-left" />
										<div className="flask-side-right" />
										<div className="flask-bottom" />
										<div className="flask-curve-left" />
										<div className="flask-curve-right" />
									</div>
									{/* Temporarily comment out measurement lines */}
									{/*<div className="flask-line" data-value="400" />
									<div className="flask-line" data-value="300" />
									<div className="flask-line" data-value="200" />
									<div className="flask-line" data-value="100" />*/}
									<div className="flask-liquid">
										<svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
											viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
											<defs>
												<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
											</defs>
											<g className="parallax">
												<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,205,210,0.7)" />
												<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,205,210,0.5)" />
												<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,205,210,0.3)" />
												<use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255,205,210,1)" />
											</g>
										</svg>
									</div>
								</div>
							</div>

							{/* Rest of the content remains the same */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Titration;