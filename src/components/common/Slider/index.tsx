import React, { ElementRef, forwardRef, Ref, useImperativeHandle } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { Chapter } from "../../../context";
import { COLORS } from "./constants";
import {
	computeCurrentWidthFromPointerPos,
	getCSSVariableAbsoluteValue,
	SliderCSSVariableTypes,
} from "./utils";

interface SliderProps
	extends Omit<
		React.HTMLAttributes<HTMLDivElement>,
		"onClick" | "onDrag" | "onMouseUp" | "onMouseMove"
	> {
	$total: number;
	$shouldDisplayChapters?: boolean;
	$currentTime?: number;
	$currentChapter?: Chapter;
	$chapters?: Chapter[];
	$fillColor?: string;
	onClick?: (currentPercentage: number) => void;
	onDrag?: (completedPercentage: number) => void;
	onMouseUp?: () => void;
	onMouseMove?: (pointerPercentage: number) => void;
}

export interface SliderRefProps {
	updateSliderFill: (completedPercentage: number) => void;
	updateChapterFill: (
		currentChapterIdx: number,
		completedPercentage: number
	) => void;
}

type HasChapters = {
	$hasChapters: boolean;
};

type StyledContainerProps = Pick<SliderProps, "$fillColor" | "$total"> &
	HasChapters;

type StyledChapterContainerProps = {
	$width: string;
};

type StyledSliderFillProps = HasChapters;

const StyledContainer = styled.div<StyledContainerProps>`
	--slider-pointer: 0%; // when hover happens pointer is updated
	--slider-fill: 0%; // when click and drag happens fill is updated
	--slider-track-bg-color: ${COLORS.TRACK_BG_COLOR};
	--slider-fill-color: ${(props) => props.$fillColor};

	position: relative;
	height: 30px;
	width: ${(props) => props.$total};
	display: flex;
	flex-direction: row;
	${(props) => props.$hasChapters && "justify-content: center;"}
	align-items: center;
	cursor: pointer;

	// For animating ring behind the thumb;
	&[data-dragging] {
		& .slider-thumb::before {
			opacity: 1;
		}

		// Increase the height of the chapter when dragging is enabled;
		& [data-chapter-dragging] {
			height: 8px;
		}
	}

	// Make thumb visible when hovered on this container;
	&:hover {
		& .slider-thumb {
			opacity: 1;
		}
	}
`;

const StyleChapterContainer = styled.div<StyledChapterContainerProps>`
	width: ${(props) => props.$width};
	height: 5px;
	display: inline-block;
	margin-right: 2px;
	position: relative;
	transition: height 200ms ease;

	// Increase the height of the styled track when chapter is being dragged;
	&[data-chapter-dragging] > div {
		height: 8px;
	}
`;

const StyledTrack = styled.div`
	width: 100%;
	height: 5px;
	background-color: var(--slider-track-bg-color);
	position: absolute;
	pointer-events: auto;

	transition: height 200ms ease;
`;

const StyledSliderFill = styled.div<StyledSliderFillProps>`
	height: 5px;
	background-color: var(--slider-fill-color);
	width: var(
		${(props) => (props.$hasChapters ? "--chapter-fill" : "--slider-fill")},
		0%
	);
	position: absolute;
	pointer-events: none;
	/** https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events#none
     * <--- Very usefull. This helped to disable any pointer interaction being caught in the target.
     * This helped us to catch the pointer-events present in its decendants i.e. In the styledtrack.
     * We did this because there was a bug that didn't allowed to select the video duration that was already visited(Since trackfill is an overlay over styledtrack, so any click event happening on this element did appeared on the styledtrack)
     * So now even clicking this element, the below element i.e. styled track component will recieve the pointer events
     */
`;

const StyledThumb = styled.div`
	height: 15px;
	width: 15px;
	border-radius: 50%;
	background-color: var(--slider-fill-color);
	position: absolute;
	bottom: 33%;
	left: var(--slider-fill, 0%);
	transform: translate(-50%, 15%);
	z-index: 1;
	opacity: 0;
	transition:
		opacity 0.2s ease,
		box-shadow 0.3s ease;

	/**
     * This psuedo-element adds a ring behind the thumb of lighter color of --slidedr-fill-color.
     * This ring gets applied when dragging happens i.e. whenever data-dragging attribute is present. Check out the StyledContainer component above.
     * Articles to read for this:
     * https://developer.mozilla.org/en-US/docs/Web/CSS/filter
     * https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness
     * https://developer.mozilla.org/en-US/docs/Web/CSS/::before
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
     */
	&::before {
		content: " ";
		display: inline-block;
		background-color: var(--slider-fill-color);
		height: 24px;
		width: 24px;
		border-radius: 50%;
		opacity: 0;
		transition: opacity 0.2s ease;
		filter: opacity(0.5);
		transform: translate(-18%, -18%);
	}
`;

