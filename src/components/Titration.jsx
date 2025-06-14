import React, { useState, useRef, useEffect } from 'react';
import buretStand from '../assets/buret_stand.svg';
import erlenmeyerFlask from '../assets/erlenmeyer_flask.svg';
import buretTube from '../assets/buret_tube.svg';
import dropper from '../assets/dropper.svg';
import droplet from '../assets/droplet.svg';

const Titration = () => {
	// Add new state for button fade
	const [isFadingOut, setIsFadingOut] = useState(false);
	const [isGlowStopped, setIsGlowStopped] = useState(false);

	// Basic state management
	const [isAnimating, setIsAnimating] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [feedback, setFeedback] = useState(null);
	const [currentStep, setCurrentStep] = useState(1);
	const [solutionColor, setSolutionColor] = useState('clear');
	const [showPipette, setShowPipette] = useState(false);
	const [showContinue, setShowContinue] = useState(false);

	// Add new state for text fade
	const [isTextFadingOut, setIsTextFadingOut] = useState(false);

	// Add new state variable near the top with other state declarations
	const [isPipetteDraining, setIsPipetteDraining] = useState(false);

	// Add this state variable at the top with other state declarations
	const [showGreenLine, setShowGreenLine] = useState(false);

	// Add this state variable at the top with other state declarations
	const [isLineShrinking, setIsLineShrinking] = useState(false);

	// Add this at the top of your component
	const flaskLiquidRef = useRef(null);

	// First, add the new state near the other state declarations
	const [isPipetteExiting, setIsPipetteExiting] = useState(false);

	// Add new state at the top with other states
	const [isBuretteSliding, setIsBuretteSliding] = useState(false);

	// Add new state near the other state declarations
	const [showInstructions, setShowInstructions] = useState(false);

	// Add new state for the Add 1mL button
	const [showAddButton, setShowAddButton] = useState(false);

	// Add new states at the top
	const [clickCount, setClickCount] = useState(0);
	const [isStopcockAnimating, setIsStopcockAnimating] = useState(false);

	// Add new state for burette liquid height
	const [buretteLiquidHeight, setBuretteLiquidHeight] = useState(80);

	// Add new state near the other state declarations
	const [isDropFalling, setIsDropFalling] = useState(false);

	// Add new state near other state declarations
	const [isAnimationInProgress, setIsAnimationInProgress] = useState(false);

	// Add new state near other state declarations
	const [isButtonFadingOut, setIsButtonFadingOut] = useState(false);

	// Add new state for instruction text fade
	const [isInstructionFadingOut, setIsInstructionFadingOut] = useState(false);

	// Add new state near other state declarations
	const [showEquivalenceText, setShowEquivalenceText] = useState(false);

	// Add new state for final continue button
	const [showFinalContinue, setShowFinalContinue] = useState(false);

	// Add new state for final text and fade-out
	const [showCalculationText, setShowCalculationText] = useState(false);
	const [isEquivalenceFadingOut, setIsEquivalenceFadingOut] = useState(false);

	// Add new state for final continue button fade out
	const [isFinalContinueFadingOut, setIsFinalContinueFadingOut] = useState(false);

	// Add new states for the next continue button and final text
	const [showSecondContinue, setShowSecondContinue] = useState(false);
	const [isCalculationFadingOut, setIsCalculationFadingOut] = useState(false);
	const [isSecondContinueFadingOut, setIsSecondContinueFadingOut] = useState(false);

	// Add new states for the "Solve Equation" button and fade-out
	const [showSolveContinue, setShowSolveContinue] = useState(false);
	const [isLastTextFadingOut, setIsLastTextFadingOut] = useState(false);
	const [isSolveContinueFadingOut, setIsSolveContinueFadingOut] = useState(false);

	// Add new state for showing the drag-and-drop equation
	const [showSolveEquation, setShowSolveEquation] = useState(false);

	// Add new states for drag-and-drop values
	const [droppedEquation, setDroppedEquation] = useState({
		Ma: null,
		Va: null,
		Vb: null
	});

	// Add new state for showing draggable values after solve button
	const [showDraggableValues, setShowDraggableValues] = useState(false);

	// Add these states for drag logic (similar to Annuity.jsx)
	const [isDragging, setIsDragging] = useState(false);
	const [draggedBoxId, setDraggedBoxId] = useState(null);
	const [draggedBoxValue, setDraggedBoxValue] = useState(null);
	const [draggedPosition, setDraggedPosition] = useState({ x: 0, y: 0 });
	const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });

	// Add this state to track original positions of draggable boxes
	const [draggableBoxOrigins, setDraggableBoxOrigins] = useState({});
	const [draggedBoxStyle, setDraggedBoxStyle] = useState({}); // For inline style during drag

	// Add a state to track which drop zone is being hovered
	const [dragOverZone, setDragOverZone] = useState(null);

	// Add these refs near the top with other refs/state
	const maDropRef = useRef(null);
	const vaDropRef = useRef(null);
	const vbDropRef = useRef(null);

	// Add new state for flashing drop zones
	const [flashDropZone, setFlashDropZone] = useState({
		Ma: false,
		Va: false,
		Vb: false
	});

	// Add new state for flashing green and for marking drop zone as correct
	const [flashGreenDropZone, setFlashGreenDropZone] = useState({
		Ma: false,
		Va: false,
		Vb: false
	});
	const [dropZoneCorrect, setDropZoneCorrect] = useState({
		Ma: false,
		Va: false,
		Vb: false
	});

	// Add new state for tracking correct answers
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

	// Add new state for the continue button after all answers are correct
	const [showAllCorrectContinue, setShowAllCorrectContinue] = useState(false);
	// Add new state for table fade out
	const [isTableFadingOut, setIsTableFadingOut] = useState(false);
	// Add new state for draggable boxes visibility
	const [showDraggableBoxes, setShowDraggableBoxes] = useState(true);
	// Add new state for fraction transformation
	const [showCalculatedValue, setShowCalculatedValue] = useState(false);
	// Add new states for the fraction transformation animations
	const [isCalculatedValueFadingOut, setIsCalculatedValueFadingOut] = useState(false);
	const [isVbFadingOut, setIsVbFadingOut] = useState(false);
	const [isFractionBarFadingOut, setIsFractionBarFadingOut] = useState(false);
	// Add new state for final value
	const [showFinalValue, setShowFinalValue] = useState(false);

	// Add new states for congratulatory text
	const [showCongratsText, setShowCongratsText] = useState(false);
	const [isCongratsFadingOut, setIsCongratsFadingOut] = useState(false);

	// Add new state for tracking first click
	const [isFirstClick, setIsFirstClick] = useState(true);

	// Add new state for NaOH concentration
	const [naohConcentration, setNaohConcentration] = useState(0.5);

	// Add new state for showing the last text
	const [showLastText, setShowLastText] = useState(false);

	// Add new state for droplet visibility
	const [showDroplet, setShowDroplet] = useState(false);

	// Add useEffect for fraction transformation animations
	useEffect(() => {
		if (showCalculatedValue) {
			const timer = setTimeout(() => {
				setIsCalculatedValueFadingOut(true);
				setIsVbFadingOut(true);
				setIsFractionBarFadingOut(true);
				
				setTimeout(() => {
					setShowFinalValue(true);
					setTimeout(() => {
						setShowCongratsText(true);
					}, 1000);
				}, 500);
			}, 2000);
			
			return () => clearTimeout(timer);
		}
	}, [showCalculatedValue]);

	// Helper: correct answers
	const correctAnswers = {
		Ma: '0.5M',
		Va: '5mL',
		Vb: '100mL'
	};

	// Helper to handle drag logic for each draggable box
	useEffect(() => {
		if (!showDraggableValues) return;

		const draggableElements = document.querySelectorAll('.titration-draggable-box');
		const newOrigins = {};

		draggableElements.forEach(element => {
			const id = element.getAttribute('data-id');
			if (!draggableBoxOrigins[id]) {
				const rect = element.getBoundingClientRect();
				const parentRect = element.offsetParent.getBoundingClientRect();
				newOrigins[id] = {
					left: rect.left - parentRect.left,
					top: rect.top - parentRect.top,
				};
			}
			element.onmousedown = null;
			dragElement(element, id);
		});

		if (Object.keys(newOrigins).length > 0) {
			setDraggableBoxOrigins(prev => ({ ...prev, ...newOrigins }));
		}
	// eslint-disable-next-line
	}, [showDraggableValues]);

	function dragElement(element, boxId) {
		let isDraggingBox = false;
		let offsetX = 0;
		let offsetY = 0;
		let startX = 0;
		let startY = 0;

		const dragMouseDown = (e) => {
			e.preventDefault();
			const rect = element.getBoundingClientRect();
			const parentRect = element.offsetParent.getBoundingClientRect();

			startX = e.clientX;
			startY = e.clientY;
			offsetX = rect.left - parentRect.left;
			offsetY = rect.top - parentRect.top;

			setDraggedBoxStyle({
				[boxId]: {
					position: 'absolute',
					left: offsetX,
					top: offsetY,
					zIndex: 1000,
					transition: 'none',
					width: element.offsetWidth,
					height: element.offsetHeight,
				}
			});

			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
			setIsDragging(true);
			setDraggedBoxId(boxId);
			setDraggedBoxValue(element.textContent);

			element.classList.add('dragging');
			isDraggingBox = true;
		};

		const elementDrag = (e) => {
			e.preventDefault();
			if (!isDraggingBox) return;
			const newLeft = offsetX + (e.clientX - startX);
			const newTop = offsetY + (e.clientY - startY);

			setDraggedBoxStyle(prev => ({
				...prev,
				[boxId]: {
					...prev[boxId],
					left: newLeft,
					top: newTop,
					transition: 'none',
				}
			}));

			// Check if mouse is over any drop zone
			const mouseX = e.clientX;
			const mouseY = e.clientY;
			let overZone = null;
			const dropZones = [
				{ key: 'Ma', ref: maDropRef },
				{ key: 'Va', ref: vaDropRef },
				{ key: 'Vb', ref: vbDropRef }
			];
			for (const zone of dropZones) {
				const rect = zone.ref.current?.getBoundingClientRect();
				if (
					rect &&
					mouseX >= rect.left &&
					mouseX <= rect.right &&
					mouseY >= rect.top &&
					mouseY <= rect.bottom
				) {
					overZone = zone.key;
					break;
				}
			}
			setDragOverZone(overZone);
		};

		const closeDragElement = () => {
			document.onmouseup = null;
			document.onmousemove = null;
			setIsDragging(false);

			const origin = draggableBoxOrigins[boxId];
			if (origin) {
				setDraggedBoxStyle(prev => ({
					...prev,
					[boxId]: {
						...prev[boxId],
						left: origin.left,
						top: origin.top,
						transition: 'left 0.2s, top 0.2s',
					}
				}));
				setTimeout(() => {
					setDraggedBoxStyle(prev => {
						const updated = { ...prev };
						delete updated[boxId];
						return updated;
					});
					setDraggedBoxId(null);
					setDraggedBoxValue(null);
					isDraggingBox = false;
				}, 200);
			} else {
				setDraggedBoxStyle(prev => {
					const updated = { ...prev };
					delete updated[boxId];
					return updated;
				});
				setDraggedBoxId(null);
				setDraggedBoxValue(null);
				isDraggingBox = false;
			}
			setDragOverZone(null); // Reset on drag end
		};

		element.onmousedown = dragMouseDown;
	}

	// Handler functions
	const handleReset = () => {
		setIsAnimating(false);
		setIsExpanded(false);
		setFeedback(null);
		setCurrentStep(1);
		setSolutionColor('clear');
		setIsFadingOut(false);
		setShowPipette(false);
		setShowContinue(false);
		setIsTextFadingOut(false);
		setIsPipetteDraining(false);
		setShowGreenLine(false);
		setIsLineShrinking(false);
		setIsPipetteExiting(false);
		setIsBuretteSliding(false);
		setShowInstructions(false);
		setShowAddButton(false);
		setClickCount(0);
		setIsStopcockAnimating(false);
		setNaohConcentration(0.5);
		setIsFirstClick(true);
		setFlaskColor('rgba(173, 216, 230, 0.7)'); // Reset flask color to blue
		if (flaskLiquidRef.current) {
			flaskLiquidRef.current.classList.remove('increased');
			flaskLiquidRef.current.classList.remove('pink');
		}
		setBuretteLiquidHeight(80);
		setIsButtonFadingOut(false);
		setIsInstructionFadingOut(false);
		setShowEquivalenceText(false);
		setShowFinalContinue(false);
		setShowCalculationText(false);
		setIsEquivalenceFadingOut(false);
		setIsFinalContinueFadingOut(false);
		setShowSecondContinue(false);
		setIsCalculationFadingOut(false);
		setIsSecondContinueFadingOut(false);
		setShowSolveEquation(false);
		setShowDraggableValues(false);
		setDroppedEquation({
			Ma: null,
			Va: null,
			Vb: null
		});
		setIsTableFadingOut(false);
		setShowDraggableBoxes(true);
		setShowCalculatedValue(false);
		setIsCalculatedValueFadingOut(false);
		setIsVbFadingOut(false);
		setIsFractionBarFadingOut(false);
		setShowFinalValue(false);
		setShowCongratsText(false);
		setIsCongratsFadingOut(false);
		setShowLastText(false);
		setCorrectAnswerCount(0);
		setDropZoneCorrect({
			Ma: false,
			Va: false,
			Vb: false
		});
		setFlashDropZone({
			Ma: false,
			Va: false,
			Vb: false
		});
		setFlashGreenDropZone({
			Ma: false,
			Va: false,
			Vb: false
		});
		setDragOverZone(null);
		setDraggedBoxStyle({});
		setDraggableBoxOrigins({});
		setIsDragging(false);
		setDraggedBoxId(null);
		setDraggedBoxValue(null);
		setIsGlowStopped(false);
		setIsAnimationInProgress(false);
		setShowDroplet(false);
		setIsDropFalling(false);
		setShowAllCorrectContinue(false);
		setIsLastTextFadingOut(false);
		setIsSolveContinueFadingOut(false);
		setShowSolveContinue(false);
	};

	const handleStart = () => {
		setIsGlowStopped(true);
		setIsFadingOut(true);
		setTimeout(() => {
			setIsAnimating(true);
			setIsExpanded(true);
			setFeedback(null);
			setShowPipette(true);
			setTimeout(() => {
				setShowContinue(true);
			}, 500);
		}, 300);
	};

	const handleContinue = () => {
		setIsTextFadingOut(true);
		setIsPipetteDraining(true);
		setShowGreenLine(true);
		if (flaskLiquidRef.current) {
			flaskLiquidRef.current.classList.add('increased');
		}
		
		setTimeout(() => {
			setShowContinue(false);
			setIsTextFadingOut(false);
			setTimeout(() => {
				setIsLineShrinking(true);
				setTimeout(() => {
					setShowGreenLine(false);
					setIsLineShrinking(false);
					setIsPipetteExiting(true);
					setTimeout(() => {
						setShowPipette(false);
						setIsPipetteExiting(false);
						setIsBuretteSliding(true);
						setTimeout(() => {
							setShowInstructions(true);
							setShowAddButton(true);
						}, 800);
					}, 800);
				}, 500);
			}, 500);
		}, 300);
	};

	// Add new state for flask color
	const [flaskColor, setFlaskColor] = useState('rgba(173, 216, 230, 0.7)');

	const handleAddClick = () => {
		if (clickCount < 5 && !isAnimationInProgress) {
			setIsAnimationInProgress(true);
			setIsStopcockAnimating(true);
			setBuretteLiquidHeight(prev => prev - 2);
			setShowDroplet(true);
			setIsDropFalling(true);
			
			// Update concentration and first click state
			setNaohConcentration(prev => prev - 0.1);
			if (isFirstClick) {
				setIsFirstClick(false);
			}
			
			// If this is the 5th click, start the button and text fade out
			if (clickCount === 4) {
				setIsButtonFadingOut(true);
				setIsInstructionFadingOut(true);
				// Hide the button and instructions after the animation completes
				setTimeout(() => {
					setShowAddButton(false);
					setShowInstructions(false);
				}, 500);
			}
			
			// Reset the stopcock animation after a shorter time
			setTimeout(() => {
				setIsStopcockAnimating(false);
			}, 300);
			
			// Reset the drop after it's done falling
			setTimeout(() => {
				setIsDropFalling(false);
				setShowDroplet(false);
				setIsAnimationInProgress(false);
				
				// Change color after the last drop and animate burette back up
				if (clickCount === 4) {
					setFlaskColor('rgba(255, 192, 203, 0.7)');
					// Wait a moment after color change before moving burette up
					setTimeout(() => {
						setIsBuretteSliding(false);
						// Wait for burette animation to complete before showing text
						setTimeout(() => {
							setShowEquivalenceText(true);
							// Show the final continue button after the equivalence text appears
							setTimeout(() => {
								setShowFinalContinue(true);
							}, 500);
						}, 800);
					}, 1000);
				}
			}, 1000);
			
			setClickCount(prevCount => prevCount + 1);
		}
	};

	// Update handler for final continue button
	const handleFinalContinue = () => {
		setIsEquivalenceFadingOut(true);
		setIsFinalContinueFadingOut(true); // Start button fade out
		setTimeout(() => {
			setShowEquivalenceText(false);
			setShowFinalContinue(false);
			// Delay the new text by 300ms (adjust as desired)
			setTimeout(() => {
				setShowCalculationText(true);
				setIsEquivalenceFadingOut(false);
				setIsFinalContinueFadingOut(false); // Reset for next time
				// Show the new continue button after a short delay
				setTimeout(() => {
					setShowSecondContinue(true);
				}, 500); // Adjust delay as needed
			}, 300);
		}, 300); // match fade-out duration
	};

	// Update handleSecondContinue to properly show table and equation
	const handleSecondContinue = () => {
		setIsCalculationFadingOut(true);
		setIsSecondContinueFadingOut(true);
		setTimeout(() => {
			setShowCalculationText(false);
			setShowSecondContinue(false);
			// Show the table and equation
			setTimeout(() => {
				setShowLastText(true);
				setTimeout(() => {
					setShowSolveEquation(true);
					setShowDraggableValues(true);
				}, 300);
			}, 300);
		}, 300);
	};

	// Update handleSolveContinue to show draggable values after fade out
	const handleSolveContinue = () => {
		setIsLastTextFadingOut(true);
		setIsSolveContinueFadingOut(true);
		setTimeout(() => {
			setShowLastTextDelayed(false);
			setShowSolveContinue(false);
			setIsLastTextFadingOut(false);
			setIsSolveContinueFadingOut(false);
			// Show the drag-and-drop equation after a short delay
			setTimeout(() => {
				setShowSolveEquation(true);
				setShowDraggableValues(true); // Show draggable values
			}, 300);
		}, 300); // match fade-out duration
	};

	// Native drag-and-drop handlers for draggable boxes (for equation drop only)
	const handleDragStart = (e, item) => {
		e.dataTransfer.setData('text/plain', item.value);
		setIsDragging(true);
		setDraggedBoxId(item.id);
	};
	const handleDragEnd = () => {
		setIsDragging(false);
		setDragOverZone(null);
		setDraggedBoxId(null);
	};

	// ... existing code ...