const Slider = (props: SliderProps, ref: Ref<SliderRefProps>) => {
	const {
		$shouldDisplayChapters,
		$currentChapter,
		$currentTime,
		$chapters,
		$total,
		onClick,
		onDrag,
		onMouseUp,
		onMouseMove,
		$fillColor = COLORS.WHITE,
	} = props;
	const rootRef = useRef<HTMLDivElement>(null);
	const chapterRefs = useRef<Array<ElementRef<"div">> | []>([]);
	const hasChapters =
		($shouldDisplayChapters && $chapters && $chapters.length > 0) || false;

	const updateSliderFillByEvent = (
		variableName: SliderCSSVariableTypes,
		e: React.MouseEvent<HTMLDivElement>
	) => {
		const elem = rootRef.current;
		if (elem) {
			const rect = elem.getBoundingClientRect();

			const fillWidth = computeCurrentWidthFromPointerPos(
				e.pageX,
				rect.left,
				$total
			);
			if (fillWidth < 0 || fillWidth > 100) {
				return;
			}

			rootRef.current?.style.setProperty(variableName, `${fillWidth}%`);
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (rootRef.current) {
			/**
			 * Algorithm:
			 * 1. We first get the value from slider fill.
			 * 2. Then we loop over the chapers and take the sum with previous chapters fill width and see if its less than slider fill.
			 * 3. If yes, then we completely fill the chapter with 100% width
			 * 4. If no, then we calculate the chapter-fill for that particular chapter.
			 */
			updateSliderFillByEvent("--slider-fill", e);
			const width = getCSSVariableAbsoluteValue("--slider-fill", rootRef);

			if ($chapters) {
				const allChapterWidths = $chapters.map((chapter) =>
					Number(chapter.percentageTime)
				);
				let acc = 0;
				const currentChapterIdx = allChapterWidths.findIndex((val) => {
					acc += val;
					if (acc > width) {
						return true;
					}
				});
				const nextIdx =
					currentChapterIdx === $chapters.length - 1
						? $chapters.length - 1
						: currentChapterIdx + 1;

				const prevChapterIdx =
					currentChapterIdx === 0 ? 0 : currentChapterIdx - 1;
				const prevChapterElem = chapterRefs.current[prevChapterIdx];
				const currentChapterElem =
					chapterRefs.current[currentChapterIdx];
				const nextChapterElem = chapterRefs.current[nextIdx];

				// Fill the previous elements:
				for (let i = 0; i < currentChapterIdx; i++) {
					chapterRefs.current[i].style.setProperty(
						"--chapter-fill",
						"100%"
					);
				}

				const previousChapterFill = getCSSVariableAbsoluteValue(
					"--chapter-fill",
					prevChapterElem
				);
				const currentChapterFill = getCSSVariableAbsoluteValue(
					"--chapter-fill",
					currentChapterElem
				);
				const nextChapterFill = getCSSVariableAbsoluteValue(
					"--chapter-fill",
					nextChapterElem
				);

				// Fill the current chapter;
				if (previousChapterFill === 100 && currentChapterFill >= 0) {
					const currentChapterWidth =
						allChapterWidths[currentChapterIdx];
					const rect = currentChapterElem.getBoundingClientRect();
					const totalChapterWidth =
						(currentChapterWidth * $total) / 100;
					const chapterFillWidth = computeCurrentWidthFromPointerPos(
						e.pageX,
						rect.left,
						totalChapterWidth
					);
					currentChapterElem.style.setProperty(
						"--chapter-fill",
						`${chapterFillWidth}%`
					);
				}

				// clean up the later chapters when going from right to left;

				if (nextChapterFill > 0) {
					for (
						let i = currentChapterIdx + 1;
						i < $chapters.length;
						i++
					) {
						chapterRefs.current[i].style.setProperty(
							"--chapter-fill",
							"0%"
						);
					}
				}
			}

			onClick?.(width);
		}
	};

	// Slider Thumb movement logic ===========================
	const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		/**
		 * NOTE: 'data-dragging' attribute is available only when we are dragging the slider-thumb.
		 * Thumb is said to be dragged when onMouseDown gets triggered on the .slider-thumb -> [data-dragging] is added to .slider
		 * -> then handleMouseMove off .slider gets executed.
		 * The dragging of thumb gets stopped when the data-dragging attribute is removed from .slider
		 * We remove this attribute on MouseUp of .slider because on mouseup the target element can be different during dragging if the mouseup where on .slider-thumb
		 * To have better dragging experience the data-dragging is removed on the mouseup of .slider
		 */
		if (rootRef.current?.getAttribute("data-dragging")) {
			updateSliderFillByEvent("--slider-fill", e);
			const sliderFillWidth = getCSSVariableAbsoluteValue(
				"--slider-fill",
				rootRef
			);
			onDrag?.(sliderFillWidth);

			// When chapters exists update the chapter fills for each div.
			if ($currentChapter) {
				const { index, percentageTime } = $currentChapter;
				const currentChapterElem = chapterRefs.current[index];

				const rect = currentChapterElem.getBoundingClientRect();
				const totalChapterWidth =
					(Number(percentageTime) * $total) / 100;
				const chapterFillWidth = computeCurrentWidthFromPointerPos(
					e.pageX,
					rect.left,
					totalChapterWidth
				);

				/**
				 * Below if block removes the data-chapter-dragging attribute whenever the dragging happens from left to right or vice-versa;
				 */
				if ($currentTime && $chapters) {
					// movement from left to right;
					if (
						index > 0 &&
						$currentTime >= $chapters[index].startTime
					) {
						chapterRefs.current[index - 1].removeAttribute(
							"data-chapter-dragging"
						);

						/**
						 * Here we update the chapter fill of the previous element since the previous element on
						 * complete wasn't getting completely filled i.e. around 98% or 97%.
						 * So to approximate this error we manually set the fill to 100%.
						 * Similar is the case when we are moving from right to left in the below if block
						 */
						chapterRefs.current[index - 1].style.setProperty(
							"--chapter-fill",
							"100%"
						);
					}

					if (
						index < $chapters.length - 1 &&
						$currentTime <= $chapters[index].endTime
					) {
						chapterRefs.current[index + 1].removeAttribute(
							"data-chapter-dragging"
						);
						chapterRefs.current[index + 1].style.setProperty(
							"--chapter-fill",
							"0%"
						);
					}
				}

				// Don't update the chapter-fill when it is beyond the limits
				if (chapterFillWidth < 0 || chapterFillWidth > 100) {
					return;
				}

				currentChapterElem.style.setProperty(
					"--chapter-fill",
					`${chapterFillWidth}%`
				);
				currentChapterElem.setAttribute(
					"data-chapter-dragging",
					"true"
				);
			}
		}

		updateSliderFillByEvent("--slider-pointer", e);
		const pointerPos = getCSSVariableAbsoluteValue(
			"--slider-pointer",
			rootRef
		);
		onMouseMove?.(pointerPos);
	};

	const handleContainerMouseUp = () => {
		if (rootRef.current) {
			rootRef.current.removeAttribute("data-dragging");
		}

		// Remove all the data-chapter-dragging attributes from all the chapters when mouse up happens i.e. when dragging is finished;
		if (chapterRefs.current) {
			chapterRefs.current.forEach((chapter) => {
				chapter.removeAttribute("data-chapter-dragging");
			});
		}

		onMouseUp?.();
	};

	const handleThumbMouseDown = () => {
		if (rootRef.current) {
			rootRef.current.setAttribute("data-dragging", "true");
		}
	};

	useImperativeHandle(
		ref,
		() => {
			return {
				updateSliderFill(percentageCompleted: number) {
					rootRef.current?.style.setProperty(
						"--slider-fill",
						`${percentageCompleted}%`
					);
				},
				updateChapterFill(
					currentChapterIdx: number,
					completedPercentage: number
				) {
					chapterRefs.current[currentChapterIdx].style.setProperty(
						"--chapter-fill",
						`${completedPercentage}%`
					);
				},
			};
		},
		[]
	);

	return (
		<StyledContainer
			className="slider"
			$hasChapters={hasChapters}
			$fillColor={$fillColor}
			onMouseMove={handleContainerMouseMove}
			onMouseUp={handleContainerMouseUp}
			ref={rootRef}
			$total={$total}
		>
			{hasChapters ? (
				$chapters?.map((chapter, index) => (
					<StyleChapterContainer
						className={`chapter-${index}`}
						key={`key-${chapter.percentageTime}`}
						ref={(el: HTMLDivElement) =>
							el && (chapterRefs.current[index] = el)
						}
						$width={`${chapter.percentageTime}%`}
					>
						<StyledTrack
							className="slider-track"
							onClick={handleClick}
						/>
						<StyledSliderFill
							className="slider-fill"
							$hasChapters
						/>
					</StyleChapterContainer>
				))
			) : (
				<>
					<StyledTrack
						className="slider-track"
						onClick={handleClick}
					/>
					<StyledSliderFill
						className="slider-fill"
						$hasChapters={false}
					/>
				</>
			)}

			<StyledThumb
				className="slider-thumb"
				onMouseDown={handleThumbMouseDown}
			></StyledThumb>
		</StyledContainer>
	);
};

export default forwardRef(Slider);