// Update drop zone handlers for equation
const handleEquationDragOver = (e, key) => {
	e.preventDefault();
	setDragOverZone(key);
};
const handleEquationDragLeave = (e, key) => {
	setDragOverZone(null);
};
const handleEquationDrop = (e, key) => {
	e.preventDefault();
	const value = e.dataTransfer.getData('text/plain');
	if (value) {
		setDroppedEquation(prev => ({
			...prev,
			[key]: value
		}));
	}
	setDragOverZone(null);
	setIsDragging(false);
	setDraggedBoxId(null);
};
// ... existing code ...

	return (
		<div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
			<style>
				{`
					.reset-button {
						background-color: #6B7280;
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
						background-color: #4B5563;
					}
					.erlenmeyer-flask {
						position: absolute;
						bottom: -1px;
						left: 20px;
						width: 160px;
						height: 200px;
					}

					.erlenmeyer-neck {
						width: 48px;
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
						transition: height 1s linear, background-color 1s ease;
						border-radius: 0 0 20px 20px;
						background-color: rgba(173, 216, 230);
						animation: waveMotion 2s ease-in-out infinite;
						overflow: hidden;
						z-index: 1;
					}

					.flask-liquid.pink {
						background-color: rgba(255, 105, 180, 0.8);
					}

					// Update the wave colors for the pink state
					.flask-liquid.pink + svg .parallax use {
						fill: rgba(255, 105, 180, 0.7);
					}

					.flask-liquid.pink + svg .parallax use:nth-child(2) {
						fill: rgba(255, 105, 180, 0.5);
					}

					.flask-liquid.pink + svg .parallax use:nth-child(3) {
						fill: rgba(255, 105, 180, 0.3);
					}

					.flask-liquid.pink + svg .parallax use:nth-child(4) {
						fill: rgba(255, 105, 180, 1);
					}

					.flask-liquid.increased {
						height: calc(82% + 10px);
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

					.burette-container {
						position: absolute;
						bottom: 230px;
						left: 20px;
						width: 160px;
						height: 200px;
						display: flex;
						justify-content: center;
						transition: bottom 0.8s ease-in-out;
					}

					.burette-container.slide-down {
						bottom: 160px;
					}

					.burette {
						position: relative;  // Changed from absolute
						height: 250px;
						width: 200px;
						display: flex;
						flex-direction: column;
						align-items: center;
					}

					.burette-body {
						width: 20px;
						height: 140px;
						border: 4px solid #333;
						border-radius: 4px;
						border-bottom: none;
						position: relative;
						background: white;
						overflow: hidden;
					}

					.burette-liquid {
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 10px;
						height: 80%;
						background-color: rgba(173, 216, 230);
						transition: height 0.2s linear;
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
						width: 5px;
						height: 4px;
						background: #333;
						position: absolute;
						top: 50%;
						transform: translate(150%,-1100%);
					}

					.stopcock-tip {
						width: 4px;
						height: 20px;
						background: #333;
						position: absolute;
						bottom: 0;
						left: 49%;
						transform: translate(240%, -249%);
						transition: clip-path 0.3s ease-in-out;
						clip-path: inset(0 0 0 0);
					}

					.stopcock-tip.shrink {
						clip-path: inset(35% 0 35% 0);
					}

					.stopcock-valve {
						position: absolute;
						width: 15px;
						height: 15px;
						background: #333;
						border-radius: 2px;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -330%);
						z-index: 2;
					}

					.burette-thin-section {
						width: 12px;
						height: 50px;
						border: 4px solid #333;
						border-top: none;
						border-bottom: none;
						position: relative;
						background: white;
						margin: 0 auto;
						margin-top: -4px;
						overflow: hidden;
						border-radius: 0px 0px 2px 2px;
					}

					.burette-thin-liquid {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 60%;
						background-color: rgba(173, 216, 230, 0.8);
						transition: height 0.5s ease;
					}

					.base {
						position: absolute;
						bottom: 10px;
						left: 0;
						width: 200px;
						height: 10px;
						background: #333;
						clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
					}

					.stand {
						position: absolute;
						bottom: 10px;
						left: 20px;
						width: 4px;
						height: 350px;
						background: #333;
					}

					.burette-holder {
						position: absolute;
						top: 20px;
						left: 20px;
						width: 95px;
						height: 4px;
						background: #333;
						transition: top 0.8s ease-in-out;
					}

					.burette-holder.slide-down {
						top: 90px;
					}

					.burette-clamp {
						position: absolute;
						top: -3px;
						right: 0;
						width: 30px;
						height: 10px;
						background: #333;
						border-radius: 2px;
					}

					.explore-button {
						background-color: #008545;
						color: white;
						border: none;
						border-radius: 0.5rem;
						padding: 0.5rem 1rem;
						font-size: 0.875rem;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.2s;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
						position: absolute;
						bottom: -0.05rem;
						right: -0.05rem;
					}

					.explore-button:hover {
						background-color: #006633;
						transform: translateY(-1px);
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					}

					@keyframes fadeIn {
						from {
							opacity: 0;
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}

					.fade-in {
						animation: fadeIn 0.5s ease-out forwards;
					}

					.info-text {
						position: absolute;
						top: 1rem;
						right: 0.1rem;
						max-width: 200px;
						font-size: 0.875rem;
						color: #666;
						line-height: 1.4;
						text-align: center;
					}

					@keyframes fadeOut {
						from {
							opacity: 1;
							transform: translateY(0);
						}
						to {
							opacity: 0;
							transform: translateY(10px);
						}
					}
					
					.fade-out {
						animation: fadeOut 0.3s ease-out forwards;
					}

					.pipette {
						position: absolute;
						top: 5%;
						left: 21%;
						width: 100px;
						height: 250px;
						transform: rotate(45deg);
						animation: pipetteEnter 0.5s ease-out forwards;
						z-index: 100;
					}

					.pipette img {
						width: 100%;
						height: 100%;
						object-fit: contain;
					}

					.pipette-tube-liquid {
						position: absolute;
						bottom: 35.5%;
						left: 39%;
						width: 7.5%;
						height: 23%;
						background-color: rgba(160, 230, 103, 0.8);
						transition: height 0.8s linear;
						clip-path: polygon(
							0 0%,
							100% 0%,
							100% 100%,
							0 100%
						);
						transform: rotate(11.5deg);
						border-radius: 2px 2px 35% 35%;
						transform-origin: bottom center;
					}

					.pipette-tube-liquid-thin {
						position: absolute;
						bottom: 30.5%;
						left: 39%;
						width: 2.5%;
						height: 5.59%;
						background-color: rgba(160, 230, 103, 0.8);
						transition: height 0.8s linear;
						clip-path: polygon(
							0 0%,
							100% 0%,
							100% 100%,
							0 100%
						);
						transform: rotate(11.5deg);
						border-radius: 0px 0px 2px 2px;
						transform-origin: bottom center;
					}

					.pipette-tube-liquid.draining {
						height: 11.5%;
					}

					.pipette-tube-liquid-thin.draining {
						height: 2.8%;
					}

					.continue-button {
						background-color: #008545;
						color: white;
						border: none;
						border-radius: 0.5rem;
						padding: 0.5rem 1rem;
						font-size: 0.875rem;
						font-weight: 600;
						cursor: pointer;
						transition: all 0.2s;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
						position: absolute;
						bottom: -0.05rem;
						right: -0.05rem;
					}

					.continue-button:hover {
						background-color: #006633;
						transform: translateY(-1px);
						box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					}

					.vertical-line {
						position: absolute;
						top: 170px;
						left: 23%;
						width: 3px;
						height: 0;
						background-color: rgba(160, 230, 103, 0.8);
						opacity: 1;
						z-index: 0;
						transform-origin: top;
						transition: height 0.5s linear;
					}

					.vertical-line.show {
						height: 190px;
					}

					.vertical-line.shrink {
						transform-origin: bottom;
						height: 0;
						top: 330px;
						transition: height 0.5s linear, top 0.5s linear;
					}

					.pipette-exit {
						animation: pipetteExit 0.8s ease-out forwards;
					}

					@keyframes pipetteExit {
						0% {
							transform: translate(0, 0) rotate(45deg);
							opacity: 1;
						}
						100% {
							transform: translate(50px, -50px) rotate(45deg);
							opacity: 0;
						}
					}

					.instruction-text {
						position: absolute;
						top: 1rem;
						right: 0.1rem;
						max-width: 200px;
						font-size: 0.875rem;
						color: #666;
						line-height: 1.4;
						text-align: center;
					}

					.drop {
						position: absolute;
						width: 30px;
						height: 30px;
						left: 43.5%;
						transform: translateX(-50%);
						top: 95%;
						z-index: 0;
					}

					.drop.falling {
						animation: dropFall 1s linear forwards;
					}

					@keyframes dropFall {
						0% {
							transform: translateX(-50%) translateY(0) scale(0.8);
							opacity: 1;
						}
						100% {
							transform: translateX(-50%) translateY(200px) scale(0.8);
							opacity: 0;
						}
					}

					@keyframes buttonFadeOut {
						from {
							opacity: 1;
							transform: translateY(0);
						}
						to {
							opacity: 0;
							transform: translateY(10px);
						}
					}

					.button-fade-out {
						animation: buttonFadeOut 0.5s ease-out forwards;
						pointer-events: none;
					}

					@keyframes pipetteEnter {
						from {
							opacity: 0;
							transform: translate(20px, -20px) rotate(45deg);
						}
						to {
							opacity: 1;
							transform: translate(0, 0) rotate(45deg);
						}
					}

					@keyframes expandOut {
						0% {
							opacity: 0;
							transform: scale(0.2);
						}
						80% {
							opacity: 1;
							transform: scale(1.05);
						}
						100% {
							opacity: 1;
							transform: scale(1);
						}
					}
					.expand-out {
						animation: expandOut 0.35s cubic-bezier(0.4, 0.8, 0.2, 1) both;
					}
					.drop-zone.drag-over {
						background: #ede9fe !important;
					}

					@keyframes flashYellow {
						0% { background: #fffbe6; }
						40% { background: #ffe066; }
						60% { background: #ffe066; }
						100% { background: #fffbe6; }
					}
					.flash-yellow {
						animation: flashYellow 0.15s linear 0s 2;
					}
					@keyframes flashGreen {
						0% { background: #e6fffa; }
						40% { background: #bbf7d0; }
						60% { background: #bbf7d0; }
						100% { background: #e6fffa; }
					}
					.flash-green {
						animation: flashGreen 0.15s linear 0s 2;
					}
					.drop-zone-correct {
						border: 2px solid transparent !important;
						border-style: solid !important;
						background: none !important;
						box-shadow: none;
						color: inherit;
					}
					@keyframes fadeOutDown {
						from {
							opacity: 1;
							transform: translateY(0);
						}
						to {
							opacity: 0;
							transform: translateY(20px);
						}
					}

					@keyframes fadeOutUp {
						from {
							opacity: 1;
							transform: translateY(0);
						}
						to {
							opacity: 0;
							transform: translateY(-20px);
						}
					}

					.fade-out-down {
						animation: fadeOutDown 0.5s ease-out forwards;
					}

					.fade-out-up {
						animation: fadeOutUp 0.5s ease-out forwards;
					}

					/* Orbit Glow Button Styles */
					.glow-button { 
						min-width: auto; 
						height: auto; 
						position: relative; 
						border-radius: 10px;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 1;
						transition: all .3s ease;
						padding: 6px;  /* Increased padding to create more space for the glow */
					}

					.glow-button::before {
						content: "";
						display: block;
						position: absolute;
						background: #fff;
						inset: 2px;
						border-radius: 10px;
						z-index: -2;
					}

					.simple-glow {
						background: conic-gradient(
							from var(--r),
							transparent 0%,
							rgb(0, 255, 132) 2%,
							rgb(0, 214, 111) 8%,
							rgb(0, 174, 90) 12%,
							rgb(0, 133, 69) 14%,
							transparent 15%
						);
						animation: rotating 3s linear infinite;
						transition: animation 0.3s ease;
					}

					.simple-glow.stopped {
						animation: none;
						background: none;
					}

					@property --r {
						syntax: '<angle>';
						inherits: false;
						initial-value: 0deg;
					}

					@keyframes rotating {
						0% {
							--r: 0deg;
						}
						100% {
							--r: 360deg;
						}
					}
				`}
			</style>
			<div className="p-4">
				{/* Title and Reset Button */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-[#4E48CC] text-sm font-medium select-none">Titration Simulator</h2>
					<button 
						className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
						onClick={handleReset}
						title="Reset interactive"
					>
						Reset
					</button>
				</div>

				<div className="space-y-4">
					{/* Main interactive container */}
					<div className="w-[400px] h-[400px] mx-auto bg-white border border-[#7973E9]/30 rounded-md overflow-hidden relative p-4">
						<div className="relative h-full">
							{isExpanded && (
								<>
									{showContinue && (
										<>
											<div className={`info-text fade-in ${isTextFadingOut ? 'fade-out' : ''}`}>
												Starting with an acidic solution, a pH indicator is added so we know when we've neutralized the acid.											</div>
											<div className={`glow-button simple-glow ${isTextFadingOut ? 'stopped' : ''}`} style={{
												position: 'absolute',
												bottom: '-0.05rem',
												right: '-0.05rem',
											}}>
												<button
													className={`${isTextFadingOut ? 'fade-out' : 'fade-in'}`}
													onClick={handleContinue}
													style={{
														background: '#008545',
														color: 'white',
														fontSize: '0.875rem',
														fontWeight: '600',
														padding: '0.5rem 1rem',
														borderRadius: '0.5rem',
														border: 'none',
														cursor: 'pointer',
														position: 'relative',
														zIndex: 1
													}}
												>
													Continue
												</button>
											</div>
										</>
									)}
								</>
							)}
							
							{/* Add base and stand structure */}
							<img 
								src={buretStand} 
								alt="Buret Stand" 
								style={{
									position: 'absolute',
									bottom: '-10%',
									left: '-35%',
									width: '500px',
									height: '500px',
									zIndex: 1,
									objectFit: 'cover'
								}}
							/>

							{/* Wrap burette components */}
							<div className={`burette-container ${isBuretteSliding ? 'slide-down' : ''}`}>
								<div className="burette" style={{
									position: 'absolute',
									top: '40%',
									left: '40%',
									transform: 'translate(-50%, -50%)',
									width: '100px',
									height: '300px',
									zIndex: 2
								}}>
									<img 
										src={buretTube} 
										alt="Buret Tube" 
										style={{
											position: 'absolute',
											width: '100%',
											height: '100%',
											zIndex: 2
										}}
									/>
									<div className="burette-liquid" style={{
										position: 'absolute',
										bottom: '28%',
										left: '50%',
										transform: 'translateX(-50%)',
										width: '10px',
										height: `${buretteLiquidHeight}%`,
										backgroundColor: 'rgba(173, 216, 230, 0.7)',
										transition: 'height 1s linear',
										zIndex: 1
									}} />
									<div className="burette-thin-section" style={{
										position: 'absolute',
										bottom: '-3%',
										left: '50%',
										transform: 'translateX(-50%)',
										width: '5px',
										height: '75px',
										border: '4px none #FFFFFF',
										borderTop: 'none',
										borderBottom: 'none',
										background: 'none',
										overflow: 'hidden',
										borderRadius: '0px 0px 2px 2px',
										zIndex: 1
									}}>
										<div className="burette-thin-liquid" style={{
											position: 'absolute',
											bottom: '10%',
											left: '0%',
											width: '100%',
											height: `${buretteLiquidHeight}%`,
											backgroundColor: 'rgba(173, 216, 230, 0.7)',
											transition: 'height 1s linear',
											zIndex: 1,
											borderRadius: '0 0 50% 50%'
										}} />
									</div>
									<div style={{
										position: 'absolute',
										bottom: '26%',
										left: '50%',
										transform: 'translateX(-50%)',
										width: '6px',
										height: `6px`,
										backgroundColor: 'rgba(173, 216, 230, 0.7)',
										transition: 'height 1s linear',
										zIndex: 1,
									}} />
								</div>
								{showDroplet && (
									<div className={`drop ${isDropFalling ? 'falling' : ''}`}>
										<img 
											src={droplet} 
											alt="Droplet" 
											style={{
												width: '100%',
												height: '100%',
												filter: 'brightness(1.2) saturate(1.2)'
											}}
										/>
									</div>
								)}
							</div>
							
							{/* Existing Erlenmeyer Flask */}
							<img 
								src={erlenmeyerFlask} 
								alt="Erlenmeyer Flask" 
								style={{
									position: 'absolute',
									bottom: '2%',
									left: '4%',
									width: '140px',
									height: '160px',
									zIndex: 1
								}}
							/>
							<div className="flask-liquid" ref={flaskLiquidRef} style={{
								position: 'absolute',
									bottom: '5.2%',
									left: '-13.2%',
									width: '72.5%',
									height: '80%',
									transition: 'height 1s linear, background-color 1s ease',
									borderRadius: '0 0 38% 38%',
									backgroundColor: flaskColor,
									animation: 'waveMotion 2s ease-in-out infinite',
									overflow: 'hidden',
									zIndex: 1,
									transform: 'scale(0.3)',
									transformOrigin: 'bottom center'
								}}>
								<svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
									viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto" style={{
										width: '125%',
										height: '125%',
										position: 'absolute',
										left: '-12.5%',
										top: '-12.5%'
									}}>
									<defs>
										<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
									</defs>
								</svg>
							</div>

							{!isExpanded && (
								<div className={`glow-button simple-glow ${isGlowStopped ? 'stopped' : ''}`} style={{
									position: 'absolute',
									bottom: '-0.05rem',
									right: '-0.05rem',
								}}>
									<button
										className={`${isFadingOut ? 'fade-out' : ''}`}
										onClick={handleStart}
										disabled={isAnimating}
										style={{
											background: '#008545',
											color: 'white',
											fontSize: '0.875rem',
											fontWeight: '600',
											padding: '0.5rem 1rem',
											borderRadius: '0.5rem',
											border: 'none',
											cursor: 'pointer',
											position: 'relative',
											zIndex: 1
										}}
									>
										Explore
									</button>
								</div>
							)}

							{showPipette && (
								<>
									<div className={`vertical-line ${showGreenLine ? 'show' : ''} ${isLineShrinking ? 'shrink' : ''}`}></div>
									<div className={`pipette ${isPipetteExiting ? 'pipette-exit' : ''}`}>
										<img src={dropper} alt="Dropper" />
										<div className={`pipette-tube-liquid ${isPipetteDraining ? 'draining' : ''}`} />
										<div className="pipette-tube-liquid-thin" />
									</div>
								</>
							)}

							{showInstructions && (
								<div className={`info-text fade-in ${isInstructionFadingOut ? 'fade-out' : ''}`}>
									{isFirstClick ? 
										"We'll use a standard, basic solution of sodium hydroxide to gradually neutralize the acid." :
										"Keep adding standard solution until the solution changes color."
									}
								</div>
							)}

							{showAddButton && (
								<div className={`glow-button simple-glow ${isButtonFadingOut ? 'stopped' : ''}`} style={{
									position: 'absolute',
									bottom: '-0.05rem',
									right: '-0.05rem',
								}}>
									<button
										className={`${isButtonFadingOut ? 'button-fade-out' : 'fade-in'}`}
										onClick={handleAddClick}
										disabled={isAnimationInProgress || clickCount >= 5}
										style={{
											background: '#008545',
											color: 'white',
											fontSize: '0.875rem',
											fontWeight: '600',
											padding: '0.5rem 1rem',
											borderRadius: '0.5rem',
											border: 'none',
											cursor: 'pointer',
											position: 'relative',
											zIndex: 1
										}}
									>
										Add 1mL
									</button>
								</div>
							)}

							{showEquivalenceText && (
								<>
									<div className={`info-text fade-in${isEquivalenceFadingOut ? ' fade-out' : ''}`}>
										When the indicator changes color, the solution is at a neutral pH. This means we now have equivalent moles of acid and base in the flask.
									</div>
									{showFinalContinue && (
										<div className={`glow-button simple-glow ${isFinalContinueFadingOut ? 'stopped' : ''}`} style={{
											position: 'absolute',
											right: '-0.05rem',
											bottom: '-0.05rem'
										}}>
											<button
												className={`${isFinalContinueFadingOut ? 'button-fade-out' : 'fade-in'}`}
												onClick={handleFinalContinue}
												disabled={isFinalContinueFadingOut}
												style={{
													background: '#008545',
													color: 'white',
													fontSize: '0.875rem',
													fontWeight: '600',
													padding: '0.5rem 1rem',
													borderRadius: '0.5rem',
													border: 'none',
													cursor: 'pointer',
													position: 'relative',
													zIndex: 1
												}}
											>
												Continue
											</button>
										</div>
									)}
								</>
							)}
							{showCalculationText && (
								<>
									<div className={`info-text fade-in${isCalculationFadingOut ? ' fade-out' : ''}`}>
										Because we know the concentration of the standard solution and how much we added, we can calculate the unknown concentration of acid.
									</div>
									{showSecondContinue && (
										<div className={`glow-button simple-glow ${isSecondContinueFadingOut ? 'stopped' : ''}`} style={{
											position: 'absolute',
											right: '-0.05rem',
											bottom: '-0.05rem'
										}}>
											<button
												className={`${isSecondContinueFadingOut ? 'button-fade-out' : 'fade-in'}`}
												onClick={handleSecondContinue}
												disabled={isSecondContinueFadingOut}
												style={{
													background: '#008545',
													color: 'white',
													fontSize: '0.875rem',
													fontWeight: '600',
													padding: '0.5rem 1rem',
													borderRadius: '0.5rem',
													border: 'none',
													cursor: 'pointer',
													position: 'relative',
													zIndex: 1
												}}
											>
												Continue
											</button>
										</div>
									)}
								</>
							)}
							{showLastText && (
								<>
									{showSolveContinue && (
										<div className={`glow-button simple-glow ${isSolveContinueFadingOut ? 'stopped' : ''}`} style={{
											position: 'absolute',
											right: '-0.05rem',
											bottom: '-0.05rem'
										}}>
											<button
												className={`${isSolveContinueFadingOut ? 'button-fade-out' : 'fade-in'}`}
												onClick={handleSolveContinue}
												disabled={isSolveContinueFadingOut}
												style={{
													background: '#008545',
													color: 'white',
													fontSize: '0.875rem',
													fontWeight: '600',
													padding: '0.5rem 1rem',
													borderRadius: '0.5rem',
													border: 'none',
													cursor: 'pointer',
													position: 'relative',
													zIndex: 1
												}}
											>
												Continue
											</button>
										</div>
									)}
								</>
							)}
							{showSolveEquation && (
								<>
									<div className={`info-text fade-in ${isTableFadingOut ? 'fade-out' : ''}`}>
										Drag the correct values into the equation!
									</div>
									{showCongratsText && (
										<div className={`info-text fade-in ${isCongratsFadingOut ? 'fade-out' : ''}`}>
											Well done! You've determined the concentration of the unknown solution.
										</div>
									)}
									<div
										className="flex items-center font-mono text-lg select-none fade-in"
										style={{
											position: 'absolute',
											bottom: '150px',
											left: '100px',
											width: 320,
											height: 70,
											minWidth: 320,
											maxWidth: 320,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											transition: 'width 0.2s, height 0.2s'
										}}
									>
										<span style={{ flexShrink: 0 }}>M<sub>b</sub> = </span>
										{showFinalValue ? (
											<div className="fade-in" style={{ marginLeft: 8 }}>
												0.025 M
											</div>
										) : (
											<div
												className="flex flex-col items-center"
												style={{
													transform: 'translateY(-5px)',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													minWidth: 150,
													minHeight: 60,
													height: 60,
													boxSizing: 'border-box'
												}}
											>
												<div className={`border-b-2 border-black flex items-center justify-center py-2 ${isFractionBarFadingOut ? 'fade-out' : ''}`} style={{ minWidth: 120, marginLeft: 15, marginRight: 15, marginBottom: 5 }}>
													{!showCalculatedValue ? (
														<>
															<div
																ref={maDropRef}
																className={
																	`w-16 mx-1 text-center border-2 border-dashed border-gray-400 rounded-md drop-zone` +
																	(flashDropZone.Ma ? ' flash-yellow' : '') +
																	(flashGreenDropZone.Ma ? ' flash-green' : '') +
																	(dropZoneCorrect.Ma ? ' drop-zone-correct' : '')
																}
																style={{
																	minHeight: '2rem',
																	background: isDragging ? '#ede9fe' : undefined,
																	transition: 'background 0.2s',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																	position: 'relative',
																}}
															>
																{droppedEquation.Ma ? (
																	<>
																		<span>{droppedEquation.Ma}</span>
																	</>
																) : (
																	<span className="text-gray-400">M<sub>a</sub></span>
																)}
															</div>
															<span className="mx-1">×</span>
															<div
																ref={vaDropRef}
																className={
																	`w-16 mx-1 text-center border-2 border-dashed border-gray-400 rounded-md drop-zone` +
																	(flashDropZone.Va ? ' flash-yellow' : '') +
																	(flashGreenDropZone.Va ? ' flash-green' : '') +
																	(dropZoneCorrect.Va ? ' drop-zone-correct' : '')
																}
																style={{
																	minHeight: '2rem',
																	background: isDragging ? '#ede9fe' : undefined,
																	transition: 'background 0.2s',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'center',
																	position: 'relative',
																}}
															>
																{droppedEquation.Va ? (
																	<>
																		<span>{droppedEquation.Va}</span>
																	</>
																) : (
																	<span className="text-gray-400">V<sub>a</sub></span>
																)}
															</div>
														</>
													) : (
														<div className={`fade-in ${isCalculatedValueFadingOut ? 'fade-out-down' : ''}`}>
															2.5 mmol
														</div>
													)}
												</div>
												<div className="mt-1 text-center" style={{ display: 'flex', justifyContent: 'center', minWidth: 120 }}>
													<div
														ref={vbDropRef}
														className={
															`w-16 text-center border-2 border-dashed border-gray-400 rounded-md drop-zone ${isVbFadingOut ? 'fade-out-up' : ''}` +
															(flashDropZone.Vb ? ' flash-yellow' : '') +
															(flashGreenDropZone.Vb ? ' flash-green' : '') +
															(dropZoneCorrect.Vb ? ' drop-zone-correct' : '')
														}
														style={{
															minHeight: '2rem',
															background: isDragging ? '#ede9fe' : undefined,
															transition: 'background 0.2s',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															position: 'relative',
														}}
													>
														{droppedEquation.Vb ? (
															<>
																<span>{droppedEquation.Vb}</span>
															</>
														) : (
															<span className="text-gray-400">V<sub>b</sub></span>
														)}
													</div>
												</div>
											</div>
										)}
									</div>
								</>
							)}
							{showDraggableValues && showDraggableBoxes && (
								<>
									{/* 100mL - Position to the right of flask */}
									<div
										className={`expand-out titration-draggable-box fade-in ${isTableFadingOut ? 'fade-out' : ''}`}
										style={{
											position: 'absolute',
											bottom: '52px',
											left: '130px',
											zIndex: 50,
											width: '100px',
											height: '40px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'grab',
											background: '#ede9fe',
											color: '#7c3aed',
											borderRadius: '4px',
											fontWeight: 500,
											fontSize: '0.75rem',
											boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
											userSelect: 'none',
											border: '2px dashed #7c3aed',
											transition: isDragging && draggedBoxId === 'drag-1' ? 'none' : 'transform 0.2s',
											...(draggedBoxStyle['drag-1'] || {})
										}}
										data-id="drag-1"
										onMouseDown={e => {
											e.preventDefault();
											const element = e.currentTarget;
											const id = 'drag-1';
											const rect = element.getBoundingClientRect();
											const parentRect = element.offsetParent.getBoundingClientRect();
											let startX = e.clientX;
											let startY = e.clientY;
											let offsetX = rect.left - parentRect.left;
											let offsetY = rect.top - parentRect.top;
											setDraggedBoxStyle({
												[id]: {
													position: 'absolute',
													left: offsetX,
													top: offsetY,
													zIndex: 1000,
													transition: 'none',
													width: element.offsetWidth,
													height: element.offsetHeight,
												}
											});
											setIsDragging(true);
											setDraggedBoxId(id);
											setDraggedBoxValue('100mL');

											const moveHandler = (moveEvent) => {
												moveEvent.preventDefault();
												const newLeft = offsetX + (moveEvent.clientX - startX);
												const newTop = offsetY + (moveEvent.clientY - startY);
												setDraggedBoxStyle(prev => ({
													...prev,
													[id]: {
														...prev[id],
														left: newLeft,
														top: newTop,
														transition: 'none',
													}
												}));

												// Check if mouse is over any drop zone
												const mouseX = moveEvent.clientX;
												const mouseY = moveEvent.clientY;
												let overZone = null;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												setDragOverZone(overZone);
											};

											const upHandler = (upEvent) => {
												document.removeEventListener('mousemove', moveHandler);
												document.removeEventListener('mouseup', upHandler);

												const mouseX = upEvent.clientX;
												const mouseY = upEvent.clientY;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												let overZone = null;
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												if (overZone) {
													if ('100mL' === correctAnswers[overZone]) {
														if (!dropZoneCorrect[overZone]) {
															setCorrectAnswerCount(prev => {
																const newCount = prev + 1;
																if (newCount === 3) {
																	setTimeout(() => {
																		setIsTableFadingOut(true);
																		setShowDraggableBoxes(false);
																		setTimeout(() => {
																			setShowCalculatedValue(true);
																		}, 1000);
																	}, 1000);
																}
																return newCount;
															});
														}
														setDroppedEquation(prev => ({
															...prev,
															[overZone]: '100mL'
														}));
														setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																	setDropZoneCorrect(prev => ({ ...prev, [overZone]: true }));
																}, 150);
															}, 150);
														}, 150);
													} else {
														setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																}, 150);
															}, 150);
														}, 150);
													}
												}

												setIsDragging(false);
												setDragOverZone(null);
												setDraggedBoxId(null);
												setDraggedBoxValue(null);
												setDraggedBoxStyle(prev => {
													const updated = { ...prev };
													delete updated[id];
													return updated;
												});
											};

											document.addEventListener('mousemove', moveHandler);
											document.addEventListener('mouseup', upHandler);
										}}
									>
										<div style={{ lineHeight: '1', textAlign: 'center' }}>100mL</div>
										<div style={{ lineHeight: '1', textAlign: 'center', fontSize: '0.65rem' }}>Unknown Solution Volume</div>
									</div>

									{/* ? - Position to the right of flask, above 100mL */}
									<div
										className={`expand-out titration-draggable-box fade-in ${isTableFadingOut ? 'fade-out' : ''}`}
										style={{
											position: 'absolute',
											bottom: '95px',
											left: '130px',
											zIndex: 50,
											width: '100px',
											height: '40px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'grab',
											background: '#ede9fe',
											color: '#7c3aed',
											borderRadius: '4px',
											fontWeight: 500,
											fontSize: '0.75rem',
											boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
											userSelect: 'none',
											border: '2px dashed #7c3aed',
											transition: isDragging && draggedBoxId === 'drag-2' ? 'none' : 'transform 0.2s',
											...(draggedBoxStyle['drag-2'] || {})
										}}
										data-id="drag-2"
										onMouseDown={e => {
											e.preventDefault();
											const element = e.currentTarget;
											const id = 'drag-2';
											const rect = element.getBoundingClientRect();
											const parentRect = element.offsetParent.getBoundingClientRect();
											let startX = e.clientX;
											let startY = e.clientY;
											let offsetX = rect.left - parentRect.left;
											let offsetY = rect.top - parentRect.top;
											setDraggedBoxStyle({
												[id]: {
													position: 'absolute',
													left: offsetX,
													top: offsetY,
													zIndex: 1000,
													transition: 'none',
													width: element.offsetWidth,
													height: element.offsetHeight,
												}
											});
											setIsDragging(true);
											setDraggedBoxId(id);
											setDraggedBoxValue('?');

											const moveHandler = (moveEvent) => {
												moveEvent.preventDefault();
												const newLeft = offsetX + (moveEvent.clientX - startX);
												const newTop = offsetY + (moveEvent.clientY - startY);
												setDraggedBoxStyle(prev => ({
													...prev,
													[id]: {
														...prev[id],
														left: newLeft,
														top: newTop,
														transition: 'none',
													}
												}));

												// Check if mouse is over any drop zone
												const mouseX = moveEvent.clientX;
												const mouseY = moveEvent.clientY;
												let overZone = null;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												setDragOverZone(overZone);
											};

											const upHandler = (upEvent) => {
												document.removeEventListener('mousemove', moveHandler);
												document.removeEventListener('mouseup', upHandler);

												const mouseX = upEvent.clientX;
												const mouseY = upEvent.clientY;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												let overZone = null;
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												if (overZone) {
													if ('?' === correctAnswers[overZone]) {
														if (!dropZoneCorrect[overZone]) {
															setCorrectAnswerCount(prev => {
																const newCount = prev + 1;
																if (newCount === 3) {
																	setTimeout(() => {
																		setIsTableFadingOut(true);
																		setShowDraggableBoxes(false);
																		setTimeout(() => {
																			setShowCalculatedValue(true);
																		}, 1000);
																	}, 1000);
																}
																return newCount;
															});
														}
														setDroppedEquation(prev => ({
															...prev,
															[overZone]: '?'
														}));
														setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																	setDropZoneCorrect(prev => ({ ...prev, [overZone]: true }));
																}, 150);
															}, 150);
														}, 150);
													} else {
														setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																}, 150);
															}, 150);
														}, 150);
													}
												}

												setIsDragging(false);
												setDragOverZone(null);
												setDraggedBoxId(null);
												setDraggedBoxValue(null);
												setDraggedBoxStyle(prev => {
													const updated = { ...prev };
													delete updated[id];
													return updated;
												});
											};

											document.addEventListener('mousemove', moveHandler);
											document.addEventListener('mouseup', upHandler);
										}}
									>
										<div style={{ lineHeight: '1', textAlign: 'center' }}>?</div>
										<div style={{ lineHeight: '1', textAlign: 'center', fontSize: '0.65rem' }}>Unknown Solution Concentration</div>
									</div>

									{/* 5mL - Position to the right of burette */}
									<div
										className={`expand-out titration-draggable-box fade-in ${isTableFadingOut ? 'fade-out' : ''}`}
										style={{
											position: 'absolute',
											bottom: '280px',
											left: '110px',
											zIndex: 50,
											width: '80px',
											height: '40px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'grab',
											background: '#ede9fe',
											color: '#7c3aed',
											borderRadius: '4px',
											fontWeight: 500,
											fontSize: '0.75rem',
											boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
											userSelect: 'none',
											border: '2px dashed #7c3aed',
											transition: isDragging && draggedBoxId === 'drag-3' ? 'none' : 'transform 0.2s',
											...(draggedBoxStyle['drag-3'] || {})
										}}
										data-id="drag-3"
										onMouseDown={e => {
											e.preventDefault();
											const element = e.currentTarget;
											const id = 'drag-3';
											const rect = element.getBoundingClientRect();
											const parentRect = element.offsetParent.getBoundingClientRect();
											let startX = e.clientX;
											let startY = e.clientY;
											let offsetX = rect.left - parentRect.left;
											let offsetY = rect.top - parentRect.top;
											setDraggedBoxStyle({
												[id]: {
													position: 'absolute',
													left: offsetX,
													top: offsetY,
													zIndex: 1000,
													transition: 'none',
													width: element.offsetWidth,
													height: element.offsetHeight,
												}
											});
											setIsDragging(true);
											setDraggedBoxId(id);
											setDraggedBoxValue('5mL');

											const moveHandler = (moveEvent) => {
												moveEvent.preventDefault();
												const newLeft = offsetX + (moveEvent.clientX - startX);
												const newTop = offsetY + (moveEvent.clientY - startY);
												setDraggedBoxStyle(prev => ({
													...prev,
													[id]: {
														...prev[id],
														left: newLeft,
														top: newTop,
														transition: 'none',
													}
												}));

												// Check if mouse is over any drop zone
												const mouseX = moveEvent.clientX;
												const mouseY = moveEvent.clientY;
												let overZone = null;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												setDragOverZone(overZone);
											};

											const upHandler = (upEvent) => {
												document.removeEventListener('mousemove', moveHandler);
												document.removeEventListener('mouseup', upHandler);

												const mouseX = upEvent.clientX;
												const mouseY = upEvent.clientY;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												let overZone = null;
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												if (overZone) {
													if ('5mL' === correctAnswers[overZone]) {
														if (!dropZoneCorrect[overZone]) {
															setCorrectAnswerCount(prev => {
																const newCount = prev + 1;
																if (newCount === 3) {
																	setTimeout(() => {
																		setIsTableFadingOut(true);
																		setShowDraggableBoxes(false);
																		setTimeout(() => {
																			setShowCalculatedValue(true);
																		}, 1000);
																	}, 1000);
																}
																return newCount;
															});
														}
														setDroppedEquation(prev => ({
															...prev,
															[overZone]: '5mL'
														}));
														setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																	setDropZoneCorrect(prev => ({ ...prev, [overZone]: true }));
																}, 150);
															}, 150);
														}, 150);
													} else {
														setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																}, 150);
															}, 150);
														}, 150);
													}
												}

												setIsDragging(false);
												setDragOverZone(null);
												setDraggedBoxId(null);
												setDraggedBoxValue(null);
												setDraggedBoxStyle(prev => {
													const updated = { ...prev };
													delete updated[id];
													return updated;
												});
											};

											document.addEventListener('mousemove', moveHandler);
											document.addEventListener('mouseup', upHandler);
										}}
									>
										<div style={{ lineHeight: '1', textAlign: 'center' }}>5mL</div>
										<div style={{ lineHeight: '1', textAlign: 'center', fontSize: '0.65rem' }}>Used Titrant Volume</div>
									</div>

									{/* 0.5M - Position to the right of burette, above 5mL */}
									<div
										className={`expand-out titration-draggable-box fade-in ${isTableFadingOut ? 'fade-out' : ''}`}
										style={{
											position: 'absolute',
											bottom: '237px',
											left: '110px',
											zIndex: 50,
											width: '80px',
											height: '40px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'grab',
											background: '#ede9fe',
											color: '#7c3aed',
											borderRadius: '4px',
											fontWeight: 500,
											fontSize: '0.75rem',
											boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
											userSelect: 'none',
											border: '2px dashed #7c3aed',
											transition: isDragging && draggedBoxId === 'drag-4' ? 'none' : 'transform 0.2s',
											...(draggedBoxStyle['drag-4'] || {})
										}}
										data-id="drag-4"
										onMouseDown={e => {
											e.preventDefault();
											const element = e.currentTarget;
											const id = 'drag-4';
											const rect = element.getBoundingClientRect();
											const parentRect = element.offsetParent.getBoundingClientRect();
											let startX = e.clientX;
											let startY = e.clientY;
											let offsetX = rect.left - parentRect.left;
											let offsetY = rect.top - parentRect.top;
											setDraggedBoxStyle({
												[id]: {
													position: 'absolute',
													left: offsetX,
													top: offsetY,
													zIndex: 1000,
													transition: 'none',
													width: element.offsetWidth,
													height: element.offsetHeight,
												}
											});
											setIsDragging(true);
											setDraggedBoxId(id);
											setDraggedBoxValue('0.5M');

											const moveHandler = (moveEvent) => {
												moveEvent.preventDefault();
												const newLeft = offsetX + (moveEvent.clientX - startX);
												const newTop = offsetY + (moveEvent.clientY - startY);
												setDraggedBoxStyle(prev => ({
													...prev,
													[id]: {
														...prev[id],
														left: newLeft,
														top: newTop,
														transition: 'none',
													}
												}));

												// Check if mouse is over any drop zone
												const mouseX = moveEvent.clientX;
												const mouseY = moveEvent.clientY;
												let overZone = null;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												setDragOverZone(overZone);
											};

											const upHandler = (upEvent) => {
												document.removeEventListener('mousemove', moveHandler);
												document.removeEventListener('mouseup', upHandler);

												const mouseX = upEvent.clientX;
												const mouseY = upEvent.clientY;
												const dropZones = [
													{ key: 'Ma', ref: maDropRef },
													{ key: 'Va', ref: vaDropRef },
													{ key: 'Vb', ref: vbDropRef }
												];
												let overZone = null;
												for (const zone of dropZones) {
													const rect = zone.ref.current?.getBoundingClientRect();
													if (
														rect &&
														mouseX >= rect.left &&
														mouseX <= rect.right &&
														mouseY >= rect.top &&
														mouseY <= rect.bottom
													) {
														overZone = zone.key;
														break;
													}
												}
												if (overZone) {
													if ('0.5M' === correctAnswers[overZone]) {
														if (!dropZoneCorrect[overZone]) {
															setCorrectAnswerCount(prev => {
																const newCount = prev + 1;
																if (newCount === 3) {
																	setTimeout(() => {
																		setIsTableFadingOut(true);
																		setShowDraggableBoxes(false);
																		setTimeout(() => {
																			setShowCalculatedValue(true);
																		}, 1000);
																	}, 1000);
																}
																return newCount;
															});
														}
														setDroppedEquation(prev => ({
															...prev,
															[overZone]: '0.5M'
														}));
														setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashGreenDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																	setDropZoneCorrect(prev => ({ ...prev, [overZone]: true }));
																}, 150);
															}, 150);
														}, 150);
													} else {
														setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
														setTimeout(() => {
															setFlashDropZone(prev => ({ ...prev, [overZone]: false }));
															setTimeout(() => {
																setFlashDropZone(prev => ({ ...prev, [overZone]: true }));
																setTimeout(() => {
																	setFlashGreenDropZone(prev => ({ ...prev, [overZone]: false }));
																}, 150);
															}, 150);
														}, 150);
													}
												}

												setIsDragging(false);
												setDragOverZone(null);
												setDraggedBoxId(null);
												setDraggedBoxValue(null);
												setDraggedBoxStyle(prev => {
													const updated = { ...prev };
													delete updated[id];
													return updated;
												});
											};

											document.addEventListener('mousemove', moveHandler);
											document.addEventListener('mouseup', upHandler);
										}}
									>
										<div style={{ lineHeight: '1', textAlign: 'center' }}>0.5M</div>
										<div style={{ lineHeight: '1', textAlign: 'center', fontSize: '0.65rem' }}>Titrant Concentration</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Titration;